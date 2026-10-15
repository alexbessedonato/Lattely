import { mockCafes } from "@/features/discover-cafes/data/mock-cafes";
import { findNearbyCafes } from "@/features/discover-cafes/model/find-nearby-cafes";
import { barcelonaConfig } from "@/shared/config/barcelona";
import { CoffeeRanking } from "@/features/discover-cafes/ui/coffee-ranking";
import { Hero } from "@/features/discover-cafes/ui/hero";
import { SearchPreview } from "@/features/discover-cafes/ui/search-preview";
import { SiteFooter } from "@/features/discover-cafes/ui/site-footer";
import { SiteHeader } from "@/features/discover-cafes/ui/site-header";

export default function Home() {
  const cafes = findNearbyCafes({
    cafes: mockCafes,
    center: barcelonaConfig.fallbackCoordinates,
  });

  return (
    <div className="homepage" id="top">
      <a href="#ranking" className="skip-link">Skip to café ranking</a>
      <SiteHeader />
      <p className="demo-banner page-width">Demo data · Fictional cafés, simulated ratings, and calculated straight-line distances</p>
      <Hero />
      <SearchPreview />
      <CoffeeRanking cafes={cafes} centerName={barcelonaConfig.fallbackName} />
      <SiteFooter />
    </div>
  );
}
