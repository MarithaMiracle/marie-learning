import { parseInlines, parseMarkdown, type Inline } from "@/lib/markdown";
import { CopyButton } from "@/components/copy-button";

export function Markdown({ source, className = "lesson-prose" }: { source: string; className?: string }) {
  const blocks = parseMarkdown(source);
  return (
    <div className={className}>
      {blocks.map((block, index) => {
        if (block.type === "h") {
          const Tag = block.level === 2 ? "h2" : "h3";
          return <Tag key={index}>{block.text}</Tag>;
        }
        if (block.type === "ul" || block.type === "ol") {
          const Tag = block.type === "ul" ? "ul" : "ol";
          return (
            <Tag key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inlines items={item} />
                </li>
              ))}
            </Tag>
          );
        }
        if (block.type === "code") {
          return (
            <div key={index} className="overflow-hidden rounded-xl border border-line bg-navy">
              <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-300">
                <span>{block.language}</span>
                <CopyButton text={block.code} light />
              </div>
              <pre className="overflow-x-auto px-4 pb-4 text-sm leading-6 text-slate-50">
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }
        if (block.type === "callout") {
          const tones = {
            tip: "border-primary/20 bg-primary/10",
            warning: "border-amber-200 bg-amber-50",
            example: "border-emerald-200 bg-emerald-50",
            misunderstanding: "border-rose-200 bg-rose-50",
          };
          return (
            <aside key={index} className={`my-4 rounded-xl border px-4 py-3 ${tones[block.tone]}`}>
              <p className="font-sans text-sm font-bold text-navy">{block.title}</p>
              <p className="mt-1">
                <Inlines items={block.inlines.length ? block.inlines : parseInlines("")} />
              </p>
            </aside>
          );
        }
        return (
          <p key={index}>
            <Inlines items={block.inlines} />
          </p>
        );
      })}
    </div>
  );
}

function Inlines({ items }: { items: Inline[] }) {
  return (
    <>
      {items.map((item, index) => {
        if (item.type === "strong") return <strong key={index}>{item.text}</strong>;
        if (item.type === "em") return <em key={index}>{item.text}</em>;
        if (item.type === "code") return <code key={index}>{item.text}</code>;
        if (item.type === "link") {
          return (
            <a key={index} href={item.href} target="_blank" rel="noreferrer">
              {item.text}
            </a>
          );
        }
        return <span key={index}>{item.text}</span>;
      })}
    </>
  );
}
