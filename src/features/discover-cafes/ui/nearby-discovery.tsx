"use client";

import { useNearbyDiscovery } from "@/features/discover-cafes/model/use-nearby-discovery";
import { SearchPreview } from "@/features/discover-cafes/ui/search-preview";
import { CoffeeRanking } from "@/features/discover-cafes/ui/coffee-ranking";

export function NearbyDiscovery() {
  const {
    cafes,
    centerName,
    locationLabel,
    outcome,
    isLocating,
    useMyLocation,
  } = useNearbyDiscovery();

  return (
    <>
      <SearchPreview
        centerName={centerName}
        outcome={outcome}
        isLocating={isLocating}
        onUseMyLocation={useMyLocation}
      />
      <CoffeeRanking
        cafes={cafes}
        centerName={centerName}
        locationLabel={locationLabel}
      />
    </>
  );
}
