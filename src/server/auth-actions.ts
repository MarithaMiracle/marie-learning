"use server";

import { redirect } from "next/navigation";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { clearSession, homeFor, requireUser, setSession } from "@/lib/auth";
import { firstRow, withActor } from "@/lib/db/client";
import { dbErrorMessage, type ActionResult } from "@/lib/errors";

const credentials = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
});

type AccountRow = {
  id: string;
  email: string;
  role: "instructor" | "student";
  full_name: string;
  preferred_name: string | null;
  timezone: string;
  onboarding_completed: boolean;
};

function mapAccount(row: AccountRow) {
  return {
    id: row.id,
    role: row.role,
    email: row.email,
    fullName: row.full_name,
    preferredName: row.preferred_name,
  };
}

export async function loginAction(input: { email: string; password: string }): Promise<ActionResult> {
  const parsed = credentials.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Check your details." };
  let destination = "/login";
  try {
    const row = await withActor(null, async (tx) => {
      const result = await tx.execute(sql`select * from login_user(${parsed.data.email}, ${parsed.data.password})`);
      return firstRow<AccountRow>(result);
    });
    if (!row) return { ok: false, error: "Those details do not match an active account." };
    await setSession(mapAccount(row));
    destination = row.role === "student" && !row.onboarding_completed ? "/student/onboarding" : homeFor(row.role);
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
  redirect(destination);
}

export async function registerAction(input: { fullName: string; email: string; password: string }): Promise<ActionResult> {
  if (process.env.ALLOW_STUDENT_REGISTRATION !== "true") {
    return { ok: false, error: "Student registration is turned off. Ask your instructor to create your account." };
  }
  const parsed = credentials
    .extend({ fullName: z.string().trim().min(2, "Enter your full name.").max(120) })
    .safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Check your details." };
  let destination = "/student/onboarding";
  try {
    const row = await withActor(null, async (tx) => {
      const result = await tx.execute(
        sql`select * from register_student(${parsed.data.email}, ${parsed.data.password}, ${parsed.data.fullName})`,
      );
      return firstRow<AccountRow>(result);
    });
    if (!row) return { ok: false, error: "The account could not be created." };
    await setSession(mapAccount(row));
    destination = "/student/onboarding";
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
  redirect(destination);
}

export async function acceptInviteAction(input: { token: string; fullName: string; password: string }): Promise<ActionResult> {
  const parsed = z
    .object({
      token: z.string().min(20),
      fullName: z.string().trim().min(2, "Enter your full name.").max(120),
      password: z.string().min(8, "Use at least 8 characters."),
    })
    .safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Check your details." };
  try {
    const row = await withActor(null, async (tx) => {
      const result = await tx.execute(
        sql`select * from accept_user_invite(${parsed.data.token}, ${parsed.data.fullName}, ${parsed.data.password})`,
      );
      return firstRow<AccountRow>(result);
    });
    if (!row) return { ok: false, error: "This invite link is invalid or has expired." };
    await setSession(mapAccount(row));
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error, "This invite link is invalid or has expired.") };
  }
  redirect("/student/onboarding");
}

export async function forgotPasswordAction(email: string): Promise<ActionResult<{ devLink?: string }>> {
  const parsed = z.string().trim().email().safeParse(email);
  if (!parsed.success) return { ok: false, error: "Enter the email address on your account." };
  try {
    const token = await withActor(null, async (tx) => {
      const result = await tx.execute(sql`select request_password_reset(${parsed.data}) as token`);
      return firstRow<{ token: string }>(result)?.token ?? "";
    });
    if (token && process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
      const link = `${process.env.APP_URL ?? "http://localhost:3000"}/reset-password?token=${token}`;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM,
          to: parsed.data,
          subject: "Reset your Marie Learning password",
          text: `Open this link within one hour to choose a new password:\n${link}\n\nIf you did not ask for this, you can ignore the email.`,
        }),
      });
    }
    const devLink =
      token && process.env.NODE_ENV !== "production"
        ? `${process.env.APP_URL ?? "http://localhost:3000"}/reset-password?token=${token}`
        : undefined;
    return { ok: true, data: { devLink } };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}

export async function resetPasswordAction(input: { token: string; password: string }): Promise<ActionResult> {
  const parsed = z
    .object({ token: z.string().min(20), password: z.string().min(8, "Use at least 8 characters.") })
    .safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Check your new password." };
  let destination = "/login";
  try {
    const row = await withActor(null, async (tx) => {
      const result = await tx.execute(sql`select * from reset_password(${parsed.data.token}, ${parsed.data.password})`);
      return firstRow<AccountRow>(result);
    });
    if (!row) return { ok: false, error: "This reset link is invalid or has expired." };
    await setSession(mapAccount(row));
    destination = row.role === "student" && !row.onboarding_completed ? "/student/onboarding" : homeFor(row.role);
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error, "This reset link is invalid or has expired.") };
  }
  redirect(destination);
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function changePasswordAction(input: { currentPassword: string; newPassword: string }): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = z
    .object({
      currentPassword: z.string().min(1, "Enter your current password."),
      newPassword: z.string().min(8, "Use at least 8 characters."),
    })
    .safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Check the passwords." };
  try {
    await withActor(user, async (tx) => {
      await tx.execute(sql`select change_password(${user.id}::uuid, ${parsed.data.currentPassword}, ${parsed.data.newPassword})`);
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: dbErrorMessage(error) };
  }
}
