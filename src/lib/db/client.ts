import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";

type Database = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { mariePg?: ReturnType<typeof postgres>; marieDb?: Database };

function connectionNeedsSsl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const local = host === "localhost" || host === "127.0.0.1" || host === "::1";
    const mode = (parsed.searchParams.get("sslmode") ?? "").toLowerCase();
    if (mode === "require" || mode === "verify-ca" || mode === "verify-full") return true;
    if (mode === "disable") return false;
    return !local;
  } catch {
    return true;
  }
}

function connection() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  if (!globalForDb.mariePg) {
    globalForDb.mariePg = postgres(url, {
      max: 10,
      prepare: false,
      ...(connectionNeedsSsl(url) ? { ssl: "require" as const } : {}),
    });
  }
  return globalForDb.mariePg;
}

export function getDb() {
  if (!globalForDb.marieDb) globalForDb.marieDb = drizzle(connection(), { schema });
  return globalForDb.marieDb;
}

export type Tx = Parameters<Parameters<Database["transaction"]>[0]>[0];

export type Actor = { id: string; role: "instructor" | "student" };

export async function withActor<T>(actor: Actor | null, run: (tx: Tx) => Promise<T>) {
  return getDb().transaction(async (tx) => {
    await tx.execute(sql`select set_config('app.user_id', ${actor?.id ?? ""}, true)`);
    await tx.execute(sql`select set_config('app.role', ${actor?.role ?? ""}, true)`);
    return run(tx);
  });
}

export function firstRow<T>(result: unknown): T | null {
  if (Array.isArray(result)) return (result[0] as T | undefined) ?? null;
  if (result && typeof result === "object" && "rows" in result) {
    const rows = (result as { rows: T[] }).rows;
    return rows[0] ?? null;
  }
  return null;
}

export function jsonValue<T>(result: unknown): T | null {
  const row = firstRow<Record<string, unknown>>(result);
  if (!row) return null;
  const value = Object.values(row)[0];
  return (value as T) ?? null;
}
