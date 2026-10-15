import type { NearbyCafe } from "@/features/discover-cafes/types/nearby-cafe";

export type CoffeeRankingProps = { cafes: readonly NearbyCafe[]; centerName: string };
