import type { MockCafe } from "@/features/discover-cafes/types/mock-cafe";

// Fixed highest-rated order. Coordinates are plausible fictional café locations;
// legacy example distances are retained as fixture content but are not used for discovery.
export const mockCafes: readonly MockCafe[] = [
  { id: "01", latitude: 41.3922, longitude: 2.1649, name: "Casa Bruma", neighborhood: "Eixample", note: "Slow mornings. Seriously good flat whites.", rating: 4.9, reviewCount: 328, exampleDistance: "450 m", tag: "The neighborhood favorite", motif: "cup" },
  { id: "02", latitude: 41.385, longitude: 2.1815, name: "Sol & Sombra", neighborhood: "El Born", note: "A little sunshine, a perfect pour-over.", rating: 4.8, reviewCount: 246, exampleDistance: "1.2 km", tag: "For the curious palate", motif: "pot" },
  { id: "03", latitude: 41.3788, longitude: 2.1595, name: "Petit Ritual", neighborhood: "Sant Antoni", note: "Your daily ritual, just a little better.", rating: 4.8, reviewCount: 189, exampleDistance: "900 m", tag: "Worth taking a detour", motif: "glass" },
  { id: "04", latitude: 41.4058, longitude: 2.1568, name: "Cafè de la Lluna", neighborhood: "Gràcia", note: "Coffee with a quieter rhythm.", rating: 4.7, reviewCount: 214, exampleDistance: "1.8 km", tag: "Specialty coffee", motif: "cup" },
  { id: "05", latitude: 41.3812, longitude: 2.168, name: "Tinta Coffee", neighborhood: "El Raval", note: "An espresso and a good book.", rating: 4.7, reviewCount: 176, exampleDistance: "650 m", tag: "Reading corner", motif: "pot" },
  { id: "06", latitude: 41.396, longitude: 2.163, name: "Diumenge", neighborhood: "Eixample", note: "Sunday energy, every day.", rating: 4.6, reviewCount: 302, exampleDistance: "800 m", tag: "Slow mornings", motif: "glass" },
  { id: "07", latitude: 41.3838, longitude: 2.1838, name: "Finestra", neighborhood: "El Born", note: "A window onto your next favorite roast.", rating: 4.6, reviewCount: 157, exampleDistance: "1.4 km", tag: "Small-batch roasts", motif: "cup" },
  { id: "08", latitude: 41.377, longitude: 2.162, name: "Bon Dia Brew", neighborhood: "Sant Antoni", note: "A very good start to your day.", rating: 4.5, reviewCount: 231, exampleDistance: "1.1 km", tag: "Breakfast spot", motif: "pot" },
  { id: "09", latitude: 41.409, longitude: 2.158, name: "La Pausa", neighborhood: "Gràcia", note: "A moment to yourself.", rating: 4.5, reviewCount: 143, exampleDistance: "1.9 km", tag: "A quiet escape", motif: "glass" },
  { id: "10", latitude: 41.3764, longitude: 2.166, name: "Carrer Coffee", neighborhood: "El Raval", note: "Great coffee, around the corner.", rating: 4.4, reviewCount: 198, exampleDistance: "700 m", tag: "Everyday espresso", motif: "cup" },
];
