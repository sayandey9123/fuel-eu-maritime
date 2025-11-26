// src/infrastructure/server/index.ts

import express from 'express';
import cors from 'cors';

// Routes dependencies
import { InMemoryRouteRepository } from '../../adapters/outbound/postgres/InMemoryRouteRepository';
import { RouteService } from '../../core/application/routeUseCases';
import { createRoutesRouter } from '../../adapters/inbound/http/routesController';

import { InMemoryPoolingRepository } from "../../adapters/outbound/postgres/InMemoryPoolingRepository";
import { PoolingService } from "../../core/application/poolingUseCases";
import { createPoolingRouter } from "../../adapters/inbound/http/poolingController";


// Banking dependencies
import { InMemoryComplianceRepository } from "../../adapters/outbound/postgres/InMemoryComplianceRepository";
import { InMemoryBankingRepository } from "../../adapters/outbound/postgres/InMemoryBankingRepository";
import { BankingService } from "../../core/application/bankingUseCases";
import { createBankingRouter } from "../../adapters/inbound/http/bankingController";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ========================
// ROUTES MODULE SETUP
// ========================
const routeRepo = new InMemoryRouteRepository();
const routeService = new RouteService(routeRepo);
const routesRouter = createRoutesRouter(routeService);
app.use('/routes', routesRouter);

// ========================
// BANKING MODULE SETUP
// ========================
const complianceRepo = new InMemoryComplianceRepository();
const bankingRepo = new InMemoryBankingRepository();
const bankingService = new BankingService(complianceRepo, bankingRepo);
const bankingRouter = createBankingRouter(bankingService);

// ========================
// POOLING SETUP
// ========================
const poolingRepo = new InMemoryPoolingRepository();
const poolingService = new PoolingService(complianceRepo, bankingRepo, poolingRepo);
const poolingRouter = createPoolingRouter(poolingService);

app.use("/pools", poolingRouter);


app.use("/banking", bankingRouter);
app.use("/compliance", bankingRouter);

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
