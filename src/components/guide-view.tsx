"use client";

import type { InstructorGuide } from "@/lib/content-types";
import { Card } from "@/components/ui";

export function GuideView({ guide }: { guide: InstructorGuide }) {
  const minutes = guide.flow.reduce((sum, item) => sum + item.minutes, 0);
  return (
    <div className="print-area space-y-4">
      <div className="no-print">
        <button type="button" className="text-sm font-semibold text-primary" onClick={() => window.print()}>
          Print this session guide
        </button>
      </div>
      <Card className="p-5">
        <p className="text-sm font-semibold text-primary">Session {guide.sessionNumber} · Week {guide.week} · {guide.durationMinutes} minutes</p>
        <h2 className="mt-1 text-2xl font-bold text-navy">{guide.title}</h2>
        <p className="mt-2 text-sm text-muted">Planned flow: {minutes} minutes</p>
      </Card>
      <Section title="Teaching objectives" items={guide.objectives} />
      <Section title="Tools" items={guide.tools} />
      <Section title="Preparation" items={guide.preparation} />
      <Card className="p-5">
        <h3 className="font-bold text-navy">Teaching flow</h3>
        <ol className="mt-3 space-y-3">
          {guide.flow.map((item) => (
            <li key={item.title}>
              <p className="font-semibold">{item.minutes} min · {item.title}</p>
              <p className="mt-1 text-sm leading-6">{item.detail}</p>
            </li>
          ))}
        </ol>
      </Card>
      <Section title="What to explain" items={guide.explain} />
      <Section title="Questions to ask" items={guide.questions} />
      <Card className="p-5"><h3 className="font-bold">Demonstration</h3><p className="mt-2 text-sm leading-6">{guide.demonstration}</p></Card>
      <Card className="p-5"><h3 className="font-bold">Student practice</h3><p className="mt-2 text-sm leading-6">{guide.practice}</p></Card>
      <Section title="Expected outcomes" items={guide.expectedOutcomes} />
      <Card className="p-5">
        <h3 className="font-bold">If a student is stuck</h3>
        <ul className="mt-3 space-y-3 text-sm leading-6">
          {guide.difficulties.map((item) => (
            <li key={item.issue}><span className="font-semibold">{item.issue}</span> {item.help}</li>
          ))}
        </ul>
      </Card>
      <Card className="p-5"><h3 className="font-bold">Follow-up practice</h3><p className="mt-2 text-sm leading-6">{guide.homework}</p></Card>
      <Card className="p-5"><h3 className="font-bold">Assessment</h3><p className="mt-2 text-sm leading-6">{guide.assessment}</p></Card>
      <Card className="p-5"><h3 className="font-bold">Recap</h3><p className="mt-2 text-sm leading-6">{guide.recap}</p></Card>
      <Card className="p-5">
        <h3 className="font-bold">Knowledge-check answers</h3>
        <p className="mt-1 text-sm text-muted">Students do not see this section.</p>
        <ul className="mt-3 space-y-3 text-sm leading-6">
          {guide.knowledgeCheckAnswers.map((item) => (
            <li key={item.id}>
              <p className="font-semibold">{item.id}. {item.answer}</p>
              <p>{item.explanation}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-5">
      <h3 className="font-bold text-navy">{title}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
