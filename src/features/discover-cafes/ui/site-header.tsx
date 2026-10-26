import { SiteLogo } from "@/shared/ui/site-logo";
import { Button } from "@/shared/ui/button";

export function SiteHeader() {
  return (
    <header className="site-header page-width">
      <SiteLogo />
      <nav aria-label="Main navigation">
        <Button
          variant="ghost"
          nativeButton={false}
          role="link"
          render={<a href="#ranking" />}
        >
          The shortlist
        </Button>
        <Button
          variant="ghost"
          nativeButton={false}
          role="link"
          render={<a href="#our-idea" />}
        >
          Our idea
        </Button>
      </nav>
      <span className="city-label">
        <span aria-hidden="true">◉</span> Barcelona, ES
      </span>
    </header>
  );
}
