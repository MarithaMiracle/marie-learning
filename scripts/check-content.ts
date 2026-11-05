import { readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import type { ModuleSeed } from "../src/lib/content-types";
import { assessLessonSeed } from "../src/lib/completeness";

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

async function main() {
  const directory = resolve(process.cwd(), "content/weeks");
  const files = readdirSync(directory).filter((file) => /^week\d+\.ts$/.test(file)).sort();
  const problems: string[] = [];
  if (files.length !== 16) problems.push(`Expected 16 week files, found ${files.length}.`);
  const sessions = new Set<number>();
  for (const file of files) {
    const imported = await import(pathToFileURL(resolve(directory, file)).href);
    const key = file.replace(".ts", "");
    const module = readModule(imported, key);
    if (!module) {
      problems.push(`${file} does not export ${key}`);
      continue;
    }
    if (module.lessons.length !== 2) problems.push(`${module.slug} should have 2 lessons`);
    const rubric = module.assignment.rubric.reduce((sum, item) => sum + item.points, 0);
    if (rubric !== module.assignment.points) problems.push(`${module.assignment.slug} rubric does not add up`);
    if (module.assignment.instructions.length < 400) problems.push(`${module.assignment.slug} instructions are thin`);
    if (module.assignment.instructorSolution.length < 200) problems.push(`${module.assignment.slug} solution is thin`);
    if (module.quiz.questions.length < 8 || module.quiz.questions.length > 10) {
      problems.push(`${module.quiz.slug} should have 8 to 10 questions`);
    }
    const auto = module.quiz.questions.filter((question) => question.type !== "short_answer").length;
    const shorts = module.quiz.questions.filter((question) => question.type === "short_answer").length;
    if (auto < 5 || shorts < 1) problems.push(`${module.quiz.slug} needs objective questions and a short answer`);
    for (const lesson of module.lessons) {
      sessions.add(lesson.sessionNumber);
      const report = assessLessonSeed(lesson);
      if (!report.complete) problems.push(`${lesson.slug}: ${report.missing.join("; ")}`);
      if (/TODO|lorem ipsum|placeholder/i.test(JSON.stringify(lesson))) problems.push(`${lesson.slug} contains placeholder text`);
    }
  }
  if (sessions.size !== 32) problems.push(`Expected sessions 1–32, found ${sessions.size} unique numbers.`);
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log("All 32 lessons meet the content checklist.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
