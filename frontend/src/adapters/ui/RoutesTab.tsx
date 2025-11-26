import { useEffect, useState } from "react";
import type { Route } from "../../core/domain/route";
import { HttpRouteApiClient } from "../infrastructure/routeApiClient";

const api = new HttpRouteApiClient();

export default function RoutesTab() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [vesselType, setVesselType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [year, setYear] = useState("");

  async function loadRoutes() {
    try {
      setLoading(true);
      const data = await api.getRoutes();
      setRoutes(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to load routes");
    } finally {
      setLoading(false);
    }
  }

  async function setBaseline(id: number) {
    try {
      setLoading(true);
      await api.setBaseline(id);
      await loadRoutes();
    } catch (e: any) {
      setError(e.message ?? "Failed to set baseline");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRoutes();
  }, []);

  const filtered = routes.filter((r) => {
    return (
      (!vesselType || r.vesselType === vesselType) &&
      (!fuelType || r.fuelType === fuelType) &&
      (!year || String(r.year) === year)
    );
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Routes</h2>

      {/* Filters */}
      <div className="flex gap-2">
        <select
          value={vesselType}
          onChange={(e) => setVesselType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Vessel Types</option>
          <option value="Container">Container</option>
          <option value="BulkCarrier">BulkCarrier</option>
          <option value="Tanker">Tanker</option>
          <option value="RoRo">RoRo</option>
        </select>

        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Fuel Types</option>
          <option value="HFO">HFO</option>
          <option value="LNG">LNG</option>
          <option value="MGO">MGO</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Years</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Routes Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Route ID</th>
            <th className="border p-2">Vessel Type</th>
            <th className="border p-2">Fuel Type</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">GHG</th>
            <th className="border p-2">Fuel</th>
            <th className="border p-2">Distance</th>
            <th className="border p-2">Emissions</th>
            <th className="border p-2">Baseline</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.routeId}</td>
              <td className="border p-2">{r.vesselType}</td>
              <td className="border p-2">{r.fuelType}</td>
              <td className="border p-2">{r.year}</td>
              <td className="border p-2">{r.ghgIntensity}</td>
              <td className="border p-2">{r.fuelConsumption}</td>
              <td className="border p-2">{r.distance}</td>
              <td className="border p-2">{r.totalEmissions}</td>
              <td className="border p-2">
                {r.isBaseline ? (
                  <span className="text-green-700 font-semibold">YES</span>
                ) : (
                  "NO"
                )}
              </td>

              <td className="border p-2">
                {!r.isBaseline && (
                  <button
                    onClick={() => setBaseline(r.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Set Baseline
                  </button>
                )}
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={10} className="p-4 text-center text-gray-500">
                No routes match the selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
