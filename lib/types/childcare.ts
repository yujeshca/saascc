export interface ChildcareCenter {
  id: number;
  name: string;
  tagline?: string;
  address: string;
  contact: string;
  businessHours?: string;
  mission?: string;
  programs: Program[];
  webPages: WebPages[];
  users: User[];
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: number;
  name: string;
  description: string;
  childcareCenterId: number;
  createdAt: string;
  updatedAt: string;
}

export interface WebPages {
  id: number;
  title: string;
  slug: string;
  content: string;
  seoMetaTitle?: string | null | undefined;
  seoMetaDescription?: string | undefined | null;
  seoKeywords?: string | undefined | null;
  pageType: string;
  childcareCenterId: number;
  jsonLd: string | undefined | null
  createdAt: string;
  updatedAt: string;
}



export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}