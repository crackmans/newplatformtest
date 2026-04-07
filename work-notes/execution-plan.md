# Execution Plan (Existing Bundle Reinforcement)

## Session Preflight / Baseline Context
- Current branch: `main`
- `git status` checked: clean before this session changes
- Latest handoff reviewed (`work-notes/ACTIVE_HANDOFF.md`): missing at session start
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
- Current request conflict check vs previous scope/handoff: no previous handoff artifact; no direct conflict detected.
- In scope:
  - bundle interpretation summary
  - frontend+server bootstrap planning
  - minimal boundary folder bootstrap
  - plan/verification/handoff documentation in `work-notes/`
- Out of scope:
  - feature implementation
  - UI design lock
  - auth/state/infrastructure architecture lock
  - JPA/ORM migration or persistence restructuring
  - cache/search/mq extension

## Task Classification (Required Before Design)
- Screen type:
  - [x] General screen flow
  - [ ] Large-data processing/verification screen (conditional rule applies)
- Server impact (Java/Spring):
  - [x] Yes
  - [ ] No
- DB/MyBatis impact (PostgreSQL + mapper/XML/query):
  - [x] Yes (baseline-only, structural lock)
  - [ ] No
- Non-scope items to avoid:
  1. Forcing large-data policy globally.
  2. Premature server module deep split.
  3. Runtime mixing across desktop main/preload/renderer.

## Requirement Summary
- Goal: Start the new project with minimal, boundary-safe bootstrap for frontend + server using existing bundle assets and templates.

## Acceptance Criteria
1. Bundle interpretation is explicitly documented with common vs conditional rules.
2. Bootstrap plan identifies fixed-now vs still-flexible decisions.
3. Minimal boundary folders and work-notes artifacts are created without scope expansion.

## Boundary-Aware Impact
- Web (`apps/web`): new empty boundary folder
- Desktop main (`apps/desktop/main`): new empty boundary folder
- Desktop preload (`apps/desktop/preload`): new empty boundary folder
- Desktop renderer (`apps/desktop/renderer`): new empty boundary folder
- Mobile (`apps/mobile`): new empty boundary folder
- Server (Java/Spring modules): new empty `apps/server` boundary folder
- DB/MyBatis (mapper/XML/query, PostgreSQL): baseline policy documented only; no runtime code added
- Shared packages (`packages/shared-*`): new empty shared boundary folders

## Protected Areas (Do Not Touch Without Approval)
1. Unrequested architecture/toolchain lock-in.
2. Unrequested frontend/server implementation scaffolding beyond boundary minimum.
3. Persistence framework changes (MyBatis -> JPA/other ORM).

## Sharing vs Split Decisions
- Shared-first choices (domain/types/utils/api/validation/tokens/config):
  1. Decision: reserve shared package boundaries now.
     - Why shared is safe: runtime-agnostic layers can be shared later without mixing platform runtimes.
- Intentional splits (runtime/rendering/API/persistence constraints):
  1. Decision: keep `desktop/main`, `desktop/preload`, `desktop/renderer` separate from day 1.
     - Why split is required: Electron process/runtime boundaries.
  2. Decision: keep server boundary independent from frontend runtime code.
     - Why split is required: Spring/MyBatis/PostgreSQL runtime and persistence concerns differ.

## Change Intent (NEW/MODIFY/DELETE)
- NEW:
  - `apps/.../.gitkeep` boundary placeholders
  - `packages/shared-*/.gitkeep` boundary placeholders
  - `work-notes/repo-bootstrap-plan.md`
  - `work-notes/execution-plan.md`
  - `work-notes/verification-report.md`
  - `work-notes/ACTIVE_HANDOFF.md`
- MODIFY: none
- DELETE: none

## Large-Data Conditional Plan (Fill Only If Applicable)
- Applicable:
  - [ ] Yes
  - [x] No
- Query/load strategy notes (PostgreSQL): N/A for this bootstrap step
- MyBatis mapper/XML/query strategy notes: N/A for this bootstrap step
- Rendering/data-transfer/memory safety notes: N/A for this bootstrap step
- Explicitly unverified performance assumptions: Any large-data behavior is UNVERIFIED in this session.

## Verification Plan
- Conventions: confirm minimal path/boundary creation and no runtime boundary mixing
- Build/type/lint/test: run only existing scripts; mark missing as SKIP
- Server verification (if impacted): baseline-only; mark runtime checks SKIP until server scripts exist
- DB/MyBatis query verification (if impacted): SKIP (no query implementation yet)
- Large-data conditional verification (if applicable): not applicable this session
- Expected PASS conditions:
  - requested docs/artifacts exist
  - boundary folders exist
  - no out-of-scope edits

## Risks / Blockers
- Risk: Missing project manifests/scripts can lead to false ¡°done¡± claims.
  - Mitigation: explicitly record SKIP/UNVERIFIED instead of PASS.

## Deferred Items
1. Item: workspace tooling and runnable scripts
   - Deferred reason: user did not request toolchain lock-in in this step
   - Re-entry condition: user approves next bootstrap phase for toolchain/scripts

## Handoff Notes
- Suggested next step: lock minimal workspace manifests and per-target baseline scripts while preserving current boundaries.