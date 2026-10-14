import type { MockCafe } from "@/features/discover-cafes/types/mock-cafe";

// Fixed display order for this static demo; all records and distances are fictional.
export const mockCafes: readonly MockCafe[] = [
  { id: "01", name: "Casa Bruma", neighborhood: "Eixample", note: "Slow mornings. Seriously good flat whites.", rating: 4.9, reviewCount: 328, exampleDistance: "450 m", tag: "The neighborhood favorite", motif: "cup" },
  { id: "02", name: "Sol & Sombra", neighborhood: "El Born", note: "A little sunshine, a perfect pour-over.", rating: 4.8, reviewCount: 246, exampleDistance: "1.2 km", tag: "For the curious palate", motif: "pot" },
  { id: "03", name: "Petit Ritual", neighborhood: "Sant Antoni", note: "Your daily ritual, just a little better.", rating: 4.8, reviewCount: 189, exampleDistance: "900 m", tag: "Worth taking a detour", motif: "glass" },
  { id: "04", name: "Cafè de la Lluna", neighborhood: "Gràcia", note: "Coffee with a quieter rhythm.", rating: 4.7, reviewCount: 214, exampleDistance: "1.8 km", tag: "Specialty coffee", motif: "cup" },
  { id: "05", name: "Tinta Coffee", neighborhood: "El Raval", note: "An espresso and a good book.", rating: 4.7, reviewCount: 176, exampleDistance: "650 m", tag: "Reading corner", motif: "pot" },
  { id: "06", name: "Diumenge", neighborhood: "Eixample", note: "Sunday energy, every day.", rating: 4.6, reviewCount: 302, exampleDistance: "800 m", tag: "Slow mornings", motif: "glass" },
  { id: "07", name: "Finestra", neighborhood: "El Born", note: "A window onto your next favorite roast.", rating: 4.6, reviewCount: 157, exampleDistance: "1.4 km", tag: "Small-batch roasts", motif: "cup" },
  { id: "08", name: "Bon Dia Brew", neighborhood: "Sant Antoni", note: "A very good start to your day.", rating: 4.5, reviewCount: 231, exampleDistance: "1.1 km", tag: "Breakfast spot", motif: "pot" },
  { id: "09", name: "La Pausa", neighborhood: "Gràcia", note: "A moment to yourself.", rating: 4.5, reviewCount: 143, exampleDistance: "1.9 km", tag: "A quiet escape", motif: "glass" },
  { id: "10", name: "Carrer Coffee", neighborhood: "El Raval", note: "Great coffee, around the corner.", rating: 4.4, reviewCount: 198, exampleDistance: "700 m", tag: "Everyday espresso", motif: "cup" },
];
