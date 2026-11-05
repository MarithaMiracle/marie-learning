import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { withActor } from "@/lib/db/client";
import { submissions } from "@/lib/db/schema";
import { isUuid } from "@/lib/ids";

export async function GET(_request: Request, context: { params: Promise<{ submissionId: string }> }) {
  const user = await getCurrentUser();
  if (!user) return new Response("Sign in required", { status: 401 });
  const { submissionId } = await context.params;
  if (!isUuid(submissionId)) return new Response("File not found", { status: 404 });
  const row = await withActor(user, async (tx) => {
    const [found] = await tx
      .select({
        fileName: submissions.fileName,
        fileMime: submissions.fileMime,
        fileData: submissions.fileData,
      })
      .from(submissions)
      .where(eq(submissions.id, submissionId))
      .limit(1);
    return found ?? null;
  });
  if (!row?.fileData) return new Response("File not found", { status: 404 });
  const filename = (row.fileName || "submission").replaceAll('"', "");
  return new Response(new Uint8Array(row.fileData), {
    headers: {
      "Content-Type": row.fileMime || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
