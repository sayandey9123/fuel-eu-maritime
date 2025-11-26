# A minimal implementation of the FuelEU Maritime Compliance Module, built using React + Tailwind + Node.js + TypeScript and structured using Hexagonal Architecture.

## This project includes:

1. Route management
2. GHG comparison
3. Compliance Balance (CB) computation
4. Banking (Article 20)
5. Pooling (Article 21)

## The goal is to demonstrate:
1. Clean domain-driven architecture
2. Separation of concerns via Hexagonal Architecture
3. Well-structured backend APIs
4. Modern frontend UI using React + Tailwind
5. AI-assisted development


## Technology used
1. Frontend - React (Vite), TypeScript, TailwindCSS, Axios
2. Backend - Node.js (Express), TypeScript, In-memory repositories (can be replaced with PostgreSQL), Hexagonal / Clean Architecture



## Architecture Summary (Hexagonal Structure)

# backend structure:
backend/src/
  core/
    domain/        
    application/   
    ports/         
  adapters/
    inbound/http/  
    outbound/postgres/  
  infrastructure/
    server/        

# frontend structure:
frontend/src/
  core/
    domain/           
    application/       
    ports/             
  adapters/
    ui/                
    infrastructure/    





## Running the Project
# For Backend-
cd backend
npm install
npm run dev

Backend will run at: http://localhost:4000


# For Frontend
cd frontend
npm install
npm run dev

Frontend will run at: http://localhost:5173

## How to Execute Tests
# Backend Tests
cd backend
npm run test

# Frontend Tests
cd frontend
npm run test


## Sample Requests & Responses
1. Compute CB (Compliance Balance) - GET /compliance/cb?shipId=SHIP1&year=2024&actualIntensity=90&fuelConsumption=5000
Response:
{
  "shipId": "SHIP1",
  "year": 2024,
  "cb": 20584000
}

2. Bank Surplus-
   POST /banking/bank
   
{
  "shipId": "SHIP1",
  "year": 2024
}

Response:
{
  "shipId": "SHIP1",
  "year": 2024,
  "amount": 20584000
}

3. Apply Banked CB-
   POST /banking/apply
{
  "shipId": "SHIP1",
  "year": 2024,
  "amount": 5000000
}

Response:
{
  "cb_before": -10000000,
  "applied": 5000000,
  "cb_after": -5000000
}

4. Create Pool (Article 21)-
   POST /pools
{
  "year": 2024,
  "members": [
    { "shipId": "SHIP1" },
    { "shipId": "SHIP2" }
  ]
}

Response:
{
  "valid": true,
  "pool_sum": 15000000,
  "members": [
    {
      "shipId": "SHIP1",
      "cb_before": 20000000,
      "cb_after": 15000000
    },
    {
      "shipId": "SHIP2",
      "cb_before": -5000000,
      "cb_after": 0
    }
  ]
}


















