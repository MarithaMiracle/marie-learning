import Link from "next/link";
import { RegisterForm } from "@/components/account-forms";
import { PublicFrame, registrationIsOpen } from "@/components/public-frame";
import { Card } from "@/components/ui";

export const metadata = { title: "Create a student account" };

export default function RegisterPage() {
  const open = registrationIsOpen();
  return (
    <PublicFrame>
      <div className="mx-auto max-w-md px-4 py-12">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-navy">Create a student account</h1>
          {open ? (
            <>
              <p className="mt-2 text-sm leading-6 text-muted">
                Registration creates a student account and enrols you on the programme. You will choose your operating system next.
              </p>
              <div className="mt-6">
                <RegisterForm />
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm leading-6">
              Open registration is turned off. Ask your instructor to create your account, then <Link href="/login" className="font-semibold text-primary">log in</Link>.
            </p>
          )}
        </Card>
      </div>
    </PublicFrame>
  );
}
