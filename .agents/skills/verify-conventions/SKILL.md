---
name: verify-conventions
description: Enforce hybrid boundary, naming, and import conventions for web, desktop Electron, mobile RN, and shared packages.
---

# verify-conventions

## Active Script
- `node .agents/skills/verify-conventions/scripts/verify_conventions.mjs --preset=.agents/skills/verify-conventions/scripts/presets/hybrid-react-electron-rn.json`

## Checks
1. Allowed source roots and file extensions.
2. File naming policy (kebab/snake policy from preset).
3. Restricted deep relative import patterns.
4. Optional role/path naming checks from `pathHints`.
5. Runtime boundary rules from `boundaryRules`, including:
   - desktop `main/preload/renderer` separation
   - mobile UI not treated as DOM React
   - shared packages remain platform-light

## Workflow
1. Run script from repository root.
2. Fix reported violations by moving code/imports to correct boundaries.
3. Re-run until PASS.
4. If checks are too strict or noisy, tune the preset rather than disabling checks globally.

## Notes
- Active checker is Node.js and preset-driven.
- Keep the preset aligned with actual repo structure as folders evolve.
- Shared-first is preferred, but forced sharing across incompatible runtimes is not.
