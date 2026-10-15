# Challenge 2 — Same prompt, three models

Run this prompt once per model in a new Cursor chat. Keep the prompt identical. Suggested lineup: Grok 4.7, Composer 2.5, and one more model from the picker.

## Prompt

```text
Write a JavaScript function upcomingEvents(events, now).

Each event is { name, startsAt, location, audience }.
Return only events whose startsAt is a valid date on or after now.
Sort soonest first. If two events start at the same time, sort by name.
If now is not a valid date, return an empty array.
Do not mutate the input array.
Add a short comment listing the edge cases you handled.
```

## What to submit

- The models you used and a pro/con for each.
- A screenshot of the three replies, or of `COMPARISON.md` filled in.

`results/grok-4.7.md` is the reply from this session. The other two slots are blank on purpose.
