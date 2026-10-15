# Campus Launch Desk

Cursor challenges from [Global Hack Week: Hacktoberfest](https://www.mlh.com/events/global-hack-week-open-source-90/challenges). Submit on the [challenge dashboard](https://www.mlh.com/events/global-hack-week-open-source-90/challenges).

| Folder | Challenge | What is here |
| --- | --- | --- |
| `01-mini-app` | Build a mini app with Cursor | Working Campus Week Board |
| `02-model-benchmark` | Benchmark Cursor’s models | Same prompt on Grok 4.7, Composer 2.5, and Gemini 4 |

## Run the app

Open `01-mini-app/index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8765
```

Then visit `http://127.0.0.1:8765/01-mini-app/`.

```bash
node --test 01-mini-app/events.test.mjs
```
