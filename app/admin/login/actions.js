"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn } from "@/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export async function authenticateAdmin(prevState, formData) {
  const values = {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  };

  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      error: null,
      fieldErrors: {
        email: fieldErrors.email?.[0] ?? null,
        password: fieldErrors.password?.[0] ?? null,
      },
      values: {
        email: values.email,
      },
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error:
          error.type === "CredentialsSignin"
            ? "Email or password is incorrect, or this account does not have admin access."
            : "Authentication is temporarily unavailable. Check the database connection and try again.",
        fieldErrors: {
          email: null,
          password: null,
        },
        values: {
          email: parsed.data.email,
        },
      };
    }

    return {
      error: "Authentication is temporarily unavailable. Check the database connection and try again.",
      fieldErrors: {
        email: null,
        password: null,
      },
      values: {
        email: parsed.data.email,
      },
    };
  }

  return {
    error: null,
    fieldErrors: {
      email: null,
      password: null,
    },
    values: {
      email: "",
    },
  };
}
