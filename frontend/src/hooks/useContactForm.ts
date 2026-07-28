import { useState, useCallback } from 'react';
import type { ContactRequest, ContactResponse, ServiceNeeded } from '../types/api';
import { submitContact } from '../services/api';

// ── Form field state ──────────────────────────────────────────

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  practiceName: string;
  serviceNeeded: ServiceNeeded | '';
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  serviceNeeded?: string;
  message?: string;
}

const INITIAL_STATE: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  practiceName: '',
  serviceNeeded: '',
  message: '',
};

// ── Validation ────────────────────────────────────────────────

function validate(fields: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!fields.name.trim()) errors.name = 'Full name is required.';
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
  if (!fields.serviceNeeded) errors.serviceNeeded = 'Please select a service.';
  if (!fields.message.trim()) errors.message = 'Message is required.';
  else if (fields.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

// ── Hook ─────────────────────────────────────────────────────

export function useContactForm() {
  const [fields, setFields]         = useState<ContactFormState>(INITIAL_STATE);
  const [errors, setErrors]         = useState<ContactFormErrors>({});
  const [isLoading, setIsLoading]   = useState(false);
  const [isSuccess, setIsSuccess]   = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [apiError, setApiError]     = useState('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFields((prev) => ({ ...prev, [name]: value }));
      // Clear field error on change
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
        const payload: ContactRequest = {
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          ...(fields.practiceName.trim() && { practiceName: fields.practiceName.trim() }),
          serviceNeeded: fields.serviceNeeded as ServiceNeeded,
          message: fields.message.trim(),
        };
        const res: ContactResponse = await submitContact(payload);
        setIsSuccess(true);
        setSuccessMsg(res.message || 'Your message has been sent. We\'ll be in touch within 24 hours.');
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
    setSuccessMsg('');
    setApiError('');
  }, []);

  return { fields, errors, isLoading, isSuccess, successMsg, apiError, handleChange, handleSubmit, reset };
}
