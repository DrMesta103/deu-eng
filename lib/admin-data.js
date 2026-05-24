import crypto from "node:crypto";
import { query } from "@/lib/db";

const staffRoles = new Set(["ADMIN", "EDITOR"]);
const userTabMeta = {
  admins: {
    title: "Admin Users",
    description: "Internal staff accounts with access to the admin panel.",
    emptyMessage: "No admin or editor accounts found in the database.",
  },
  students: {
    title: "Student Users",
    description: "Registered learners separated from internal staff access.",
    emptyMessage: "No student accounts have been registered yet.",
  },
};

const defaultContactPageContent = {
  blocks: [
    {
      id: "hero-1",
      type: "hero",
      title: "Contact DeutschAkademie Engel",
      subtitle: "Questions about levels, visas, class formats, or schedules? Reach out and the academy team will respond quickly.",
    },
    {
      id: "details-1",
      type: "details",
      title: "Academy Details",
      subtitle: "Vienna, Austria | +43 1 234 5678 | info@engel-akademie.at",
    },
    {
      id: "form-1",
      type: "form",
      title: "Contact Form",
      subtitle: "Collect name, email, phone number, and message from prospective students.",
    },
  ],
};

function formatDate(date) {
  if (!date) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatRelative(date) {
  if (!date) {
    return "Never signed in";
  }

  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    return "Less than 1 hour ago";
  }

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function buildSearchClause({ search, status, locale }, kind, startIndex) {
  const clauses = [];
  const params = [];

  if (search) {
    params.push(`%${search}%`);
    const searchIndex = startIndex + params.length - 1;
    clauses.push(`("name" ILIKE $${searchIndex} OR "email" ILIKE $${searchIndex} OR COALESCE("phone",'') ILIKE $${searchIndex})`);
  }

  if (status === "active") {
    clauses.push('"isActive" = true');
  } else if (status === "inactive") {
    clauses.push('"isActive" = false');
  }

  if (kind === "students" && locale && locale !== "all") {
    params.push(locale);
    clauses.push(`LOWER(COALESCE("locale", '')) = LOWER($${startIndex + params.length - 1})`);
  }

  return { clauses, params };
}

function getSortClause(kind, sort) {
  const adminSorts = {
    newest: '"createdAt" DESC',
    oldest: '"createdAt" ASC',
    name_asc: '"name" ASC',
    name_desc: '"name" DESC',
    recent_login: '"lastLoginAt" DESC NULLS LAST',
  };

  const studentSorts = {
    newest: '"createdAt" DESC',
    oldest: '"createdAt" ASC',
    name_asc: '"name" ASC',
    name_desc: '"name" DESC',
    recent_login: '"lastLoginAt" DESC NULLS LAST',
    locale_asc: 'COALESCE("locale", \'\') ASC',
  };

  const map = kind === "admins" ? adminSorts : studentSorts;
  return map[sort] ?? map.newest;
}

async function getUsersOverview() {
  const [staffUsersResult, studentUsersResult, activeStudentsResult, inactiveStudentsResult] = await Promise.all([
    query('SELECT COUNT(*)::int AS count FROM "User" WHERE "role" IN ($1, $2)', ["ADMIN", "EDITOR"]),
    query('SELECT COUNT(*)::int AS count FROM "User" WHERE "role" = $1', ["STUDENT"]),
    query('SELECT COUNT(*)::int AS count FROM "User" WHERE "role" = $1 AND "isActive" = true', ["STUDENT"]),
    query('SELECT COUNT(*)::int AS count FROM "User" WHERE "role" = $1 AND "isActive" = false', ["STUDENT"]),
  ]);

  return {
    totalAdmins: staffUsersResult.rows[0]?.count ?? 0,
    totalStudents: studentUsersResult.rows[0]?.count ?? 0,
    activeStudents: activeStudentsResult.rows[0]?.count ?? 0,
    inactiveStudents: inactiveStudentsResult.rows[0]?.count ?? 0,
  };
}

export async function getAdminDashboardData() {
  const [totalUsersResult, staffUsersResult, studentUsersResult, totalLeadsResult, totalCoursesResult, recentUsersResult] = await Promise.all([
    query('SELECT COUNT(*)::int AS count FROM "User"'),
    query('SELECT COUNT(*)::int AS count FROM "User" WHERE "role" IN ($1, $2)', ["ADMIN", "EDITOR"]),
    query('SELECT COUNT(*)::int AS count FROM "User" WHERE "role" = $1', ["STUDENT"]),
    query('SELECT COUNT(*)::int AS count FROM "Lead"'),
    query('SELECT COUNT(*)::int AS count FROM "Course"'),
    query('SELECT "id", "name", "email", "role", "locale", "createdAt", "isActive" FROM "User" ORDER BY "createdAt" DESC LIMIT 6'),
  ]);

  const totalUsers = totalUsersResult.rows[0]?.count ?? 0;
  const staffUsers = staffUsersResult.rows[0]?.count ?? 0;
  const studentUsers = studentUsersResult.rows[0]?.count ?? 0;
  const totalLeads = totalLeadsResult.rows[0]?.count ?? 0;
  const totalCourses = totalCoursesResult.rows[0]?.count ?? 0;
  const recentUsers = recentUsersResult.rows;

  return {
    metrics: [
      { label: "Total Users", value: totalUsers, tone: "dark", note: "All accounts in PostgreSQL" },
      { label: "Students", value: studentUsers, tone: "orange", note: "Registered learner accounts" },
      { label: "Staff", value: staffUsers, tone: "white", note: "Admins and editors with panel access" },
      { label: "Open Leads", value: totalLeads, tone: "sand", note: "Contact and placement requests" },
    ],
    snapshot: {
      totalCourses,
      totalLeads,
      studentUsers,
      staffUsers,
    },
    recentUsers: recentUsers.map((user) => ({
      ...user,
      status: user.isActive ? "Active" : "Inactive",
      joinedAt: formatDate(user.createdAt),
    })),
  };
}

export async function getAdminUsersData(kind, rawFilters = {}) {
  const search = rawFilters.search?.trim() ?? "";
  const status = rawFilters.status ?? "all";
  const sort = rawFilters.sort ?? "newest";
  const locale = rawFilters.locale ?? "all";

  const meta = userTabMeta[kind] ?? userTabMeta.admins;
  const roleClause = kind === "students" ? '"role" = $1' : '"role" IN ($1, $2)';
  const roleParams = kind === "students" ? ["STUDENT"] : ["ADMIN", "EDITOR"];
  const { clauses, params } = buildSearchClause({ search, status, locale }, kind, roleParams.length + 1);
  const allParams = [...roleParams, ...params];
  const whereClauses = [roleClause, ...clauses];
  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";
  const orderBy = getSortClause(kind, sort);

  const rowsResult = await query(
    `SELECT "id", "name", "email", "role", "phone", "locale", "isActive", "lastLoginAt", "createdAt"
     FROM "User"
     ${whereSql}
     ORDER BY ${orderBy}`,
    allParams
  );

  const rows = rowsResult.rows.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    locale: user.locale ? user.locale.toUpperCase() : "N/A",
    phone: user.phone ?? "N/A",
    status: user.isActive ? "Active" : "Inactive",
    lastSeen: formatRelative(user.lastLoginAt),
    createdAt: formatDate(user.createdAt),
  }));

  return {
    tab: kind,
    meta,
    filters: { search, status, sort, locale },
    overview: await getUsersOverview(),
    rows,
  };
}

export async function getPagesData() {
  return {
    pages: [
      {
        slug: "contact",
        title: "Contact Us",
        description: "Edit the public contact page with drag-and-drop blocks and inline content controls.",
        href: "/admin/pages/contact",
      },
    ],
  };
}

export async function getContactPageContent() {
  const result = await query('SELECT "value" FROM "SiteSetting" WHERE "key" = $1 LIMIT 1', ["page_contact_content"]);
  const stored = result.rows[0]?.value;

  if (!stored || !Array.isArray(stored.blocks)) {
    return defaultContactPageContent;
  }

  return stored;
}

export async function saveContactPageContent(blocks) {
  const value = JSON.stringify({ blocks });

  await query(
    `
      INSERT INTO "SiteSetting" ("id", "key", "value", "createdAt", "updatedAt")
      VALUES ($1, $2, $3::jsonb, NOW(), NOW())
      ON CONFLICT ("key")
      DO UPDATE SET "value" = EXCLUDED."value", "updatedAt" = NOW()
    `,
    [crypto.randomUUID(), "page_contact_content", value]
  );
}
