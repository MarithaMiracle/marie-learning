-- Messages sent from the public Contact Us page. Anyone can submit; only an
-- instructor can read them. The table is never exposed to marie_app directly,
-- only through the SECURITY DEFINER functions below.

CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  handled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX contact_messages_created_idx ON contact_messages (created_at DESC);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages FORCE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE contact_messages FROM marie_app;

-- Accepts a message from a signed-out visitor.
CREATE OR REPLACE FUNCTION submit_contact_message(p_name text, p_email text, p_message text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name text := trim(coalesce(p_name, ''));
  v_email text := lower(trim(coalesce(p_email, '')));
  v_message text := trim(coalesce(p_message, ''));
BEGIN
  IF char_length(v_name) < 2 OR char_length(v_name) > 120 THEN
    RAISE EXCEPTION 'Enter your name';
  END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Enter a valid email address';
  END IF;
  IF char_length(v_message) < 5 THEN
    RAISE EXCEPTION 'Write a message before sending';
  END IF;
  INSERT INTO contact_messages (name, email, message)
  VALUES (v_name, v_email, left(v_message, 4000));
END;
$$;

CREATE OR REPLACE FUNCTION list_contact_messages()
RETURNS TABLE (id uuid, name text, email text, message text, handled boolean, created_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF current_setting('app.role', true) IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'Only an instructor can view messages';
  END IF;
  RETURN QUERY
  SELECT m.id, m.name, m.email, m.message, m.handled, m.created_at
  FROM contact_messages m
  ORDER BY m.handled ASC, m.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION set_contact_message_handled(p_id uuid, p_handled boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF current_setting('app.role', true) IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'Only an instructor can update messages';
  END IF;
  UPDATE contact_messages SET handled = coalesce(p_handled, false) WHERE contact_messages.id = p_id;
END;
$$;

CREATE OR REPLACE FUNCTION delete_contact_message(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF current_setting('app.role', true) IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'Only an instructor can delete messages';
  END IF;
  DELETE FROM contact_messages WHERE contact_messages.id = p_id;
END;
$$;

REVOKE ALL ON FUNCTION submit_contact_message(text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION list_contact_messages() FROM PUBLIC;
REVOKE ALL ON FUNCTION set_contact_message_handled(uuid, boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION delete_contact_message(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION submit_contact_message(text, text, text) TO marie_app;
GRANT EXECUTE ON FUNCTION list_contact_messages() TO marie_app;
GRANT EXECUTE ON FUNCTION set_contact_message_handled(uuid, boolean) TO marie_app;
GRANT EXECUTE ON FUNCTION delete_contact_message(uuid) TO marie_app;
