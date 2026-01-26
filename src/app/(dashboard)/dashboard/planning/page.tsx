import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function PlanningPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planning</h1>
          <p className="text-muted-foreground">
            Calendrier éditorial de vos publications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Mois</Button>
          <Button variant="outline">Semaine</Button>
          <Button>Jour</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendrier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[600px] items-center justify-center rounded-lg border-2 border-dashed">
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Vue calendrier à implémenter
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posts à venir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Post LinkedIn - Conseils productivité</p>
                <p className="text-sm text-muted-foreground">
                  Lundi 15 janvier 2024 à 9h00
                </p>
              </div>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Post Twitter - Thread sur l'IA</p>
                <p className="text-sm text-muted-foreground">
                  Mercredi 17 janvier 2024 à 14h00
                </p>
              </div>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

