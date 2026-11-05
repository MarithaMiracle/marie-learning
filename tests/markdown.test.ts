import assert from "node:assert/strict";
import test from "node:test";
import { parseMarkdown } from "../src/lib/markdown";

test("parses headings, lists, callouts, and fenced code", () => {
  const blocks = parseMarkdown(`## Title

A paragraph with **bold** and \`code\`.

- One
- Two

:::tip Remember
Keep the file extension.
:::

\`\`\`html
<p>Hello</p>
\`\`\`
`);
  assert.equal(blocks[0]?.type, "h");
  assert.equal(blocks[1]?.type, "p");
  assert.equal(blocks[2]?.type, "ul");
  assert.equal(blocks[3]?.type, "callout");
  assert.equal(blocks[4]?.type, "code");
});
