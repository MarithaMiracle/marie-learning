import postgres from "postgres";
import { adminPostgresOptions, required } from "./env";

async function main() {
  const source = new URL(required("DATABASE_ADMIN_URL"));
  const database = source.pathname.replace(/^\//, "").split("?")[0] ?? "";
  if (!database || database === "postgres") {
    console.log("Supabase and many hosts already provide a postgres database. Skip create-db and run npm run db:migrate.");
    return;
  }
  source.pathname = "/postgres";
  const admin = postgres(source.toString(), adminPostgresOptions());
  const existing = await admin<{ exists: boolean }[]>`
    SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = ${database}) AS exists
  `;
  if (!existing[0]?.exists) {
    await admin.unsafe(`CREATE DATABASE ${database.replaceAll('"', "")}`);
    console.log(`Created database ${database}.`);
  } else {
    console.log(`Database ${database} already exists.`);
  }
  await admin.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
