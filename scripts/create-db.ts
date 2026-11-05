import postgres from "postgres";
import { required } from "./env";

async function main() {
  const url = new URL(required("DATABASE_ADMIN_URL"));
  const database = url.pathname.replace(/^\//, "");
  url.pathname = "/postgres";
  const admin = postgres(url.toString(), { max: 1 });
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
