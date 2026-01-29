"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useProfileStore } from "@/store/profileStore";
import { updateUserStyleProfile } from "@/data/users";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function WritingStylePage() {
  const t = useTranslations("profile.writingStyle");
  const tCommon = useTranslations("common");
  const { profile, isLoading } = useProfile();
  const { setProfile } = useProfileStore();

  const [tone, setTone] = useState([profile?.styleProfile?.tone ?? 5]);
  const [preferredLength, setPreferredLength] = useState<"court" | "moyen" | "long">(
    profile?.styleProfile?.preferredLength ?? "moyen"
  );
  const [emojiFrequency, setEmojiFrequency] = useState<
    "jamais" | "rarement" | "parfois" | "souvent"
  >(profile?.styleProfile?.emojiFrequency ?? "parfois");
  const [hashtagStyle, setHashtagStyle] = useState<"minimal" | "modéré" | "abondant">(
    profile?.styleProfile?.hashtagStyle ?? "modéré"
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.styleProfile) {
      setTone([profile.styleProfile.tone]);
      setPreferredLength(profile.styleProfile.preferredLength);
      setEmojiFrequency(profile.styleProfile.emojiFrequency);
      setHashtagStyle(profile.styleProfile.hashtagStyle);
    }
  }, [profile]);

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

  const handleSave = async () => {
    if (!profile) return;

    setIsSaving(true);
    try {
      const updatedUser = await updateUserStyleProfile(profile.id, {
        tone: tone[0],
        preferredLength,
        emojiFrequency,
        hashtagStyle,
      });

      setProfile(updatedUser);
      toast.success(t("saved"));
    } catch (error) {
      console.error("Error saving writing style:", error);
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

      <Card>
        <CardHeader>
          <CardTitle>{t("styleSettings")}</CardTitle>
          <CardDescription>{t("styleSettingsDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tone">{t("tone")}</Label>
                <span className="text-sm text-muted-foreground">{tone[0]}/10</span>
              </div>
              <Slider
                id="tone"
                min={1}
                max={10}
                step={1}
                value={tone}
                onValueChange={setTone}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t("veryFormal")}</span>
                <span>{t("veryCasual")}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">{t("length")}</Label>
              <Select value={preferredLength} onValueChange={(v) => setPreferredLength(v as any)}>
                <SelectTrigger id="length">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="court">{t("short")}</SelectItem>
                  <SelectItem value="moyen">{t("medium")}</SelectItem>
                  <SelectItem value="long">{t("long")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emoji">{t("emoji")}</Label>
              <Select value={emojiFrequency} onValueChange={(v) => setEmojiFrequency(v as any)}>
                <SelectTrigger id="emoji">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jamais">{t("never")}</SelectItem>
                  <SelectItem value="rarement">{t("rarely")}</SelectItem>
                  <SelectItem value="parfois">{t("sometimes")}</SelectItem>
                  <SelectItem value="souvent">{t("often")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hashtags">{t("hashtags")}</Label>
              <Select value={hashtagStyle} onValueChange={(v) => setHashtagStyle(v as any)}>
                <SelectTrigger id="hashtags">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">{t("minimal")}</SelectItem>
                  <SelectItem value="modéré">{t("moderate")}</SelectItem>
                  <SelectItem value="abondant">{t("abundant")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? tCommon("loading") : t("saveStyle")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
