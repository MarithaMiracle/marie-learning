import { AcceptInviteForm } from "@/components/account-forms";
import { PublicFrame } from "@/components/public-frame";
import { Card } from "@/components/ui";

export const metadata = {
  title: "Accept your invite",
  robots: { index: false, follow: false },
};

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <PublicFrame>
      <div className="mx-auto max-w-md px-4 py-12">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-navy">Create your student account</h1>
          {token ? (
            <>
              <p className="mt-2 text-sm leading-6 text-muted">
                Choose a password to finish setting up your account. You will choose your operating system next.
              </p>
              <div className="mt-6">
                <AcceptInviteForm token={token} />
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm">This page needs an invite link. Ask your instructor to send a new one.</p>
          )}
        </Card>
      </div>
    </PublicFrame>
  );
}
