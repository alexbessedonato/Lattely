import assert from "node:assert/strict";
import { test } from "node:test";
import { requestBrowserLocation } from "./request-browser-location.ts";
import type { LocationOutcome } from "../types/location-outcome.ts";

test("returns usable Barcelona coordinates without retaining browser metadata", () => {
  let outcome: LocationOutcome | undefined;
  requestBrowserLocation(
    {
      getCurrentPosition(success) {
        success({
          coords: { latitude: 41.387, longitude: 2.17 },
        } as GeolocationPosition);
      },
    },
    (value) => {
      outcome = value;
    },
  );
  assert.deepEqual(outcome, {
    status: "success",
    center: { latitude: 41.387, longitude: 2.17 },
  });
});

test("browser location failures return a specific fallback reason", () => {
  for (const [code, reason] of [
    [1, "denied"],
    [2, "unavailable"],
    [3, "timeout"],
    [99, "unavailable"],
  ] as const) {
    let outcome: LocationOutcome | undefined;
    requestBrowserLocation(
      {
        getCurrentPosition(_success, failure) {
          failure?.({ code } as GeolocationPositionError);
        },
      },
      (value) => {
        outcome = value;
      },
    );
    assert.deepEqual(outcome, { status: "fallback", reason });
  }
  let unsupported: LocationOutcome | undefined;
  requestBrowserLocation(undefined, (value) => {
    unsupported = value;
  });
  assert.deepEqual(unsupported, { status: "fallback", reason: "unsupported" });
});

test("rejects invalid coordinates and locations outside the approximate service area", () => {
  for (const [latitude, longitude, reason] of [
    [NaN, 2.17, "unavailable"],
    [41.38, Infinity, "unavailable"],
    [91, 2, "unavailable"],
    [41, 181, "unavailable"],
    [40.4168, -3.7038, "outside-coverage"],
    [41.49, 2.17, "outside-coverage"],
  ] as const) {
    let outcome: LocationOutcome | undefined;
    requestBrowserLocation(
      {
        getCurrentPosition(success) {
          success({ coords: { latitude, longitude } } as GeolocationPosition);
        },
      },
      (value) => {
        outcome = value;
      },
    );
    assert.deepEqual(outcome, { status: "fallback", reason });
  }
});

test("finishes within 10 seconds even if the browser never responds", (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  let outcome: LocationOutcome | undefined;
  requestBrowserLocation({ getCurrentPosition() {} }, (value) => {
    outcome = value;
  });
  context.mock.timers.tick(9_999);
  assert.equal(outcome, undefined);
  context.mock.timers.tick(1);
  assert.deepEqual(outcome, { status: "fallback", reason: "timeout" });
});

test("late callbacks after timeout or cancellation cannot overwrite a retry", (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  for (const cancelFirst of [false, true]) {
    let lateSuccess: PositionCallback = () => {};
    const outcomes: LocationOutcome[] = [];
    const cancel = requestBrowserLocation(
      {
        getCurrentPosition(success) {
          lateSuccess = success;
        },
      },
      (value) => outcomes.push(value),
    );
    if (cancelFirst) cancel();
    context.mock.timers.tick(10_000);
    requestBrowserLocation(
      {
        getCurrentPosition(success) {
          success({
            coords: { latitude: 41.4058, longitude: 2.1568 },
          } as GeolocationPosition);
        },
      },
      (value) => outcomes.push(value),
    );
    lateSuccess({
      coords: { latitude: 41.387, longitude: 2.17 },
    } as GeolocationPosition);
    assert.deepEqual(outcomes, [
      ...(cancelFirst ? [] : [{ status: "fallback", reason: "timeout" }]),
      { status: "success", center: { latitude: 41.4058, longitude: 2.1568 } },
    ]);
  }
});

test("a browser exception resolves to unavailable instead of leaving the action pending", () => {
  let outcome: LocationOutcome | undefined;
  assert.doesNotThrow(() =>
    requestBrowserLocation(
      {
        getCurrentPosition() {
          throw new Error("Browser location unavailable");
        },
      },
      (value) => {
        outcome = value;
      },
    ),
  );
  assert.deepEqual(outcome, { status: "fallback", reason: "unavailable" });
});
