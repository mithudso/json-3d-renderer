# Validate and recover a maintenance change

## Preconditions

Use your task-owned checkout and pinned Node runtime. Preserve other worktrees, branches,
installed applications and services. Do not run the generator against live private input.

## Procedure

1. Run `npm ci --ignore-scripts`, `npm test`, `npm run lint` and `npm run docs:check`.
2. For metadata drift, run `npm run docs:update` and review every changed path.
3. For a bundle mismatch, compare the selected pin and consumer file; do not silently replace it.
4. For a generator error, correct synthetic/input schema or choose a new output filename.
5. For oversized workflow logs, close the editor and run `npm run logs:rotate`; review the archive.
6. Commit only task files, push, open a PR, wait for final checks, merge, and verify remote `main`.

## Verification and rollback

All checks must pass. Confirm generated demo/data/vendor hashes have not changed unless that
change was explicitly requested. A merged PR is the delivery receipt. Revert a bad merged
maintenance commit through a new reviewed PR. Local pre-change snapshots and literal restoration
commands are recorded in the dated optimizer report. Do not reset or force-push shared branches.
If credentials or required checks block delivery, retain a pushed draft checkpoint and record
the exact blocker. If the original generator source is missing, record the gap; do not edit output.
