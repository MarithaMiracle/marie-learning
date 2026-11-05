const known = [
  "Use at least 8 characters",
  "Enter your full name",
  "Enter a valid email address",
  "An account with this email already exists",
  "The programme is not ready yet",
  "Current password is incorrect",
  "This reset link is invalid or has expired",
  "This invite link is invalid or has expired",
  "Sign in as a student to take this quiz",
  "This quiz is not available",
  "This lesson is not available",
  "This assignment is not available",
  "Available after you finish the previous lesson.",
  "Available after you finish this week's lessons.",
  "You are not enrolled in this programme",
  "Retakes are turned off for this quiz",
  "This submission has been accepted",
  "Files must be 2 MB or smaller",
  "Only an instructor can create this account",
  "Only an instructor can invite a student",
  "Account not found",
  "Submit your answers as a list",
];

export function dbErrorMessage(error: unknown, fallback = "Something went wrong. Please try again.") {
  const message = readMessage(error);
  const match = known.find((item) => message.includes(item));
  if (match) return match;
  if (/duplicate key|unique constraint/i.test(message)) {
    return "That value is already in use. Try a different one.";
  }
  console.error(error);
  return fallback;
}

function readMessage(error: unknown): string {
  if (error instanceof Error) {
    const cause = error.cause instanceof Error ? error.cause.message : "";
    return `${error.message} ${cause}`;
  }
  return "";
}

export type ActionResult<T = undefined> = { ok: true; data?: T } | { ok: false; error: string };
