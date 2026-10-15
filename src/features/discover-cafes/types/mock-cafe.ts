import type { Coordinates } from "@/shared/types/coordinates";

export type MockCafe = Coordinates & {
  id: string;
  name: string;
  neighborhood: string;
  note: string;
  rating: number;
  reviewCount: number;
  exampleDistance: string;
  tag: string;
  motif: "cup" | "pot" | "glass";
};
