import type { CoffeeRankingProps } from "@/features/discover-cafes/types/coffee-ranking-props";
import { CafeCard } from "@/features/discover-cafes/ui/cafe-card";
import { CafeListRow } from "@/features/discover-cafes/ui/cafe-list-row";
import { barcelonaConfig } from "@/shared/config/barcelona";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/ui/empty";

export function CoffeeRanking({
  cafes,
  centerName,
  locationLabel,
  radiusMeters,
}: CoffeeRankingProps) {
  const radiusLabel = barcelonaConfig.radiusOptions.find(
    (option) => option.meters === radiusMeters,
  )?.label;
  const searchArea =
    radiusMeters === null
      ? `across the Barcelona demo dataset · Distances from ${centerName}`
      : `within ${radiusLabel} of ${centerName}`;
  return (
    <main
      id="ranking"
      className="ranking page-width"
      aria-labelledby="ranking-title"
      tabIndex={-1}
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">GOOD COFFEE. GREAT COMPANY.</span>
          <h2 id="ranking-title">The coffee shortlist</h2>
        </div>
        <span className="section-aside">
          Highest-rated · Simulated ranking <span aria-hidden="true">↗</span>
        </span>
      </div>
      <p className="ranking-summary" role="status" aria-atomic="true">
        {cafes.length} demo {cafes.length === 1 ? "café" : "cafés"} {searchArea}{" "}
        · {locationLabel}
      </p>
      {cafes.length === 0 ? (
        <Empty className="border border-border">
          <EmptyHeader>
            <EmptyTitle>No demo cafés nearby</EmptyTitle>
            <EmptyDescription>
              No demo cafés {searchArea}. Choose a larger radius or Anywhere,
              then Search cafés.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="podium">
          {cafes.slice(0, 3).map((cafe, i) => (
            <CafeCard key={cafe.id} cafe={cafe} rank={i + 1} />
          ))}
        </div>
      )}
      {cafes.length > 3 && (
        <section className="more-cafes" aria-labelledby="more-title">
          <div className="list-heading">
            <h3 id="more-title">More good places to land</h3>
            <span>04 — {String(cafes.length).padStart(2, "0")}</span>
          </div>
          <ol start={4} className="cafe-list">
            {cafes.slice(3).map((cafe, i) => (
              <CafeListRow key={cafe.id} cafe={cafe} rank={i + 4} />
            ))}
          </ol>
        </section>
      )}
      <p className="demo-note">
        All cafés, ratings, and review counts are fictional demo data. Distances
        are approximate straight-line calculations from fictional café
        coordinates, not walking distances.
      </p>
    </main>
  );
}
