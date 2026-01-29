"use client";

import { useProfile } from "@/hooks/useProfile";
import { useProfileStore } from "@/store/profileStore";
import { toggleSocialAccount } from "@/data/users";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Link2 } from "lucide-react";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";

export default function IntegrationsPage() {
  const t = useTranslations("profile.integrations");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const { profile, isLoading } = useProfile();
  const { setProfile } = useProfileStore();

  const dateLocale = locale === "fr" ? fr : enUS;

  if (isLoading && !profile) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{t("title")}</h2>
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{t("title")}</h2>
          <p className="text-sm text-muted-foreground">{t("noInfo")}</p>
        </div>
      </div>
    );
  }

  const linkedin = profile.connectedAccounts.linkedin;
  const twitter = profile.connectedAccounts.twitter;

  const handleToggle = async (platform: "linkedin" | "twitter", connected: boolean) => {
    if (!profile) return;

    try {
      const updatedUser = await toggleSocialAccount(profile.id, platform, connected);
      setProfile(updatedUser);
      toast.success(connected ? t("connectedSuccess") : t("disconnectedSuccess"));
    } catch (error) {
      console.error(`Error toggling ${platform}:`, error);
      toast.error(tCommon("errorOccurred"));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  {t("linkedin")}
                </CardTitle>
                <CardDescription>{t("publishDirectly")} {t("linkedin")}</CardDescription>
              </div>
              {linkedin.connected ? (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" />
                  {t("connected")}
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <X className="h-3 w-3" />
                  {t("notConnected")}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {linkedin.connected ? (
              <>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">{t("account")}</p>
                  <p className="font-medium">{linkedin.username}</p>
                </div>
                {linkedin.connectedAt && (
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">{t("connectedAt")}</p>
                    <p className="font-medium">
                      {format(new Date(linkedin.connectedAt), "d MMMM yyyy", {
                        locale: dateLocale,
                      })}
                    </p>
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleToggle("linkedin", false)}
                >
                  {t("disconnect")}
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={() => handleToggle("linkedin", true)}>
                {t("connect")} {t("linkedin")}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  {t("twitter")}
                </CardTitle>
                <CardDescription>{t("publishDirectly")} {t("twitter")}</CardDescription>
              </div>
              {twitter.connected ? (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" />
                  {t("connected")}
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <X className="h-3 w-3" />
                  {t("notConnected")}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {twitter.connected ? (
              <>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">{t("account")}</p>
                  <p className="font-medium">{twitter.username}</p>
                </div>
                {twitter.connectedAt && (
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">{t("connectedAt")}</p>
                    <p className="font-medium">
                      {format(new Date(twitter.connectedAt), "d MMMM yyyy", {
                        locale: dateLocale,
                      })}
                    </p>
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleToggle("twitter", false)}
                >
                  {t("disconnect")}
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={() => handleToggle("twitter", true)}>
                {t("connect")} {t("twitter")}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
