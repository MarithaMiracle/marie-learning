import { config } from "dotenv";
import type { Options } from "postgres";

// .env.local wins over inherited shell variables (common when switching local ↔ Supabase).
config({ path: ".env.local", override: true });
config({ path: ".env" });

export function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is missing. Copy .env.example to .env.local and fill it in.`);
  return value;
}

/** True when the host is remote or the URL asks for SSL (Supabase, Neon, etc.). */
export function connectionNeedsSsl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const local = host === "localhost" || host === "127.0.0.1" || host === "::1";
    const mode = (parsed.searchParams.get("sslmode") ?? "").toLowerCase();
    if (mode === "disable" || mode === "allow" || mode === "prefer") return !local && mode !== "disable";
    if (mode === "require" || mode === "verify-ca" || mode === "verify-full") return true;
    return !local;
  } catch {
    return true;
  }
}

/** Shared postgres.js options for migrate, seed, and create-db. */
export function adminPostgresOptions(extra: Options<Record<string, never>> = {}) {
  const url = required("DATABASE_ADMIN_URL");
  return {
    max: 1 as const,
    prepare: false as const,
    onnotice: () => undefined,
    ...(connectionNeedsSsl(url) ? { ssl: "require" as const } : {}),
    ...extra,
  };
}
