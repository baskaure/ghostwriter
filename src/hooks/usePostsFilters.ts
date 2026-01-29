import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import type { Post, PostStatus, SocialPlatform, PostType } from "@/types/post";

export interface PostsFilters {
  search: string;
  status: PostStatus | "all";
  platform: SocialPlatform | "all";
  type: PostType | "all";
}

export interface UsePostsFiltersOptions {
  initialFilters?: Partial<PostsFilters>;
  debounceDelay?: number;
}

export function usePostsFilters(
  posts: Post[],
  options: UsePostsFiltersOptions = {}
) {
  const {
    initialFilters = {
      search: "",
      status: "all",
      platform: "all",
      type: "all",
    },
    debounceDelay = 300,
  } = options;

  const [filters, setFilters] = useState<PostsFilters>({
    search: "",
    status: "all",
    platform: "all",
    type: "all",
    ...initialFilters,
  });

  const debouncedSearch = useDebounce(filters.search, debounceDelay);

  const updateSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const updateStatus = useCallback((status: PostStatus | "all") => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const updatePlatform = useCallback((platform: SocialPlatform | "all") => {
    setFilters((prev) => ({ ...prev, platform }));
  }, []);

  const updateType = useCallback((type: PostType | "all") => {
    setFilters((prev) => ({ ...prev, type }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: "",
      status: "all",
      platform: "all",
      type: "all",
    });
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        debouncedSearch === "" ||
        post.content.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesStatus =
        filters.status === "all" || post.status === filters.status;

      const matchesPlatform =
        filters.platform === "all" || post.platform === filters.platform;

      const matchesType = filters.type === "all" || post.type === filters.type;

      return matchesSearch && matchesStatus && matchesPlatform && matchesType;
    });
  }, [posts, debouncedSearch, filters.status, filters.platform, filters.type]);

  return {
    filters,
    filteredPosts,
    updateSearch,
    updateStatus,
    updatePlatform,
    updateType,
    resetFilters,
    setFilters,
  };
}
