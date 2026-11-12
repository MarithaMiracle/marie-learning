import { redirect } from "next/navigation";

export const metadata = { title: "Schedule" };

/** Live meetings are paused for now — keep the route but send instructors back to the dashboard. */
export default function InstructorSchedulePage() {
  redirect("/instructor/dashboard");
}
