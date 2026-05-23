import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { Client } from "pg";

function resolveDatabaseUrl() {
  const envLocalPath = path.join(process.cwd(), ".env.local");

  if (fs.existsSync(envLocalPath)) {
    const envLocal = fs.readFileSync(envLocalPath, "utf8");
    const match = envLocal.match(/^DATABASE_URL="?(.*?)"?$/m);

    if (match?.[1]) {
      return match[1];
    }
  }

  return process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5433/academy_engel";
}

const connectionString = resolveDatabaseUrl();

const client = new Client({ connectionString });

async function ensureSchema() {
  await client.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'UserRole' AND e.enumlabel = 'STUDENT'
      ) THEN
        ALTER TYPE "UserRole" ADD VALUE 'STUDENT';
      END IF;
    END $$;
  `);

  await client.query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT');
  await client.query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "locale" TEXT');
  await client.query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true');
  await client.query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lastLoginAt" TIMESTAMP(3)');
}

async function upsertUser(user) {
  await client.query(
    `
      INSERT INTO "User" ("id", "name", "email", "passwordHash", "phone", "locale", "isActive", "lastLoginAt", "role", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::"UserRole", NOW(), NOW())
      ON CONFLICT ("email")
      DO UPDATE SET
        "name" = EXCLUDED."name",
        "passwordHash" = EXCLUDED."passwordHash",
        "phone" = EXCLUDED."phone",
        "locale" = EXCLUDED."locale",
        "isActive" = EXCLUDED."isActive",
        "role" = EXCLUDED."role",
        "updatedAt" = NOW()
    `,
    [crypto.randomUUID(), user.name, user.email, user.passwordHash, user.phone, user.locale, user.isActive, user.lastLoginAt, user.role]
  );
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@engel-akademie.at";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin12345!";

  await client.connect();
  await ensureSchema();

  const users = [
    {
      name: "Default Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      phone: "+43 660 100 1000",
      locale: "en",
      isActive: true,
      lastLoginAt: null,
      role: "ADMIN",
    },
    {
      name: "Content Editor",
      email: "editor@engel-akademie.at",
      passwordHash: await bcrypt.hash("Editor123!", 10),
      phone: "+43 660 100 1003",
      locale: "en",
      isActive: true,
      lastLoginAt: null,
      role: "EDITOR",
    },
    {
      name: "Elena Petrova",
      email: "elena.student@engel-akademie.at",
      passwordHash: await bcrypt.hash("Student123!", 10),
      phone: "+43 660 100 1001",
      locale: "en",
      isActive: true,
      lastLoginAt: null,
      role: "STUDENT",
    },
    {
      name: "Omid Rahimi",
      email: "omid.student@engel-akademie.at",
      passwordHash: await bcrypt.hash("Student123!", 10),
      phone: "+43 660 100 1002",
      locale: "de",
      isActive: true,
      lastLoginAt: null,
      role: "STUDENT",
    },
  ];

  for (const user of users) {
    await upsertUser(user);
  }

  console.log(`Seeded admin: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });
