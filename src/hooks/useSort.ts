import { useState, useMemo, useCallback } from "react";

export type SortDirection = "asc" | "desc";

export interface SortConfig<T> {
  key: keyof T | null;
  direction: SortDirection;
}

export interface UseSortOptions<T> {
  initialSort?: SortConfig<T>;
}

export function useSort<T>(
  items: T[],
  options: UseSortOptions<T> = {}
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(
    options.initialSort || { key: null, direction: "asc" }
  );

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) {
      return items;
    }

    const sorted = [...items].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === "asc"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });

    return sorted;
  }, [items, sortConfig]);

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  }, []);

  const resetSort = useCallback(() => {
    setSortConfig(options.initialSort || { key: null, direction: "asc" });
  }, [options.initialSort]);

  return {
    sortedItems,
    sortConfig,
    handleSort,
    resetSort,
    setSortConfig,
  };
}
