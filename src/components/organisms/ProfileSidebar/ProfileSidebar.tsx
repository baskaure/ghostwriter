"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  PenTool,
  Link as LinkIcon,
} from "lucide-react";

const profileNavigation = [
  {
    name: "Vue d'ensemble",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Préférences",
    href: "/dashboard/profile/preferences",
    icon: Settings,
  },
  {
    name: "Style d'écriture",
    href: "/dashboard/profile/writing-style",
    icon: PenTool,
  },
  {
    name: "Intégrations",
    href: "/dashboard/profile/integrations",
    icon: LinkIcon,
  },
];

export function ProfileSidebar() {
  const pathname = usePathname();

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
