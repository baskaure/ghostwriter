"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isChecking, setIsChecking] = useState(true);
  const { isAuthenticated, checkAuth } = useAuthStore();
  const router = useRouter();
  const t = useTranslations("common");

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsChecking(false);

      if (!isAuthenticated) {
        router.push("/login");
      }
    };

    verifyAuth();
  }, [checkAuth, isAuthenticated, router]);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
