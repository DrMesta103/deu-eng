"use server";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth, signIn, signOut } from "@/auth";
import { enrollStudentInCourse, registerStudentAccount, updateStudentProfile } from "@/lib/portal-data";

const countryCodeSchema = z.string().trim().min(1).regex(/^\+\d{1,4}$/, "Select a valid country code.");
const phoneSchema = z.string().trim().min(6).max(20).regex(/^[\d\s\-()]+$/, "Enter a valid phone number.");

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  locale: z.enum(["en", "de"]),
});

const registrationSchema = z
  .object({
    locale: z.enum(["en", "de"]),
    firstName: z.string().trim().min(2, "Enter your first name."),
    lastName: z.string().trim().min(2, "Enter your last name."),
    countryCode: countryCodeSchema,
    phone: phoneSchema,
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Repeat your password."),
    acceptTerms: z.literal("on", {
      errorMap: () => ({ message: "You must accept the terms to continue." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const profileSchema = z.object({
  locale: z.enum(["en", "de"]),
  firstName: z.string().trim().min(2, "Enter your first name."),
  lastName: z.string().trim().min(2, "Enter your last name."),
  countryCode: countryCodeSchema,
  phone: phoneSchema,
});

function buildFieldState(fields, values = {}) {
  return {
    success: null,
    error: null,
    fieldErrors: fields,
    values,
  };
}

export async function loginStudent(prevState, formData) {
  const values = {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
    locale: String(formData.get("locale") ?? "en"),
  };

  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return buildFieldState(
      {
        email: fieldErrors.email?.[0] ?? null,
        password: fieldErrors.password?.[0] ?? null,
      },
      { email: values.email }
    );
  }

  try {
    await signIn("student-credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: `/${parsed.data.locale}/portal`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: null,
        error:
          error.type === "CredentialsSignin"
            ? "Email or password is incorrect."
            : "Student login is temporarily unavailable.",
        fieldErrors: { email: null, password: null },
        values: { email: parsed.data.email },
      };
    }

    throw error;
  }
}

export async function registerStudent(prevState, formData) {
  const values = {
    locale: String(formData.get("locale") ?? "en"),
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    countryCode: String(formData.get("countryCode") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
    acceptTerms: formData.get("acceptTerms"),
  };

  const parsed = registrationSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      success: null,
      error: null,
      fieldErrors: {
        firstName: fieldErrors.firstName?.[0] ?? null,
        lastName: fieldErrors.lastName?.[0] ?? null,
        countryCode: fieldErrors.countryCode?.[0] ?? null,
        phone: fieldErrors.phone?.[0] ?? null,
        email: fieldErrors.email?.[0] ?? null,
        password: fieldErrors.password?.[0] ?? null,
        confirmPassword: fieldErrors.confirmPassword?.[0] ?? null,
        acceptTerms: fieldErrors.acceptTerms?.[0] ?? null,
      },
      values: {
        firstName: values.firstName,
        lastName: values.lastName,
        countryCode: values.countryCode,
        phone: values.phone,
        email: values.email,
      },
    };
  }

  const result = await registerStudentAccount(parsed.data);

  if (!result.ok) {
    return {
      success: null,
      error: result.code === "EMAIL_EXISTS" ? "An account with this email already exists." : "Registration failed.",
      fieldErrors: {
        firstName: null,
        lastName: null,
        countryCode: null,
        phone: null,
        email: null,
        password: null,
        confirmPassword: null,
        acceptTerms: null,
      },
      values: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        countryCode: parsed.data.countryCode,
        phone: parsed.data.phone,
        email: parsed.data.email,
      },
    };
  }

  await signIn("student-credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: `/${parsed.data.locale}/portal`,
  });
}

export async function saveStudentProfile(prevState, formData) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "STUDENT") {
    redirect("/en/portal");
  }

  const values = {
    locale: String(formData.get("locale") ?? "en"),
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    countryCode: String(formData.get("countryCode") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  };

  const parsed = profileSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: null,
      error: null,
      fieldErrors: {
        firstName: fieldErrors.firstName?.[0] ?? null,
        lastName: fieldErrors.lastName?.[0] ?? null,
        countryCode: fieldErrors.countryCode?.[0] ?? null,
        phone: fieldErrors.phone?.[0] ?? null,
      },
    };
  }

  await updateStudentProfile(session.user.id, parsed.data);
  revalidatePath(`/${parsed.data.locale}/portal`);

  return {
    success: parsed.data.locale === "de" ? "Profil gespeichert." : "Profile saved.",
    error: null,
    fieldErrors: {
      firstName: null,
      lastName: null,
      countryCode: null,
      phone: null,
    },
  };
}

export async function enrollCourse(formData) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "STUDENT") {
    redirect("/en/portal");
  }

  const locale = String(formData.get("locale") ?? "en");
  const courseSlug = String(formData.get("courseSlug") ?? "");

  await enrollStudentInCourse(session.user.id, locale, courseSlug);
  revalidatePath(`/${locale}/portal`);
}

export async function logoutStudent(formData) {
  const locale = String(formData.get("locale") ?? "en");
  await signOut({ redirectTo: `/${locale}/portal` });
}
