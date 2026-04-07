---
name: analyze-impact
description: Analyze requirement impact and list directly/indirectly affected files across hybrid web, desktop, mobile, and shared boundaries before implementation.
---

# analyze-impact

## Purpose
- Build a safe implementation boundary before coding.
- Prevent hidden cross-module and cross-runtime regressions.

## When to Run
- Before non-trivial UI/data/state changes.
- Before changing shared modules consumed by multiple targets.

## Workflow
1. Read relevant docs and requested scope.
2. Search related symbols/usages in active boundary roots (`apps/*`, `packages/*` when present).
3. Classify impact:
- direct edits
- import/consumer ripple
- target boundary risk (web/desktop/mobile/shared)
- test/doc updates needed
4. Return NEW/MODIFY/DELETE candidates with short rationale.

## Output Format
- Requirement summary
- Impacted files table (path, reason, risk)
- Proposed edit scope
- Open questions/blockers

## Exceptions
- Documentation-only edits can skip deep dependency tracing.
- Pure text changes in non-code assets can be marked low-risk.
