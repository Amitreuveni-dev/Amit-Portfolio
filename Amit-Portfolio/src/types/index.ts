// Display preference types
export type ThemeMode = 'light' | 'dark' | 'high-contrast';

export type FontSize = 'small' | 'medium' | 'large';

// Navigation Types
export interface NavLink {
  id: string;
  label: string;
  href: string;
}

// Project Types (for MongoDB)
export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

// Timeline Types
export type TimelineItemType = 'education' | 'experience' | 'achievement';

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  title: string;
  subtitle: string;
  description: string;
  startDate: string;
  endDate?: string;
  highlights?: string[];
}

// Tech Stack Icon Types
export interface TechStackItem {
  name: string;
  icon: string;
}

// Toast Types
export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

// Environment Variables Type
export interface ImportMetaEnv {
  readonly VITE_MONGO_URI: string;
  readonly VITE_API_URL: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
