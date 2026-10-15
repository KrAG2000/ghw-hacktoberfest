import {
  createEvent,
  defaultStartsAt,
  filterByAudience,
  isPastEvent,
  sampleWeek,
  sortByStart,
} from "./events.mjs?v=2";

const STORAGE_KEY = "campus-week-board";
const THEME_KEY = "campus-week-theme";

const form = document.querySelector("#event-form");
const startsAtInput = form.querySelector('[name="startsAt"]');
const list = document.querySelector("#event-list");
const empty = document.querySelector("#empty");
const error = document.querySelector("#form-error");
const count = document.querySelector("#count");
const themeButton = document.querySelector("#theme");
const sampleButton = document.querySelector("#sample");
const clearButton = document.querySelector("#clear");

let events = load();
let audience = "all";

applyTheme(localStorage.getItem(THEME_KEY) || "light");
resetFormDefaults();
render();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  try {
    events.push(
      createEvent({
        name: data.get("name"),
        startsAt: data.get("startsAt"),
        location: data.get("location"),
        audience: data.get("audience"),
      }),
    );
    error.textContent = "";
    form.reset();
    resetFormDefaults();
    audience = "all";
    save();
    render();
  } catch (err) {
    error.textContent = err.message;
  }
});

document.querySelector(".chips").addEventListener("click", (event) => {
  const button = event.target.closest(".chip");
  if (!button) return;
  audience = button.dataset.audience;
  render();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const item = events.find((entry) => entry.id === button.dataset.id);
  if (!item) return;
  if (button.dataset.action === "done") item.done = !item.done;
  if (button.dataset.action === "delete") events = events.filter((entry) => entry.id !== item.id);
  save();
  render();
});

themeButton.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

sampleButton.addEventListener("click", () => {
  events = sampleWeek();
  save();
  render();
});

clearButton.addEventListener("click", () => {
  events = [];
  save();
  render();
});

function render() {
  const now = new Date();
  const visible = sortByStart(filterByAudience(events, audience));
  const upcoming = visible.filter((event) => !isPastEvent(event, now)).length;
  count.textContent =
    visible.length === 0
      ? "0 events"
      : `${visible.length} event${visible.length === 1 ? "" : "s"} · ${upcoming} upcoming`;
  list.replaceChildren(...visible.map((event) => card(event, now)));
  empty.hidden = visible.length !== 0;

  for (const chip of document.querySelectorAll(".chip")) {
    chip.setAttribute("aria-pressed", String(chip.dataset.audience === audience));
  }
}

function card(event, now) {
  const past = isPastEvent(event, now);
  const article = document.createElement("article");
  article.className = [event.done ? "done" : "", past ? "past" : "", "card"].filter(Boolean).join(" ");
  const when = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(event.startsAt));

  article.innerHTML = `
    <button class="icon" type="button" data-action="done" data-id="${event.id}" aria-label="Mark ${escapeHtml(event.name)} done">${event.done ? "✓" : "○"}</button>
    <div>
      <h2>${escapeHtml(event.name)}</h2>
      <p class="meta">${escapeHtml(when)} · ${escapeHtml(event.location)}${past ? " · past" : ""}</p>
      <span class="tag">${escapeHtml(event.audience)}</span>
    </div>
    <button class="ghost" type="button" data-action="delete" data-id="${event.id}">Remove</button>
  `;
  return article;
}

function resetFormDefaults() {
  startsAtInput.value = defaultStartsAt();
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
