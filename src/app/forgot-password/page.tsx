import { ForgotForm } from "@/components/account-forms";
import { PublicFrame } from "@/components/public-frame";
import { Card } from "@/components/ui";

export const metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <PublicFrame>
      <div className="mx-auto max-w-md px-4 py-12">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-navy">Forgot password</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            If email delivery is not set up, your instructor can set a new password from your student profile.
          </p>
          <div className="mt-6">
            <ForgotForm />
          </div>
        </Card>
      </div>
    </PublicFrame>
  );
}
