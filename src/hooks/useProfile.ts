import { useEffect } from "react";
import { useProfileStore } from "@/store/profileStore";

interface UseProfileOptions {
  force?: boolean;
}

export function useProfile(options?: UseProfileOptions) {
  const { profile, isLoading, hasLoaded, error, fetchProfile } =
    useProfileStore();

  useEffect(() => {
    if (!hasLoaded || options?.force) {
      fetchProfile({ force: options?.force });
    }
  }, [hasLoaded, options?.force, fetchProfile]);

  return {
    profile,
    isLoading,
    hasLoaded,
    error,
    refetch: () => fetchProfile({ force: true }),
  };
}

