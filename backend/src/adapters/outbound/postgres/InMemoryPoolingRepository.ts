// src/adapters/outbound/postgres/InMemoryPoolingRepository.ts

import { PoolMember } from "../../../core/domain/pooling";
import { PoolingPort } from "../../../core/ports/PoolingPort";

export class InMemoryPoolingRepository implements PoolingPort {
  private pools: Record<number, PoolMember[][]> = {};

  async savePool(year: number, members: PoolMember[]): Promise<void> {
    if (!this.pools[year]) this.pools[year] = [];
    this.pools[year].push(members);
  }

  async getPools(year: number): Promise<PoolMember[][]> {
    return this.pools[year] ?? [];
  }
}
