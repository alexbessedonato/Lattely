"use client";

import { useNearbyDiscovery } from "@/features/discover-cafes/model/use-nearby-discovery";
import { SearchControls } from "@/features/discover-cafes/ui/search-controls";
import { CoffeeRanking } from "@/features/discover-cafes/ui/coffee-ranking";

export function NearbyDiscovery() {
  const { state, cafes, selectCenter, selectRadius, search, useMyLocation } =
    useNearbyDiscovery();

  return (
    <>
      <SearchControls
        location={state.draftLocation}
        radiusMeters={state.draftRadiusMeters}
        userLocation={state.userLocation}
        outcome={state.outcome}
        isLocating={state.isLocating}
        onCenterChange={selectCenter}
        onRadiusChange={selectRadius}
        onSearch={search}
        onUseMyLocation={useMyLocation}
      />

      <CoffeeRanking
        cafes={cafes}
        centerName={state.submitted.location.name}
        locationLabel={state.submitted.locationLabel}
        radiusMeters={state.submitted.radiusMeters}
      />
    </>
  );
}
