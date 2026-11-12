"use server";

import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { requireUser, setSession } from "@/lib/auth";
import { defaultChecklist, mergeChecklist } from "@/lib/checklist";
import type { OperatingSystem } from "@/lib/content-types";
import { withActor } from "@/lib/db/client";
import {
  assignments,
  lessonProgress,
  lessons,
  modules,
  notifications,
  quizzes,
  studentNotes,
  studentProfiles,
  submissions,
  users,
} from "@/lib/db/schema";
import { dbErrorMessage, type ActionResult } from "@/lib/errors";
import { isUuid, newId } from "@/lib/ids";
import { isLessonOpen, isModuleWorkOpen, orderPublishedLessons } from "@/lib/progress";

const onboardingSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  preferredName: z.string().trim().max(80),
  country: z.string().trim().min(2).max(80),
  timezone: z.string().trim().min(1).max(80),
  operatingSystem: z.enum(["windows", "macos", "linux", "unknown"]),
  osVersion: z.string().trim().max(120),
  computerExperience: z.enum(["new", "browse", "install", "comfortable"]),
  codingExperience: z.enum(["never", "videos", "exercises", "some"]),
  learningGoals: z.string().trim().min(10).max(2000),
  weeklyPractice: z.enum(["lt2", "h2to4", "h5to7", "h8plus"]),
});

function validTimeZone(value: string) {
  try {
    Intl.DateTimeFormat("en-GB", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

export async function saveOnboarding(input: z.infer<typeof onboardingSchema>): Promise<ActionResult> {
  const user = await requireUser("student");
  const parsed = onboardingSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please complete the required questions." };
  if (!validTimeZone(parsed.data.timezone)) return { ok: false, error: "Choose a valid time zone." };
  try {
    await withActor(user, async (tx) => {
      const [existing] = await tx.select().from(studentProfiles).where(eq(studentProfiles.userId, user.id)).limit(1);
      const checklist = mergeChecklist(
        existing?.setupChecklist,
        defaultChecklist(parsed.data.operatingSystem, parsed.data.osVersion),
      );
      await tx
        .update(users)
        .set({
          fullName: parsed.data.fullName,
          preferredName: parsed.data.preferredName || null,
          timezone: parsed.data.timezone,
          onboardingCompleted: true,
        })
        .where(eq(users.id, user.id));
      await tx
        .insert(studentProfiles)
        .values({
          userId: user.id,
          country: parsed.data.country,
          operatingSystem: parsed.data.operatingSystem,
          osVersion: parsed.data.osVersion || null,
          computerExperience: parsed.data.computerExperience,
          codingExperience: parsed.data.codingExperience,
          learningGoals: parsed.data.learningGoals,
          weeklyPractice: parsed.data.weeklyPractice,
          setupChecklist: checklist,
        })
        .onConflictDoUpdate({
          target: studentProfiles.userId,
          set: {
            country: parsed.data.country,
            operatingSystem: parsed.data.operatingSystem,
            osVersion: parsed.data.osVersion || null,
            computerExperience: parsed.data.computerExperience,
            codingExperience: parsed.data.codingExperience,
            learningGoals: parsed.data.learningGoals,
            weeklyPractice: parsed.data.weeklyPractice,
            setupChecklist: checklist,
          },
        });
    });
    await setSession({
      id: user.id,
      role: user.role,
      email: user.email,
      fullName: parsed.data.fullName,
      preferredName: parsed.data.preferredName || null,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function updateStudentSettings(input: z.infer<typeof onboardingSchema>): Promise<ActionResult> {
  const result = await saveOnboarding(input);
  if (result.ok) revalidatePath("/student/settings");
  return result;
}

export async function toggleChecklistItem(id: string, done: boolean): Promise<ActionResult> {
  const user = await requireUser("student");
  try {
    await withActor(user, async (tx) => {
      const [profile] = await tx.select().from(studentProfiles).where(eq(studentProfiles.userId, user.id)).limit(1);
      const os = (profile?.operatingSystem as OperatingSystem | null) ?? null;
      const checklist = mergeChecklist(profile?.setupChecklist, defaultChecklist(os, profile?.osVersion)).map((item) =>
        item.id === id ? { ...item, done } : item,
      );
      await tx.update(studentProfiles).set({ setupChecklist: checklist }).where(eq(studentProfiles.userId, user.id));
    });
    revalidatePath("/student/dashboard");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function setLessonProgress(lessonId: string, status: "in_progress" | "completed", reopen = false): Promise<ActionResult> {
  const user = await requireUser("student");
  try {
    await withActor(user, async (tx) => {
      const [lesson] = await tx.select({ id: lessons.id }).from(lessons).where(eq(lessons.id, lessonId)).limit(1);
      if (!lesson) throw new Error("This lesson is not available");
      const moduleRows = await tx.select().from(modules);
      const lessonRows = await tx.select().from(lessons);
      const progressRows = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, user.id));
      const ordered = orderPublishedLessons(moduleRows, lessonRows);
      if (!isLessonOpen(lessonId, ordered, progressRows)) {
        throw new Error("Available after you finish the previous lesson.");
      }
      const [existing] = progressRows.filter((item) => item.lessonId === lessonId);
      if (existing?.status === "completed" && status === "in_progress" && !reopen) return;
      if (!existing) {
        await tx.insert(lessonProgress).values({
          id: newId(),
          studentId: user.id,
          lessonId,
          status,
          startedAt: new Date(),
          completedAt: status === "completed" ? new Date() : null,
        });
        return;
      }
      await tx
        .update(lessonProgress)
        .set({
          status,
          completedAt: status === "completed" ? new Date() : null,
        })
        .where(eq(lessonProgress.id, existing.id));
    });
    revalidatePath(`/student/lesson/${lessonId}`);
    revalidatePath("/student/dashboard");
    revalidatePath("/student/progress");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function saveLessonNote(lessonId: string, body: string): Promise<ActionResult> {
  const user = await requireUser("student");
  const text = body.slice(0, 20000);
  try {
    await withActor(user, async (tx) => {
      await assertLessonOpen(tx, user.id, lessonId);
      const [existing] = await tx
        .select()
        .from(studentNotes)
        .where(and(eq(studentNotes.studentId, user.id), eq(studentNotes.lessonId, lessonId)))
        .limit(1);
      if (!existing) {
        await tx.insert(studentNotes).values({
          id: newId(),
          studentId: user.id,
          lessonId,
          title: "Lesson notes",
          body: text,
          updatedAt: new Date(),
        });
      } else {
        await tx.update(studentNotes).set({ body: text }).where(eq(studentNotes.id, existing.id));
      }
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function saveGeneralNote(input: { id?: string; title: string; body: string }): Promise<ActionResult> {
  const user = await requireUser("student");
  const title = input.title.trim().slice(0, 120);
  const body = input.body.slice(0, 20000);
  if (title.length < 2 || body.trim().length < 1) return { ok: false, error: "Add a title and a note." };
  try {
    await withActor(user, async (tx) => {
      if (input.id) {
        await tx
          .update(studentNotes)
          .set({ title, body })
          .where(and(eq(studentNotes.id, input.id), eq(studentNotes.studentId, user.id)));
        return;
      }
      await tx.insert(studentNotes).values({
        id: newId(),
        studentId: user.id,
        lessonId: null,
        title,
        body,
        updatedAt: new Date(),
      });
    });
    revalidatePath("/student/profile");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

const allowedExtensions = [".txt", ".md", ".pdf", ".png", ".jpg", ".jpeg", ".zip", ".json", ".html", ".css", ".js"];

export async function submitAssignment(formData: FormData): Promise<ActionResult> {
  const user = await requireUser("student");
  const assignmentId = String(formData.get("assignmentId") ?? "");
  const written = String(formData.get("written") ?? "").slice(0, 30000);
  const github = String(formData.get("github") ?? "").trim();
  const file = formData.get("file");
  if (github && !/^https:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+/i.test(github)) {
    return { ok: false, error: "Use a GitHub link that starts with https://github.com/." };
  }
  let fileName: string | null = null;
  let fileMime: string | null = null;
  let fileData: Buffer | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > 2 * 1024 * 1024) return { ok: false, error: "Files must be 2 MB or smaller." };
    const extension = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase() : "";
    if (!allowedExtensions.includes(extension)) {
      return { ok: false, error: "Upload a txt, md, pdf, png, jpg, zip, json, html, css, or js file." };
    }
    fileName = file.name.slice(0, 180);
    fileMime = file.type || "application/octet-stream";
    fileData = Buffer.from(await file.arrayBuffer());
  }
  if (!written.trim() && !github && !fileData) {
    return { ok: false, error: "Add a written answer, a GitHub link, or a file." };
  }
  try {
    await withActor(user, async (tx) => {
      const [assignment] = await tx
        .select({ id: assignments.id, moduleId: assignments.moduleId })
        .from(assignments)
        .where(eq(assignments.id, assignmentId))
        .limit(1);
      if (!assignment) throw new Error("This assignment is not available");
      await assertModuleWorkOpen(tx, user.id, assignment.moduleId);
      const [existing] = await tx
        .select({ id: submissions.id, status: submissions.status })
        .from(submissions)
        .where(and(eq(submissions.assignmentId, assignmentId), eq(submissions.studentId, user.id)))
        .limit(1);
      if (existing?.status === "accepted") throw new Error("This submission has been accepted");
      const values = {
        writtenResponse: written,
        githubUrl: github || null,
        ...(fileData
          ? { fileName, fileMime, fileData }
          : {}),
      };
      if (!existing) {
        await tx.insert(submissions).values({
          id: newId(),
          assignmentId,
          studentId: user.id,
          status: "submitted",
          score: null,
          submittedAt: new Date(),
          reviewedAt: null,
          ...values,
          fileName: fileName,
          fileMime: fileMime,
          fileData: fileData,
        });
      } else {
        await tx.update(submissions).set(values).where(eq(submissions.id, existing.id));
      }
    });
    revalidatePath(`/student/assignments/${assignmentId}`);
    revalidatePath("/instructor/submissions");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export type QuizSubmitResult = {
  attemptId: string;
  totalScore: number;
  maxScore: number;
  passed: boolean | null;
  reviewStatus: string;
  passingScore: number;
  questions: {
    questionId: string;
    prompt: string;
    response: string;
    isCorrect: boolean | null;
    pointsAwarded: number | null;
    maxPoints: number;
    explanation: string;
    pending: boolean;
  }[];
};

export async function submitQuiz(
  quizId: string,
  answers: { questionId: string; value: string }[],
): Promise<ActionResult<QuizSubmitResult>> {
  const user = await requireUser("student");
  try {
    const result = await withActor(user, async (tx) => {
      const [quiz] = await tx.select({ id: quizzes.id, moduleId: quizzes.moduleId }).from(quizzes).where(eq(quizzes.id, quizId)).limit(1);
      if (!quiz) throw new Error("This quiz is not available");
      await assertModuleWorkOpen(tx, user.id, quiz.moduleId);
      const query = await tx.execute(sql`select submit_quiz_attempt(${quizId}::uuid, ${JSON.stringify(answers)}::jsonb) as result`);
      const row = Array.isArray(query) ? query[0] : null;
      return (row as { result?: QuizSubmitResult } | undefined)?.result ?? null;
    });
    if (!result) return { ok: false, error: "The quiz could not be submitted." };
    revalidatePath(`/student/quizzes/${quizId}`);
    revalidatePath("/student/progress");
    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

async function assertLessonOpen(
  tx: Parameters<Parameters<typeof withActor>[1]>[0],
  studentId: string,
  lessonId: string,
) {
  const moduleRows = await tx.select().from(modules);
  const lessonRows = await tx.select().from(lessons);
  const progressRows = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, studentId));
  const ordered = orderPublishedLessons(moduleRows, lessonRows);
  if (!isLessonOpen(lessonId, ordered, progressRows)) {
    throw new Error("Available after you finish the previous lesson.");
  }
}

async function assertModuleWorkOpen(
  tx: Parameters<Parameters<typeof withActor>[1]>[0],
  studentId: string,
  moduleId: string,
) {
  const moduleRows = await tx.select().from(modules);
  const lessonRows = await tx.select().from(lessons);
  const progressRows = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, studentId));
  const ordered = orderPublishedLessons(moduleRows, lessonRows);
  if (!isModuleWorkOpen(moduleId, ordered, progressRows)) {
    throw new Error("Available after you finish this week's lessons.");
  }
}

export async function markNotificationsRead(): Promise<void> {
  const user = await requireUser("student");
  await withActor(user, async (tx) => {
    await tx.update(notifications).set({ readAt: new Date() }).where(eq(notifications.userId, user.id));
  });
  revalidatePath("/student", "layout");
  revalidatePath("/student/dashboard");
  revalidatePath("/student/notifications");
}

export async function markNotificationRead(id: string): Promise<ActionResult> {
  const user = await requireUser("student");
  if (!isUuid(id)) return { ok: false, error: "That update could not be found." };
  try {
    await withActor(user, async (tx) => {
      await tx
        .update(notifications)
        .set({ readAt: new Date() })
        .where(and(eq(notifications.id, id), eq(notifications.userId, user.id)));
    });
    revalidatePath("/student", "layout");
    revalidatePath("/student/dashboard");
    revalidatePath("/student/notifications");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}
