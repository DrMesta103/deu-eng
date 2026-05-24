import { query } from "@/lib/db";

let portalSchemaReadyPromise;

export function ensurePortalSchema() {
  if (!portalSchemaReadyPromise) {
    portalSchemaReadyPromise = (async () => {
      await query(`
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

      await query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "firstName" TEXT');
      await query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lastName" TEXT');
      await query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "countryCode" TEXT');
      await query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "termsAcceptedAt" TIMESTAMP(3)');

      await query(`
        CREATE TABLE IF NOT EXISTS "StudentCourseEnrollment" (
          "id" TEXT PRIMARY KEY,
          "studentId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
          "courseSlug" TEXT NOT NULL,
          "courseTitle" TEXT NOT NULL,
          "courseLevel" TEXT NOT NULL,
          "coursePrice" TEXT NOT NULL,
          "locale" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'ENROLLED',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await query(`
        CREATE UNIQUE INDEX IF NOT EXISTS "StudentCourseEnrollment_studentId_courseSlug_key"
        ON "StudentCourseEnrollment" ("studentId", "courseSlug")
      `);
    })();
  }

  return portalSchemaReadyPromise;
}
