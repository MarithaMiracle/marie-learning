"use server";

import { revalidatePath } from "next/cache";
import { and, asc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { assessLessonContent } from "@/lib/completeness";
import type { InstructorGuide, LessonContent, ProjectGuide } from "@/lib/content-types";
import { withActor, type Tx } from "@/lib/db/client";
import {
  announcements,
  assignmentSolutions,
  assignments,
  classPrivateNotes,
  classSessions,
  instructorGuides,
  instructorNotes,
  lessons,
  modules,
  notifications,
  programmes,
  quizAnswerKeys,
  quizAttemptAnswers,
  quizAttempts,
  quizQuestions,
  quizzes,
  resources,
  submissionFeedback,
  submissions,
  users,
} from "@/lib/db/schema";
import { dbErrorMessage, type ActionResult } from "@/lib/errors";
import { isUuid, newId, slugify } from "@/lib/ids";
import { isHttpUrl } from "@/lib/utils";
import { zonedTimeToUtc } from "@/lib/time";

async function notify(tx: Tx, userId: string, title: string, body: string, href?: string) {
  await tx.insert(notifications).values({ id: newId(), userId, title, body, href: href ?? null });
}

function revalidateStudentNotices() {
  revalidatePath("/student", "layout");
  revalidatePath("/student/dashboard");
  revalidatePath("/student/notifications");
}

export async function createStudentAccount(input: { fullName: string; email: string; password: string }): Promise<ActionResult> {
  const user = await requireUser("instructor");
  const parsed = z
    .object({
      fullName: z.string().trim().min(2).max(120),
      email: z.string().trim().email(),
      password: z.string().min(8).max(100),
    })
    .safeParse(input);
  if (!parsed.success) return { ok: false, error: "Enter a name, a valid email, and a password of at least 8 characters." };
  try {
    await withActor(user, async (tx) => {
      await tx.execute(sql`select * from create_student_account(${parsed.data.email}, ${parsed.data.password}, ${parsed.data.fullName})`);
    });
    revalidatePath("/instructor/students");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function setStudentActive(studentId: string, isActive: boolean): Promise<ActionResult> {
  const user = await requireUser("instructor");
  if (!isUuid(studentId)) return { ok: false, error: "That student could not be found." };
  try {
    await withActor(user, async (tx) => {
      const [student] = await tx.select({ role: users.role }).from(users).where(eq(users.id, studentId)).limit(1);
      if (student?.role !== "student") throw new Error("Account not found");
      await tx.update(users).set({ isActive }).where(eq(users.id, studentId));
    });
    revalidatePath(`/instructor/students/${studentId}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function setStudentPassword(studentId: string, password: string): Promise<ActionResult> {
  const user = await requireUser("instructor");
  if (password.length < 8) return { ok: false, error: "Use at least 8 characters." };
  try {
    await withActor(user, async (tx) => {
      await tx.execute(sql`select change_password(${studentId}::uuid, ${""}, ${password})`);
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function addInstructorNote(studentId: string, body: string): Promise<ActionResult> {
  const user = await requireUser("instructor");
  const text = body.trim();
  if (text.length < 2) return { ok: false, error: "Write a note before saving." };
  try {
    await withActor(user, async (tx) => {
      await tx.insert(instructorNotes).values({
        id: newId(),
        instructorId: user.id,
        studentId,
        body: text.slice(0, 5000),
      });
    });
    revalidatePath(`/instructor/students/${studentId}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

const moduleSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().min(20).max(2000),
  monthLabel: z.string().trim().min(3).max(120),
  weekNumber: z.coerce.number().int().min(1).max(52),
  published: z.boolean(),
});

export async function saveModule(input: z.infer<typeof moduleSchema>): Promise<ActionResult<{ id: string }>> {
  const user = await requireUser("instructor");
  const parsed = moduleSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the module title, description, and week number." };
  try {
    const id = await withActor(user, async (tx) => {
      const [programme] = await tx.select().from(programmes).limit(1);
      if (!programme) throw new Error("The programme is not ready yet");
      if (parsed.data.id && isUuid(parsed.data.id)) {
        await tx
          .update(modules)
          .set({
            title: parsed.data.title,
            description: parsed.data.description,
            monthLabel: parsed.data.monthLabel,
            weekNumber: parsed.data.weekNumber,
            published: parsed.data.published,
            customised: true,
          })
          .where(eq(modules.id, parsed.data.id));
        return parsed.data.id;
      }
      const existing = await tx.select({ number: modules.number, sortOrder: modules.sortOrder }).from(modules);
      const idValue = newId();
      const number = (existing.reduce((max, item) => Math.max(max, item.number), 0) || 0) + 1;
      await tx.insert(modules).values({
        id: idValue,
        programmeId: programme.id,
        slug: `${slugify(parsed.data.title)}-${number}`,
        number,
        weekNumber: parsed.data.weekNumber,
        monthLabel: parsed.data.monthLabel,
        title: parsed.data.title,
        description: parsed.data.description,
        published: parsed.data.published,
        sortOrder: (existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) || 0) + 1,
        customised: true,
      });
      return idValue;
    });
    revalidatePath("/instructor/modules");
    revalidatePath("/instructor/curriculum");
    return { ok: true, data: { id } };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function moveModule(id: string, direction: "up" | "down"): Promise<ActionResult> {
  const user = await requireUser("instructor");
  try {
    await withActor(user, async (tx) => {
      const rows = await tx.select().from(modules).orderBy(asc(modules.sortOrder));
      const index = rows.findIndex((item) => item.id === id);
      const swap = direction === "up" ? index - 1 : index + 1;
      if (index < 0 || swap < 0 || swap >= rows.length) return;
      const current = rows[index];
      const other = rows[swap];
      await tx.update(modules).set({ sortOrder: other.sortOrder }).where(eq(modules.id, current.id));
      await tx.update(modules).set({ sortOrder: current.sortOrder }).where(eq(modules.id, other.id));
    });
    revalidatePath("/instructor/curriculum");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function saveLesson(input: {
  id?: string;
  moduleId: string;
  title: string;
  estimatedMinutes: number;
  difficulty: string;
  published: boolean;
  content: LessonContent;
  guide: InstructorGuide;
}): Promise<ActionResult<{ id: string }>> {
  const user = await requireUser("instructor");
  if (!input.title.trim() || !isUuid(input.moduleId)) return { ok: false, error: "Choose a module and a title." };
  if (JSON.stringify(input.content).length > 500000) return { ok: false, error: "This lesson is too large to save." };
  const completeness = assessLessonContent(input.content, input.guide, { requiresOs: true });
  try {
    const id = await withActor(user, async (tx) => {
      const lessonId = input.id && isUuid(input.id) ? input.id : newId();
      const values = {
        moduleId: input.moduleId,
        title: input.title.trim(),
        estimatedMinutes: Math.min(180, Math.max(20, Number(input.estimatedMinutes) || 90)),
        difficulty: input.difficulty || "Guided practice",
        studentContent: input.content,
        published: input.published,
        customised: true,
        completeness,
      };
      if (input.id && isUuid(input.id)) {
        await tx.update(lessons).set(values).where(eq(lessons.id, lessonId));
      } else {
        const rows = await tx.select({ sessionNumber: lessons.sessionNumber, sortOrder: lessons.sortOrder }).from(lessons);
        await tx.insert(lessons).values({
          id: lessonId,
          slug: `${slugify(input.title)}-${lessonId.slice(0, 8)}`,
          sessionNumber: (rows.reduce((max, item) => Math.max(max, item.sessionNumber), 0) || 0) + 1,
          sortOrder: (rows.filter((item) => item).reduce((max, item) => Math.max(max, item.sortOrder), 0) || 0) + 1,
          ...values,
        });
      }
      await tx
        .insert(instructorGuides)
        .values({ lessonId, content: input.guide, customised: true })
        .onConflictDoUpdate({ target: instructorGuides.lessonId, set: { content: input.guide, customised: true } });
      return lessonId;
    });
    revalidatePath("/instructor/lessons");
    revalidatePath(`/instructor/lessons/${id}`);
    return { ok: true, data: { id } };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function moveLesson(id: string, direction: "up" | "down"): Promise<ActionResult> {
  const user = await requireUser("instructor");
  try {
    await withActor(user, async (tx) => {
      const [lesson] = await tx.select().from(lessons).where(eq(lessons.id, id)).limit(1);
      if (!lesson) return;
      const rows = await tx.select().from(lessons).where(eq(lessons.moduleId, lesson.moduleId)).orderBy(asc(lessons.sortOrder));
      const index = rows.findIndex((item) => item.id === id);
      const swap = direction === "up" ? index - 1 : index + 1;
      if (swap < 0 || swap >= rows.length) return;
      await tx.update(lessons).set({ sortOrder: rows[swap].sortOrder }).where(eq(lessons.id, rows[index].id));
      await tx.update(lessons).set({ sortOrder: rows[index].sortOrder }).where(eq(lessons.id, rows[swap].id));
    });
    revalidatePath("/instructor/lessons");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function saveAssignment(input: {
  id?: string;
  moduleId: string;
  title: string;
  summary: string;
  instructions: string;
  objectives: string[];
  requirements: string[];
  deliverables: string[];
  rubric: { criterion: string; points: number; description: string }[];
  published: boolean;
  solution: string;
  projectGuide: ProjectGuide | null;
}): Promise<ActionResult<{ id: string }>> {
  const user = await requireUser("instructor");
  if (!input.title.trim() || !isUuid(input.moduleId)) return { ok: false, error: "Choose a module and a title." };
  const points = input.rubric.reduce((sum, item) => sum + Number(item.points || 0), 0);
  if (points < 1) return { ok: false, error: "Add rubric points before saving." };
  try {
    const id = await withActor(user, async (tx) => {
      const assignmentId = input.id && isUuid(input.id) ? input.id : newId();
      const values = {
        moduleId: input.moduleId,
        title: input.title.trim(),
        summary: input.summary.trim(),
        instructions: input.instructions,
        objectives: input.objectives.map((item) => item.trim()).filter(Boolean),
        requirements: input.requirements.map((item) => item.trim()).filter(Boolean),
        deliverables: input.deliverables.map((item) => item.trim()).filter(Boolean),
        rubric: input.rubric.filter((item) => item.criterion.trim()),
        points,
        published: input.published,
        customised: true,
      };
      if (input.id && isUuid(input.id)) {
        await tx.update(assignments).set(values).where(eq(assignments.id, assignmentId));
      } else {
        await tx.insert(assignments).values({ id: assignmentId, slug: `${slugify(input.title)}-${assignmentId.slice(0, 8)}`, sortOrder: 1, ...values });
      }
      await tx
        .insert(assignmentSolutions)
        .values({ assignmentId, solution: input.solution, projectGuide: input.projectGuide, customised: true })
        .onConflictDoUpdate({
          target: assignmentSolutions.assignmentId,
          set: { solution: input.solution, projectGuide: input.projectGuide, customised: true },
        });
      return assignmentId;
    });
    revalidatePath("/instructor/assignments");
    return { ok: true, data: { id } };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function reviewSubmission(input: {
  submissionId: string;
  score: number;
  feedback: string;
  decision: "accepted" | "revision_requested";
}): Promise<ActionResult> {
  const user = await requireUser("instructor");
  const feedback = input.feedback.trim();
  if (feedback.length < 5) return { ok: false, error: "Write feedback the student can act on." };
  try {
    await withActor(user, async (tx) => {
      const [submission] = await tx.select().from(submissions).where(eq(submissions.id, input.submissionId)).limit(1);
      const [assignment] = submission
        ? await tx.select().from(assignments).where(eq(assignments.id, submission.assignmentId)).limit(1)
        : [];
      if (!submission || !assignment) throw new Error("Account not found");
      const score = Math.max(0, Math.min(assignment.points, Math.round(Number(input.score) || 0)));
      await tx
        .update(submissions)
        .set({ score, status: input.decision, reviewedAt: new Date() })
        .where(eq(submissions.id, submission.id));
      await tx.insert(submissionFeedback).values({
        id: newId(),
        submissionId: submission.id,
        authorId: user.id,
        body: feedback,
        score,
        statusAfter: input.decision,
        createdAt: new Date(),
      });
      await notify(
        tx,
        submission.studentId,
        input.decision === "accepted" ? "Assignment accepted" : "Revision requested",
        `${assignment.title}: ${feedback.slice(0, 180)}`,
        `/student/assignments/${assignment.id}`,
      );
    });
    revalidatePath("/instructor/submissions");
    revalidatePath(`/instructor/submissions/${input.submissionId}`);
    revalidateStudentNotices();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function reviewShortAnswer(input: { answerId: string; points: number; comment: string }): Promise<ActionResult> {
  const user = await requireUser("instructor");
  try {
    await withActor(user, async (tx) => {
      const [answer] = await tx.select().from(quizAttemptAnswers).where(eq(quizAttemptAnswers.id, input.answerId)).limit(1);
      if (!answer) throw new Error("Account not found");
      const points = Math.max(0, Math.min(answer.maxPoints, Math.round(Number(input.points) || 0)));
      await tx
        .update(quizAttemptAnswers)
        .set({
          pointsAwarded: points,
          isCorrect: points === answer.maxPoints,
          instructorComment: input.comment.trim() || null,
        })
        .where(eq(quizAttemptAnswers.id, answer.id));
      const answers = await tx.select().from(quizAttemptAnswers).where(eq(quizAttemptAnswers.attemptId, answer.attemptId));
      const [attempt] = await tx.select().from(quizAttempts).where(eq(quizAttempts.id, answer.attemptId)).limit(1);
      const [quiz] = attempt ? await tx.select().from(quizzes).where(eq(quizzes.id, attempt.quizId)).limit(1) : [];
      const questions = attempt ? await tx.select().from(quizQuestions).where(eq(quizQuestions.quizId, attempt.quizId)) : [];
      const pending = answers.some((item) => item.pointsAwarded === null);
      const total = answers.reduce((sum, item) => sum + (item.pointsAwarded ?? 0), 0);
      const max = answers.reduce((sum, item) => sum + item.maxPoints, 0);
      const manual = answers
        .filter((item) => questions.find((question) => question.id === item.questionId)?.type === "short_answer")
        .reduce((sum, item) => sum + (item.pointsAwarded ?? 0), 0);
      const passed = !pending && max > 0 && quiz ? (total / max) * 100 >= quiz.passingScore : null;
      if (attempt) {
        await tx
          .update(quizAttempts)
          .set({
            totalScore: total,
            manualScore: manual,
            autoScore: total - manual,
            maxScore: max,
            passed,
            reviewStatus: pending ? "pending_review" : "reviewed",
          })
          .where(eq(quizAttempts.id, attempt.id));
        if (!pending && quiz) {
          await notify(tx, attempt.studentId, "Quiz review complete", `${quiz.title} has been reviewed.`, `/student/quizzes/${quiz.id}`);
        }
      }
    });
    revalidateStudentNotices();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

const classSchema = z.object({
  id: z.string().optional(),
  studentId: z.string().uuid(),
  startsAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/),
  durationMinutes: z.coerce.number().int().min(15).max(240),
  meetingUrl: z.string().trim().max(500),
  description: z.string().trim().max(2000),
  sharedNotes: z.string().max(8000),
  privateNotes: z.string().max(8000),
  lessonId: z.string().optional(),
  status: z.enum(["scheduled", "completed", "cancelled"]),
  attendance: z.enum(["", "present", "absent", "excused"]),
});

export async function saveClass(input: z.infer<typeof classSchema>): Promise<ActionResult> {
  const user = await requireUser("instructor");
  const parsed = classSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the student, date, and time." };
  if (parsed.data.meetingUrl && !isHttpUrl(parsed.data.meetingUrl)) {
    return { ok: false, error: "The meeting link must start with http:// or https://." };
  }
  try {
    const startsAt = zonedTimeToUtc(parsed.data.startsAt, user.timezone || "UTC");
    await withActor(user, async (tx) => {
      const [student] = await tx.select().from(users).where(eq(users.id, parsed.data.studentId)).limit(1);
      if (student?.role !== "student") throw new Error("Account not found");
      const values = {
        studentId: parsed.data.studentId,
        instructorId: user.id,
        startsAt,
        durationMinutes: parsed.data.durationMinutes,
        meetingUrl: parsed.data.meetingUrl || null,
        description: parsed.data.description,
        sharedNotes: parsed.data.sharedNotes,
        status: parsed.data.status,
        attendance: parsed.data.attendance || null,
        lessonId: parsed.data.lessonId && isUuid(parsed.data.lessonId) ? parsed.data.lessonId : null,
      };
      const classId = parsed.data.id && isUuid(parsed.data.id) ? parsed.data.id : newId();
      if (parsed.data.id && isUuid(parsed.data.id)) {
        const [existing] = await tx.select().from(classSessions).where(eq(classSessions.id, classId)).limit(1);
        await tx.update(classSessions).set(values).where(eq(classSessions.id, classId));
        if (existing) {
          const timeChanged = existing.startsAt.getTime() !== startsAt.getTime();
          const statusChanged = existing.status !== parsed.data.status;
          const meetingChanged = (existing.meetingUrl ?? "") !== (parsed.data.meetingUrl || "");
          if (parsed.data.status === "cancelled" && statusChanged) {
            await notify(
              tx,
              student.id,
              "Live class cancelled",
              parsed.data.description || "A live class on your schedule has been cancelled.",
              "/student/schedule",
            );
          } else if (timeChanged || meetingChanged || (statusChanged && parsed.data.status === "scheduled")) {
            await notify(
              tx,
              student.id,
              "Live class updated",
              parsed.data.description || "A live class on your schedule has changed.",
              "/student/schedule",
            );
          }
        }
      } else {
        await tx.insert(classSessions).values({ id: classId, moduleId: null, ...values });
        await notify(
          tx,
          student.id,
          "Live class scheduled",
          parsed.data.description || "A new live class has been added to your schedule.",
          "/student/schedule",
        );
      }
      await tx
        .insert(classPrivateNotes)
        .values({ classId, body: parsed.data.privateNotes })
        .onConflictDoUpdate({ target: classPrivateNotes.classId, set: { body: parsed.data.privateNotes } });
    });
    revalidatePath("/instructor/schedule");
    revalidatePath("/student/schedule");
    revalidateStudentNotices();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function saveAnnouncement(input: { id?: string; title: string; body: string; published: boolean }): Promise<ActionResult> {
  const user = await requireUser("instructor");
  if (input.title.trim().length < 3 || input.body.trim().length < 5) {
    return { ok: false, error: "Add a title and a message." };
  }
  try {
    await withActor(user, async (tx) => {
      let shouldNotify = false;
      if (input.id && isUuid(input.id)) {
        const [existing] = await tx.select().from(announcements).where(eq(announcements.id, input.id)).limit(1);
        await tx
          .update(announcements)
          .set({ title: input.title.trim(), body: input.body.trim(), published: input.published })
          .where(eq(announcements.id, input.id));
        shouldNotify = Boolean(input.published && existing && !existing.published);
      } else {
        await tx.insert(announcements).values({
          id: newId(),
          authorId: user.id,
          title: input.title.trim(),
          body: input.body.trim(),
          published: input.published,
        });
        shouldNotify = input.published;
      }
      if (shouldNotify) {
        const students = await tx.select({ id: users.id }).from(users).where(and(eq(users.role, "student"), eq(users.isActive, true)));
        for (const student of students) {
          await notify(tx, student.id, input.title.trim(), input.body.trim().slice(0, 180), "/student/announcements");
        }
      }
    });
    revalidatePath("/instructor/announcements");
    revalidatePath("/student/announcements");
    revalidateStudentNotices();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

const resourceSchema = z.object({
  id: z.string().optional(),
  category: z.string().trim().min(2).max(80),
  title: z.string().trim().min(2).max(160),
  url: z.string().trim().url(),
  description: z.string().trim().min(10).max(1000),
  published: z.boolean(),
});

export async function saveResource(input: z.infer<typeof resourceSchema>): Promise<ActionResult> {
  const user = await requireUser("instructor");
  const parsed = resourceSchema.safeParse(input);
  if (!parsed.success || !isHttpUrl(input.url)) return { ok: false, error: "Add a title, category, description, and a valid link." };
  try {
    await withActor(user, async (tx) => {
      if (parsed.data.id && isUuid(parsed.data.id)) {
        await tx
          .update(resources)
          .set({
            category: parsed.data.category,
            title: parsed.data.title,
            url: parsed.data.url,
            description: parsed.data.description,
            published: parsed.data.published,
          })
          .where(eq(resources.id, parsed.data.id));
        return;
      }
      const existing = await tx.select({ sortOrder: resources.sortOrder }).from(resources);
      await tx.insert(resources).values({
        id: newId(),
        category: parsed.data.category,
        title: parsed.data.title,
        url: parsed.data.url,
        description: parsed.data.description,
        published: parsed.data.published,
        sortOrder: (existing.reduce((max, item) => Math.max(max, item.sortOrder), 0) || 0) + 1,
      });
    });
    revalidatePath("/instructor/resources");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function deleteResource(id: string): Promise<ActionResult> {
  const user = await requireUser("instructor");
  try {
    await withActor(user, async (tx) => {
      await tx.delete(resources).where(eq(resources.id, id));
    });
    revalidatePath("/instructor/resources");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function updateInstructorSettings(input: { fullName: string; timezone: string }): Promise<ActionResult> {
  const user = await requireUser("instructor");
  if (input.fullName.trim().length < 2) return { ok: false, error: "Enter your name." };
  try {
    Intl.DateTimeFormat("en-GB", { timeZone: input.timezone });
  } catch {
    return { ok: false, error: "Choose a valid time zone." };
  }
  try {
    await withActor(user, async (tx) => {
      await tx.update(users).set({ fullName: input.fullName.trim(), timezone: input.timezone }).where(eq(users.id, user.id));
    });
    revalidatePath("/instructor/settings");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function cancelClass(id: string): Promise<ActionResult> {
  const user = await requireUser("instructor");
  if (!isUuid(id)) return { ok: false, error: "That class could not be found." };
  try {
    await withActor(user, async (tx) => {
      const [existing] = await tx.select().from(classSessions).where(eq(classSessions.id, id)).limit(1);
      await tx.update(classSessions).set({ status: "cancelled" }).where(eq(classSessions.id, id));
      if (existing && existing.status !== "cancelled") {
        await notify(
          tx,
          existing.studentId,
          "Live class cancelled",
          existing.description || "A live class on your schedule has been cancelled.",
          "/student/schedule",
        );
      }
    });
    revalidatePath("/instructor/schedule");
    revalidatePath("/student/schedule");
    revalidateStudentNotices();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function saveQuizMeta(input: {
  id: string;
  title: string;
  passingScore: number;
  allowRetakes: boolean;
  published: boolean;
}): Promise<ActionResult> {
  const user = await requireUser("instructor");
  if (!isUuid(input.id) || input.title.trim().length < 3) return { ok: false, error: "Enter a quiz title." };
  const passingScore = Math.max(1, Math.min(100, Math.round(input.passingScore)));
  try {
    await withActor(user, async (tx) => {
      await tx
        .update(quizzes)
        .set({
          title: input.title.trim(),
          passingScore,
          allowRetakes: input.allowRetakes,
          published: input.published,
          customised: true,
        })
        .where(eq(quizzes.id, input.id));
    });
    revalidatePath(`/instructor/quizzes/${input.id}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function saveQuizQuestion(input: {
  quizId: string;
  questionId?: string;
  type: "multiple_choice" | "true_false" | "short_answer" | "code_reading";
  prompt: string;
  codeSnippet?: string;
  options: { id: string; text: string }[];
  correct: { optionId?: string; value?: boolean; rubric?: string };
  explanation: string;
  points: number;
}): Promise<ActionResult> {
  const user = await requireUser("instructor");
  if (!isUuid(input.quizId) || input.prompt.trim().length < 8 || input.explanation.trim().length < 8) {
    return { ok: false, error: "Add a question and an explanation." };
  }
  try {
    await withActor(user, async (tx) => {
      const questionId = input.questionId && isUuid(input.questionId) ? input.questionId : newId();
      const rows = await tx.select({ sortOrder: quizQuestions.sortOrder }).from(quizQuestions).where(eq(quizQuestions.quizId, input.quizId));
      const values = {
        type: input.type,
        prompt: input.prompt.trim(),
        codeSnippet: input.codeSnippet?.trim() || null,
        options: input.options.filter((item) => item.text.trim()),
        points: Math.max(1, Math.min(20, Math.round(input.points) || 1)),
      };
      if (input.questionId && isUuid(input.questionId)) {
        await tx.update(quizQuestions).set(values).where(eq(quizQuestions.id, questionId));
      } else {
        await tx.insert(quizQuestions).values({
          id: questionId,
          quizId: input.quizId,
          slug: `q-${questionId.slice(0, 8)}`,
          sortOrder: (rows.reduce((max, item) => Math.max(max, item.sortOrder), 0) || 0) + 1,
          ...values,
        });
      }
      await tx
        .insert(quizAnswerKeys)
        .values({ questionId, correctAnswer: input.correct, explanation: input.explanation.trim() })
        .onConflictDoUpdate({
          target: quizAnswerKeys.questionId,
          set: { correctAnswer: input.correct, explanation: input.explanation.trim() },
        });
      await tx.update(quizzes).set({ customised: true }).where(eq(quizzes.id, input.quizId));
    });
    revalidatePath(`/instructor/quizzes/${input.quizId}`);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}
