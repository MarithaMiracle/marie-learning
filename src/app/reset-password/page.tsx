import { ResetForm } from "@/components/account-forms";
import { PublicFrame } from "@/components/public-frame";
import { Card } from "@/components/ui";

export const metadata = { title: "Choose a new password" };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <PublicFrame>
      <div className="mx-auto max-w-md px-4 py-12">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-navy">Choose a new password</h1>
          {token ? (
            <div className="mt-6">
              <ResetForm token={token} />
            </div>
          ) : (
            <p className="mt-3 text-sm">This page needs a reset link. Ask your instructor if the link is missing.</p>
          )}
        </Card>
      </div>
    </PublicFrame>
  );
}
