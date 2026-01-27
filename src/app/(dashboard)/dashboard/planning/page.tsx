import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditorialCalendar } from "@/components/organisms";

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

      <EditorialCalendar />
    </div>
  );
}

