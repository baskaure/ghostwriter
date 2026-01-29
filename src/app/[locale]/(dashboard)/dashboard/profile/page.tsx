"use client";

import { useProfile } from "@/hooks/useProfile";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ProfileOverviewPage() {
  const { profile: user, isLoading } = useProfile();
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");

  if (isLoading && !user) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{t("overview")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("loadingInfo")}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{t("overview")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("noUserInfo")}
          </p>
        </div>
      </div>
    );
  }

  const createdAt = format(new Date(user.createdAt), "d MMMM yyyy", {
    locale: fr,
  });
  const lastLoginAt = format(new Date(user.lastLoginAt), "d MMMM yyyy HH'h'mm", {
    locale: fr,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t("overview")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("generalInfo")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("account")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">{t("name")}</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("email")}</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">{t("plan")}</p>
              <Badge variant="outline" className="text-xs">
                {user.plan.toUpperCase()}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("createdAt")}</p>
              <p className="font-medium">{createdAt}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("lastLogin")}
              </p>
              <p className="font-medium">{lastLoginAt}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("preferences.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">{t("preferences.language")}</p>
              <p className="font-medium">
                {user.preferences.language.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("preferences.timezone")}</p>
              <p className="font-medium">{user.preferences.timezone}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("preferences.notifications")}</p>
              <div className="mt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={user.preferences.notifications.email ? "outline" : "secondary"}
                    className="text-xs"
                  >
                    Email
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {user.preferences.notifications.email ? tCommon("enabled") : tCommon("disabled")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={user.preferences.notifications.push ? "outline" : "secondary"}
                    className="text-xs"
                  >
                    Push
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {user.preferences.notifications.push ? tCommon("enabled") : tCommon("disabled")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={user.preferences.notifications.weeklyReport ? "outline" : "secondary"}
                    className="text-xs"
                  >
                    {t("preferences.weeklyReport")}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {user.preferences.notifications.weeklyReport ? tCommon("enabled") : tCommon("disabled")}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("writingStyle.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {user.styleProfile ? (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">{t("writingStyle.tone")}</p>
                  <p className="font-medium">
                    {user.styleProfile.tone}/10 ({t("toneDescription")})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("writingStyle.length")}
                  </p>
                  <p className="font-medium">{user.styleProfile.preferredLength}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("writingStyle.emoji")}
                  </p>
                  <p className="font-medium">
                    {user.styleProfile.emojiFrequency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("writingStyle.hashtags")}
                  </p>
                  <p className="font-medium">
                    {user.styleProfile.hashtagStyle}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t("noStylePreference")}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>{t("integrations.title")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge
                variant={user.connectedAccounts.linkedin.connected ? "outline" : "secondary"}
                className="text-xs"
              >
                LinkedIn
              </Badge>
              <span className="text-xs text-muted-foreground">
                {user.connectedAccounts.linkedin.connected
                  ? user.connectedAccounts.linkedin.username
                  : tCommon("notConnected")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={user.connectedAccounts.twitter.connected ? "outline" : "secondary"}
                className="text-xs"
              >
                Twitter/X
              </Badge>
              <span className="text-xs text-muted-foreground">
                {user.connectedAccounts.twitter.connected
                  ? user.connectedAccounts.twitter.username
                  : tCommon("notConnected")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

