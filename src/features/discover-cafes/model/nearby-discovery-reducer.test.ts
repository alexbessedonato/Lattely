import assert from "node:assert/strict";
import { test } from "node:test";
import {
  initialNearbyDiscoveryState,
  nearbyDiscoveryReducer,
} from "./nearby-discovery-reducer.ts";
import { barcelonaBarris } from "../data/barcelona-barris.ts";
import { barcelonaConfig } from "../../../shared/config/barcelona.ts";

test("radius edits leave displayed results unchanged until Search cafés", () => {
  const draft = nearbyDiscoveryReducer(initialNearbyDiscoveryState, {
    type: "radius-selected",
    radiusMeters: 500,
  });
  assert.equal(draft.draftRadiusMeters, 500);
  assert.equal(draft.submitted.radiusMeters, 2000);
  const searched = nearbyDiscoveryReducer(draft, { type: "search-submitted" });
  assert.equal(searched.submitted.radiusMeters, 500);
  assert.equal(searched.submitted.centerName, "Plaça de Catalunya");
});

test("each failed location request immediately searches the fallback at the selected radius", () => {
  for (const reason of [
    "denied",
    "unavailable",
    "unsupported",
    "timeout",
    "outside-coverage",
  ] as const) {
    let state = nearbyDiscoveryReducer(initialNearbyDiscoveryState, {
      type: "radius-selected",
      radiusMeters: 5000,
    });
    state = nearbyDiscoveryReducer(state, { type: "location-started" });
    state = nearbyDiscoveryReducer(state, {
      type: "location-resolved",
      outcome: { status: "fallback", reason },
    });
    assert.equal(state.isLocating, false);
    assert.equal(state.draftCenterId, "catalunya");
    assert.equal(state.submitted.locationLabel, "Fallback location");
    assert.equal(state.submitted.radiusMeters, 5000);
    assert.deepEqual(state.outcome, { status: "fallback", reason });
  }
});

test("Use my location immediately searches using the latest selected radius", () => {
  let state = nearbyDiscoveryReducer(initialNearbyDiscoveryState, {
    type: "location-started",
  });
  state = nearbyDiscoveryReducer(state, {
    type: "radius-selected",
    radiusMeters: null,
  });
  state = nearbyDiscoveryReducer(state, {
    type: "location-resolved",
    outcome: {
      status: "success",
      center: { latitude: 41.4058, longitude: 2.1568 },
    },
  });
  assert.equal(state.isLocating, false);
  assert.equal(state.draftCenterId, "user-location");
  assert.equal(state.submitted.centerName, "your location");
  assert.equal(state.submitted.radiusMeters, null);
  assert.deepEqual(state.userCoordinates, {
    latitude: 41.4058,
    longitude: 2.1568,
  });
});

test("a manual barri selection supersedes pending location without changing results until submission", () => {
  let state = nearbyDiscoveryReducer(initialNearbyDiscoveryState, {
    type: "location-started",
  });
  state = nearbyDiscoveryReducer(state, {
    type: "center-selected",
    centerId: "01",
  });
  assert.equal(state.isLocating, false);
  assert.equal(state.submitted.centerName, "Plaça de Catalunya");
  const late = nearbyDiscoveryReducer(state, {
    type: "location-resolved",
    outcome: {
      status: "success",
      center: { latitude: 41.4058, longitude: 2.1568 },
    },
  });
  assert.equal(late, state);
  state = nearbyDiscoveryReducer(state, { type: "search-submitted" });
  assert.equal(state.submitted.centerName, "el Raval");
  assert.equal(state.submitted.locationLabel, "Approximate barri center");
});

test("a successful location remains available after searching a barri, and a retry clears fallback", () => {
  const outcome = {
    status: "success",
    center: { latitude: 41.4058, longitude: 2.1568 },
  } as const;
  let state = nearbyDiscoveryReducer(initialNearbyDiscoveryState, {
    type: "location-started",
  });
  state = nearbyDiscoveryReducer(state, { type: "location-resolved", outcome });
  state = nearbyDiscoveryReducer(state, {
    type: "center-selected",
    centerId: "01",
  });
  state = nearbyDiscoveryReducer(state, { type: "search-submitted" });
  assert.equal(state.submitted.centerName, "el Raval");
  state = nearbyDiscoveryReducer(state, {
    type: "center-selected",
    centerId: "user-location",
  });
  state = nearbyDiscoveryReducer(state, { type: "search-submitted" });
  assert.deepEqual(state.submitted.center, outcome.center);
  state = nearbyDiscoveryReducer(state, { type: "location-started" });
  state = nearbyDiscoveryReducer(state, {
    type: "location-resolved",
    outcome: { status: "fallback", reason: "denied" },
  });
  state = nearbyDiscoveryReducer(state, { type: "location-started" });
  state = nearbyDiscoveryReducer(state, { type: "location-resolved", outcome });
  assert.equal(state.submitted.locationLabel, "Current location");
  assert.equal(state.outcome?.status, "success");
});

test("submitting during location lookup keeps the chosen center and ignores late results", () => {
  let state = nearbyDiscoveryReducer(initialNearbyDiscoveryState, {
    type: "location-started",
  });
  state = nearbyDiscoveryReducer(state, { type: "search-submitted" });
  const late = nearbyDiscoveryReducer(state, {
    type: "location-resolved",
    outcome: { status: "fallback", reason: "timeout" },
  });
  assert.equal(late, state);
  assert.equal(state.submitted.centerName, "Plaça de Catalunya");
  assert.equal(state.isLocating, false);
});

test("all 73 official barris are unique, alphabetical, covered, and usable search centers", () => {
  assert.equal(barcelonaBarris.length, 73);
  assert.equal(new Set(barcelonaBarris.map((barri) => barri.name)).size, 73);
  assert.deepEqual(
    barcelonaBarris.map((barri) => barri.id).sort(),
    Array.from({ length: 73 }, (_, i) => String(i + 1).padStart(2, "0")),
  );
  const collator = new Intl.Collator("ca");
  const { south, north, west, east } = barcelonaConfig.coverage;
  for (const [index, barri] of barcelonaBarris.entries()) {
    assert.ok(
      Number.isFinite(barri.center.latitude) &&
        barri.center.latitude >= south &&
        barri.center.latitude <= north,
    );
    assert.ok(
      Number.isFinite(barri.center.longitude) &&
        barri.center.longitude >= west &&
        barri.center.longitude <= east,
    );
    if (index > 0)
      assert.ok(
        collator.compare(barcelonaBarris[index - 1].name, barri.name) < 0,
      );
    const selected = nearbyDiscoveryReducer(initialNearbyDiscoveryState, {
      type: "center-selected",
      centerId: barri.id,
    });
    const searched = nearbyDiscoveryReducer(selected, {
      type: "search-submitted",
    });
    assert.equal(searched.submitted.centerName, barri.name);
    assert.deepEqual(searched.submitted.center, barri.center);
  }
});
