---
name: plan-task
description: Create or update a short execution plan for non-trivial hybrid frontend/backend work before editing code.
---

# plan-task

## Purpose
- Prevent scope drift before implementation.
- Keep boundary decisions explicit for web/desktop/mobile/server/shared work.
- Classify task type early so large-data conditional rules are only applied when relevant.

## When to Run
- More than one file will change.
- The request involves architecture, data flow, shared packages, platform splits, build config, server/DB changes, or migration work.
- You are continuing work from a previous session.

## Workflow
1. Run session-start preflight first:
   - current branch
   - `git status`
   - latest handoff (`work-notes/ACTIVE_HANDOFF.md`)
   - request vs previous scope conflict check
2. Read request, approved/source-of-truth docs, and latest session handoff.
3. Classify task before impact analysis:
   - screen type: general screen vs large-data processing screen
   - server impact: yes/no
   - DB/MyBatis impact: yes/no
4. Use `analyze-impact` to identify direct and indirect effects by boundary:
   - web
   - desktop/main
   - desktop/preload
   - desktop/renderer
   - mobile
   - server
   - shared packages
5. If classified as large-data screen, add explicit risk planning for:
   - query strategy and PostgreSQL load characteristics
   - MyBatis mapper/XML/query impact
   - data transfer shape/volume and memory pressure
   - rendering cost strategy (no-pagination does not imply full-render safety)
6. Fill execution plan using `.agents/templates/execution-plan.md`.
7. Record explicit exclusions, unknowns, protected areas, and non-scope items.
8. Record sharing decisions:
   - what is shared first
   - what is intentionally split
   - why split is required (runtime/rendering/API/persistence constraints)
9. Update the plan when scope or boundary assumptions change.

## Output
- Requirement summary
- Acceptance criteria
- Task classification (screen/server/DB-MyBatis)
- Boundary-aware impacted files list
- NEW/MODIFY/DELETE intent
- Verification plan by target and risk level
- Deferred/out-of-scope list
