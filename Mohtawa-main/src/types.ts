export type Language = 'ar' | 'en';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
}

export interface ContentItem {
  id: string;
  title: string;
  content: string;
  tool: string;
  language: Language;
  createdAt: string;
  favorite: boolean;
}

export interface Tool {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  category: string;
}
