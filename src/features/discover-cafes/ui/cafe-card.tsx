import type { CafeCardProps } from "@/features/discover-cafes/types/cafe-card-props";
import { formatDistance } from "@/features/discover-cafes/lib/format-distance";
import { CoffeeArt } from "@/features/discover-cafes/ui/coffee-art";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";

export function CafeCard({ cafe, rank }: CafeCardProps) {
  return (
    <Card
      role="article"
      className={`cafe-${rank} gap-0 py-0 shadow-sm transition-[scale,box-shadow] duration-300 ease-out hover:shadow-md motion-safe:hover:scale-[1.015] motion-reduce:transition-none`}
      aria-labelledby={`cafe-${cafe.id}`}
    >
      <div className="cafe-picture">
        <Badge
          variant="outline"
          className="absolute top-4 left-4 size-8 border-current bg-card/80 font-serif text-sm"
          aria-label={`Rank ${rank}`}
        >
          {String(rank).padStart(2, "0")}
        </Badge>
        <CoffeeArt motif={cafe.motif} />
        <span className="picture-caption">{cafe.tag}</span>
      </div>
      <CardContent className="cafe-copy p-5">
        <div className="cafe-meta">
          <span>{cafe.neighborhood}</span>
          <span>Approx. {formatDistance(cafe.distanceMeters)}</span>
        </div>
        <div className="cafe-title">
          <h3 id={`cafe-${cafe.id}`}>{cafe.name}</h3>
          <Badge
            variant="secondary"
            aria-label={`Simulated rating: ${cafe.rating.toFixed(1)} out of 5`}
          >
            <span aria-hidden="true">★</span> {cafe.rating.toFixed(1)}
          </Badge>
        </div>
        <p>{cafe.note}</p>
        <span className="review-count">
          {cafe.reviewCount} simulated reviews
        </span>
      </CardContent>
    </Card>
  );
}
