"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, SelectInput, TextArea, TextInput } from "@/components/ui";
import type { ProjectGuide } from "@/lib/content-types";
import { saveAssignment } from "@/server/instructor-actions";

type RubricRow = { criterion: string; points: number; description: string };

type EditorAssignment = {
  id?: string;
  moduleId: string;
  title: string;
  summary: string;
  instructions: string;
  objectives: string[];
  requirements: string[];
  deliverables: string[];
  rubric: RubricRow[];
  published: boolean;
  solution: string;
  projectGuide: ProjectGuide | null;
};

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function AssignmentEditor({
  assignment,
  modules,
}: {
  assignment: EditorAssignment;
  modules: { id: string; title: string }[];
}) {
  const router = useRouter();
  const [state, setState] = useState(assignment);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function updateRubric(index: number, patch: Partial<RubricRow>) {
    setState((current) => ({
      ...current,
      rubric: current.rubric.map((row, rowIndex) => (rowIndex === index ? { ...row, ...patch } : row)),
    }));
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        start(async () => {
          const result = await saveAssignment({
            id: state.id,
            moduleId: String(form.get("moduleId") ?? state.moduleId),
            title: String(form.get("title") ?? ""),
            summary: String(form.get("summary") ?? ""),
            instructions: String(form.get("instructions") ?? ""),
            objectives: lines(String(form.get("objectives") ?? "")),
            requirements: lines(String(form.get("requirements") ?? "")),
            deliverables: lines(String(form.get("deliverables") ?? "")),
            rubric: state.rubric,
            published: form.get("published") === "on",
            solution: String(form.get("solution") ?? ""),
            projectGuide: state.projectGuide,
          });
          if (!result.ok) {
            setMessage(result.error);
            return;
          }
          setMessage("Assignment saved. Students do not see the instructor solution.");
          if (!state.id && result.data?.id) router.push(`/instructor/assignments/${result.data.id}`);
          else router.refresh();
        });
      }}
    >
      <Field label="Module">
        <SelectInput name="moduleId" defaultValue={state.moduleId} required>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>{module.title}</option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Title"><TextInput name="title" defaultValue={state.title} required /></Field>
      <Field label="Short summary"><TextArea name="summary" defaultValue={state.summary} rows={3} required /></Field>
      <Field label="Instructions"><TextArea name="instructions" defaultValue={state.instructions} rows={8} required /></Field>
      <Field label="Objectives" hint="One objective on each line.">
        <TextArea name="objectives" defaultValue={state.objectives.join("\n")} rows={4} />
      </Field>
      <Field label="Requirements" hint="One requirement on each line.">
        <TextArea name="requirements" defaultValue={state.requirements.join("\n")} rows={4} />
      </Field>
      <Field label="What the student submits" hint="One deliverable on each line.">
        <TextArea name="deliverables" defaultValue={state.deliverables.join("\n")} rows={3} />
      </Field>
      <fieldset className="space-y-3 rounded-2xl border border-line p-4">
        <legend className="px-1 text-sm font-semibold">Rubric</legend>
        {state.rubric.map((row, index) => (
          <div key={index} className="grid gap-2 md:grid-cols-[1fr_6rem]">
            <TextInput value={row.criterion} onChange={(event) => updateRubric(index, { criterion: event.target.value })} aria-label={`Criterion ${index + 1}`} />
            <TextInput type="number" min={0} value={row.points} onChange={(event) => updateRubric(index, { points: Number(event.target.value) })} aria-label={`Points ${index + 1}`} />
            <div className="md:col-span-2">
              <TextArea value={row.description} onChange={(event) => updateRubric(index, { description: event.target.value })} rows={2} aria-label={`Description ${index + 1}`} />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => setState((current) => ({ ...current, rubric: [...current.rubric, { criterion: "", points: 0, description: "" }] }))}
        >
          Add rubric row
        </Button>
      </fieldset>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" name="published" defaultChecked={state.published} />
        Published for students
      </label>
      <Field label="Instructor solution" hint="Students cannot read this.">
        <TextArea name="solution" defaultValue={state.solution} rows={10} />
      </Field>
      {message ? <p className="text-sm font-medium text-navy">{message}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving" : "Save assignment"}</Button>
    </form>
  );
}
