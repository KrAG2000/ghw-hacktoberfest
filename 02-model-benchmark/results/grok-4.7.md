# Grok 4.7

```javascript
function upcomingEvents(events, now) {
  // Invalid now → []; unparseable startsAt dropped; start === now kept;
  // equal starts sort by name; filter/sort use a new array so input stays put.
  const nowMs = epochMs(now);
  if (nowMs === null) return [];

  return events
    .filter((event) => {
      const startMs = epochMs(event && event.startsAt);
      return startMs !== null && startMs >= nowMs;
    })
    .sort((a, b) => {
      const diff = epochMs(a.startsAt) - epochMs(b.startsAt);
      if (diff !== 0) return diff;
      const nameA = String(a.name ?? "");
      const nameB = String(b.name ?? "");
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
}

function epochMs(value) {
  if (value instanceof Date) {
    const ms = value.getTime();
    return Number.isNaN(ms) ? null : ms;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return null;
    const ms = new Date(value).getTime();
    return Number.isNaN(ms) ? null : ms;
  }
  if (typeof value === "string") {
    if (value.trim() === "") return null;
    const ms = new Date(value).getTime();
    return Number.isNaN(ms) ? null : ms;
  }
  return null;
}
```

## Edge cases

- `now` that is `null`, `undefined`, blank, `NaN`, an invalid `Date`, or any other non-date returns `[]`.
- An event with a missing or unparseable `startsAt` is left out; a start equal to `now` is kept.
- Soonest start wins; the same instant is ordered by `name` (missing names sort as `""`).
- `filter` then `sort` run on a new array, so the input array’s order and contents stay unchanged.
- Only `Date`, finite numbers, and non-blank strings count as dates, so booleans and plain objects are not coerced into timestamps.
- Weakness: a non-array `events` value throws, and date-only strings like `"2026-10-15"` are parsed as UTC midnight, which can disagree with a local `now`.
