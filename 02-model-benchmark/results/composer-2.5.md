# Composer 2.5

```javascript
/**
 * Returns upcoming events sorted by start time, then name.
 * Edge cases: invalid `now` → []; invalid/missing `startsAt` excluded;
 * events strictly before `now` excluded; tie-break by name; no input mutation.
 */
function upcomingEvents(events, now) {
  const nowMs = Date.parse(now);
  if (Number.isNaN(nowMs)) {
    return [];
  }

  return events
    .filter((event) => {
      const startMs = Date.parse(event.startsAt);
      return !Number.isNaN(startMs) && startMs >= nowMs;
    })
    .slice()
    .sort((a, b) => {
      const diff = Date.parse(a.startsAt) - Date.parse(b.startsAt);
      if (diff !== 0) return diff;
      return a.name.localeCompare(b.name);
    });
}
```

## Edge cases

- **Invalid `now`**: Any unparseable `now` yields an empty array instead of comparing against `NaN`.
- **Invalid event dates**: Events with missing or unparseable `startsAt` are dropped rather than treated as upcoming.
- **Boundary at `now`**: Events whose start time equals `now` (same millisecond) are included (`>=`).
- **Stable tie-breaking**: Equal `startsAt` values are ordered with `localeCompare` on `name`.
- **Immutability**: Filtering uses a new array chain and `.slice()` before `.sort()` so the caller’s `events` array is unchanged.
- **Weakness**: Relies on `Date.parse`, so behavior for ambiguous strings (e.g. locale-dependent formats) follows the engine’s parsing rules and may differ across environments.
