// src/core/ports/RouteRepository.ts

import { Route } from '../domain/route';

export interface RouteRepository {
  getAllRoutes(): Promise<Route[]>;
  getRouteById(id: number): Promise<Route | null>;
  getBaselineRoute(): Promise<Route | null>;
  setBaseline(routeId: number): Promise<void>;
}
