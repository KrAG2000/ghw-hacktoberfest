import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createEvent,
  defaultStartsAt,
  filterByAudience,
  isPastEvent,
  parseLocalDateTime,
  sortByStart,
  upcomingEvents,
} from "./events.mjs";

const now = new Date("2026-10-15T08:00:00.000Z");

describe("upcomingEvents", () => {
  it("drops past and invalid dates, then sorts soonest first", () => {
    const events = [
      { name: "Later", startsAt: "2026-10-16T09:00:00.000Z", audience: "public" },
      { name: "Past", startsAt: "2026-10-14T09:00:00.000Z", audience: "public" },
      { name: "Broken", startsAt: "not-a-date", audience: "public" },
      { name: "Soon", startsAt: "2026-10-15T12:00:00.000Z", audience: "students" },
    ];

    const names = upcomingEvents(events, now).map((event) => event.name);
    assert.deepEqual(names, ["Soon", "Later"]);
  });

  it("breaks time ties by name", () => {
    const events = [
      { name: "Zebra", startsAt: "2026-10-15T12:00:00.000Z" },
      { name: "Apple", startsAt: "2026-10-15T12:00:00.000Z" },
    ];
    const names = upcomingEvents(events, now).map((event) => event.name);
    assert.deepEqual(names, ["Apple", "Zebra"]);
  });

  it("returns nothing when now is invalid", () => {
    assert.deepEqual(upcomingEvents([{ name: "A", startsAt: "2026-10-16T00:00:00.000Z" }], "nope"), []);
  });
});

describe("filterByAudience", () => {
  const events = [
    { name: "A", audience: "students" },
    { name: "B", audience: "public" },
  ];

  it("keeps every event when the filter is all", () => {
    assert.equal(filterByAudience(events, "all").length, 2);
  });

  it("keeps one audience", () => {
    assert.deepEqual(
      filterByAudience(events, "students").map((event) => event.name),
      ["A"],
    );
  });
});

describe("createEvent", () => {
  it("rejects a blank name", () => {
    assert.throws(() => createEvent({ name: "  ", startsAt: now, location: "", audience: "public" }), /name/i);
  });

  it("fills Unknown when location is blank", () => {
    const event = createEvent({ name: "Desk hours", startsAt: now, location: "", audience: "hackers" });
    assert.equal(event.location, "Unknown");
    assert.equal(event.audience, "hackers");
    assert.equal(event.done, false);
  });

  it("keeps datetime-local values as local wall time", () => {
    const event = createEvent({
      name: "Local time",
      startsAt: "2026-10-15T22:30",
      location: "Discord",
      audience: "hackers",
    });
    assert.equal(event.startsAt, parseLocalDateTime("2026-10-15T22:30").toISOString());
  });
});

describe("sortByStart and past detection", () => {
  it("lists past events instead of dropping them", () => {
    const events = [
      { name: "Past", startsAt: "2026-10-14T09:00:00.000Z" },
      { name: "Soon", startsAt: "2026-10-15T12:00:00.000Z" },
    ];
    assert.deepEqual(
      sortByStart(events).map((event) => event.name),
      ["Past", "Soon"],
    );
    assert.equal(isPastEvent(events[0], now), true);
    assert.equal(isPastEvent(events[1], now), false);
  });
});

describe("defaultStartsAt", () => {
  it("returns a datetime-local string one hour ahead", () => {
    assert.match(defaultStartsAt(now), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });
});
