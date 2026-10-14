import type { CoffeeRankingProps } from "@/features/discover-cafes/types/coffee-ranking-props";
import { CafeCard } from "@/features/discover-cafes/ui/cafe-card";
import { CafeListRow } from "@/features/discover-cafes/ui/cafe-list-row";

export function CoffeeRanking({ cafes }: CoffeeRankingProps) {
  return (
    <main id="ranking" className="ranking page-width" aria-labelledby="ranking-title" tabIndex={-1}>
      <div className="section-heading">
        <div><span className="eyebrow">GOOD COFFEE. GREAT COMPANY.</span><h2 id="ranking-title">The coffee shortlist</h2></div>
        <span className="section-aside">Barcelona · Simulated ranking <span aria-hidden="true">↗</span></span>
      </div>
      <div className="podium">
        {cafes.slice(0, 3).map((cafe, i) => <CafeCard key={cafe.id} cafe={cafe} rank={i + 1} />)}
      </div>
      <section className="more-cafes" aria-labelledby="more-title">
        <div className="list-heading"><h3 id="more-title">More good places to land</h3><span>04 — 10</span></div>
        <ol start={4} className="cafe-list">
          {cafes.slice(3, 10).map((cafe, i) => <CafeListRow key={cafe.id} cafe={cafe} rank={i + 4} />)}
        </ol>
      </section>
      <p className="demo-note">A little imagination, a lot of coffee. All cafés, ratings, reviews, and example distances are fictional demo data.</p>
    </main>
  );
}
