import type { CafeListRowProps } from "@/features/discover-cafes/types/cafe-list-row-props";
import { CoffeeArt } from "@/features/discover-cafes/ui/coffee-art";

export function CafeListRow({ cafe, rank }: CafeListRowProps) {
  return (
    <li>
      <span className="list-rank" aria-hidden="true">{String(rank).padStart(2, "0")}</span>
      <span className={`mini-art mini-${cafe.motif}`} aria-hidden="true"><CoffeeArt motif={cafe.motif} /></span>
      <div className="list-name">
        <h4>{cafe.name}</h4>
        <p>{cafe.neighborhood}<span className="list-tag"> · {cafe.tag}</span></p>
        <p className="list-distance">{cafe.exampleDistance} · example distance</p>
      </div>
      <div className="list-score">
        <strong aria-label={`Simulated rating: ${cafe.rating.toFixed(1)} out of 5`}><span aria-hidden="true">★</span> {cafe.rating.toFixed(1)}</strong>
        <small>{cafe.reviewCount} simulated reviews</small>
      </div>
    </li>
  );
}
