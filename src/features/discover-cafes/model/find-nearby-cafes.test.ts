import assert from "node:assert/strict";
import { test } from "node:test";
import { mockCafes } from "../data/mock-cafes.ts";
import { findNearbyCafes } from "./find-nearby-cafes.ts";

test("includes the 2 km boundary and excludes just beyond it without mutating fixtures", () => {
  const center = { latitude: 0, longitude: 0 };
  // Known equatorial positions on a sphere with mean radius 6,371 km.
  const cafes = [
    {
      ...mockCafes[0],
      id: "boundary",
      latitude: 0,
      longitude: 0.01798643211837461,
    },
    { ...mockCafes[1], id: "outside", latitude: 0, longitude: 0.017987331439 },
    { ...mockCafes[2], id: "inside", latitude: 0, longitude: 0.008993216059 },
  ];

  const results = findNearbyCafes({ cafes, center });
  assert.deepEqual(
    results.map((cafe) => cafe.id),
    ["boundary", "inside"],
  );
  assert.ok(Math.abs(results[0].distanceMeters - 2000) < 0.000001);
  assert.ok(Math.abs(results[1].distanceMeters - 1000) < 0.001);
  assert.equal(cafes.length, 3);
  assert.equal("distanceMeters" in cafes[0], false);
});

test("each configured radius returns its expected Barcelona shortlist", () => {
  const expected = [
    [500, []],
    [1000, ["01", "02", "05"]],
    [2000, ["01", "02", "03", "05", "06", "07", "08", "10"]],
    [5000, ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]],
    [10000, ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]],
    [null, ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]],
  ] as const;
  for (const [radiusMeters, ids] of expected) {
    assert.deepEqual(
      findNearbyCafes({
        cafes: mockCafes,
        center: { latitude: 41.387, longitude: 2.17 },
        radiusMeters,
      }).map((cafe) => cafe.id),
      ids,
    );
  }
});

test("unsupported radius values cannot silently change the search meaning", () => {
  for (const radiusMeters of [0, -500, 3000, NaN, Infinity]) {
    assert.throws(
      () =>
        findNearbyCafes({
          cafes: mockCafes,
          center: { latitude: 41.387, longitude: 2.17 },
          radiusMeters,
        }),
      RangeError,
    );
  }
});

test("a valid Barcelona center with no nearby cafés returns an empty list", () => {
  assert.deepEqual(
    findNearbyCafes({
      cafes: mockCafes,
      center: { latitude: 41.46, longitude: 2.06 },
    }),
    [],
  );
});

test("default discovery returns eight cafés in their existing highest-rated order", () => {
  const results = findNearbyCafes({
    cafes: mockCafes,
    center: { latitude: 41.387, longitude: 2.17 },
  });
  assert.deepEqual(
    results.map((cafe) => cafe.id),
    ["01", "02", "03", "05", "06", "07", "08", "10"],
  );
  assert.ok(results.every((cafe) => cafe.distanceMeters <= 2000));
});

test("searching within 500 m excludes cafés beyond that selected radius", () => {
  const results = findNearbyCafes({
    cafes: mockCafes,
    center: { latitude: 41.387, longitude: 2.17 },
    radiusMeters: 500,
  });
  assert.deepEqual(results, []);
});

test("Anywhere returns all cafés ranked by rating, reviews, distance, then ID", () => {
  const base = { ...mockCafes[0], latitude: 41.387, longitude: 2.17 };
  const cafes = [
    { ...base, id: "z", rating: 4.8, reviewCount: 20 },
    { ...base, id: "far", rating: 4.8, reviewCount: 20, latitude: 41.46 },
    { ...base, id: "reviews", rating: 4.8, reviewCount: 30 },
    { ...base, id: "rating", rating: 4.9, reviewCount: 1 },
    { ...base, id: "a", rating: 4.8, reviewCount: 20 },
  ];
  const results = findNearbyCafes({ cafes, center: base, radiusMeters: null });
  assert.deepEqual(
    results.map((cafe) => cafe.id),
    ["rating", "reviews", "a", "z", "far"],
  );
  assert.ok(results.at(-1)!.distanceMeters > 2000);
  assert.deepEqual(
    cafes.map((cafe) => cafe.id),
    ["z", "far", "reviews", "rating", "a"],
  );
});
