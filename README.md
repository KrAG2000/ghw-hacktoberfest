# Campus Launch Desk

One repo for [Global Hack Week: Hacktoberfest](https://www.mlh.com/events/global-hack-week-open-source-90/challenges) challenges 1–7. Submit on the [challenge dashboard](https://www.mlh.com/events/global-hack-week-open-source-90/challenges).

| Folder | Challenge | What is here |
| --- | --- | --- |
| `01-mini-app` | Build a mini app with Cursor | Working Campus Week Board |
| `02-model-benchmark` | Benchmark Cursor’s models | Same prompt on Grok 4.7, Composer 2.5, and Gemini 4 |
| `03-grok-bot` | Create your first Grok Bot | Name and job for **Campus Desk** |
| `04-first-task` | Teach Grok Bot your first task | Schedule skill and weekday routine text |
| `05-campus-opportunities` | Campus opportunities database | Prompt plus an empty seven-column CSV |
| `06-browser-workflow` | Teach a browser workflow | Skill rules and a second-run result file |
| `07-launch-relay` | Two-bot launch relay | Both bot jobs and a `launch-desk` folder |

Challenges 3–7 still need screenshots from the Grok Bot app.

## Run the app

Open `01-mini-app/index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8765
```

Then visit `http://127.0.0.1:8765/01-mini-app/`.

```bash
node --test 01-mini-app/events.test.mjs
```
