# Comparison

Same prompt, three fresh runs. Scored afterward on one shared fixture: drop past and invalid dates, keep a start equal to `now`, sort ties by name, leave the input array unchanged, and return `[]` for an invalid `now`.

| | Grok 4.7 | Composer 2.5 | Gemini 4 |
| --- | --- | --- | --- |
| Run | 02:01:34–02:02:05 IST | 02:01:32–02:01:36 IST | 02:01:34–02:01:51 IST |
| Elapsed | 31s | 4s | 17s |
| Correct order on the fixture | Apple, Zebra, Later | Apple, Zebra, Later | Apple, Zebra, Later |
| Invalid `now` returns `[]` | yes | yes | yes |
| Input array unchanged | yes | yes | yes |
| Non-array `events` | throws TypeError | throws TypeError | returns `[]` |
| What it did well | Accepts `Date`, numbers, and strings, and missing names sort as empty strings | Shortest correct answer. Filter then `slice` then `sort` makes the copy obvious | Guards bad input and parses each timestamp once before sorting |
| What it missed | A non-array `events` value throws. Date-only strings are UTC midnight | `Date.parse` on loose strings is engine-dependent, and a missing `name` throws on the tie-break | Longest of the three. String dates without a timezone still depend on the host |
