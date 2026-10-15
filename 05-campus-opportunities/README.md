# Challenge 5 — Campus Opportunities table

Ask **Campus Desk** to write five current events into a table. The fallback file for this repo is `campus-opportunities.csv`.

## Prompt

```text
Using this calendar URL: https://ghw.mlh.com/schedule, create a table named Campus Opportunities in the local file campus-opportunities.csv with the next five events. Use the columns Event, Date and time, Location, Audience, Registration URL, Source URL, and Checked at. Checked at means the date and time you verified the event against the source page. Use Unknown when the page does not provide a value. Do not register, contact an organizer, or publish anything.
```

If the schedule blocks the bot, save a PDF or screenshot of the page and say the Source URL is `Attached copy`.

Sort the finished table by date. Check one row against the live page, then ask the bot to fix any value the page does not support.

## Submit

- Screenshot of the chat showing the table is done.
- Screenshot of five rows and all seven columns, sorted by date.
- The calendar URL, plus one sentence naming the row you checked.

The CSV in this folder is headers only until the bot fills it. Do not invent event rows here.
