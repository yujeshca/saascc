export enum ElementType {
  TEXT = 'text',
  IMAGE = 'image',
}

export interface EditorElement {
  id: string;
  type: string; // Could be 'Hero', 'Features', 'FAQ', etc.
  content: any; // Use a more detailed type if needed for specific content structure
  className: string;
}
