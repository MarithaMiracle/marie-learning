import { boolean, customType, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type {
  ChecklistItem,
  Completeness,
  InstructorGuide,
  LessonContent,
  ProjectGuide,
} from "@/lib/content-types";

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType: () => "bytea",
});

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const programmes = pgTable("programmes", {
  id: uuid("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  durationWeeks: integer("duration_weeks").notNull(),
  published: boolean("published").notNull(),
  ...timestamps,
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  role: text("role").$type<"instructor" | "student">().notNull(),
  fullName: text("full_name").notNull(),
  preferredName: text("preferred_name"),
  timezone: text("timezone").notNull(),
  isActive: boolean("is_active").notNull(),
  onboardingCompleted: boolean("onboarding_completed").notNull(),
  ...timestamps,
});

export const studentProfiles = pgTable("student_profiles", {
  userId: uuid("user_id").primaryKey(),
  country: text("country"),
  operatingSystem: text("operating_system"),
  osVersion: text("os_version"),
  computerExperience: text("computer_experience"),
  codingExperience: text("coding_experience"),
  learningGoals: text("learning_goals"),
  weeklyPractice: text("weekly_practice"),
  setupChecklist: jsonb("setup_checklist").$type<ChecklistItem[]>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const programmeEnrollments = pgTable("programme_enrollments", {
  id: uuid("id").primaryKey(),
  programmeId: uuid("programme_id").notNull(),
  studentId: uuid("student_id").notNull(),
  status: text("status").$type<"active" | "withdrawn">().notNull(),
  enrolledAt: timestamp("enrolled_at", { withTimezone: true }).notNull(),
});

export const modules = pgTable("modules", {
  id: uuid("id").primaryKey(),
  programmeId: uuid("programme_id").notNull(),
  slug: text("slug").notNull(),
  number: integer("number").notNull(),
  weekNumber: integer("week_number").notNull(),
  monthLabel: text("month_label").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  published: boolean("published").notNull(),
  sortOrder: integer("sort_order").notNull(),
  customised: boolean("customised").notNull(),
  ...timestamps,
});

export const lessons = pgTable("lessons", {
  id: uuid("id").primaryKey(),
  moduleId: uuid("module_id").notNull(),
  slug: text("slug").notNull(),
  sessionNumber: integer("session_number").notNull(),
  title: text("title").notNull(),
  estimatedMinutes: integer("estimated_minutes").notNull(),
  difficulty: text("difficulty").notNull(),
  studentContent: jsonb("student_content").$type<LessonContent>().notNull(),
  published: boolean("published").notNull(),
  sortOrder: integer("sort_order").notNull(),
  customised: boolean("customised").notNull(),
  completeness: jsonb("completeness").$type<Completeness>().notNull(),
  ...timestamps,
});

export const instructorGuides = pgTable("instructor_guides", {
  lessonId: uuid("lesson_id").primaryKey(),
  content: jsonb("content").$type<InstructorGuide>().notNull(),
  customised: boolean("customised").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const lessonProgress = pgTable("lesson_progress", {
  id: uuid("id").primaryKey(),
  studentId: uuid("student_id").notNull(),
  lessonId: uuid("lesson_id").notNull(),
  status: text("status").$type<"in_progress" | "completed">().notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const lessonHomework = pgTable("lesson_homework", {
  id: uuid("id").primaryKey(),
  lessonId: uuid("lesson_id").notNull(),
  studentId: uuid("student_id").notNull(),
  response: text("response").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
});

export const studentNotes = pgTable("student_notes", {
  id: uuid("id").primaryKey(),
  studentId: uuid("student_id").notNull(),
  lessonId: uuid("lesson_id"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const assignments = pgTable("assignments", {
  id: uuid("id").primaryKey(),
  moduleId: uuid("module_id").notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  instructions: text("instructions").notNull(),
  objectives: jsonb("objectives").$type<string[]>().notNull(),
  requirements: jsonb("requirements").$type<string[]>().notNull(),
  deliverables: jsonb("deliverables").$type<string[]>().notNull(),
  rubric: jsonb("rubric").$type<{ criterion: string; points: number; description: string }[]>().notNull(),
  points: integer("points").notNull(),
  published: boolean("published").notNull(),
  sortOrder: integer("sort_order").notNull(),
  customised: boolean("customised").notNull(),
  ...timestamps,
});

export const assignmentSolutions = pgTable("assignment_solutions", {
  assignmentId: uuid("assignment_id").primaryKey(),
  solution: text("solution").notNull(),
  projectGuide: jsonb("project_guide").$type<ProjectGuide | null>(),
  customised: boolean("customised").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const submissions = pgTable("submissions", {
  id: uuid("id").primaryKey(),
  assignmentId: uuid("assignment_id").notNull(),
  studentId: uuid("student_id").notNull(),
  writtenResponse: text("written_response").notNull(),
  githubUrl: text("github_url"),
  fileName: text("file_name"),
  fileMime: text("file_mime"),
  fileData: bytea("file_data"),
  status: text("status").$type<"submitted" | "revision_requested" | "accepted">().notNull(),
  score: integer("score"),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
});

export const submissionFeedback = pgTable("submission_feedback", {
  id: uuid("id").primaryKey(),
  submissionId: uuid("submission_id").notNull(),
  authorId: uuid("author_id").notNull(),
  body: text("body").notNull(),
  score: integer("score"),
  statusAfter: text("status_after").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: uuid("id").primaryKey(),
  moduleId: uuid("module_id").notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  passingScore: integer("passing_score").notNull(),
  allowRetakes: boolean("allow_retakes").notNull(),
  published: boolean("published").notNull(),
  customised: boolean("customised").notNull(),
  ...timestamps,
});

export const quizQuestions = pgTable("quiz_questions", {
  id: uuid("id").primaryKey(),
  quizId: uuid("quiz_id").notNull(),
  slug: text("slug").notNull(),
  sortOrder: integer("sort_order").notNull(),
  type: text("type").$type<"multiple_choice" | "true_false" | "short_answer" | "code_reading">().notNull(),
  prompt: text("prompt").notNull(),
  codeSnippet: text("code_snippet"),
  options: jsonb("options").$type<{ id: string; text: string }[] | null>(),
  points: integer("points").notNull(),
});

export const quizAnswerKeys = pgTable("quiz_answer_keys", {
  questionId: uuid("question_id").primaryKey(),
  correctAnswer: jsonb("correct_answer").$type<{ optionId?: string; value?: boolean; rubric?: string }>().notNull(),
  explanation: text("explanation").notNull(),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: uuid("id").primaryKey(),
  quizId: uuid("quiz_id").notNull(),
  studentId: uuid("student_id").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
  autoScore: integer("auto_score").notNull(),
  manualScore: integer("manual_score").notNull(),
  totalScore: integer("total_score").notNull(),
  maxScore: integer("max_score").notNull(),
  passed: boolean("passed"),
  reviewStatus: text("review_status").$type<"complete" | "pending_review" | "reviewed">().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export const quizAttemptAnswers = pgTable("quiz_attempt_answers", {
  id: uuid("id").primaryKey(),
  attemptId: uuid("attempt_id").notNull(),
  questionId: uuid("question_id").notNull(),
  response: jsonb("response").$type<{ value: string }>().notNull(),
  isCorrect: boolean("is_correct"),
  pointsAwarded: integer("points_awarded"),
  maxPoints: integer("max_points").notNull(),
  explanation: text("explanation").notNull(),
  instructorComment: text("instructor_comment"),
});

export const classSessions = pgTable("class_sessions", {
  id: uuid("id").primaryKey(),
  instructorId: uuid("instructor_id").notNull(),
  studentId: uuid("student_id").notNull(),
  moduleId: uuid("module_id"),
  lessonId: uuid("lesson_id"),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  meetingUrl: text("meeting_url"),
  description: text("description").notNull(),
  sharedNotes: text("shared_notes").notNull(),
  status: text("status").$type<"scheduled" | "completed" | "cancelled">().notNull(),
  attendance: text("attendance").$type<"present" | "absent" | "excused" | null>(),
  ...timestamps,
});

export const classPrivateNotes = pgTable("class_private_notes", {
  classId: uuid("class_id").primaryKey(),
  body: text("body").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const announcements = pgTable("announcements", {
  id: uuid("id").primaryKey(),
  authorId: uuid("author_id").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  published: boolean("published").notNull(),
  ...timestamps,
});

export const resources = pgTable("resources", {
  id: uuid("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull(),
  published: boolean("published").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  href: text("href"),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const instructorNotes = pgTable("instructor_notes", {
  id: uuid("id").primaryKey(),
  instructorId: uuid("instructor_id").notNull(),
  studentId: uuid("student_id").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
