"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const profileTabs = [
  {
    href: "/dashboard/profile",
    label: "Vue d'ensemble",
  },
  {
    href: "/dashboard/profile/preferences",
    label: "Préférences",
  },
];

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { profile } = useProfile();
  const pathname = usePathname();

  const initials =
    profile?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "GW";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-xl border bg-card p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
          {initials}
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold leading-tight">
            {profile?.name ?? "Votre profil"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {profile?.email ?? "Gérez vos informations Ghostwriter Pro"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="md:w-60">
          <nav className="flex flex-row gap-1 p-2 md:flex-col">
            {profileTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </Card>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

