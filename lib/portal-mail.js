const resendApiUrl = "https://api.resend.com/emails";

function getMailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.PORTAL_EMAIL_FROM,
    replyTo: process.env.PORTAL_EMAIL_REPLY_TO,
    adminTo: process.env.PORTAL_EMAIL_ADMIN_TO,
  };
}

async function sendViaResend({ to, subject, html, replyTo }) {
  const { apiKey, from } = getMailConfig();

  if (!apiKey || !from || !to) {
    return false;
  }

  const response = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Email delivery failed: ${response.status} ${body}`);
  }

  return true;
}

export async function sendStudentRegistrationEmails({ student, locale }) {
  const { from, replyTo, adminTo } = getMailConfig();

  if (!from) {
    return { delivered: false, reason: "missing_from" };
  }

  const academyLabel = "DeutschAkademie Engel";
  const studentSubject =
    locale === "de" ? "Willkommen im Studentenportal" : "Welcome to your student portal";
  const studentHtml =
    locale === "de"
      ? `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827">
          <h2>Willkommen, ${student.firstName}!</h2>
          <p>Dein Studentenportal bei ${academyLabel} wurde erfolgreich erstellt.</p>
          <p>Du kannst jetzt deine Daten bearbeiten, Kurse anfragen und deine Einschreibungen verfolgen.</p>
        </div>`
      : `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827">
          <h2>Welcome, ${student.firstName}!</h2>
          <p>Your ${academyLabel} student portal account has been created successfully.</p>
          <p>You can now update your profile, request course enrollment, and track your classes from one dashboard.</p>
        </div>`;

  await sendViaResend({
    to: student.email,
    subject: studentSubject,
    html: studentHtml,
    replyTo,
  });

  if (adminTo) {
    const adminSubject =
      locale === "de" ? "Neue Studentenregistrierung" : "New student registration";
    const adminHtml = `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827">
      <h2>${adminSubject}</h2>
      <p><strong>Name:</strong> ${student.firstName} ${student.lastName}</p>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Phone:</strong> ${student.countryCode} ${student.phone}</p>
    </div>`;

    await sendViaResend({
      to: adminTo,
      subject: adminSubject,
      html: adminHtml,
      replyTo: replyTo ?? student.email,
    });
  }

  return { delivered: true };
}
