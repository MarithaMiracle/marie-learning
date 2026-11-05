import { Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { resourceCategories } from "@/lib/labels";
import { listVisibleResources } from "@/server/student-data";

export const metadata = { title: "Resources" };

export default async function ResourcesPage() {
  const user = await requireUser("student");
  const rows = await listVisibleResources(user);
  return (
    <div>
      <PageHeader
        title="Learning resources"
        description="Official documentation is a reference you can use beside the lessons. It does not replace the guided classes."
      />
      <div className="space-y-6">
        {resourceCategories.map((category) => {
          const items = rows.filter((row) => row.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="font-bold text-navy">{category}</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {items.map((item) => (
                  <Card key={item.id} className="p-4">
                    <a href={item.url} className="font-bold text-primary" target="_blank" rel="noreferrer">{item.title}</a>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
