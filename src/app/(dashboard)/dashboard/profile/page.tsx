"use client";

import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ProfileOverviewPage() {
  const { profile: user, isLoading } = useProfile();

  if (isLoading && !user) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Vue d'ensemble</h2>
          <p className="text-sm text-muted-foreground">
            Chargement des informations...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Vue d'ensemble</h2>
          <p className="text-sm text-muted-foreground">
            Aucune information utilisateur disponible.
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
        <h2 className="text-xl font-semibold">Vue d'ensemble</h2>
        <p className="text-sm text-muted-foreground">
          Informations générales de votre compte
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Nom</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Plan</p>
              <Badge variant="outline" className="text-xs">
                {user.plan.toUpperCase()}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Compte créé le</p>
              <p className="font-medium">{createdAt}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Dernière connexion
              </p>
              <p className="font-medium">{lastLoginAt}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Préférences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Langue</p>
              <p className="font-medium">
                {user.preferences.language.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fuseau horaire</p>
              <p className="font-medium">{user.preferences.timezone}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Notifications</p>
              <div className="mt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={user.preferences.notifications.email ? "outline" : "secondary"}
                    className="text-xs"
                  >
                    Email
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {user.preferences.notifications.email ? "Activé" : "Désactivé"}
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
                    {user.preferences.notifications.push ? "Activé" : "Désactivé"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={user.preferences.notifications.weeklyReport ? "outline" : "secondary"}
                    className="text-xs"
                  >
                    Rapport hebdo
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {user.preferences.notifications.weeklyReport ? "Activé" : "Désactivé"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Style d'écriture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {user.styleProfile ? (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">Ton</p>
                  <p className="font-medium">
                    {user.styleProfile.tone}/10 (1 = très formel, 10 = très casual)
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Longueur préférée
                  </p>
                  <p className="font-medium">{user.styleProfile.preferredLength}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Fréquence des emojis
                  </p>
                  <p className="font-medium">
                    {user.styleProfile.emojiFrequency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Style de hashtags
                  </p>
                  <p className="font-medium">
                    {user.styleProfile.hashtagStyle}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Aucune préférence de style définie pour le moment.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Comptes connectés</CardTitle>
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
                  : "Non connecté"}
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
                  : "Non connecté"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

