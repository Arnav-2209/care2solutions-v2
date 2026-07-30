import { z } from 'zod';

export const auditQuoteSchema = z.object({
  providerName: z.string().min(2, 'Provider name must be at least 2 characters').max(100, 'Provider name cannot exceed 100 characters'),
  email: z.string().email('Invalid email address format').max(255, 'Email cannot exceed 255 characters'),
  phone: z.string().min(7, 'Phone number must be at least 7 characters').max(20, 'Phone number cannot exceed 20 characters'),
  specialty: z.string().min(2, 'Specialty is required').max(100, 'Specialty cannot exceed 100 characters'),
  monthlyBillingVolume: z.enum(['$10k-$50k', '$50k-$100k', '$100k+']).optional(),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
  captchaToken: z.string().optional(),
});

export type AuditQuoteInput = z.infer<typeof auditQuoteSchema>;
