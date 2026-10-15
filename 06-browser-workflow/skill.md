# Campus Desk event lookup

## Changeable input

A search word. The rest of this skill stays the same when the word changes.

## Steps

1. Open source pages in this order and stop at the first page that returns readable event text:
   - https://ghw.mlh.com/schedule
   - https://www.mlh.com/events/global-hack-week-open-source-90/challenges
   - https://ghw.mlh.com/
2. Read the event titles and times shown on that page. Do not follow Register, Book, or similar links.
3. Keep events whose visible title contains the search word, ignoring letter case.
4. Record the source URL of the page that supplied the text and the time the page was checked.
5. When the page has at least three matches, return at least three. When it has fewer, return only those real matches. When it has none, return `no matches`.

## Rules

- Record the source URL and the check time.
- Return at least three results when the page has them.
- Say `no matches` instead of guessing.
- Stop if the page is blocked or asks for a sensitive action.
- Never register, book, send, or purchase.
