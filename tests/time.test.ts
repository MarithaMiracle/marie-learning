import assert from "node:assert/strict";
import test from "node:test";
import { formatWhen, utcToZonedInputValue, zonedTimeToUtc } from "../src/lib/time";

test("converts a London local time to UTC in winter", () => {
  const utc = zonedTimeToUtc("2026-01-15T09:30", "Europe/London");
  assert.equal(utc.toISOString(), "2026-01-15T09:30:00.000Z");
  assert.equal(utcToZonedInputValue(utc, "Europe/London"), "2026-01-15T09:30");
});

test("shows the same instant in a student time zone", () => {
  const utc = zonedTimeToUtc("2026-01-15T15:00", "Europe/London");
  const shown = formatWhen(utc, "Africa/Lagos");
  assert.match(shown, /16:00/);
});
