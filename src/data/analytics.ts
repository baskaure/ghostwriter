import type { Post } from "@/types/post";

export interface AnalyticsData {
  period: "7d" | "30d" | "90d";
  startDate: string;
  endDate: string;
  metrics: {
    totalPosts: number;
    totalImpressions: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    totalClicks: number;
    averageEngagementRate: number;
    followerGrowth: number;
  };
  topPosts: Array<{
    postId: string;
    content: string;
    platform: "linkedin" | "twitter";
    impressions: number;
    likes: number;
    comments: number;
    shares: number;
    engagementRate: number;
    publishedAt: string;
  }>;
  engagementByDay: Array<{
    date: string;
    impressions: number;
    likes: number;
    comments: number;
    shares: number;
  }>;
  bestPostingTimes: Array<{
    hour: number;
    dayOfWeek: string;
    averageEngagement: number;
  }>;
  platformBreakdown: {
    linkedin: {
      posts: number;
      impressions: number;
      engagementRate: number;
    };
    twitter: {
      posts: number;
      impressions: number;
      engagementRate: number;
    };
  };
  hashtagPerformance: Array<{
    hashtag: string;
    usageCount: number;
    averageEngagement: number;
  }>;
  contentTypePerformance: {
    conseil: { posts: number; avgEngagement: number };
    story: { posts: number; avgEngagement: number };
    question: { posts: number; avgEngagement: number };
    annonce: { posts: number; avgEngagement: number };
    thread: { posts: number; avgEngagement: number };
  };
}

export const mockAnalytics30d: AnalyticsData = {
  period: "30d",
  startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date().toISOString(),
  metrics: {
    totalPosts: 24,
    totalImpressions: 45230,
    totalLikes: 1245,
    totalComments: 342,
    totalShares: 89,
    totalClicks: 567,
    averageEngagementRate: 4.2,
    followerGrowth: 156,
  },
  topPosts: [
    {
      postId: "post-1",
      content: "💡 5 conseils pour améliorer votre productivité en télétravail...",
      platform: "linkedin",
      impressions: 5420,
      likes: 245,
      comments: 32,
      shares: 12,
      engagementRate: 5.3,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      postId: "post-2",
      content: "Pourquoi j'ai quitté mon job pour devenir freelance...",
      platform: "linkedin",
      impressions: 4890,
      likes: 189,
      comments: 28,
      shares: 8,
      engagementRate: 4.6,
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      postId: "post-3",
      content: "Les 3 erreurs à éviter en marketing digital en 2024...",
      platform: "linkedin",
      impressions: 4320,
      likes: 156,
      comments: 19,
      shares: 5,
      engagementRate: 4.2,
      publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      postId: "post-4",
      content: "Thread 🧵 sur l'IA et son impact sur le travail...",
      platform: "twitter",
      impressions: 3890,
      likes: 198,
      comments: 45,
      shares: 23,
      engagementRate: 6.8,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      postId: "post-5",
      content: "Comment j'ai appris à dire non et gagner en productivité...",
      platform: "linkedin",
      impressions: 3650,
      likes: 142,
      comments: 18,
      shares: 7,
      engagementRate: 4.6,
      publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  engagementByDay: Array.from({ length: 30 }, (_, i) => {
    const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
    const baseImpressions = 800 + Math.random() * 400;
    const baseLikes = baseImpressions * 0.03;
    const baseComments = baseLikes * 0.25;
    const baseShares = baseLikes * 0.08;
    
    return {
      date: date.toISOString().split("T")[0],
      impressions: Math.round(baseImpressions),
      likes: Math.round(baseLikes),
      comments: Math.round(baseComments),
      shares: Math.round(baseShares),
    };
  }),
  bestPostingTimes: [
    { hour: 9, dayOfWeek: "Lundi", averageEngagement: 5.8 },
    { hour: 10, dayOfWeek: "Mardi", averageEngagement: 6.2 },
    { hour: 14, dayOfWeek: "Mercredi", averageEngagement: 5.5 },
    { hour: 9, dayOfWeek: "Jeudi", averageEngagement: 5.9 },
    { hour: 11, dayOfWeek: "Vendredi", averageEngagement: 4.8 },
    { hour: 15, dayOfWeek: "Lundi", averageEngagement: 4.2 },
    { hour: 16, dayOfWeek: "Mardi", averageEngagement: 4.5 },
  ],
  platformBreakdown: {
    linkedin: {
      posts: 18,
      impressions: 34200,
      engagementRate: 4.5,
    },
    twitter: {
      posts: 6,
      impressions: 11030,
      engagementRate: 3.2,
    },
  },
  hashtagPerformance: [
    { hashtag: "#productivité", usageCount: 8, averageEngagement: 5.2 },
    { hashtag: "#entrepreneuriat", usageCount: 6, averageEngagement: 4.8 },
    { hashtag: "#marketing", usageCount: 5, averageEngagement: 4.5 },
    { hashtag: "#IA", usageCount: 4, averageEngagement: 6.1 },
    { hashtag: "#freelance", usageCount: 3, averageEngagement: 4.2 },
    { hashtag: "#startup", usageCount: 3, averageEngagement: 3.9 },
  ],
  contentTypePerformance: {
    conseil: { posts: 10, avgEngagement: 4.8 },
    story: { posts: 6, avgEngagement: 5.2 },
    question: { posts: 4, avgEngagement: 3.5 },
    annonce: { posts: 2, avgEngagement: 4.1 },
    thread: { posts: 2, avgEngagement: 6.2 },
  },
};

export const mockAnalytics7d: AnalyticsData = {
  ...mockAnalytics30d,
  period: "7d",
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  metrics: {
    totalPosts: 6,
    totalImpressions: 11250,
    totalLikes: 312,
    totalComments: 89,
    totalShares: 23,
    totalClicks: 145,
    averageEngagementRate: 4.5,
    followerGrowth: 42,
  },
  engagementByDay: mockAnalytics30d.engagementByDay.slice(-7),
};

export const mockAnalytics90d: AnalyticsData = {
  ...mockAnalytics30d,
  period: "90d",
  startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  metrics: {
    totalPosts: 72,
    totalImpressions: 135690,
    totalLikes: 3735,
    totalComments: 1026,
    totalShares: 267,
    totalClicks: 1701,
    averageEngagementRate: 4.1,
    followerGrowth: 468,
  },
  engagementByDay: Array.from({ length: 90 }, (_, i) => {
    const date = new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000);
    const baseImpressions = 1200 + Math.random() * 600;
    const baseLikes = baseImpressions * 0.028;
    const baseComments = baseLikes * 0.27;
    const baseShares = baseLikes * 0.07;
    
    return {
      date: date.toISOString().split("T")[0],
      impressions: Math.round(baseImpressions),
      likes: Math.round(baseLikes),
      comments: Math.round(baseComments),
      shares: Math.round(baseShares),
    };
  }),
};

export function getAnalytics(period: "7d" | "30d" | "90d"): AnalyticsData {
  switch (period) {
    case "7d":
      return mockAnalytics7d;
    case "30d":
      return mockAnalytics30d;
    case "90d":
      return mockAnalytics90d;
    default:
      return mockAnalytics30d;
  }
}

export async function fetchAnalytics(
  period: "7d" | "30d" | "90d" = "30d"
): Promise<AnalyticsData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return getAnalytics(period);
}
