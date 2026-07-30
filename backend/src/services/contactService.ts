import { ContactInput } from '../schemas/contact';
import { getDb, schema } from '../db';
import { sendContactFormNotification } from './emailService';
import { sanitizeText, sanitizeOptional } from '../utils/sanitize';

export async function processContactInquiry(input: ContactInput) {
  const db = getDb();

  if (db) {
    await db.insert(schema.contactInquiries).values({
      name: sanitizeText(input.name),
      email: input.email,
      phone: input.phone,
      practiceName: sanitizeOptional(input.practiceName) || null,
      serviceNeeded: input.serviceNeeded,
      message: sanitizeText(input.message),
    });
  }

  // Trigger email notifications (internal alert + client auto-responder)
  await sendContactFormNotification(input);

  return {
    success: true,
    message: 'Thank you for reaching out. A Care2Solutions specialist will contact you within 24 hours.',
  };
}
