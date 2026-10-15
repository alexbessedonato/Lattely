import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateHaversineDistance } from "./calculate-haversine-distance.ts";

test("the distance from a location to itself is zero meters", () => {
  const center = { latitude: 41.387, longitude: 2.17 };
  assert.equal(calculateHaversineDistance(center, center), 0);
});

test("one degree along the equator is approximately 111,195 meters", () => {
  const distance = calculateHaversineDistance(
    { latitude: 0, longitude: 0 },
    { latitude: 0, longitude: 1 },
  );
  assert.ok(Math.abs(distance - 111_195) < 1);
});
