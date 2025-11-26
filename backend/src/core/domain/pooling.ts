

export interface PoolMember {
  shipId: string;
  year: number;
  cb_before: number;   // original CB
  cb_after: number;    // after pooling
}

export interface PoolRequest {
  year: number;
  members: { shipId: string }[];
}

export interface PoolResult {
  members: PoolMember[];
  pool_sum: number;
  valid: boolean;
}
