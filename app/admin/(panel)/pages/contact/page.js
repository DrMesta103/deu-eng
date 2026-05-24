import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContactPageEditor } from "@/components/admin/contact-page-editor";
import { getContactPageContent } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminContactPageBuilder() {
  const [session, content] = await Promise.all([auth(), getContactPageContent()]);

  return (
    <AdminShell
      title="Contact Page Editor"
      description="Build the contact page in a focused editor with a compact admin rail, searchable elements, dynamic form controls, and a full-page live preview."
      activePath="/admin/pages/contact"
      user={session?.user}
      compactSidebar
    >
      <ContactPageEditor initialBlocks={content.blocks} />
    </AdminShell>
  );
}