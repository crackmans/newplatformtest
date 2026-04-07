---
name: merge-worktree
description: Squash-merge current worktree branch into target branch with safe checks and a clear commit message.
disable-model-invocation: true
argument-hint: "[target-branch]"
---

# merge-worktree

## Purpose
- Merge isolated worktree changes safely into a target branch.

## Workflow
1. Validate current directory is a git worktree.
2. Ensure working tree is clean.
3. Resolve target branch (`$ARGUMENTS`, else `main` then `master`).
4. Review `git diff <target>...HEAD` and changed files.
5. Checkout target branch in original repo and run `merge --squash`.
6. If conflict occurs, stop and report files; do not auto-resolve.
7. Commit with a structured message (`feat|fix|refactor|docs|chore|test`).
8. Report final commit hash and next steps (`push`, optional worktree cleanup).

## Safety
- Never force push or destructive git reset.
- Never bypass hooks with `--no-verify`.
