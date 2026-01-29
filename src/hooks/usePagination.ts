import { useState, useMemo, useCallback } from "react";

export interface UsePaginationOptions {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

export function usePagination<T>(
  items: T[],
  options: UsePaginationOptions = {}
) {
  const {
    initialPage = 1,
    itemsPerPage: initialItemsPerPage = 10,
    totalItems,
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const total = totalItems ?? items.length;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  const paginationState: PaginationState = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, total);

    return {
      currentPage,
      itemsPerPage,
      totalPages,
      startIndex,
      endIndex,
    };
  }, [currentPage, itemsPerPage, totalPages, total]);

  const paginatedItems = useMemo(() => {
    return items.slice(paginationState.startIndex, paginationState.endIndex);
  }, [items, paginationState.startIndex, paginationState.endIndex]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  return {
    ...paginationState,
    paginatedItems,
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
    setItemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
