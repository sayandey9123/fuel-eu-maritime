# Reflection on Using AI Agents During Development
Working with AI agents throughout this assignment significantly shaped both the workflow and the structure of the project. 
This reflection summarizes what I learned, the efficiency gains compared to manual coding, and what I would improve in future AI-assisted development.

# What I Learned Using AI Agents
1. AI is excellent for architectural scaffolding

AI tools helped me reason about hexagonal architecture, isolate domain logic, and structure folders consistently. 
They provided quick conceptual breakdowns and assisted in visualizing the clean separation between core/application/adapters layers.

2. AI accelerates boilerplate and repetitive tasks
  Generating:
- TypeScript interfaces
- React components
- Express controllers
- Axios clients

was faster and more consistent using AI suggestions.

3. Human validation is essential
  I learned that AI still:
- hallucinates imports
- mixes layers (e.g., trying to put business logic inside controllers)
- produces path errors
- generates incomplete or incorrect pooling logic
  
This reinforced that AI is a helper, not a replacement for human understanding.
Every suggestion still needed proper review, integration, and debugging.

# Efficiency Gains vs Manual Coding
## Efficiency Gains
- 50–60% faster generation of boilerplate code (React, TypeScript interfaces, API clients)
- Much faster architectural prototyping
- Quickly iterating between domain and API design
- AI-assisted debugging (especially routing and TypeScript issues)
- Reduced cognitive load for repetitive UI structure

## Where Manual Coding Was Still Required
- Core domain logic (CB calculation, banking, pooling)
- Ensuring correctness of formulas and edge cases
- Maintaining strict hexagonal boundaries
- Handling routing mismatches
- Removing hallucinated or wrong code
- Validating final behavior using Postman/Thunder Client
- 
AI increased speed, but correctness still depended on manual reasoning and structured thinking.

Improvements I Would Make Next Time
1. Provide more precise prompts
Some AI mistakes came from vague prompts. Next time, I would:
- Specify exact file paths
- Define expected inputs/outputs
- Provide architectural constraints upfront
- Break large tasks into smaller instructions

2. Use automated tests earlier

While tests were added later, integrating them earlier would prevent regressions caused by AI-generated code changes.

3. Let AI generate only isolated parts, not the whole file

AI sometimes overwrote existing code. In future, I would:

- Ask for snippets instead of full replacements
- Use AI for refactoring within boundaries
- Keep diff reviews strict

4. Combine multiple agents more intentionally

Each agent has different strengths:

 - Copilot: inline code
 - ChatGPT: architectural reasoning
 - Cursor: refactoring
 - Claude: rewriting

Better dividing tasks among agents would improve consistency.
