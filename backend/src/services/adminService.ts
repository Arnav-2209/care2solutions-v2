import { eq, count, desc } from 'drizzle-orm';
import { getDb, schema } from '../db';
import { LEAD_STATUSES, LeadStatus } from '../db/schema';

interface ListOptions {
  status?: string;
  page?: number;
  limit?: number;
}

export async function listInquiries(options: ListOptions = {}) {
  const db = getDb();
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 10));
  const offset = (page - 1) * limit;

  if (!db) {
    return { items: [], total: 0, page, limit, totalPages: 0 };
  }

  const validStatus = options.status && LEAD_STATUSES.includes(options.status as LeadStatus)
    ? (options.status as LeadStatus)
    : undefined;

  const whereClause = validStatus ? eq(schema.contactInquiries.status, validStatus) : undefined;

  const [totalResult] = await db
    .select({ total: count() })
    .from(schema.contactInquiries)
    .where(whereClause);

  const total = Number(totalResult?.total || 0);

  const items = await db
    .select()
    .from(schema.contactInquiries)
    .where(whereClause)
    .orderBy(desc(schema.contactInquiries.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function listAuditQuotes(options: ListOptions = {}) {
  const db = getDb();
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 10));
  const offset = (page - 1) * limit;

  if (!db) {
    return { items: [], total: 0, page, limit, totalPages: 0 };
  }

  const validStatus = options.status && LEAD_STATUSES.includes(options.status as LeadStatus)
    ? (options.status as LeadStatus)
    : undefined;

  const whereClause = validStatus ? eq(schema.auditQuoteRequests.status, validStatus) : undefined;

  const [totalResult] = await db
    .select({ total: count() })
    .from(schema.auditQuoteRequests)
    .where(whereClause);

  const total = Number(totalResult?.total || 0);

  const items = await db
    .select()
    .from(schema.auditQuoteRequests)
    .where(whereClause)
    .orderBy(desc(schema.auditQuoteRequests.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function updateInquiryStatus(id: string, status: string) {
  const db = getDb();
  if (!db) return null;

  if (!LEAD_STATUSES.includes(status as LeadStatus)) {
    throw new Error(`Invalid status: ${status}. Must be one of: ${LEAD_STATUSES.join(', ')}`);
  }

  const [updated] = await db
    .update(schema.contactInquiries)
    .set({ status })
    .where(eq(schema.contactInquiries.id, id))
    .returning();

  return updated || null;
}

export async function updateAuditQuoteStatus(id: string, status: string) {
  const db = getDb();
  if (!db) return null;

  if (!LEAD_STATUSES.includes(status as LeadStatus)) {
    throw new Error(`Invalid status: ${status}. Must be one of: ${LEAD_STATUSES.join(', ')}`);
  }

  const [updated] = await db
    .update(schema.auditQuoteRequests)
    .set({ status })
    .where(eq(schema.auditQuoteRequests.id, id))
    .returning();

  return updated || null;
}

function escapeCsvField(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function generateCsvExport(type: 'inquiries' | 'audit-quotes'): Promise<string> {
  const db = getDb();

  if (type === 'inquiries') {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Practice Name',
      'Service Needed',
      'Message',
      'Status',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'Created At',
    ];

    if (!db) {
      return headers.map(escapeCsvField).join(',');
    }

    const records = await db
      .select()
      .from(schema.contactInquiries)
      .orderBy(desc(schema.contactInquiries.createdAt));

    const rows = records.map((r) => [
      escapeCsvField(r.id),
      escapeCsvField(r.name),
      escapeCsvField(r.email),
      escapeCsvField(r.phone),
      escapeCsvField(r.practiceName),
      escapeCsvField(r.serviceNeeded),
      escapeCsvField(r.message),
      escapeCsvField(r.status),
      escapeCsvField(r.utmSource),
      escapeCsvField(r.utmMedium),
      escapeCsvField(r.utmCampaign),
      escapeCsvField(r.createdAt ? new Date(r.createdAt).toISOString() : ''),
    ]);

    return [headers.map(escapeCsvField).join(','), ...rows.map((row) => row.join(','))].join('\n');
  } else {
    const headers = [
      'ID',
      'Request ID',
      'Provider Name',
      'Email',
      'Phone',
      'Specialty',
      'Monthly Volume',
      'Notes',
      'Status',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'Created At',
    ];

    if (!db) {
      return headers.map(escapeCsvField).join(',');
    }

    const records = await db
      .select()
      .from(schema.auditQuoteRequests)
      .orderBy(desc(schema.auditQuoteRequests.createdAt));

    const rows = records.map((r) => [
      escapeCsvField(r.id),
      escapeCsvField(r.requestId),
      escapeCsvField(r.providerName),
      escapeCsvField(r.email),
      escapeCsvField(r.phone),
      escapeCsvField(r.specialty),
      escapeCsvField(r.monthlyBillingVolume),
      escapeCsvField(r.notes),
      escapeCsvField(r.status),
      escapeCsvField(r.utmSource),
      escapeCsvField(r.utmMedium),
      escapeCsvField(r.utmCampaign),
      escapeCsvField(r.createdAt ? new Date(r.createdAt).toISOString() : ''),
    ]);

    return [headers.map(escapeCsvField).join(','), ...rows.map((row) => row.join(','))].join('\n');
  }
}
