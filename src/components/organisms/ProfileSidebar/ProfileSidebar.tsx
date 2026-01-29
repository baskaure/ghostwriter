"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  PenTool,
  Link as LinkIcon,
} from "lucide-react";

export function ProfileSidebar() {
  const t = useTranslations("profile");
  const pathname = usePathname();

  const profileNavigation = [
    {
      name: t("overview"),
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: t("preferences.title"),
      href: "/dashboard/profile/preferences",
      icon: Settings,
    },
    {
      name: t("writingStyle.title"),
      href: "/dashboard/profile/writing-style",
      icon: PenTool,
    },
    {
      name: t("integrations.title"),
      href: "/dashboard/profile/integrations",
      icon: LinkIcon,
    },
  ];

  return (
    <aside className="w-64 border-r bg-muted/40">
      <nav className="space-y-1 p-4">
        {profileNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
