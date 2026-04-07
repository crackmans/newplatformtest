---
name: manage-skills
description: Maintain skill inventory and keep active skills aligned to current hybrid frontend conventions.
disable-model-invocation: true
---

# manage-skills

## Purpose
- Optional helper skill. Do not run as part of the default loop unless needed.
- Keep verification and scaffolding skills aligned with active web/desktop/mobile/shared boundaries.
- Detect coverage gaps between changed files and available verification skills.
- Keep plan/handoff/report templates aligned with real working practice.

## Workflow
1. Collect changed files from git diff.
2. Compare changed paths/patterns against current `.agents/skills/*/SKILL.md` coverage.
3. Decide:
- update an existing skill
- add a new skill
- mark as intentionally uncovered (with reason)
4. Update affected skill docs and `.agents/skills/verify-implementation/SKILL.md` run order if needed.
5. Update templates when repeated session friction shows a missing artifact.

## Guardrails
- Do not reference legacy orchestrator contracts.
- Keep active guidance hybrid and boundary-aware.
- Archive deprecated guidance under `legacy/` when history is needed.
- Do not add new skills when a template or a small AGENTS update is enough.
