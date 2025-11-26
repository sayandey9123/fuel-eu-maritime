// src/core/domain/route.ts

export type VesselType = 'Container' | 'BulkCarrier' | 'Tanker' | 'RoRo';
export type FuelType = 'HFO' | 'LNG' | 'MGO';

export interface Route {
  id: number;             // Internal DB ID
  routeId: string;        // Public ID (R001, R002...)
  vesselType: VesselType;
  fuelType: FuelType;
  year: number;
  ghgIntensity: number;   // gCO2e/MJ
  fuelConsumption: number; // tons of fuel
  distance: number;        // kilometers
  totalEmissions: number;  // tons CO2
  isBaseline: boolean;     // true if this is baseline
}
