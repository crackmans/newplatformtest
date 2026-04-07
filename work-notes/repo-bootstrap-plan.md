# Repo Bootstrap Plan (Hybrid Bundle)

## Context
- Request summary: Proceed bootstrap next step with minimum fixed decisions for workspace/toolchain/minimal execution skeleton for frontend + server.
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
  - `work-notes/repo-bootstrap-plan.md`
  - `work-notes/execution-plan.md`
  - `work-notes/verification-report.md`
  - `work-notes/ACTIVE_HANDOFF.md`

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
- Server root (optional): `apps/server` (active)
- Server persistence boundary (optional, MyBatis/XML/query): inside `apps/server` (detail structure still flexible)
- Shared package roots:
  - domain: `packages/shared-domain`
  - types: `packages/shared-types`
  - utils: `packages/shared-utils`
  - api: `packages/shared-api`
  - config: `packages/shared-config`
  - design tokens: `packages/shared-design-tokens`
  - validation: `packages/shared-validation`

## Fixed Decisions
1. JS package manager/workspace is fixed to `npm workspaces`.
2. Server build baseline is fixed to `Maven + Spring Boot`.
3. Root execution baseline scripts are fixed: `typecheck/lint/test/build` aggregator and `server:run/server:test/server:build`.
4. Backend baseline remains fixed to Java/Spring/PostgreSQL/MyBatis (no JPA/ORM migration).

## Flexible Decisions (Not Locked Yet)
1. Frontend framework internals (routing/state/UI library choices).
2. CI workflow and release pipeline shape.
3. Server module split depth and package conventions.
4. DB connection details/profiles and MyBatis mapper/XML/query structure depth.

## Bootstrap Actions (Minimal)
1. Add root `package.json` with npm workspace and baseline scripts.
2. Add minimal package manifests to existing JS workspace boundaries.
3. Add minimal `apps/server` Spring Boot startup skeleton (`pom.xml`, main class, health endpoint, `application.yml`).
4. Add minimal root `.gitignore` and `README.md` run guide.

## Verification Baseline
- install: `npm install` (not run in this session)
- dev/run (by active target): server baseline command added (`npm run server:run`)
- typecheck: `npm run typecheck`
- lint: `npm run lint`
- test: `npm run test`
- build/smoke: `npm run build`
- server verification baseline (optional):
  - install: Maven dependency resolution via `mvn`
  - run: `npm run server:run`
  - test: `npm run server:test`
  - build: `npm run server:build`
- SKIP reasons (if any): runtime verification depends on local npm/maven availability and dependency/network access.

## Risks and Mitigations
- frontend-only risk:
  - mitigation: keep only workspace baseline, no UI implementation lock.
- frontend+server risk (if active):
  - mitigation: keep Spring/MyBatis baseline minimal and avoid DB/mapper premature fixation.

## Next Step
- Immediate follow-up task: Add first minimal shared contract package usage and one server-side package split decision backed by runnable verification.
