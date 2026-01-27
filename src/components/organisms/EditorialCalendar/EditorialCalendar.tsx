"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  type CalendarEvent,
  getCalendarEvents,
  getCalendarEventsByMonth,
} from "@/data/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Linkedin, Twitter } from "lucide-react";

const daysShort = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getMonthMatrix(date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days = eachDayOfInterval({ start, end });

  const firstWeekday = (getDay(start) + 6) % 7;
  const leadingEmpty = Array.from({ length: firstWeekday }).map((_, i) => ({
    key: `empty-start-${i}`,
    date: null as Date | null,
  }));
  const items = [
    ...leadingEmpty,
    ...days.map((d) => ({ key: d.toISOString(), date: d })),
  ];

  const rows: Array<Array<{ key: string; date: Date | null }>> = [];
  for (let i = 0; i < items.length; i += 7) {
    rows.push(items.slice(i, i + 7));
  }
  return rows;
}

interface EditorialCalendarProps {
  className?: string;
}

export function EditorialCalendar({ className }: EditorialCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [upcoming, setUpcoming] = useState<CalendarEvent[]>([]);
  const [isLoadingMonth, setIsLoadingMonth] = useState(false);

  useEffect(() => {
    const fetchMonth = async () => {
      setIsLoadingMonth(true);
      try {
        const monthEvents = await getCalendarEventsByMonth(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1
        );
        setEvents(monthEvents);
      } finally {
        setIsLoadingMonth(false);
      }
    };
    fetchMonth();
  }, [currentMonth]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const data = await getCalendarEvents();
      setUpcoming(data.upcomingEvents.slice(0, 5));
    };
    fetchUpcoming();
  }, []);

  const monthMatrix = useMemo(() => getMonthMatrix(currentMonth), [currentMonth]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const key = event.scheduledFor.split("T")[0];
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(event);
    }
    return map;
  }, [events]);

  const selectedKey = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;
  const selectedEvents = selectedKey ? eventsByDay.get(selectedKey) || [] : [];

  const handlePrevMonth = () => setCurrentMonth((d) => subMonths(d, 1));
  const handleNextMonth = () => setCurrentMonth((d) => addMonths(d, 1));

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[2fr,1.4fr]", className)}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold">
              {format(currentMonth, "MMMM yyyy", { locale: fr })}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Cliquez sur une date pour voir les posts planifiés
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
            {daysShort.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm">
            {monthMatrix.map((week, wi) =>
              week.map((item) => {
                if (!item.date) {
                  return <div key={`${item.key}-${wi}`} />;
                }
                const key = item.date.toISOString().split("T")[0];
                const dayEvents = eventsByDay.get(key) || [];
                const isSelected =
                  selectedDate && isSameDay(item.date, selectedDate);
                const today = isToday(item.date);

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedDate(item.date)}
                    className={cn(
                      "flex h-16 flex-col rounded-md border bg-background px-1.5 py-1 text-left text-xs transition-colors",
                      dayEvents.length > 0 && "border-primary/50",
                      isSelected && "border-primary bg-primary/5",
                      !isSelected && today && "border-dashed border-primary/60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">
                        {format(item.date, "d")}
                      </span>
                      {today && (
                        <span className="rounded-full bg-primary/10 px-1 text-[9px] font-medium text-primary">
                          Aujourd'hui
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-0.5">
                      {dayEvents.slice(0, 3).map((event) => (
                        <Badge
                          key={event.id}
                          variant={
                            event.platform === "linkedin"
                              ? "outline"
                              : "secondary"
                          }
                          className="flex items-center gap-1 px-1 text-[9px]"
                        >
                          {event.platform === "linkedin" ? (
                            <Linkedin className="h-3 w-3" />
                          ) : (
                            <Twitter className="h-3 w-3" />
                          )}
                          <span className="truncate">{event.title}</span>
                        </Badge>
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[9px] text-muted-foreground">
                          +{dayEvents.length - 3}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
          {isLoadingMonth && (
            <p className="text-xs text-muted-foreground">Mise à jour...</p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Posts du{" "}
              {selectedDate
                ? format(selectedDate, "d MMMM yyyy", { locale: fr })
                : "jour"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucun post prévu ce jour-là.
              </p>
            ) : (
              <div className="space-y-3">
                {selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between rounded-lg border p-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {event.platform === "linkedin" ? (
                          <Linkedin className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Twitter className="h-4 w-4 text-sky-500" />
                        )}
                        <span className="text-xs uppercase text-muted-foreground">
                          {event.platform}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{event.title}</p>
                      {event.content && (
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {event.content}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={
                        event.status === "scheduled" ? "outline" : "secondary"
                      }
                    >
                      {event.status === "scheduled" ? "Planifié" : "Publié"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Prochains posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucun post à venir.
              </p>
            ) : (
              <div className="space-y-3">
                {upcoming.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(
                          new Date(event.scheduledFor),
                          "EEEE d MMMM à HH'h'mm",
                          {
                            locale: fr,
                          }
                        )}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.platform === "linkedin" ? "LinkedIn" : "Twitter"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

