import { and, asc, desc, eq, isNull } from "drizzle-orm";
import type { CurrentUser } from "@/lib/auth";
import { withActor } from "@/lib/db/client";
import {
  announcements,
  assignments,
  classSessions,
  lessonHomework,
  lessonProgress,
  lessons,
  modules,
  notifications,
  programmeEnrollments,
  programmes,
  quizAttemptAnswers,
  quizAttempts,
  quizQuestions,
  quizzes,
  resources,
  studentNotes,
  studentProfiles,
  submissionFeedback,
  submissions,
  users,
} from "@/lib/db/schema";
import {
  isLessonOpen,
  isModuleWorkOpen,
  lessonLockReason,
  moduleProgress,
  moduleWorkLockReason,
  nextIncomplete,
  orderPublishedLessons,
  previousRequiredLesson,
} from "@/lib/progress";

export async function countUnread(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const rows = await tx
      .select({ id: notifications.id })
      .from(notifications)
      .where(and(eq(notifications.userId, user.id), isNull(notifications.readAt)));
    return rows.length;
  });
}

export async function getStudentDashboard(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const moduleRows = await tx.select().from(modules).orderBy(asc(modules.sortOrder));
    const lessonRows = await tx
      .select({
        id: lessons.id,
        title: lessons.title,
        moduleId: lessons.moduleId,
        sortOrder: lessons.sortOrder,
        sessionNumber: lessons.sessionNumber,
        estimatedMinutes: lessons.estimatedMinutes,
      })
      .from(lessons)
      .orderBy(asc(lessons.sortOrder));
    const progress = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, user.id));
    const publishedModules = moduleRows.filter((item) => item.published);
    const publishedLessons = lessonRows.filter((lesson) => publishedModules.some((item) => item.id === lesson.moduleId));
    const ordered = publishedLessons
      .map((lesson) => ({
        ...lesson,
        moduleOrder: publishedModules.find((item) => item.id === lesson.moduleId)?.sortOrder ?? 0,
      }))
      .sort((a, b) => a.moduleOrder - b.moduleOrder || a.sortOrder - b.sortOrder);
    const unlockOrder = orderPublishedLessons(
      publishedModules,
      publishedLessons.map((lesson) => ({ ...lesson, published: true })),
    );
    const next = nextIncomplete(ordered, progress) ?? null;
    const currentModule = publishedModules.find((item) => item.id === next?.moduleId) ?? publishedModules[0] ?? null;
    const completed = progress.filter((item) => item.status === "completed" && publishedLessons.some((lesson) => lesson.id === item.lessonId)).length;
    const upcoming = await tx
      .select()
      .from(classSessions)
      .where(and(eq(classSessions.studentId, user.id), eq(classSessions.status, "scheduled")))
      .orderBy(asc(classSessions.startsAt));
    const nextClass = upcoming.find((item) => item.startsAt.getTime() >= Date.now() - 15 * 60 * 1000) ?? null;
    const assignmentRows = await tx.select().from(assignments).orderBy(asc(assignments.sortOrder));
    const submissionRows = await tx
      .select({
        id: submissions.id,
        assignmentId: submissions.assignmentId,
        status: submissions.status,
        score: submissions.score,
        submittedAt: submissions.submittedAt,
      })
      .from(submissions)
      .where(eq(submissions.studentId, user.id));
    const pending = assignmentRows
      .filter((assignment) => assignment.published)
      .map((assignment) => ({
        assignment,
        submission: submissionRows.find((item) => item.assignmentId === assignment.id) ?? null,
        locked: !isModuleWorkOpen(assignment.moduleId, unlockOrder, progress),
      }))
      .filter((item) => !item.locked && item.submission?.status !== "accepted");
    const feedback = await tx
      .select({
        id: submissionFeedback.id,
        body: submissionFeedback.body,
        score: submissionFeedback.score,
        createdAt: submissionFeedback.createdAt,
        assignmentTitle: assignments.title,
        assignmentId: assignments.id,
      })
      .from(submissionFeedback)
      .innerJoin(submissions, eq(submissions.id, submissionFeedback.submissionId))
      .innerJoin(assignments, eq(assignments.id, submissions.assignmentId))
      .where(eq(submissions.studentId, user.id))
      .orderBy(desc(submissionFeedback.createdAt))
      .limit(3);
    const announcementRows = await tx.select().from(announcements).orderBy(desc(announcements.createdAt)).limit(3);
    const updates = await tx.select().from(notifications).where(eq(notifications.userId, user.id)).orderBy(desc(notifications.createdAt)).limit(5);
    const journey = publishedModules.map((module) => {
      const ids = publishedLessons.filter((lesson) => lesson.moduleId === module.id).map((lesson) => lesson.id);
      return { module, ...moduleProgress(ids, progress) };
    });
    return {
      completed,
      total: publishedLessons.length,
      currentModule,
      next,
      nextClass,
      pending,
      feedback,
      announcements: announcementRows,
      updates,
      journey,
    };
  });
}

export async function getLearningCatalogue(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const moduleRows = await tx.select().from(modules).orderBy(asc(modules.sortOrder));
    const lessonRows = await tx.select().from(lessons).orderBy(asc(lessons.sortOrder));
    const progress = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, user.id));
    const ordered = orderPublishedLessons(moduleRows, lessonRows);
    return moduleRows
      .filter((item) => item.published)
      .map((module) => {
        const moduleLessons = lessonRows.filter((lesson) => lesson.moduleId === module.id && lesson.published);
        const workOpen = isModuleWorkOpen(module.id, ordered, progress);
        return {
          module,
          lessons: moduleLessons.map((lesson) => ({
            ...lesson,
            locked: !isLessonOpen(lesson.id, ordered, progress),
            lockReason: lessonLockReason(lesson.id, ordered, progress),
          })),
          workLocked: !workOpen,
          workLockReason: moduleWorkLockReason(module.id, ordered, progress),
          ...moduleProgress(
            moduleLessons.map((lesson) => lesson.id),
            progress,
          ),
        };
      });
  });
}

export async function getModuleDetail(user: CurrentUser, moduleId: string) {
  return withActor(user, async (tx) => {
    const [module] = await tx.select().from(modules).where(eq(modules.id, moduleId)).limit(1);
    if (!module?.published) return null;
    const moduleRows = await tx.select().from(modules).orderBy(asc(modules.sortOrder));
    const allLessons = await tx.select().from(lessons).orderBy(asc(lessons.sortOrder));
    const lessonRows = allLessons.filter((lesson) => lesson.moduleId === moduleId && lesson.published);
    const progress = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, user.id));
    const ordered = orderPublishedLessons(moduleRows, allLessons);
    const [assignment] = await tx.select().from(assignments).where(eq(assignments.moduleId, moduleId)).limit(1);
    const [quiz] = await tx.select().from(quizzes).where(eq(quizzes.moduleId, moduleId)).limit(1);
    const workOpen = isModuleWorkOpen(moduleId, ordered, progress);
    return {
      module,
      lessons: lessonRows.map((lesson) => ({
        ...lesson,
        locked: !isLessonOpen(lesson.id, ordered, progress),
        lockReason: lessonLockReason(lesson.id, ordered, progress),
      })),
      progress,
      assignment: assignment?.published
        ? { ...assignment, locked: !workOpen, lockReason: moduleWorkLockReason(moduleId, ordered, progress) }
        : null,
      quiz: quiz?.published
        ? { ...quiz, locked: !workOpen, lockReason: moduleWorkLockReason(moduleId, ordered, progress) }
        : null,
    };
  });
}

export async function getLessonDetail(user: CurrentUser, lessonId: string) {
  return withActor(user, async (tx) => {
    const [lesson] = await tx.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
    if (!lesson?.published) return null;
    const [module] = await tx.select().from(modules).where(eq(modules.id, lesson.moduleId)).limit(1);
    if (!module?.published) return null;
    const moduleRows = await tx.select().from(modules).orderBy(asc(modules.sortOrder));
    const allLessons = await tx.select().from(lessons).orderBy(asc(lessons.sortOrder));
    const ordered = orderPublishedLessons(moduleRows, allLessons);
    const progressRows = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, user.id));
    const locked = !isLessonOpen(lesson.id, ordered, progressRows);
    const required = previousRequiredLesson(lesson.id, ordered, progressRows);
    const requiredLesson = required
      ? allLessons.find((item) => item.id === required.id) ?? null
      : null;
    if (locked) {
      return {
        locked: true as const,
        lockReason: lessonLockReason(lesson.id, ordered, progressRows) ?? "Available after you finish the previous lesson.",
        lesson: {
          id: lesson.id,
          title: lesson.title,
          sessionNumber: lesson.sessionNumber,
          estimatedMinutes: lesson.estimatedMinutes,
          difficulty: lesson.difficulty,
        },
        module: {
          id: module.id,
          weekNumber: module.weekNumber,
          title: module.title,
        },
        requiredLesson: requiredLesson
          ? { id: requiredLesson.id, title: requiredLesson.title, sessionNumber: requiredLesson.sessionNumber }
          : null,
      };
    }
    const siblings = allLessons.filter((item) => item.moduleId === module.id && item.published);
    const index = siblings.findIndex((item) => item.id === lesson.id);
    const [progress] = progressRows.filter((item) => item.lessonId === lesson.id);
    const [note] = await tx
      .select()
      .from(studentNotes)
      .where(and(eq(studentNotes.studentId, user.id), eq(studentNotes.lessonId, lesson.id)))
      .limit(1);
    const [homework] = await tx
      .select()
      .from(lessonHomework)
      .where(and(eq(lessonHomework.studentId, user.id), eq(lessonHomework.lessonId, lesson.id)))
      .limit(1);
    const [assignment] = await tx
      .select({ id: assignments.id, title: assignments.title, published: assignments.published })
      .from(assignments)
      .where(eq(assignments.moduleId, module.id))
      .limit(1);
    const [profile] = await tx.select().from(studentProfiles).where(eq(studentProfiles.userId, user.id)).limit(1);
    const workOpen = isModuleWorkOpen(module.id, ordered, progressRows);
    return {
      locked: false as const,
      lockReason: null,
      lesson,
      module,
      progress: progress ?? null,
      note: note ?? null,
      homework: homework ?? null,
      assignment: assignment?.published
        ? { ...assignment, locked: !workOpen, lockReason: moduleWorkLockReason(module.id, ordered, progressRows) }
        : null,
      previous: index > 0 ? siblings[index - 1] : null,
      next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null,
      operatingSystem: profile?.operatingSystem ?? null,
      requiredLesson: null,
    };
  });
}

export async function getProfile(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const [profile] = await tx.select().from(studentProfiles).where(eq(studentProfiles.userId, user.id)).limit(1);
    const notes = await tx.select().from(studentNotes).where(eq(studentNotes.studentId, user.id)).orderBy(desc(studentNotes.updatedAt));
    const [enrollment] = await tx.select().from(programmeEnrollments).where(eq(programmeEnrollments.studentId, user.id)).limit(1);
    const [programme] = enrollment
      ? await tx.select().from(programmes).where(eq(programmes.id, enrollment.programmeId)).limit(1)
      : [];
    return { profile: profile ?? null, notes, programme: programme ?? null };
  });
}

export async function listStudentAssignments(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const assignmentRows = await tx.select().from(assignments);
    const moduleRows = await tx.select().from(modules);
    const lessonRows = await tx.select().from(lessons);
    const progress = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, user.id));
    const ordered = orderPublishedLessons(moduleRows, lessonRows);
    const submissionRows = await tx
      .select({
        id: submissions.id,
        assignmentId: submissions.assignmentId,
        status: submissions.status,
        score: submissions.score,
        submittedAt: submissions.submittedAt,
        fileName: submissions.fileName,
      })
      .from(submissions)
      .where(eq(submissions.studentId, user.id));
    return assignmentRows
      .filter((assignment) => assignment.published)
      .map((assignment) => {
        const locked = !isModuleWorkOpen(assignment.moduleId, ordered, progress);
        return {
          assignment,
          module: moduleRows.find((item) => item.id === assignment.moduleId) ?? null,
          submission: submissionRows.find((item) => item.assignmentId === assignment.id) ?? null,
          locked,
          lockReason: moduleWorkLockReason(assignment.moduleId, ordered, progress),
        };
      })
      .sort((a, b) => (a.module?.sortOrder ?? 0) - (b.module?.sortOrder ?? 0));
  });
}

export async function getStudentAssignment(user: CurrentUser, assignmentId: string) {
  return withActor(user, async (tx) => {
    const [assignment] = await tx.select().from(assignments).where(eq(assignments.id, assignmentId)).limit(1);
    if (!assignment?.published) return null;
    const [module] = await tx.select().from(modules).where(eq(modules.id, assignment.moduleId)).limit(1);
    const moduleRows = await tx.select().from(modules);
    const lessonRows = await tx.select().from(lessons);
    const progress = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, user.id));
    const ordered = orderPublishedLessons(moduleRows, lessonRows);
    const locked = !isModuleWorkOpen(assignment.moduleId, ordered, progress);
    if (locked) {
      return {
        locked: true as const,
        lockReason: moduleWorkLockReason(assignment.moduleId, ordered, progress) ?? "Available after you finish this week's lessons.",
        assignment: { id: assignment.id, title: assignment.title, summary: assignment.summary },
        module: module
          ? { id: module.id, weekNumber: module.weekNumber, title: module.title }
          : null,
        submission: null,
        feedback: [],
      };
    }
    const [submission] = await tx
      .select({
        id: submissions.id,
        writtenResponse: submissions.writtenResponse,
        githubUrl: submissions.githubUrl,
        fileName: submissions.fileName,
        status: submissions.status,
        score: submissions.score,
        submittedAt: submissions.submittedAt,
        reviewedAt: submissions.reviewedAt,
      })
      .from(submissions)
      .where(and(eq(submissions.assignmentId, assignmentId), eq(submissions.studentId, user.id)))
      .limit(1);
    const feedback = submission
      ? await tx.select().from(submissionFeedback).where(eq(submissionFeedback.submissionId, submission.id)).orderBy(desc(submissionFeedback.createdAt))
      : [];
    return {
      locked: false as const,
      lockReason: null,
      assignment,
      module,
      submission: submission ?? null,
      feedback,
    };
  });
}

export async function listStudentQuizzes(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const quizRows = await tx.select().from(quizzes);
    const moduleRows = await tx.select().from(modules);
    const lessonRows = await tx.select().from(lessons);
    const progress = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, user.id));
    const ordered = orderPublishedLessons(moduleRows, lessonRows);
    const attempts = await tx.select().from(quizAttempts).where(eq(quizAttempts.studentId, user.id)).orderBy(desc(quizAttempts.submittedAt));
    return quizRows
      .filter((quiz) => quiz.published)
      .map((quiz) => {
        const locked = !isModuleWorkOpen(quiz.moduleId, ordered, progress);
        return {
          quiz,
          module: moduleRows.find((item) => item.id === quiz.moduleId) ?? null,
          attempts: attempts.filter((attempt) => attempt.quizId === quiz.id),
          locked,
          lockReason: moduleWorkLockReason(quiz.moduleId, ordered, progress),
        };
      })
      .sort((a, b) => (a.module?.sortOrder ?? 0) - (b.module?.sortOrder ?? 0));
  });
}

export async function getStudentQuiz(user: CurrentUser, quizId: string) {
  return withActor(user, async (tx) => {
    const [quiz] = await tx.select().from(quizzes).where(eq(quizzes.id, quizId)).limit(1);
    if (!quiz?.published) return null;
    const [module] = await tx.select().from(modules).where(eq(modules.id, quiz.moduleId)).limit(1);
    const moduleRows = await tx.select().from(modules);
    const lessonRows = await tx.select().from(lessons);
    const progress = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, user.id));
    const ordered = orderPublishedLessons(moduleRows, lessonRows);
    const locked = !isModuleWorkOpen(quiz.moduleId, ordered, progress);
    if (locked) {
      return {
        locked: true as const,
        lockReason: moduleWorkLockReason(quiz.moduleId, ordered, progress) ?? "Available after you finish this week's lessons.",
        quiz: {
          id: quiz.id,
          title: quiz.title,
          passingScore: quiz.passingScore,
          allowRetakes: quiz.allowRetakes,
        },
        module: module
          ? { id: module.id, weekNumber: module.weekNumber, title: module.title }
          : null,
        questions: [],
        attempts: [],
        latest: null,
        answers: [],
      };
    }
    const questions = await tx.select().from(quizQuestions).where(eq(quizQuestions.quizId, quizId)).orderBy(asc(quizQuestions.sortOrder));
    const attempts = await tx
      .select()
      .from(quizAttempts)
      .where(and(eq(quizAttempts.quizId, quizId), eq(quizAttempts.studentId, user.id)))
      .orderBy(desc(quizAttempts.submittedAt));
    const latest = attempts[0] ?? null;
    const answers = latest
      ? await tx.select().from(quizAttemptAnswers).where(eq(quizAttemptAnswers.attemptId, latest.id))
      : [];
    return {
      locked: false as const,
      lockReason: null,
      quiz,
      module,
      questions,
      attempts,
      latest,
      answers,
    };
  });
}

export async function listSchedule(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const classes = await tx.select().from(classSessions).where(eq(classSessions.studentId, user.id)).orderBy(asc(classSessions.startsAt));
    const lessonRows = await tx.select({ id: lessons.id, title: lessons.title }).from(lessons);
    return classes.map((item) => ({
      item,
      lessonTitle: lessonRows.find((lesson) => lesson.id === item.lessonId)?.title ?? null,
    }));
  });
}

export async function listVisibleResources(user: CurrentUser) {
  return withActor(user, async (tx) => tx.select().from(resources).orderBy(asc(resources.sortOrder), asc(resources.title)));
}

export async function listVisibleAnnouncements(user: CurrentUser) {
  return withActor(user, async (tx) => tx.select().from(announcements).orderBy(desc(announcements.createdAt)));
}

export async function listStudentNotifications(user: CurrentUser) {
  return withActor(user, async (tx) =>
    tx.select().from(notifications).where(eq(notifications.userId, user.id)).orderBy(desc(notifications.createdAt)).limit(50),
  );
}

export async function getProgressReport(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const catalogue = await getLearningInside(tx, user.id);
    const submissionRows = await tx
      .select({
        id: submissions.id,
        assignmentId: submissions.assignmentId,
        status: submissions.status,
        score: submissions.score,
      })
      .from(submissions)
      .where(eq(submissions.studentId, user.id));
    const attempts = await tx.select().from(quizAttempts).where(eq(quizAttempts.studentId, user.id));
    const classes = await tx.select().from(classSessions).where(eq(classSessions.studentId, user.id));
    return { catalogue, submissions: submissionRows, attempts, classes };
  });
}

async function getLearningInside(tx: Parameters<Parameters<typeof withActor>[1]>[0], userId: string) {
  const moduleRows = await tx.select().from(modules).orderBy(asc(modules.sortOrder));
  const lessonRows = await tx.select().from(lessons).orderBy(asc(lessons.sortOrder));
  const progress = await tx.select().from(lessonProgress).where(eq(lessonProgress.studentId, userId));
  return moduleRows
    .filter((item) => item.published)
    .map((module) => {
      const moduleLessons = lessonRows.filter((lesson) => lesson.moduleId === module.id && lesson.published);
      return { module, lessons: moduleLessons, progress, ...moduleProgress(moduleLessons.map((lesson) => lesson.id), progress) };
    });
}

export async function instructorName(user: CurrentUser) {
  return withActor(user, async (tx) => {
    const [row] = await tx.select({ fullName: users.fullName }).from(users).where(eq(users.id, user.id)).limit(1);
    return row?.fullName ?? "Your instructor";
  });
}
