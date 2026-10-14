import { SiteLogo } from "@/shared/ui/site-logo";

export function SiteFooter() {
  return (
    <footer id="our-idea" className="site-footer">
      <div className="page-width footer-top">
        <div><SiteLogo /><p>Less searching. More sipping.</p></div>
        <p className="footer-story">Made for the small rituals.<br />And the people who love them.</p>
        <a href="#top">Back to the top <span aria-hidden="true">↑</span></a>
      </div>
      <div className="page-width footer-bottom">
        <span>A love letter to coffee in Barcelona.</span>
        <span>Demo data · Fictional cafés and simulated ratings</span>
      </div>
    </footer>
  );
}
