import { prototypeCafes, type PrototypeCafe } from "@/features/discover-cafes/data/prototype-cafes";
import { CoffeeArtPrototype } from "@/features/discover-cafes/ui/coffee-art-prototype";

function FeaturedCafe({ cafe, rank }: { cafe: PrototypeCafe; rank: number }) {
  return <article className={`featured-cafe cafe-${rank}`}>
    <div className="cafe-picture"><span className="rank-badge">0{rank}</span><CoffeeArtPrototype motif={cafe.motif} /><span className="picture-caption">{cafe.tag}</span></div>
    <div className="cafe-copy"><div className="cafe-meta"><span>{cafe.neighborhood}</span><span>{cafe.distance} away</span></div>
      <div className="cafe-title"><h3>{cafe.name}</h3><span className="rating"><span aria-hidden="true">★</span> {cafe.rating.toFixed(1)}</span></div>
      <p>{cafe.note}</p><span className="review-count">{cafe.reviews} simulated reviews</span>
    </div>
  </article>;
}

export function CoffeeRankingPrototype({ guide = false }: { guide?: boolean }) {
  return <main id="ranking" className="ranking page-width" aria-labelledby="ranking-title">
    <div className="section-heading"><div><span className="eyebrow">{guide ? "THE LOCAL SHORTLIST / 01—10" : "GOOD COFFEE. GREAT COMPANY."}</span><h2 id="ranking-title">{guide ? "Ten spots. Your next stop." : "The coffee shortlist"}</h2></div><span className="section-aside">Barcelona · Top rated <span aria-hidden="true">↗</span></span></div>
    <div className="ranking-layout"><div className="podium">{prototypeCafes.slice(0, 3).map((cafe, i) => <FeaturedCafe key={cafe.id} cafe={cafe} rank={i + 1} />)}</div>
    <section className="more-cafes" aria-labelledby="more-title"><div className="list-heading"><h3 id="more-title">More good places to land</h3><span>04 — 10</span></div>
      <ol start={4} className="cafe-list">{prototypeCafes.slice(3).map((cafe, i) => <li key={cafe.id}>
        <span className="list-rank" aria-hidden="true">{String(i + 4).padStart(2, "0")}</span><span className={`mini-art mini-${cafe.motif}`} aria-hidden="true"><CoffeeArtPrototype motif={cafe.motif} /></span>
        <div className="list-name"><h4>{cafe.name}</h4><p>{cafe.neighborhood}<span className="list-tag"> · {cafe.tag}</span></p></div>
        <span className="list-distance">{cafe.distance}</span><div className="list-score"><strong><span aria-hidden="true">★</span> {cafe.rating.toFixed(1)}</strong><small>{cafe.reviews} reviews</small></div>
      </li>)}</ol>
    </section></div>
    <p className="demo-note">A little imagination, a lot of coffee. All 10 cafés, ratings, reviews, and distances are fictional demo data.</p>
  </main>;
}
