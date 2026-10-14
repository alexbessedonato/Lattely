export const barcelonaConfig = {
  fallbackName: "Plaça de Catalunya",
  defaultRadiusMeters: 2000,
  radiusOptions: [
    { label: "500 m", meters: 500 },
    { label: "1 km", meters: 1000 },
    { label: "2 km", meters: 2000 },
    { label: "5 km", meters: 5000 },
    { label: "10 km", meters: 10000 },
    { label: "Anywhere", meters: null },
  ],
} as const;
