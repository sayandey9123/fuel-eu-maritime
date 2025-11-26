

import { Router, Request, Response } from "express";
import { PoolingService } from "../../../core/application/poolingUseCases";

export function createPoolingRouter(poolingService: PoolingService): Router {
  const router = Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const result = await poolingService.createPool(req.body);
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  return router;
}
