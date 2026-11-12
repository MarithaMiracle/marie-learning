-- Practice knowledge-check keys live inside instructor_guides, which students
-- cannot read under RLS. Expose only the answer list for published lessons.

CREATE OR REPLACE FUNCTION knowledge_check_answers(p_lesson_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role text := current_setting('app.role', true);
  v_answers jsonb;
BEGIN
  IF v_role IS DISTINCT FROM 'student' AND v_role IS DISTINCT FROM 'instructor' THEN
    RAISE EXCEPTION 'not allowed';
  END IF;

  IF v_role = 'student' THEN
    IF NOT EXISTS (
      SELECT 1
      FROM lessons l
      WHERE l.id = p_lesson_id
        AND l.published = true
        AND module_is_visible(l.module_id)
    ) THEN
      RAISE EXCEPTION 'not allowed';
    END IF;
  END IF;

  SELECT coalesce(g.content -> 'knowledgeCheckAnswers', '[]'::jsonb)
  INTO v_answers
  FROM instructor_guides g
  WHERE g.lesson_id = p_lesson_id;

  RETURN coalesce(v_answers, '[]'::jsonb);
END;
$$;

REVOKE ALL ON FUNCTION knowledge_check_answers(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION knowledge_check_answers(uuid) TO marie_app;
