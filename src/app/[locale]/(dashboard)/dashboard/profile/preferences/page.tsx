"use client";

import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useProfileStore } from "@/store/profileStore";
import { updateUserPreferences } from "@/data/users";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function PreferencesPage() {
  const t = useTranslations("profile.preferences");
  const tCommon = useTranslations("common");
  const { profile, isLoading, refetch } = useProfile();
  const { setProfile } = useProfileStore();

  const [language, setLanguage] = useState(profile?.preferences.language || "fr");
  const [timezone, setTimezone] = useState(profile?.preferences.timezone || "Europe/Paris");
  const [emailNotifications, setEmailNotifications] = useState(
    profile?.preferences.notifications.email || false
  );
  const [pushNotifications, setPushNotifications] = useState(
    profile?.preferences.notifications.push || false
  );
  const [weeklyReport, setWeeklyReport] = useState(
    profile?.preferences.notifications.weeklyReport || false
  );
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    if (!profile) return;

    setIsSaving(true);
    try {
      const updatedUser = await updateUserPreferences(profile.id, {
        language: language as "fr" | "en",
        timezone,
        notifications: {
          email: emailNotifications,
          push: pushNotifications,
          weeklyReport,
        },
      });

      setProfile(updatedUser);
      toast.success(t("saved"));
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error(tCommon("errorOccurred"));
    } finally {
      setIsSaving(false);
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
            <CardTitle>{t("languageAndRegion")}</CardTitle>
            <CardDescription>{t("languageAndRegionDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">{t("language")}</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">{t("timezone")}</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                  <SelectItem value="America/Los_Angeles">America/Los_Angeles (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? tCommon("loading") : t("saveChanges")}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("notifications")}</CardTitle>
            <CardDescription>{t("notifications")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">{t("emailNotifications")}</Label>
                <p className="text-xs text-muted-foreground">{t("emailDesc")}</p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">{t("pushNotifications")}</Label>
                <p className="text-xs text-muted-foreground">{t("pushDesc")}</p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-report">{t("weeklyReport")}</Label>
                <p className="text-xs text-muted-foreground">{t("weeklyDesc")}</p>
              </div>
              <Switch
                id="weekly-report"
                checked={weeklyReport}
                onCheckedChange={setWeeklyReport}
              />
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? tCommon("loading") : t("saveChanges")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
