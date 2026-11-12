## Default Execution Strategy

- Read relevant source and docs before editing.
- Run `npm test`, `npm run lint` and `npm run docs:check` after changes.
- Never invent commands, services or paths.
- Record requests in `prompts.md`, completed work in `memory.md`, and update the package patch version.

## Orientation

Read [CLAUDE.md](../CLAUDE.md) and [the documentation index](../docs/wiki/index.md).

## Build, Test, and Validation Commands

```sh
npm ci --ignore-scripts
npm test
npm run lint
npm run docs:check
npm run docs:update
node --test test/verify-copy.test.js
```

No application build or static type checker exists. `lint` checks JSON and JavaScript syntax.

## High-level Architecture

Generated browser pages load inline data and local vendored libraries. Local Node CLIs
validate copies, generate a new page from explicit inputs, and maintain documentation.
No server, MCP runtime or datastore is part of this application.

## Key Conventions

1. Preserve generated demos; banners may appear on line two.
2. Preserve vendored library bytes.
3. Root pages use sibling paths; examples use `../` paths.
4. Use synthetic fixtures and disposable output for tests.
5. Never read private hub data or start semantic indexing for validation.
6. Use built-in Node APIs; keep CommonJS and ESM scopes explicit.
7. Regenerate retrieval metadata with `npm run docs:update`.
8. Ship task-owned changes through passing PRs and verify remote `main`.
