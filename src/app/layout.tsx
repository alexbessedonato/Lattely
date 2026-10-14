import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lattely — your next good coffee",
  description: "A throwaway homepage prototype for Barcelona coffee discovery. All cafés and ratings are fictional.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
