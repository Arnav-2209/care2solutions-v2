import { AuditQuoteInput } from '../schemas/auditQuote';
import { getDb, schema } from '../db';

export async function processAuditQuoteRequest(input: AuditQuoteInput) {
  const requestId = `aud_${Math.random().toString(36).substring(2, 11)}`;

  const db = getDb();

  if (db) {
    try {
      await db.insert(schema.auditQuoteRequests).values({
        requestId,
        providerName: input.providerName,
        email: input.email,
        phone: input.phone,
        specialty: input.specialty,
        monthlyBillingVolume: input.monthlyBillingVolume || null,
        notes: input.notes || null,
      });
    } catch (err) {
      console.error('Failed to persist audit quote request to DB:', err);
    }
  }

  return {
    success: true,
    message: 'Your RCM audit request has been submitted successfully. Our team will prepare your custom analysis.',
    requestId,
  };
}
