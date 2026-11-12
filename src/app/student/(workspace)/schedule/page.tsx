import { redirect } from "next/navigation";

export const metadata = { title: "Schedule" };

/** Live meetings are paused for now — keep the route but send students back to the dashboard. */
export default function SchedulePage() {
  redirect("/student/dashboard");
}
