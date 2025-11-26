import { useEffect, useState } from "react";
import type { BaselineComparison } from "../../core/ports/RouteApiPort";
import { HttpRouteApiClient } from "../infrastructure/routeApiClient";

const api = new HttpRouteApiClient();

export default function CompareTab() {
  const [data, setData] = useState<BaselineComparison | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadComparison() {
    try {
      setLoading(true);
      const res = await api.getBaselineComparison();
      setData(res);
    } catch (e: any) {
      setError(e.message ?? "Failed to load comparison data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComparison();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Compare Routes</h2>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <div>
          <h3 className="text-lg font-semibold">
            Baseline: {data.baseline.routeId} — {data.baseline.ghgIntensity} gCO₂e/MJ
          </h3>

          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Comparison Route</th>
                <th className="border p-2">Baseline GHG</th>
                <th className="border p-2">Comparison GHG</th>
                <th className="border p-2">% Difference</th>
                <th className="border p-2">Compliant</th>
              </tr>
            </thead>

            <tbody>
              {data.comparisons.map((c) => (
                <tr key={c.comparisonRouteId} className="text-center">
                  <td className="border p-2">{c.comparisonRouteId}</td>
                  <td className="border p-2">{c.baselineGhg.toFixed(2)}</td>
                  <td className="border p-2">{c.comparisonGhg.toFixed(2)}</td>
                  <td className="border p-2">{c.percentDiff.toFixed(2)}%</td>
                  <td className="border p-2">
                    {c.compliant ? (
                      <span className="text-green-700 font-bold">✔ Yes</span>
                    ) : (
                      <span className="text-red-600 font-bold">✖ No</span>
                    )}
                  </td>
                </tr>
              ))}

              {data.comparisons.length === 0 && (
                <tr>
                  <td className="p-4 text-gray-500" colSpan={5}>
                    No comparison routes available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
