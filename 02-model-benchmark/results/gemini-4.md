# Gemini 4

```javascript
/**
 * Edge cases handled:
 * - Non-array `events` input (null, undefined, primitives, objects) returns [].
 * - Invalid `now` input (null, undefined, booleans, empty/whitespace strings, NaN, invalid Date/string) returns [].
 * - Sparse array elements or non-object event entries are safely skipped.
 * - Missing, null, boolean, or invalid `startsAt` values on events are filtered out.
 * - `Date` instances, valid ISO strings, and finite epoch numbers for `startsAt` and `now` are supported.
 * - Missing or non-string `name` properties default to `""` during tie-breaker sorting.
 * - Input array and event objects are not mutated.
 */
function parseTimestamp(value) {
  if (value instanceof Date) {
    const time = value.getTime();
    return Number.isFinite(time) ? time : NaN;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? new Date(value).getTime() : NaN;
  }
  if (typeof value === "string") {
    if (value.trim() === "") return NaN;
    const time = Date.parse(value);
    return Number.isFinite(time) ? time : NaN;
  }
  return NaN;
}

function upcomingEvents(events, now) {
  if (!Array.isArray(events)) {
    return [];
  }

  const nowTime = parseTimestamp(now);
  if (Number.isNaN(nowTime)) {
    return [];
  }

  return events
    .map((event) => {
      if (!event || typeof event !== "object") {
        return null;
      }
      const startTime = parseTimestamp(event.startsAt);
      if (Number.isNaN(startTime) || startTime < nowTime) {
        return null;
      }
      return { event, startTime };
    })
    .filter((item) => item !== null)
    .sort((a, b) => {
      if (a.startTime !== b.startTime) {
        return a.startTime - b.startTime;
      }
      const nameA = typeof a.event.name === "string" ? a.event.name : String(a.event.name ?? "");
      const nameB = typeof b.event.name === "string" ? b.event.name : String(b.event.name ?? "");
      return nameA.localeCompare(nameB);
    })
    .map((item) => item.event);
}
```

## Edge cases

- **Invalid `now` or `startsAt` coercion**: Rejects `null`, `undefined`, booleans, objects, and empty/whitespace strings that `new Date()` would otherwise coerce to epoch `0` or unintended dates.
- **Malformed `events` input**: Safely handles non-array `events` as well as `null`, `undefined`, or primitive entries inside the array without throwing a `TypeError`.
- **Precomputed timestamps & immutability**: Parses each event's timestamp once before sorting and returns a new filtered/sorted array without mutating the original array.
- **Tie-breaker safety**: Normalizes missing or non-string `name` values to strings before comparing with `localeCompare` when two events share the exact same `startsAt` timestamp.
- **Weakness**: Relies on `Date.parse` for string dates and `localeCompare` without a fixed locale—non-ISO date strings without timezone offsets may be interpreted in the host's local timezone, and tie-breaker ordering can vary subtly across runtime locales.
