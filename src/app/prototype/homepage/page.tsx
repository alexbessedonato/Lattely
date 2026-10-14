import { HomepagePrototype } from "@/features/discover-cafes/ui/homepage-prototype";
import { Suspense } from "react";

export default function PrototypePage() {
  return <Suspense fallback={<p>Loading homepage prototype…</p>}><HomepagePrototype /></Suspense>;
}
