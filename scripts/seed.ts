import { readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import postgres from "postgres";
import { v5 as uuidv5 } from "uuid";
import type { ModuleSeed } from "../src/lib/content-types";
import { assessLessonSeed } from "../src/lib/completeness";
import { programme } from "../src/lib/catalogue";
import { resources } from "../content/resources";
import { required } from "./env";

const NAMESPACE = "8c2e1b4a-6d3f-4a8e-9c1b-2d4e6f8a0b1c";
const cid = (key: string) => uuidv5(key, NAMESPACE);

function readModule(imported: Record<string, unknown>, key: string): ModuleSeed | undefined {
  if (imported[key]) return imported[key] as ModuleSeed;
  const nested = imported.default;
  if (nested && typeof nested === "object") {
    const record = nested as Record<string, unknown>;
    if (record[key]) return record[key] as ModuleSeed;
    if ("slug" in record && "lessons" in record) return record as unknown as ModuleSeed;
  }
  return undefined;
}

async function loadCurriculum(): Promise<ModuleSeed[]> {
  const directory = resolve(process.cwd(), "content/weeks");
  const files = readdirSync(directory)
    .filter((file) => /^week\d+\.ts$/.test(file))
    .sort();
  const modules: ModuleSeed[] = [];
  for (const file of files) {
    const imported = await import(pathToFileURL(resolve(directory, file)).href);
    const key = file.replace(".ts", "");
    const value = readModule(imported, key);
    if (!value) throw new Error(`${file} must export ${key}`);
    modules.push(value);
  }
  return modules.sort((a, b) => a.number - b.number);
}

async function main() {
  const admin = postgres(required("DATABASE_ADMIN_URL"), { max: 1, onnotice: () => undefined });
  await admin`SELECT set_config('app.trusted_password_update', '1', false)`;
  await admin`SELECT set_config('app.role', 'instructor', false)`;
  const force = process.env.SEED_FORCE === "true";
  const resetPasswords = process.env.SEED_RESET_PASSWORDS === "true";
  const curriculum = await loadCurriculum();
  if (curriculum.length !== 16) {
    throw new Error(`Expected 16 week files in content/weeks, found ${curriculum.length}.`);
  }

  const programmeId = cid("programme:full-stack-beginners");
  await admin`
    INSERT INTO programmes (id, slug, title, description, duration_weeks, published)
    VALUES (${programmeId}, ${programme.slug}, ${programme.title}, ${programme.description}, 16, true)
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      duration_weeks = EXCLUDED.duration_weeks,
      published = true
  `;

  await upsertUser(admin, {
    key: "user:instructor",
    email: required("INSTRUCTOR_EMAIL").toLowerCase(),
    password: required("INSTRUCTOR_PASSWORD"),
    role: "instructor",
    fullName: process.env.INSTRUCTOR_NAME || "Programme Instructor",
    timezone: process.env.INSTRUCTOR_TIMEZONE || "UTC",
    onboarding: true,
    resetPasswords,
  });

  if (process.env.SEED_DEMO_STUDENT === "true") {
    const studentId = await upsertUser(admin, {
      key: "user:demo-student",
      email: (process.env.DEMO_STUDENT_EMAIL || "student@marie.local").toLowerCase(),
      password: process.env.DEMO_STUDENT_PASSWORD || "ChangeMe-Student-2026",
      role: "student",
      fullName: process.env.DEMO_STUDENT_NAME || "Demo Student",
      timezone: "Africa/Lagos",
      onboarding: false,
      resetPasswords,
    });
    await admin`
      INSERT INTO student_profiles (user_id)
      VALUES (${studentId})
      ON CONFLICT (user_id) DO NOTHING
    `;
    await admin`
      INSERT INTO programme_enrollments (id, programme_id, student_id, status)
      VALUES (${cid("enrollment:demo")}, ${programmeId}, ${studentId}, 'active')
      ON CONFLICT (programme_id, student_id) DO NOTHING
    `;
  }

  for (const [index, item] of curriculum.entries()) {
    const moduleId = cid(`module:${item.slug}`);
    await admin`
      INSERT INTO modules (
        id, programme_id, slug, number, week_number, month_label, title, description, published, sort_order, customised
      ) VALUES (
        ${moduleId}, ${programmeId}, ${item.slug}, ${item.number}, ${item.weekNumber}, ${item.monthLabel},
        ${item.title}, ${item.description}, true, ${index + 1}, false
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = CASE WHEN modules.customised AND NOT ${force} THEN modules.title ELSE EXCLUDED.title END,
        description = CASE WHEN modules.customised AND NOT ${force} THEN modules.description ELSE EXCLUDED.description END,
        month_label = CASE WHEN modules.customised AND NOT ${force} THEN modules.month_label ELSE EXCLUDED.month_label END,
        customised = CASE WHEN ${force} THEN false ELSE modules.customised END
    `;

    for (const [lessonIndex, lesson] of item.lessons.entries()) {
      const lessonId = cid(`lesson:${lesson.slug}`);
      const completeness = assessLessonSeed(lesson);
      await admin`
        INSERT INTO lessons (
          id, module_id, slug, session_number, title, estimated_minutes, difficulty, student_content,
          published, sort_order, customised, completeness
        ) VALUES (
          ${lessonId}, ${moduleId}, ${lesson.slug}, ${lesson.sessionNumber}, ${lesson.title},
          ${lesson.estimatedMinutes}, ${lesson.difficulty}, ${admin.json(lesson.content)},
          true, ${lessonIndex + 1}, false, ${admin.json(completeness)}
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = CASE WHEN lessons.customised AND NOT ${force} THEN lessons.title ELSE EXCLUDED.title END,
          student_content = CASE WHEN lessons.customised AND NOT ${force} THEN lessons.student_content ELSE EXCLUDED.student_content END,
          estimated_minutes = CASE WHEN lessons.customised AND NOT ${force} THEN lessons.estimated_minutes ELSE EXCLUDED.estimated_minutes END,
          difficulty = CASE WHEN lessons.customised AND NOT ${force} THEN lessons.difficulty ELSE EXCLUDED.difficulty END,
          completeness = CASE WHEN lessons.customised AND NOT ${force} THEN lessons.completeness ELSE EXCLUDED.completeness END,
          customised = CASE WHEN ${force} THEN false ELSE lessons.customised END
      `;
      await admin`
        INSERT INTO instructor_guides (lesson_id, content, customised)
        VALUES (${lessonId}, ${admin.json(lesson.guide)}, false)
        ON CONFLICT (lesson_id) DO UPDATE SET
          content = CASE WHEN instructor_guides.customised AND NOT ${force} THEN instructor_guides.content ELSE EXCLUDED.content END,
          customised = CASE WHEN ${force} THEN false ELSE instructor_guides.customised END
      `;
    }

    const assignmentId = cid(`assignment:${item.assignment.slug}`);
    await admin`
      INSERT INTO assignments (
        id, module_id, slug, title, summary, instructions, objectives, requirements, deliverables, rubric,
        points, published, sort_order, customised
      ) VALUES (
        ${assignmentId}, ${moduleId}, ${item.assignment.slug}, ${item.assignment.title}, ${item.assignment.summary},
        ${item.assignment.instructions}, ${admin.json(item.assignment.objectives)}, ${admin.json(item.assignment.requirements)},
        ${admin.json(item.assignment.deliverables)}, ${admin.json(item.assignment.rubric)}, ${item.assignment.points},
        true, 1, false
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = CASE WHEN assignments.customised AND NOT ${force} THEN assignments.title ELSE EXCLUDED.title END,
        summary = CASE WHEN assignments.customised AND NOT ${force} THEN assignments.summary ELSE EXCLUDED.summary END,
        instructions = CASE WHEN assignments.customised AND NOT ${force} THEN assignments.instructions ELSE EXCLUDED.instructions END,
        objectives = CASE WHEN assignments.customised AND NOT ${force} THEN assignments.objectives ELSE EXCLUDED.objectives END,
        requirements = CASE WHEN assignments.customised AND NOT ${force} THEN assignments.requirements ELSE EXCLUDED.requirements END,
        deliverables = CASE WHEN assignments.customised AND NOT ${force} THEN assignments.deliverables ELSE EXCLUDED.deliverables END,
        rubric = CASE WHEN assignments.customised AND NOT ${force} THEN assignments.rubric ELSE EXCLUDED.rubric END,
        points = CASE WHEN assignments.customised AND NOT ${force} THEN assignments.points ELSE EXCLUDED.points END,
        customised = CASE WHEN ${force} THEN false ELSE assignments.customised END
    `;
    await admin`
      INSERT INTO assignment_solutions (assignment_id, solution, project_guide, customised)
      VALUES (
        ${assignmentId}, ${item.assignment.instructorSolution}, ${admin.json(item.assignment.projectGuide ?? null)}, false
      )
      ON CONFLICT (assignment_id) DO UPDATE SET
        solution = CASE WHEN assignment_solutions.customised AND NOT ${force} THEN assignment_solutions.solution ELSE EXCLUDED.solution END,
        project_guide = CASE WHEN assignment_solutions.customised AND NOT ${force} THEN assignment_solutions.project_guide ELSE EXCLUDED.project_guide END,
        customised = CASE WHEN ${force} THEN false ELSE assignment_solutions.customised END
    `;

    const quizId = cid(`quiz:${item.quiz.slug}`);
    await admin`
      INSERT INTO quizzes (id, module_id, slug, title, passing_score, allow_retakes, published, customised)
      VALUES (
        ${quizId}, ${moduleId}, ${item.quiz.slug}, ${item.quiz.title}, ${item.quiz.passingScore},
        ${item.quiz.allowRetakes}, true, false
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = CASE WHEN quizzes.customised AND NOT ${force} THEN quizzes.title ELSE EXCLUDED.title END,
        passing_score = CASE WHEN quizzes.customised AND NOT ${force} THEN quizzes.passing_score ELSE EXCLUDED.passing_score END,
        allow_retakes = CASE WHEN quizzes.customised AND NOT ${force} THEN quizzes.allow_retakes ELSE EXCLUDED.allow_retakes END,
        customised = CASE WHEN ${force} THEN false ELSE quizzes.customised END
    `;

    const [quizRow] = await admin<{ customised: boolean }[]>`SELECT customised FROM quizzes WHERE id = ${quizId}`;
    if (force || !quizRow?.customised) {
      const questionIds = item.quiz.questions.map((question) => cid(`question:${item.quiz.slug}:${question.slug}`));
      await admin`
        DELETE FROM quiz_questions
        WHERE quiz_id = ${quizId}
          AND NOT (id = ANY(${questionIds}))
      `;
      for (const [questionIndex, question] of item.quiz.questions.entries()) {
        const questionId = cid(`question:${item.quiz.slug}:${question.slug}`);
        await admin`
          INSERT INTO quiz_questions (id, quiz_id, slug, sort_order, type, prompt, code_snippet, options, points)
          VALUES (
            ${questionId}, ${quizId}, ${question.slug}, ${questionIndex + 1}, ${question.type}, ${question.prompt},
            ${question.codeSnippet ?? null}, ${admin.json(question.options ?? null)}, ${question.points}
          )
          ON CONFLICT (quiz_id, slug) DO UPDATE SET
            sort_order = EXCLUDED.sort_order,
            type = EXCLUDED.type,
            prompt = EXCLUDED.prompt,
            code_snippet = EXCLUDED.code_snippet,
            options = EXCLUDED.options,
            points = EXCLUDED.points
        `;
        await admin`
          INSERT INTO quiz_answer_keys (question_id, correct_answer, explanation)
          VALUES (${questionId}, ${admin.json(question.correct)}, ${question.explanation})
          ON CONFLICT (question_id) DO UPDATE SET
            correct_answer = EXCLUDED.correct_answer,
            explanation = EXCLUDED.explanation
        `;
      }
    }
  }

  for (const [index, resource] of resources.entries()) {
    await admin`
      INSERT INTO resources (id, category, title, url, description, sort_order, published)
      VALUES (${cid(`resource:${resource.url}`)}, ${resource.category}, ${resource.title}, ${resource.url}, ${resource.description}, ${index + 1}, true)
      ON CONFLICT (url) DO UPDATE SET
        category = EXCLUDED.category,
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        sort_order = EXCLUDED.sort_order,
        published = true
    `;
  }

  const instructor = await admin<{ id: string }[]>`
    SELECT id FROM users WHERE email = ${required("INSTRUCTOR_EMAIL").toLowerCase()}
  `;
  if (instructor[0]) {
    await admin`
      INSERT INTO announcements (id, author_id, title, body, published)
      VALUES (
        ${cid("announcement:welcome")},
        ${instructor[0].id},
        ${"Welcome to the programme"},
        ${"Welcome. Read Week 1 when you are ready. You do not need to install Git, Node.js, or PostgreSQL on the first day. Each tool is introduced in the week that uses it, with separate steps for Windows, macOS, and Linux."},
        true
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }

  await admin.end();
  console.log(`Seeded ${curriculum.length} modules, instructor account, resources, and the welcome announcement.`);
}

async function upsertUser(
  admin: postgres.Sql,
  input: {
    key: string;
    email: string;
    password: string;
    role: "instructor" | "student";
    fullName: string;
    timezone: string;
    onboarding: boolean;
    resetPasswords: boolean;
  },
) {
  const id = cid(input.key);
  await admin`
    INSERT INTO users (id, email, password_hash, role, full_name, timezone, is_active, onboarding_completed)
    VALUES (
      ${id}, ${input.email}, crypt(${input.password}, gen_salt('bf', 10)), ${input.role},
      ${input.fullName}, ${input.timezone}, true, ${input.onboarding}
    )
    ON CONFLICT (email) DO UPDATE SET
      full_name = CASE WHEN ${input.resetPasswords} THEN EXCLUDED.full_name ELSE users.full_name END,
      password_hash = CASE WHEN ${input.resetPasswords} THEN EXCLUDED.password_hash ELSE users.password_hash END,
      timezone = CASE WHEN users.timezone = 'UTC' THEN EXCLUDED.timezone ELSE users.timezone END
  `;
  const [row] = await admin<{ id: string }[]>`SELECT id FROM users WHERE email = ${input.email}`;
  return row.id;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
