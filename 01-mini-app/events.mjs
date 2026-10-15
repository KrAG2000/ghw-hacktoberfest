/**
 * Pure helpers for the Campus Week Board.
 * Kept separate from the page so the same rules can be tested
 * and reused as the Challenge 2 benchmark prompt.
 */

export function isValidDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return !Number.isNaN(date.getTime());
}

export function sortByStart(events) {
  return events
    .filter((event) => isValidDate(event?.startsAt))
    .slice()
    .sort((a, b) => {
      const delta = new Date(a.startsAt) - new Date(b.startsAt);
      if (delta !== 0) return delta;
      return String(a.name ?? "").localeCompare(String(b.name ?? ""));
    });
}

export function upcomingEvents(events, now) {
  const cutoff = now instanceof Date ? now : new Date(now);
  if (!isValidDate(cutoff)) return [];

  return sortByStart(events).filter((event) => new Date(event.startsAt) >= cutoff);
}

export function isPastEvent(event, now = new Date()) {
  const cutoff = now instanceof Date ? now : new Date(now);
  if (!isValidDate(cutoff) || !isValidDate(event?.startsAt)) return false;
  return new Date(event.startsAt) < cutoff;
}

/** datetime-local values have no timezone; treat them as local wall time. */
export function parseLocalDateTime(value) {
  if (value instanceof Date) return isValidDate(value) ? value : null;
  if (typeof value !== "string") return isValidDate(value) ? new Date(value) : null;

  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (match) {
    const [, year, month, day, hour, minute, second = "0"] = match;
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
      0,
    );
    return isValidDate(date) ? date : null;
  }

  const date = new Date(value);
  return isValidDate(date) ? date : null;
}

export function filterByAudience(events, audience) {
  if (!audience || audience === "all") return events.slice();
  return events.filter((event) => event.audience === audience);
}

export function createEvent({ name, startsAt, location, audience }) {
  const trimmed = String(name ?? "").trim();
  if (!trimmed) throw new Error("Event name is required.");
  const start = parseLocalDateTime(startsAt);
  if (!start) throw new Error("Start time is not a valid date.");

  return {
    id: crypto.randomUUID(),
    name: trimmed,
    startsAt: start.toISOString(),
    location: String(location ?? "").trim() || "Unknown",
    audience: audience || "public",
    done: false,
  };
}

export function defaultStartsAt(now = new Date()) {
  const start = new Date(now);
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);
  const pad = (n) => String(n).padStart(2, "0");
  return `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}T${pad(start.getHours())}:${pad(start.getMinutes())}`;
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
