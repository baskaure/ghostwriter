"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditorialCalendar } from "@/components/organisms";
import { useTranslations } from "next-intl";

export default function PlanningPage() {
  const t = useTranslations("planning");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">{t("month")}</Button>
          <Button variant="outline">{t("week")}</Button>
          <Button>{t("day")}</Button>
        </div>
      </div>

      <EditorialCalendar />
    </div>
  );
}
