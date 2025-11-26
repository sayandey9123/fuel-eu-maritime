// src/core/domain/compliance.ts

// Target GHG intensity for 2025
export const TARGET_INTENSITY_2025 = 89.3368; // gCO2e/MJ

// Conversion factor: 1 ton of fuel ≈ 41,000 MJ energy
export const ENERGY_FACTOR_MJ_PER_TON = 41000;

/**
 * Compute energy in scope (MJ)
 */
export function computeEnergyInScope(fuelConsumptionTons: number): number {
  return fuelConsumptionTons * ENERGY_FACTOR_MJ_PER_TON;
}

/**
 * Compute Compliance Balance (CB)
 * Formula: (Target - Actual) × Energy
 */
export function computeComplianceBalance(
  actualGhgIntensity: number,
  fuelConsumptionTons: number,
  targetIntensity: number = TARGET_INTENSITY_2025
): number {
  const energy = computeEnergyInScope(fuelConsumptionTons);
  return (targetIntensity - actualGhgIntensity) * energy;
}
