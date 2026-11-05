import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "M";
}

export function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export function percent(part: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((part / total) * 100);
}

export function describeAnswer(value: string | undefined, options?: { id: string; text: string }[] | null) {
  if (!value) return "No answer";
  if (value === "true") return "True";
  if (value === "false") return "False";
  return options?.find((option) => option.id === value)?.text ?? value;
}

export function describeKey(
  correct: { optionId?: string; value?: boolean; rubric?: string } | null | undefined,
  options?: { id: string; text: string }[] | null,
) {
  if (!correct) return "No key stored";
  if (typeof correct.value === "boolean") return correct.value ? "True" : "False";
  if (correct.optionId) return describeAnswer(correct.optionId, options);
  if (correct.rubric) return correct.rubric;
  return "Marked from the written answer";
}

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
