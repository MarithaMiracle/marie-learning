import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { withActor } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { SESSION_COOKIE, sessionCookieOptions, signSession, verifySession, type SessionPayload } from "@/lib/session";

export type CurrentUser = {
  id: string;
  email: string;
  role: "instructor" | "student";
  fullName: string;
  preferredName: string | null;
  timezone: string;
  isActive: boolean;
  onboardingCompleted: boolean;
};

export function displayName(user: Pick<CurrentUser, "fullName" | "preferredName">) {
  return user.preferredName?.trim() || user.fullName;
}

export async function readSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSession(user: {
  id: string;
  role: "instructor" | "student";
  email: string;
  fullName: string;
  preferredName: string | null;
}) {
  const token = await signSession({
    sub: user.id,
    role: user.role,
    email: user.email,
    name: user.preferredName?.trim() || user.fullName,
  });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, sessionCookieOptions);
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await readSession();
  if (!session) return null;
  const user = await withActor({ id: session.sub, role: session.role }, async (tx) => {
    const [row] = await tx
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
        fullName: users.fullName,
        preferredName: users.preferredName,
        timezone: users.timezone,
        isActive: users.isActive,
        onboardingCompleted: users.onboardingCompleted,
      })
      .from(users)
      .where(eq(users.id, session.sub))
      .limit(1);
    return row ?? null;
  });
  if (!user?.isActive) return null;
  return user;
}

export async function requireUser(role?: "instructor" | "student") {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (role && user.role !== role) {
    redirect(user.role === "instructor" ? "/instructor/dashboard" : "/student/dashboard");
  }
  return user;
}

export function homeFor(role: "instructor" | "student") {
  return role === "instructor" ? "/instructor/dashboard" : "/student/dashboard";
}
