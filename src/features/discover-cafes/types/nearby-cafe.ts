import type { MockCafe } from "@/features/discover-cafes/types/mock-cafe";

export type NearbyCafe = MockCafe & { distanceMeters: number };
