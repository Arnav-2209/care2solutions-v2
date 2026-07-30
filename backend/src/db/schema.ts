import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

// ── Lead status enum ──────────────────────────────────────────
export const LEAD_STATUSES = ['NEW', 'CONTACTED', 'IN_REVIEW', 'QUALIFIED', 'CLOSED'] as const;
export type LeadStatus = typeof LEAD_STATUSES[number];

// ── Contact Inquiries Table ───────────────────────────────────
export const contactInquiries = pgTable('contact_inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  practiceName: varchar('practice_name', { length: 150 }),
  serviceNeeded: varchar('service_needed', { length: 50 }).notNull(),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('NEW'),
  utmSource: varchar('utm_source', { length: 100 }),
  utmMedium: varchar('utm_medium', { length: 100 }),
  utmCampaign: varchar('utm_campaign', { length: 100 }),
  referrerUrl: text('referrer_url'),
  landingPage: text('landing_page'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
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
  status: varchar('status', { length: 20 }).notNull().default('NEW'),
  utmSource: varchar('utm_source', { length: 100 }),
  utmMedium: varchar('utm_medium', { length: 100 }),
  utmCampaign: varchar('utm_campaign', { length: 100 }),
  referrerUrl: text('referrer_url'),
  landingPage: text('landing_page'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type NewContactInquiry = typeof contactInquiries.$inferInsert;

export type AuditQuoteRequestRecord = typeof auditQuoteRequests.$inferSelect;
export type NewAuditQuoteRequest = typeof auditQuoteRequests.$inferInsert;

