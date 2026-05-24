ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lastName" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "countryCode" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "termsAcceptedAt" TIMESTAMP(3);

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
);

CREATE UNIQUE INDEX IF NOT EXISTS "StudentCourseEnrollment_studentId_courseSlug_key"
ON "StudentCourseEnrollment" ("studentId", "courseSlug");
