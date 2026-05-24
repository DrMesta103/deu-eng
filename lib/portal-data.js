import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import { getLandingContent } from "@/lib/site-data";
import { ensurePortalSchema } from "@/lib/portal-schema";
import { sendStudentRegistrationEmails } from "@/lib/portal-mail";

function buildFullName(firstName, lastName) {
  return `${firstName} ${lastName}`.trim();
}

function normalizePhone(countryCode, phone) {
  return `${countryCode} ${phone}`.replace(/\s+/g, " ").trim();
}

function getCourseSnapshot(locale, slug) {
  const course = getLandingContent(locale).courses.find((item) => item.slug === slug);

  if (!course) {
    return null;
  }

  return {
    slug: course.slug,
    title: course.title,
    level: course.level,
    price: course.price,
  };
}

export async function registerStudentAccount(values) {
  await ensurePortalSchema();

  const email = values.email.toLowerCase();
  const existing = await query('SELECT "id" FROM "User" WHERE LOWER("email") = $1 LIMIT 1', [email]);

  if (existing.rows[0]) {
    return { ok: false, code: "EMAIL_EXISTS" };
  }

  const passwordHash = await bcrypt.hash(values.password, 10);
  const id = crypto.randomUUID();
  const firstName = values.firstName.trim();
  const lastName = values.lastName.trim();

  await query(
    `
      INSERT INTO "User" (
        "id", "name", "firstName", "lastName", "email", "passwordHash", "phone", "countryCode",
        "locale", "isActive", "role", "termsAcceptedAt", "createdAt", "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, 'STUDENT', NOW(), NOW(), NOW())
    `,
    [
      id,
      buildFullName(firstName, lastName),
      firstName,
      lastName,
      email,
      passwordHash,
      normalizePhone(values.countryCode, values.phone),
      values.countryCode,
      values.locale,
    ]
  );

  try {
    await sendStudentRegistrationEmails({
      student: {
        firstName,
        lastName,
        email,
        phone: values.phone,
        countryCode: values.countryCode,
      },
      locale: values.locale,
    });
  } catch (error) {
    console.error("Student registration email failed", error);
  }

  return { ok: true };
}

export async function getStudentPortalData(userId, locale) {
  await ensurePortalSchema();

  const [studentResult, enrollmentsResult] = await Promise.all([
    query(
      `
        SELECT "id", "name", "firstName", "lastName", "email", "phone", "countryCode", "locale", "createdAt"
        FROM "User"
        WHERE "id" = $1 AND "role" = 'STUDENT'
        LIMIT 1
      `,
      [userId]
    ),
    query(
      `
        SELECT "id", "courseSlug", "courseTitle", "courseLevel", "coursePrice", "status", "createdAt"
        FROM "StudentCourseEnrollment"
        WHERE "studentId" = $1
        ORDER BY "createdAt" DESC
      `,
      [userId]
    ),
  ]);

  const student = studentResult.rows[0];

  if (!student) {
    return null;
  }

  const content = getLandingContent(locale);
  const enrolledSlugs = new Set(enrollmentsResult.rows.map((item) => item.courseSlug));

  return {
    student: {
      id: student.id,
      name: student.name,
      firstName: student.firstName ?? student.name?.split(" ")[0] ?? "",
      lastName: student.lastName ?? student.name?.split(" ").slice(1).join(" ") ?? "",
      email: student.email,
      phone: student.phone ?? "",
      countryCode: student.countryCode ?? "+43",
      locale: student.locale ?? locale,
      joinedAt: new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(student.createdAt),
    },
    enrollments: enrollmentsResult.rows.map((item) => ({
      id: item.id,
      slug: item.courseSlug,
      title: item.courseTitle,
      level: item.courseLevel,
      price: item.coursePrice,
      status: item.status,
    })),
    courses: content.courses.map((course) => ({
      slug: course.slug,
      title: course.title,
      level: course.level,
      summary: course.summary,
      price: course.price,
      enrolled: enrolledSlugs.has(course.slug),
    })),
  };
}

export async function updateStudentProfile(userId, values) {
  await ensurePortalSchema();

  const firstName = values.firstName.trim();
  const lastName = values.lastName.trim();
  const phone = normalizePhone(values.countryCode, values.phone);

  await query(
    `
      UPDATE "User"
      SET
        "name" = $2,
        "firstName" = $3,
        "lastName" = $4,
        "phone" = $5,
        "countryCode" = $6,
        "updatedAt" = NOW()
      WHERE "id" = $1 AND "role" = 'STUDENT'
    `,
    [userId, buildFullName(firstName, lastName), firstName, lastName, phone, values.countryCode]
  );
}

export async function enrollStudentInCourse(userId, locale, courseSlug) {
  await ensurePortalSchema();

  const course = getCourseSnapshot(locale, courseSlug);

  if (!course) {
    return { ok: false, code: "COURSE_NOT_FOUND" };
  }

  await query(
    `
      INSERT INTO "StudentCourseEnrollment" (
        "id", "studentId", "courseSlug", "courseTitle", "courseLevel", "coursePrice", "locale", "status", "createdAt", "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'ENROLLED', NOW(), NOW())
      ON CONFLICT ("studentId", "courseSlug") DO NOTHING
    `,
    [crypto.randomUUID(), userId, course.slug, course.title, course.level, course.price, locale]
  );

  return { ok: true };
}
