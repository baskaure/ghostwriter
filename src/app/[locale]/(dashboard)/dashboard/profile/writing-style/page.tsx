"use client";

import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WritingStylePage() {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Style d'écriture</h2>
          <p className="text-sm text-muted-foreground">
            Chargement du style d'écriture...
          </p>
        </div>
      </div>
    );
  }

  const styleProfile = profile?.styleProfile;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Style d'écriture</h2>
        <p className="text-sm text-muted-foreground">
          Personnalisez le style de vos posts générés par l'IA
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de style</CardTitle>
          <CardDescription>
            Ajustez ces paramètres pour que l'IA génère du contenu qui correspond à votre style
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tone">Ton de voix</Label>
                <span className="text-sm text-muted-foreground">
                  {styleProfile?.tone ?? 5}/10
                </span>
              </div>
              <Slider
                id="tone"
                min={1}
                max={10}
                step={1}
                defaultValue={[styleProfile?.tone ?? 5]}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Très formel</span>
                <span>Très casual</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Longueur préférée</Label>
              <Select defaultValue={styleProfile?.preferredLength ?? "moyen"}>
                <SelectTrigger id="length">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="court">Court (50-150 caractères)</SelectItem>
                  <SelectItem value="moyen">Moyen (150-300 caractères)</SelectItem>
                  <SelectItem value="long">Long (300+ caractères)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emoji">Fréquence des emojis</Label>
              <Select defaultValue={styleProfile?.emojiFrequency ?? "parfois"}>
                <SelectTrigger id="emoji">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jamais">Jamais</SelectItem>
                  <SelectItem value="rarement">Rarement</SelectItem>
                  <SelectItem value="parfois">Parfois</SelectItem>
                  <SelectItem value="souvent">Souvent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hashtags">Style de hashtags</Label>
              <Select defaultValue={styleProfile?.hashtagStyle ?? "modéré"}>
                <SelectTrigger id="hashtags">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal (0-2 hashtags)</SelectItem>
                  <SelectItem value="modéré">Modéré (3-5 hashtags)</SelectItem>
                  <SelectItem value="abondant">Abondant (6+ hashtags)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button>Enregistrer le style</Button>
        </CardContent>
      </Card>
    </div>
  );
}
