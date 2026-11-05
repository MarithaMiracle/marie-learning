"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  ["Do I need previous programming experience?", "No. The programme is designed for beginners and starts with the fundamentals."],
  ["What will I learn?", "You will learn HTML, CSS, JavaScript, TypeScript, React, Node.js, REST APIs, PostgreSQL, and the developer tools used to write and share that work."],
  ["How long does the programme take?", "The guided programme runs for 16 weeks, with two live sessions each week."],
  ["What kind of computer do I need?", "A laptop or desktop you can practise on. Lessons include separate steps for Windows, macOS, and Linux when the task differs."],
  ["Will I build a real project?", "Yes. The last week is a guided task manager built with React, a small API, and PostgreSQL."],
  ["How do live sessions work?", "Sessions are instructor-led. Each one has a written lesson, exercises, and practice between classes."],
  ["Can I learn at my own pace?", "The programme follows a set 16-week schedule. The lessons, exercises, and your progress stay in the portal between classes."],
  ["How do I get started?", "Use Get Started to create a student account when registration is open. When it is closed, your instructor creates the account and you log in."],
] as const;

export function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {questions.map(([question, answer], index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold text-navy"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                {question}
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
              <p className="pb-4 pr-8 text-sm leading-6 text-muted">{answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
