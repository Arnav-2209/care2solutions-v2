import { AuditQuoteInput } from '../schemas/auditQuote';
import { getDb, schema } from '../db';
import { sendAuditQuoteNotification } from './emailService';
import { sanitizeText, sanitizeOptional } from '../utils/sanitize';

export async function processAuditQuoteRequest(input: AuditQuoteInput) {
  const requestId = `aud_${Math.random().toString(36).substring(2, 11)}`;

  const db = getDb();

  if (db) {
    await db.insert(schema.auditQuoteRequests).values({
      requestId,
      providerName: sanitizeText(input.providerName),
      email: input.email,
      phone: input.phone,
      specialty: input.specialty,
      monthlyBillingVolume: input.monthlyBillingVolume || null,
      notes: sanitizeOptional(input.notes) || null,
    });
  }

  // Trigger email notifications (internal alert + client auto-responder)
  await sendAuditQuoteNotification(input, requestId);

  return {
    success: true,
    message: 'Your RCM audit request has been submitted successfully. Our team will prepare your custom analysis.',
    requestId,
  };
}
