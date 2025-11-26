import { useState } from "react";
import { BankingApiClient } from "../infrastructure/bankingApiClient";

const api = new BankingApiClient();

export default function BankingTab() {
  const [shipId, setShipId] = useState("SHIP1");
  const [year, setYear] = useState(2024);

  const [actualIntensity, setActualIntensity] = useState(90);
  const [fuelConsumption, setFuelConsumption] = useState(5000);

  const [cbResult, setCbResult] = useState<any>(null);
  const [bankResult, setBankResult] = useState<any>(null);
  const [applyResult, setApplyResult] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);

  const [applyAmount, setApplyAmount] = useState(0);

  const [error, setError] = useState<string | null>(null);

  async function computeCB() {
    try {
      setError(null);
      const res = await api.computeCB(shipId, year, actualIntensity, fuelConsumption);
      setCbResult(res);
    } catch (e: any) {
      setError(e.response?.data?.error || e.message);
    }
  }

  async function bank() {
    try {
      setError(null);
      const res = await api.bankSurplus(shipId, year);
      setBankResult(res);
    } catch (e: any) {
      setError(e.response?.data?.error || e.message);
    }
  }

  async function apply() {
    try {
      setError(null);
      const res = await api.applyBanked(shipId, year, applyAmount);
      setApplyResult(res);
    } catch (e: any) {
      setError(e.response?.data?.error || e.message);
    }
  }

  async function fetchRecords() {
    try {
      setError(null);
      const res = await api.getBankRecords(shipId, year);
      setRecords(res);
    } catch (e: any) {
      setError(e.response?.data?.error || e.message);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Banking</h2>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Ship ID</label>
          <input className="border p-2 w-full"
            value={shipId}
            onChange={(e) => setShipId(e.target.value)}
          />
        </div>

        <div>
          <label>Year</label>
          <input className="border p-2 w-full"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Compute CB */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={computeCB}>
        Compute CB
      </button>

      {cbResult && (
        <div className="p-3 bg-gray-100 rounded">
          <p>CB: {cbResult.cb}</p>
        </div>
      )}

      {/* Bank Surplus */}
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={bank}>
        Bank Surplus
      </button>

      {bankResult && (
        <div className="p-3 bg-green-100 rounded">
          <p>Banked: {bankResult.amount}</p>
        </div>
      )}

      {/* Apply Banking */}
      <div>
        <label>Apply Amount</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={applyAmount}
          onChange={(e) => setApplyAmount(Number(e.target.value))}
        />
      </div>

      <button className="bg-orange-600 text-white px-4 py-2 rounded" onClick={apply}>
        Apply Banked CB
      </button>

      {applyResult && (
        <div className="p-3 bg-orange-100 rounded">
          <p>Before: {applyResult.cb_before}</p>
          <p>Applied: {applyResult.applied}</p>
          <p>After: {applyResult.cb_after}</p>
        </div>
      )}

      {/* Fetch Records */}
      <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={fetchRecords}>
        View Bank Records
      </button>

      {records.length > 0 && (
        <div className="p-3 bg-gray-100 rounded">
          <h3 className="font-semibold">Records:</h3>
          {records.map((r, idx) => (
            <p key={idx}>Year {r.year}: {r.amount}</p>
          ))}
        </div>
      )}
    </div>
  );
}
