# newPlatformTest_1

Minimal bootstrap baseline for a hybrid project:
- frontend targets: web, desktop (main/preload/renderer), mobile
- server target: Java + Spring Boot + PostgreSQL + MyBatis baseline

## Fixed now (bootstrap step 2)
- JS package manager/workspace: npm workspaces
- Server build baseline: Maven + Spring Boot
- Root run baseline: `npm run typecheck|lint|test|build`, `npm run server:run|server:test|server:build`

## Not fixed yet
- Frontend implementation stack details (routing/state/UI libraries)
- CI pipeline
- DB connection details and environment profiles
- MyBatis mapper/XML/query structure details

## Quick commands
- Aggregate checks (scripts that exist in workspaces):
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test`
  - `npm run build`
- Server baseline:
  - `npm run server:run`
  - `npm run server:test`
  - `npm run server:build`
