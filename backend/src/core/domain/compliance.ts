


export const TARGET_INTENSITY_2025 = 89.3368; // gCO2e/MJ


export const ENERGY_FACTOR_MJ_PER_TON = 41000;


export function computeEnergyInScope(fuelConsumptionTons: number): number {
  return fuelConsumptionTons * ENERGY_FACTOR_MJ_PER_TON;
}


export function computeComplianceBalance(
  actualGhgIntensity: number,
  fuelConsumptionTons: number,
  targetIntensity: number = TARGET_INTENSITY_2025
): number {
  const energy = computeEnergyInScope(fuelConsumptionTons);
  return (targetIntensity - actualGhgIntensity) * energy;
}
