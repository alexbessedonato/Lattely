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
        centerId={state.draftCenterId}
        radiusMeters={state.draftRadiusMeters}
        hasUserLocation={state.userCoordinates !== null}
        outcome={state.outcome}
        isLocating={state.isLocating}
        onCenterChange={selectCenter}
        onRadiusChange={selectRadius}
        onSearch={search}
        onUseMyLocation={useMyLocation}
      />
      <CoffeeRanking
        cafes={cafes}
        centerName={state.submitted.centerName}
        locationLabel={state.submitted.locationLabel}
        radiusMeters={state.submitted.radiusMeters}
      />
    </>
  );
}
