"use server";

import { revalidatePath } from "next/cache";
import { saveContactPageContent } from "@/lib/admin-data";

export async function saveContactPageAction(_, formData) {
  const raw = formData.get("blocks");

  if (typeof raw !== "string") {
    return { success: false, message: "Missing block payload." };
  }

  const parsed = JSON.parse(raw);
  const blocks = Array.isArray(parsed) ? parsed : [];
  await saveContactPageContent(blocks);

  revalidatePath("/en/contact");
  revalidatePath("/de/contact");
  revalidatePath("/admin/pages/contact");

  return {
    success: true,
    message: "Contact page saved successfully.",
  };
}
