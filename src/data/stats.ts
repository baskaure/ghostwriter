export interface DashboardStats {
  postsGenerated: number;
  postsScheduled: number;
  postsPublished: number;
  engagementRate: number;
  totalReach: number;
  followersCount: number;
  creditsUsed: number;
  creditsRemaining: number;
  trends: {
    postsGenerated: { current: number; previous: number; change: number };
    engagementRate: { current: number; previous: number; change: number };
    totalReach: { current: number; previous: number; change: number };
    followersCount: { current: number; previous: number; change: number };
  };
}

export const mockDashboardStats: DashboardStats = {
  postsGenerated: 24,
  postsScheduled: 8,
  postsPublished: 16,
  engagementRate: 4.2,
  totalReach: 12500,
  followersCount: 2847,
  creditsUsed: 24,
  creditsRemaining: 76,
  trends: {
    postsGenerated: {
      current: 24,
      previous: 18,
      change: 33.3,
    },
    engagementRate: {
      current: 4.2,
      previous: 3.8,
      change: 10.5,
    },
    totalReach: {
      current: 12500,
      previous: 9800,
      change: 27.6,
    },
    followersCount: {
      current: 2847,
      previous: 2691,
      change: 5.8,
    },
  },
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockDashboardStats;
}

export function formatTrendChange(change: number): string {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(1)}%`;
}

export function isPositiveTrend(change: number): boolean {
  return change >= 0;
}
