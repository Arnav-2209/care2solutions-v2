import { useState, useCallback } from 'react';
import type { AuditQuoteRequest, AuditQuoteResponse, MonthlyBillingVolume } from '../types/api';
import { submitAuditQuote } from '../services/api';

// ── Form field state ──────────────────────────────────────────

interface AuditQuoteFormState {
  providerName: string;
  email: string;
  phone: string;
  specialty: string;
  monthlyBillingVolume: MonthlyBillingVolume | '';
  notes: string;
}

interface AuditQuoteFormErrors {
  providerName?: string;
  email?: string;
  phone?: string;
  specialty?: string;
}

const INITIAL_STATE: AuditQuoteFormState = {
  providerName: '',
  email: '',
  phone: '',
  specialty: '',
  monthlyBillingVolume: '',
  notes: '',
};

// ── Validation ────────────────────────────────────────────────

function validate(fields: AuditQuoteFormState): AuditQuoteFormErrors {
  const errors: AuditQuoteFormErrors = {};
  if (!fields.providerName.trim()) errors.providerName = 'Provider / practice name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^\+?[\d\s\-().]{7,20}$/.test(fields.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!fields.specialty.trim()) errors.specialty = 'Medical specialty is required.';
  return errors;
}

// ── Hook ─────────────────────────────────────────────────────

export function useAuditQuoteForm() {
  const [fields, setFields]         = useState<AuditQuoteFormState>(INITIAL_STATE);
  const [errors, setErrors]         = useState<AuditQuoteFormErrors>({});
  const [isLoading, setIsLoading]   = useState(false);
  const [isSuccess, setIsSuccess]   = useState(false);
  const [requestId, setRequestId]   = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [apiError, setApiError]     = useState('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFields((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      setApiError('');
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate(fields);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsLoading(true);
      setApiError('');

      try {
        const payload: AuditQuoteRequest = {
          providerName: fields.providerName.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          specialty: fields.specialty.trim(),
          ...(fields.monthlyBillingVolume && { monthlyBillingVolume: fields.monthlyBillingVolume }),
          ...(fields.notes.trim() && { notes: fields.notes.trim() }),
        };
        const res: AuditQuoteResponse = await submitAuditQuote(payload);
        setIsSuccess(true);
        setRequestId(res.requestId);
        setSuccessMsg(res.message || 'Your audit request has been received. We\'ll contact you within 1 business day.');
        setFields(INITIAL_STATE);
        setErrors({});
      } catch (err) {
        setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [fields],
  );

  const reset = useCallback(() => {
    setFields(INITIAL_STATE);
    setErrors({});
    setIsSuccess(false);
    setRequestId('');
    setSuccessMsg('');
    setApiError('');
  }, []);

  return { fields, errors, isLoading, isSuccess, requestId, successMsg, apiError, handleChange, handleSubmit, reset };
}
