import { NearbyDiscovery } from "@/features/discover-cafes/ui/nearby-discovery";
import { Hero } from "@/features/discover-cafes/ui/hero";
import { SiteFooter } from "@/features/discover-cafes/ui/site-footer";
import { SiteHeader } from "@/features/discover-cafes/ui/site-header";
import { Badge } from "@/shared/ui/badge";

export default function Home() {
  return (
    <div className="homepage" id="top">
      <a href="#ranking" className="skip-link">
        Skip to café ranking
      </a>
      <SiteHeader />
      <p className="demo-banner page-width">
        <Badge variant="secondary" className="mr-2">
          Demo data
        </Badge>
        Fictional cafés, simulated ratings, and calculated straight-line
        distances
      </p>
      <Hero />
      <NearbyDiscovery />
      <SiteFooter />
    </div>
  );
}
