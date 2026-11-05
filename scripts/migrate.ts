import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import postgres from "postgres";
import { adminPostgresOptions, required } from "./env";

async function main() {
  const admin = postgres(required("DATABASE_ADMIN_URL"), adminPostgresOptions());
  const password = required("APP_DB_PASSWORD").replaceAll("'", "''");
  if (password.length < 16) throw new Error("APP_DB_PASSWORD must be at least 16 characters.");

  // NOSUPERUSER/NOBYPASSRLS are set only at CREATE time. Supabase's postgres
  // role cannot ALTER those attributes on an existing role.
  await admin.unsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'marie_app') THEN
        CREATE ROLE marie_app LOGIN PASSWORD '${password}'
          NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE;
      ELSE
        ALTER ROLE marie_app WITH LOGIN PASSWORD '${password}';
      END IF;
    END
    $$;
  `);

  await admin.unsafe(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  const applied = await admin<{ id: string }[]>`SELECT id FROM schema_migrations`;
  const done = new Set(applied.map((row) => row.id));
  const dir = resolve(process.cwd(), "drizzle");
  const files = readdirSync(dir)
    .filter((name) => name.endsWith(".sql"))
    .sort();

  let count = 0;
  for (const file of files) {
    const id = file.replace(/\.sql$/, "");
    if (done.has(id)) continue;
    const sql = readFileSync(resolve(dir, file), "utf8");
    await admin.begin(async (tx) => {
      await tx.unsafe(sql);
      await tx`INSERT INTO schema_migrations (id) VALUES (${id})`;
    });
    count += 1;
    console.log(`Applied ${id}.`);
  }

  await admin.end();
  console.log(count > 0 ? `Database schema is ready. ${count} migration(s) applied.` : "Database schema is already applied.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
