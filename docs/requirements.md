# Requirements

## Functional

1. Display graph data through local 3D and 2D demo pages, with the controls each snapshot includes.
2. Preserve original generated demos, source-data snapshots and vendored renderer bytes.
3. Verify consumer copies and return documented exit codes for matches, mismatches and usage errors.
4. Convert explicit concept-tree JSON to a new HTML page using a trusted template.
5. Reject malformed records, duplicate ids, cycles and unsafe concept names before output creation.
6. Maintain complete, path-valid retrieval metadata and workflow logs.

## Non-functional

Use Node built-ins only for tooling. Keep CLI diagnostics useful without source-data disclosure.
Resolve ancestry iteratively; do not impose an invented rendering-latency or memory SLA. Require a
modern WebGL-capable browser for 3D views; no numeric GPU or hardware minimum has been measured.

The package advertises Node >=18 compatibility, tests Node 18 and 24 in CI, and pins maintainer
Node 24.22.3 in `.nvmrc`. Git is required by inventory tooling. Python 3 is optional for serving.
No npm runtime/development dependencies exist. Vendored D3 v7.9.0 and the opaque 3D bundle are
tracked assets; their upstream build inputs are absent. See [known-issues.md](known-issues.md).
