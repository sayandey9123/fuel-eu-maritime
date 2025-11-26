// src/adapters/inbound/http/bankingController.ts

import { Router, Request, Response } from "express";
import { BankingService } from "../../../core/application/bankingUseCases";

export function createBankingRouter(bankingService: BankingService): Router {
  const router = Router();

  // GET /compliance/cb?shipId&year
  router.get("/cb", async (req: Request, res: Response) => {
    try {
      const { shipId, year, actualIntensity, fuelConsumption } = req.query;

      if (!shipId || !year || !actualIntensity || !fuelConsumption) {
        return res.status(400).json({ error: "Missing query parameters" });
      }

      const record = await bankingService.computeCB(
        String(shipId),
        Number(year),
        Number(actualIntensity),
        Number(fuelConsumption)
      );

      res.json(record);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // POST /banking/bank
  router.post("/bank", async (req: Request, res: Response) => {
    try {
      const { shipId, year } = req.body;

      if (!shipId || !year) {
        return res.status(400).json({ error: "Missing shipId or year" });
      }

      const entry = await bankingService.bankSurplus(shipId, Number(year));
      res.json(entry);

    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // POST /banking/apply
  router.post("/apply", async (req: Request, res: Response) => {
    try {
      const { shipId, year, amount } = req.body;

      if (!shipId || !year || !amount) {
        return res.status(400).json({ error: "Missing input" });
      }

      const result = await bankingService.applyBanked({
        shipId,
        year: Number(year),
        amount: Number(amount),
      });

      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // GET /banking/records?shipId&year
  router.get("/records", async (req: Request, res: Response) => {
    try {
      const { shipId, year } = req.query;

      if (!shipId || !year) {
        return res.status(400).json({ error: "Missing shipId or year" });
      }

      const records = await bankingService.getBankEntries(
         String(shipId),
        Number(year)
        );


      res.json(records);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  return router;
}
