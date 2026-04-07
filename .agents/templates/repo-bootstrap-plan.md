# Repo Bootstrap Plan (Hybrid Bundle)

## Context
- Request summary:
- Project mode:
  - frontend only
  - frontend + server
- Source references reviewed:
  - `AGENTS.md`
  - `PROJECT_BOOTSTRAP.md`
  - Additional docs:

## Active Direction Lock
- web = React
- desktop = Electron + React renderer
- mobile = React Native
- server = optional (Java / Spring / PostgreSQL / MyBatis)

## Boundary Snapshot
- Web app root:
- Desktop main root:
- Desktop preload root:
- Desktop renderer root:
- Mobile root:
- Server root (optional):
- Server persistence boundary (optional, MyBatis/XML/query):
- Shared package roots:
  - domain:
  - types:
  - utils:
  - api:
  - config:
  - design tokens:
  - validation:

## Fixed Decisions
1.
2.
3.
4. (if server active) backend baseline fixed now:

## Flexible Decisions (Not Locked Yet)
1.
2.
3.
4. (if server active) backend structure still flexible:

## Bootstrap Actions (Minimal)
1.
2.
3.
4. (optional, server active only) baseline server bootstrap action:

## Verification Baseline
- install:
- dev/run (by active target):
- typecheck:
- lint:
- test:
- build/smoke:
- server verification baseline (optional):
  - install:
  - run:
  - test:
  - build:
- SKIP reasons (if any):

## Risks and Mitigations
- frontend-only risk:
  - mitigation:
- frontend+server risk (if active):
  - mitigation:

## Next Step
- Immediate follow-up task:
