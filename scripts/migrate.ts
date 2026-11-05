import { readFileSync } from "node:fs";
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
  const applied = await admin<{ id: string }[]>`
    SELECT id FROM schema_migrations WHERE id = '001_init'
  `;
  if (applied.length > 0) {
    await admin.end();
    console.log("Database schema is already applied.");
    return;
  }

  const sql = readFileSync(resolve(process.cwd(), "drizzle/001_init.sql"), "utf8");
  await admin.unsafe(sql);
  await admin`INSERT INTO schema_migrations (id) VALUES ('001_init')`;
  await admin.end();
  console.log("Database schema is ready.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
