

import type { Route } from "../domain/route";


export interface BaselineComparison {
  baseline: Route;
  comparisons: {
    baselineRouteId: string;
    comparisonRouteId: string;
    baselineGhg: number;
    comparisonGhg: number;
    percentDiff: number;
    compliant: boolean;
  }[];
}

export interface RouteApiPort {
  getRoutes(): Promise<Route[]>;
  setBaseline(id: number): Promise<void>;
  getBaselineComparison(): Promise<BaselineComparison>;
}

