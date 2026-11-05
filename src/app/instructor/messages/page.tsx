import { ContactMessageRow } from "@/components/instructor-forms";
import { Badge, EmptyState, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { listContactMessages } from "@/server/instructor-data";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  const user = await requireUser("instructor");
  const messages = await listContactMessages(user);
  const unhandled = messages.filter((item) => !item.handled).length;
  return (
    <div>
      <PageHeader
        title="Messages"
        description="Questions sent from the Contact Us page on the public site."
        action={
          messages.length > 0 ? (
            <Badge tone={unhandled > 0 ? "warning" : "success"}>
              {unhandled > 0 ? `${unhandled} to review` : "All handled"}
            </Badge>
          ) : undefined
        }
      />
      {messages.length === 0 ? (
        <EmptyState
          title="No messages yet"
          body="When someone sends a message from the Contact Us page, it will appear here."
        />
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <ContactMessageRow
              key={message.id}
              id={message.id}
              name={message.name}
              email={message.email}
              message={message.message}
              handled={message.handled}
              created={message.createdAt.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
