# Execution Plan (Existing Bundle Reinforcement)

## Session Preflight / Baseline Context
- Current branch: `main`
- `git status` checked: dirty from prior approved baseline changes
- Latest handoff reviewed (`work-notes/ACTIVE_HANDOFF.md`): reviewed
- Source-of-truth docs reviewed:
  1. `AGENTS.md`
  2. `PROJECT_BOOTSTRAP.md`
  3. `.agents/skills/plan-task/SKILL.md`
  4. `.agents/templates/execution-plan.md`
  5. `.agents/skills/verify-build/SKILL.md`
  6. `.agents/skills/verify-implementation/SKILL.md`
  7. `.agents/templates/verification-report.md`
  8. `work-notes/*.md`
- Current request conflict check vs previous scope/handoff: aligned (next step approved: DB profile placeholder boundary only)
- In scope:
  - profile boundary files for no-db/db-placeholder
  - execution baseline clarification
  - work-notes updates
- Out of scope:
  - real DB connection
  - mapper/XML/query
  - business API
  - frontend expansion

## Task Classification (Required Before Design)
- Screen type:
  - [x] General screen flow
  - [ ] Large-data processing/verification screen (conditional rule applies)
- Server impact (Java/Spring):
  - [x] Yes
  - [ ] No
- DB/MyBatis impact (PostgreSQL + mapper/XML/query):
  - [x] Yes (profile boundary only)
  - [ ] No
- Non-scope items to avoid:
  1. datasource actual credentials
  2. DB connection attempts from placeholder profile
  3. mapper/query code generation

## Requirement Summary
- Goal: add profile boundary placeholders safely while keeping default no-db runtime stable.

## Acceptance Criteria
1. Default no-db run remains successful.
2. db-placeholder profile file exists with placeholder-only keys.
3. No actual DB connection or mapper/query implementation is introduced.

## Boundary-Aware Impact
- Server (`apps/server`): profile resource files only.
- Other boundaries: unchanged.

## Protected Areas (Do Not Touch Without Approval)
1. real datasource values
2. mapper/XML/query implementation
3. business API layer

## Sharing vs Split Decisions
- Shared-first choices:
  1. none in this step
     - Why shared is safe: deferred by scope
- Intentional splits:
  1. DB placeholder remains server-local config boundary.
     - Why split is required: runtime configuration concern for backend only.

## Change Intent (NEW/MODIFY/DELETE)
- NEW:
  - `apps/server/src/main/resources/application-no-db.yml`
  - `apps/server/src/main/resources/application-db-placeholder.yml`
- MODIFY:
  - `apps/server/src/main/resources/application.yml`
  - `work-notes/repo-bootstrap-plan.md`
  - `work-notes/execution-plan.md`
  - `work-notes/verification-report.md`
  - `work-notes/ACTIVE_HANDOFF.md`
- DELETE: none

## Large-Data Conditional Plan (Fill Only If Applicable)
- Applicable:
  - [ ] Yes
  - [x] No
- Query/load strategy notes (PostgreSQL): N/A
- MyBatis mapper/XML/query strategy notes: N/A
- Rendering/data-transfer/memory safety notes: N/A
- Explicitly unverified performance assumptions: large-data behavior remains UNVERIFIED.

## Verification Plan
- Conventions: ensure placeholder profile contains no real secrets
- Build/type/lint/test: run existing relevant commands
- Server verification: build/test + no-db health
- DB/MyBatis query verification: SKIP
- Large-data conditional verification: N/A
- Expected PASS conditions:
  - no-db startup and health pass
  - placeholder profile file present and non-operative by default

## Risks / Blockers
- Risk: accidental activation of placeholder profile by users.
  - Mitigation: keep `spring.profiles.default=no-db` and placeholders explicit.

## Deferred Items
1. Item: real DB profile activation and validation
   - Deferred reason: out of scope
   - Re-entry condition: explicit user request for DB baseline step

## Handoff Notes
- Suggested next step: define DB profile validation checklist (no runtime connection yet).
