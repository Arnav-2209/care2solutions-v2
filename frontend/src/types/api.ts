// ============================================================
// API Types — mirrors Arnav's backend contract exactly
// ============================================================

// ── Contact Form ─────────────────────────────────────────────

export type ServiceNeeded =
  | 'medical-billing'
  | 'transcription'
  | 'medical-coding'
  | 'eligibility-verification'
  | 'patient-scheduling'
  | 'prior-authorization'
  | 'debt-collections'
  | 'credentialing'
  | 'rcm'
  | 'other';

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  practiceName?: string;
  serviceNeeded: ServiceNeeded;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// ── Audit Quote Form ─────────────────────────────────────────

export type MonthlyBillingVolume =
  | '$10k-$50k'
  | '$50k-$100k'
  | '$100k+';

export interface AuditQuoteRequest {
  providerName: string;
  email: string;
  phone: string;
  specialty: string;
  monthlyBillingVolume?: MonthlyBillingVolume;
  notes?: string;
}

export interface AuditQuoteResponse {
  success: boolean;
  message: string;
  requestId: string;
}

// ── Admin Lead Management ───────────────────────────────────

export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_REVIEW' | 'QUALIFIED' | 'CLOSED';

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token: string;
}

export interface AdminListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  practiceName?: string | null;
  serviceNeeded: string;
  message: string;
  status: LeadStatus;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrerUrl?: string | null;
  landingPage?: string | null;
  createdAt: string;
}

export interface AdminAuditQuote {
  id: string;
  requestId: string;
  providerName: string;
  email: string;
  phone: string;
  specialty: string;
  monthlyBillingVolume?: string | null;
  notes?: string | null;
  status: LeadStatus;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrerUrl?: string | null;
  landingPage?: string | null;
  createdAt: string;
}
