# Challenge 6 — Browser workflow that takes a new input

Teach **Campus Desk** a repeatable lookup. Run it a second time with a different word.

## Mission

Campus events on https://ghw.mlh.com/schedule.

- First input: `workshop`
- Second input: `ceremony`
- What must change: the search word.

## Rules to add to the skill

- Record the source URL and the check time.
- Return at least three results when the page has them.
- Say `no matches` instead of guessing.
- Stop if the page is blocked or asks for a sensitive action.
- Never register, book, send, or purchase without approval.

## Second run

In chat, type `/`, choose the new skill, and ask for `ceremony`. Save the result as `browser-workflow-result.csv` in this folder, or on the bot's computer and copy it here.

## Submit

- Screenshot of the skill text showing the changeable input and the stop rule.
- Screenshot of the second run.
- The result file, or a screenshot with three sourced rows or a clear `no matches`.
