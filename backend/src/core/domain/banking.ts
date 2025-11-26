// src/core/domain/banking.ts

export interface ComplianceRecord {
  shipId: string;
  year: number;
  cb: number; // compliance balance (can be + or -)
}

export interface BankEntry {
  shipId: string;
  year: number;
  amount: number; // how much CB was banked
}

export interface ApplyBankRequest {
  shipId: string;
  year: number;
  amount: number; // how much to apply to cover deficit
}
