
import { RouteRepository } from '../ports/RouteRepository';
import { Route } from '../domain/route';

export class RouteService {
  constructor(private readonly routeRepo: RouteRepository) {}


  async getRoutes(): Promise<Route[]> {
    return this.routeRepo.getAllRoutes();
  }


  async setBaseline(id: number): Promise<void> {
    const route = await this.routeRepo.getRouteById(id);
    if (!route) {
      throw new Error('Route not found');
    }

    await this.routeRepo.setBaseline(id);
  }


  async getBaselineComparison() {
    const all = await this.routeRepo.getAllRoutes();
    const baseline = all.find((r) => r.isBaseline);

    if (!baseline) {
      throw new Error('No baseline route set');
    }

    const comparisons = all
      .filter((r) => r.id !== baseline.id)
      .map((r) => {
        const percentDiff = ((r.ghgIntensity / baseline.ghgIntensity) - 1) * 100;

        const compliant = r.ghgIntensity <= baseline.ghgIntensity;

        return {
          baselineRouteId: baseline.routeId,
          comparisonRouteId: r.routeId,
          baselineGhg: baseline.ghgIntensity,
          comparisonGhg: r.ghgIntensity,
          percentDiff,
          compliant
        };
      });

    return {
      baseline,
      comparisons
    };
  }
}
