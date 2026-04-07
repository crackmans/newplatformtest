---
name: verify-design-compliance
description: Validate implementation against approved scope/spec while enforcing hybrid boundary and consistency rules.
---

# verify-design-compliance

## Purpose
- Ensure delivered code matches approved intent, not just local behavior.
- Prevent scope drift and cross-boundary regressions in hybrid work.

## Workflow
1. Read agreed plan/scope and acceptance criteria.
2. Check each NEW/MODIFY/DELETE target.
3. Confirm explicit exclusions are still respected.
4. Confirm boundary intent is respected:
   - shared vs platform-only placement
   - desktop main/preload separation
   - mobile UI split allowance from web/desktop renderer
5. Report mismatches with exact file paths.

## Pass Criteria
- No missing required change.
- No unauthorized scope expansion.
- No accidental boundary leakage that contradicts the approved hybrid direction.
- UI consistency outcomes are preserved even when implementation differs by platform.
