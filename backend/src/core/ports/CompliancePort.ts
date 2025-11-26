// src/core/ports/CompliancePort.ts

import { ComplianceRecord } from "../domain/banking";

export interface CompliancePort {
  computeCompliance(shipId: string, year: number): Promise<ComplianceRecord>;
  saveCompliance(record: ComplianceRecord): Promise<void>;
  getCompliance(shipId: string, year: number): Promise<ComplianceRecord | null>;
}
