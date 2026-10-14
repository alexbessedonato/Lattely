"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const variants = ["A", "B", "C"] as const;
const names = { A: "Editorial · warm palette", B: "Night roast", C: "Neighborhood guide" };

export function PrototypeSwitcher({ current }: { current: "A" | "B" | "C" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.closest("input, textarea, select, [contenteditable]"))) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const offset = event.key === "ArrowLeft" ? -1 : 1;
      const next = variants[(variants.indexOf(current) + offset + variants.length) % variants.length];
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", next);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, pathname, router, searchParams]);

  const cycle = (offset: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", variants[(variants.indexOf(current) + offset + variants.length) % variants.length]);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (process.env.NODE_ENV === "production") return null;
  return <aside className="prototype-switcher" aria-label="Prototype design switcher">
    <button onClick={() => cycle(-1)} aria-label="Previous design">←</button>
    <div aria-live="polite"><strong>{current} / {names[current]}</strong><small>THROWAWAY · 10 mock cafés · static 2 km preview · ← → to switch</small></div>
    <button onClick={() => cycle(1)} aria-label="Next design">→</button>
  </aside>;
}
