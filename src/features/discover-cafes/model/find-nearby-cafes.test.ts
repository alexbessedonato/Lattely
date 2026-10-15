import assert from "node:assert/strict";
import { test } from "node:test";
import { mockCafes } from "../data/mock-cafes.ts";
import { findNearbyCafes } from "./find-nearby-cafes.ts";

test("includes the 2 km boundary, excludes just beyond it, and preserves input order", () => {
  const center = { latitude: 0, longitude: 0 };
  // Known equatorial positions on a sphere with mean radius 6,371 km.
  const cafes = [
    { ...mockCafes[0], id: "boundary", latitude: 0, longitude: 0.01798643211837461 },
    { ...mockCafes[1], id: "outside", latitude: 0, longitude: 0.017987331439 },
    { ...mockCafes[2], id: "inside", latitude: 0, longitude: 0.008993216059 },
  ];

  const results = findNearbyCafes({ cafes, center });
  assert.deepEqual(results.map(cafe => cafe.id), ["boundary", "inside"]);
  assert.ok(Math.abs(results[0].distanceMeters - 2000) < 0.000001);
  assert.ok(Math.abs(results[1].distanceMeters - 1000) < 0.001);
  assert.equal(cafes.length, 3);
  assert.equal("distanceMeters" in cafes[0], false);
});

test("a center with no nearby cafés returns an empty list", () => {
  assert.deepEqual(findNearbyCafes({
    cafes: mockCafes,
    center: { latitude: 0, longitude: 0 },
  }), []);
});

test("default discovery returns eight cafés in their existing highest-rated order", () => {
  const results = findNearbyCafes({
    cafes: mockCafes,
    center: { latitude: 41.387, longitude: 2.17 },
  });
  assert.deepEqual(results.map(cafe => cafe.id), ["01", "02", "03", "05", "06", "07", "08", "10"]);
  assert.ok(results.every(cafe => cafe.distanceMeters <= 2000));
});
