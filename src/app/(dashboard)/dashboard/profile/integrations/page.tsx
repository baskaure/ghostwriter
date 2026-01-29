"use client";

import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Link2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function IntegrationsPage() {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Intégrations</h2>
          <p className="text-sm text-muted-foreground">
            Chargement des intégrations...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Intégrations</h2>
          <p className="text-sm text-muted-foreground">
            Aucune information disponible.
          </p>
        </div>
      </div>
    );
  }

  const linkedin = profile.connectedAccounts.linkedin;
  const twitter = profile.connectedAccounts.twitter;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Intégrations</h2>
        <p className="text-sm text-muted-foreground">
          Connectez vos comptes sociaux pour publier directement depuis Ghostwriter Pro
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  LinkedIn
                </CardTitle>
                <CardDescription>
                  Publiez vos posts directement sur LinkedIn
                </CardDescription>
              </div>
              {linkedin.connected ? (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" />
                  Connecté
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <X className="h-3 w-3" />
                  Non connecté
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {linkedin.connected ? (
              <>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Compte</p>
                  <p className="font-medium">{linkedin.username}</p>
                </div>
                {linkedin.connectedAt && (
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">Connecté le</p>
                    <p className="font-medium">
                      {format(new Date(linkedin.connectedAt), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </p>
                  </div>
                )}
                <Button variant="outline" className="w-full">
                  Déconnecter
                </Button>
              </>
            ) : (
              <Button className="w-full">Connecter LinkedIn</Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5" />
                  Twitter/X
                </CardTitle>
                <CardDescription>
                  Publiez vos posts directement sur Twitter/X
                </CardDescription>
              </div>
              {twitter.connected ? (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" />
                  Connecté
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <X className="h-3 w-3" />
                  Non connecté
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {twitter.connected ? (
              <>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Compte</p>
                  <p className="font-medium">{twitter.username}</p>
                </div>
                {twitter.connectedAt && (
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">Connecté le</p>
                    <p className="font-medium">
                      {format(new Date(twitter.connectedAt), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </p>
                  </div>
                )}
                <Button variant="outline" className="w-full">
                  Déconnecter
                </Button>
              </>
            ) : (
              <Button className="w-full">Connecter Twitter/X</Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
