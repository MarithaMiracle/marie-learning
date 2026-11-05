import { and, asc, desc, eq, sql } from "drizzle-orm";
import type { CurrentUser } from "@/lib/auth";
import { withActor } from "@/lib/db/client";
import {
  announcements,
  assignmentSolutions,
  assignments,
  classPrivateNotes,
  classSessions,
  instructorGuides,
  instructorNotes,
  lessonHomework,
  lessonProgress,
  lessons,
  modules,
  programmeEnrollments,
  programmes,
  quizAnswerKeys,
  quizAttemptAnswers,
  quizAttempts,
  quizQuestions,
  quizzes,
  resources,
  studentProfiles,
  submissionFeedback,
  submissions,
  users,
} from "@/lib/db/schema";
import { moduleProgress } from "@/lib/progress";

const submissionSummary = {
  id: submissions.id,
  assignmentId: submissions.assignmentId,
  studentId: submissions.studentId,
  writtenResponse: submissions.writtenResponse,
  githubUrl: submissions.githubUrl,
  fileName: submissions.fileName,
  fileMime: submissions.fileMime,
  status: submissions.status,
  score: submissions.score,
  submittedAt: submissions.submittedAt,
  reviewedAt: submissions.reviewedAt,
};

export async function listPendingInvites(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const result = await tx.execute(sql`select id, email, expires_at, created_at from list_user_invites()`);
    const rows = (Array.isArray(result) ? result : ((result as { rows?: unknown[] }).rows ?? [])) as {
      id: string;
      email: string;
      expires_at: string | Date;
      created_at: string | Date;
    }[];
    return rows.map((row) => ({
      id: row.id,
      email: row.email,
      expiresAt: new Date(row.expires_at),
      createdAt: new Date(row.created_at),
    }));
  });
}

export async function listContactMessages(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const result = await tx.execute(sql`select id, name, email, message, handled, created_at from list_contact_messages()`);
    const rows = (Array.isArray(result) ? result : ((result as { rows?: unknown[] }).rows ?? [])) as {
      id: string;
      name: string;
      email: string;
      message: string;
      handled: boolean;
      created_at: string | Date;
    }[];
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      message: row.message,
      handled: row.handled,
      createdAt: new Date(row.created_at),
    }));
  });
}

export async function getInstructorDashboard(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const students = await tx.select().from(users).where(eq(users.role, "student")).orderBy(asc(users.fullName));
    const profiles = await tx.select().from(studentProfiles);
    const moduleRows = await tx.select().from(modules);
    const lessonRows = await tx.select({ id: lessons.id, published: lessons.published, moduleId: lessons.moduleId }).from(lessons);
    const submissionRows = await tx.select(submissionSummary).from(submissions).orderBy(desc(submissions.submittedAt));
    const classes = await tx.select().from(classSessions).orderBy(asc(classSessions.startsAt));
    const progress = await tx.select().from(lessonProgress).orderBy(desc(lessonProgress.startedAt)).limit(8);
    const attempts = await tx.select().from(quizAttempts).orderBy(desc(quizAttempts.submittedAt)).limit(8);
    const waiting = submissionRows.filter((item) => item.status === "submitted");
    const upcoming = classes.filter((item) => item.status === "scheduled" && item.startsAt.getTime() >= Date.now() - 15 * 60 * 1000).slice(0, 5);
    return {
      students: students.map((student) => ({
        student,
        profile: profiles.find((item) => item.userId === student.id) ?? null,
      })),
      moduleCount: moduleRows.length,
      publishedLessons: lessonRows.filter((item) => item.published).length,
      waiting,
      upcoming,
      recentProgress: progress,
      recentAttempts: attempts,
      lessonTitles: await tx.select({ id: lessons.id, title: lessons.title }).from(lessons),
      quizTitles: await tx.select({ id: quizzes.id, title: quizzes.title }).from(quizzes),
    };
  });
}

export async function listStudents(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const students = await tx.select().from(users).where(eq(users.role, "student")).orderBy(asc(users.fullName));
    const profiles = await tx.select().from(studentProfiles);
    const progress = await tx.select().from(lessonProgress);
    const lessonRows = await tx.select({ id: lessons.id, published: lessons.published }).from(lessons);
    const publishedIds = lessonRows.filter((item) => item.published).map((item) => item.id);
    return students.map((student) => {
      const rows = progress.filter((item) => item.studentId === student.id);
      const completed = rows.filter((item) => item.status === "completed" && publishedIds.includes(item.lessonId)).length;
      return {
        student,
        profile: profiles.find((item) => item.userId === student.id) ?? null,
        completed,
        total: publishedIds.length,
      };
    });
  });
}

export async function getStudentRecord(user: CurrentUser, studentId: string) {
  return withActor(user, async (tx) => {
    const [student] = await tx.select().from(users).where(eq(users.id, studentId)).limit(1);
    if (!student || student.role !== "student") return null;
    const [profile] = await tx.select().from(studentProfiles).where(eq(studentProfiles.userId, studentId)).limit(1);
    const [enrollment] = await tx.select().from(programmeEnrollments).where(eq(programmeEnrollments.studentId, studentId)).limit(1);
    const [programme] = enrollment ? await tx.select().from(programmes).where(eq(programmes.id, enrollment.programmeId)).limit(1) : [];
    const moduleRows = await tx.select().from(modules).orderBy(asc(modules.sortOrder));
    const lessonRows = await tx.select().from(lessons).orderBy(asc(lessons.sortOrder));
    const progress = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, studentId));
    const submissionRows = await tx.select(submissionSummary).from(submissions).where(eq(submissions.studentId, studentId));
    const assignmentRows = await tx.select().from(assignments);
    const feedback = await tx.select().from(submissionFeedback).orderBy(desc(submissionFeedback.createdAt));
    const attempts = await tx.select().from(quizAttempts).where(eq(quizAttempts.studentId, studentId)).orderBy(desc(quizAttempts.submittedAt));
    const quizRows = await tx.select().from(quizzes);
    const classes = await tx.select().from(classSessions).where(eq(classSessions.studentId, studentId)).orderBy(asc(classSessions.startsAt));
    const notes = await tx.select().from(instructorNotes).where(eq(instructorNotes.studentId, studentId)).orderBy(desc(instructorNotes.createdAt));
    const homework = await tx.select().from(lessonHomework).where(eq(lessonHomework.studentId, studentId));
    const journey = moduleRows.map((module) => {
      const ids = lessonRows.filter((lesson) => lesson.moduleId === module.id && lesson.published).map((lesson) => lesson.id);
      return { module, ...moduleProgress(ids, progress) };
    });
    return {
      student,
      profile: profile ?? null,
      programme: programme ?? null,
      enrollment: enrollment ?? null,
      journey,
      submissions: submissionRows.map((submission) => ({
        submission,
        assignment: assignmentRows.find((item) => item.id === submission.assignmentId) ?? null,
        feedback: feedback.filter((item) => item.submissionId === submission.id),
      })),
      attempts: attempts.map((attempt) => ({
        attempt,
        quiz: quizRows.find((item) => item.id === attempt.quizId) ?? null,
      })),
      classes,
      notes,
      homework: homework.map((item) => ({
        item,
        lesson: lessonRows.find((lesson) => lesson.id === item.lessonId) ?? null,
      })),
    };
  });
}

export async function getCurriculum(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const [programme] = await tx.select().from(programmes).limit(1);
    const moduleRows = await tx.select().from(modules).orderBy(asc(modules.sortOrder));
    const lessonRows = await tx
      .select({
        id: lessons.id,
        moduleId: lessons.moduleId,
        title: lessons.title,
        sessionNumber: lessons.sessionNumber,
        published: lessons.published,
        sortOrder: lessons.sortOrder,
        completeness: lessons.completeness,
        estimatedMinutes: lessons.estimatedMinutes,
        difficulty: lessons.difficulty,
      })
      .from(lessons)
      .orderBy(asc(lessons.sortOrder));
    return { programme: programme ?? null, modules: moduleRows, lessons: lessonRows };
  });
}

export async function getLessonEditor(user: CurrentUser, lessonId: string) {
  return withActor(user, async (tx) => {
    const [lesson] = await tx.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
    if (!lesson) return null;
    const [guide] = await tx.select().from(instructorGuides).where(eq(instructorGuides.lessonId, lessonId)).limit(1);
    const [module] = await tx.select().from(modules).where(eq(modules.id, lesson.moduleId)).limit(1);
    const moduleList = await tx.select({ id: modules.id, title: modules.title, number: modules.number }).from(modules).orderBy(asc(modules.sortOrder));
    return { lesson, guide: guide ?? null, module: module ?? null, moduleList };
  });
}

export async function listSubmissions(user: CurrentUser, status?: string) {
  return withActor(user, async (tx) => {
    const rows = await tx.select(submissionSummary).from(submissions).orderBy(desc(submissions.submittedAt));
    const studentRows = await tx.select().from(users);
    const assignmentRows = await tx.select().from(assignments);
    return rows
      .filter((row) => !status || status === "all" || row.status === status)
      .map((submission) => ({
        submission,
        student: studentRows.find((item) => item.id === submission.studentId) ?? null,
        assignment: assignmentRows.find((item) => item.id === submission.assignmentId) ?? null,
      }));
  });
}

export async function getSubmissionReview(user: CurrentUser, submissionId: string) {
  return withActor(user, async (tx) => {
    const [submission] = await tx.select(submissionSummary).from(submissions).where(eq(submissions.id, submissionId)).limit(1);
    if (!submission) return null;
    const [assignment] = await tx.select().from(assignments).where(eq(assignments.id, submission.assignmentId)).limit(1);
    const [solution] = assignment
      ? await tx.select().from(assignmentSolutions).where(eq(assignmentSolutions.assignmentId, assignment.id)).limit(1)
      : [];
    const [student] = await tx.select().from(users).where(eq(users.id, submission.studentId)).limit(1);
    const feedback = await tx.select().from(submissionFeedback).where(eq(submissionFeedback.submissionId, submission.id)).orderBy(desc(submissionFeedback.createdAt));
    return { submission, assignment: assignment ?? null, solution: solution ?? null, student: student ?? null, feedback };
  });
}

export async function listQuizzesAdmin(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const quizRows = await tx.select().from(quizzes);
    const moduleRows = await tx.select().from(modules);
    const attempts = await tx.select().from(quizAttempts);
    return quizRows
      .map((quiz) => ({
        quiz,
        module: moduleRows.find((item) => item.id === quiz.moduleId) ?? null,
        attempts: attempts.filter((attempt) => attempt.quizId === quiz.id).length,
        pending: attempts.filter((attempt) => attempt.quizId === quiz.id && attempt.reviewStatus === "pending_review").length,
      }))
      .sort((a, b) => (a.module?.sortOrder ?? 0) - (b.module?.sortOrder ?? 0));
  });
}

export async function getQuizAdmin(user: CurrentUser, quizId: string) {
  return withActor(user, async (tx) => {
    const [quiz] = await tx.select().from(quizzes).where(eq(quizzes.id, quizId)).limit(1);
    if (!quiz) return null;
    const questions = await tx.select().from(quizQuestions).where(eq(quizQuestions.quizId, quizId)).orderBy(asc(quizQuestions.sortOrder));
    const keys = await tx.select().from(quizAnswerKeys);
    const attempts = await tx.select().from(quizAttempts).where(eq(quizAttempts.quizId, quizId)).orderBy(desc(quizAttempts.submittedAt));
    const students = await tx.select().from(users);
    const moduleRows = await tx.select({ id: modules.id, title: modules.title }).from(modules).orderBy(asc(modules.sortOrder));
    return {
      quiz,
      moduleRows,
      questions: questions.map((question) => ({
        question,
        key: keys.find((item) => item.questionId === question.id) ?? null,
      })),
      attempts: attempts.map((attempt) => ({
        attempt,
        student: students.find((item) => item.id === attempt.studentId) ?? null,
      })),
    };
  });
}

export async function getAttemptReview(user: CurrentUser, attemptId: string) {
  return withActor(user, async (tx) => {
    const [attempt] = await tx.select().from(quizAttempts).where(eq(quizAttempts.id, attemptId)).limit(1);
    if (!attempt) return null;
    const [quiz] = await tx.select().from(quizzes).where(eq(quizzes.id, attempt.quizId)).limit(1);
    const [student] = await tx.select().from(users).where(eq(users.id, attempt.studentId)).limit(1);
    const answers = await tx.select().from(quizAttemptAnswers).where(eq(quizAttemptAnswers.attemptId, attemptId));
    const questions = await tx.select().from(quizQuestions).where(eq(quizQuestions.quizId, attempt.quizId));
    return { attempt, quiz: quiz ?? null, student: student ?? null, answers, questions };
  });
}

export async function listClasses(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const classes = await tx.select().from(classSessions).orderBy(asc(classSessions.startsAt));
    const students = await tx.select().from(users);
    const privateNotes = await tx.select().from(classPrivateNotes);
    const lessonRows = await tx.select({ id: lessons.id, title: lessons.title }).from(lessons);
    return classes.map((item) => ({
      item,
      student: students.find((student) => student.id === item.studentId) ?? null,
      privateNotes: privateNotes.find((note) => note.classId === item.id)?.body ?? "",
      lessonTitle: lessonRows.find((lesson) => lesson.id === item.lessonId)?.title ?? null,
    }));
  });
}

export async function listAnnouncementsAdmin(user: CurrentUser) {
  return withActor(user, async (tx) => tx.select().from(announcements).orderBy(desc(announcements.createdAt)));
}

export async function listResourcesAdmin(user: CurrentUser) {
  return withActor(user, async (tx) => tx.select().from(resources).orderBy(asc(resources.category), asc(resources.sortOrder)));
}

export async function listModuleOptions(user: CurrentUser) {
  return withActor(user, async (tx) =>
    tx.select({ id: modules.id, title: modules.title, number: modules.number }).from(modules).orderBy(asc(modules.sortOrder)),
  );
}

export async function listStudentOptions(user: CurrentUser) {
  return withActor(user, async (tx) =>
    tx
      .select({ id: users.id, fullName: users.fullName, preferredName: users.preferredName, email: users.email, timezone: users.timezone })
      .from(users)
      .where(and(eq(users.role, "student"), eq(users.isActive, true)))
      .orderBy(asc(users.fullName)),
  );
}

export async function getAssignmentEditor(user: CurrentUser, assignmentId: string) {
  return withActor(user, async (tx) => {
    const [assignment] = await tx.select().from(assignments).where(eq(assignments.id, assignmentId)).limit(1);
    if (!assignment) return null;
    const [solution] = await tx.select().from(assignmentSolutions).where(eq(assignmentSolutions.assignmentId, assignmentId)).limit(1);
    const moduleRows = await tx.select({ id: modules.id, title: modules.title }).from(modules).orderBy(asc(modules.sortOrder));
    return { assignment, solution: solution ?? null, moduleRows };
  });
}
