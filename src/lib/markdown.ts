export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "em"; text: string }
  | { type: "code"; text: string }
  | { type: "link"; text: string; href: string };

export type MdBlock =
  | { type: "p"; inlines: Inline[] }
  | { type: "h"; level: 2 | 3; text: string }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] }
  | { type: "code"; language: string; code: string }
  | { type: "callout"; tone: CalloutTone; title: string; inlines: Inline[] };

export type CalloutTone = "tip" | "warning" | "example" | "misunderstanding";

const tones = new Set<CalloutTone>(["tip", "warning", "example", "misunderstanding"]);

export function parseMarkdown(source: string): MdBlock[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: MdBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```([\w-]*)\s*$/);
    if (fence) {
      const language = fence[1] || "text";
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        body.push(lines[index] ?? "");
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: "code", language, code: body.join("\n") });
      continue;
    }

    const callout = line.match(/^:::(tip|warning|example|misunderstanding)\s*(.*)$/);
    if (callout && tones.has(callout[1] as CalloutTone)) {
      const tone = callout[1] as CalloutTone;
      const title = callout[2]?.trim() || defaultTitle(tone);
      const body: string[] = [];
      index += 1;
      while (index < lines.length && lines[index] !== ":::") {
        body.push(lines[index] ?? "");
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({
        type: "callout",
        tone,
        title,
        inlines: parseInlines(body.join(" ").replace(/\s+/g, " ").trim()),
      });
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      blocks.push({
        type: "h",
        level: heading[1].length === 2 ? 2 : 3,
        text: heading[2].trim(),
      });
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: Inline[][] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index] ?? "")) {
        items.push(parseInlines((lines[index] ?? "").replace(/^[-*]\s+/, "")));
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: Inline[][] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index] ?? "")) {
        items.push(parseInlines((lines[index] ?? "").replace(/^\d+\.\s+/, "")));
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("```") &&
      !lines[index].startsWith(":::") &&
      !/^#{2,3}\s+/.test(lines[index]) &&
      !/^[-*]\s+/.test(lines[index]) &&
      !/^\d+\.\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index] ?? "");
      index += 1;
    }
    blocks.push({ type: "p", inlines: parseInlines(paragraph.join(" ")) });
  }

  return blocks;
}

function defaultTitle(tone: CalloutTone) {
  switch (tone) {
    case "tip":
      return "Tip";
    case "warning":
      return "Watch out";
    case "example":
      return "Example";
    case "misunderstanding":
      return "A common mix-up";
  }
}

export function parseInlines(input: string): Inline[] {
  const inlines: Inline[] = [];
  const pattern =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
  let cursor = 0;
  for (const match of input.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > cursor) inlines.push({ type: "text", text: input.slice(cursor, start) });
    if (match[1] && match[2]) inlines.push({ type: "link", text: match[1], href: match[2] });
    else if (match[3]) inlines.push({ type: "strong", text: match[3] });
    else if (match[4]) inlines.push({ type: "em", text: match[4] });
    else if (match[5]) inlines.push({ type: "code", text: match[5] });
    cursor = start + match[0].length;
  }
  if (cursor < input.length) inlines.push({ type: "text", text: input.slice(cursor) });
  return inlines.filter((item) => item.type !== "text" || item.text.length > 0);
}
