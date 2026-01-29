import { useMemo } from "react";
import { usePostsFilters } from "./usePostsFilters";
import { useSort } from "./useSort";
import { usePagination } from "./usePagination";
import type { Post } from "@/types/post";

export interface UsePostsWithFiltersOptions {
  initialFilters?: Parameters<typeof usePostsFilters>[1];
  initialSort?: Parameters<typeof useSort<Post>>[1];
  paginationOptions?: Parameters<typeof usePagination<Post>>[1];
}

export function usePostsWithFilters(
  posts: Post[],
  options: UsePostsWithFiltersOptions = {}
) {
  const {
    initialFilters,
    initialSort,
    paginationOptions,
  } = options;

  const { filters, filteredPosts, updateSearch, updateStatus, updatePlatform, updateType, resetFilters } =
    usePostsFilters(posts, initialFilters);

  const { sortedItems, sortConfig, handleSort, resetSort } = useSort(
    filteredPosts,
    initialSort
  );

  const {
    paginatedItems,
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    setItemsPerPage,
  } = usePagination(sortedItems, {
    itemsPerPage: 10,
    ...paginationOptions,
  });

  const totalFiltered = filteredPosts.length;
  const totalSorted = sortedItems.length;

  return {
    filters,
    filteredPosts,
    sortedItems,
    paginatedItems,
    sortConfig,
    pagination: {
      currentPage,
      totalPages,
      itemsPerPage,
      goToPage,
      nextPage,
      previousPage,
      hasNextPage,
      hasPreviousPage,
      setItemsPerPage,
    },
    updateSearch,
    updateStatus,
    updatePlatform,
    updateType,
    handleSort,
    resetFilters,
    resetSort,
    totalFiltered,
    totalSorted,
  };
}
