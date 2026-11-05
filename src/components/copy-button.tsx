"use client";

import { useState } from "react";

export function CopyButton({ text, light = false }: { text: string; light?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={light ? "rounded-md px-2 py-1 text-slate-200 hover:bg-white/10" : "rounded-md px-2 py-1 text-xs font-semibold text-navy hover:bg-primary/10"}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
