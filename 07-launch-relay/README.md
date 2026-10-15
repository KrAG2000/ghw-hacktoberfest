# Challenge 7 — Two-bot launch relay

Two bots, one conversation, three files. Nothing gets published.

## Bots

**Source Editor** job:

```text
Verify facts, preserve source links, use Unknown for missing information, and save work as launch-desk/source-brief.md. Ask before contacting anyone or publishing.
```

**Launch Producer** job:

```text
Read an approved brief and create a 120- to 180-word launch-desk/announcement-draft.md plus launch-desk/run-of-show.csv with at least five rows. The run of show must use the columns Time, Owner, Action, and Status. Use only the approved brief. Ask before sending, publishing, purchasing, or changing an external system.
```

## Constraints for this run

- Audience: students finishing Global Hack Week
- Tone: specific and friendly
- Call to action: open the challenge dashboard and submit before the week closes
- Source page: https://ghw.mlh.com/

## Message for Source Editor

```text
Build the brief from https://ghw.mlh.com/. Use these announcement constraints: Audience: students finishing Global Hack Week; Tone: specific and friendly; Call to action: open the challenge dashboard and submit before the week closes. Verify facts, preserve source links, use Unknown for missing information, save the brief as launch-desk/source-brief.md, and stop for my approval before handing it to Launch Producer. Do not contact anyone or publish anything.
```

After you approve the brief, tell Source Editor to invoke Launch Producer and bring the result back in the same chat. Then ask Source Editor to compare both files with the brief and save `launch-desk/qa-notes.md` with either **Pass** or a short fix list.

`launch-desk/` in this folder is the local copy of those three deliverables. Leave the placeholders until the bots write the real text.

## Submit

- Screenshot of Source Editor calling Launch Producer in one chat.
- The announcement and the run of show.
- Screenshot of the folder and `qa-notes.md` showing **Pass**.
