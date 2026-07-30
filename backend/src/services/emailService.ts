import nodemailer from 'nodemailer';
import { ContactInput } from '../schemas/contact';
import { AuditQuoteInput } from '../schemas/auditQuote';

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'sales@care2solution.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Care2Solutions <noreply@care2solution.com>';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return null;
}

async function dispatchMail(mailOptions: { from: string; to: string; subject: string; html: string }) {
  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('[EmailService] Failed to send email via SMTP:', err);
    }
  } else {
    // Development / fallback logger when SMTP environment variables are unconfigured
    console.log('[EmailService DEV LOG]');
    console.log(`To: ${mailOptions.to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Content:\n${mailOptions.html.replace(/<[^>]*>?/gm, '')}\n---`);
  }
}

// ── Contact Form Email Notifications ──────────────────────────

export async function sendContactFormNotification(input: ContactInput): Promise<void> {
  // 1. Internal Alert to Care2Solutions Sales Team
  const internalSubject = `[New Lead] Consultation Inquiry from ${input.name}`;
  const internalHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1e293b;">
      <h2 style="color: #0f4c81;">New Consultation Request Received</h2>
      <p>A new prospect has submitted the consultation form on Care2Solutions:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Full Name:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${input.name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${input.email}">${input.email}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="tel:${input.phone}">${input.phone}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Practice Name:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${input.practiceName || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Service Needed:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${input.serviceNeeded}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Message:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${input.message}</td></tr>
      </table>
    </div>
  `;

  // 2. Client Auto-Responder Confirmation
  const clientSubject = `Care2Solutions — Consultation Request Received`;
  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1e293b;">
      <h2 style="color: #0f4c81;">Thank You for Contacting Care2Solutions</h2>
      <p>Dear ${input.name},</p>
      <p>We have received your request regarding <strong>${input.serviceNeeded}</strong>. A Care2Solutions healthcare specialist will review your information and get back to you within 24 hours.</p>
      <p>Best regards,<br><strong>Care2Solutions Healthcare RCM Team</strong><br><a href="https://care2solution.com">care2solution.com</a></p>
    </div>
  `;

  await Promise.allSettled([
    dispatchMail({ from: FROM_EMAIL, to: NOTIFICATION_EMAIL, subject: internalSubject, html: internalHtml }),
    dispatchMail({ from: FROM_EMAIL, to: input.email, subject: clientSubject, html: clientHtml }),
  ]);
}

// ── Audit Quote Email Notifications ───────────────────────────

export async function sendAuditQuoteNotification(input: AuditQuoteInput, requestId: string): Promise<void> {
  // 1. Internal Alert to Care2Solutions Sales Team
  const internalSubject = `[RCM Audit Request] ${input.providerName} (${requestId})`;
  const internalHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1e293b;">
      <h2 style="color: #0f4c81;">New RCM Audit Request (${requestId})</h2>
      <p>A healthcare provider requested a free RCM audit:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Request ID:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${requestId}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Provider Name:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${input.providerName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${input.email}">${input.email}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="tel:${input.phone}">${input.phone}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Specialty:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${input.specialty}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Monthly Volume:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${input.monthlyBillingVolume || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Notes:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${input.notes || 'N/A'}</td></tr>
      </table>
    </div>
  `;

  // 2. Client Confirmation
  const clientSubject = `Care2Solutions — RCM Audit Request Confirmation (${requestId})`;
  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1e293b;">
      <h2 style="color: #0f4c81;">Your RCM Audit Request is Confirmed</h2>
      <p>Dear ${input.providerName},</p>
      <p>Thank you for requesting a free Revenue Cycle Management (RCM) audit. Your confirmation tracking ID is <strong>${requestId}</strong>.</p>
      <p>Our audit specialists are preparing your preliminary analysis and will reach out shortly.</p>
      <p>Best regards,<br><strong>Care2Solutions Solutions Team</strong></p>
    </div>
  `;

  await Promise.allSettled([
    dispatchMail({ from: FROM_EMAIL, to: NOTIFICATION_EMAIL, subject: internalSubject, html: internalHtml }),
    dispatchMail({ from: FROM_EMAIL, to: input.email, subject: clientSubject, html: clientHtml }),
  ]);
}
