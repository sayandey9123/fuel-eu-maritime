

import { computeComplianceBalance } from "../domain/compliance";
import { ComplianceRecord, BankEntry, ApplyBankRequest } from "../domain/banking";
import { CompliancePort } from "../ports/CompliancePort";
import { BankingRepository } from "../ports/BankingRepository";

export class BankingService {
  constructor(
    private complianceRepo: CompliancePort,
    private bankingRepo: BankingRepository
  ) {}

 
  async computeCB(shipId: string, year: number, actualIntensity: number, fuelConsumption: number): Promise<ComplianceRecord> {
    const cb = computeComplianceBalance(actualIntensity, fuelConsumption);

    const record: ComplianceRecord = { shipId, year, cb };
    await this.complianceRepo.saveCompliance(record);

    return record;
  }

 
  async bankSurplus(shipId: string, year: number): Promise<BankEntry> {
    const record = await this.complianceRepo.getCompliance(shipId, year);
    if (!record) {
      throw new Error("No compliance record found for this year.");
    }

    if (record.cb <= 0) {
      throw new Error("CB is not positive. Cannot bank deficit or zero.");
    }

    const entry: BankEntry = { shipId, year, amount: record.cb };
    await this.bankingRepo.addBankEntry(entry);

    return entry;
  }

 
  async applyBanked(request: ApplyBankRequest): Promise<{
    cb_before: number;
    applied: number;
    cb_after: number;
  }> {
    const { shipId, year, amount } = request;

    const record = await this.complianceRepo.getCompliance(shipId, year);
    if (!record) {
      throw new Error("No compliance record found.");
    }

    if (record.cb >= 0) {
      throw new Error("CB is not a deficit. Cannot apply banked surplus.");
    }

    const availableBanked = await this.bankingRepo.getBankedAmount(shipId, year);

    if (amount > availableBanked) {
      throw new Error("Not enough banked surplus to apply this amount.");
    }

    const cb_before = record.cb;
    const cb_after = cb_before + amount; // reducing deficit (cb is negative)
    const applied = amount;

    await this.complianceRepo.saveCompliance({ shipId, year, cb: cb_after });

    return { cb_before, applied, cb_after };
  }

  async getBankEntries(shipId: string, year: number) {
  return this.bankingRepo.getBankEntries(shipId, year);
}

}
