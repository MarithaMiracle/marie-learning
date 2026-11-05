import Link from "next/link";
import { LoginForm } from "@/components/account-forms";
import { PublicFrame, registrationIsOpen } from "@/components/public-frame";
import { Card } from "@/components/ui";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  const registrationOpen = registrationIsOpen();
  return (
    <PublicFrame>
      <div className="mx-auto max-w-md px-4 py-12">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-navy">Log in</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Use the email and password for your student or instructor account.</p>
          <div className="mt-6">
            <LoginForm />
          </div>
          <p className="mt-4 text-sm">
            <Link href="/forgot-password" className="font-semibold text-primary">
              Forgot your password?
            </Link>
          </p>
          {registrationOpen ? (
            <p className="mt-2 text-sm text-muted">
              New student? <Link href="/register" className="font-semibold text-primary">Create an account</Link>
            </p>
          ) : (
            <p className="mt-2 text-sm leading-6 text-muted">
              New students receive an account from the instructor.
            </p>
          )}
        </Card>
      </div>
    </PublicFrame>
  );
}
