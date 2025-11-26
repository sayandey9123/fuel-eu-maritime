// src/adapters/outbound/postgres/InMemoryComplianceRepository.ts

import { CompliancePort } from "../../../core/ports/CompliancePort";
import { ComplianceRecord } from "../../../core/domain/banking";

export class InMemoryComplianceRepository implements CompliancePort {
  private records: ComplianceRecord[] = [];

  async computeCompliance(shipId: string, year: number): Promise<ComplianceRecord> {
    const record = this.records.find(r => r.shipId === shipId && r.year === year);

    if (!record) {
      throw new Error("No compliance record found for this ship and year.");
    }

    return record;
  }

  async saveCompliance(record: ComplianceRecord): Promise<void> {
    const index = this.records.findIndex(r => r.shipId === record.shipId && r.year === record.year);

    if (index !== -1) {
      this.records[index] = record;
    } else {
      this.records.push(record);
    }
  }

  async getCompliance(shipId: string, year: number): Promise<ComplianceRecord | null> {
    return this.records.find(r => r.shipId === shipId && r.year === year) ?? null;
  }
}
