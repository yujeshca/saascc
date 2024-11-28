import * as z from 'zod';

export const webpageTitleSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  pageType: z.string(),
});

export const webpageSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  seoMetaTitle: z.string().optional(),
  seoMetaDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  pageType: z.string(),
  childcareCenterId: z.number(),
  jsonLd: z.string().optional(),
});

export type WebPageTitleFormData = z.infer<typeof webpageTitleSchema>;
export type WebPageFormData = z.infer<typeof webpageSchema>;