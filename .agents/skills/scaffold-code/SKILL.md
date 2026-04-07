---
name: scaffold-code
description: Generate hybrid scaffold files across web, desktop (Electron), mobile (React Native), and shared packages.
---

# scaffold-code

## Purpose
- Create boundary-safe scaffold files for a hybrid frontend bundle.
- Keep shared-first logic while avoiding forced cross-runtime UI coupling.
- Keep scope explicit: this skill scaffolds frontend/Electron/shared code only.
- Server scaffolding (Java/Spring/PostgreSQL/MyBatis) is out of scope in this skill.

## Active Script
- `node .agents/skills/scaffold-code/scripts/scaffold.mjs --type=<screen|component|hook|service|utility|type|electron-main|electron-preload> --name=<Name>`
- Optional:
  - `--runtime=<auto|web|desktop-renderer|mobile|shared|desktop-main|desktop-preload>` (`screen/component` requires explicit `web|desktop-renderer|mobile`)
  - `--fields=id:string,title:string`
  - `--preset=.agents/skills/scaffold-code/scripts/presets/hybrid-react-electron-rn.json`
  - `--typescript=auto|true|false`
  - `--dir=custom/relative/path`
  - `--dry-run=true`
  - `--force=true`

## Workflow
1. Select file type from planned NEW items.
2. Select runtime explicitly when UI/process code is platform-specific.
   For `screen` and `component`, runtime is mandatory to prevent platform-boundary mistakes.
3. Let the preset choose the first existing target path for that type/runtime.
4. Override with `--dir` only when repository structure intentionally differs.
5. Verify generated imports and boundary placement before commit.

## Rules
- Electron `main` and `preload` files must stay outside renderer/shared areas.
- Mobile UI scaffolds should use RN templates, not DOM React templates.
- Shared modules should remain runtime-light and platform-agnostic.
- UI consistency is required; identical UI file sharing is optional.

## Notes
- Active preset is hybrid and runtime-aware.
- TypeScript output is auto-detected via `tsconfig.json` unless overridden.
- Keep platform-only libraries in platform-only app boundaries.
- If project mode is `frontend + server`, use this skill only for frontend/Electron/shared areas.
- Do not interpret this skill as a backend code generator.
