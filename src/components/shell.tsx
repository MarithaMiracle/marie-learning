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
  Mail,
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
  messages: Mail,
};

export function AppShell({
  name,
  role,
  email,
  items,
  noticeCount = 0,
  children,
  hero,
}: {
  name: string;
  role: "instructor" | "student";
  email: string;
  items: { href: string; label: string; icon: string }[];
  noticeCount?: number;
  children: React.ReactNode;
  hero?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isStudent = role === "student";
  void email;

  const nav = (
    <nav className="flex flex-col gap-1.5" aria-label="Main">
      {items.map((item) => {
        const Icon = icons[item.icon] ?? BookOpen;
        const active =
          pathname === item.href ||
          (item.href !== "/student/dashboard" &&
            item.href !== "/instructor/dashboard" &&
            pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-bold transition-all",
              active ? "bg-primary/10 text-navy shadow-sm" : "text-navy/70 hover:bg-slate-100 hover:text-navy",
            )}
          >
            <Icon className={cn("h-4.5 w-4.5", active ? "text-primary" : "text-navy/45")} aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="no-print sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-xl p-2 text-navy hover:bg-slate-100 lg:hidden"
              aria-expanded={open}
              aria-controls="app-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Menu</span>
            </button>
            <Link
              href={role === "instructor" ? "/instructor/dashboard" : "/student/dashboard"}
              className="flex items-center gap-2 text-navy"
            >
              <Mark className="h-9 w-9" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight">Marie</span>
                <span className="text-[13px] font-medium text-muted">Learning</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isStudent ? (
              <Link
                href="/student/notifications"
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                  noticeCount > 0 ? "bg-primary/10 text-navy" : "text-muted hover:bg-slate-100 hover:text-navy",
                )}
                aria-label={noticeCount > 0 ? `${noticeCount} new notifications` : "Notifications"}
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
                {noticeCount > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-navy ring-2 ring-white">
                    {noticeCount}
                  </span>
                ) : null}
              </Link>
            ) : null}

            <div className="hidden items-center gap-3 border-l border-line pl-4 sm:flex">
              <div className="text-right">
                <p className="text-sm font-bold text-navy leading-tight">{name}</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted/80">
                  {role === "instructor" ? "Instructor" : "Student"}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-white uppercase tracking-tighter ring-2 ring-primary/20">
                {name.substring(0, 2)}
              </div>
            </div>

            <form action={logoutAction} className="border-l border-line pl-2">
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-red-50 hover:text-danger transition-colors"
                title="Log out"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Log out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {hero ? <div className="no-print relative z-10">{hero}</div> : null}

      <div className={cn("mx-auto grid max-w-[1600px] gap-8 px-4 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)]", hero ? "py-8" : "py-8")}>
        <aside
          id="app-nav"
          className={cn(
            "no-print lg:sticky lg:top-28 lg:block lg:self-start",
            open ? "fixed inset-0 top-20 z-50 bg-white p-4" : "hidden",
          )}
        >
          <div className="rounded-[2rem] border border-line bg-white p-4 shadow-[0_14px_28px_rgba(16,38,75,0.06)] lg:max-h-[calc(100vh-8.5rem)] lg:overflow-y-auto">
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
  { href: "/instructor/messages", label: "Messages", icon: "messages" },
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
