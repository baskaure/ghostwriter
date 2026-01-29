import { useState, useCallback } from "react";

export interface FilterState<T = string> {
  [key: string]: T | "all";
}

export interface UseFiltersOptions<T extends FilterState> {
  initialFilters?: Partial<T>;
  onFiltersChange?: (filters: T) => void;
}

export function useFilters<T extends FilterState>(
  options?: UseFiltersOptions<T>
) {
  const [filters, setFilters] = useState<T>(
    (options?.initialFilters as T) || ({} as T)
  );

  const updateFilter = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        options?.onFiltersChange?.(newFilters);
        return newFilters;
      });
    },
    [options]
  );

  const resetFilters = useCallback(() => {
    const resetFilters = (options?.initialFilters as T) || ({} as T);
    setFilters(resetFilters);
    options?.onFiltersChange?.(resetFilters);
  }, [options]);

  const clearFilter = useCallback(
    <K extends keyof T>(key: K) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: "all" as T[K] };
        options?.onFiltersChange?.(newFilters);
        return newFilters;
      });
    },
    [options]
  );

  return {
    filters,
    updateFilter,
    resetFilters,
    clearFilter,
    setFilters,
  };
}
