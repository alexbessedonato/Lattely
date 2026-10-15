import type { CafeCardProps } from "@/features/discover-cafes/types/cafe-card-props";
import { formatDistance } from "@/features/discover-cafes/lib/format-distance";
import { CoffeeArt } from "@/features/discover-cafes/ui/coffee-art";

export function CafeCard({ cafe, rank }: CafeCardProps) {
  return (
    <article className={`featured-cafe cafe-${rank}`} aria-labelledby={`cafe-${cafe.id}`}>
      <div className="cafe-picture">
        <span className="rank-badge" aria-label={`Rank ${rank}`}>{String(rank).padStart(2, "0")}</span>
        <CoffeeArt motif={cafe.motif} />
        <span className="picture-caption">{cafe.tag}</span>
      </div>
      <div className="cafe-copy">
        <div className="cafe-meta"><span>{cafe.neighborhood}</span><span>Approx. {formatDistance(cafe.distanceMeters)}</span></div>
        <div className="cafe-title">
          <h3 id={`cafe-${cafe.id}`}>{cafe.name}</h3>
          <span className="rating" aria-label={`Simulated rating: ${cafe.rating.toFixed(1)} out of 5`}><span aria-hidden="true">★</span> {cafe.rating.toFixed(1)}</span>
        </div>
        <p>{cafe.note}</p>
        <span className="review-count">{cafe.reviewCount} simulated reviews</span>
      </div>
    </article>
  );
}
