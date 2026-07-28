// ============================================================
// API Types — mirrors Arnav's backend contract exactly
// ============================================================

// ── Contact Form ─────────────────────────────────────────────

export type ServiceNeeded =
  | 'medical-billing'
  | 'transcription'
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
