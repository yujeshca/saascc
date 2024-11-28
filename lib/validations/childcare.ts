import * as z from 'zod';

export const childcareSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  tagline: z.string().optional(),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  contact: z.string().min(5, 'Contact information must be at least 5 characters'),
  businessHours: z.string().optional(),
  mission: z.string().optional(),
});

export type ChildcareFormData = z.infer<typeof childcareSchema>;