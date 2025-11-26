

import { BankingRepository } from "../../../core/ports/BankingRepository";
import { BankEntry } from "../../../core/domain/banking";

export class InMemoryBankingRepository implements BankingRepository {
  private entries: BankEntry[] = [];

  async addBankEntry(entry: BankEntry): Promise<void> {
    this.entries.push(entry);
  }

  async getBankedAmount(shipId: string, year: number): Promise<number> {
    const shipEntries = this.entries.filter(
      e => e.shipId === shipId && e.year === year
    );

    return shipEntries.reduce((sum, e) => sum + e.amount, 0);
  }

  async getBankEntries(shipId: string, year: number): Promise<BankEntry[]> {
    return this.entries.filter(
      e => e.shipId === shipId && e.year === year
    );
  }
}
