import fs from "node:fs";
import path from "node:path";
import { Pool } from "pg";

function resolveDatabaseUrl() {
  const envLocalPath = path.join(process.cwd(), ".env.local");

  if (fs.existsSync(envLocalPath)) {
    const envLocal = fs.readFileSync(envLocalPath, "utf8");
    const match = envLocal.match(/^DATABASE_URL="?(.*?)"?$/m);

    if (match?.[1]) {
      return match[1];
    }
  }

  return process.env.DATABASE_URL;
}

const globalForDb = globalThis;

export const db =
  globalForDb.pgPool ??
  new Pool({
    connectionString: resolveDatabaseUrl(),
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = db;
}

export async function query(text, params = []) {
  return db.query(text, params);
}
