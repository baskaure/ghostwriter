export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: "free" | "pro" | "business" | "enterprise";
  createdAt: string;
  lastLoginAt: string;
  preferences: {
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      weeklyReport: boolean;
    };
  };
  connectedAccounts: {
    linkedin: {
      connected: boolean;
      username?: string;
      connectedAt?: string;
    };
    twitter: {
      connected: boolean;
      username?: string;
      connectedAt?: string;
    };
  };
  styleProfile?: {
    tone: number;
    preferredLength: "court" | "moyen" | "long";
    emojiFrequency: "jamais" | "rarement" | "parfois" | "souvent";
    hashtagStyle: "minimal" | "modéré" | "abondant";
  };
}

export const mockCurrentUser: User = {
  id: "user-1",
  email: "test@gmail.com",
  name: "Test",
  avatar: undefined,
  plan: "pro",
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  lastLoginAt: new Date().toISOString(),
  preferences: {
    language: "fr",
    timezone: "Europe/Paris",
    notifications: {
      email: true,
      push: true,
      weeklyReport: true,
    },
  },
  connectedAccounts: {
    linkedin: {
      connected: true,
      username: "test-user",
      connectedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    twitter: {
      connected: true,
      username: "@test",
      connectedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  styleProfile: {
    tone: 6,
    preferredLength: "moyen",
    emojiFrequency: "parfois",
    hashtagStyle: "modéré",
  },
};

export async function getCurrentUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockCurrentUser;
}

export async function updateUser(
  userId: string,
  updates: Partial<User>
): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { ...mockCurrentUser, ...updates, id: userId };
}

export async function updateUserPreferences(
  userId: string,
  preferences: Partial<User["preferences"]>
): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    ...mockCurrentUser,
    preferences: { ...mockCurrentUser.preferences, ...preferences },
  };
}

export async function toggleSocialAccount(
  userId: string,
  platform: "linkedin" | "twitter",
  connected: boolean
): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const updatedUser = { ...mockCurrentUser };
  updatedUser.connectedAccounts[platform] = {
    connected,
    username: connected ? `username-${platform}` : undefined,
    connectedAt: connected ? new Date().toISOString() : undefined,
  };
  
  return updatedUser;
}
