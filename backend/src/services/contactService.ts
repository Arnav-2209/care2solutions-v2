import { ContactInput } from '../schemas/contact';
import { getDb, schema } from '../db';

export async function processContactInquiry(input: ContactInput) {
  const db = getDb();

  if (db) {
    try {
      await db.insert(schema.contactInquiries).values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        practiceName: input.practiceName || null,
        serviceNeeded: input.serviceNeeded,
        message: input.message,
      });
    } catch (err) {
      console.error('Failed to persist contact inquiry to DB:', err);
    }
  }

  return {
    success: true,
    message: 'Thank you for reaching out. A Care2Solutions specialist will contact you within 24 hours.',
  };
}
