import { barcelonaConfig } from "../../../shared/config/barcelona.ts";
import { barcelonaBarris } from "./barcelona-barris.ts";
import type { SearchLocation } from "../types/search-location.ts";

export const defaultSearchLocation: SearchLocation = {
  id: "catalunya",
  name: barcelonaConfig.fallbackName,
  center: barcelonaConfig.fallbackCoordinates,
};

export const searchLocations: readonly SearchLocation[] = [
  defaultSearchLocation,
  ...barcelonaBarris,
];
