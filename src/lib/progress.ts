export type ProgressStatus = "not_started" | "in_progress" | "completed";

export type OrderedLesson = {
  id: string;
  moduleId: string;
  sortOrder: number;
  moduleOrder: number;
};

export function lessonStatus(
  lessonId: string,
  rows: { lessonId: string; status: "in_progress" | "completed" }[],
): ProgressStatus {
  const row = rows.find((item) => item.lessonId === lessonId);
  if (!row) return "not_started";
  return row.status;
}

export function moduleProgress(
  lessonIds: string[],
  rows: { lessonId: string; status: "in_progress" | "completed" }[],
) {
  const completed = lessonIds.filter((id) => lessonStatus(id, rows) === "completed").length;
  const started = lessonIds.filter((id) => lessonStatus(id, rows) !== "not_started").length;
  const status: ProgressStatus =
    lessonIds.length > 0 && completed === lessonIds.length
      ? "completed"
      : started > 0
        ? "in_progress"
        : "not_started";
  return { completed, total: lessonIds.length, status };
}

export function orderPublishedLessons(
  modules: { id: string; sortOrder: number; published: boolean }[],
  lessons: { id: string; moduleId: string; sortOrder: number; published: boolean }[],
): OrderedLesson[] {
  const publishedModules = modules.filter((item) => item.published);
  return lessons
    .filter((lesson) => lesson.published && publishedModules.some((item) => item.id === lesson.moduleId))
    .map((lesson) => ({
      id: lesson.id,
      moduleId: lesson.moduleId,
      sortOrder: lesson.sortOrder,
      moduleOrder: publishedModules.find((item) => item.id === lesson.moduleId)?.sortOrder ?? 0,
    }))
    .sort((a, b) => a.moduleOrder - b.moduleOrder || a.sortOrder - b.sortOrder);
}

export function isLessonOpen(
  lessonId: string,
  ordered: OrderedLesson[],
  rows: { lessonId: string; status: "in_progress" | "completed" }[],
) {
  const index = ordered.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return false;
  return ordered.slice(0, index).every((lesson) => lessonStatus(lesson.id, rows) === "completed");
}

export function previousRequiredLesson(
  lessonId: string,
  ordered: OrderedLesson[],
  rows: { lessonId: string; status: "in_progress" | "completed" }[],
) {
  const index = ordered.findIndex((lesson) => lesson.id === lessonId);
  if (index <= 0) return null;
  return (
    ordered
      .slice(0, index)
      .reverse()
      .find((lesson) => lessonStatus(lesson.id, rows) !== "completed") ?? null
  );
}

export function isModuleWorkOpen(
  moduleId: string,
  ordered: OrderedLesson[],
  rows: { lessonId: string; status: "in_progress" | "completed" }[],
) {
  const moduleLessons = ordered.filter((lesson) => lesson.moduleId === moduleId);
  if (moduleLessons.length === 0) return false;
  return moduleLessons.every((lesson) => lessonStatus(lesson.id, rows) === "completed");
}

export function lessonLockReason(
  lessonId: string,
  ordered: OrderedLesson[],
  rows: { lessonId: string; status: "in_progress" | "completed" }[],
) {
  if (isLessonOpen(lessonId, ordered, rows)) return null;
  return "Available after you finish the previous lesson.";
}

export function moduleWorkLockReason(
  moduleId: string,
  ordered: OrderedLesson[],
  rows: { lessonId: string; status: "in_progress" | "completed" }[],
) {
  if (isModuleWorkOpen(moduleId, ordered, rows)) return null;
  return "Available after you finish this week's lessons.";
}

export function nextIncomplete<T extends { id: string; moduleId: string; sortOrder: number; moduleOrder: number }>(
  lessons: T[],
  rows: { lessonId: string; status: "in_progress" | "completed" }[],
) {
  return [...lessons]
    .sort((a, b) => a.moduleOrder - b.moduleOrder || a.sortOrder - b.sortOrder)
    .find((lesson) => lessonStatus(lesson.id, rows) !== "completed");
}
