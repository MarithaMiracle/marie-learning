import { NotificationItem } from "@/components/notification-item";
import { Card, EmptyState, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { formatWhen } from "@/lib/time";
import { listStudentNotifications } from "@/server/student-data";
import { markNotificationsRead } from "@/server/student-actions";

export const metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const user = await requireUser("student");
  const rows = await listStudentNotifications(user);
  const unread = rows.filter((item) => !item.readAt).length;

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Assignment reviews, quiz results, class changes, and announcements land here."
        action={
          unread > 0 ? (
            <form action={markNotificationsRead}>
              <button type="submit" className="text-sm font-semibold text-primary">
                Mark all as read
              </button>
            </form>
          ) : null
        }
      />
      {rows.length === 0 ? (
        <EmptyState title="No notifications yet" body="When your instructor reviews work, schedules a class, or posts an announcement, it will appear here." />
      ) : (
        <div className="space-y-3">
          {unread > 0 ? (
            <Card className="p-4 text-sm text-muted">
              You have {unread} unread {unread === 1 ? "update" : "updates"}.
            </Card>
          ) : null}
          {rows.map((item) => (
            <NotificationItem
              key={item.id}
              id={item.id}
              href={item.href}
              title={item.title}
              body={item.body}
              when={formatWhen(item.createdAt, user.timezone)}
              unread={!item.readAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
