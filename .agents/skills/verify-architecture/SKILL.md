---
name: verify-architecture
description: Validate hybrid architecture boundaries and dependency direction across web, desktop Electron, mobile RN, and shared packages.
---

# verify-architecture

## Purpose
- Ensure file placement and import flow remain aligned with the active hybrid architecture.

## When to Run
- After structural edits (new folders/files or cross-layer moves).
- Before finishing work that touches shared modules or platform boundaries.

## Checks
1. Changed files remain in correct boundary owners:
   - web
   - desktop/main
   - desktop/preload
   - desktop/renderer
   - mobile
   - shared packages
2. Electron main/preload are not coupled into renderer/shared implementation.
3. Shared packages remain runtime-light and platform-agnostic unless explicitly approved.
4. UI consistency goals are preserved without forcing identical UI code across all platforms.
5. Platform-specific dependencies remain in platform-specific app boundaries.

## Output
- PASS/FAIL per rule
- Violations with file paths and fix guidance
- Explicit residual risks when a boundary exception is intentionally approved
