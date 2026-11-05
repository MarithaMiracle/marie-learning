"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "@/components/password-input";
import { Button, Field, SelectInput, TextArea, TextInput } from "@/components/ui";
import { commonTimeZones } from "@/lib/time";
import { acceptInviteAction, changePasswordAction, forgotPasswordAction, loginAction, registerAction, resetPasswordAction } from "@/server/auth-actions";
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
      className="space-y-6"
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
      <button
        type="submit"
        className="flex h-14 w-full items-center justify-center rounded-full bg-navy text-base font-bold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Signing in" : "Log in"}
      </button>
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
      className="space-y-6"
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
      <button
        type="submit"
        className="flex h-14 w-full items-center justify-center rounded-full bg-navy text-base font-bold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Creating account" : "Create account"}
      </button>
    </form>
  );
}

const inviteSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  password: z.string().min(8, "Use at least 8 characters."),
});

export function AcceptInviteForm({ token }: { token: string }) {
  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { fullName: "", password: "" },
  });
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className="space-y-6"
      onSubmit={form.handleSubmit(async (values) => {
        const result = await acceptInviteAction({ token, ...values });
        if (result && !result.ok) setError(result.error);
      })}
      noValidate
    >
      <Field label="Full name" error={form.formState.errors.fullName?.message}>
        <TextInput autoComplete="name" {...form.register("fullName")} />
      </Field>
      <Field label="Password" hint="At least 8 characters." error={form.formState.errors.password?.message}>
        <PasswordInput autoComplete="new-password" {...form.register("password")} />
      </Field>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      <button
        type="submit"
        className="flex h-14 w-full items-center justify-center rounded-full bg-navy text-base font-bold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Creating account" : "Create account"}
      </button>
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
      className="space-y-6"
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
        <TextInput
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
      </Field>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      {message ? <p className="text-sm leading-relaxed text-slate-700">{message}</p> : null}
      {link ? (
        <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed">
          <p className="font-bold text-navy">Local development link:</p>
          <a className="mt-1 block break-all font-semibold text-primary" href={link}>
            {link}
          </a>
        </div>
      ) : null}
      <button
        type="submit"
        className="flex h-14 w-full items-center justify-center rounded-full bg-navy text-base font-bold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Sending" : "Send reset link"}
      </button>
    </form>
  );
}

export function ResetForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  return (
    <form
      className="space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        const result = await resetPasswordAction({ token, password });
        setPending(false);
        if (result && !result.ok) setError(result.error);
      }}
    >
      <Field label="New password" hint="At least 8 characters.">
        <PasswordInput
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
        />
      </Field>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      <button
        type="submit"
        className="flex h-14 w-full items-center justify-center rounded-full bg-navy text-base font-bold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Saving" : "Save password and sign in"}
      </button>
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
      className="space-y-6"
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
        <PasswordInput
          value={currentPassword}
          onChange={(event) => setCurrent(event.target.value)}
          autoComplete="current-password"
        />
      </Field>
      <Field label="New password">
        <PasswordInput
          value={newPassword}
          onChange={(event) => setNext(event.target.value)}
          autoComplete="new-password"
        />
      </Field>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-full bg-navy text-sm font-bold text-white transition-all hover:bg-navy/90 active:scale-[0.98] disabled:opacity-50 sm:w-auto sm:px-8"
        disabled={pending}
      >
        {pending ? "Saving" : "Change password"}
      </button>
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
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-2 flex-1 gap-1.5 overflow-hidden rounded-full bg-slate-100">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 transition-colors duration-500 ${i <= step ? "bg-primary" : "bg-transparent"}`}
            />
          ))}
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-muted">Step {step + 1} of 6</span>
      </div>

      {step === 0 ? (
        <div className="space-y-6">
          <Field label="Full name" error={form.formState.errors.fullName?.message}>
            <TextInput autoComplete="name" {...form.register("fullName")} />
          </Field>
          <Field label="What should we call you?" hint="This can be a first name or nickname.">
            <TextInput autoComplete="nickname" {...form.register("preferredName")} />
          </Field>
          <Field label="Account email" hint="Ask your instructor if this needs to change.">
            <TextInput
              type="email"
              value={email}
              disabled
              className="border-dashed bg-slate-50/50 text-navy/50 opacity-80"
            />
          </Field>
        </div>
      ) : null}
      {step === 1 ? (
        <div className="space-y-6">
          <Field label="Country" error={form.formState.errors.country?.message}>
            <TextInput {...form.register("country")} placeholder="Nigeria" />
          </Field>
          <Field label="Time zone" error={form.formState.errors.timezone?.message}>
            <SelectInput {...form.register("timezone")}>
              {commonTimeZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
      ) : null}
      {step === 2 ? (
        <div className="space-y-6">
          <Choice
            legend="Which operating system does your computer use?"
            name="operatingSystem"
            register={form.register}
            options={[
              ["windows", "Windows"],
              ["macos", "macOS"],
              ["linux", "Linux"],
              ["unknown", "I am not sure"],
            ]}
          />
          {os !== "unknown" ? (
            <Field
              label={
                os === "windows"
                  ? "Windows version, if you know it"
                  : os === "macos"
                  ? "macOS version, if you know it"
                  : "Linux distribution"
              }
              hint={
                os === "windows"
                  ? "Windows 10 and Windows 11 are both fine."
                  : os === "macos"
                  ? "You can find this in the Apple menu, then About This Mac."
                  : "For example, Ubuntu."
              }
            >
              <TextInput
                {...form.register("osVersion")}
                placeholder={os === "windows" ? "Windows 11" : os === "macos" ? "macOS Sequoia" : "Ubuntu"}
              />
            </Field>
          ) : os === "unknown" ? (
            <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-6">
              <p className="font-bold text-navy">How to tell</p>
              <p className="mt-2"><span className="font-semibold text-navy">Windows:</span> select Start, then Settings, System, and About. It names Windows 10 or Windows 11.</p>
              <p className="mt-2"><span className="font-semibold text-navy">macOS:</span> select the Apple menu, then About This Mac.</p>
              <p className="mt-2"><span className="font-semibold text-navy">Linux:</span> open Settings and look for About, or ask someone who set the computer up. Ubuntu is a common choice.</p>
            </div>
          ) : null}
        </div>
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
        <div className="space-y-6">
          <Field label="What do you want to be able to do by the end of the programme?" error={form.formState.errors.learningGoals?.message}>
            <TextArea
              {...form.register("learningGoals")}
              placeholder="e.g. I want to build a personal project and understand how web apps work..."
            />
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
        </div>
      ) : null}
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      {saved ? <p className="text-sm font-medium text-success">Profile saved.</p> : null}
      <div className="mt-12 flex items-center justify-between border-t border-line pt-10">
        <div>
          {step > 0 ? (
            <button
              type="button"
              className="flex h-14 items-center justify-center rounded-full border-2 border-line px-10 text-base font-bold text-navy transition-all hover:border-navy hover:bg-slate-50 active:scale-[0.98]"
              onClick={() => setStep((value) => value - 1)}
            >
              Back
            </button>
          ) : (
            <div />
          )}
        </div>
        <div>
          {step < 5 ? (
            <button
              type="button"
              className="flex h-14 items-center justify-center rounded-full bg-navy px-12 text-base font-bold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl active:scale-[0.98]"
              onClick={() => void next()}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="flex h-14 items-center justify-center rounded-full bg-navy px-12 text-base font-bold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving" : mode === "settings" ? "Save profile" : "Finish onboarding"}
            </button>
          )}
        </div>
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
  name: "operatingSystem" | "computerExperience" | "codingExperience" | "weeklyPractice";
  options: [string, string][];
  register: ReturnType<typeof useForm<OnboardingValues>>["register"];
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-4 text-sm font-bold uppercase tracking-widest text-primary/80">{legend}</legend>
      <div className="grid gap-4 sm:grid-cols-1">
        {options.map(([value, label]) => (
          <label
            key={value}
            className="group relative flex cursor-pointer items-center gap-4 py-1 transition-all"
          >
            <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
              <input
                type="radio"
                value={value}
                className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-line bg-white transition-all checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                {...register(name)}
              />
              <div className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-navy opacity-0 transition-opacity peer-checked:opacity-100" />
            </div>
            <span className="text-lg font-bold text-navy group-hover:text-primary transition-colors">{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
