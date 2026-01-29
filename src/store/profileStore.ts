import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/data/users";
import { getCurrentUser } from "@/data/users";

interface ProfileState {
  profile: User | null;
  isLoading: boolean;
  hasLoaded: boolean;
  error: string | null;

  fetchProfile: (opts?: { force?: boolean }) => Promise<void>;
  setProfile: (user: User) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      hasLoaded: false,
      error: null,

      async fetchProfile(opts) {
        const { hasLoaded } = get();
        const force = opts?.force ?? false;

        if (hasLoaded && !force) {
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const user = await getCurrentUser();
          set({
            profile: user,
            isLoading: false,
            hasLoaded: true,
            error: null,
          });
        } catch (e) {
          set({
            isLoading: false,
            error:
              e instanceof Error
                ? e.message
                : "Impossible de charger le profil",
          });
        }
      },

      setProfile(user) {
        set({ profile: user, hasLoaded: true, error: null });
      },

      clearProfile() {
        set({ profile: null, hasLoaded: false, error: null });
      },
    }),
    {
      name: "ghostwriter-profile-storage",
      partialize: (state) => ({
        profile: state.profile,
        hasLoaded: state.hasLoaded,
      }),
    }
  )
);

