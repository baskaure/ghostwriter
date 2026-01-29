import { useState, useCallback } from "react";
import { useDebounce } from "./useDebounce";

export interface UseSearchOptions {
  initialValue?: string;
  debounceDelay?: number;
  onSearchChange?: (value: string) => void;
}

export function useSearch(options: UseSearchOptions = {}) {
  const {
    initialValue = "",
    debounceDelay = 300,
    onSearchChange,
  } = options;

  const [searchValue, setSearchValue] = useState(initialValue);
  const debouncedSearch = useDebounce(searchValue, debounceDelay);

  const updateSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  const clearSearch = useCallback(() => {
    setSearchValue("");
    onSearchChange?.("");
  }, [onSearchChange]);

  return {
    searchValue,
    debouncedSearch,
    updateSearch,
    clearSearch,
    setSearchValue,
  };
}
