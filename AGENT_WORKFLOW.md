# AI Agent Workflow Log
## Agents Used
1. ChatGPT (OpenAI) – architecture design, backend logic, debugging, React flows
2. GitHub Copilot – inline component scaffolding, TypeScript suggestions, boilerplate
3. Cursor Agent – multi-file edits, refactoring, folder generation, fixing imports

## Prompts & Outputs
# Example 1 — Backend Use-Case Generation
 - Prompt
Generate a BankingService class in TypeScript using hexagonal architecture. 
It must implement computeCB, bankSurplus, and applyBanked. 
Use CompliancePort and BankingRepository as dependencies.

 - AI Output
   export class BankingService {
  constructor(
    private complianceRepo: CompliancePort,
    private bankingRepo: BankingRepository
  ) {}

  async bankSurplus(shipId: string, year: number): Promise<BankEntry> {
    const record = await this.complianceRepo.getCompliance(shipId, year);
    if (!record) throw new Error("No compliance record found.");
    if (record.cb <= 0) throw new Error("CB is not positive.");
    return { shipId, year, amount: record.cb };
  }
}

# Refinements and Corrections Made
- Added proper CB computation (domain formula)
- Added saving of updated CB records
- Ensured error messages follow assignment rules
- Verified ports & adapters separation (no Express logic inside domain)

# Verified ports & adapters separation (no Express logic inside domain)
 - Prompt
   Generate a React BankingTab component using TailwindCSS.
  It should compute CB, bank surplus, apply banking, and show results.

 - AI Output
   <button className="bg-blue-500 text-white">Compute CB</button>

  # Refinements and Corrections Made 
  - Added TypeScript strict types
  - Added axios API integration
  - Added error handling state
  - Added proper layout using TailwindCSS
  - Connected to banking use-case via ports
  - Ensured all interactions matched backend API shape


## Validation / Corrections
 # TypeScript Error Fixing
    The AI often produced:
    - incorrect import paths
    - missing interface definitions
    - unused variables
    - wrong generic types

    All were resolved using:
    - TypeScript compiler warnings
    - Cursor Agent auto-fix
    - Manual corrections
    
    Manual API Testing
      Each AI-generated backend snippet was validated using Thunder Client:
      - Valid inputs tested (successful cases)
      - Error cases validated (missing params, negative CB, invalid pool)
      - Checked JSON correctness and HTTP status codes
      
    Architectural Consistency
      AI sometimes mixed layers (placing routing logic inside domain use-cases).
      I corrected this by:
      - Moving business logic into core/application
      - Keeping controllers in adapters/inbound/http
      - Keeping repositories in adapters/outbound/postgres

    Pooling Logic Fix
    AI’s initial pooling logic was incorrect.

    Wrong output: 
   surplus.cb_after += deficit.cb_after;
  
   Correct (final implementation)
     const needed = -deficit.cb_after;
     const transfer = Math.min(surplus.cb_after, needed);

    surplus.cb_after -= transfer;
    deficit.cb_after += transfer;

This ensures:
- Deficit ships never exist worse
- surplus ships never go negative
- total CB remains consistent

 # Observations
## Where AI Saved Time
- Creating React components quickly
- Generating TypeScript interfaces and ports
- Producing boilerplate controllers and routers
- Building axios API wrappers
- Explaining complex FuelEU logic clearly

## Where AI Failed or Hallucinated
- Wrong import paths (e.g., ../domian instead of ../domain)
- Incorrect folder assumptions
- Extra characters in URLs (/banking/bank%0A)
- Over-simplified pooling logic
- Duplicate types


## Combination of Tools Used Effectively
- ChatGPT: high-level design + domain corrections
- Copilot: inline completions in React & TypeScript
- Cursor Agent: batch edits + path corrections
- Manual fixes: ensuring domain correctness and architecture integrity


# Best Practices Followed
- Broke tasks into smaller prompts for precision
- Used Cursor’s tasks.md to generate multi-file structures
- Validated every AI output with TypeScript strict mode
- Ensured domain has zero dependency on frameworks
- Used Postman/Thunder Client after every API change
- Reviewed code changes manually before accepting





























