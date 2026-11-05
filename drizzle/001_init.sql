-- Marie Learning schema.
-- The migrate script creates the non-superuser role marie_app before running this file.
-- Application queries run as marie_app with row level security.
-- Seed and migration use the admin connection, which bypasses row level security.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'marie_app') THEN
    RAISE EXCEPTION 'marie_app is missing. Run npm run db:migrate.';
  END IF;
END $$;

-- Do not ALTER ROLE … NOSUPERUSER here. On Supabase the postgres role is not a
-- superuser, so changing SUPERUSER/NOSUPERUSER attributes is rejected. The
-- migrate script creates marie_app with NOSUPERUSER NOBYPASSRLS already set.

CREATE TABLE programmes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  duration_weeks integer NOT NULL CHECK (duration_weeks > 0),
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('instructor', 'student')),
  full_name text NOT NULL,
  preferred_name text,
  timezone text NOT NULL DEFAULT 'UTC',
  is_active boolean NOT NULL DEFAULT true,
  onboarding_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE student_profiles (
  user_id uuid PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  country text,
  operating_system text,
  os_version text,
  computer_experience text,
  coding_experience text,
  learning_goals text,
  weekly_practice text,
  setup_checklist jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE programme_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id uuid NOT NULL REFERENCES programmes (id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'withdrawn')),
  enrolled_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (programme_id, student_id)
);

CREATE TABLE modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id uuid NOT NULL REFERENCES programmes (id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  number integer NOT NULL CHECK (number > 0),
  week_number integer NOT NULL CHECK (week_number > 0),
  month_label text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL,
  customised boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (programme_id, number)
);

CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES modules (id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  session_number integer NOT NULL UNIQUE CHECK (session_number > 0),
  title text NOT NULL,
  estimated_minutes integer NOT NULL CHECK (estimated_minutes > 0),
  difficulty text NOT NULL,
  student_content jsonb NOT NULL,
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL,
  customised boolean NOT NULL DEFAULT false,
  completeness jsonb NOT NULL DEFAULT '{"score":0,"missing":["Lesson content"],"complete":false}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE instructor_guides (
  lesson_id uuid PRIMARY KEY REFERENCES lessons (id) ON DELETE CASCADE,
  content jsonb NOT NULL,
  customised boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons (id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('in_progress', 'completed')),
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  UNIQUE (student_id, lesson_id)
);

CREATE TABLE lesson_homework (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES lessons (id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  response text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lesson_id, student_id)
);

CREATE TABLE student_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons (id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  body text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, lesson_id)
);

CREATE TABLE assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES modules (id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text NOT NULL,
  instructions text NOT NULL,
  objectives jsonb NOT NULL DEFAULT '[]'::jsonb,
  requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  deliverables jsonb NOT NULL DEFAULT '[]'::jsonb,
  rubric jsonb NOT NULL DEFAULT '[]'::jsonb,
  points integer NOT NULL CHECK (points > 0),
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 1,
  customised boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE assignment_solutions (
  assignment_id uuid PRIMARY KEY REFERENCES assignments (id) ON DELETE CASCADE,
  solution text NOT NULL,
  project_guide jsonb,
  customised boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES assignments (id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  written_response text NOT NULL DEFAULT '',
  github_url text,
  file_name text,
  file_mime text,
  file_data bytea,
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'revision_requested', 'accepted')),
  score integer,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  UNIQUE (assignment_id, student_id)
);

CREATE TABLE submission_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES submissions (id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  body text NOT NULL,
  score integer,
  status_after text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES modules (id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  passing_score integer NOT NULL CHECK (passing_score BETWEEN 1 AND 100),
  allow_retakes boolean NOT NULL DEFAULT true,
  published boolean NOT NULL DEFAULT false,
  customised boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES quizzes (id) ON DELETE CASCADE,
  slug text NOT NULL,
  sort_order integer NOT NULL,
  type text NOT NULL CHECK (type IN ('multiple_choice', 'true_false', 'short_answer', 'code_reading')),
  prompt text NOT NULL,
  code_snippet text,
  options jsonb,
  points integer NOT NULL CHECK (points > 0),
  UNIQUE (quiz_id, slug)
);

CREATE TABLE quiz_answer_keys (
  question_id uuid PRIMARY KEY REFERENCES quiz_questions (id) ON DELETE CASCADE,
  correct_answer jsonb NOT NULL,
  explanation text NOT NULL
);

CREATE TABLE quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES quizzes (id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  auto_score integer NOT NULL DEFAULT 0,
  manual_score integer NOT NULL DEFAULT 0,
  total_score integer NOT NULL DEFAULT 0,
  max_score integer NOT NULL DEFAULT 0,
  passed boolean,
  review_status text NOT NULL CHECK (review_status IN ('complete', 'pending_review', 'reviewed')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE quiz_attempt_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES quiz_attempts (id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES quiz_questions (id) ON DELETE CASCADE,
  response jsonb NOT NULL,
  is_correct boolean,
  points_awarded integer,
  max_points integer NOT NULL,
  explanation text NOT NULL DEFAULT '',
  instructor_comment text,
  UNIQUE (attempt_id, question_id)
);

CREATE TABLE class_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  module_id uuid REFERENCES modules (id) ON DELETE SET NULL,
  lesson_id uuid REFERENCES lessons (id) ON DELETE SET NULL,
  starts_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 90 CHECK (duration_minutes BETWEEN 15 AND 240),
  meeting_url text,
  description text NOT NULL DEFAULT '',
  shared_notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  attendance text CHECK (attendance IS NULL OR attendance IN ('present', 'absent', 'excused')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE class_private_notes (
  class_id uuid PRIMARY KEY REFERENCES class_sessions (id) ON DELETE CASCADE,
  body text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  url text NOT NULL UNIQUE,
  description text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  href text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE instructor_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz
);

CREATE INDEX programme_enrollments_student_idx ON programme_enrollments (student_id);
CREATE INDEX modules_programme_idx ON modules (programme_id, sort_order);
CREATE INDEX lessons_module_idx ON lessons (module_id, sort_order);
CREATE INDEX lesson_progress_student_idx ON lesson_progress (student_id, status);
CREATE INDEX lesson_homework_student_idx ON lesson_homework (student_id);
CREATE INDEX student_notes_student_idx ON student_notes (student_id, updated_at DESC);
CREATE INDEX assignments_module_idx ON assignments (module_id);
CREATE INDEX submissions_student_idx ON submissions (student_id, status);
CREATE INDEX submission_feedback_submission_idx ON submission_feedback (submission_id, created_at);
CREATE INDEX quizzes_module_idx ON quizzes (module_id);
CREATE INDEX quiz_questions_quiz_idx ON quiz_questions (quiz_id, sort_order);
CREATE INDEX quiz_attempts_student_idx ON quiz_attempts (student_id, quiz_id, submitted_at DESC);
CREATE INDEX class_sessions_student_idx ON class_sessions (student_id, starts_at);
CREATE INDEX class_sessions_instructor_idx ON class_sessions (instructor_id, starts_at);
CREATE INDEX announcements_published_idx ON announcements (published, created_at DESC);
CREATE INDEX notifications_user_idx ON notifications (user_id, created_at DESC);
CREATE INDEX instructor_notes_student_idx ON instructor_notes (student_id, created_at DESC);
CREATE INDEX password_reset_tokens_hash_idx ON password_reset_tokens (token_hash);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER programmes_updated BEFORE UPDATE ON programmes FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER student_profiles_updated BEFORE UPDATE ON student_profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER modules_updated BEFORE UPDATE ON modules FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER lessons_updated BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER instructor_guides_updated BEFORE UPDATE ON instructor_guides FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER assignments_updated BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER assignment_solutions_updated BEFORE UPDATE ON assignment_solutions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER quizzes_updated BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER class_sessions_updated BEFORE UPDATE ON class_sessions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER class_private_notes_updated BEFORE UPDATE ON class_private_notes FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER announcements_updated BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER student_notes_updated BEFORE UPDATE ON student_notes FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE FUNCTION protect_user_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF current_setting('app.trusted_password_update', true) = '1' THEN
    RETURN NEW;
  END IF;
  IF NEW.password_hash IS DISTINCT FROM OLD.password_hash
     OR NEW.role IS DISTINCT FROM OLD.role
     OR NEW.id IS DISTINCT FROM OLD.id THEN
    RAISE EXCEPTION 'not allowed';
  END IF;
  IF current_setting('app.role', true) = 'instructor' THEN
    RETURN NEW;
  END IF;
  IF current_setting('app.role', true) = 'student'
     AND OLD.id::text = current_setting('app.user_id', true) THEN
    IF NEW.email IS DISTINCT FROM OLD.email
       OR NEW.is_active IS DISTINCT FROM OLD.is_active
       OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
      RAISE EXCEPTION 'not allowed';
    END IF;
    RETURN NEW;
  END IF;
  RAISE EXCEPTION 'not allowed';
END;
$$;

CREATE TRIGGER users_protect BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION protect_user_update();

CREATE OR REPLACE FUNCTION protect_submission()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.file_data IS NOT NULL AND octet_length(NEW.file_data) > 2097152 THEN
    RAISE EXCEPTION 'Files must be 2 MB or smaller';
  END IF;
  IF current_setting('app.role', true) = 'instructor' THEN
    RETURN NEW;
  END IF;
  IF current_setting('app.role', true) IS DISTINCT FROM 'student' THEN
    RAISE EXCEPTION 'not allowed';
  END IF;
  IF TG_OP = 'INSERT' THEN
    NEW.student_id := nullif(current_setting('app.user_id', true), '')::uuid;
    NEW.status := 'submitted';
    NEW.score := NULL;
    NEW.reviewed_at := NULL;
    NEW.submitted_at := now();
    RETURN NEW;
  END IF;
  IF OLD.student_id::text IS DISTINCT FROM current_setting('app.user_id', true) THEN
    RAISE EXCEPTION 'not allowed';
  END IF;
  IF OLD.status = 'accepted' THEN
    RAISE EXCEPTION 'This submission has been accepted';
  END IF;
  NEW.student_id := OLD.student_id;
  NEW.assignment_id := OLD.assignment_id;
  NEW.id := OLD.id;
  NEW.status := 'submitted';
  NEW.score := NULL;
  NEW.reviewed_at := NULL;
  NEW.submitted_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER submissions_protect BEFORE INSERT OR UPDATE ON submissions FOR EACH ROW EXECUTE FUNCTION protect_submission();

CREATE OR REPLACE FUNCTION protect_owned_student_row()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF current_setting('app.role', true) = 'instructor' THEN
    RETURN NEW;
  END IF;
  IF TG_OP = 'INSERT' THEN
    NEW.student_id := nullif(current_setting('app.user_id', true), '')::uuid;
  ELSIF OLD.student_id::text IS DISTINCT FROM current_setting('app.user_id', true) THEN
    RAISE EXCEPTION 'not allowed';
  ELSE
    NEW.student_id := OLD.student_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER lesson_progress_owner BEFORE INSERT OR UPDATE ON lesson_progress FOR EACH ROW EXECUTE FUNCTION protect_owned_student_row();
CREATE TRIGGER lesson_homework_owner BEFORE INSERT OR UPDATE ON lesson_homework FOR EACH ROW EXECUTE FUNCTION protect_owned_student_row();
CREATE TRIGGER student_notes_owner BEFORE INSERT OR UPDATE ON student_notes FOR EACH ROW EXECUTE FUNCTION protect_owned_student_row();

CREATE OR REPLACE FUNCTION protect_feedback()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF current_setting('app.role', true) IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'not allowed';
  END IF;
  NEW.author_id := nullif(current_setting('app.user_id', true), '')::uuid;
  RETURN NEW;
END;
$$;

CREATE TRIGGER submission_feedback_author BEFORE INSERT ON submission_feedback FOR EACH ROW EXECUTE FUNCTION protect_feedback();

CREATE OR REPLACE FUNCTION app_role()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT current_setting('app.role', true)
$$;

CREATE OR REPLACE FUNCTION app_uid()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT nullif(current_setting('app.user_id', true), '')::uuid
$$;

CREATE OR REPLACE FUNCTION enrolled_in_programme(p_programme_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM programme_enrollments e
    WHERE e.programme_id = p_programme_id
      AND e.student_id = nullif(current_setting('app.user_id', true), '')::uuid
      AND e.status = 'active'
  )
$$;

CREATE OR REPLACE FUNCTION module_is_visible(p_module_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM modules m
    WHERE m.id = p_module_id
      AND m.published = true
      AND enrolled_in_programme(m.programme_id)
  )
$$;

ALTER TABLE programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE programmes FORCE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE programme_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE programme_enrollments FORCE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules FORCE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons FORCE ROW LEVEL SECURITY;
ALTER TABLE instructor_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_guides FORCE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress FORCE ROW LEVEL SECURITY;
ALTER TABLE lesson_homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_homework FORCE ROW LEVEL SECURITY;
ALTER TABLE student_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_notes FORCE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments FORCE ROW LEVEL SECURITY;
ALTER TABLE assignment_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_solutions FORCE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions FORCE ROW LEVEL SECURITY;
ALTER TABLE submission_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_feedback FORCE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes FORCE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions FORCE ROW LEVEL SECURITY;
ALTER TABLE quiz_answer_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answer_keys FORCE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts FORCE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempt_answers FORCE ROW LEVEL SECURITY;
ALTER TABLE class_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sessions FORCE ROW LEVEL SECURITY;
ALTER TABLE class_private_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_private_notes FORCE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements FORCE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources FORCE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications FORCE ROW LEVEL SECURITY;
ALTER TABLE instructor_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_notes FORCE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens FORCE ROW LEVEL SECURITY;

CREATE POLICY programmes_instructor ON programmes FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY programmes_student ON programmes FOR SELECT
  USING (published = true AND enrolled_in_programme(id));

CREATE POLICY users_instructor ON users FOR SELECT
  USING (app_role() = 'instructor');
CREATE POLICY users_instructor_update ON users FOR UPDATE
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY users_student_select ON users FOR SELECT
  USING (app_role() = 'student' AND id = app_uid());
CREATE POLICY users_student_update ON users FOR UPDATE
  USING (app_role() = 'student' AND id = app_uid())
  WITH CHECK (app_role() = 'student' AND id = app_uid());

CREATE POLICY profiles_instructor ON student_profiles FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY profiles_student ON student_profiles FOR ALL
  USING (app_role() = 'student' AND user_id = app_uid())
  WITH CHECK (app_role() = 'student' AND user_id = app_uid());

CREATE POLICY enrollments_instructor ON programme_enrollments FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY enrollments_student ON programme_enrollments FOR SELECT
  USING (student_id = app_uid());

CREATE POLICY modules_instructor ON modules FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY modules_student ON modules FOR SELECT
  USING (app_role() = 'student' AND published = true AND enrolled_in_programme(programme_id));

CREATE POLICY lessons_instructor ON lessons FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY lessons_student ON lessons FOR SELECT
  USING (app_role() = 'student' AND published = true AND module_is_visible(module_id));

CREATE POLICY guides_instructor ON instructor_guides FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');

CREATE POLICY progress_instructor ON lesson_progress FOR SELECT
  USING (app_role() = 'instructor');
CREATE POLICY progress_student_select ON lesson_progress FOR SELECT
  USING (student_id = app_uid());
CREATE POLICY progress_student_insert ON lesson_progress FOR INSERT
  WITH CHECK (app_role() = 'student' AND student_id = app_uid());
CREATE POLICY progress_student_update ON lesson_progress FOR UPDATE
  USING (student_id = app_uid()) WITH CHECK (student_id = app_uid());

CREATE POLICY homework_instructor ON lesson_homework FOR SELECT
  USING (app_role() = 'instructor');
CREATE POLICY homework_student_select ON lesson_homework FOR SELECT
  USING (student_id = app_uid());
CREATE POLICY homework_student_insert ON lesson_homework FOR INSERT
  WITH CHECK (app_role() = 'student' AND student_id = app_uid());
CREATE POLICY homework_student_update ON lesson_homework FOR UPDATE
  USING (student_id = app_uid()) WITH CHECK (student_id = app_uid());

CREATE POLICY notes_student_select ON student_notes FOR SELECT
  USING (student_id = app_uid());
CREATE POLICY notes_student_insert ON student_notes FOR INSERT
  WITH CHECK (app_role() = 'student' AND student_id = app_uid());
CREATE POLICY notes_student_update ON student_notes FOR UPDATE
  USING (student_id = app_uid()) WITH CHECK (student_id = app_uid());
CREATE POLICY notes_student_delete ON student_notes FOR DELETE
  USING (student_id = app_uid());

CREATE POLICY assignments_instructor ON assignments FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY assignments_student ON assignments FOR SELECT
  USING (app_role() = 'student' AND published = true AND module_is_visible(module_id));

CREATE POLICY solutions_instructor ON assignment_solutions FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');

CREATE POLICY submissions_instructor ON submissions FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY submissions_student_select ON submissions FOR SELECT
  USING (student_id = app_uid());
CREATE POLICY submissions_student_insert ON submissions FOR INSERT
  WITH CHECK (app_role() = 'student' AND student_id = app_uid());
CREATE POLICY submissions_student_update ON submissions FOR UPDATE
  USING (student_id = app_uid()) WITH CHECK (student_id = app_uid());

CREATE POLICY feedback_instructor ON submission_feedback FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY feedback_student ON submission_feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM submissions s
      WHERE s.id = submission_feedback.submission_id AND s.student_id = app_uid()
    )
  );

CREATE POLICY quizzes_instructor ON quizzes FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY quizzes_student ON quizzes FOR SELECT
  USING (app_role() = 'student' AND published = true AND module_is_visible(module_id));

CREATE POLICY questions_instructor ON quiz_questions FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY questions_student ON quiz_questions FOR SELECT
  USING (
    app_role() = 'student'
    AND EXISTS (
      SELECT 1 FROM quizzes q
      WHERE q.id = quiz_questions.quiz_id AND q.published = true AND module_is_visible(q.module_id)
    )
  );

CREATE POLICY answer_keys_instructor ON quiz_answer_keys FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');

CREATE POLICY attempts_instructor ON quiz_attempts FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY attempts_student ON quiz_attempts FOR SELECT
  USING (student_id = app_uid());

CREATE POLICY attempt_answers_instructor ON quiz_attempt_answers FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY attempt_answers_student ON quiz_attempt_answers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM quiz_attempts a
      WHERE a.id = quiz_attempt_answers.attempt_id AND a.student_id = app_uid()
    )
  );

CREATE POLICY classes_instructor ON class_sessions FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY classes_student ON class_sessions FOR SELECT
  USING (student_id = app_uid());

CREATE POLICY class_private_instructor ON class_private_notes FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');

CREATE POLICY announcements_instructor ON announcements FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY announcements_student ON announcements FOR SELECT
  USING (app_role() = 'student' AND published = true);

CREATE POLICY resources_instructor ON resources FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');
CREATE POLICY resources_student ON resources FOR SELECT
  USING (app_role() = 'student' AND published = true);

CREATE POLICY notifications_select ON notifications FOR SELECT
  USING (user_id = app_uid() OR app_role() = 'instructor');
CREATE POLICY notifications_insert ON notifications FOR INSERT
  WITH CHECK (app_role() = 'instructor' OR user_id = app_uid());
CREATE POLICY notifications_update ON notifications FOR UPDATE
  USING (user_id = app_uid()) WITH CHECK (user_id = app_uid());

CREATE POLICY instructor_notes_all ON instructor_notes FOR ALL
  USING (app_role() = 'instructor') WITH CHECK (app_role() = 'instructor');

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO marie_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO marie_app;
REVOKE ALL ON TABLE password_reset_tokens FROM marie_app;
REVOKE ALL ON TABLE users FROM marie_app;
GRANT SELECT (
  id, email, role, full_name, preferred_name, timezone, is_active, onboarding_completed, created_at, updated_at
) ON users TO marie_app;
GRANT UPDATE (
  full_name, preferred_name, timezone, is_active, onboarding_completed, email, updated_at
) ON users TO marie_app;

REVOKE ALL ON FUNCTION app_role() FROM PUBLIC;
REVOKE ALL ON FUNCTION app_uid() FROM PUBLIC;
REVOKE ALL ON FUNCTION enrolled_in_programme(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION module_is_visible(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION app_role() TO marie_app;
GRANT EXECUTE ON FUNCTION app_uid() TO marie_app;
GRANT EXECUTE ON FUNCTION enrolled_in_programme(uuid) TO marie_app;
GRANT EXECUTE ON FUNCTION module_is_visible(uuid) TO marie_app;

CREATE OR REPLACE FUNCTION login_user(p_email text, p_password text)
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
BEGIN
  RETURN QUERY
  SELECT u.id, u.email, u.role, u.full_name, u.preferred_name, u.timezone, u.onboarding_completed
  FROM users u
  WHERE u.email = lower(trim(p_email))
    AND u.is_active = true
    AND u.password_hash = crypt(p_password, u.password_hash);
END;
$$;

CREATE OR REPLACE FUNCTION register_student(p_email text, p_password text, p_full_name text)
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
  v_id uuid := gen_random_uuid();
  v_programme uuid;
BEGIN
  IF char_length(trim(coalesce(p_full_name, ''))) < 2 THEN
    RAISE EXCEPTION 'Enter your full name';
  END IF;
  IF p_password IS NULL OR char_length(p_password) < 8 THEN
    RAISE EXCEPTION 'Use at least 8 characters';
  END IF;
  IF lower(trim(coalesce(p_email, ''))) !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Enter a valid email address';
  END IF;
  IF EXISTS (SELECT 1 FROM users u WHERE u.email = lower(trim(p_email))) THEN
    RAISE EXCEPTION 'An account with this email already exists';
  END IF;
  SELECT p.id INTO v_programme FROM programmes p WHERE p.slug = 'full-stack-beginners' AND p.published = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'The programme is not ready yet';
  END IF;
  INSERT INTO users (id, email, password_hash, role, full_name, timezone, onboarding_completed)
  VALUES (
    v_id,
    lower(trim(p_email)),
    crypt(p_password, gen_salt('bf', 10)),
    'student',
    trim(p_full_name),
    'UTC',
    false
  );
  INSERT INTO student_profiles (user_id) VALUES (v_id);
  INSERT INTO programme_enrollments (id, programme_id, student_id, status)
  VALUES (gen_random_uuid(), v_programme, v_id, 'active');
  RETURN QUERY
  SELECT u.id, u.email, u.role, u.full_name, u.preferred_name, u.timezone, u.onboarding_completed
  FROM users u WHERE u.id = v_id;
END;
$$;

CREATE OR REPLACE FUNCTION create_student_account(p_email text, p_password text, p_full_name text)
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
BEGIN
  IF current_setting('app.role', true) IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'Only an instructor can create this account';
  END IF;
  RETURN QUERY SELECT * FROM register_student(p_email, p_password, p_full_name);
END;
$$;

CREATE OR REPLACE FUNCTION change_password(p_user_id uuid, p_current text, p_new text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role text := current_setting('app.role', true);
  v_actor uuid := nullif(current_setting('app.user_id', true), '')::uuid;
  v_hash text;
BEGIN
  IF p_new IS NULL OR char_length(p_new) < 8 THEN
    RAISE EXCEPTION 'Use at least 8 characters';
  END IF;
  SELECT u.password_hash INTO v_hash FROM users u WHERE u.id = p_user_id AND u.is_active = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Account not found';
  END IF;
  IF v_actor = p_user_id THEN
    IF v_hash IS DISTINCT FROM crypt(coalesce(p_current, ''), v_hash) THEN
      RAISE EXCEPTION 'Current password is incorrect';
    END IF;
  ELSIF v_role IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'not allowed';
  END IF;
  PERFORM set_config('app.trusted_password_update', '1', true);
  UPDATE users
  SET password_hash = crypt(p_new, gen_salt('bf', 10))
  WHERE id = p_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION request_password_reset(p_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid;
  v_token text;
BEGIN
  SELECT u.id INTO v_user FROM users u WHERE u.email = lower(trim(p_email)) AND u.is_active = true;
  IF NOT FOUND THEN
    RETURN '';
  END IF;
  v_token := encode(gen_random_bytes(32), 'hex');
  UPDATE password_reset_tokens SET used_at = now() WHERE user_id = v_user AND used_at IS NULL;
  INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at)
  VALUES (
    gen_random_uuid(),
    v_user,
    encode(digest(v_token, 'sha256'), 'hex'),
    now() + interval '1 hour'
  );
  RETURN v_token;
END;
$$;

CREATE OR REPLACE FUNCTION reset_password(p_token text, p_new text)
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
  v_user uuid;
BEGIN
  IF p_new IS NULL OR char_length(p_new) < 8 THEN
    RAISE EXCEPTION 'Use at least 8 characters';
  END IF;
  SELECT t.user_id INTO v_user
  FROM password_reset_tokens t
  WHERE t.token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex')
    AND t.used_at IS NULL
    AND t.expires_at > now()
  ORDER BY t.expires_at DESC
  LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'This reset link is invalid or has expired';
  END IF;
  PERFORM set_config('app.trusted_password_update', '1', true);
  UPDATE users SET password_hash = crypt(p_new, gen_salt('bf', 10))
  WHERE users.id = v_user AND is_active = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Account not found';
  END IF;
  UPDATE password_reset_tokens SET used_at = now()
  WHERE token_hash = encode(digest(p_token, 'sha256'), 'hex') AND used_at IS NULL;
  RETURN QUERY
  SELECT u.id, u.email, u.role, u.full_name, u.preferred_name, u.timezone, u.onboarding_completed
  FROM users u WHERE u.id = v_user;
END;
$$;

CREATE OR REPLACE FUNCTION submit_quiz_attempt(p_quiz_id uuid, p_answers jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid;
  v_quiz quizzes%ROWTYPE;
  v_attempt_id uuid := gen_random_uuid();
  v_question record;
  v_response text;
  v_correct boolean;
  v_points integer;
  v_pending boolean;
  v_any_pending boolean := false;
  v_auto integer := 0;
  v_awarded integer := 0;
  v_max integer := 0;
  v_passed boolean;
  v_status text;
  v_results jsonb := '[]'::jsonb;
BEGIN
  IF current_setting('app.role', true) IS DISTINCT FROM 'student' THEN
    RAISE EXCEPTION 'Sign in as a student to take this quiz';
  END IF;
  v_user := nullif(current_setting('app.user_id', true), '')::uuid;
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'Sign in as a student to take this quiz';
  END IF;

  SELECT * INTO v_quiz FROM quizzes WHERE id = p_quiz_id AND published = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'This quiz is not available';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM modules m
    JOIN programme_enrollments e ON e.programme_id = m.programme_id
    WHERE m.id = v_quiz.module_id
      AND e.student_id = v_user
      AND e.status = 'active'
  ) THEN
    RAISE EXCEPTION 'You are not enrolled in this programme';
  END IF;

  IF v_quiz.allow_retakes IS FALSE AND EXISTS (
    SELECT 1 FROM quiz_attempts qa WHERE qa.quiz_id = p_quiz_id AND qa.student_id = v_user
  ) THEN
    RAISE EXCEPTION 'Retakes are turned off for this quiz';
  END IF;

  IF p_answers IS NULL OR jsonb_typeof(p_answers) <> 'array' THEN
    RAISE EXCEPTION 'Submit your answers as a list';
  END IF;

  INSERT INTO quiz_attempts (
    id, quiz_id, student_id, submitted_at, auto_score, manual_score, total_score, max_score, passed, review_status
  ) VALUES (
    v_attempt_id, p_quiz_id, v_user, now(), 0, 0, 0, 0, NULL, 'complete'
  );

  FOR v_question IN
    SELECT qq.id, qq.prompt, qq.type, qq.points, k.correct_answer, k.explanation
    FROM quiz_questions qq
    JOIN quiz_answer_keys k ON k.question_id = qq.id
    WHERE qq.quiz_id = p_quiz_id
    ORDER BY qq.sort_order
  LOOP
    SELECT left(elem->>'value', 5000) INTO v_response
    FROM jsonb_array_elements(p_answers) elem
    WHERE elem->>'questionId' = v_question.id::text
    LIMIT 1;

    v_correct := NULL;
    v_points := NULL;
    v_pending := false;

    IF v_question.type IN ('multiple_choice', 'code_reading') THEN
      v_correct := v_response IS NOT NULL AND v_response = v_question.correct_answer->>'optionId';
      v_points := CASE WHEN v_correct THEN v_question.points ELSE 0 END;
      v_auto := v_auto + v_points;
    ELSIF v_question.type = 'true_false' THEN
      v_correct := v_response IS NOT NULL AND v_response = CASE
        WHEN coalesce((v_question.correct_answer->>'value')::boolean, false) THEN 'true'
        ELSE 'false'
      END;
      v_points := CASE WHEN v_correct THEN v_question.points ELSE 0 END;
      v_auto := v_auto + v_points;
    ELSIF v_response IS NULL OR length(trim(v_response)) = 0 THEN
      v_correct := false;
      v_points := 0;
    ELSE
      v_pending := true;
      v_any_pending := true;
    END IF;

    INSERT INTO quiz_attempt_answers (
      id, attempt_id, question_id, response, is_correct, points_awarded, max_points, explanation
    ) VALUES (
      gen_random_uuid(),
      v_attempt_id,
      v_question.id,
      jsonb_build_object('value', coalesce(v_response, '')),
      v_correct,
      v_points,
      v_question.points,
      v_question.explanation
    );

    v_results := v_results || jsonb_build_array(jsonb_build_object(
      'questionId', v_question.id,
      'prompt', v_question.prompt,
      'response', coalesce(v_response, ''),
      'isCorrect', v_correct,
      'pointsAwarded', v_points,
      'maxPoints', v_question.points,
      'explanation', v_question.explanation,
      'pending', v_pending
    ));
  END LOOP;

  SELECT coalesce(sum(points_awarded), 0), coalesce(sum(max_points), 0)
    INTO v_awarded, v_max
  FROM quiz_attempt_answers
  WHERE attempt_id = v_attempt_id;

  v_status := CASE WHEN v_any_pending THEN 'pending_review' ELSE 'complete' END;
  IF v_any_pending OR v_max = 0 THEN
    v_passed := NULL;
  ELSE
    v_passed := (v_awarded::numeric / v_max::numeric) * 100 >= v_quiz.passing_score;
  END IF;

  UPDATE quiz_attempts
  SET auto_score = v_auto,
      manual_score = 0,
      total_score = v_awarded,
      max_score = v_max,
      passed = v_passed,
      review_status = v_status
  WHERE id = v_attempt_id;

  RETURN jsonb_build_object(
    'attemptId', v_attempt_id,
    'totalScore', v_awarded,
    'maxScore', v_max,
    'passed', v_passed,
    'reviewStatus', v_status,
    'passingScore', v_quiz.passing_score,
    'questions', v_results
  );
END;
$$;

CREATE OR REPLACE FUNCTION public_catalogue()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(
    jsonb_agg(
      jsonb_build_object(
        'number', m.number,
        'week', m.week_number,
        'month', m.month_label,
        'title', m.title,
        'description', m.description,
        'lessons', (SELECT count(*) FROM lessons l WHERE l.module_id = m.id AND l.published = true)
      )
      ORDER BY m.sort_order
    ),
    '[]'::jsonb
  )
  FROM modules m
  JOIN programmes p ON p.id = m.programme_id
  WHERE m.published = true AND p.published = true;
$$;

REVOKE ALL ON FUNCTION login_user(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION register_student(text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION create_student_account(text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION change_password(uuid, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION request_password_reset(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION reset_password(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION submit_quiz_attempt(uuid, jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public_catalogue() FROM PUBLIC;

GRANT EXECUTE ON FUNCTION login_user(text, text) TO marie_app;
GRANT EXECUTE ON FUNCTION register_student(text, text, text) TO marie_app;
GRANT EXECUTE ON FUNCTION create_student_account(text, text, text) TO marie_app;
GRANT EXECUTE ON FUNCTION change_password(uuid, text, text) TO marie_app;
GRANT EXECUTE ON FUNCTION request_password_reset(text) TO marie_app;
GRANT EXECUTE ON FUNCTION reset_password(text, text) TO marie_app;
GRANT EXECUTE ON FUNCTION submit_quiz_attempt(uuid, jsonb) TO marie_app;
GRANT EXECUTE ON FUNCTION public_catalogue() TO marie_app;
