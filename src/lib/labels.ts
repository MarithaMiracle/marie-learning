export const osLabels = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
  unknown: "Not sure yet",
} as const;

export const computerLabels = {
  new: "I am completely new",
  browse: "I can browse the internet and type",
  install: "I can install applications and manage files",
  comfortable: "I am comfortable using a computer",
} as const;

export const codingLabels = {
  never: "No, never",
  videos: "I have watched coding videos",
  exercises: "I have tried a few coding exercises",
  some: "I have some experience",
} as const;

export const practiceLabels = {
  lt2: "Less than 2 hours weekly",
  h2to4: "2–4 hours weekly",
  h5to7: "5–7 hours weekly",
  h8plus: "8 hours or more weekly",
} as const;

export const resourceCategories = [
  "Computer fundamentals",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Git and GitHub",
  "React",
  "Backend",
  "APIs",
  "Databases",
  "Developer tools",
] as const;

export function labelFrom<T extends Record<string, string>>(map: T, value: string | null | undefined) {
  if (!value) return "Not provided";
  return map[value as keyof T] ?? value;
}
