import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/shared/ui/combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/ui/field";
import type { SearchControlsProps } from "@/features/discover-cafes/types/search-controls-props";
import type { LocationFallbackReason } from "@/features/discover-cafes/types/location-outcome";
import type { SearchRadiusOption } from "@/features/discover-cafes/types/search-radius-option";
import type { SearchLocation } from "@/features/discover-cafes/types/search-location";
import { barcelonaBarris } from "@/features/discover-cafes/data/barcelona-barris";
import {
  defaultSearchLocation,
  searchLocations,
} from "@/features/discover-cafes/data/search-locations";
import { barcelonaConfig } from "@/shared/config/barcelona";

const radiusOptions = barcelonaConfig.radiusOptions;

const fallbackMessages: Record<LocationFallbackReason, string> = {
  denied: "Location permission was denied.",
  unavailable: "Your location is unavailable.",
  unsupported: "Your browser does not support geolocation.",
  timeout: "The location request timed out. Please try again.",
  "outside-coverage":
    "Your location is outside our approximate Barcelona demo coverage.",
};

export function SearchControls({
  location,
  radiusMeters,
  userLocation,
  isLocating,
  outcome,
  onCenterChange,
  onRadiusChange,
  onSearch,
  onUseMyLocation,
}: SearchControlsProps) {
  const locations = userLocation
    ? [defaultSearchLocation, userLocation, ...barcelonaBarris]
    : searchLocations;

  return (
    <section className="search-controls page-width" aria-label="Café discovery">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}
      >
        <FieldSet className="grid items-end gap-5 rounded-xl border border-border p-5 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto]">
          <FieldLegend className="sr-only">Search cafés</FieldLegend>
          <Field className="min-w-0">
            <FieldLabel>Search center</FieldLabel>
            <Combobox<SearchLocation>
              items={locations}
              value={location}
              itemToStringLabel={(item) => item.name}
              itemToStringValue={(item) => item.id}
              onValueChange={(item) => {
                if (item) onCenterChange(item);
              }}
            >
              <ComboboxInput placeholder="Find a barri…" />
              <ComboboxContent>
                <ComboboxEmpty role="status">
                  No matching centers. Try another name.
                </ComboboxEmpty>
                <ComboboxList>
                  {(item: SearchLocation) => (
                    <ComboboxItem key={item.id} value={item}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
          <Field className="min-w-0">
            <FieldLabel>How far?</FieldLabel>
            <Select<SearchRadiusOption>
              value={radiusOptions.find(
                (option) => option.meters === radiusMeters,
              )}
              onValueChange={(option) => {
                if (option) onRadiusChange(option.meters);
              }}
            >
              <SelectTrigger className="w-full bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {radiusOptions.map((option) => (
                    <SelectItem key={option.label} value={option}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Button size="lg" type="submit">
            Search cafés <ArrowUpRightIcon aria-hidden="true" />
          </Button>
        </FieldSet>
      </form>
      <FieldDescription className="mt-3 nth-last-2:mt-3">
        Choose a center and radius, then search. Barris use approximate centers;
        results may include neighboring barris.
      </FieldDescription>
      <div className="location-action">
        <Button
          type="button"
          className="bg-black text-white hover:bg-black/85"
          disabled={isLocating}
          onClick={onUseMyLocation}
        >
          Use my location <ArrowUpRightIcon aria-hidden="true" />
        </Button>
        <p role="status" aria-atomic="true">
          {isLocating
            ? "Finding your location… You can still choose a barri."
            : outcome?.status === "fallback"
              ? `${fallbackMessages[outcome.reason]} Using ${barcelonaConfig.fallbackName} as the fallback location.`
              : outcome?.status === "success"
                ? "Showing demo cafés near your location."
                : "Use my location searches immediately with the selected radius."}
        </p>
      </div>
    </section>
  );
}
