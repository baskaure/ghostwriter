import type { User } from "./users";
import { mockCurrentUser } from "./users";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const mockUsers: Array<User & { password: string }> = [
  {
    ...mockCurrentUser,
    password: "password123",
  },
  {
    id: "user-2",
    email: "demo@ghostwriter.pro",
    name: "Demo User",
    password: "demo123",
    plan: "free",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date().toISOString(),
    preferences: {
      language: "fr",
      timezone: "Europe/Paris",
      notifications: {
        email: true,
        push: false,
        weeklyReport: false,
      },
    },
    connectedAccounts: {
      linkedin: {
        connected: false,
      },
      twitter: {
        connected: false,
      },
    },
  },
];

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = mockUsers.find(
    (u) =>
      u.email.toLowerCase() === credentials.email.toLowerCase() &&
      u.password === credentials.password
  );

  if (!user) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const token = `mock-token-${user.id}-${Date.now()}`;
  const { password, ...userWithoutPassword } = user;

  return {
    user: {
      ...userWithoutPassword,
      lastLoginAt: new Date().toISOString(),
    },
    token,
  };
}

export async function register(
  data: RegisterData
): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const existingUser = mockUsers.find(
    (u) => u.email.toLowerCase() === data.email.toLowerCase()
  );

  if (existingUser) {
    throw new Error("Cet email est déjà utilisé");
  }

  const newUser: User & { password: string } = {
    id: `user-${Date.now()}`,
    email: data.email,
    name: data.name,
    password: data.password,
    plan: "free",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    preferences: {
      language: "fr",
      timezone: "Europe/Paris",
      notifications: {
        email: true,
        push: true,
        weeklyReport: false,
      },
    },
    connectedAccounts: {
      linkedin: {
        connected: false,
      },
      twitter: {
        connected: false,
      },
    },
  };

  mockUsers.push(newUser);
  const token = `mock-token-${newUser.id}-${Date.now()}`;

  const { password, ...userWithoutPassword } = newUser;

  return {
    user: userWithoutPassword,
    token,
  };
}

export async function logout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));
}

export async function verifyToken(token: string): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const match = token.match(/mock-token-(user-\d+)/);
  if (!match) {
    return null;
  }

  const userId = match[1];
  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    return null;
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export const testAccounts = {
  pro: {
    email: "test@gmail.com",
    password: "password123",
    description: "Compte Pro avec LinkedIn et Twitter connectés",
  },
  free: {
    email: "demo@ghostwriter.pro",
    password: "demo123",
    description: "Compte Free sans comptes sociaux",
  },
};
