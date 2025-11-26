

import { Router, Request, Response } from 'express';
import { RouteService } from '../../../core/application/routeUseCases';

export function createRoutesRouter(routeService: RouteService): Router {
  const router = Router();


  router.get('/', async (_req: Request, res: Response) => {
    try {
      const routes = await routeService.getRoutes();
      res.json(routes);
    } catch (err: any) {
      res.status(500).json({ error: err.message ?? 'Failed to fetch routes' });
    }
  });


  router.post('/:id/baseline', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'Invalid route id' });
      }

      await routeService.setBaseline(id);
      res.status(204).send(); // No content
    } catch (err: any) {
      res.status(400).json({ error: err.message ?? 'Failed to set baseline' });
    }
  });

  router.get('/comparison/all', async (_req: Request, res: Response) => {
    try {
      const comparison = await routeService.getBaselineComparison();
      res.json(comparison);
    } catch (err: any) {
      res.status(400).json({ error: err.message ?? 'Failed to get comparison' });
    }
  });

  return router;
}
