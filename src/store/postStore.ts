import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Post, GeneratedVariation, SocialPlatform, PostType } from "@/types/post";

interface PostStore {
  posts: Post[];
  generatedVariations: GeneratedVariation[];
  isLoading: boolean;
  currentPlatform: SocialPlatform | null;
  currentType: PostType | null;
  
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  setGeneratedVariations: (variations: GeneratedVariation[]) => void;
  clearGeneratedVariations: () => void;
  setLoading: (loading: boolean) => void;
  setGenerationContext: (platform: SocialPlatform, type: PostType) => void;
  
  getPostById: (id: string) => Post | undefined;
  getPostsByStatus: (status: Post["status"]) => Post[];
  getPostsByPlatform: (platform: Post["platform"]) => Post[];
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      generatedVariations: [],
      isLoading: false,
      currentPlatform: null,
      currentType: null,

      addPost: (post) =>
        set((state) => ({
          posts: [post, ...state.posts],
        })),

      updatePost: (id, updates) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? { ...post, ...updates, updatedAt: new Date().toISOString() }
              : post
          ),
        })),

      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),

      setGeneratedVariations: (variations) =>
        set({ generatedVariations: variations }),

      clearGeneratedVariations: () => set({ generatedVariations: [] }),

      setLoading: (loading) => set({ isLoading: loading }),

      setGenerationContext: (platform, type) =>
        set({ currentPlatform: platform, currentType: type }),

      getPostById: (id) => get().posts.find((post) => post.id === id),

      getPostsByStatus: (status) =>
        get().posts.filter((post) => post.status === status),

      getPostsByPlatform: (platform) =>
        get().posts.filter((post) => post.platform === platform),
    }),
    {
      name: "ghostwriter-posts-storage",
      partialize: (state) => ({ posts: state.posts }),
    }
  )
);

