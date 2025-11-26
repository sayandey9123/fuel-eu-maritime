import { useState } from "react";
import { PoolingApiClient } from "../infrastructure/poolingApiClient";
import { BankingApiClient } from "../infrastructure/bankingApiClient";

const poolingApi = new PoolingApiClient();
const bankingApi = new BankingApiClient();

export default function PoolingTab() {
  const [year, setYear] = useState(2024);

  // For demo: enter ship IDs manually
  const [ships, setShips] = useState<string[]>(["SHIP1", "SHIP2"]);

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [newShip, setNewShip] = useState("");

  function addShip() {
    if (newShip.trim() === "") return;
    setShips((prev) => [...prev, newShip.trim()]);
    setNewShip("");
  }

  async function createPool() {
    try {
      setError(null);

      // Must compute CB for every ship before pooling
      for (const s of ships) {
        await bankingApi.computeCB(s, year, 90, 5000);
      }

      const res = await poolingApi.createPool(year, ships);
      setResult(res);

    } catch (e: any) {
      setError(e.response?.data?.error || e.message);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Pooling</h2>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label>Pool Year:</label>
        <input
          type="number"
          className="border p-2 ml-2"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Ships in Pool:</h3>

        {ships.map((s, idx) => (
          <p key={idx} className="bg-gray-200 p-2 rounded">{s}</p>
        ))}

        <div className="flex gap-2">
          <input
            className="border p-2"
            placeholder="Add ship ID"
            value={newShip}
            onChange={(e) => setNewShip(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addShip}
          >
            Add
          </button>
        </div>
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={createPool}
      >
        Create Pool
      </button>

      {result && (
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Pool Result</h3>
          <p>Total CB: {result.pool_sum}</p>
          <p>Valid: {result.valid ? "Yes" : "No"} </p>

          <h4 className="font-semibold mt-2">Members:</h4>
          {result.members.map((m: any, idx: number) => (
            <div key={idx} className="p-2 border rounded mt-1">
              <p>Ship: {m.shipId}</p>
              <p>Before: {m.cb_before}</p>
              <p>After: {m.cb_after}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
