import type { Post } from "@/types/post";

export const mockPosts: Post[] = [
  {
    id: "post-example-1",
    content: "💡 5 conseils pour améliorer votre productivité en télétravail :\n\n1. Créer un espace de travail dédié\n2. Établir des horaires fixes\n3. Faire des pauses régulières\n4. Utiliser la technique Pomodoro\n5. Communiquer clairement avec son équipe\n\nQu'est-ce qui fonctionne le mieux pour vous ? 👇",
    platform: "linkedin",
    type: "conseil",
    status: "published",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    engagement: {
      likes: 245,
      comments: 32,
      shares: 12,
      impressions: 5420,
    },
  },
  {
    id: "post-example-2",
    content: "Pourquoi j'ai quitté mon job pour devenir freelance...\n\nIl y a 2 ans, j'ai pris une décision qui a changé ma vie. Après 5 ans dans une entreprise, j'ai ressenti le besoin de liberté et d'autonomie.\n\nCette transition n'a pas été facile, mais aujourd'hui je ne regrette rien. Et vous, avez-vous déjà pensé à faire le grand saut ?",
    platform: "linkedin",
    type: "story",
    status: "published",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    engagement: {
      likes: 189,
      comments: 28,
      shares: 8,
      impressions: 4890,
    },
  },
  {
    id: "post-example-3",
    content: "Les 3 erreurs à éviter en marketing digital en 2024 :\n\n❌ Ne pas personnaliser vos messages\n❌ Ignorer les données analytics\n❌ Publier sans stratégie claire\n\nQuelles autres erreurs avez-vous observées ?",
    platform: "linkedin",
    type: "conseil",
    status: "scheduled",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "post-example-4",
    content: "Thread 🧵 sur l'IA et son impact sur le travail :\n\n1/ L'IA transforme notre façon de travailler\n2/ Elle ne remplace pas l'humain, elle l'améliore\n3/ Les compétences humaines restent essentielles\n4/ L'adaptation est la clé du succès",
    platform: "twitter",
    type: "thread",
    status: "published",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    engagement: {
      likes: 198,
      comments: 45,
      shares: 23,
      impressions: 3890,
    },
  },
  {
    id: "post-example-5",
    content: "Comment j'ai appris à dire non et gagner en productivité...",
    platform: "linkedin",
    type: "story",
    status: "draft",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function getMockPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockPosts;
}

export async function getMockPostById(id: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockPosts.find((post) => post.id === id) || null;
}

export async function getMockPostsByStatus(
  status: Post["status"]
): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockPosts.filter((post) => post.status === status);
}

export async function getMockPostsByPlatform(
  platform: Post["platform"]
): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockPosts.filter((post) => post.platform === platform);
}
