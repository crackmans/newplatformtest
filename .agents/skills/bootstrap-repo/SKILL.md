# Skill: bootstrap-repo

## Goal
Initialize or stabilize a repository when project structure is not fully fixed, while aligning to the active hybrid direction:
- web = React
- desktop = Electron + React renderer
- mobile = React Native

## When to use
Use this skill when:
- the repository is brand new or incomplete,
- target boundaries are not fully documented,
- workspace/package structure is still being decided,
- verification scripts are incomplete,
- the team needs a safe starting shape without forcing premature abstractions.

## Inputs to collect first
Read and summarize when available:
1. `AGENTS.md` (root)
2. `PROJECT_BOOTSTRAP.md`
3. root configs (`package.json`, workspace config, README, docs)
4. design/migration notes describing web/desktop/mobile/shared boundaries

## Required behavior
1. Preserve strict runtime boundaries:
   - `apps/desktop/main`
   - `apps/desktop/preload`
   - `apps/desktop/renderer`
2. Separate fixed decisions from still-flexible decisions.
3. Recommend shared-first package zones:
   - domain/types/utils/api/validation/config/design tokens
4. Do not force one UI implementation across web/desktop/mobile.
5. Keep UI consistency goals explicit even when implementation splits.
6. Do not invent verification commands; mark missing ones as pending.
7. Produce a bootstrap plan artifact before non-trivial setup changes.
8. End with a session handoff artifact.

## Expected outputs
- boundary map summary (web/desktop/mobile/shared)
- `.agents/templates/repo-bootstrap-plan.md`-based plan
- fixed vs pending decision list
- minimal bootstrap file changes only
- verification status summary
- next-step handoff

## Safe defaults
- read first, then make the smallest viable structure changes
- keep generated files within the workspace
- prefer repo-native scripts once they exist
- shared-first for logic/contracts/tokens, split for runtime-specific UI/process code

## Anti-patterns
Do not:
- treat Electron desktop as a single undifferentiated app,
- mix main/preload concerns into renderer/shared code,
- assume mobile RN UI should always reuse web renderer files,
- force platform-unsafe libraries into shared packages,
- claim verification passed when no runnable verification loop exists.
