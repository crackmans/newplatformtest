---
name: session-handoff
description: Leave a compact artifact describing what changed, what remains, and how the next Codex session should continue.
---

# session-handoff

## Purpose
- Make multi-session work reliable.
- Reduce re-discovery and duplicate analysis.

## When to Run
- End of any coding session with code or doc changes.
- Before switching to a new chat or a new Codex run.
- After partial completion when blockers remain.

## Workflow
1. Summarize what changed.
2. Record branch/baseline commit/source-of-truth references used.
3. Update `work-notes/ACTIVE_HANDOFF.md` as the primary handoff file.
4. List exact modified files.
5. Record verification results and remaining blockers.
6. If permission or user-side action is needed, record the exact ask explicitly (no bypass workaround).
7. Mark incomplete status clearly (`partial`, `blocked`, `on hold`, `implemented verification-pending`).
8. State ordered first actions for the next session.
9. Save the artifact using `.agents/templates/session-handoff.md` in `work-notes/ACTIVE_HANDOFF.md` (archive snapshot optional).

## Required Content
- Scope completed
- Files changed
- Verification status
- Incomplete / blocked / on-hold items
- Required user action / approval (if any)
- Branch / commit baseline
- Source-of-truth docs used
- Protected areas for next session (do-not-touch unless approved)
- Next session first actions (ordered)
