export type OperatingSystem = "windows" | "macos" | "linux" | "unknown";

export type LessonDifficulty =
  | "Gentle introduction"
  | "Guided practice"
  | "Bringing ideas together";

export type Completeness = {
  score: number;
  missing: string[];
  complete: boolean;
};

export type OsGuide = {
  sameOnAllPlatforms?: string;
  windows?: string[];
  macos?: string[];
  linux?: string[];
  identify?: string[];
};

export type Demonstration = {
  title: string;
  intro: string;
  steps: string[];
  expected: string;
  verify: string;
  ifItFails: string;
  os?: OsGuide;
};

export type CodeExample = {
  title: string;
  filename: string;
  language: string;
  code: string;
  explanation: string;
  lineNotes: { focus: string; note: string }[];
  expectedOutput: string;
  level: "basic" | "improved" | "practical";
};

export type Exercise = {
  title: string;
  difficulty: "warm-up" | "practice" | "stretch";
  prompt: string;
  steps: string[];
  expectedOutcome: string;
};

export type LessonContent = {
  overview: {
    about: string;
    why: string;
    alreadyKnow: string;
  };
  objectives: string[];
  prerequisites: { label: string; lessonSlug?: string }[];
  teachingNotes: { heading: string; markdown: string }[];
  vocabulary: { term: string; definition: string }[];
  demonstrations: Demonstration[];
  codeExamples: CodeExample[];
  exercises: Exercise[];
  troubleshooting: { problem: string; why: string; solution: string }[];
  knowledgeChecks: {
    id: string;
    question: string;
    format: string;
    options?: string[];
  }[];
  homework: {
    description: string;
    requirements: string[];
    deliverables: string[];
    submission: string;
    criteria: string[];
    submissionKind: "lesson_response" | "module_assignment";
  };
  summary: string[];
  nextLesson: { title: string; why: string; lessonSlug?: string };
};

export type InstructorGuide = {
  sessionNumber: number;
  week: number;
  title: string;
  durationMinutes: number;
  objectives: string[];
  tools: string[];
  preparation: string[];
  flow: { minutes: number; title: string; detail: string }[];
  explain: string[];
  questions: string[];
  demonstration: string;
  practice: string;
  expectedOutcomes: string[];
  difficulties: { issue: string; help: string }[];
  homework: string;
  assessment: string;
  recap: string;
  knowledgeCheckAnswers: { id: string; answer: string; explanation: string }[];
};

export type ProjectGuide = {
  databaseStructure: string;
  apiGuidance: string;
  componentGuidance: string;
  testingChecklist: string[];
};

export type AssignmentSeed = {
  slug: string;
  title: string;
  summary: string;
  instructions: string;
  objectives: string[];
  requirements: string[];
  deliverables: string[];
  rubric: { criterion: string; points: number; description: string }[];
  points: number;
  instructorSolution: string;
  projectGuide?: ProjectGuide | null;
};

export type QuizQuestionType =
  | "multiple_choice"
  | "true_false"
  | "short_answer"
  | "code_reading";

export type QuizQuestionSeed = {
  slug: string;
  type: QuizQuestionType;
  prompt: string;
  codeSnippet?: string;
  options?: { id: string; text: string }[];
  correct: { optionId?: string; value?: boolean; rubric?: string };
  explanation: string;
  points: number;
};

export type QuizSeed = {
  slug: string;
  title: string;
  passingScore: number;
  allowRetakes: boolean;
  questions: QuizQuestionSeed[];
};

export type LessonSeed = {
  slug: string;
  sessionNumber: number;
  title: string;
  estimatedMinutes: number;
  difficulty: LessonDifficulty;
  requiresOs: boolean;
  content: LessonContent;
  guide: InstructorGuide;
};

export type ModuleSeed = {
  slug: string;
  number: number;
  weekNumber: number;
  monthLabel: string;
  title: string;
  description: string;
  lessons: LessonSeed[];
  assignment: AssignmentSeed;
  quiz: QuizSeed;
};

export type ChecklistItem = {
  id: string;
  label: string;
  detail: string;
  done: boolean;
};

export type ResourceSeed = {
  category: string;
  title: string;
  url: string;
  description: string;
};
