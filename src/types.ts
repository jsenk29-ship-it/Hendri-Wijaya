export type CategoryType = 
  | 'Semua' 
  | 'Kampus' 
  | 'Pendidikan' 
  | 'Pemikiran' 
  | 'Nasional' 
  | 'Internasional' 
  | 'Opini & Essay';

export type ArticleStatus = 'published' | 'pending' | 'rejected';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  role?: string;
  date: string;
  content: string;
  likes: number;
  userLiked?: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  category: CategoryType;
  author: {
    name: string;
    role: string;
    avatar: string;
    university?: string;
    email?: string;
    phone?: string;
  };
  publishDate: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageCaption?: string;
  content: string; // HTML or Markdown formatted string paragraphs
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isEditorPick?: boolean;
  status?: ArticleStatus;
  rejectionReason?: string;
  viewCount: number;
  shareCount: number;
  comments: Comment[];
  aiSummary?: {
    summary: string;
    keyPoints: string[];
  };
}

export interface WriterProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  bio: string;
  avatar: string;
  loginMethod: 'google' | 'phone';
}

export type UserRole = 'guest' | 'penulis' | 'admin';


export interface EditorialBoardMember {
  name: string;
  role: string;
  major: string;
  avatar: string;
  quote: string;
}

export interface WeatherInfo {
  city: string;
  temp: number;
  condition: string;
  airQuality: string;
}
