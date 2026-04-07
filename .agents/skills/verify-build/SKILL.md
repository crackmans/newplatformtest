---
name: verify-build
description: Run repository-native verification for hybrid web/desktop/mobile/server/shared layers with conditional large-data rigor.
---

# verify-build

## Purpose
- Catch compile/type/lint/test failures before handoff.
- Keep verification honest per target (web/desktop/mobile/server/shared).
- Separate baseline checks from conditional large-data checks.

## Workflow
1. Detect available scripts from repository manifests.
2. Run only scripts that actually exist, in this default order:
   - typecheck
   - lint
   - test
   - build or smoke
3. Record `SKIP` when a script is missing.
4. Summarize PASS/FAIL with key errors and warnings.
5. State exactly which targets were verified and which were not run.
6. If server or DB/MyBatis scope is impacted, explicitly record server-side and query-side verification status.
7. If task is a large-data screen task, record performance/load/memory/query-strategy items as `UNVERIFIED` when not directly validated.

## Verification Intensity Rule
- General task:
  - Baseline compile/type/lint/test/build checks are primary.
- Large-data task (conditional):
  - Baseline checks are still required.
  - Additionally require explicit status for:
    - PostgreSQL query/load behavior assumptions
    - MyBatis mapper/XML/query strategy assumptions
    - rendering/data-transfer/memory assumptions
  - Build success alone is not completion.

## Rules
- Errors block PASS.
- Warnings are reported separately.
- Do not claim runtime validation for a target unless that target actually ran.
- Do not install packages unless task scope explicitly allows it.
- Prefer non-destructive checks before platform runtime commands.
- Do not mark unresolved performance/load/memory/query-strategy assumptions as PASS.
