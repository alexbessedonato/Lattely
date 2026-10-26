import { CoffeeArt } from "@/features/discover-cafes/ui/coffee-art";
import { ArrowDownRightIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function Hero() {
  return (
    <section
      className="hero editorial-hero page-width"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <span className="eyebrow">FOR THE LOVE OF A GOOD CUP</span>
        <h1 id="hero-title">
          Your next
          <br />
          good coffee
          <br />
          <em>is closer.</em>
        </h1>
        <p>
          The little corner café. The perfect flat white.
          <br />
          Find your kind of coffee, right here in Barcelona.
        </p>
        <Button
          variant="link"
          nativeButton={false}
          role="link"
          render={<a href="#ranking" />}
          className="mt-4 gap-10 rounded-none border-0 border-b border-current px-0"
        >
          Meet your next favorite <ArrowDownRightIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="hero-visual">
        <span className="visual-label">THE DAILY RITUAL</span>
        <CoffeeArt hero />
        <span className="visual-footer">
          BARCELONA, ONE CUP AT A TIME <span>EST. FOR YOU</span>
        </span>
      </div>
    </section>
  );
}
