export type PostStatus = "draft" | "scheduled" | "published" | "archived";

export type SocialPlatform = "linkedin" | "twitter";

export type PostType = "conseil" | "story" | "question" | "annonce" | "thread";

export interface Post {
  id: string;
  content: string;
  platform: SocialPlatform;
  type: PostType;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  scheduledFor?: string;
  publishedAt?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    impressions: number;
  };
}

export interface GeneratedVariation {
  id: string;
  content: string;
  compatibilityScore: number;
  estimatedEngagement: number;
}

