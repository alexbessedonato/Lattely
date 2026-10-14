"use client";

// THROWAWAY: three homepage directions on /prototype/homepage?variant=A|B|C.
// Question: which visual hierarchy best pairs the top-three cards with ranks 4–10?
import { useSearchParams } from "next/navigation";
import { barcelonaConfig } from "@/shared/config/barcelona";
import { PrototypeSwitcher } from "@/shared/ui/prototype-switcher";
import { CoffeeArtPrototype } from "@/features/discover-cafes/ui/coffee-art-prototype";
import { CoffeeRankingPrototype } from "@/features/discover-cafes/ui/coffee-ranking-prototype";

function Logo() {
  return <a className="brand" href="#top" aria-label="Lattely homepage"><svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M8 16H29V27C29 34 8 34 8 27V16Z" stroke="currentColor" strokeWidth="2.5" /><path d="M29 18H32C38 18 37 26 29 26M6 35H32M13 11C8 6 17 6 13 2M23 11C19 6 27 6 23 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg><span>Lattely<span className="brand-dot">.</span></span></a>;
}

function Header() {
  return <header className="site-header page-width"><Logo /><nav aria-label="Main navigation"><a href="#ranking">The shortlist</a><a href="#how-it-works">Our idea</a></nav><span className="city-label"><span aria-hidden="true">◉</span> Barcelona, ES</span></header>;
}

function SearchPreview() {
  return <div className="search-preview"><div className="search-fields"><label><span>YOUR NEIGHBORHOOD</span><select disabled aria-describedby="preview-note" defaultValue="catalunya"><option value="catalunya">{barcelonaConfig.fallbackName}</option></select></label><label><span>HOW FAR?</span><select disabled aria-describedby="preview-note" defaultValue={barcelonaConfig.defaultRadiusMeters}>{barcelonaConfig.radiusOptions.map(option => <option key={option.label} value={option.meters ?? "anywhere"}>{option.label}</option>)}</select></label><a className="search-cta" href="#ranking">Explore the shortlist <span aria-hidden="true">↗</span></a></div><p id="preview-note">Static preview · location and radius search coming next</p></div>;
}

function Footer() {
  return <footer id="how-it-works" className="site-footer"><div className="page-width footer-top"><div><Logo /><p>Less searching. More sipping.</p></div><p className="footer-story">Made for the small rituals.<br />And the people who love them.</p><a href="#top">Back to the top <span aria-hidden="true">↑</span></a></div><div className="page-width footer-bottom"><span>A love letter to coffee in Barcelona.</span><span>Homepage design prototype · Demo data</span></div></footer>;
}

export function VariantA() {
  return <div className="homepage theme-editorial" id="top"><Header /><section className="hero editorial-hero page-width"><div className="hero-copy"><span className="eyebrow">FOR THE LOVE OF A GOOD CUP</span><h1>Your next<br />good coffee<br /><em>is closer.</em></h1><p>The little corner café. The perfect flat white.<br className="desktop-break" /> Find your kind of coffee, right here in Barcelona.</p><a className="hero-link" href="#ranking">Meet your next favorite <span aria-hidden="true">↘</span></a></div><div className="hero-visual"><span className="visual-label">THE DAILY RITUAL</span><CoffeeArtPrototype hero /><span className="visual-footer">BARCELONA, ONE CUP AT A TIME <span>EST. FOR YOU</span></span></div></section><div className="page-width"><SearchPreview /></div><CoffeeRankingPrototype /><Footer /></div>;
}

export function VariantB() {
  return <div className="homepage theme-night" id="top"><Header /><section className="hero night-hero page-width"><span className="eyebrow">BARCELONA HAS GOOD TASTE. SO DO YOU.</span><div className="night-hero-row"><h1>Great coffee.<br /><em>No guesswork.</em></h1><div className="night-art"><CoffeeArtPrototype hero motif="pot" /></div></div><div className="night-bottom"><p>Follow the good cups. Discover a new ritual<br />among the city’s best-loved coffee corners.</p><a href="#ranking" className="round-link" aria-label="See the coffee ranking">↘</a></div><SearchPreview /></section><CoffeeRankingPrototype /><Footer /></div>;
}

export function VariantC() {
  return <div className="homepage theme-guide" id="top"><Header /><section className="hero guide-hero page-width"><div className="guide-margin"><span>THE COFFEE FIELD GUIDE</span><span>VOL. 01 / BARCELONA</span></div><div className="guide-hero-grid"><div><span className="eyebrow">GOOD PLACES. BETTER COFFEE.</span><h1>Take the<br /><em>coffee route.</em></h1><p>Your pocket-sized guide to the city’s coffee corners.<br />Ten places to start. One very good reason to get out.</p><a className="hero-link" href="#ranking">Start exploring <span aria-hidden="true">↘</span></a></div><div className="guide-stamp"><CoffeeArtPrototype hero motif="glass" /><span>BCN<br /><small>CAFFEINE & CURIOSITY</small></span></div></div><SearchPreview /></section><CoffeeRankingPrototype guide /><Footer /></div>;
}

export function HomepagePrototype() {
  const searchParams = useSearchParams();
  const value = searchParams.get("variant");
  const variant = value === "B" || value === "C" ? value : "A";
  return <><a href="#ranking" className="skip-link">Skip to café ranking</a>{variant === "A" ? <VariantA /> : variant === "B" ? <VariantB /> : <VariantC />}<PrototypeSwitcher current={variant} /></>;
}
