import { query } from "@/lib/db";

const staffRoles = new Set(["ADMIN", "EDITOR"]);

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
  const diffMs = now.getTime() - date.getTime();
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

export async function getAdminUsersData() {
  const result = await query(
    'SELECT "id", "name", "email", "role", "phone", "locale", "isActive", "lastLoginAt", "createdAt" FROM "User" ORDER BY "createdAt" DESC'
  );
  const users = result.rows;

  const staffUsers = users
    .filter((user) => staffRoles.has(user.role))
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.isActive ? "Active" : "Inactive",
      lastSeen: formatRelative(user.lastLoginAt),
      createdAt: formatDate(user.createdAt),
    }));

  const studentUsers = users
    .filter((user) => user.role === "STUDENT")
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      locale: user.locale ? user.locale.toUpperCase() : "N/A",
      phone: user.phone ?? "N/A",
      status: user.isActive ? "Active" : "Inactive",
      joinedAt: formatDate(user.createdAt),
      lastSeen: formatRelative(user.lastLoginAt),
    }));

  return {
    overview: {
      totalAdmins: staffUsers.length,
      totalStudents: studentUsers.length,
      activeStudents: studentUsers.filter((student) => student.status === "Active").length,
      pendingReview: studentUsers.filter((student) => student.status !== "Active").length,
    },
    adminUsers: staffUsers,
    studentUsers,
  };
}
