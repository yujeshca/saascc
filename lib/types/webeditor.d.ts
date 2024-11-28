export interface Widget {
    id: string;
    content: string;
  }
  
  export interface Section {
    id: string;
    content: string;
    widgets: Widget[];
  }

  export type ComponentType = 'text' | 'image' | 'button';
  
  export interface Element {
    id: string;
    type: ComponentType;
    content: string;
  }