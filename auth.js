import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { query } from "@/lib/db";

const adminRoles = new Set(["ADMIN", "EDITOR"]);
const studentRoles = new Set(["STUDENT"]);

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

async function getUserByEmail(email) {
  const result = await query(
    'SELECT "id", "name", "email", "passwordHash", "role", "isActive" FROM "User" WHERE LOWER("email") = $1 LIMIT 1',
    [email]
  );

  return result.rows[0] ?? null;
}

async function authorizeByRole(credentials, allowedRoles) {
  const parsed = credentialsSchema.safeParse(credentials);

  if (!parsed.success) {
    return null;
  }

  const email = parsed.data.email.toLowerCase();
  const user = await getUserByEmail(email);

  if (!user || !user.isActive || !allowedRoles.has(user.role)) {
    return null;
  }

  const passwordValid = await bcrypt.compare(parsed.data.password, user.passwordHash);

  if (!passwordValid) {
    return null;
  }

  await query('UPDATE "User" SET "lastLoginAt" = NOW() WHERE "id" = $1', [user.id]);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return authorizeByRole(credentials, adminRoles);
      },
    }),
    Credentials({
      id: "student-credentials",
      name: "Student Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return authorizeByRole(credentials, studentRoles);
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
});
