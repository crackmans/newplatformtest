# Skill: bootstrap-repo

## Goal
Initialize or stabilize a repository when project structure is not fully fixed, while aligning to the active direction:
- web = React
- desktop = Electron + React renderer
- mobile = React Native
- server = optional (Java / Spring / PostgreSQL / MyBatis)

## When to use
Use this skill when:
- the repository is brand new or incomplete,
- target boundaries are not fully documented,
- workspace/package structure is still being decided,
- verification scripts are incomplete,
- the team needs a safe starting shape without forcing premature abstractions,
- the team must classify bootstrap mode as either:
  - frontend only
  - frontend + server.

## Inputs to collect first
Read and summarize when available:
1. `AGENTS.md` (root)
2. `PROJECT_BOOTSTRAP.md`
3. root configs (`package.json`, workspace config, README, docs)
4. design/migration notes describing web/desktop/mobile/shared boundaries
5. server docs/config references when server is in scope (Java/Spring/PostgreSQL/MyBatis baseline docs)

## Required behavior
1. Classify project mode first:
   - frontend only
   - frontend + server
2. Preserve strict runtime boundaries:
   - `apps/desktop/main`
   - `apps/desktop/preload`
   - `apps/desktop/renderer`
3. If server is active, preserve backend boundary clarity:
   - Spring runtime boundary
   - MyBatis mapper/XML/query boundary
   - PostgreSQL access boundary
4. Separate fixed decisions from still-flexible decisions.
5. Recommend shared-first package zones:
   - domain/types/utils/api/validation/config/design tokens
6. Do not force one UI implementation across web/desktop/mobile.
7. Keep UI consistency goals explicit even when implementation splits.
8. Respect Java / Spring / PostgreSQL / MyBatis baseline when server is active; do not propose JPA/ORM migration.
9. Do not force early backend structure lock when not required; keep unresolved pieces explicit.
10. Do not invent verification commands; mark missing ones as pending.
11. Produce a bootstrap plan artifact before non-trivial setup changes.
12. End with a session handoff artifact.

## Expected outputs
- project mode classification (frontend only or frontend + server)
- boundary map summary (frontend targets + optional server + shared)
- `.agents/templates/repo-bootstrap-plan.md`-based plan
- fixed vs pending decision list
- verification baseline split by active targets (server optional)
- minimal bootstrap file changes only
- verification status summary
- next-step handoff

## Safe defaults
- read first, then make the smallest viable structure changes
- keep generated files within the workspace
- prefer repo-native scripts once they exist
- shared-first for logic/contracts/tokens, split for runtime-specific UI/process code
- if server is not active, do not force server scaffolding
- if server is active, lock only baseline choices needed now and leave the rest flexible

## Anti-patterns
Do not:
- treat Electron desktop as a single undifferentiated app,
- mix main/preload concerns into renderer/shared code,
- assume mobile RN UI should always reuse web renderer files,
- force server inclusion for every new project,
- over-design backend modules during bootstrap,
- force platform-unsafe libraries into shared packages,
- claim verification passed when no runnable verification loop exists.
