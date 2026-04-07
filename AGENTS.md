# AGENTS.md (Active Repo Guidance)

This is the single active repository-wide Codex guidance entrypoint.
This bundle must be reinforced by editing existing files and structure (`AGENTS.md`, `.agents/skills`, `.agents/templates`) rather than introducing a new operating model.

## Active Direction
- Active product direction is hybrid frontend + backend:
  - web = React
  - desktop = Electron + React renderer
  - mobile = React Native
  - server = Java + Spring + PostgreSQL + MyBatis
- Keep implementation boundaries explicit:
  - `apps/web`
  - `apps/desktop/main`
  - `apps/desktop/preload`
  - `apps/desktop/renderer`
  - `apps/mobile`
  - `apps/server` (or backend module paths used by this repo)
  - `packages/shared-*`

## Core Principle
- Share what is safely shareable.
- Do not force sharing when runtime or platform boundaries differ.
- Keep UI consistency (behavior, labels, flow, validation, tokens), but do not require identical UI source files.
- Keep server-side consistency (API contract, SQL behavior, transaction boundaries) without forcing unrelated persistence rewrites.
- Treat Electron main and preload as strict separate boundaries.
- Allow mobile React Native UI to diverge from web/desktop renderer implementation when needed.
- Respect existing MyBatis mapper/XML/query structures by default.

## Permission And Escalation Rule
- If a task requires user permission or user-side action, do not bypass it with workaround paths.
- Ask the user directly for approval or the exact user-side step needed, then continue.
- Prefer explicit, transparent escalation over hidden or indirect alternatives.

## Share-First Targets
Use shared packages first for:
- domain logic
- types/interfaces
- API contracts/helpers
- validation
- config
- design tokens
- pure utilities
- SQL parameter/result contracts that are safe to share as interfaces (not persistence rewrites)

Prefer sharing these layers before attempting shared renderer UI.

## Runtime Boundary Rules
- Never mix Electron `main` code into renderer/shared packages.
- Never mix Electron `preload` code into renderer/shared packages.
- Keep renderer/web concerns out of Electron main and preload.
- Do not treat React Native mobile UI as DOM React.
- Split files when runtime, rendering model, or platform APIs differ.
- Keep backend runtime concerns (Spring lifecycle, MyBatis mapper binding, PostgreSQL SQL behavior) out of frontend runtime layers.

## Backend Persistence Rules (Fixed Stack)
- Server work may be in scope; assume Java + Spring + PostgreSQL + MyBatis as the default backend baseline.
- MyBatis is fixed unless user explicitly requests otherwise.
- Do not propose or perform JPA/ORM migration, persistence-framework replacement, or broad persistence restructuring unless explicitly requested.
- Preserve existing mapper/XML/query structure first; use smallest safe query/mapper changes.
- Do not add cache/search/message-queue architecture as a silent extension to fill ambiguous requirements.

## Screen-Type Policy (Common vs Conditional)
- Common rules apply to all tasks by default.
- Large-data screen rules are conditional and apply only when the target screen matches large-data characteristics.
- Do not treat all screens as large-data screens.
- Do not treat a confirmed large-data verification screen as general CRUD/list handling.

## Large-Data Screen Conditional Rules
Apply these only when one or more conditions are true:
1. Query size is 100,000+ rows.
2. It is a no-pagination verification/inspection screen.
3. Column count or rendering cost is materially high.
4. It is a large-data verification view that should not be handled like ordinary CRUD listing.

When applicable:
- Do not interpret no-pagination requirements as permission for unconditional full-load/full-render.
- Evaluate query strategy, transfer shape, rendering strategy, and memory pressure together.
- Include MyBatis mapper/SQL and PostgreSQL query-load implications in impact and verification notes.
- Do not mark complete from build success alone; unverified performance/load/memory/query-strategy items must remain explicitly unresolved.

## Library Policy (Compatibility First)
- Prioritize compatibility and long-term maintainability over visual convenience.
- Shared-layer dependencies must be safe for all intended consumers.
- Platform-only libraries must remain inside that platform app boundary.
- Avoid duplicate libraries for the same role across targets without a strong reason.
- Document why a dependency is platform-only and why sharing is not selected.

## Active Paths
- Active skills: `./.agents/skills/...`
- Session artifacts (single location): `./work-notes/`

## Core Loop
1. Plan
2. Implement
3. Verify
4. Handoff

For non-trivial work, keep an execution plan and end with a handoff note in `work-notes/`.

## Session Start Preflight (Required)
Before starting implementation, confirm:
1. current branch
2. current `git status`
3. latest handoff in `work-notes/`
4. conflict check between current request and previous scope/handoff
5. explicit in-scope / out-of-scope for this session

## Priority Order (When Instructions Conflict)
Apply guidance in this order:
1. latest user instruction
2. approved spec / design doc
3. latest session handoff
4. current code state
5. older docs or historical notes

## Work-Notes Operating Rule
- Keep one active handoff file: `work-notes/ACTIVE_HANDOFF.md`.
- Optionally archive snapshots as `work-notes/archive/YYYY-MM-DD-<topic>.md`.
- At next session start, read `work-notes/ACTIVE_HANDOFF.md` first.

## Source Of Truth Rule
- If source-of-truth locations are fixed, follow them first.
- If not fixed, record all source-of-truth references used in:
  - `.agents/templates/execution-plan.md`
  - `.agents/templates/session-handoff.md`

## Change Principle (Execution)
- Prefer smallest safe change first.
- Do not refactor unrelated code.
- Reuse existing patterns/components/styles before creating new variants.
- Do not create duplicate implementations for the same role without explicit reason.
- Do not perform out-of-scope structural changes.
- Do not broaden the request scope without explicit user approval.
- For server scope, avoid broad persistence or architecture expansions outside the requested fix.

## Completion State Recording Rule
Always record one explicit state in handoff:
- implemented, verification pending
- partially implemented
- blocked by external/user dependency
- on hold due to unclear/unstable spec

## Verify Order (only existing scripts)
- if present: `typecheck`
- if present: `lint`
- if present: `test`
- if present: `build` or `smoke`
- if missing: record `SKIP`

Do not invent commands. Run only scripts that actually exist in the repository.

## Skills
Core loop skills:
- `.agents/skills/plan-task`
- `.agents/skills/scaffold-code`
- `.agents/skills/verify-conventions`
- `.agents/skills/verify-build`
- `.agents/skills/verify-implementation`
- `.agents/skills/session-handoff`

Optional skills (use only when needed):
- `.agents/skills/manage-skills`
- `.agents/skills/merge-worktree`
- `.agents/skills/verify-architecture`
- `.agents/skills/verify-design-compliance`

## Bootstrap Stage
When repo structure is not fixed, use:
- `PROJECT_BOOTSTRAP.md`
- `.agents/skills/bootstrap-repo`
- `.agents/templates/repo-bootstrap-plan.md`

Keep folder assumptions minimal until repository structure is proven.

## Compatibility Note
`agents/AGENTS.md` and `agents/skills/*` are historical compatibility copies when present.
Active guidance in this repository is under root `AGENTS.md` and `/.agents/skills`.
