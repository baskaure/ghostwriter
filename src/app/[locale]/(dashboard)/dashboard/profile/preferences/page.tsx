"use client";

import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function PreferencesPage() {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Préférences</h2>
          <p className="text-sm text-muted-foreground">
            Chargement des préférences...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Préférences</h2>
          <p className="text-sm text-muted-foreground">
            Aucune information disponible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Préférences</h2>
        <p className="text-sm text-muted-foreground">
          Gérez vos préférences de langue, fuseau horaire et notifications
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Langue et région</CardTitle>
            <CardDescription>
              Configurez votre langue et votre fuseau horaire
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select defaultValue={profile.preferences.language}>
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
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select defaultValue={profile.preferences.timezone}>
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
            <Button>Enregistrer les modifications</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choisissez comment vous souhaitez recevoir les notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Notifications par email</Label>
                <p className="text-xs text-muted-foreground">
                  Recevez des notifications importantes par email
                </p>
              </div>
              <Switch
                id="email-notifications"
                defaultChecked={profile.preferences.notifications.email}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Notifications push</Label>
                <p className="text-xs text-muted-foreground">
                  Recevez des notifications dans votre navigateur
                </p>
              </div>
              <Switch
                id="push-notifications"
                defaultChecked={profile.preferences.notifications.push}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-report">Rapport hebdomadaire</Label>
                <p className="text-xs text-muted-foreground">
                  Recevez un résumé hebdomadaire de votre activité
                </p>
              </div>
              <Switch
                id="weekly-report"
                defaultChecked={profile.preferences.notifications.weeklyReport}
              />
            </div>
            <Button>Enregistrer les modifications</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
