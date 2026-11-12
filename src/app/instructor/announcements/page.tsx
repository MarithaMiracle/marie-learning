import { AnnouncementForm, DeleteAnnouncementButton } from "@/components/instructor-forms";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { formatWhen } from "@/lib/time";
import { listAnnouncementsAdmin } from "@/server/instructor-data";

export const metadata = { title: "Announcements" };

export default async function InstructorAnnouncementsPage() {
  const user = await requireUser("instructor");
  const rows = await listAnnouncementsAdmin(user);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <div>
        <PageHeader title="Announcements" description="Published announcements are visible to every student." />
        <div className="space-y-3">
          {rows.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold">{item.title}</h2>
                <div className="flex items-center gap-2">
                  <Badge tone={item.published ? "success" : "neutral"}>{item.published ? "Published" : "Draft"}</Badge>
                  <DeleteAnnouncementButton id={item.id} />
                </div>
              </div>
              <p className="mt-1 text-xs text-muted">{formatWhen(item.createdAt, user.timezone)}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{item.body}</p>
              <details className="mt-3 rounded-xl border border-line bg-canvas/40 p-3">
                <summary className="cursor-pointer text-sm font-semibold text-navy">Edit</summary>
                <div className="mt-3">
                  <AnnouncementForm
                    announcement={{
                      id: item.id,
                      title: item.title,
                      body: item.body,
                      published: item.published,
                    }}
                  />
                </div>
              </details>
            </Card>
          ))}
          {rows.length === 0 ? <p className="text-sm text-muted">No announcements yet.</p> : null}
        </div>
      </div>
      <Card className="h-fit p-5">
        <h2 className="mb-3 font-bold">New announcement</h2>
        <AnnouncementForm />
      </Card>
    </div>
  );
}
