import type { Metadata } from "next";
import type { LayoutProps } from "@/app/types/layout-props";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lattely — your next good coffee",
  description: "A Barcelona coffee discovery demo featuring fictional cafés, simulated ratings, and a static search preview.",
};

export default function RootLayout({ children }: LayoutProps) {
  return <html lang="en"><body>{children}</body></html>;
}
