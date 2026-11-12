# CLAUDE.md — json-3d-renderer

## Default Execution Strategy

Read the relevant source before editing. Preserve generated demos, source data and opaque
vendored libraries. Fix the owning upstream generator when changing an original demo.
Run the checks below after changes. Do not invent commands or services.

## Repository shape

This is one Node package with no runtime npm dependencies plus static browser artifacts. `package.json`
is the canonical version. `inject-data.js` is a local generator; `lib/` contains its pure
conversion helpers. `scripts/` contains verification and maintenance CLIs. `test/` contains
Node tests. `examples/` and root HTML pages are generated output. `docs/` contains the
maintainer reference; start at [docs/wiki/index.md](docs/wiki/index.md).

## Commands

```sh
npm ci --ignore-scripts
npm test
npm run lint
npm run docs:check
npm run docs:update
node scripts/verify-copy.mjs concept-tree-3d.bundle.js
```

`lint` parses repository JSON and syntax-checks maintained JavaScript; it is not ESLint
or a type checker. No application build exists. `docs:update` regenerates retrieval
metadata only. Run `npm run logs:rotate` when versioned workflow logs exceed 200 KiB;
it refuses editor swap files and archives full originals before retaining the latest entry.

## Runtime architecture

A browser loads a generated page, inline graph data and a local rendering library. There
is no backend, authentication service, datastore or runtime network integration.
The local generator reads explicit input and template paths and creates a new output:

```sh
node inject-data.js /path/to/tree.json /path/to/new-output.html
```

The optional third argument selects a trusted template. The default template is the root
`concept-tree-3d.html`. Generation refuses existing output files, malformed records,
duplicate ids, cycles and names containing `<` because legacy tooltips interpolate HTML.
See [docs/COMPONENTS.md](docs/COMPONENTS.md) for the library API.

## Key conventions

- Do not hand-edit original generated HTML/Markdown or source-data snapshots. Generator
  banners can be on line two, not only the first line.
- Preserve `concept-tree-3d.bundle.js` and `d3.v7.min.js` byte for byte unless a verified
  upstream library update is the requested task.
- Root demos use sibling library paths; `examples/` demos use `../` paths.
- Keep tests synthetic and isolated. Never import private hub data during validation.
- Node tools use built-ins plus pinned Acorn and parse5 development dependencies for template parsing. Root `.js` is CommonJS; `test/*.js` uses ESM through
  `test/package.json`; `.mjs` and `.cjs` are explicit.
- Update retrieval artifacts with `npm run docs:update`; CI rejects drift.
- Never start indexing, embeddings, daemons or live integrations to explore this repo.
  No semantic-index builder or `search_codebase` MCP tool ships here. Use `rg` and direct reads.
- Commit task-owned changes on a branch, run checks, deliver through a passing PR and
  verify the merged content on remote `main`. Preserve other worktrees and branches.

## MCP servers

None configured or required. See [docs/MCP.md](docs/MCP.md).

## Workflow log rule

Append each originating request to `prompts.md` as `## Prompt vN - <ISO timestamp>`.
Keep `memory.md` current with active task, completed changes and next steps under
`## v<package version> - <date>`. Bump the patch version for a completed maintenance
change. Do not stage private research, transcripts, caches or other tasks' changes.
