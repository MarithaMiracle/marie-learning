import { DeleteResourceButton, ResourceForm } from "@/components/instructor-forms";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { resourceCategories } from "@/lib/labels";
import { listResourcesAdmin } from "@/server/instructor-data";

export const metadata = { title: "Resources" };

export default async function InstructorResourcesPage() {
  const user = await requireUser("instructor");
  const rows = await listResourcesAdmin(user);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <div>
        <PageHeader title="Resources" description="Official references sit beside the lessons. They are not a replacement for them." />
        <div className="space-y-3">
          {rows.map((item) => (
            <Card key={item.id} className="p-4 text-sm">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-muted">{item.category}</p>
                  <a className="font-bold text-primary" href={item.url}>
                    {item.title}
                  </a>
                  <p className="mt-1 leading-6">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={item.published ? "success" : "neutral"}>{item.published ? "Visible" : "Hidden"}</Badge>
                  <DeleteResourceButton id={item.id} />
                </div>
              </div>
              <details className="mt-3 rounded-xl border border-line bg-canvas/40 p-3">
                <summary className="cursor-pointer text-sm font-semibold text-navy">Edit</summary>
                <div className="mt-3">
                  <ResourceForm
                    categories={[...resourceCategories]}
                    resource={{
                      id: item.id,
                      category: item.category,
                      title: item.title,
                      url: item.url,
                      description: item.description,
                      published: item.published,
                    }}
                  />
                </div>
              </details>
            </Card>
          ))}
          {rows.length === 0 ? <p className="text-sm text-muted">No resources yet.</p> : null}
        </div>
      </div>
      <Card className="h-fit p-5">
        <h2 className="mb-3 font-bold">Add a resource</h2>
        <ResourceForm categories={[...resourceCategories]} />
      </Card>
    </div>
  );
}
