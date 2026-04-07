# Execution Plan (Existing Bundle Reinforcement)

## Session Preflight / Baseline Context
- Current branch: `main`
- `git status` checked: clean at session start
- Latest handoff reviewed (`work-notes/ACTIVE_HANDOFF.md`): reviewed
- Source-of-truth docs reviewed:
  1. `AGENTS.md`
  2. `PROJECT_BOOTSTRAP.md`
  3. `.agents/skills/bootstrap-repo/SKILL.md`
  4. `.agents/templates/repo-bootstrap-plan.md`
  5. `.agents/skills/plan-task/SKILL.md`
  6. `.agents/templates/execution-plan.md`
  7. `.agents/skills/verify-build/SKILL.md`
  8. `.agents/skills/verify-implementation/SKILL.md`
  9. `.agents/templates/verification-report.md`
  10. `work-notes/*.md` current artifacts
- Current request conflict check vs previous scope/handoff: aligned with previous deferred next step (toolchain + starter baseline)
- In scope:
  - workspace/toolchain minimal lock
  - root script baseline
  - minimal Spring server start skeleton
  - work-notes update
- Out of scope:
  - UI implementation
  - DB connection details
  - MyBatis mapper/XML/query authoring
  - CI definition
  - large-data implementation/tuning

## Task Classification (Required Before Design)
- Screen type:
  - [x] General screen flow
  - [ ] Large-data processing/verification screen (conditional rule applies)
- Server impact (Java/Spring):
  - [x] Yes
  - [ ] No
- DB/MyBatis impact (PostgreSQL + mapper/XML/query):
  - [x] Yes (baseline dependency/scope only)
  - [ ] No
- Non-scope items to avoid:
  1. JPA/ORM introduction
  2. DB datasource hard lock
  3. full app scaffolding across all frontend targets

## Requirement Summary
- Goal: establish minimal executable project baseline (workspace + server start skeleton) without entering feature or data implementation.

## Acceptance Criteria
1. Root workspace/toolchain baseline files exist and are documented.
2. Server minimal Spring start skeleton exists and respects MyBatis baseline.
3. Verification report clearly marks PASS/SKIP/UNVERIFIED without over-claiming runtime success.

## Boundary-Aware Impact
- Web (`apps/web`): minimal workspace package manifest only
- Desktop main (`apps/desktop/main`): minimal workspace package manifest only
- Desktop preload (`apps/desktop/preload`): minimal workspace package manifest only
- Desktop renderer (`apps/desktop/renderer`): minimal workspace package manifest only
- Mobile (`apps/mobile`): minimal workspace package manifest only
- Server (Java/Spring modules): minimal Spring Boot startup skeleton
- DB/MyBatis (mapper/XML/query, PostgreSQL): dependency baseline only; no mapper/query implementation
- Shared packages (`packages/shared-*`): minimal workspace package manifests only

## Protected Areas (Do Not Touch Without Approval)
1. Business API/data model design
2. DB schema/migration/datasource lock
3. frontend full app scaffolding

## Sharing vs Split Decisions
- Shared-first choices (domain/types/utils/api/validation/tokens/config):
  1. Decision: keep shared package boundaries registered in workspace.
     - Why shared is safe: prepares cross-target contracts without runtime mixing.
- Intentional splits (runtime/rendering/API/persistence constraints):
  1. Decision: keep server boot code inside `apps/server` only.
     - Why split is required: backend runtime/persistence concerns must not leak to frontend/shared runtime.

## Change Intent (NEW/MODIFY/DELETE)
- NEW:
  - root baseline files (`package.json`, `.gitignore`, `README.md`)
  - JS workspace `package.json` files per boundary package
  - server baseline files (`apps/server/pom.xml`, Java entrypoint, resources)
- MODIFY:
  - `work-notes/repo-bootstrap-plan.md`
  - `work-notes/execution-plan.md`
  - `work-notes/verification-report.md`
  - `work-notes/ACTIVE_HANDOFF.md`
- DELETE: none

## Large-Data Conditional Plan (Fill Only If Applicable)
- Applicable:
  - [ ] Yes
  - [x] No
- Query/load strategy notes (PostgreSQL): N/A in this step
- MyBatis mapper/XML/query strategy notes: N/A in this step
- Rendering/data-transfer/memory safety notes: N/A in this step
- Explicitly unverified performance assumptions: large-data behavior remains UNVERIFIED.

## Verification Plan
- Conventions: check boundary preservation and file placement
- Build/type/lint/test: run only scripts that now exist
- Server verification (if impacted): run Maven build/test if command available
- DB/MyBatis query verification (if impacted): SKIP (no query implementation)
- Large-data conditional verification (if applicable): not applicable
- Expected PASS conditions:
  - baseline files present
  - scripts invocable
  - server skeleton compiles if maven and network are available

## Risks / Blockers
- Risk: local environment may not have Maven/npm or may block dependency download.
  - Mitigation: mark as SKIP/UNVERIFIED and avoid false pass claim.

## Deferred Items
1. Item: frontend runtime implementation scaffolds
   - Deferred reason: out of requested scope
   - Re-entry condition: next feature/bootstrap phase request

## Handoff Notes
- Suggested next step: verify server run locally and then introduce first minimal shared API contract.
