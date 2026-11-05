-- Student invites. An instructor creates an invite for an email; the student
-- opens the link and chooses their own password. The link doubles as email
-- verification, because holding it proves access to that inbox.
--
-- Mirrors password_reset_tokens: only the sha256 of the token is stored, and
-- the table is readable by marie_app only through the SECURITY DEFINER
-- functions below.

CREATE TABLE user_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token_hash text NOT NULL,
  invited_by uuid REFERENCES users (id) ON DELETE SET NULL,
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX user_invites_hash_idx ON user_invites (token_hash);

ALTER TABLE user_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_invites FORCE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE user_invites FROM marie_app;

-- Creates a fresh invite for an email, replacing any earlier pending one.
-- Returns the raw token, which is only ever shown once.
CREATE OR REPLACE FUNCTION create_user_invite(p_email text)
RETURNS TABLE (invite_id uuid, token text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text := lower(trim(coalesce(p_email, '')));
  v_id uuid := gen_random_uuid();
  v_token text;
BEGIN
  IF current_setting('app.role', true) IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'Only an instructor can invite a student';
  END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Enter a valid email address';
  END IF;
  IF EXISTS (SELECT 1 FROM users u WHERE u.email = v_email) THEN
    RAISE EXCEPTION 'An account with this email already exists';
  END IF;
  DELETE FROM user_invites WHERE email = v_email AND accepted_at IS NULL;
  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO user_invites (id, email, token_hash, invited_by, expires_at)
  VALUES (v_id, v_email, encode(digest(v_token, 'sha256'), 'hex'), app_uid(), now() + interval '7 days');
  RETURN QUERY SELECT v_id, v_token;
END;
$$;

-- Redeems an invite. Reuses register_student so the user, profile, and active
-- enrollment are created by the same path as every other account.
CREATE OR REPLACE FUNCTION accept_user_invite(p_token text, p_full_name text, p_password text)
RETURNS TABLE (
  id uuid,
  email text,
  role text,
  full_name text,
  preferred_name text,
  timezone text,
  onboarding_completed boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invite user_invites;
BEGIN
  SELECT * INTO v_invite
  FROM user_invites
  WHERE token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex')
    AND accepted_at IS NULL
    AND expires_at > now()
  ORDER BY expires_at DESC
  LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'This invite link is invalid or has expired';
  END IF;
  RETURN QUERY SELECT * FROM register_student(v_invite.email, p_password, p_full_name);
  UPDATE user_invites SET accepted_at = now() WHERE user_invites.id = v_invite.id;
END;
$$;

CREATE OR REPLACE FUNCTION list_user_invites()
RETURNS TABLE (id uuid, email text, expires_at timestamptz, created_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF current_setting('app.role', true) IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'Only an instructor can view invites';
  END IF;
  RETURN QUERY
  SELECT i.id, i.email, i.expires_at, i.created_at
  FROM user_invites i
  WHERE i.accepted_at IS NULL
  ORDER BY i.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION revoke_user_invite(p_invite_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF current_setting('app.role', true) IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'Only an instructor can revoke an invite';
  END IF;
  DELETE FROM user_invites WHERE id = p_invite_id;
END;
$$;

REVOKE ALL ON FUNCTION create_user_invite(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION accept_user_invite(text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION list_user_invites() FROM PUBLIC;
REVOKE ALL ON FUNCTION revoke_user_invite(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION create_user_invite(text) TO marie_app;
GRANT EXECUTE ON FUNCTION accept_user_invite(text, text, text) TO marie_app;
GRANT EXECUTE ON FUNCTION list_user_invites() TO marie_app;
GRANT EXECUTE ON FUNCTION revoke_user_invite(uuid) TO marie_app;
