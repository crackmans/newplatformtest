# Repo Bootstrap Plan (Hybrid Bundle)

## Context
- Request summary: Add only DB profile placeholder boundary on top of current server baseline; no real DB connection, mapper/query, or business API.
- Project mode:
  - frontend + server
- Source references reviewed:
  - `AGENTS.md`
  - `PROJECT_BOOTSTRAP.md`
  - `.agents/skills/plan-task/SKILL.md`
  - `.agents/templates/execution-plan.md`
  - `.agents/skills/verify-build/SKILL.md`
  - `.agents/skills/verify-implementation/SKILL.md`
  - `.agents/templates/verification-report.md`
  - `work-notes/repo-bootstrap-plan.md`
  - `work-notes/execution-plan.md`
  - `work-notes/verification-report.md`
  - `work-notes/ACTIVE_HANDOFF.md`

## Active Direction Lock
- web = React
- desktop = Electron + React renderer
- mobile = React Native
- server = Java / Spring / PostgreSQL / MyBatis (active)

## Boundary Snapshot
- Server root: `apps/server`
- Profile boundary files:
  - `application.yml` (default profile)
  - `application-no-db.yml` (no-db runnable baseline)
  - `application-db-placeholder.yml` (DB placeholder boundary)

## Fixed Decisions
1. `apps/server/.mvn/repository` is excluded from Git.
2. Default server profile is `no-db` for bootstrap runtime stability.
3. `db-placeholder` profile file exists for DB boundary, but contains placeholders only.
4. Wrapper and `.mvn/wrapper` stay committed for reproducible build tooling.

## Flexible Decisions (Not Locked Yet)
1. Real datasource URL/credentials and profile activation policy.
2. MyBatis mapper/XML/query structure and first implementation scope.
3. Real DB 연결 검증 순서.
4. DB-specific CI settings.

## Bootstrap Actions (Minimal)
1. Keep `.gitignore` excluding `apps/server/.mvn/repository`.
2. Split no-db runtime and db-placeholder profile boundary into separate files.
3. Re-verify build/test and no-db health runtime.
4. Update work-notes only.

## Verification Baseline
- server build: `npm.cmd run server:build` PASS
- server test: `npm.cmd run server:test` PASS
- no-db health check: `java -jar ...` + `GET /api/health` PASS
- db-placeholder runtime: not executed by scope

## Risks and Mitigations
- risk: placeholder profile accidentally used as real config.
  - mitigation: explicit placeholder tokens (`<DB_HOST>`, etc.) and no activation in default profile.

## Next Step
- Immediate follow-up task: add datasource/profile validation rule (format-level only) without enabling actual DB connection.
