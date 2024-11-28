import { WebPage } from '@prisma/client';

export interface Website {
  id: number;
  childcare_id: number;
  commonMetaCode?: string | null;
  header_id?: number | null;
  footer_id?: number | null;
  themes_id?: number | null;
  logo?: string | null;
  darkLogo?: string | null;
  favicon?: string | null;
  webpages?: WebPage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Theme {
  id: number;
  title: string;
  pages: ThemePage[];
}

export interface ThemePage {
  id: number;
  themes_id: number;
  structureJson: string;
  templateName: string;
  code: string;
}

export interface Header {
  id: number;
  title: string;
  code: string;
  structureJson: string;
}

export interface Footer {
  id: number;
  title: string;
  code: string;
  structureJson: string;
}

export interface Menu {
  id: number;
  website_id: number;
  title: string;
  structureJson: string;
}