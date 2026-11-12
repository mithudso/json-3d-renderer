# Development

## Prerequisites and setup

Use Node 24.22.3 from `.nvmrc` for maintenance. The package retains Node >=18 compatibility;
CI checks Node 18 and the pinned Node 24 runtime. Tests use Node built-ins; the checkout generator uses pinned Acorn and parse5 for template parsing.
A modern browser with WebGL displays 3D demos. Python 3 is optional for local HTTP serving.

```sh
npm ci --ignore-scripts
npm test
npm run lint
npm run docs:check
```

No environment variables, application build, watch process or application server is required.
`lint` validates all non-ignored JSON and syntax-checks maintained JS; no ESLint or static
type checker is configured. See [TESTING.md](TESTING.md) for coverage and limitations.

## View the demos

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/examples/concept-tree-3d.html`. Root demo copies use sibling
library paths; examples use `../`. Stop the local server with Ctrl-C. No live reload is built in.
If the page is blank, inspect the browser console and the library request path.

## Generate a local page

```sh
node inject-data.js /path/to/tree.json /path/to/new-output.html
```

The optional third positional argument selects a trusted template. Input must be an array
of concept records described in [COMPONENTS.md](COMPONENTS.md). Use a new output path.
Existing output files, duplicate ids, parent cycles and names containing `<` fail before
output creation. Missing parents become disconnected fragments. Generation logs event names
and counts, never source records. An output outside the repository needs access to the local
library at the template's script path; copy the bundle beside it or serve it from the repo root.

This local converter replaces DATA in a trusted existing template. It does not reproduce the
original upstream demo generators, rebuild the vendored bundle, or update fixed template subtitles.
Never use it to overwrite the frozen checked-in demo snapshots.

## Edit and validate

Create a task branch. Keep original generated pages and data unchanged. Put reusable conversion
logic in `lib/`, CLI I/O in the entrypoint, and behavior regressions in `test/*.test.js`.
Run `node --test test/inject-data.test.js` for generator tests. Run `npm run docs:update`
after file or command changes; then run all checks. CI repeats tests, syntax/JSON validation
and documentation drift checks on pull requests and pushes to `main`. There is no deployment job.
Commit only owned changes, open a PR, wait for checks, merge, and verify remote `main`.

## Troubleshooting

| Symptom | Action |
|---|---|
| `OUTPUT_WRITE_FAILED` with `EEXIST` | Choose a new output filename; inspect the old file before removing it |
| `GRAPH_VALIDATION_FAILED` | Check record types, duplicate concept names, cycles and `<` in names |
| `TEMPLATE_VALIDATION_FAILED` | Use one `const DATA = {JSON object};` declaration in a trusted template |
| `STALE` metadata | Run `npm run docs:update`, review the diff, then `npm run docs:check` |
| Missing bundle / blank demo | Serve from the repository root and check the library path |
| Workflow log exceeds 200 KiB | Close editors and run `npm run logs:rotate`; review archived content |
