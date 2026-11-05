"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "@/components/password-input";
import { Button, Field, TextInput } from "@/components/ui";
import { commonTimeZones } from "@/lib/time";
import { changePasswordAction, forgotPasswordAction, loginAction, registerAction, resetPasswordAction } from "@/server/auth-actions";
import { saveOnboarding, updateStudentSettings } from "@/server/student-actions";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        setError(null);
        const result = await loginAction(values);
        if (result && !result.ok) setError(result.error);
      })}
      noValidate
    >
      <Field label="Email" error={form.formState.errors.email?.message}>
        <TextInput type="email" autoComplete="username" {...form.register("email")} />
      </Field>
      <Field label="Password" error={form.formState.errors.password?.message}>
        <PasswordInput autoComplete="current-password" {...form.register("password")} />
      </Field>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Signing in" : "Log in"}
      </Button>
    </form>
  );
}

const registerSchema = loginSchema.extend({
  fullName: z.string().trim().min(2, "Enter your full name."),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        const result = await registerAction(values);
        if (result && !result.ok) setError(result.error);
      })}
      noValidate
    >
      <Field label="Full name" error={form.formState.errors.fullName?.message}>
        <TextInput autoComplete="name" {...form.register("fullName")} />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <TextInput type="email" autoComplete="email" {...form.register("email")} />
      </Field>
      <Field label="Password" hint="At least 8 characters." error={form.formState.errors.password?.message}>
        <PasswordInput autoComplete="new-password" {...form.register("password")} />
      </Field>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Creating account" : "Create account"}
      </Button>
    </form>
  );
}

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setError(null);
        const result = await forgotPasswordAction(email);
        setPending(false);
        if (!result.ok) setError(result.error);
        else {
          setMessage("If that email belongs to an account, a reset link is ready. It expires in one hour.");
          setLink(result.data?.devLink ?? null);
        }
      }}
    >
      <Field label="Email">
        <TextInput type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
      </Field>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      {message ? <p className="text-sm leading-6 text-slate-700">{message}</p> : null}
      {link ? (
        <p className="text-sm leading-6">
          Local development link: <a className="font-semibold text-primary" href={link}>{link}</a>
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending" : "Send reset link"}
      </Button>
    </form>
  );
}

export function ResetForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        const result = await resetPasswordAction({ token, password });
        setPending(false);
        if (result && !result.ok) setError(result.error);
      }}
    >
      <Field label="New password" hint="At least 8 characters.">
        <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" />
      </Field>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving" : "Save password and sign in"}
      </Button>
    </form>
  );
}

export function PasswordForm() {
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNext] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        const result = await changePasswordAction({ currentPassword, newPassword });
        setPending(false);
        setMessage(result.ok ? "Password updated." : result.error);
        if (result.ok) {
          setCurrent("");
          setNext("");
        }
      }}
    >
      <Field label="Current password">
        <PasswordInput value={currentPassword} onChange={(event) => setCurrent(event.target.value)} autoComplete="current-password" />
      </Field>
      <Field label="New password">
        <PasswordInput value={newPassword} onChange={(event) => setNext(event.target.value)} autoComplete="new-password" />
      </Field>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving" : "Change password"}
      </Button>
    </form>
  );
}

const onboardingSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  preferredName: z.string().trim().max(80),
  country: z.string().trim().min(2, "Enter your country."),
  timezone: z.string().min(1, "Choose a time zone."),
  operatingSystem: z.enum(["windows", "macos", "linux", "unknown"]),
  osVersion: z.string().trim().max(120),
  computerExperience: z.enum(["new", "browse", "install", "comfortable"]),
  codingExperience: z.enum(["never", "videos", "exercises", "some"]),
  learningGoals: z.string().trim().min(10, "Write a sentence or two about what you want to learn."),
  weeklyPractice: z.enum(["lt2", "h2to4", "h5to7", "h8plus"]),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

const steps = [
  ["fullName", "preferredName"],
  ["country", "timezone"],
  ["operatingSystem", "osVersion"],
  ["computerExperience"],
  ["codingExperience"],
  ["learningGoals", "weeklyPractice"],
] as const;

export function OnboardingWizard({
  email,
  defaults,
  mode = "onboarding",
}: {
  email: string;
  defaults: Partial<OnboardingValues>;
  mode?: "onboarding" | "settings";
}) {
  const router = useRouter();
  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: defaults.fullName ?? "",
      preferredName: defaults.preferredName ?? "",
      country: defaults.country ?? "",
      timezone: defaults.timezone ?? "UTC",
      operatingSystem: defaults.operatingSystem ?? "unknown",
      osVersion: defaults.osVersion ?? "",
      computerExperience: defaults.computerExperience ?? "browse",
      codingExperience: defaults.codingExperience ?? "never",
      learningGoals: defaults.learningGoals ?? "",
      weeklyPractice: defaults.weeklyPractice ?? "h2to4",
    },
  });
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const os = form.watch("operatingSystem");

  async function next() {
    const valid = await form.trigger(steps[step]);
    if (valid) setStep((value) => value + 1);
  }

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(async (values) => {
        const result = mode === "settings" ? await updateStudentSettings(values) : await saveOnboarding(values);
        if (!result.ok) {
          setSaved(false);
          setError(result.error);
        } else if (mode === "settings") {
          setError(null);
          setSaved(true);
          router.refresh();
        } else {
          router.push("/student/onboarding?done=1");
        }
      })}
    >
      <p className="text-sm font-semibold text-primary">Step {step + 1} of 6</p>
      {step === 0 ? (
        <>
          <Field label="Full name" error={form.formState.errors.fullName?.message}>
            <TextInput {...form.register("fullName")} />
          </Field>
          <Field label="What should we call you?" hint="This can be a first name or nickname.">
            <TextInput {...form.register("preferredName")} />
          </Field>
          <p className="text-sm text-muted">Your account email is {email}. Ask your instructor if it needs to change.</p>
        </>
      ) : null}
      {step === 1 ? (
        <>
          <Field label="Country" error={form.formState.errors.country?.message}>
            <TextInput {...form.register("country")} placeholder="Nigeria" />
          </Field>
          <Field label="Time zone" error={form.formState.errors.timezone?.message}>
            <select className="w-full rounded-xl border border-line px-3 py-2.5" {...form.register("timezone")}>
              {commonTimeZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </Field>
        </>
      ) : null}
      {step === 2 ? (
        <>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Which operating system does your computer use?</legend>
            {[
              ["windows", "Windows"],
              ["macos", "macOS"],
              ["linux", "Linux"],
              ["unknown", "I am not sure"],
            ].map(([value, label]) => (
              <label key={value} className="mb-2 flex items-center gap-2 text-sm">
                <input type="radio" value={value} {...form.register("operatingSystem")} />
                {label}
              </label>
            ))}
          </fieldset>
          {os === "windows" ? (
            <Field label="Windows version, if you know it" hint="Windows 10 and Windows 11 are both fine.">
              <TextInput {...form.register("osVersion")} placeholder="Windows 11" />
            </Field>
          ) : null}
          {os === "macos" ? (
            <Field label="macOS version, if you know it" hint="You can find this in the Apple menu, then About This Mac.">
              <TextInput {...form.register("osVersion")} placeholder="macOS Sequoia" />
            </Field>
          ) : null}
          {os === "linux" ? (
            <Field label="Linux distribution" hint="For example, Ubuntu.">
              <TextInput {...form.register("osVersion")} placeholder="Ubuntu" />
            </Field>
          ) : null}
          {os === "unknown" ? (
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6">
              <p className="font-bold">How to tell</p>
              <p className="mt-2"><span className="font-semibold">Windows:</span> select Start, then Settings, System, and About. It names Windows 10 or Windows 11.</p>
              <p className="mt-2"><span className="font-semibold">macOS:</span> select the Apple menu, then About This Mac.</p>
              <p className="mt-2"><span className="font-semibold">Linux:</span> open Settings and look for About, or ask someone who set the computer up. Ubuntu is a common choice for development.</p>
            </div>
          ) : null}
        </>
      ) : null}
      {step === 3 ? (
        <Choice
          legend="How comfortable are you using a computer?"
          name="computerExperience"
          register={form.register}
          options={[
            ["new", "I am completely new"],
            ["browse", "I can browse the internet and type"],
            ["install", "I can install applications and manage files"],
            ["comfortable", "I am comfortable using a computer"],
          ]}
        />
      ) : null}
      {step === 4 ? (
        <Choice
          legend="Have you written code before?"
          name="codingExperience"
          register={form.register}
          options={[
            ["never", "No, never"],
            ["videos", "I have watched coding videos"],
            ["exercises", "I have tried a few coding exercises"],
            ["some", "I have some experience"],
          ]}
        />
      ) : null}
      {step === 5 ? (
        <>
          <Field label="What do you want to be able to do by the end of the programme?" error={form.formState.errors.learningGoals?.message}>
            <textarea className="min-h-28 w-full rounded-xl border border-line px-3 py-2.5" {...form.register("learningGoals")} />
          </Field>
          <Choice
            legend="How much time can you practise outside our live classes?"
            name="weeklyPractice"
            register={form.register}
            options={[
              ["lt2", "Less than 2 hours weekly"],
              ["h2to4", "2–4 hours weekly"],
              ["h5to7", "5–7 hours weekly"],
              ["h8plus", "8 hours or more weekly"],
            ]}
          />
        </>
      ) : null}
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      {saved ? <p className="text-sm font-medium text-success">Profile saved.</p> : null}
      <div className="flex gap-3">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={() => setStep((value) => value - 1)}>
            Back
          </Button>
        ) : null}
        {step < 5 ? (
          <Button type="button" onClick={() => void next()}>
            Continue
          </Button>
        ) : (
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving" : mode === "settings" ? "Save profile" : "Finish onboarding"}
          </Button>
        )}
      </div>
    </form>
  );
}

function Choice({
  legend,
  name,
  options,
  register,
}: {
  legend: string;
  name: "computerExperience" | "codingExperience" | "weeklyPractice";
  options: [string, string][];
  register: ReturnType<typeof useForm<OnboardingValues>>["register"];
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      {options.map(([value, label]) => (
        <label key={value} className="flex items-center gap-2 text-sm">
          <input type="radio" value={value} {...register(name)} />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
