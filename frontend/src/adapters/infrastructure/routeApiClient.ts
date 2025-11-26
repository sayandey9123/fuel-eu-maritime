// src/adapters/infrastructure/routeApiClient.ts

import axios from "axios";
import type { RouteApiPort, BaselineComparison } from "../../core/ports/RouteApiPort";

import type { Route } from "../../core/domain/route";


const API_URL = "http://localhost:4000"; // backend URL

export class HttpRouteApiClient implements RouteApiPort {
  async getRoutes(): Promise<Route[]> {
    const response = await axios.get<Route[]>(`${API_URL}/routes`);
    return response.data;
  }

  async setBaseline(id: number): Promise<void> {
    await axios.post(`${API_URL}/routes/${id}/baseline`);
  }

  async getBaselineComparison(): Promise<BaselineComparison> {
    const response = await axios.get<BaselineComparison>(`${API_URL}/routes/comparison/all`);
    return response.data;
  }
}
