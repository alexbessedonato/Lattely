import type { CafeListRowProps } from "@/features/discover-cafes/types/cafe-list-row-props";
import { formatDistance } from "@/features/discover-cafes/lib/format-distance";
import { CoffeeArt } from "@/features/discover-cafes/ui/coffee-art";
import { Badge } from "@/shared/ui/badge";

export function CafeListRow({ cafe, rank }: CafeListRowProps) {
  return (
    <li className="bg-background transition-colors duration-300 ease-out hover:bg-secondary/60 motion-reduce:transition-none">
      <span className="list-rank" aria-hidden="true">
        {String(rank).padStart(2, "0")}
      </span>
      <span className={`mini-art mini-${cafe.motif}`} aria-hidden="true">
        <CoffeeArt motif={cafe.motif} />
      </span>
      <div className="list-name">
        <h4>{cafe.name}</h4>
        <p>
          {cafe.neighborhood}
          <span className="list-tag"> · {cafe.tag}</span>
        </p>
        <p className="list-distance">
          Approx. {formatDistance(cafe.distanceMeters)} · straight-line
        </p>
      </div>
      <div className="list-score">
        <Badge
          variant="secondary"
          aria-label={`Simulated rating: ${cafe.rating.toFixed(1)} out of 5`}
        >
          <span aria-hidden="true">★</span> {cafe.rating.toFixed(1)}
        </Badge>
        <small>{cafe.reviewCount} simulated reviews</small>
      </div>
    </li>
  );
}
