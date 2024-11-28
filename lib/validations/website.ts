import * as z from 'zod';

export const websiteSettingsSchema = z.object({
  logo: z.string().optional(),
  darkLogo: z.string().optional(),
  favicon: z.string().optional(),
  commonMetaCode: z.string().optional(),
});

export type WebsiteSettingsFormData = z.infer<typeof websiteSettingsSchema>;