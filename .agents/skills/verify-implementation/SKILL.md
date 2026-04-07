---
name: verify-implementation
description: Run integrated verification sequence across active verify-* skills and produce a consolidated report.
disable-model-invocation: true
argument-hint: "[optional: specific verify skill name]"
---

# verify-implementation

## Purpose
- Execute project verification in one repeatable flow.
- Keep the same run order across sessions so results are comparable.
- Prevent false completion when large-data/server/DB risks are unverified.

## Preflight
1. Confirm the execution plan still matches the actual changes.
2. Confirm the verification preset paths match the repository.
3. Confirm required repository scripts exist or mark them as skipped with reason.
4. Confirm task classification is present:
   - general vs large-data screen
   - server impact yes/no
   - DB/MyBatis impact yes/no

## Run Order
1. `verify-conventions`
2. `verify-build`
3. `verify-design-compliance`
4. `verify-architecture`

## Workflow
1. Execute each verification skill (or one selected by argument).
2. Aggregate PASS/FAIL and actionable findings.
3. If failures exist, list exact fixes and rerun impacted checks.
4. Save a short report using `.agents/templates/verification-report.md` under `work-notes/` for non-trivial work.
5. Update the session handoff with final status.
6. For large-data/server/DB-impact tasks, explicitly preserve unresolved items as `UNVERIFIED` (do not silently pass).

## Completion Rule
- Build/type/lint success is necessary but not always sufficient.
- If large-data conditional checks apply and performance/load/memory/query-strategy validation was not run, final state must include explicit `UNVERIFIED` risk.

## Output
- Summary table by skill
- Findings table (file, issue, fix)
- Final decision: PASS or FAIL
- Unverified risk list (when applicable)
