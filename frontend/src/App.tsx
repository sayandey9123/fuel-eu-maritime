import { useState } from "react";
import RoutesTab from "./adapters/ui/RoutesTab";
import CompareTab from "./adapters/ui/CompareTab";
import BankingTab from "./adapters/ui/BankingTab";
import PoolingTab from "./adapters/ui/PoolingTab";



export default function App() {
  const [tab, setTab] = useState<"routes" | "compare" | "banking" | "pooling">("routes");



  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setTab("routes")}
          className={`px-4 py-2 rounded ${tab === "routes" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Routes
        </button>
        <button
          onClick={() => setTab("compare")}
          className={`px-4 py-2 rounded ${tab === "compare" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Compare
        </button>

        <button
          onClick={() => setTab("banking")}
          className={`px-4 py-2 rounded ${tab === "banking" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Banking
        </button>

        <button
          onClick={() => setTab("pooling")}
          className={`px-4 py-2 rounded ${tab === "pooling" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Pooling
        </button>


      </div>

      {tab === "routes" && <RoutesTab />}
      {tab === "compare" && <CompareTab />}
      {tab === "banking" && <BankingTab />}
      {tab === "pooling" && <PoolingTab />}

    </div>
  );
}
