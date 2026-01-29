"use client";

import { useProfile } from "@/hooks/useProfile";
import { ProfileSidebar } from "@/components/organisms/ProfileSidebar/ProfileSidebar";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, isLoading } = useProfile();

  return (
    <div className="flex h-full -m-4 md:-m-6">
      <ProfileSidebar />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {isLoading && !profile ? (
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 animate-pulse rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-6 w-48 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ) : profile ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="relative">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-20 w-20 rounded-full border-4 border-background object-cover shadow-lg"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg">
                      <User className="h-10 w-10" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-background bg-green-500 p-1.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <Badge variant="outline" className="text-xs">
                      {profile.plan.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {profile.email}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Membre depuis{" "}
                    {format(new Date(profile.createdAt), "MMMM yyyy", {
                      locale: fr,
                    })}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-muted" />
                <div>
                  <div className="h-6 w-48 rounded bg-muted" />
                  <div className="mt-2 h-4 w-32 rounded bg-muted" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
