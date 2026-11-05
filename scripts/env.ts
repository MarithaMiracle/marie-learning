import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

export function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is missing. Copy .env.example to .env.local and fill it in.`);
  return value;
}
