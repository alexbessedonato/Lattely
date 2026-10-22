import { SiteLogo } from "@/shared/ui/site-logo";

export function SiteHeader() {
  return (
    <header className="site-header page-width">
      <SiteLogo />
      <nav aria-label="Main navigation">
        <a href="#ranking">The shortlist</a>
        <a href="#our-idea">Our idea</a>
      </nav>
      <span className="city-label">
        <span aria-hidden="true">◉</span> Barcelona, ES
      </span>
    </header>
  );
}
