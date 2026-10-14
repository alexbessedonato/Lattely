import { CoffeeArt } from "@/features/discover-cafes/ui/coffee-art";

export function Hero() {
  return (
    <section className="hero editorial-hero page-width" aria-labelledby="hero-title">
      <div className="hero-copy">
        <span className="eyebrow">FOR THE LOVE OF A GOOD CUP</span>
        <h1 id="hero-title">Your next<br />good coffee<br /><em>is closer.</em></h1>
        <p>The little corner café. The perfect flat white.<br />Find your kind of coffee, right here in Barcelona.</p>
        <a className="hero-link" href="#ranking">Meet your next favorite <span aria-hidden="true">↘</span></a>
      </div>
      <div className="hero-visual">
        <span className="visual-label">THE DAILY RITUAL</span>
        <CoffeeArt hero />
        <span className="visual-footer">BARCELONA, ONE CUP AT A TIME <span>EST. FOR YOU</span></span>
      </div>
    </section>
  );
}
