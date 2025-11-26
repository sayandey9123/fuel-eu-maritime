

import { BankEntry } from "../domain/banking";

export interface BankingRepository {
  getBankedAmount(shipId: string, year: number): Promise<number>;
  addBankEntry(entry: BankEntry): Promise<void>;
  getBankEntries(shipId: string, year: number): Promise<BankEntry[]>;
}
