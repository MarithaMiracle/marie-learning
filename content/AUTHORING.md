# Lesson authoring rules

Write TypeScript files that import `ModuleSeed` from `../../src/lib/content-types`.

```ts
import type { ModuleSeed } from "../../src/lib/content-types";

export const week01: ModuleSeed = { /* ... */ };
```

Each file exports exactly one module. Do not edit any other file.

## Voice

Write for an adult absolute beginner. Use short sentences and simple English. Explain a technical word the first time you use it. Use an everyday analogy where it helps. Do not promise a job, expert skill, or mastery. Do not tell the student to "simply" do something that is new.

Every important concept needs: what it is, why it exists, the problem it solves, how it works, a beginner misunderstanding, and a connection to something already taught or to ordinary life.

## Required lesson shape

`requiresOs` must be true.

Teaching notes are markdown. Allowed syntax only:

- paragraphs
- `##` and `###` headings
- `-` lists and `1.` lists
- `**bold**`, `*italic*`, `` `code` ``
- fenced code blocks
- callouts:

```
:::tip Title
One paragraph.
:::
:::warning Title
One paragraph.
:::
:::example Title
One paragraph.
:::
:::misunderstanding Title
One paragraph.
:::
```

Quality minimums checked automatically:

- `overview.about` at least 80 characters, `why` at least 40, `alreadyKnow` at least 20
- 4 to 6 objectives
- at least 1 prerequisite. Lesson 1 can say no earlier lesson is required.
- at least 5 teaching sections and at least 4500 characters of teaching markdown in total. Aim for 5500 or more. Cover every topic in the brief with real explanation, not a list of terms.
- at least 5 vocabulary items. Each definition is at least 30 characters of plain language.
- at least 1 demonstration with at least 6 steps. Every demonstration has `expected`, `verify`, and `ifItFails`, each at least 20 characters.
- The demonstrations together must include `os.windows`, `os.macos`, and `os.linux`, each with at least 2 steps. Also include `identify` when the student may not know their system. If a command is the same everywhere, set `sameOnAllPlatforms` and still explain how to open the terminal or file manager on each system.
- at least 1 complete code example with filename, explanation, line notes, and expected output. Early lessons can use a plain text or HTML file. Code must be syntactically valid.
- at least 2 exercises with steps and an expected outcome. Do not put the full answer in the student exercise.
- at least 3 troubleshooting items with problem, why, and solution. Only include errors that can happen in this lesson.
- at least 3 knowledge checks with ids. Options if the format is multiple choice.
- homework with description, at least 2 requirements, at least 1 deliverable, at least 2 criteria, and a submission method.
- Session 1 of a week uses `submissionKind: "lesson_response"`. Session 2 uses `submissionKind: "module_assignment"`.
- at least 3 summary points
- `nextLesson.why` at least 20 characters. The last lesson of week 16 can point to continued practice.

## Instructor guide

Unique to that session. Not a generic template with the title swapped.

- `durationMinutes` is 90
- `flow` has at least 5 parts whose minutes add up to 90. Suggested shape: 5, 15, 20, 30, 10, 10. Each `detail` is at least 80 characters and says what the instructor does and says.
- at least 3 preparation items, 3 suggested questions, 2 difficulties with specific help
- demonstration, practice, homework, assessment, and recap are specific
- `knowledgeCheckAnswers` has the same ids as the student questions, with a correct answer and an explanation of at least 20 characters

## Assignment

One per module. Instructions of at least 400 characters. At least 3 objectives, 4 requirements, and a rubric whose points add up to `points`. Instructor solution of at least 200 characters. The solution is not shown to students. Week 16 also includes `projectGuide` with database structure, API guidance, component guidance, and a testing checklist.

## Quiz

8 to 10 questions. Mix multiple choice, true/false, and at least one short answer. Use `code_reading` once code exists. Each prompt is a real question. Each explanation is at least 40 characters and teaches the idea. `passingScore` is 70. `allowRetakes` is true. Points are small integers. Multiple choice and code reading set `correct.optionId` to an option id. True/false sets `correct.value` to true or false. Short answers set `correct.rubric` and do not rely on one exact sentence.

Do not use the words TODO, lorem, placeholder, or "content goes here".
