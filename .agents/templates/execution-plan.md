# Execution Plan (Existing Bundle Reinforcement)

## Session Preflight / Baseline Context
- Current branch:
- `git status` checked:
- Latest handoff reviewed (`work-notes/ACTIVE_HANDOFF.md`):
- Source-of-truth docs reviewed:
  1.
- Current request conflict check vs previous scope/handoff:
- In scope:
- Out of scope:

## Task Classification (Required Before Design)
- Screen type:
  - [ ] General screen flow
  - [ ] Large-data processing/verification screen (conditional rule applies)
- Server impact (Java/Spring):
  - [ ] Yes
  - [ ] No
- DB/MyBatis impact (PostgreSQL + mapper/XML/query):
  - [ ] Yes
  - [ ] No
- Non-scope items to avoid:
  1.

## Requirement Summary
- Goal:

## Acceptance Criteria
1.
2.
3.

## Boundary-Aware Impact
- Web (`apps/web`):
- Desktop main (`apps/desktop/main`):
- Desktop preload (`apps/desktop/preload`):
- Desktop renderer (`apps/desktop/renderer`):
- Mobile (`apps/mobile`):
- Server (Java/Spring modules):
- DB/MyBatis (mapper/XML/query, PostgreSQL):
- Shared packages (`packages/shared-*`):

## Protected Areas (Do Not Touch Without Approval)
1.
2.
3.

## Sharing vs Split Decisions
- Shared-first choices (domain/types/utils/api/validation/tokens/config):
  1. Decision:
     - Why shared is safe:
- Intentional splits (runtime/rendering/API/persistence constraints):
  1. Decision:
     - Why split is required:

## Change Intent (NEW/MODIFY/DELETE)
- NEW:
- MODIFY:
- DELETE:

## Large-Data Conditional Plan (Fill Only If Applicable)
- Applicable:
  - [ ] Yes
  - [ ] No
- Query/load strategy notes (PostgreSQL):
- MyBatis mapper/XML/query strategy notes:
- Rendering/data-transfer/memory safety notes:
- Explicitly unverified performance assumptions:

## Verification Plan
- Conventions:
- Build/type/lint/test:
- Server verification (if impacted):
- DB/MyBatis query verification (if impacted):
- Large-data conditional verification (if applicable):
- Expected PASS conditions:

## Risks / Blockers
- Risk:
  - Mitigation:

## Deferred Items
1. Item:
   - Deferred reason:
   - Re-entry condition:

## Handoff Notes
- Suggested next step:
