"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";

export function DashboardSidebar() {
  const t = useTranslations("dashboard");
  const pathname = usePathname();

  const navigation = [
    {
      name: t("overview"),
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: t("generate"),
      href: "/dashboard/generate",
      icon: Sparkles,
    },
    {
      name: t("contents"),
      href: "/dashboard/contenus",
      icon: FileText,
    },
    {
      name: t("planning"),
      href: "/dashboard/planning",
      icon: Calendar,
    },
    {
      name: t("analytics"),
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <aside className="hidden w-64 border-r bg-muted/40 md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Ghostwriter Pro</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
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
      <div className="border-t p-4">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/dashboard/settings"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          {t("settings")}
        </Link>
      </div>
    </aside>
  );
}
