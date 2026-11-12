import type { Completeness, InstructorGuide, LessonContent, LessonSeed } from "@/lib/content-types";

function words(value: string | undefined) {
  return (value ?? "").trim();
}

export function assessLessonContent(
  content: LessonContent,
  guide: InstructorGuide | null,
  options?: { sessionNumber?: number; requiresOs?: boolean },
): Completeness {
  const missing: string[] = [];
  const teachingLength = content.teachingNotes.reduce(
    (total, section) => total + words(section.markdown).length,
    0,
  );

  if (words(content.overview.about).length < 80) missing.push("Lesson overview");
  if (words(content.overview.why).length < 40) missing.push("Why this lesson matters");
  if (words(content.overview.alreadyKnow).length < 20) missing.push("What students should already understand");
  if (content.objectives.length < 3 || content.objectives.length > 6) {
    missing.push("3 to 6 learning objectives");
  }
  if (content.prerequisites.length < 1) missing.push("Prerequisites");
  if (content.teachingNotes.length < 5 || teachingLength < 4500) {
    missing.push("Detailed teaching notes");
  }
  if (content.vocabulary.length < 5) missing.push("At least 5 vocabulary terms");
  if (content.vocabulary.some((item) => words(item.definition).length < 30)) {
    missing.push("Vocabulary definitions in plain language");
  }
  const demonstration = content.demonstrations[0];
  if (!demonstration || demonstration.steps.length < 6) {
    missing.push("A step-by-step demonstration");
  }
  if (
    content.demonstrations.some(
      (item) =>
        words(item.expected).length < 20 ||
        words(item.verify).length < 20 ||
        words(item.ifItFails).length < 20,
    )
  ) {
    missing.push("Expected result, verification, and recovery steps");
  }
  if (content.codeExamples.length < 1) missing.push("A worked example");
  if (content.exercises.length < 2) missing.push("At least two exercises");
  if (content.troubleshooting.length < 3) missing.push("Common errors and fixes");
  if (content.knowledgeChecks.length < 3) missing.push("Knowledge checks");
  if (
    words(content.homework.description).length < 40 ||
    content.homework.requirements.length < 2 ||
    content.homework.deliverables.length < 1 ||
    content.homework.criteria.length < 2
  ) {
    missing.push("Homework with requirements and criteria");
  }
  if (content.summary.length < 3) missing.push("Lesson summary");
  if (words(content.nextLesson.title).length < 3 || words(content.nextLesson.why).length < 20) {
    missing.push("Next lesson connection");
  }

  const osText = content.demonstrations.flatMap((item) => [
    ...(item.os?.windows ?? []),
    ...(item.os?.macos ?? []),
    ...(item.os?.linux ?? []),
  ]);
  const hasWindows = content.demonstrations.some((item) => (item.os?.windows?.length ?? 0) >= 2);
  const hasMac = content.demonstrations.some((item) => (item.os?.macos?.length ?? 0) >= 2);
  const hasLinux = content.demonstrations.some((item) => (item.os?.linux?.length ?? 0) >= 2);
  if (options?.requiresOs !== false && (!hasWindows || !hasMac || !hasLinux)) {
    missing.push("Separate Windows, macOS, and Linux instructions");
  }
  if (options?.requiresOs && osText.length < 6) {
    missing.push("Practical operating-system steps");
  }

  if (!guide) {
    missing.push("Instructor session guide");
  } else {
    const minutes = guide.flow.reduce((total, item) => total + item.minutes, 0);
    if (guide.durationMinutes !== 90) missing.push("90-minute session duration");
    if (minutes < 80 || minutes > 100) missing.push("Teaching flow that adds up to about 90 minutes");
    if (guide.flow.length < 5 || guide.flow.some((item) => words(item.detail).length < 80)) {
      missing.push("A specific teaching flow");
    }
    if (guide.preparation.length < 3) missing.push("Preparation checklist");
    if (guide.difficulties.length < 2) missing.push("Help for struggling students");
    if (guide.questions.length < 3) missing.push("Suggested teaching questions");
    if (words(guide.demonstration).length < 40) missing.push("Demonstration notes");
    if (words(guide.practice).length < 40) missing.push("Student practical activity");
    const expectedIds = content.knowledgeChecks.map((item) => item.id).sort();
    const answerIds = guide.knowledgeCheckAnswers.map((item) => item.id).sort();
    if (expectedIds.join() !== answerIds.join()) {
      missing.push("Instructor answers for every knowledge check");
    }
    if (guide.knowledgeCheckAnswers.some((item) => words(item.explanation).length < 20)) {
      missing.push("Explanations for knowledge-check answers");
    }
  }

  const checks = 22;
  const score = Math.max(0, Math.round(((checks - missing.length) / checks) * 100));
  return { score, missing, complete: missing.length === 0 };
}

export function assessLessonSeed(lesson: LessonSeed): Completeness {
  return assessLessonContent(lesson.content, lesson.guide, {
    sessionNumber: lesson.sessionNumber,
    requiresOs: lesson.requiresOs,
  });
}
