// src/core/ports/PoolingPort.ts

import { PoolMember } from "../domain/pooling";

export interface PoolingPort {
  savePool(year: number, members: PoolMember[]): Promise<void>;
  getPools(year: number): Promise<PoolMember[][]>;
}
