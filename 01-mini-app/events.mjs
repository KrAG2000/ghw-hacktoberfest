/**
 * Pure helpers for the Campus Week Board.
 * Kept separate from the page so the same rules can be tested
 * and reused as the Challenge 2 benchmark prompt.
 */

export function isValidDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return !Number.isNaN(date.getTime());
}

export function upcomingEvents(events, now) {
  const cutoff = now instanceof Date ? now : new Date(now);
  if (!isValidDate(cutoff)) return [];

  return events
    .filter((event) => isValidDate(event?.startsAt) && new Date(event.startsAt) >= cutoff)
    .slice()
    .sort((a, b) => {
      const delta = new Date(a.startsAt) - new Date(b.startsAt);
      if (delta !== 0) return delta;
      return a.name.localeCompare(b.name);
    });
}

export function filterByAudience(events, audience) {
  if (!audience || audience === "all") return events.slice();
  return events.filter((event) => event.audience === audience);
}

export function createEvent({ name, startsAt, location, audience }) {
  const trimmed = String(name ?? "").trim();
  if (!trimmed) throw new Error("Event name is required.");
  if (!isValidDate(startsAt)) throw new Error("Start time is not a valid date.");

  return {
    id: crypto.randomUUID(),
    name: trimmed,
    startsAt: new Date(startsAt).toISOString(),
    location: String(location ?? "").trim() || "Unknown",
    audience: audience || "public",
    done: false,
  };
}

export function sampleWeek(now = new Date()) {
  const start = new Date(now instanceof Date ? now : new Date(now));
  start.setMinutes(0, 0, 0);
  start.setMilliseconds(0);
  const at = (hoursAhead) => new Date(start.getTime() + hoursAhead * 60 * 60 * 1000).toISOString();

  return [
    {
      id: "sample-opening",
      name: "Hall table: sticker swap",
      startsAt: at(8),
      location: "Student center lobby",
      audience: "students",
      done: false,
    },
    {
      id: "sample-workshop",
      name: "Open source office hours",
      startsAt: at(32),
      location: "Library room 2",
      audience: "hackers",
      done: false,
    },
    {
      id: "sample-club",
      name: "Club showcase night",
      startsAt: at(56),
      location: "Quad lawn",
      audience: "club",
      done: false,
    },
    {
      id: "sample-public",
      name: "City library code club",
      startsAt: at(80),
      location: "Main library",
      audience: "public",
      done: false,
    },
  ];
}
