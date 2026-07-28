import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

// ── Contact Inquiries Table ───────────────────────────────────
export const contactInquiries = pgTable('contact_inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  practiceName: varchar('practice_name', { length: 150 }),
  serviceNeeded: varchar('service_needed', { length: 50 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ── Audit Quote Requests Table ────────────────────────────────
export const auditQuoteRequests = pgTable('audit_quote_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestId: varchar('request_id', { length: 50 }).notNull().unique(),
  providerName: varchar('provider_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  specialty: varchar('specialty', { length: 100 }).notNull(),
  monthlyBillingVolume: varchar('monthly_billing_volume', { length: 50 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type NewContactInquiry = typeof contactInquiries.$inferInsert;

export type AuditQuoteRequestRecord = typeof auditQuoteRequests.$inferSelect;
export type NewAuditQuoteRequest = typeof auditQuoteRequests.$inferInsert;
