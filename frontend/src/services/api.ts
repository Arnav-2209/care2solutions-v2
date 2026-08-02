import type {
  ContactRequest,
  ContactResponse,
  AuditQuoteRequest,
  AuditQuoteResponse,
  AdminAuditQuote,
  AdminListResponse,
  AdminLoginRequest,
  AdminLoginResponse,
  ContactInquiry,
  LeadStatus,
} from '../types/api';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:3001';

// ── Generic fetch helper ──────────────────────────────────────

async function post<TReq, TRes>(endpoint: string, body: TReq): Promise<TRes> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await readApiError(res));
  }

  return res.json() as Promise<TRes>;
}

async function readApiError(res: Response): Promise<string> {
  let errMsg = `Request failed with status ${res.status}`;
  try {
    const data = await res.json() as { message?: string; error?: { message?: string } };
    errMsg = data.error?.message || data.message || errMsg;
  } catch {
    // ignore parse errors
  }
  return errMsg;
}

async function adminRequest<TRes>(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<TRes> {
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(await readApiError(res));
  }

  return res.json() as Promise<TRes>;
}

// ── Public API functions ──────────────────────────────────────

export function submitContact(data: ContactRequest): Promise<ContactResponse> {
  return post<ContactRequest, ContactResponse>('/api/contact', data);
}

export function submitAuditQuote(data: AuditQuoteRequest): Promise<AuditQuoteResponse> {
  return post<AuditQuoteRequest, AuditQuoteResponse>('/api/audit-quote', data);
}

// ── Admin API functions ─────────────────────────────────────

export async function adminLogin(data: AdminLoginRequest): Promise<AdminLoginResponse> {
  return post<AdminLoginRequest, AdminLoginResponse>('/api/admin/login', data);
}

export interface AdminListOptions {
  status?: LeadStatus | 'ALL';
  page?: number;
  limit?: number;
}

function buildAdminListQuery(options: AdminListOptions = {}) {
  const params = new URLSearchParams();
  params.set('page', String(options.page || 1));
  params.set('limit', String(options.limit || 10));

  if (options.status && options.status !== 'ALL') {
    params.set('status', options.status);
  }

  return params.toString();
}

export async function listAdminInquiries(token: string, options: AdminListOptions = {}) {
  const query = buildAdminListQuery(options);
  const res = await adminRequest<{ success: boolean; data: AdminListResponse<ContactInquiry> }>(
    `/api/admin/inquiries?${query}`,
    token,
  );
  return res.data;
}

export async function listAdminAuditQuotes(token: string, options: AdminListOptions = {}) {
  const query = buildAdminListQuery(options);
  const res = await adminRequest<{ success: boolean; data: AdminListResponse<AdminAuditQuote> }>(
    `/api/admin/audit-quotes?${query}`,
    token,
  );
  return res.data;
}

export async function updateAdminInquiryStatus(token: string, id: string, status: LeadStatus) {
  const res = await adminRequest<{ success: boolean; data: ContactInquiry }>(
    `/api/admin/inquiries/${id}`,
    token,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    },
  );
  return res.data;
}

export async function updateAdminAuditQuoteStatus(token: string, id: string, status: LeadStatus) {
  const res = await adminRequest<{ success: boolean; data: AdminAuditQuote }>(
    `/api/admin/audit-quotes/${id}`,
    token,
    {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    },
  );
  return res.data;
}

export async function downloadAdminExport(token: string, type: 'inquiries' | 'audit-quotes') {
  const res = await fetch(`${BASE_URL}/api/admin/export?type=${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(await readApiError(res));
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `care2solutions_${type}_export.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
