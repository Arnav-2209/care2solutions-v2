import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().email('Invalid email address format').max(255, 'Email cannot exceed 255 characters'),
  phone: z.string().min(7, 'Phone number must be at least 7 characters').max(20, 'Phone number cannot exceed 20 characters'),
  practiceName: z.string().max(150, 'Practice name cannot exceed 150 characters').optional(),
  serviceNeeded: z.enum(['medical-billing', 'transcription', 'credentialing', 'rcm', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message cannot exceed 2000 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;
