import type {
  ContactRequest,
  ContactResponse,
  AuditQuoteRequest,
  AuditQuoteResponse,
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
    // Surface a structured error message if the API returns one
    let errMsg = `Request failed with status ${res.status}`;
    try {
      const data = await res.json() as { message?: string };
      if (data.message) errMsg = data.message;
    } catch {
      // ignore parse errors
    }
    throw new Error(errMsg);
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
