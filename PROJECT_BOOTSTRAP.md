# PROJECT_BOOTSTRAP.md

Use this checklist when the repository is new, incomplete, or still being prepared.
The goal is to initialize a hybrid frontend workspace safely without freezing the wrong structure too early.

## 1) Project identity
- Project name:
- Short description:
- Main goal:
- Greenfield or migration?
- Existing design/migration reference docs?

## 2) Active target map (required)
- Confirm active targets:
  - web = React
  - desktop = Electron + React renderer
  - mobile = React Native
- Confirm supported operating systems per target.
- Confirm whether desktop renderer shares UI/features with web.

## 3) Boundary map (required)
- Confirm app boundaries:
  - `apps/web`
  - `apps/desktop/main`
  - `apps/desktop/preload`
  - `apps/desktop/renderer`
  - `apps/mobile`
- Confirm shared package boundaries:
  - `packages/shared-domain`
  - `packages/shared-types`
  - `packages/shared-utils`
  - `packages/shared-api`
  - `packages/shared-config`
  - `packages/shared-design-tokens`
  - `packages/shared-validation`
- Confirm platform-only code locations (must not leak into shared).

## 4) Sharing strategy (required)
- Shared-first candidates:
  - domain/types/utils/api/validation/config/design tokens
- Conditional sharing candidates:
  - web + desktop renderer UI modules when runtime-safe
- Explicit split candidates:
  - Electron main/preload
  - mobile RN UI when renderer/runtime/API differ
- Record any intentional non-shared implementations and why.

## 5) UI consistency policy (required)
- Define consistency targets across web/desktop/mobile:
  - user flow
  - labels and terminology
  - validation behavior
  - design tokens
- Confirm that consistency does not require identical UI source files.

## 6) Library approval policy (required)
- Dependency selection priority:
  1. compatibility
  2. maintainability
  3. controllability
- Shared-layer dependencies must be safe for all intended consumers.
- Platform-only dependencies must stay inside that platform app boundary.
- Avoid duplicate libraries for the same role across targets unless justified.
- Document reason and scope for each new dependency.

## 7) Technology and workspace baseline
- Main language(s):
- Framework/runtime stack by target:
- Package manager: npm / pnpm / yarn / bun / other
- Monorepo or single repo?
- Workspace tool (if monorepo):
- TypeScript requirement:
- React Native constraints (Expo allowed or not):

## 8) Verification baseline
List only commands that truly exist or are explicitly approved to add.

- install:
- dev/run (by target):
- typecheck:
- lint:
- test:
- build/smoke (by target):

Also define what cannot be claimed without runtime execution.

## 9) Non-negotiable guardrails
- Prefer smallest safe change.
- Do not refactor unrelated areas.
- Do not blur desktop `main/preload/renderer` boundaries.
- Do not force web/mobile UI into one file when runtime models differ.
- Keep shared packages runtime-light and platform-agnostic.
- Keep docs and verification notes synchronized after changes.
- If permission or user-side action is required, request it explicitly from the user and do not use bypass workarounds.

## 10) First-session deliverables
1. Current boundary summary (web/desktop/mobile/shared)
2. Draft execution plan with explicit in/out scope
3. Minimal bootstrap changes only
4. Verification command summary (PASS/FAIL/SKIP)
5. Session handoff artifact under `work-notes/`

## 11) Flexible vs fixed decisions
Mark explicitly:
- Fixed now:
  - active target map
  - boundary ownership
  - library approval policy
- Still flexible:
  - exact feature folder layout
  - selected test/lint tooling details
  - CI shape

## 12) Ready-to-lock later
Finalize after implementation starts proving the structure:
- scaffold presets
- convention verification presets
- architecture validation rules
- role/path constraints
- package-level verification scripts
