import type { ChecklistItem, OperatingSystem } from "@/lib/content-types";
import { osLabels } from "@/lib/labels";

export function defaultChecklist(os: OperatingSystem | null, version?: string | null): ChecklistItem[] {
  const known = os && os !== "unknown";
  const system = known ? osLabels[os] : "your operating system";
  const terminal = os === "macos" ? "Terminal" : os === "linux" ? "the Terminal" : os === "windows" ? "PowerShell" : "a terminal";
  return [
    {
      id: "browser",
      label: "Open a web browser",
      detail: "Chrome, Edge, Firefox, or Safari will all work. You only need to be able to visit a website.",
      done: false,
    },
    {
      id: "folder",
      label: "Create a folder called learning",
      detail: `You will do this together in the first class. Put it somewhere easy to find, such as Documents/learning. Do not put it on the Desktop if that folder is already crowded.`,
      done: false,
    },
    {
      id: "os",
      label: known ? `Your computer uses ${system}` : "Find out which operating system you use",
      detail: known
        ? `${system}${version ? ` (${version})` : ""} is saved on your profile. You can change it in Settings if this is wrong.`
        : "Windows, macOS, and Linux use different menus. The first lesson shows how to check. Update your profile when you know.",
      done: Boolean(known),
    },
    {
      id: "tools-later",
      label: "Leave the developer tools until the lesson that needs them",
      detail: "You do not need Visual Studio Code, Git, Node.js, or PostgreSQL on your first day. Each tool is installed in the week you will actually use it.",
      done: false,
    },
    {
      id: "practice",
      label: "Choose a regular practice time",
      detail: "Two live classes are not enough on their own. A repeating practice time is easier to keep than waiting until you feel ready.",
      done: false,
    },
    {
      id: "start",
      label: "Open Week 1, Session 1",
      detail: `The first lesson is about computers and software. You will use ${terminal} later. You do not need it to start reading.`,
      done: false,
    },
  ];
}

export function mergeChecklist(saved: ChecklistItem[] | null | undefined, fresh: ChecklistItem[]) {
  const done = new Map((saved ?? []).map((item) => [item.id, item.done]));
  return fresh.map((item) => ({ ...item, done: done.get(item.id) ?? item.done }));
}
