

export type VesselType = 'Container' | 'BulkCarrier' | 'Tanker' | 'RoRo';
export type FuelType = 'HFO' | 'LNG' | 'MGO';

export interface Route {
  id: number;         
  routeId: string;        
  vesselType: VesselType;
  fuelType: FuelType;
  year: number;
  ghgIntensity: number;  
  fuelConsumption: number;
  distance: number;        
  totalEmissions: number; 
  isBaseline: boolean;     
}
