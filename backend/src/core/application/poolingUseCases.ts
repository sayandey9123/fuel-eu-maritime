// src/core/application/poolingUseCases.ts

import { CompliancePort } from "../ports/CompliancePort";
import { BankingRepository } from "../ports/BankingRepository";
import { PoolingPort } from "../ports/PoolingPort";

import { PoolRequest, PoolResult, PoolMember } from "../domain/pooling";

export class PoolingService {
  constructor(
    private complianceRepo: CompliancePort,
    private bankingRepo: BankingRepository,
    private poolingRepo: PoolingPort
  ) {}

  /**
   * Create a compliance pool based on Article 21.
   */
  async createPool(request: PoolRequest): Promise<PoolResult> {
    const year = request.year;

    // 1. Load compliance balances for each ship
    const members: PoolMember[] = [];

    for (const m of request.members) {
      const cbRecord = await this.complianceRepo.getCompliance(m.shipId, year);

      if (!cbRecord) {
        throw new Error(`No CB record found for ship ${m.shipId} in year ${year}`);
      }

      members.push({
        shipId: m.shipId,
        year,
        cb_before: cbRecord.cb,
        cb_after: cbRecord.cb,
      });
    }

    // 2. Sort: Surplus ships first (desc), deficit ships last
    members.sort((a, b) => b.cb_before - a.cb_before);

    // 3. Apply greedy pooling
    let total = 0;

    // calculate total pool sum
    for (const m of members) total += m.cb_before;

    const valid = total >= 0;

    if (!valid) {
      return {
        members,
        pool_sum: total,
        valid: false,
      };
    }

    // Greedy transfer of surplus to deficits
    for (const surplus of members.filter(m => m.cb_before > 0)) {
      for (const deficit of members.filter(m => m.cb_after < 0)) {
        if (surplus.cb_after <= 0) break;

        const needed = -deficit.cb_after;

        const transfer = Math.min(surplus.cb_after, needed);

        surplus.cb_after -= transfer;
        deficit.cb_after += transfer;
      }
    }

    // 4. Save pool result
    await this.poolingRepo.savePool(year, members);

    return {
      members,
      pool_sum: total,
      valid: true,
    };
  }
}
