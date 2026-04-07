# Repo Bootstrap Plan (Hybrid Bundle)

## Context
- Request summary: Initialize this repository as a minimal bootstrap start point using the existing bundle only, with frontend + server mode.
- Project mode:
  - frontend + server
- Source references reviewed:
  - `AGENTS.md`
  - `PROJECT_BOOTSTRAP.md`
  - `.agents/skills/bootstrap-repo/SKILL.md`
  - `.agents/templates/repo-bootstrap-plan.md`
  - `.agents/skills/plan-task/SKILL.md`
  - `.agents/templates/execution-plan.md`
  - `.agents/skills/verify-build/SKILL.md`
  - `.agents/skills/verify-implementation/SKILL.md`
  - `.agents/templates/verification-report.md`

## Active Direction Lock
- web = React
- desktop = Electron + React renderer
- mobile = React Native
- server = Java / Spring / PostgreSQL / MyBatis (active)

## Boundary Snapshot
- Web app root: `apps/web`
- Desktop main root: `apps/desktop/main`
- Desktop preload root: `apps/desktop/preload`
- Desktop renderer root: `apps/desktop/renderer`
- Mobile root: `apps/mobile`
- Server root (optional): `apps/server` (active in this session)
- Server persistence boundary (optional, MyBatis/XML/query): `apps/server` 내부 backend modules로 유지 예정 (세부 깊이는 미확정)
- Shared package roots:
  - domain: `packages/shared-domain`
  - types: `packages/shared-types`
  - utils: `packages/shared-utils`
  - api: `packages/shared-api`
  - config: `packages/shared-config`
  - design tokens: `packages/shared-design-tokens`
  - validation: `packages/shared-validation`

## Fixed Decisions
1. Project mode is fixed as `frontend + server`.
2. Target/runtime boundaries are fixed and explicitly separated (`web`, `desktop/main`, `desktop/preload`, `desktop/renderer`, `mobile`, `server`).
3. Server persistence baseline is fixed to `Java/Spring/PostgreSQL/MyBatis`; no JPA/ORM migration.
4. Large-data rules are conditional only, not global defaults.

## Flexible Decisions (Not Locked Yet)
1. Exact feature-level folder layout inside each app boundary.
2. Workspace manager/package manager and root build orchestration shape.
3. Test/lint/typecheck tooling details and CI shape.
4. Server package/module split depth and MyBatis mapper granularity beyond current minimal boundary.

## Bootstrap Actions (Minimal)
1. Create minimal boundary folders under `apps/*`.
2. Create minimal shared package folders under `packages/shared-*`.
3. Create bootstrap planning/verification/handoff notes under `work-notes/`.
4. Keep implementation/source/runtime code generation deferred until next scoped task.

## Verification Baseline
- install: SKIP (no package manager manifest yet)
- dev/run (by active target): SKIP (no runnable target scripts yet)
- typecheck: SKIP (no repository typecheck script yet)
- lint: SKIP (no repository lint script yet)
- test: SKIP (no repository test script yet)
- build/smoke: SKIP (no repository build/smoke script yet)
- server verification baseline (optional):
  - install: SKIP
  - run: SKIP
  - test: SKIP
  - build: SKIP
- SKIP reasons (if any): Bootstrap-start state has no manifest/scripts yet; verification is documentation and boundary scaffold only.

## Risks and Mitigations
- frontend-only risk:
  - mitigation: keep runtime boundaries explicit from day 1; avoid forced UI source sharing.
- frontend+server risk (if active):
  - mitigation: lock only backend baseline and persistence stack (MyBatis), keep module depth flexible until real feature/API work starts.

## Next Step
- Immediate follow-up task: Decide root workspace/manifest baseline (`package.json` + target scripts and/or server build baseline) with explicit user approval on toolchain choices.