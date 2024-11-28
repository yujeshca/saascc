import * as z from 'zod';

export const programSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  childcareCenterId: z.number(),
});

export type ProgramFormData = z.infer<typeof programSchema>;