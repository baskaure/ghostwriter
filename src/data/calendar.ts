import type { Post } from "@/types/post";

export interface CalendarEvent {
  id: string;
  postId: string;
  title: string;
  content: string;
  platform: "linkedin" | "twitter";
  scheduledFor: string;
  status: "scheduled" | "published" | "cancelled";
  createdAt: string;
}

export interface CalendarData {
  events: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
  pastEvents: CalendarEvent[];
}

const mockEvents: CalendarEvent[] = [
  {
    id: "event-1",
    postId: "post-example-3",
    title: "Conseil - Marketing digital",
    content: "Les 3 erreurs à éviter en marketing digital...",
    platform: "linkedin",
    scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "scheduled",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "event-2",
    postId: "post-example-6",
    title: "Story - Productivité",
    content: "Comment j'ai amélioré ma productivité...",
    platform: "linkedin",
    scheduledFor: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "scheduled",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "event-3",
    postId: "post-example-7",
    title: "Thread - IA",
    content: "Thread sur l'impact de l'IA...",
    platform: "twitter",
    scheduledFor: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "scheduled",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "event-4",
    postId: "post-example-1",
    title: "Conseil - Télétravail",
    content: "5 conseils pour améliorer votre productivité...",
    platform: "linkedin",
    scheduledFor: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "published",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function getCalendarEvents(
  startDate?: string,
  endDate?: string
): Promise<CalendarData> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const now = new Date();
  const events = mockEvents.filter((event) => {
    const eventDate = new Date(event.scheduledFor);
    if (startDate && eventDate < new Date(startDate)) return false;
    if (endDate && eventDate > new Date(endDate)) return false;
    return true;
  });

  const upcomingEvents = events.filter(
    (event) => new Date(event.scheduledFor) >= now
  );
  const pastEvents = events.filter(
    (event) => new Date(event.scheduledFor) < now
  );

  return {
    events,
    upcomingEvents: upcomingEvents.sort(
      (a, b) =>
        new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
    ),
    pastEvents: pastEvents.sort(
      (a, b) =>
        new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime()
    ),
  };
}

export async function getCalendarEventsByMonth(
  year: number,
  month: number
): Promise<CalendarEvent[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  return mockEvents.filter((event) => {
    const eventDate = new Date(event.scheduledFor);
    return eventDate >= startDate && eventDate <= endDate;
  });
}

export async function createCalendarEvent(
  postId: string,
  scheduledFor: string
): Promise<CalendarEvent> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newEvent: CalendarEvent = {
    id: `event-${Date.now()}`,
    postId,
    title: "Nouveau post",
    content: "",
    platform: "linkedin",
    scheduledFor,
    status: "scheduled",
    createdAt: new Date().toISOString(),
  };

  mockEvents.push(newEvent);
  return newEvent;
}

export async function updateCalendarEvent(
  eventId: string,
  updates: Partial<CalendarEvent>
): Promise<CalendarEvent> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const eventIndex = mockEvents.findIndex((e) => e.id === eventId);
  if (eventIndex === -1) {
    throw new Error("Événement non trouvé");
  }

  mockEvents[eventIndex] = { ...mockEvents[eventIndex], ...updates };
  return mockEvents[eventIndex];
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const eventIndex = mockEvents.findIndex((e) => e.id === eventId);
  if (eventIndex !== -1) {
    mockEvents.splice(eventIndex, 1);
  }
}
