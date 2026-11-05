"use client";

import Link from "next/link";
import { Mark } from "@/components/marketing/logo";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Library,
  LogOut,
  Menu,
  Megaphone,
  Settings,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { logoutAction } from "@/server/auth-actions";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  learn: BookOpen,
  assignments: FileText,
  quizzes: ClipboardCheck,
  progress: GraduationCap,
  schedule: Calendar,
  resources: Library,
  announcements: Megaphone,
  notifications: Bell,
  profile: UserRound,
  settings: Settings,
  students: Users,
  curriculum: BookOpen,
};

export function AppShell({
  name,
  role,
  email,
  items,
  noticeCount = 0,
  children,
}: {
  name: string;
  role: "instructor" | "student";
  email: string;
  items: { href: string; label: string; icon: string }[];
  noticeCount?: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {items.map((item) => {
        const Icon = icons[item.icon] ?? BookOpen;
        const active = pathname === item.href || (item.href !== "/student/dashboard" && item.href !== "/instructor/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold",
              active ? "bg-primary/10 text-navy" : "text-navy/80 hover:bg-canvas",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <header className="no-print sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-ink hover:bg-slate-100 lg:hidden"
              aria-expanded={open}
              aria-controls="app-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </button>
            <Link href={role === "instructor" ? "/instructor/dashboard" : "/student/dashboard"} className="flex items-center gap-2 text-navy">
              <Mark className="h-8 w-8" />
              <span className="text-[15px] leading-none tracking-[-0.03em]">
                <span className="font-bold">Marie</span>
                <span className="font-normal"> Learning</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {role === "student" ? (
              <Link
                href="/student/notifications"
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold",
                  noticeCount > 0 ? "bg-primary/10 text-navy" : "text-muted hover:bg-canvas hover:text-navy",
                )}
                aria-label={noticeCount > 0 ? `${noticeCount} new notifications` : "Notifications"}
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                {noticeCount > 0 ? <span>{noticeCount} new</span> : <span className="hidden sm:inline">Updates</span>}
              </Link>
            ) : null}
            <div className="hidden text-right sm:block">
              <p className="font-semibold text-ink">{name}</p>
              <p className="text-xs text-muted">{role === "instructor" ? "Instructor" : email}</p>
            </div>
            <form action={logoutAction}>
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-semibold text-slate-700 hover:bg-slate-100">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside
          id="app-nav"
          className={cn(
            "no-print lg:sticky lg:top-20 lg:block lg:self-start",
            open ? "block" : "hidden",
          )}
        >
          <div className="rounded-2xl border border-line bg-white p-3 shadow-sm lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto">
            {nav}
          </div>
        </aside>
        <main id="main" className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export const studentNav = [
  { href: "/student/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/student/learning", label: "Learn", icon: "learn" },
  { href: "/student/assignments", label: "Assignments", icon: "assignments" },
  { href: "/student/quizzes", label: "Quizzes", icon: "quizzes" },
  { href: "/student/progress", label: "Progress", icon: "progress" },
  { href: "/student/schedule", label: "Schedule", icon: "schedule" },
  { href: "/student/resources", label: "Resources", icon: "resources" },
  { href: "/student/announcements", label: "Announcements", icon: "announcements" },
  { href: "/student/notifications", label: "Notifications", icon: "notifications" },
  { href: "/student/profile", label: "Profile", icon: "profile" },
  { href: "/student/settings", label: "Settings", icon: "settings" },
];

export const instructorNav = [
  { href: "/instructor/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/instructor/students", label: "Students", icon: "students" },
  { href: "/instructor/curriculum", label: "Curriculum", icon: "curriculum" },
  { href: "/instructor/modules", label: "Modules", icon: "learn" },
  { href: "/instructor/lessons", label: "Lessons", icon: "assignments" },
  { href: "/instructor/assignments", label: "Assignments", icon: "assignments" },
  { href: "/instructor/submissions", label: "Submissions", icon: "quizzes" },
  { href: "/instructor/quizzes", label: "Quizzes", icon: "quizzes" },
  { href: "/instructor/schedule", label: "Schedule", icon: "schedule" },
  { href: "/instructor/announcements", label: "Announcements", icon: "announcements" },
  { href: "/instructor/resources", label: "Resources", icon: "resources" },
  { href: "/instructor/settings", label: "Settings", icon: "settings" },
];
