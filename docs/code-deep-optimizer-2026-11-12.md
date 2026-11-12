# Code deep optimizer — 2026-11-12

Full default repository workflow on `mithudso/json-3d-renderer`, baseline `538c056`.
Scope and reasoned exclusions: [coverage ledger](maintenance-coverage-2026-11-12.md).
No quick mode, changed-only mode, source-file cutoff, advisory features, semantic indexing,
embedding run, service restart or live/private data import. The maintained code was read in full.

## 1. Per-iteration severity

Counts describe corroborated findings entering each correction round, not test percentages.
Low/Nit totals are zero because cosmetic preferences were not promoted to findings.

| Round | Critical | High | Medium | Low | Nit | Disposition |
|---|---:|---:|---:|---:|---:|---|
| 1 — baseline / repository sweep | 0 | 3 | 12 | 0 | 0 | Corrected; behavior counterexamples and bootstrap gaps addressed |
| 2 — complete maintained-source reviews / CI | 0 | 1 | 5 | 0 | 0 | Corrected; CodeQL escaping and new-tool counterexamples |
| 3 — first blind dissent and metadata cross-check | 2 | 0 | 3 | 0 | 0 | Corrected; parser, live-file retirement, temporary ownership, metadata boundaries |
| Final loop | 0 | 0 | 0 | 0 | 0 | Local gates pass; final blind result below |

The canonical convergence checker compared iteration snapshots, not a self-estimated edit distance.
The canonical final comparison returned CLEAN with edit-distance ratio0.2559 and5 closed
Medium+ findings. A zero Medium+ loop result is only a candidate until the blind gate passes. The first blind gate
failed and caused the final corrective iteration. The final gate is bounded to the maintained code;
generated browser code, bundle internals and absent upstream generators remain excluded.

## 2. Findings and fixes

Old line anchors below are relative to baseline `538c056` unless marked checkpoint `79dabd7`.
Closely related repository bootstrap findings are grouped; no generated artifact was hand-edited.

| Pass | File:line | Severity | Finding | Fix | Status |
|---|---|---|---|---|---|
| S1/S3 | inject-data.js:70 | High | Serialized `</script>` can terminate an inline script | Escape `<` and JS line separators | Fixed; serialization regression |
| S1/S3 | inject-data.js:54 | High | Legacy tooltips interpolate untrusted concept names | Reject `<` in input names before generation | Fixed; markup-name counterexample |
| C1/C3 | inject-data.js:33 | High | Parent cycles never terminate | Iterative cycle detection and memoized groups | Fixed; self/mutual cycle boundary |
| C1 | inject-data.js:30 | Medium | Grandchildren get the root color rather than branch color | Inherit the resolved top-level branch | Fixed; root/branch/leaf assertion |
| S3 | inject-data.js:18 | Medium | Prototype-like ids select inherited color properties | Use Map for ids and colors | Fixed; constructor/__proto__/toString |
| C1/C2/S5 | inject-data.js:70 | Medium | Regex truncates JSON strings; missing replacement reports success | Require one real JSON-object DATA initializer | Fixed; malformed/ambiguous template tests |
| S4/S5 | inject-data.js:6 | Medium | Private workstation input and fixed output prevent portable safe use | Require explicit input/new output; exclusive creation; redacted events | Fixed; real CLI outcomes |
| P1 | inject-data.js:26 | Medium | Repeated ancestry walks are quadratic | Resolve each ancestry once in lib/ | Fixed; reverse 10,000-node chain |
| C2/S3 | inject-data.js:60 | Medium | Missing parents emit links without endpoints | Keep disconnected nodes and omit invalid links | Fixed; fragment assertion |
| S2/S5 | scripts/verify-copy.mjs:39 | Medium | Forced exit can drop piped diagnostics | Set exitCode and drain output | Fixed; 5,000-copy subprocess test |
| T1 | test/verify-copy.test.js:18 | Medium | Size-changing edit does not prove content comparison | Same-length corruption and observable outcomes | Fixed |
| S4/T3 | .github/workflows/ci.yml:16 | Medium | Git quoted filenames break JSON validation | NUL-delimited tracked/new path enumeration | Fixed; Unicode/newline path fixtures |
| T3/T1 | .github/workflows/ci.yml:16 | Medium | CI omits existing behavior tests and metadata checks | Test/lint/docs matrix on Node18 and pinned24 | Fixed |
| S4/T3 | package.json:16; test/verify-copy.test.js:1 | Medium | Implicit ESM scope contradicts Node18 contract; no lock | Explicit test ESM scope and reproducible lock | Fixed |
| M4 | CLAUDE.md:1; docs/high_signal_file_index.json:1 | Medium | Docs deny package/tests and list three absent paths | Refresh guidance, restore logs/GEMINI and regenerate complete census | Fixed |
| C1/M4 | lib/concept-graph.cjs:62 @79dabd7 | Medium | DATA-like string content is counted as declarations | Initially lexical scan, then AST boundaries after blind dissent | Fixed; repeat-render test |
| C1 | scripts/rotate-workflow-logs.mjs:22 @79dabd7 | Medium | Ordinary/fenced headings replace the latest numeric version | Parse version headings outside fences | Fixed |
| P2 | scripts/rotate-workflow-logs.mjs:34 @79dabd7 | Medium | Concurrent appends disappear from both files | Preserve retired inode and initial snapshot | Fixed; in-flight append regression |
| S1/S3 | scripts/rotate-workflow-logs.mjs:27 @79dabd7 | Medium | Private logs become world readable | Private archive directory and source modes | Fixed; mode0600 assertions |
| S4/T1 | test/verify-copy.test.js:39 @79dabd7 | Medium | Long repeated absolute args hit macOS E2BIG | Short relative fixture args retain pipe-pressure coverage | Fixed |
| S1 | scripts/check-doc-indexes.mjs:55 @79dabd7 | High | CodeQL finds incomplete Markdown escaping | Escape backslashes/Markdown and HTML; encode link segments | Fixed; final pushed CI recorded in delivery receipt |
| C1/C3 | lib/concept-graph.cjs, pre-round3 scanner | Critical | Regex after return can become the selected DATA; quoted `>` breaks script extraction | Pinned Acorn8.19.0 parses top-level initializers; quoted attribute extraction | Fixed; execute rendered synthetic JS |
| P2/S2 | scripts/rotate-workflow-logs.mjs, pre-round3 replacement | Critical | Editor atomic save replaces inode A with B; archiveA plus rename discards B | Retire current live path, detect changes, restore exclusively; never overwrite competitor | Fixed; atomic-save and gap-writer regressions |
| S2/P2 | scripts/rotate-workflow-logs.mjs, pre-round3 finally | Medium | EEXIST on temporary creation deletes another owner's temporary | Own paths in a new private directory; cleanup only owned temporary | Fixed; sentinel preserved |
| M4/S3 | scripts/check-doc-indexes.mjs:38 | Medium | Prose examples become false source exports; parentheses break Markdown destinations | Extract only JS metadata, include CommonJS exports; encode reserved path characters | Fixed; prose/CJS/path regressions |

Risky behavior changes are justified by these findings: cycles/duplicates/unsafe names fail closed,
invalid templates fail before output creation, and generated output must be a new path. The verifier's
MD5 is an accidental-copy drift check, not a cryptographic security claim; its public contract remains.

## 3. Verification gates

Detected gates were recorded before execution. There is no app build/type-check command.
New lint means JSON parse and maintained-JS syntax checks, not an ESLint or type-safety claim.

| Command / experiment | Baseline | Final local | Verdict |
|---|---|---|---|
| npm test | 1 pass; implicit ESM warning on Node26.7.0 | 20 pass; no failures | PASS |
| node --check (original3); npm run lint (final) | 3 syntax / 7JSON pass | 9 maintained JS / 14JSON pass | PASS |
| npm run docs:check | Absent; 3 dead indexed paths | Complete deterministic88-path output | PASS |
| npm ci --ignore-scripts | No lockfile | Pinned development dependency install | PASS |
| npm audit --json | ENOLOCK | Zero registry-reported vulnerabilities | PASS within npm dependency scope |
| npm outdated --json | {} | {} | PASS at audit time |
| npm pack --dry-run --json | Existing package contract inspected | 5 intended package files; no private source | PASS |
| Synthetic generation with actual root template | Cycle/serialization counterexamples fail | 3nodes / 2links in disposable batch output | PASS |
| Asset hash and data-copy comparison | 21 preserved assets snapshotted | All21 hashes match; root/examples JSON identical | PASS |
| git diff --check | Clean baseline | Pass | PASS |
| PR checks | Original CI only JSON | Final receipt records both matrix jobs and CodeQL on final push | Required before merge |

Empirical mode: N/A — no held-out eval or benchmark exists; cannot auto-improve. No metric,
champion, speedup or line-coverage percentage is invented. Tests are behavior receipts.

## 4. Activated skills and pass coverage

- repo-bootstrapper plus audit-checklist/coding-standards: truthful manifest and integration applicability.
- code-deep-optimizer plus flags/statuses, report-format, language map, empirical-mode and canonical
  convergence contract: full18-pass default workflow and independent gates.
- lang-js-ts / Node concurrency references: Node18-compatible module scope, I/O and output draining.
- security-review: JSON-to-script and legacy-tooltip boundaries; redacted failure logs.
- software-engineering-patterns, coding standards, testing and architecture references: pure lib API,
  behavioral tests, no app-server abstractions for a static artifact repository.
- devops-containers-cicd / observability / documentation references: real CI commands, action pins,
  current API/setup instructions and observable filesystem outcomes.

C1–C3, S1–S5, P1–P2, M1–M4 and T1–T4 all apply at repository scope (18 active passes).
M3/T2/T3 and cross-file M2 run once at repo scope. Per-file fresh-context reviewers cover the
file-level passes. T4 is N/A on non-test files; browser/runtime concurrency and auth checks are
N/A where no corresponding maintained surface exists. Root test review fills test-source scope
that a source-only reviewer explicitly marked unassessed. The independent blind gate is additional,
not a substitute for missing per-file bundles. Final maintained universe includes9 JS files,
2 package scopes and the CI workflow. All supplied source was read without file truncation.

T2 facts: npm registry reports Acorn8.19.0, MIT, pinned exactly with integrity in the lockfile.
No npm runtime dependencies or install scripts were added. Opaque vendored libraries remain
outside npm audit; D3 banner is7.9.0 and the 3D bundle lacks reproducible build provenance.
GitHub tag resolution pins checkoutv7 and setup-nodev6 by SHA. Official Node distribution index
confirms the pinned24.22.3. These are live audit observations, not permanent security assurances.

M3: input/output stays in the CLI; graph/serialization lives in lib/; metadata has one writer.
Palette and rotation threshold each have one owner. No configurable service/UI settings surface
exists. T4: Node test files run independently in separate processes. Race tests restore patched
built-ins in finally and use unique fixtures; no sleeps, shared live data or unsafe hoisting.

## 5. Unified diffs by file

Every task-owned file is accounted for below. Executable, test, package/lock and CI diffs are
complete. Documentation/generated metadata diffs are capped at40lines per file with the omitted
count stated; full content is in the PR. The report's own recursive diff is omitted. Blank context-line whitespace is normalized for the documentation whitespace gate. No source
file was truncated or shortened for this run. Removed private absolute input paths are redacted.

### .env.example

````diff
--- a/.env.example
+++ b/.env.example
@@ -0,0 +1,2 @@
+# No environment variables or credentials are read by the maintained tools.
+# Supply generator input/output/template as positional CLI paths. See docs/DEVELOPMENT.md.
````

### .github/CODEOWNERS

````diff
--- a/.github/CODEOWNERS
+++ b/.github/CODEOWNERS
@@ -1,14 +1,6 @@
-# Code owners for json-3d-renderer
-# Each line maps a path pattern to its reviewer(s). Replace @owner with the
-# actual GitHub handle(s) before relying on auto-assignment.
-
-# Default owner for everything in the repo
-*           @owner
-
-# Documentation
-/docs/      @owner
-/README.md  @owner
-
-# Vendored rendering libraries — review carefully on any update
-/concept-tree-3d.bundle.js  @owner
-/d3.v7.min.js               @owner
+# Verified repository owner
+* @mithudso
+/docs/ @mithudso
+/scripts/ @mithudso
+/lib/ @mithudso
+/test/ @mithudso
````

### .github/PULL_REQUEST_TEMPLATE.md

````diff
--- a/.github/PULL_REQUEST_TEMPLATE.md
+++ b/.github/PULL_REQUEST_TEMPLATE.md
@@ -16,8 +16,16 @@

 - [ ] I did **not** hand-edit any `GENERATED by …` file (regenerated via its upstream
       generator instead, or this PR is the regeneration output).
-- [ ] All JSON files still parse (CI: `validate-json`).
+- [ ] `npm test`, `npm run lint` and `npm run docs:check` pass.
 - [ ] If I moved or renamed files, the `src=`/`href=` references in `examples/*.html`
       still resolve (see `docs/known-issues.md`).
 - [ ] Updated `docs/` and `docs/high_signal_file_index.json` if files were added/removed.
 - [ ] Logged the change in `memory.md`.
+
+## Risk
+
+<!-- Behavior changes, generated/vendor boundaries, and remaining limitations. -->
+
+## Rollback
+
+<!-- Revert through a new PR; note local snapshots when applicable. -->
````

### .github/SECURITY.md

````diff
--- a/.github/SECURITY.md
+++ b/.github/SECURITY.md
@@ -28,3 +28,6 @@
 3. Include the affected file, how to reproduce, and the impact.

 We will acknowledge the report and respond with next steps.
+
+The detailed [threat model](../docs/SECURITY.md) covers local generation, output encoding,
+legacy tooltip constraints and vendor provenance. No response-time SLA is promised.
````

### .github/copilot-instructions.md

````diff
--- a/.github/copilot-instructions.md
+++ b/.github/copilot-instructions.md
@@ -1,17 +1,40 @@
-# Copilot instructions — json-3d-renderer
-
 ## Default Execution Strategy

-- **Read before you write.** Most files here are *generated output* or *vendored libraries*,
-  not hand-authored source. Check the first line of any file for a `GENERATED by …` banner
-  before editing.
-- **Never hand-edit generated artifacts** (`*.md`, `*.mmd`, and `examples/*.html` carry
-  generator banners). Their build scripts live in a separate upstream repo — see
-  `docs/known-issues.md`.
-- **Do not invent commands, build steps, or env vars.** This repo has no `package.json`,
-  build, or test suite checked in today. Propose any tooling explicitly.
-- **Treat large vendored files as opaque:** `concept-tree-3d.bundle.js`, `d3.v7.min.js`.
-  Do not reformat or re-minify them.
+- Read relevant source and docs before editing.
+- Run `npm test`, `npm run lint` and `npm run docs:check` after changes.
+- Never invent commands, services or paths.
+- Record requests in `prompts.md`, completed work in `memory.md`, and update the package patch version.

-For full context see [`../CLAUDE.md`](../CLAUDE.md), `docs/ARCHITECTURE.md`, and
-`docs/codebase-overview.md`.
+## Orientation
+
+Read [CLAUDE.md](../CLAUDE.md) and [the documentation index](../docs/wiki/index.md).
+
+## Build, Test, and Validation Commands
+
+```sh
+npm ci --ignore-scripts
+npm test
+npm run lint
+npm run docs:check
+npm run docs:update
+node --test test/verify-copy.test.js
+```
+
+No application build or static type checker exists. `lint` checks JSON and JavaScript syntax.
````

Documentation/metadata excerpt: 17 diff lines omitted.

### .github/dependabot.yml

````diff
--- a/.github/dependabot.yml
+++ b/.github/dependabot.yml
@@ -1,13 +1,11 @@
 version: 2
 updates:
-  # Keep GitHub Actions in the CI workflow up to date.
   - package-ecosystem: github-actions
     directory: "/"
     schedule:
       interval: weekly
-
-  # NOTE: there is no package manifest (package.json) in this repo today, so no
-  # npm/pip ecosystem is configured. The rendering libraries
-  # (concept-tree-3d.bundle.js, d3.v7.min.js) are vendored as built files and are
-  # NOT managed by Dependabot — update them manually from upstream releases.
-  # If a package.json is added later, add an `npm` ecosystem block here.
+  - package-ecosystem: npm
+    directory: "/"
+    schedule:
+      interval: weekly
+# No npm dependencies today. Vendored bundles require a verified upstream update.
````

### .github/workflows/ci.yml

````diff
--- a/.github/workflows/ci.yml
+++ b/.github/workflows/ci.yml
@@ -5,25 +5,26 @@
     branches: [main]
   pull_request:

-# Minimal CI for a static-artifact repo: validate that every tracked JSON file
-# parses. There is no build or test suite to run today (see docs/DEVELOPMENT.md).
+permissions:
+  contents: read
+
+concurrency:
+  group: ${{ github.workflow }}-${{ github.ref }}
+  cancel-in-progress: true
+
 jobs:
-  validate-json:
+  validate:
     runs-on: ubuntu-latest
+    timeout-minutes: 10
+    strategy:
+      matrix:
+        node: ['18', '24.22.3']
     steps:
-      - uses: actions/checkout@v7
-
-      - name: Validate all JSON files parse
-        run: |
-          set -euo pipefail
-          fail=0
-          # All tracked .json files except those under node_modules / .git.
-          while IFS= read -r f; do
-            if ! node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$f" 2>/dev/null; then
-              echo "::error file=$f::invalid JSON"
-              fail=1
-            else
-              echo "ok: $f"
-            fi
-          done < <(git ls-files '*.json')
-          exit $fail
+      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7
+      - uses: actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38 # v6
+        with:
+          node-version: ${{ matrix.node }}
+      - run: npm ci --ignore-scripts
+      - run: npm test
+      - run: npm run lint
+      - run: npm run docs:check
````

### .gitignore

````diff
--- a/.gitignore
+++ b/.gitignore
@@ -6,7 +6,7 @@
 .idea/
 *.code-workspace

-# Node (if a build is ever added)
+# Node tooling
 node_modules/
 npm-debug.log*
 yarn-error.log*
@@ -26,6 +26,8 @@
 # Local env
 .env
 .env.local
+*.rotate-*
+*.tgz

 # NOTE: the generated visualization artifacts (examples/*.html, examples/*.json,
 # examples/*.md) and the vendored rendering libraries (concept-tree-3d.bundle.js,
````

### .nvmrc

````diff
--- a/.nvmrc
+++ b/.nvmrc
@@ -0,0 +1 @@
+24.22.3
````

### .vscode/extensions.json

````diff
--- a/.vscode/extensions.json
+++ b/.vscode/extensions.json
@@ -0,0 +1,3 @@
+{
+  "recommendations": ["EditorConfig.EditorConfig"]
+}
````

### .vscode/launch.json

````diff
--- a/.vscode/launch.json
+++ b/.vscode/launch.json
@@ -0,0 +1,11 @@
+{
+  "version": "0.2.0",
+  "configurations": [{
+    "name": "Verify bundle copy",
+    "type": "node",
+    "request": "launch",
+    "program": "${workspaceFolder}/scripts/verify-copy.mjs",
+    "args": ["${workspaceFolder}/concept-tree-3d.bundle.js"],
+    "console": "integratedTerminal"
+  }]
+}
````

### .vscode/settings.json

````diff
--- a/.vscode/settings.json
+++ b/.vscode/settings.json
@@ -0,0 +1,6 @@
+{
+  "files.eol": "\n",
+  "files.insertFinalNewline": true,
+  "editor.tabSize": 2,
+  "editor.formatOnSave": false
+}
````

### CLAUDE.md

````diff
--- a/CLAUDE.md
+++ b/CLAUDE.md
@@ -1,84 +1,73 @@
-# Semantic Indexing Rule
-- Do NOT use `view_file` to blindly explore large files.
-- ALWAYS use the `search_codebase` MCP tool (local semantic index) first to pull semantic chunks.
-- If the index does not exist, build it using `scripts/semantic_indexer.py`.
-- If the MCP server is not running or fails, attempt to start it. If it still fails, only then fallback to `view_file`.
-
 # CLAUDE.md — json-3d-renderer
-
-Guidance for Claude Code (and other AI coding agents) working in this repository.

 ## Default Execution Strategy

-- **Read before you write.** This repo is mostly *generated output* (HTML/JSON/Markdown
-  visualizations) plus *vendored rendering libraries*. Confirm whether a file is
-  hand-authored or machine-generated before editing — generated files carry a
-  `GENERATED by …` banner on the first line and must not be hand-edited.
-- **Never hand-edit generated artifacts.** Files with a `GENERATED by scripts/…` header
-  are produced by build scripts that live in a *separate* upstream repo (see
-  [docs/known-issues.md](docs/known-issues.md)). Editing them by hand will be lost on the
-  next regeneration. Fix the upstream generator instead, or record the need as a TODO.
-- **Do not invent commands, paths, env vars, or build steps.** There is no `package.json`,
-  no build system, and no test suite checked into this repo today. If you need one, propose
-  it explicitly — do not document a phantom workflow.
-- **Keep large vendored files out of diffs.** `concept-tree-3d.bundle.js` (~1.6 MB) and
-  `d3.v7.min.js` (~280 KB) are vendored builds. Treat them as opaque; do not reformat or
-  re-minify them.
+Read the relevant source before editing. Preserve generated demos, source data and opaque
+vendored libraries. Fix the owning upstream generator when changing an original demo.
+Run the checks below after changes. Do not invent commands or services.

-## What this repo is
+## Repository shape

-A **JSON → 3D mind-map renderer** and a set of demo visualizations built with it. The
-intent (per `README.md`) is to convert mind-map-style JSON into an interactive 3D map with
-focus mode and node descriptions. Today the repo ships:
+This is one Node package with no runtime npm dependencies plus static browser artifacts. `package.json`
````

Documentation/metadata excerpt: 107 diff lines omitted.

### CONTRIBUTING.md

````diff
--- a/CONTRIBUTING.md
+++ b/CONTRIBUTING.md
@@ -16,24 +16,24 @@
 2. **Don't reformat vendored libraries.** `concept-tree-3d.bundle.js` and `d3.v7.min.js` are
    third-party builds. Update them only from official upstream releases.

-3. **No invented tooling in docs.** There is no `package.json`, build, or test suite checked
-   in today. If you add one, document it for real in
-   [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) — don't describe a workflow that doesn't exist.
+3. **Use the actual checks.** Run `npm test`, `npm run lint`, and `npm run docs:check`.
+   There is no application build. See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

 ## How to make a change

-- **Tweak a demo by hand (one-off):** edit the relevant `examples/*.html`. Be aware it
-  carries a generator banner — your edit will not survive regeneration, so note it in the PR.
+- **Change an original demo:** change its owning upstream generator. Preserve frozen output
+  in maintenance-only PRs. Use explicit synthetic input and a new file for local experiments.
 - **Add a new visualization:** add a self-contained page under `examples/`. Inline its data
   as `const DATA = {...}` and load the appropriate library with a correct relative path
   (`../concept-tree-3d.bundle.js` or `../d3.v7.min.js`).
 - **Update docs:** edit files under `docs/`. If you add/remove/rename files, update
   [docs/codebase-overview.md](docs/codebase-overview.md) and
-  [docs/high_signal_file_index.json](docs/high_signal_file_index.json).
+  [docs/high_signal_file_index.json](docs/high_signal_file_index.json) via `npm run docs:update`.

 ## Before you open a PR

-- [ ] All JSON files parse (`git ls-files '*.json'` → each must `JSON.parse`). CI checks this.
+- [ ] `npm test`, `npm run lint` and `npm run docs:check` pass.
+- [ ] The request is logged in `prompts.md` and task changes reach remote `main` through a passing PR.
 - [ ] If you moved/renamed files, the `src=`/`href=` references in `examples/*.html` still
       resolve.
 - [ ] You logged the change in [memory.md](memory.md).
````

### GEMINI.md

````diff
--- a/GEMINI.md
+++ b/GEMINI.md
@@ -0,0 +1,5 @@
+# Gemini CLI notes
+
+Repository conventions are shared with [CLAUDE.md](CLAUDE.md). Read that file and the
+[documentation index](docs/wiki/index.md) before changing code. No Gemini-only tool
+mappings or MCP servers are defined here.
````

### README.md

````diff
--- a/README.md
+++ b/README.md
@@ -23,7 +23,7 @@

 ## Quick start

-Everything renders client-side and offline — no server, no install, no network.
+The demos render client-side and offline. Node tooling is optional for viewing.

 1. Clone the repo.
 2. Open a demo. Because the demos load a rendering library from the repo root, open them
@@ -31,9 +31,9 @@

    ```sh
    # from the repo root
-   python3 -m http.server 8000
+   python3 -m http.server 8000 --bind 127.0.0.1
    # then visit, e.g.:
-   #   http://localhost:8000/examples/concept-tree-3d.html
+   #   http://127.0.0.1:8000/examples/concept-tree-3d.html
    ```

    The demo pages load their rendering library from the repo root via a `../` relative path
@@ -75,6 +75,8 @@
 - [docs/COMPONENTS.md](docs/COMPONENTS.md) — the renderers and the data schemas
 - [docs/codebase-overview.md](docs/codebase-overview.md) — file-by-file map
 - [docs/known-issues.md](docs/known-issues.md) — active gaps and workarounds
+- [Installation](docs/INSTALLATION.md) · [Testing](docs/TESTING.md) · [Security](docs/SECURITY.md)
+- [Documentation index](docs/wiki/index.md) — full maintained reference
 - [CONTRIBUTING.md](CONTRIBUTING.md) · [CLAUDE.md](CLAUDE.md) (AI-agent guidance)

 ## Consuming
@@ -90,12 +92,33 @@
 node node_modules/@mithudso/json-3d-renderer/scripts/verify-copy.mjs path/to/vendor/concept-tree-3d.bundle.js
 ```

-Or from a checkout of this repo: `node scripts/verify-copy.mjs /Users/mitch.hudson/dev/<consumer>/<path>/concept-tree-3d.bundle.js`
+Or from a checkout of this repo: `node scripts/verify-copy.mjs /path/to/consumer/concept-tree-3d.bundle.js`
 (accepts several paths). Plain md5 works too: `md5 concept-tree-3d.bundle.js path/to/copy.js` (macOS) or `md5sum` (Linux); the sums must be equal.
 `v0.1.0` bundle md5: `10296029343709356d741bfd56446046`.
````

Documentation/metadata excerpt: 28 diff lines omitted.

### docs/ARCHITECTURE.md

````diff
--- a/docs/ARCHITECTURE.md
+++ b/docs/ARCHITECTURE.md
@@ -1,7 +1,6 @@
 # Architecture

-_Snapshot: 2026-06-20. This repo was being reorganized when these docs were written; if the
-layout has drifted, reconcile against `docs/codebase-overview.md`._
+_Maintainer tooling verified 2026-11-12. Demo counts and layouts describe frozen snapshots._

 ## System context

@@ -70,3 +69,24 @@
 - **ADR-003 — Offline-first, no server.** No build/runtime dependencies at view time.
   *Consequence:* opening via `file://` can hit browser path/security quirks; a tiny static
   server is the recommended way to view (see [DEVELOPMENT.md](DEVELOPMENT.md)).
+
+
+## Maintained tooling
+
+`inject-data.js` reads explicit local files and calls pure `lib/concept-graph.cjs` helpers.
+`buildGraph` validates records, resolves ancestry once, assigns branch colors, and retains
+missing-parent nodes as disconnected fragments. `renderHtml` scans a trusted template's DATA
+JSON object and serializes script-safe replacement data. The CLI exclusively creates output.
+This converter does not reproduce the absent original page generators or update their fixed UI.
+
+`verify-copy.mjs` checks consumer bytes. `check-repo.mjs` validates JSON and maintained syntax.
+`check-doc-indexes.mjs` is the sole writer of retrieval metadata and the llms family; no vector
+store is involved. `rotate-workflow-logs.mjs` preserves full originals before log rotation.
+Tests isolate all filesystem and subprocess work in synthetic fixtures.
+
+- **ADR-004 — Explicit local conversion, accepted 2026-11-12.** Remove the private hub input
+  default and fixed output overwrite. Require paths and refuse existing output. Consequence:
+  older no-argument invocation becomes a usage error; validation can run safely on synthetic input.
+- **ADR-005 — Deterministic lexical metadata, accepted 2026-11-12.** Generate and CI-check all
+  retrieval paths. No semantic index, embedding pipeline, daemon or application server is added.
+  Consequence: retrieval supports file/command discovery without claiming semantic search.
````

### docs/COMPONENTS.md

````diff
--- a/docs/COMPONENTS.md
+++ b/docs/COMPONENTS.md
@@ -108,3 +108,41 @@
 When a graph is generated from data you don't control, the `desc` and any URL fields are
 **untrusted** and must be escaped before being inserted into the DOM, or they become an XSS
 vector. See [.github/SECURITY.md](../.github/SECURITY.md).
+
+
+## Local conversion library — `lib/concept-graph.cjs`
+
+This CommonJS module uses pinned Acorn for parsing and performs no filesystem I/O. It exports:
+
+- `buildGraph(tree)`: accepts a concept-array, returns `{nodes, links}` without mutating input.
+  Each record needs a nonblank string `concept`. `parentConcept` is a string, null or absent;
+  `childConcepts` is an optional string array; `researchedAt` is an optional string. Duplicate
+  ids, cycles, malformed fields and `<` in names throw `TypeError`. Root children start their
+  own branch; deeper descendants inherit that branch's color. Missing parents create fragments
+  with no invalid link endpoint. Node sizing and palette are centralized in this module.
+- `renderHtml(html, graph)`: accepts a trusted HTML template and a graph returned by `buildGraph`.
+  Requires exactly one top-level JSON-object `const DATA = ...` declaration in classic inline
+  scripts or bare JavaScript. Acorn determines its expression boundaries without evaluation before replacement and escapes `<`, U+2028 and U+2029 in serialized JSON. Throws on invalid templates.
+  The template and its HTML tooltip code remain trusted; this is not an arbitrary HTML sanitizer.
+
+```js
+const { buildGraph, renderHtml } = require('./lib/concept-graph.cjs');
+const graph = buildGraph([{ concept: 'Example', parentConcept: null }]);
+const html = renderHtml('<script>const DATA = {};</script>', graph);
+```
+
+`inject-data.js` owns CLI input/output and exports `main(args)` returning 0 for success, 1 for
+validation/I/O failure and 2 for usage. It defaults only the template, never the source data or
+output. It writes a new file using `wx` and emits redacted JSON status events.
+
+## Maintenance tools
+
+| Path | Interface and effects |
+|---|---|
+| `scripts/verify-copy.mjs` | CLI paths; hashes reference/copies; exit 0 equal, 1 mismatch/read error, 2 usage |
+| `scripts/check-repo.mjs` | CLI without args; parse JSON and syntax-check maintained JS; exit nonzero on failure |
+| `scripts/check-doc-indexes.mjs` | CLI check or `--write`; exports `repositoryFiles(root)` and `buildOutputs(root)` for deterministic local metadata |
````

Documentation/metadata excerpt: 4 diff lines omitted.

### docs/DEVELOPMENT.md

````diff
--- a/docs/DEVELOPMENT.md
+++ b/docs/DEVELOPMENT.md
@@ -1,75 +1,65 @@
 # Development

-_Snapshot: 2026-06-20._
+## Prerequisites and setup

-## Prerequisites
-
-- A modern browser (WebGL support for the 3D view).
-- Optional: Python 3 or Node.js, only to run a tiny static file server for local viewing.
-
-There is **no build step, no `package.json`, and no test suite** checked into this repo
-today. Do not document or assume one that doesn't exist (see
-[known-issues.md](known-issues.md) for why the generators are absent).
-
-## Viewing the demos locally
-
-The demo pages load a rendering library by relative path, so serve the repo over HTTP rather
-than opening `file://` URLs:
+Use Node 24.22.3 from `.nvmrc` for maintenance. The package retains Node >=18 compatibility;
+CI checks Node 18 and the pinned Node 24 runtime. Tests use Node built-ins; the checkout generator uses pinned Acorn for template parsing.
+A modern browser with WebGL displays 3D demos. Python 3 is optional for local HTTP serving.

 ```sh
-# from the repo root
-python3 -m http.server 8000
-#   root copies (bare paths):  http://localhost:8000/concept-tree-3d.html
-#   examples/ copies (../):    http://localhost:8000/examples/concept-tree-3d.html
-#   also: concept-tree.html, skills-graph.html, skills-graph-full.html (both locations)
-
-# or, with Node installed:
-npx --yes serve .
+npm ci --ignore-scripts
+npm test
+npm run lint
+npm run docs:check
 ```

````

Documentation/metadata excerpt: 89 diff lines omitted.

### docs/INSTALLATION.md

````diff
--- a/docs/INSTALLATION.md
+++ b/docs/INSTALLATION.md
@@ -0,0 +1,22 @@
+# Installation
+
+Clone this repository to view its static demos. A modern browser with WebGL is sufficient
+for 3D rendering; Python 3 can serve files locally. Node 24.22.3 is the pinned maintainer
+runtime. No runtime npm dependencies exist. Install development dependencies with `npm ci`
+before using the checkout generator; it uses Acorn 8.19.0 for template parsing.
+
+```sh
+npm ci --ignore-scripts
+npm test
+npm run lint
+npm run docs:check
+python3 -m http.server 8000 --bind 127.0.0.1
+```
+
+Open `http://127.0.0.1:8000/examples/concept-tree-3d.html`. See [DEVELOPMENT.md](DEVELOPMENT.md)
+for local generation. See [the README](../README.md#consuming) for pinned bundle consumption.
+
+Upgrade through a reviewed commit or release pin and rerun the checks. Review vendored library
+provenance before replacing bytes. Uninstall by closing the browser page, stopping only your
+local static server with Ctrl-C, and removing your own checkout or consumer package. No installed
+service, daemon, database or global package needs removal.
````

### docs/MCP.md

````diff
--- a/docs/MCP.md
+++ b/docs/MCP.md
@@ -0,0 +1,8 @@
+# MCP
+
+This repository ships and requires no MCP server, MCP tools or MCP authentication. Node CLIs
+and static pages are the complete runtime surface. No `.mcp.json`, editor MCP configuration,
+semantic-index server or embedding pipeline is needed. Do not start one to explore this repo.
+
+If an MCP integration is explicitly added later, document its actual command, tool inventory,
+authentication, tests and failure handling here. No placeholder server is configured today.
````

### docs/SECURITY.md

````diff
--- a/docs/SECURITY.md
+++ b/docs/SECURITY.md
@@ -0,0 +1,41 @@
+# Security
+
+## Boundaries and principals
+
+A viewer opens local generated HTML and vendored JavaScript. A maintainer runs local Node
+CLIs with filesystem permissions. No backend, user accounts, authentication tokens or datastore
+ships here. Templates are executable code and must be trusted. Source-tree records are data.
+
+## Threat model
+
+| STRIDE class | Boundary and mitigation |
+|---|---|
+| Spoofing | No application identities exist; verify the repository and dependency origin before use |
+| Tampering | Copy verification detects accidental bundle drift; review generated metadata and PR checks |
+| Repudiation | CLI events and Git history record local work; no persistent central audit service exists |
+| Information disclosure | Generator errors omit source text, paths and stacks; tests never read private hub input |
+| Denial of service | The converter rejects ancestry cycles and resolves ancestry iteratively with memoization |
+| Elevation / injection | Validate records; reject `<` in concept names; escape `<` and JS line separators when embedding JSON |
+
+Legacy generated pages interpolate node names into HTML tooltips. Treat existing snapshots as
+trusted artifacts; they are not a general untrusted-data renderer. The maintained converter rejects
+markup-bearing names before those sinks. It also refuses existing output paths and ambiguous or
+invalid DATA declarations. It does not sandbox a malicious template or make arbitrary generated
+pages safe. Missing parent records remain visible as fragments without invalid rendered links.
+
+MD5 in the copy verifier is an accidental-drift check, not a cryptographic authenticity guarantee.
+The vendored 3D bundle has no reproducible build manifest here; its full transitive dependency
+security status is unknown. D3 identifies v7.9.0 in its banner. No runtime npm dependencies exist. Acorn 8.19.0 is a pinned MIT development dependency
+used to parse trusted templates without evaluation. `npm audit` checks this dependency, not
+the opaque vendored browser libraries.
+
+## Secrets and incident response
+
+No environment variables or secrets are required. Never commit credentials, source data from
+private hubs, customer exports or diagnostic payloads. Review generated HTML and metadata before
+publishing. Stop sharing an affected artifact, preserve evidence locally, and use the reporting
+instructions in [.github/SECURITY.md](../.github/SECURITY.md). No response SLA or compliance
````

Documentation/metadata excerpt: 4 diff lines omitted.

### docs/TESTING.md

````diff
--- a/docs/TESTING.md
+++ b/docs/TESTING.md
@@ -0,0 +1,29 @@
+# Testing
+
+`npm test` runs Node's built-in runner over `test/*.test.js`. `test/package.json` gives
+these tests an explicit ESM scope, including on Node 18. Tests use private temporary
+directories and synthetic input. They never read live hub data or start services.
+
+| Suite | Command | Behavior covered |
+|---|---|---|
+| Bundle verifier | `node --test test/verify-copy.test.js` | Equal bytes, same-length corruption, missing file, usage, complete piped output |
+| Generator | `node --test test/inject-data.test.js` | Cycles, prototype keys, unsafe names, DATA string delimiters, branch colors, malformed records, deep ancestry, serialization and real CLI file/log outcomes |
+| Maintenance | `node --test test/maintenance.test.js` | Unicode/newline paths, ignored/deleted paths, deterministic indexes, log archival, private modes, concurrent appends and editor swap protection |
+
+`npm run lint` parses every non-ignored JSON file and runs `node --check` on every
+maintained JS/CJS/MJS file. Vendored minified libraries are excluded from syntax rewriting
+and review. `npm run docs:check` compares generated indexes and the llms family with deterministic
+source-derived output. Both commands and `npm test` run in CI on Node 18 and pinned Node 24.
+
+The target is meaningful coverage of important and changed/risky paths, including observable
+logs and filesystem effects. There is no enforced numeric line-coverage target or coverage
+percentage gate. Test count is not an empirical quality score. No held-out benchmark/eval set
+exists, so optimizer empirical mode cannot auto-improve this repository.
+
+Add a behavior-named test with real assertions and cleanup in `finally`. Keep input synthetic.
+Use subprocess argument arrays, finite child-process timeouts and unique temporary directories.
+Test files are independent and may run concurrently. Do not add sleeps to synchronize them.
+
+CI does not render WebGL, test browser accessibility, rebuild upstream generated demos, prove
+vendored dependency provenance, or audit minified third-party internals. For a requested renderer
+change, add a browser check and update the owning upstream source rather than editing output.
````

### docs/archive/README.md

````diff
--- a/docs/archive/README.md
+++ b/docs/archive/README.md
@@ -0,0 +1,15 @@
+# Workflow log archive
+
+`npm run logs:rotate` archives oversized workflow logs before retaining the latest numeric
+version in the root log. Close editors first; the command refuses editor swap files. No
+rotation was needed for the initial v0.1.1 entries.
+
+Each rotation creates a private directory. `snapshot.md` preserves the initial read. The tool
+renames the live file into that directory, checks it against the snapshot, and creates the
+retained root log exclusively. It never overwrites a new file created during that gap.
+In-flight appends remain on the retired inode. An atomic editor save before retirement is
+captured, detected and restored if the root path is still free. Files keep source permissions.
+
+If rotation fails, inspect the root log and its archive before retrying. The command preserves
+both snapshots and any competing root file. Installation has a short path-absence window;
+rotation is a maintenance operation, not a continuously available logging service.
````

### docs/caching-and-optimization.md

````diff
--- a/docs/caching-and-optimization.md
+++ b/docs/caching-and-optimization.md
@@ -0,0 +1,15 @@
+# Caching and optimization
+
+The browser and OS may cache static files under their normal HTTP rules. No service worker,
+application cache, persistent datastore or custom invalidation protocol exists. Reload after
+changing a disposable local artifact; retain the paired library and data versions together.
+
+The local converter uses Maps for concept lookup, branch assignment and colors. It resolves
+each ancestry once and uses an iterative chain to avoid recursive-stack exhaustion. The 10,000-node
+synthetic regression asserts behavior; it is not a held-out performance benchmark. The copy
+verifier hashes files synchronously, appropriate for a short local CLI. Tests use tiny disposable
+bundles for bulk-output checks rather than repeatedly hashing the full vendor asset.
+
+Large WebGL graphs and duplicated snapshots remain the main artifact/performance constraints.
+Use browser DevTools on disposable data when investigating an actual rendering issue. No numeric
+latency target or empirical optimizer champion exists, and no cache/embedding rebuild runs here.
````

### docs/code-deep-optimizer-2026-11-12.md

New audit report; self-referential diff omitted.

### docs/codebase-overview.md

````diff
--- a/docs/codebase-overview.md
+++ b/docs/codebase-overview.md
@@ -1,70 +1,95 @@
+<!-- Generated by scripts/check-doc-indexes.mjs --write; do not hand-edit. -->
 # Codebase overview

-_Snapshot: 2026-06-20. Human-readable file map. If the tree has drifted, this and
-`high_signal_file_index.json` are the files to update first._
+Every non-ignored file is listed. Generated, vendored, data and binary files are preserved; maintained tools and tests are reviewed separately.

-## Root — rendering libraries, repo meta, entry docs
-
-| File | Kind | Purpose |
+| Path | Role | Purpose |
 |---|---|---|
-| `concept-tree-3d.bundle.js` | vendored lib (~1.6 MB) | three.js + 3d-force-graph build; powers the 3D pages. Opaque. |
-| `d3.v7.min.js` | vendored lib (~280 KB) | D3 v7; powers the 2D page. Opaque. |
-| `README.md` | doc | Project entry point, quick start, demo index. |
-| `LICENSE` | legal | Project license. |
-| `tree-example-screen.png` | image | Screenshot: the 3D mind map + control panel (used in README). |
-| `node-details-screen.png` | image | Screenshot: focus mode with the node details panel (used in README). |
-| `CLAUDE.md` / `GEMINI.md` / `.github/copilot-instructions.md` | agent guidance | Rules for AI coding agents (don't hand-edit generated files, no invented build). |
-| `AGENTS.md` | catalog | Repo-local agents (none yet). |
-| `CONTRIBUTING.md` / `CODE_OF_CONDUCT.md` | docs | Contribution + conduct policy. |
-| `memory.md` / `prompts.md` | operator logs | Work log + request log. |
-| `.editorconfig` / `.gitignore` / `.gitattributes` | config | Editor + VCS hygiene; protects vendored/generated files. |
-
-### Root demo copies (also present under `examples/`)
-
-The demos are intentionally kept in **two** locations (see [known-issues.md](known-issues.md#7)).
-The root copies sit beside the libraries and use **bare** `src=` paths; the `examples/`
-copies use `../`.
-
-| File | Kind | Notes |
-|---|---|---|
-| `concept-tree-3d.html` | demo (generated) | 3D mind map; loads `concept-tree-3d.bundle.js` (sibling, bare path). |
-| `concept-tree.html` | demo (generated) | 2D viz; loads `d3.v7.min.js` (sibling, bare path). |
-| `skills-graph.html` · `skills-graph-full.html` | demo (generated) | Skills graph; loads the 3D bundle (sibling). |
-| `skills-graph.json` · `skills-graph-full.json` | data | Byte-identical to the `examples/` copies. |
-
````

Documentation/metadata excerpt: 124 diff lines omitted.

### docs/external-calls.md

````diff
--- a/docs/external-calls.md
+++ b/docs/external-calls.md
@@ -0,0 +1,20 @@
+# Executable I/O inventory
+
+This static-artifact repo has no live external API or datastore operations. Local file/Git/Node
+calls are listed below. The service-oriented five-standard operations contract is intentionally
+adapted: CLI triggers, visible/tested outcomes, remediation and filesystem assertions apply;
+central error daemons, dashboard cards and datastore read-back do not. Adding an app server or
+operations dashboard for these short local tools would invent a runtime that the repo does not use.
+
+| Source | Target / effect | Logging and tests | Remediation / retry |
+|---|---|---|---|
+| `inject-data.js:main` | Read explicit tree/template; create exclusive output | JSON start/outcome; `test/inject-data.test.js` reads back output | Fix input/template/path; never retry over existing output |
+| `scripts/verify-copy.mjs:main` | Read reference and supplied copies; MD5 drift check | Hash/status lines; `test/verify-copy.test.js` | Select correct pin/copy; no automatic retry |
+| `scripts/check-doc-indexes.mjs:repositoryFiles` | `git ls-files -z`; local read-only census | Exit status / error code; Unicode/newline fixture in maintenance tests | Run in a Git checkout |
+| `scripts/check-doc-indexes.mjs:buildOutputs` | Read package/docs; optional metadata writes | Deterministic drift report; repeated-output test | Run `npm run docs:update` and review diff |
+| `scripts/check-repo.mjs` | Parse JSON; `node --check` each maintained source | Counts and per-path failures; CI executes the command | Fix reported source; do not retry invalid JSON |
+| `scripts/rotate-workflow-logs.mjs:rotateLogs` | Snapshot logs; retire the live file into an archive; exclusively install retained content | JSON outcome; archive and swap-guard assertions | Close editor; inspect archive and current log before retry |
+| `test/*.test.js` | Spawn Node/Git with argument arrays; disposable filesystem fixtures | Assertions, exit codes and cleanup in `finally` | Fix failing behavior; never use live external data |
+
+No network retry/backoff, MCP trigger, dashboard, central error log or `DATASTORE_VERIFY_FAILED`
+code applies. `docs/tool-inventory.json` describes local tools rather than fictional MCP routes.
````

### docs/high_signal_file_index.json

````diff
--- a/docs/high_signal_file_index.json
+++ b/docs/high_signal_file_index.json
@@ -1,225 +1,994 @@
 {
-  "_comment": "Machine-readable per-file index for LLM retrieval. Snapshot 2026-06-20. Keep in sync with docs/codebase-overview.md when files are added/removed/moved. Generated artifacts carry a 'GENERATED by ...' banner and must not be hand-edited.",
+  "generator": "scripts/check-doc-indexes.mjs",
   "files": [
     {
+      "path": ".editorconfig",
+      "role": "config",
+      "purpose": "Vendored / generated — do not let editors reformat these",
+      "layer": "config",
+      "exports": [],
+      "depends_on": [],
+      "patterns": [],
+      "provenance": "[src: .editorconfig]"
+    },
+    {
+      "path": ".env.example",
+      "role": "config",
+      "purpose": "No environment variables or credentials are read by the maintained tools.",
+      "layer": "config",
+      "exports": [],
+      "depends_on": [],
+      "patterns": [],
+      "provenance": "[src: .env.example]"
+    },
+    {
+      "path": ".gitattributes",
+      "role": "config",
+      "purpose": "Normalize line endings for text files",
+      "layer": "config",
+      "exports": [],
+      "depends_on": [],
+      "patterns": [],
+      "provenance": "[src: .gitattributes]"
+    },
+    {
+      "path": ".github/CODEOWNERS",
+      "role": "config",
````

Documentation/metadata excerpt: 1159 diff lines omitted.

### docs/integrations-and-assumptions.md

````diff
--- a/docs/integrations-and-assumptions.md
+++ b/docs/integrations-and-assumptions.md
@@ -0,0 +1,18 @@
+# Integrations and assumptions
+
+## External boundaries
+
+Runtime pages load local files; no HTTP API, authentication service, MCP server or datastore
+is configured. Node tools read/write explicit local files and use Git for inventory. CI uses
+GitHub Actions checkout/setup-node and Node; npm installs no third-party packages. Actions are
+pinned to verified commit SHAs. There is no deploy workflow.
+
+The optional local static server binds `127.0.0.1:8000`. Templates retain their own script paths
+and fixed UI subtitles. An output generated outside the repository needs its library at that
+relative path. Templates must contain exactly one JSON-object `const DATA = ...;` declaration.
+
+The maintained converter has no private default input or environment-variable dependency.
+Original demo generators and the 3D bundle build source live outside this checkout and are not
+invoked by validation. The exact canonical upstream checkout is not established here; do not
+invent one. Metadata generation is lexical and deterministic, without embeddings or indexes
+outside this repository. See [external-calls.md](external-calls.md) for executable boundaries.
````

### docs/known-issues.md

````diff
--- a/docs/known-issues.md
+++ b/docs/known-issues.md
@@ -1,7 +1,6 @@
 # Known issues

-_Snapshot: 2026-06-20. Inferred from the actual files and the repo's history during the
-bootstrap pass._
+_Demo history recorded 2026-06-20; maintained tooling re-audited 2026-11-12._

 ## 1. `examples/*.html` library paths — **RESOLVED 2026-06-20** (durable fix still pending)

@@ -30,7 +29,10 @@
 - `scripts/build-concept-tree-mindmap.py` → `tree-mindmap.md`
 - canonical input referenced as `concept-tree/tree.json` (upstream path)

-Consequence: **you cannot regenerate the artifacts from this repo.** Hand-edits to generated
+`inject-data.js` now provides a local DATA-replacement converter with explicit paths. It does
+not reproduce the original generators, rebuild the bundle, or update fixed subtitles.
+
+Consequence: **you cannot fully regenerate the original artifacts from this repo.** Hand-edits to generated
 files will not survive a regeneration done elsewhere.

 **Fix options:** vendor the generator scripts + the canonical `tree.json` into this repo
@@ -71,7 +73,8 @@
   `README.md` was written by the bootstrap as the repo entry point.

 If any of these removals were unintentional, restore from git history
-(`git checkout HEAD -- README.md` for the old root README) or regenerate.
+by selecting the intended historical commit, or regenerate from the owning upstream source.
+Do not reset shared checkouts as a repair step.

 ## 7. Demos duplicated at root and under `examples/` — **intentional (documented)**

@@ -90,3 +93,20 @@

 `concept-tree-3d.bundle.js` (~1.6 MB) and the demo JSON/HTML are sizable. If history growth
 becomes a problem, consider Git LFS (a commented-out filter is in `.gitattributes`).
+
+
+## 8. Legacy tooltip sinks and incomplete vendor provenance
````

Documentation/metadata excerpt: 14 diff lines omitted.

### docs/llm-repo-index.json

````diff
--- a/docs/llm-repo-index.json
+++ b/docs/llm-repo-index.json
@@ -0,0 +1,357 @@
+{
+  "generator": "scripts/check-doc-indexes.mjs",
+  "files": [
+    {
+      "path": ".editorconfig",
+      "role": "config"
+    },
+    {
+      "path": ".env.example",
+      "role": "config"
+    },
+    {
+      "path": ".gitattributes",
+      "role": "config"
+    },
+    {
+      "path": ".github/CODEOWNERS",
+      "role": "config"
+    },
+    {
+      "path": ".github/FUNDING.yml",
+      "role": "config"
+    },
+    {
+      "path": ".github/ISSUE_TEMPLATE/bug_report.md",
+      "role": "documentation"
+    },
+    {
+      "path": ".github/ISSUE_TEMPLATE/feature_request.md",
+      "role": "documentation"
+    },
+    {
+      "path": ".github/PULL_REQUEST_TEMPLATE.md",
+      "role": "documentation"
+    },
+    {
+      "path": ".github/SECURITY.md",
````

Documentation/metadata excerpt: 320 diff lines omitted.

### docs/logging.md

````diff
--- a/docs/logging.md
+++ b/docs/logging.md
@@ -0,0 +1,16 @@
+# Logging
+
+`inject-data.js` emits JSON lines to stdout for `generation_started` and `generation_completed`
+(with node/link counts). It emits `generation_failed` to stderr with a stage code and a bounded
+cause code. Usage errors print a synopsis and exit 2. Other failures exit 1; success exits 0.
+No source records, JSON parser excerpts, private paths or stack traces enter generator logs.
+
+The copy verifier preserves its human-readable hash/status output (`OK`, `DIFFERS`, `MISSING`)
+and reference-read error. It sets `process.exitCode` so piped output can drain. Tests assert
+result lines and failure/success events. The maintenance CLIs report success or actionable
+failures on stdout/stderr; log rotation uses JSON events. No remote logger, central error file,
+long-running worker or telemetry backend is configured.
+
+Do not log credentials, customer data, raw source JSON, template contents or secrets. Log a
+stable stage/error code and a count or status instead. Use [the validation runbook](runbooks/validation.md)
+for failed checks. There is no automated retry of invalid input or existing output files.
````

### docs/maintenance-coverage-2026-11-12.md

````diff
--- a/docs/maintenance-coverage-2026-11-12.md
+++ b/docs/maintenance-coverage-2026-11-12.md
@@ -0,0 +1,44 @@
+# Maintenance coverage — 2026-11-12
+
+Baseline `538c056` has 54 tracked files. The census used NUL-delimited Git enumeration, not
+an arbitrary 50-file selection. Every maintained source, test, CI/config and documentation file
+was included. Final inventory and file roles are mechanically listed in
+[codebase-overview.md](codebase-overview.md) and `high_signal_file_index.json`.
+
+## Baseline accounting
+
+| Set | Files | Review |
+|---|---:|---|
+| Maintained executable / package / CI | 5 | Separate fresh-context read-only per-file reviewers for inject-data.js, verify-copy.mjs, its test, package.json and ci.yml; repo-level architecture/dependency/tooling passes |
+| Maintained docs and other config/legal | 24 | Full direct reads, manifest drift audit, privacy/link checks; legal content preserved |
+| Generated HTML | 9 | Root and examples demos plus global-ai-hub-3d.html; generator banner and all local script paths verified; no hand edits or full generated-code security claim |
+| Generated Markdown | 3 | examples/concept-tree.md, tree.md, tree-mindmap.md; preserved upstream output |
+| Generated retrieval text | 4 | Existing llms family; regenerated with source-derived metadata through its new owning writer |
+| Visualization data snapshots | 5 | JSON parse and duplicate-copy checks; no data/schema research or rewrite |
+| Vendored minified libraries | 2 | Classified opaque; hashes preserved; no minified-source rewrite or exhaustive dependency-security claim |
+| Screenshots | 2 | Binary exclusions; hashes preserved |
+| **Total** | **54** | **29 maintained + 25 generated/data/vendor/binary** |
+
+The old index had 3 dead paths: GEMINI.md, memory.md and prompts.md. Restoring these files and
+regenerating the inventory removes that drift. Added tooling and tests receive the same per-file
+review rather than being omitted because they are new. No tests, tools, CI or UI boundary was
+silently dropped. The original generated UI is excluded from modification; template serialization
+and data boundaries are tested with synthetic fixtures and the actual root template.
+
+## Final source review
+
+All 9 maintained JavaScript files, ci.yml, package.json and test/package.json receive separate
+bounded fresh-context reviews. The driver also checks M3 architecture, cross-file M2 duplication,
+T2 supply chain, T3 tooling and T4 test isolation. Each file review lists C1–C3, S1–S5, P1–P2,
+M1/M2/M4, T1/T4 with explicit N/A reasons. T4 applies to test files; it is N/A on non-test sources.
+No failed/empty bundle may be treated as CLEAN. A separate final blind review receives only final
+code and the pass list; its outcome is recorded in the optimizer report.
+
+## Exclusions and limits
````

Documentation/metadata excerpt: 7 diff lines omitted.

### docs/onboarding.md

````diff
--- a/docs/onboarding.md
+++ b/docs/onboarding.md
@@ -0,0 +1,11 @@
+# Onboarding
+
+Read [the README](../README.md), [CLAUDE.md](../CLAUDE.md), and [DEVELOPMENT.md](DEVELOPMENT.md).
+Use the pinned Node runtime, run `npm ci --ignore-scripts`, then `npm test`, `npm run lint` and
+`npm run docs:check`. Open a static demo through a loopback server if you need to inspect UI.
+
+Distinguish maintained tooling (`inject-data.js`, `lib/`, `scripts/`, `test/`) from generated
+snapshots and vendored bundles. Change the owning generator for original demo changes. Use only
+synthetic fixtures; never regenerate a private hub snapshot as an incidental check. Start a task
+branch and deliver reviewed, passing changes through a PR. The full [file map](codebase-overview.md)
+and [documentation index](wiki/index.md) show the maintained surfaces and known limitations.
````

### docs/repo-bootstrap-audit-2026-11-12.md

````diff
--- a/docs/repo-bootstrap-audit-2026-11-12.md
+++ b/docs/repo-bootstrap-audit-2026-11-12.md
@@ -0,0 +1,75 @@
+# Repository bootstrap audit — 2026-11-12
+
+Scope: only `mithudso/json-3d-renderer`; baseline `538c056`. Full default bootstrap and
+optimizer workflows, without quick/changed-only mode or a 50-file cutoff. The source census
+and exclusions are in [the coverage ledger](maintenance-coverage-2026-11-12.md). No earlier
+`repo-bootstrap-audit-*.md` ledger existed. Existing known issues and ADRs were read first.
+
+## Source and command baseline
+
+The clean original checkout was on `main`; GitHub reported `mithudso/json-3d-renderer`, remote
+`main`, and ADMIN access. Work used an isolated fetched-default branch. No other checkout,
+installation, daemon, customer database or semantic index was changed. Pre-change originals
+were copied to `~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/`.
+
+Detected commands before verification: `npm test` (`node --test test/*.test.js`),
+`node --check inject-data.js`, `node --check scripts/verify-copy.mjs`,
+`node --check test/verify-copy.test.js`, and CI's tracked JSON parse loop. No build, lint or
+static type-check command existed. Baseline: 1 test passed on Node 26.7.0; 7 JSON files parsed;
+syntax checks passed. The test emitted an implicit ESM-scope warning. `npm audit --json` failed
+with `ENOLOCK`; `npm outdated --json` returned `{}`. No held-out eval/benchmark exists, so
+empirical mode is N/A; cannot auto-improve. No champion or embeddings were created.
+
+## Manifest audit and disposition
+
+| Standard | Baseline evidence | Result / applicability |
+|---|---|---|
+| Workflow guidance and logs | CLAUDE/Copilot denied the existing package/tests; GEMINI/memory/prompts were missing | Corrected guidance; restored versioned logs; package patch 0.1.1 |
+| Agent catalog | No local agent definitions | Existing AGENTS catalog retained; no invented agents |
+| Workflow log size | Restored logs are far below 200 KiB | Archive directory and guarded, tested rotation tool added |
+| Editor and VCS metadata | Existing editorconfig/gitattributes/gitignore | Retained formatting/binary rules; ignored package archives and rotation temporaries |
+| Node pin / lock | `engines >=18`, no runtime pin or lockfile | Node 24.22.3 maintainer pin and lockfile with exact Acorn 8.19.0 development dependency; preserve Node >=18 compatibility |
+| Environment and editor | No env reads or editor runtime config | Comment-only `.env.example`; local editor settings/extensions and verifier debug config |
+| MCP config | No MCP dependency or runtime | N/A; documented in MCP.md; no fictional `.mcp.json` or editor MCP server |
+| CI | Only JSON parsing; quoted Git paths could fail | Node 18/24 matrix runs tests, syntax/JSON validation, metadata drift; read-only permissions and SHA-pinned actions |
+| Dependabot | Claimed no package manifest | Actions and npm ecosystems documented; vendor updates remain manual |
+| CODEOWNERS | Placeholder `@owner` | Verified `@mithudso` assignments |
+| PR/issue/security policies | Existing templates and security reporting | Added current validation, risk/rollback, threat-model link; preserve issue forms and legal files |
````

Documentation/metadata excerpt: 38 diff lines omitted.

### docs/requirements.md

````diff
--- a/docs/requirements.md
+++ b/docs/requirements.md
@@ -0,0 +1,21 @@
+# Requirements
+
+## Functional
+
+1. Display graph data through local 3D and 2D demo pages, with the controls each snapshot includes.
+2. Preserve original generated demos, source-data snapshots and vendored renderer bytes.
+3. Verify consumer copies and return documented exit codes for matches, mismatches and usage errors.
+4. Convert explicit concept-tree JSON to a new HTML page using a trusted template.
+5. Reject malformed records, duplicate ids, cycles and unsafe concept names before output creation.
+6. Maintain complete, path-valid retrieval metadata and workflow logs.
+
+## Non-functional
+
+Use Node built-ins for tooling, with pinned Acorn for reliable JavaScript declaration parsing. Keep CLI diagnostics useful without source-data disclosure.
+Resolve ancestry iteratively; do not impose an invented rendering-latency or memory SLA. Require a
+modern WebGL-capable browser for 3D views; no numeric GPU or hardware minimum has been measured.
+
+The package advertises Node >=18 compatibility, tests Node 18 and 24 in CI, and pins maintainer
+Node 24.22.3 in `.nvmrc`. Git is required by inventory tooling. Python 3 is optional for serving.
+No npm runtime dependencies exist. The checkout generator uses Acorn 8.19.0 (MIT) as a pinned development dependency. Vendored D3 v7.9.0 and the opaque 3D bundle are
+tracked assets; their upstream build inputs are absent. See [known-issues.md](known-issues.md).
````

### docs/runbooks/validation.md

````diff
--- a/docs/runbooks/validation.md
+++ b/docs/runbooks/validation.md
@@ -0,0 +1,24 @@
+# Validate and recover a maintenance change
+
+## Preconditions
+
+Use your task-owned checkout and pinned Node runtime. Preserve other worktrees, branches,
+installed applications and services. Do not run the generator against live private input.
+
+## Procedure
+
+1. Run `npm ci --ignore-scripts`, `npm test`, `npm run lint` and `npm run docs:check`.
+2. For metadata drift, run `npm run docs:update` and review every changed path.
+3. For a bundle mismatch, compare the selected pin and consumer file; do not silently replace it.
+4. For a generator error, correct synthetic/input schema or choose a new output filename.
+5. For oversized workflow logs, close the editor and run `npm run logs:rotate`; review the archive.
+6. Commit only task files, push, open a PR, wait for final checks, merge, and verify remote `main`.
+
+## Verification and rollback
+
+All checks must pass. Confirm generated demo/data/vendor hashes have not changed unless that
+change was explicitly requested. A merged PR is the delivery receipt. Revert a bad merged
+maintenance commit through a new reviewed PR. Local pre-change snapshots and literal restoration
+commands are recorded in the dated optimizer report. Do not reset or force-push shared branches.
+If credentials or required checks block delivery, retain a pushed draft checkpoint and record
+the exact blocker. If the original generator source is missing, record the gap; do not edit output.
````

### docs/tool-inventory.json

````diff
--- a/docs/tool-inventory.json
+++ b/docs/tool-inventory.json
@@ -0,0 +1,31 @@
+{
+  "kind": "local-cli",
+  "totalTools": 5,
+  "tools": [
+    {
+      "name": "inject-data",
+      "path": "inject-data.js",
+      "description": "Create a new local page from explicit tree/template input"
+    },
+    {
+      "name": "verify-copy",
+      "path": "scripts/verify-copy.mjs",
+      "description": "Detect accidental bundle drift"
+    },
+    {
+      "name": "check-repo",
+      "path": "scripts/check-repo.mjs",
+      "description": "Validate JSON and maintained JS syntax"
+    },
+    {
+      "name": "check-doc-indexes",
+      "path": "scripts/check-doc-indexes.mjs",
+      "description": "Check or regenerate deterministic metadata"
+    },
+    {
+      "name": "rotate-workflow-logs",
+      "path": "scripts/rotate-workflow-logs.mjs",
+      "description": "Archive oversized workflow logs safely"
+    }
+  ]
+}
````

### docs/wiki/index.md

````diff
--- a/docs/wiki/index.md
+++ b/docs/wiki/index.md
@@ -0,0 +1,22 @@
+# Documentation index
+
+- [Overview and demos](../../README.md)
+- [Architecture and decisions](../ARCHITECTURE.md)
+- [Development and commands](../DEVELOPMENT.md)
+- [Components, data schema and library usage](../COMPONENTS.md)
+- [Installation](../INSTALLATION.md)
+- [Testing and CI gates](../TESTING.md)
+- [Security](../SECURITY.md)
+- [MCP applicability](../MCP.md)
+- [Requirements](../requirements.md)
+- [Onboarding](../onboarding.md)
+- [Logging](../logging.md)
+- [Caching and optimization](../caching-and-optimization.md)
+- [External I/O](../external-calls.md)
+- [Integrations and assumptions](../integrations-and-assumptions.md)
+- [Validation and rollback runbook](../runbooks/validation.md)
+- [Known issues](../known-issues.md)
+- [Complete file map](../codebase-overview.md)
+- [Bootstrap audit, 2026-11-12](../repo-bootstrap-audit-2026-11-12.md)
+- [Optimizer report, 2026-11-12](../code-deep-optimizer-2026-11-12.md)
+- [Coverage ledger, 2026-11-12](../maintenance-coverage-2026-11-12.md)
````

### inject-data.js

````diff
--- a/inject-data.js
+++ b/inject-data.js
@@ -1,81 +1,39 @@
-const fs = require('fs');
-const path = require('path');
+const fs = require('node:fs');
+const path = require('node:path');
+const { buildGraph, renderHtml } = require('./lib/concept-graph.cjs');

-async function main() {
+/** Generate a new page from explicit local input. Never overwrite an existing file. */
+function main(args = process.argv.slice(2)) {
+  if (args.length < 2 || args.length > 3 || args.some((arg) => arg.startsWith('--'))) {
+    console.error('Usage: node inject-data.js <tree.json> <new-output.html> [template.html]');
+    return 2;
+  }
+  const [input, output, template = path.join(__dirname, 'concept-tree-3d.html')] = args.map((arg) => path.resolve(arg));
+  if (output === input || output === template) {
+    console.error(JSON.stringify({ event: 'generation_failed', code: 'OUTPUT_CONFLICT' }));
+    return 1;
+  }
+  let stage = 'INPUT_READ';
+  console.log(JSON.stringify({ event: 'generation_started' }));
   try {
-    const treeDataPath = '[REDACTED: private input path]';
-    const treeDataRaw = fs.readFileSync(treeDataPath, 'utf8');
-    const treeData = JSON.parse(treeDataRaw);
-
-    const nodes = [];
-    const links = [];
-
-    const colors = [
-      "#ffffff", "hsl(0, 62%, 60%)", "hsl(138, 62%, 60%)", "hsl(275, 62%, 60%)", "hsl(53, 62%, 60%)",
-      "hsl(190, 62%, 60%)", "hsl(328, 62%, 60%)", "hsl(105, 62%, 60%)", "hsl(243, 62%, 60%)", "hsl(20, 62%, 60%)"
-    ];
-    let colorIdx = 0;
-    const groupColorMap = {};
-
-    // Precompute map for O(1) lookups
-    const conceptMap = new Map();
-    for (const item of treeData) {
-      conceptMap.set(item.concept, item);
-    }
-
-    for (const item of treeData) {
-      const isRoot = item.parentConcept === null;
-      const isGroup = item.childConcepts && item.childConcepts.length > 0;
-
-      let group = item.concept;
-      if (!isRoot && item.parentConcept) {
-        let p = conceptMap.get(item.parentConcept);
-        while (p && p.parentConcept) {
-          group = p.parentConcept;
-          p = conceptMap.get(p.parentConcept);
-        }
-      }
-
-      if (!groupColorMap[group]) {
-        groupColorMap[group] = colors[colorIdx % colors.length];
-        colorIdx++;
-      }
-
-      nodes.push({
-        id: item.concept,
-        name: item.concept,
-        isRoot,
-        isGroup,
-        group: group,
-        color: groupColorMap[group],
-        val: isRoot ? 40 : (isGroup ? 16 : 8),
-        desc: `Researched on ${item.researchedAt}`,
-        leafCount: item.childConcepts ? item.childConcepts.length : 0
-      });
-
-      if (item.parentConcept) {
-        links.push({
-          source: item.parentConcept,
-          target: item.concept
-        });
-      }
-    }
-
-    const DATA = { nodes, links };
-
-    const templatePath = path.join(__dirname, 'concept-tree-3d.html');
-    const html = fs.readFileSync(templatePath, 'utf8');
-
-    // Replace DATA using a function to avoid regex '$' replacement bugs, and handle multi-line objects
-    const newHtml = html.replace(/const DATA\s*=\s*\{[\s\S]*?\};/, () => `const DATA = ${JSON.stringify(DATA)};`);
-
-    const outputPath = path.join(__dirname, 'global-ai-hub-3d.html');
-    fs.writeFileSync(outputPath, newHtml);
-    console.log('Successfully generated global-ai-hub-3d.html');
+    const tree = JSON.parse(fs.readFileSync(input, 'utf8'));
+    stage = 'GRAPH_VALIDATION';
+    const graph = buildGraph(tree);
+    stage = 'TEMPLATE_READ';
+    const html = fs.readFileSync(template, 'utf8');
+    stage = 'TEMPLATE_VALIDATION';
+    const rendered = renderHtml(html, graph);
+    stage = 'OUTPUT_WRITE';
+    fs.writeFileSync(output, rendered, { flag: 'wx' });
+    console.log(JSON.stringify({ event: 'generation_completed', nodes: graph.nodes.length, links: graph.links.length }));
+    return 0;
   } catch (error) {
-    console.error('Error injecting data:', error);
-    process.exit(1);
+    // Do not log source data, JSON parser excerpts, local paths or stack traces.
+    console.error(JSON.stringify({ event: 'generation_failed', code: `${stage}_FAILED`,
+      cause: /^[A-Z_]+$/.test(error.code || '') ? error.code : 'INVALID_DATA' }));
+    return 1;
   }
 }

-main();
+module.exports = { main };
+if (require.main === module) process.exitCode = main();
````

### lib/concept-graph.cjs

````diff
--- a/lib/concept-graph.cjs
+++ b/lib/concept-graph.cjs
@@ -0,0 +1,89 @@
+const { parse } = require('acorn');
+
+const COLORS = Object.freeze([
+  '#ffffff', 'hsl(0, 62%, 60%)', 'hsl(138, 62%, 60%)', 'hsl(275, 62%, 60%)',
+  'hsl(53, 62%, 60%)', 'hsl(190, 62%, 60%)', 'hsl(328, 62%, 60%)',
+  'hsl(105, 62%, 60%)', 'hsl(243, 62%, 60%)', 'hsl(20, 62%, 60%)',
+]);
+
+/** Validate a concept array and build a graph without mutating the input.
+ * Missing parents are allowed as disconnected fragments. Cycles and duplicate ids fail.
+ * Legacy templates interpolate names into HTML tooltips, so names containing < fail closed.
+ */
+function buildGraph(tree) {
+  if (!Array.isArray(tree)) throw new TypeError('Expected a concept array');
+  const concepts = new Map();
+  for (const item of tree) {
+    if (!item || typeof item.concept !== 'string' || !item.concept.trim() || item.concept.includes('<') ||
+        !(item.parentConcept == null || typeof item.parentConcept === 'string') ||
+        !(item.childConcepts == null || (Array.isArray(item.childConcepts) && item.childConcepts.every((child) => typeof child === 'string'))) ||
+        !(item.researchedAt == null || typeof item.researchedAt === 'string') || concepts.has(item.concept)) {
+      throw new TypeError('Invalid or duplicate concept');
+    }
+    concepts.set(item.concept, item);
+  }
+  // Resolve each ancestry once. A branch starts below a root or at a dangling fragment.
+  const groups = new Map();
+  for (const item of tree) {
+    const chain = [];
+    const visiting = new Set();
+    let current = item;
+    while (current && !groups.has(current.concept)) {
+      if (visiting.has(current.concept)) throw new TypeError('Cyclic parents');
+      visiting.add(current.concept);
+      chain.push(current);
+      current = concepts.get(current.parentConcept);
+    }
+    for (const entry of chain.reverse()) {
+      const parent = concepts.get(entry.parentConcept);
+      const group = parent && parent.parentConcept != null ? groups.get(parent.concept) : entry.concept;
+      groups.set(entry.concept, group);
+    }
+  }
+  const colors = new Map();
+  const nodes = tree.map((item) => {
+    const group = groups.get(item.concept);
+    if (!colors.has(group)) colors.set(group, COLORS[colors.size % COLORS.length]);
+    const isRoot = item.parentConcept == null;
+    const isGroup = Boolean(item.childConcepts?.length);
+    return { id: item.concept, name: item.concept, isRoot, isGroup, group, color: colors.get(group),
+      val: isRoot ? 40 : isGroup ? 16 : 8,
+      desc: item.researchedAt ? `Researched on ${item.researchedAt}` : '',
+      leafCount: item.childConcepts?.length || 0 };
+  });
+  // A missing parent has no rendered endpoint; retain the node as a fragment.
+  const links = tree.filter((item) => concepts.has(item.parentConcept))
+    .map((item) => ({ source: item.parentConcept, target: item.concept }));
+  return { nodes, links };
+}
+
+/** Replace exactly one top-level const DATA JSON object in a trusted classic script.
+ * Acorn supplies expression boundaries without executing any template code.
+ */
+function renderHtml(html, graph) {
+  const scripts = [...html.matchAll(/(<script\b(?:[^>"']|"[^"]*"|'[^']*')*>)([\s\S]*?)<\/script\s*>/gi)];
+  const blocks = scripts.length ? scripts.map((match) => ({
+    code: match[2], offset: match.index + match[1].length,
+  })) : [{ code: html, offset: 0 }];
+  const declarations = [];
+  for (const { code, offset } of blocks) {
+    const program = parse(code, { ecmaVersion: 'latest', sourceType: 'script' });
+    for (const statement of program.body) {
+      if (statement.type !== 'VariableDeclaration' || statement.kind !== 'const') continue;
+      for (const declaration of statement.declarations) {
+        if (declaration.id.type === 'Identifier' && declaration.id.name === 'DATA') {
+          declarations.push({ expression: declaration.init, code, offset });
+        }
+      }
+    }
+  }
+  if (declarations.length !== 1) throw new TypeError('Expected one DATA declaration');
+  const { expression, code, offset } = declarations[0];
+  if (expression?.type !== 'ObjectExpression') throw new TypeError('Expected a DATA object');
+  JSON.parse(code.slice(expression.start, expression.end));
+  const json = JSON.stringify(graph).replace(/[<\u2028\u2029]/g, (char) =>
+    `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`);
+  return html.slice(0, offset + expression.start) + json + html.slice(offset + expression.end);
+}
+
+module.exports = { buildGraph, renderHtml };
````

### llms-facts.txt

````diff
--- a/llms-facts.txt
+++ b/llms-facts.txt
@@ -1,20 +1,12 @@
-<!-- Generated 2026-09-25 [gen: p/1.1.0]; verified-as-of 2026-09-25 -->
-
-# json-3d-renderer: Sourced Project Facts
-
-One declarative fact per line, each with a `[src:]` tag.
-
-## 2026-09-25 [gen: p/1.1.0]
-
-- The repo ships rendering libraries plus generated demo visualizations under examples/ [src: README.md]
-- The build scripts that generate the demos live in a separate upstream repo and are not checked in [src: README.md]
-- The 3D demo (concept-tree-3d.html) renders with concept-tree-3d.bundle.js, which bundles three.js and 3d-force-graph [src: README.md]
-- The 2D demo (concept-tree.html) renders with d3.v7.min.js [src: README.md]
-- The 3D mind map shows 465 backbone nodes across 86 domains [src: README.md]
-- The 3D control panel offers Radial, Top-down and Free layouts, label toggles and clickable domain chips [src: README.md]
-- Clicking a node enters focus mode, isolating linked neighbors and opening a details panel [src: README.md]
-- Each HTML demo inlines its own data as a const DATA literal, so it is self-contained except for the rendering library [src: README.md]
-- Demos should be opened through a local web server (python3 -m http.server 8000 from the repo root) rather than file:// [src: README.md]
-- Demo pages under examples/ load the library via ../ relative paths; this hand-edit must also land in the upstream generator [src: docs/known-issues.md]
-- The generators named in the file banners (scripts/build-concept-tree-3d.py, scripts/build-concept-tree-viz.mjs, scripts/build-concept-tree-mindmap.py) do not exist in this repo [src: docs/known-issues.md]
-- Sample inputs are examples/tree.json (concept-tree shape) and examples/skills-graph.json (graph shape) [src: README.md]
+<!-- Generated by scripts/check-doc-indexes.mjs --write; do not hand-edit. -->
+Version 0.1.1; Node >=18. [src: package.json]
+The browser demos use local vendored libraries and inline data. [src: docs/ARCHITECTURE.md]
+Original demo generators are absent; do not hand-edit their output. [src: docs/known-issues.md]
+The local generator requires explicit input and a new output path. [src: inject-data.js]
+No MCP server, datastore or semantic index is configured. [src: docs/MCP.md]
+npm run verify-copy: node scripts/verify-copy.mjs. [src: package.json#scripts]
+npm run test: node --test test/*.test.js. [src: package.json#scripts]
+npm run lint: node scripts/check-repo.mjs. [src: package.json#scripts]
+npm run docs:check: node scripts/check-doc-indexes.mjs. [src: package.json#scripts]
+npm run docs:update: node scripts/check-doc-indexes.mjs --write. [src: package.json#scripts]
+npm run logs:rotate: node scripts/rotate-workflow-logs.mjs. [src: package.json#scripts]
````

### llms-full.txt

````diff
--- a/llms-full.txt
+++ b/llms-full.txt
@@ -1,650 +1,114 @@
-<!-- Generated 2026-09-25 [gen: p/1.1.0]; verified-as-of 2026-09-25 -->
+<!-- Generated by scripts/check-doc-indexes.mjs --write; do not hand-edit. -->
+# json-3d-renderer

-# json-3d-renderer
-Source: https://github.com/mithudso/json-3d-renderer/blob/HEAD/README.md
+Version 0.1.1; Node >=18. [src: package.json]
+The browser demos use local vendored libraries and inline data. [src: docs/ARCHITECTURE.md]
+Original demo generators are absent; do not hand-edit their output. [src: docs/known-issues.md]
+The local generator requires explicit input and a new output path. [src: inject-data.js]
+No MCP server, datastore or semantic index is configured. [src: docs/MCP.md]
+npm run verify-copy: node scripts/verify-copy.mjs. [src: package.json#scripts]
+npm run test: node --test test/*.test.js. [src: package.json#scripts]
+npm run lint: node scripts/check-repo.mjs. [src: package.json#scripts]
+npm run docs:check: node scripts/check-doc-indexes.mjs. [src: package.json#scripts]
+npm run docs:update: node scripts/check-doc-indexes.mjs --write. [src: package.json#scripts]
+npm run logs:rotate: node scripts/rotate-workflow-logs.mjs. [src: package.json#scripts]

-## json-3d-renderer
+## File inventory

-Converts mind-map-style JSON into an interactive **3D mind-map visualization** with focus
-mode and per-node descriptions — plus 2D (D3) and Markdown/Mermaid renderings of the same
-data.
+.editorconfig: Vendored / generated — do not let editors reformat these. [src: .editorconfig]
+.env.example: No environment variables or credentials are read by the maintained tools.. [src: .env.example]
+.gitattributes: Normalize line endings for text files. [src: .gitattributes]
+.github/CODEOWNERS: Verified repository owner. [src: .github/CODEOWNERS]
+.github/FUNDING.yml: These are supported funding model platforms. [src: .github/FUNDING.yml]
+.github/ISSUE_TEMPLATE/bug_report.md: documentation: .github/ISSUE_TEMPLATE/bug_report.md. [asserted]
+.github/ISSUE_TEMPLATE/feature_request.md: documentation: .github/ISSUE_TEMPLATE/feature_request.md. [asserted]
+.github/PULL_REQUEST_TEMPLATE.md: documentation: .github/PULL_REQUEST_TEMPLATE.md. [asserted]
+.github/SECURITY.md: Security Policy. [src: .github/SECURITY.md]
+.github/copilot-instructions.md: documentation: .github/copilot-instructions.md. [asserted]
+.github/dependabot.yml: No npm dependencies today. Vendored bundles require a verified upstream update.. [src: .github/dependabot.yml]
+.github/workflows/ci.yml: config: .github/workflows/ci.yml. [asserted]
+.gitignore: OS / editor cruft. [src: .gitignore]
````

Documentation/metadata excerpt: 722 diff lines omitted.

### llms-small.txt

````diff
--- a/llms-small.txt
+++ b/llms-small.txt
@@ -1,47 +1,14 @@
-<!-- Generated 2026-09-25 [gen: p/1.1.0]; verified-as-of 2026-09-25 -->
+<!-- Generated by scripts/check-doc-indexes.mjs --write; do not hand-edit. -->
+# json-3d-renderer

-# json-3d-renderer
-Source: https://github.com/mithudso/json-3d-renderer/blob/HEAD/README.md
-
-Converts mind-map-style JSON into an interactive **3D mind-map visualization** with focus mode and per-node descriptions — plus 2D (D3) and Markdown/Mermaid renderings of the same data.
-
-# Semantic Indexing Rule
-Source: https://github.com/mithudso/json-3d-renderer/blob/HEAD/CLAUDE.md
-
-Guidance for Claude Code (and other AI coding agents) working in this repository.
-
-# AGENTS.md — json-3d-renderer
-Source: https://github.com/mithudso/json-3d-renderer/blob/HEAD/AGENTS.md
-
-Catalog of repository-local agents (custom subagents, automations) defined for this repo.
-
-# Architecture
-Source: https://github.com/mithudso/json-3d-renderer/blob/HEAD/docs/ARCHITECTURE.md
-
-_Snapshot: 2026-06-20.
-
-# Components & data schemas
-Source: https://github.com/mithudso/json-3d-renderer/blob/HEAD/docs/COMPONENTS.md
-
-_Snapshot: 2026-06-20.
-
-# Development
-Source: https://github.com/mithudso/json-3d-renderer/blob/HEAD/docs/DEVELOPMENT.md
-
-_Snapshot: 2026-06-20._
-
-# Codebase overview
-Source: https://github.com/mithudso/json-3d-renderer/blob/HEAD/docs/codebase-overview.md
-
````

Documentation/metadata excerpt: 23 diff lines omitted.

### llms.txt

````diff
--- a/llms.txt
+++ b/llms.txt
@@ -1,34 +1,10 @@
-<!-- Generated 2026-09-25 [gen: p/1.1.0]; verified-as-of 2026-09-25 -->
-
+<!-- Generated by scripts/check-doc-indexes.mjs --write; do not hand-edit. -->
 # json-3d-renderer

-> Converts mind-map-style JSON into an interactive 3D mind-map visualization with focus mode, plus 2D D3 and Markdown/Mermaid renderings.
+Offline graph demos and local validation tools. [src: README.md]

-
-## Docs
-
-- [README.md](README.md): Converts mind-map-style JSON into an interactive **3D mind-map visualization** with focus mode and per-node descriptions — plus 2D (D3) and Markdown/Mermaid renderings of the same data.
-- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): _Snapshot: 2026-06-20.
-- [docs/COMPONENTS.md](docs/COMPONENTS.md): _Snapshot: 2026-06-20.
-- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md): _Snapshot: 2026-06-20._
-- [docs/codebase-overview.md](docs/codebase-overview.md): _Snapshot: 2026-06-20.
-- [docs/known-issues.md](docs/known-issues.md): _Snapshot: 2026-06-20.
-
-
-## Agent guidance
-
-- [CLAUDE.md](CLAUDE.md): Guidance for Claude Code (and other AI coding agents) working in this repository.
-- [AGENTS.md](AGENTS.md): Catalog of repository-local agents (custom subagents, automations) defined for this repo.
-
-
-## Examples
-
-- [examples/README.md](examples/README.md): Project document
-- [examples/tree.json](examples/tree.json): Sample concept-tree input data
-- [examples/skills-graph.json](examples/skills-graph.json): Sample graph-shape input data
-
-## Optional
-
-- [llms-full.txt](llms-full.txt): Concatenated key documents
-- [llms-small.txt](llms-small.txt): Condensed summary
-- [llms-facts.txt](llms-facts.txt): Sourced one-line facts
+- [Quick reference](llms-small.txt)
````

Documentation/metadata excerpt: 4 diff lines omitted.

### memory.md

````diff
--- a/memory.md
+++ b/memory.md
@@ -0,0 +1,12 @@
+# json-3d-renderer Memory Log
+
+## v0.1.1 - 2026-11-12
+
+- Active task: November 12 repository bootstrap and full code optimizer maintenance.
+- Completed: hardened the local generator; extracted tested conversion helpers; protected
+  bundle-verifier output; added behavior regressions, CI validation, deterministic retrieval
+  indexes, workflow-log rotation and the maintained documentation suite.
+- Preserved: generated demos, data snapshots, screenshots and opaque vendored libraries.
+- In progress: verify final PR checks and remote-default delivery; see the dated audit reports.
+- Next steps: original upstream generators and vendored build provenance remain unavailable.
+  Do not run embeddings or import private hub data without an explicit separate request.
````

### package-lock.json

````diff
--- a/package-lock.json
+++ b/package-lock.json
@@ -0,0 +1,35 @@
+{
+  "name": "@mithudso/json-3d-renderer",
+  "version": "0.1.1",
+  "lockfileVersion": 3,
+  "requires": true,
+  "packages": {
+    "": {
+      "name": "@mithudso/json-3d-renderer",
+      "version": "0.1.1",
+      "license": "GPL-3.0-only",
+      "bin": {
+        "json-3d-verify-copy": "scripts/verify-copy.mjs"
+      },
+      "devDependencies": {
+        "acorn": "8.19.0"
+      },
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/acorn": {
+      "version": "8.19.0",
+      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.19.0.tgz",
+      "integrity": "sha512-oJlA3XiRm7Cyk6qFD2Jn8ak9B7jSy0qy00ADO3+8dpT0LSjFihQYv4C02LFCSYJV3Q37xYwwRy5m+IpIiUzqWw==",
+      "dev": true,
+      "license": "MIT",
+      "bin": {
+        "acorn": "bin/acorn"
+      },
+      "engines": {
+        "node": ">=0.4.0"
+      }
+    }
+  }
+}
````

### package.json

````diff
--- a/package.json
+++ b/package.json
@@ -1,16 +1,36 @@
 {
   "name": "@mithudso/json-3d-renderer",
-  "version": "0.1.0",
+  "version": "0.1.1",
+  "type": "commonjs",
   "description": "Hierarchical JSON to interactive 3D/2D concept-tree graphs; ships concept-tree-3d.bundle.js",
   "license": "GPL-3.0-only",
   "author": "Mitchell Hudson",
-  "repository": { "type": "git", "url": "git+https://github.com/mithudso/json-3d-renderer.git" },
+  "repository": {
+    "type": "git",
+    "url": "git+https://github.com/mithudso/json-3d-renderer.git"
+  },
   "main": "concept-tree-3d.bundle.js",
-  "files": ["concept-tree-3d.bundle.js", "scripts/verify-copy.mjs", "README.md", "LICENSE"],
-  "bin": { "json-3d-verify-copy": "./scripts/verify-copy.mjs" },
-  "engines": { "node": ">=18" },
+  "files": [
+    "concept-tree-3d.bundle.js",
+    "scripts/verify-copy.mjs",
+    "README.md",
+    "LICENSE"
+  ],
+  "bin": {
+    "json-3d-verify-copy": "./scripts/verify-copy.mjs"
+  },
+  "engines": {
+    "node": ">=18"
+  },
   "scripts": {
     "verify-copy": "node scripts/verify-copy.mjs",
-    "test": "node --test test/*.test.js"
+    "test": "node --test test/*.test.js",
+    "lint": "node scripts/check-repo.mjs",
+    "docs:check": "node scripts/check-doc-indexes.mjs",
+    "docs:update": "node scripts/check-doc-indexes.mjs --write",
+    "logs:rotate": "node scripts/rotate-workflow-logs.mjs"
+  },
+  "devDependencies": {
+    "acorn": "8.19.0"
   }
 }
````

### prompts.md

````diff
--- a/prompts.md
+++ b/prompts.md
@@ -0,0 +1,9 @@
+# Request log
+
+## Prompt v1 - 2026-11-12T08:13:35Z
+
+- User request:
+  - Execute the November 12 maintenance worker instructions for only json-3d-renderer.
+  - Run repo-bootstrapper and the full code-deep-optimizer workflow; preserve others' work.
+  - Deliver verified task-owned changes through a passing GitHub PR to remote main and write
+    the repository's local batch receipt. Continue autonomously until delivery is complete.
````

### scripts/check-doc-indexes.mjs

````diff
--- a/scripts/check-doc-indexes.mjs
+++ b/scripts/check-doc-indexes.mjs
@@ -0,0 +1,100 @@
+#!/usr/bin/env node
+import { execFileSync } from 'node:child_process';
+import { existsSync, lstatSync, readFileSync, writeFileSync } from 'node:fs';
+import { dirname, resolve } from 'node:path';
+import { fileURLToPath } from 'node:url';
+
+const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
+const OUTPUTS = ['docs/high_signal_file_index.json', 'docs/llm-repo-index.json',
+  'docs/codebase-overview.md', 'llms.txt', 'llms-small.txt', 'llms-facts.txt', 'llms-full.txt'];
+const VENDORS = new Set(['concept-tree-3d.bundle.js', 'd3.v7.min.js']);
+
+const markdownText = (value) => String(value).replace(/[&<>]/g, (char) =>
+  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[char])
+  .replace(/[\\`*_{}[\]()#+.!|]/g, '\\$&').replace(/[\r\n]/g, ' ');
+const linkPath = (path) => path.split('/').map((part) => encodeURIComponent(part)
+  .replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)).join('/');
+
+/** Enumerate tracked and non-ignored new files without Git filename quoting. */
+export function repositoryFiles(root = ROOT) {
+  return [...new Set(execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'],
+    { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }).split('\0').filter(Boolean))]
+    .filter((file) => existsSync(resolve(root, file)) && lstatSync(resolve(root, file)).isFile()).sort();
+}
+
+function card(root, path) {
+  let role = 'config';
+  if (VENDORS.has(path)) role = 'vendored';
+  else if (path.endsWith('.png')) role = 'binary';
+  else if (OUTPUTS.includes(path) || path.endsWith('.html') ||
+      /^examples\/(?:concept-tree|tree(?:-mindmap)?)\.md$/.test(path)) role = 'generated';
+  else if (path.endsWith('.json') && /^(?:examples\/|skills-graph)/.test(path)) role = 'data';
+  else if (path.startsWith('test/')) role = 'test';
+  else if (path.startsWith('lib/')) role = 'library';
+  else if (path.startsWith('scripts/') || path === 'inject-data.js') role = 'tooling';
+  else if (path.endsWith('.md') || path === 'LICENSE') role = 'documentation';
+  const readable = ['documentation', 'tooling', 'library', 'test', 'config'].includes(role);
+  const text = readable ? readFileSync(resolve(root, path), 'utf8') : '';
+  const title = text.match(/^#\s+(.+)$/m)?.[1];
+  const purpose = title || ({ vendored: 'Opaque rendering library; preserve bytes',
+    binary: 'Visualization screenshot', generated: 'Generated artifact; use its owning generator',
+    data: 'Visualization fixture; preserve source data' }[role]) || `${role}: ${path}`;
+  const source = /\.(?:[cm]?js)$/.test(path) && readable ? text : '';
+  const cjsExports = source.match(/module\.exports\s*=\s*\{([^}]+)\}/)?.[1].split(',').map((name) => name.trim()).filter(Boolean) || [];
+  return { path, role, purpose, layer: role, exports: [...new Set([...source.matchAll(/export function (\w+)/g)].map((match) => match[1]).concat(cjsExports))],
+    depends_on: [...source.matchAll(/(?:from\s+|require\()['"]([^'"]+)['"]/g)].map((match) => match[1]),
+    patterns: role === 'generated' ? ['generated'] : [], provenance: title ? `[src: ${path}]` : '[asserted]' };
+}
+
+/** Deterministic retrieval metadata only; never build embeddings or read external state. */
+export function buildOutputs(root = ROOT) {
+  const files = [...new Set([...repositoryFiles(root), ...OUTPUTS])].sort().map((path) => card(root, path));
+  const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
+  const header = '<!-- Generated by scripts/check-doc-indexes.mjs --write; do not hand-edit. -->\n';
+  const facts = [
+    `Version ${packageJson.version}; Node ${packageJson.engines.node}. [src: package.json]`,
+    'The browser demos use local vendored libraries and inline data. [src: docs/ARCHITECTURE.md]',
+    'Original demo generators are absent; do not hand-edit their output. [src: docs/known-issues.md]',
+    'The local generator requires explicit input and a new output path. [src: inject-data.js]',
+    'No MCP server, datastore or semantic index is configured. [src: docs/MCP.md]',
+    ...Object.entries(packageJson.scripts).map(([name, command]) => `npm run ${name}: ${command}. [src: package.json#scripts]`),
+  ];
+  const index = { generator: 'scripts/check-doc-indexes.mjs', files };
+  const toc = files.map((file) => `| [${markdownText(file.path)}](../${linkPath(file.path)}) | ${file.role} | ${markdownText(file.purpose)} |`).join('\n');
+  const small = header + '# json-3d-renderer\n\n' + facts.join('\n') + '\n';
+  return new Map([
+    [OUTPUTS[0], JSON.stringify(index, null, 2) + '\n'],
+    [OUTPUTS[1], JSON.stringify({ generator: index.generator, files: files.map(({ path, role }) => ({ path, role })) }, null, 2) + '\n'],
+    [OUTPUTS[2], header + '# Codebase overview\n\nEvery non-ignored file is listed. Generated, vendored, data and binary files are preserved; maintained tools and tests are reviewed separately.\n\n| Path | Role | Purpose |\n|---|---|---|\n' + toc + '\n'],
+    ['llms.txt', header + '# json-3d-renderer\n\nOffline graph demos and local validation tools. [src: README.md]\n\n- [Quick reference](llms-small.txt)\n- [Facts and commands](llms-facts.txt)\n- [Full reference](llms-full.txt)\n- [File map](docs/codebase-overview.md)\n- [Maintainer guide](CLAUDE.md)\n'],
+    ['llms-small.txt', small],
+    ['llms-facts.txt', header + facts.join('\n') + '\n'],
+    ['llms-full.txt', small + '\n## File inventory\n\n' + files.map((file) => `${file.path}: ${file.purpose}. ${file.provenance}`).join('\n') +
+      '\n\n## References\n\n' + ['ARCHITECTURE', 'DEVELOPMENT', 'COMPONENTS', 'SECURITY', 'TESTING', 'MCP']
+        .map((name) => `docs/${name}.md [src: docs/${name}.md]`).join('\n') + '\n'],
+  ]);
+}
+
+function main(args) {
+  if (args.length > 1 || (args.length === 1 && args[0] !== '--write')) {
+    console.error('Usage: node scripts/check-doc-indexes.mjs [--write]');
+    return 2;
+  }
+  try {
+    let stale = 0;
+    for (const [path, expected] of buildOutputs()) {
+      if (args[0] === '--write') writeFileSync(resolve(ROOT, path), expected);
+      else if (!existsSync(resolve(ROOT, path)) || readFileSync(resolve(ROOT, path), 'utf8') !== expected) {
+        console.error(`STALE ${path}; run npm run docs:update`);
+        stale++;
+      }
+    }
+    console.log(`Documentation indexes: ${stale ? 'FAIL' : 'OK'}`);
+    return stale ? 1 : 0;
+  } catch (error) {
+    console.error(`Documentation indexes: ERROR (${error.code || 'INVALID_METADATA'})`);
+    return 1;
+  }
+}
+
+if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exitCode = main(process.argv.slice(2));
````

### scripts/check-repo.mjs

````diff
--- a/scripts/check-repo.mjs
+++ b/scripts/check-repo.mjs
@@ -0,0 +1,29 @@
+#!/usr/bin/env node
+import { readFileSync } from 'node:fs';
+import { execFileSync } from 'node:child_process';
+import { dirname, resolve } from 'node:path';
+import { fileURLToPath } from 'node:url';
+import { repositoryFiles } from './check-doc-indexes.mjs';
+
+const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
+let failed = false;
+let jsonCount = 0;
+let sourceCount = 0;
+for (const path of repositoryFiles(root)) {
+  try {
+    if (path.endsWith('.json')) {
+      JSON.parse(readFileSync(resolve(root, path), 'utf8'));
+      jsonCount++;
+    }
+    // Frozen minified bundles have their own upstream build; never rewrite them.
+    if (/\.(?:cjs|mjs|js)$/.test(path) && !['concept-tree-3d.bundle.js', 'd3.v7.min.js'].includes(path)) {
+      execFileSync(process.execPath, ['--check', resolve(root, path)], { stdio: 'pipe' });
+      sourceCount++;
+    }
+  } catch (error) {
+    console.error(`FAIL ${path} (${error.code || 'INVALID_SOURCE'})`);
+    failed = true;
+  }
+}
+console.log(`Repository checks: ${jsonCount} JSON files, ${sourceCount} maintained JavaScript files; ${failed ? 'FAIL' : 'OK'}`);
+process.exitCode = failed ? 1 : 0;
````

### scripts/rotate-workflow-logs.mjs

````diff
--- a/scripts/rotate-workflow-logs.mjs
+++ b/scripts/rotate-workflow-logs.mjs
@@ -0,0 +1,87 @@
+#!/usr/bin/env node
+import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, renameSync, rmSync, linkSync, lstatSync, mkdtempSync } from 'node:fs';
+import { dirname, join, resolve } from 'node:path';
+import { fileURLToPath } from 'node:url';
+
+export const MAX_LOG_BYTES = 200 * 1024;
+
+function versionSections(text) {
+  const sections = [];
+  let offset = 0;
+  let fence = '';
+  for (const line of text.split(/(?<=\n)/)) {
+    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
+    if (marker) {
+      if (!fence) fence = marker[1];
+      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length &&
+          line.slice(marker[0].length).trim() === '') fence = '';
+    } else if (!fence && /^## (?:v\d+(?:\.\d+){0,2}|Prompt v\d+)(?: - [^\r\n]+)?\s*$/.test(line)) {
+      sections.push({ index: offset });
+    }
+    offset += line.length;
+  }
+  return sections;
+}
+
+/** Archive full originals before retaining each oversized log's latest version. */
+export function rotateLogs(root) {
+  const logs = ['memory.md', 'prompts.md'];
+  if (readdirSync(root).some((name) => logs.some((log) =>
+    name === `${log}~` || new RegExp(`^\\.?${log.replace('.', '\\.')}\\.sw[a-z]$`).test(name)))) {
+    throw new Error('EDITOR_SWAP_PRESENT');
+  }
+  const rotated = [];
+  for (const name of logs) {
+    const path = join(root, name);
+    if (!existsSync(path)) continue;
+    const stat = lstatSync(path);
+    if (!stat.isFile()) throw new Error('LOG_NOT_REGULAR');
+    const original = readFileSync(path, 'utf8');
+    if (Buffer.byteLength(original) <= MAX_LOG_BYTES) continue;
+    const sections = versionSections(original);
+    if (sections.length < 2) throw new Error('NO_ARCHIVABLE_SECTIONS');
+    const archiveRoot = join(root, 'docs/archive');
+    mkdirSync(archiveRoot, { recursive: true });
+    // A private, exclusively created directory owns all temporary and archive paths.
+    const directory = mkdtempSync(join(archiveRoot, `${name.slice(0, -3)}-`));
+    const archive = join(directory, name);
+    const temporary = join(directory, 'retained.tmp');
+    const mode = stat.mode & 0o777;
+    writeFileSync(join(directory, 'snapshot.md'), original, { flag: 'wx', mode });
+    const archiveLink = `docs/archive/${directory.slice(archiveRoot.length + 1)}/${name}`;
+    const retained = original.slice(0, sections[0].index) +
+      `Previous entries: [archive](${archiveLink}).\n\n` + original.slice(sections.at(-1).index);
+    let temporaryCreated = false;
+    let retired = false;
+    try {
+      writeFileSync(temporary, retained, { flag: 'wx', mode });
+      temporaryCreated = true;
+      // Capture the live inode, including any editor atomic save since the initial read.
+      renameSync(path, archive);
+      retired = true;
+      if (readFileSync(archive, 'utf8') !== original) throw new Error('LOG_CHANGED_DURING_ROTATION');
+      // Never replace a new file that another writer created during the retirement gap.
+      linkSync(temporary, path);
+    } catch (error) {
+      if (retired) {
+        try { linkSync(archive, path); }
+        catch (restoreError) { if (restoreError.code !== 'EEXIST') throw restoreError; }
+      }
+      throw error;
+    } finally {
+      if (temporaryCreated) rmSync(temporary);
+    }
+    rotated.push(name);
+  }
+  return rotated;
+}
+
+if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
+  try {
+    if (process.argv.length !== 2) throw new Error('USAGE_NO_ARGUMENTS');
+    console.log(JSON.stringify({ event: 'workflow_logs_rotated', files: rotateLogs(resolve(dirname(fileURLToPath(import.meta.url)), '..')) }));
+  } catch (error) {
+    console.error(JSON.stringify({ event: 'workflow_log_rotation_failed', code: error.code || error.message }));
+    process.exitCode = 1;
+  }
+}
````

### scripts/verify-copy.mjs

````diff
--- a/scripts/verify-copy.mjs
+++ b/scripts/verify-copy.mjs
@@ -14,26 +14,36 @@
 const BUNDLE = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'concept-tree-3d.bundle.js');
 const md5 = (file) => createHash('md5').update(readFileSync(file)).digest('hex');

-const paths = process.argv.slice(2);
-if (!paths.length || paths.includes('-h') || paths.includes('--help')) {
-  console.error('Usage: node scripts/verify-copy.mjs <path-to-consumer-copy> [more paths...]');
-  process.exit(2);
+function main() {
+  const paths = process.argv.slice(2);
+  if (!paths.length || paths.includes('-h') || paths.includes('--help')) {
+    console.error('Usage: node scripts/verify-copy.mjs <path-to-consumer-copy> [more paths...]');
+    return 2;
+  }
+
+  let want;
+  try {
+    want = md5(BUNDLE);
+  } catch (error) {
+    console.error(`ERROR reference bundle (${error.code || 'READ_FAILED'})`);
+    return 1;
+  }
+  console.log(`bundle   ${want}  ${BUNDLE}`);
+  let bad = 0;
+  for (const p of paths) {
+    let got;
+    try {
+      got = md5(resolve(p));
+    } catch (e) {
+      console.log(`MISSING  ${p} (${e.code || e.message})`);
+      bad++;
+      continue;
+    }
+    const same = got === want;
+    if (!same) bad++;
+    console.log(`${same ? 'OK      ' : 'DIFFERS '} ${got}  ${p}`);
+  }
+  return bad ? 1 : 0;
 }

-const want = md5(BUNDLE);
-console.log(`bundle   ${want}  ${BUNDLE}`);
-let bad = 0;
-for (const p of paths) {
-  let got;
-  try {
-    got = md5(resolve(p));
-  } catch (e) {
-    console.log(`MISSING  ${p} (${e.code || e.message})`);
-    bad++;
-    continue;
-  }
-  const same = got === want;
-  if (!same) bad++;
-  console.log(`${same ? 'OK      ' : 'DIFFERS '} ${got}  ${p}`);
-}
-process.exit(bad ? 1 : 0);
+process.exitCode = main();
````

### test/inject-data.test.js

````diff
--- a/test/inject-data.test.js
+++ b/test/inject-data.test.js
@@ -0,0 +1,148 @@
+import { test } from 'node:test';
+import assert from 'node:assert/strict';
+import { readFileSync, mkdtempSync, writeFileSync, existsSync, rmSync } from 'node:fs';
+import { spawnSync } from 'node:child_process';
+import { tmpdir } from 'node:os';
+import { join } from 'node:path';
+import { fileURLToPath } from 'node:url';
+import { createRequire } from 'node:module';
+import vm from 'node:vm';
+
+const script = new URL('../inject-data.js', import.meta.url);
+const require = createRequire(script);
+const node = (concept, parentConcept = null) => ({ concept, parentConcept });
+
+// Exercise the original CLI with synthetic I/O; never read its old private default.
+function generate(data, template = 'const DATA = {"nodes":[],"links":[]};') {
+  let output;
+  const messages = [];
+  const module = { exports: {} };
+  const process = { argv: ['node', 'inject-data.js', 'tree.json', 'out.html', 'template.html'], exitCode: 0,
+    exit(code) { this.exitCode = code; } };
+  const load = (name) => ['fs', 'node:fs'].includes(name) ? {
+    readFileSync: (path) => path.endsWith('tree.json') ? JSON.stringify(data) : template,
+    writeFileSync: (_path, text) => { output = text; },
+  } : require(name);
+  load.main = module;
+  vm.runInNewContext(readFileSync(script, 'utf8'), {
+    require: load, module, process, __dirname: new URL('..', script).pathname,
+    console: { log: (text) => messages.push(text), error: (text) => messages.push(text) },
+  }, { timeout: 1000 });
+  return { output, messages, status: process.exitCode };
+}
+
+test('cyclic parents fail before writing output', () => {
+  const result = generate([node('a', 'b'), node('b', 'a')]);
+  assert.equal(result.status, 1);
+  assert.equal(result.output, undefined);
+});
+
+test('prototype-like concept names receive string colors', () => {
+  const result = generate([node('__proto__'), node('constructor'), node('toString')]);
+  assert.equal(result.status, 0);
+  const graph = vm.runInNewContext(`${result.output}\nDATA`);
+  assert.ok(graph.nodes.every((item) => typeof item.color === 'string'));
+});
+
+test('markup names fail closed before reaching unsafe legacy tooltips', () => {
+  const result = generate([node('</script><img src=x onerror=alert(1)>')]);
+  assert.equal(result.status, 1);
+  assert.equal(result.output, undefined);
+  assert.ok(result.messages.every((line) => !line.includes('onerror')));
+});
+
+test('template replacement respects string delimiters and literal dollar sequences', () => {
+  const result = generate([node('$& $` $\'')], 'const DATA = {"nodes":[{"id":"x};y"}],"links":[]};');
+  assert.equal(result.status, 0);
+  const graph = vm.runInNewContext(`${result.output}\nDATA`);
+  assert.equal(graph.nodes[0].id, '$& $` $\'');
+});
+
+test('missing or ambiguous DATA declarations fail before writing', () => {
+  for (const template of ['const DATA = [];', 'const DATA = {}; const DATA = {};', 'no data here']) {
+    const result = generate([node('a')], template);
+    assert.equal(result.status, 1);
+    assert.equal(result.output, undefined);
+  }
+});
+
+test('descendants keep their top-level branch color', () => {
+  const result = generate([node('root'), node('group', 'root'), node('leaf', 'group')]);
+  const graph = vm.runInNewContext(`${result.output}\nDATA`);
+  assert.equal(graph.nodes[1].group, graph.nodes[2].group);
+  assert.equal(graph.nodes[1].color, graph.nodes[2].color);
+});
+
+test('DATA declaration text inside strings, comments and regex literals is data', () => {
+  const { buildGraph, renderHtml } = require('./lib/concept-graph.cjs');
+  const template = '<p>It\'s a template</p><script>' +
+    'const pattern = /["\']/; const label = "const DATA = "; /* const DATA = {}; */\n' +
+    'const DATA = {"note":"const DATA = "};</script>';
+  const first = renderHtml(template, buildGraph([node('const DATA = ')]));
+  const second = renderHtml(first, buildGraph([node('replacement')]));
+  assert.match(second, /"name":"replacement"/);
+  assert.match(second, /const label = "const DATA = "/);
+});
+
+test('malformed records and duplicate ids fail without mutating input', () => {
+  const { buildGraph } = require('./lib/concept-graph.cjs');
+  for (const input of [{}, [null], [node('')], [node('x'), node('x')],
+    [{ concept: 'a', childConcepts: {} }], [{ concept: 'a', researchedAt: {} }]]) {
+    assert.throws(() => buildGraph(input), TypeError);
+  }
+  const input = Object.freeze([Object.freeze(node('fragment', 'missing'))]);
+  assert.deepEqual(buildGraph(input).links, []);
+  assert.equal(buildGraph(input).nodes[0].id, 'fragment');
+});
+
+test('deep ancestry resolves iteratively and serialization keeps script boundaries', () => {
+  const { buildGraph, renderHtml } = require('./lib/concept-graph.cjs');
+  const tree = Array.from({ length: 10000 }, (_, i) => node(`n${i}`, i ? `n${i - 1}` : null));
+  const graph = buildGraph(tree.reverse());
+  assert.equal(graph.nodes.length, 10000);
+  assert.equal(graph.nodes[0].group, 'n1');
+  const rendered = renderHtml('<script>const DATA = {};</script>',
+    buildGraph([{ ...node('safe'), researchedAt: '</script>\u2028' }]));
+  assert.equal((rendered.match(/<\/script>/g) || []).length, 1);
+  assert.match(rendered, /\\u003c\/script>/);
+  assert.match(rendered, /\\u2028/);
+});
+
+test('real CLI creates output once, reports outcomes, and protects existing files', () => {
+  const dir = mkdtempSync(join(tmpdir(), 'j3d-generate-'));
+  const input = join(dir, 'input.json');
+  const output = join(dir, 'output.html');
+  const template = join(dir, 'template.html');
+  const run = (...args) => spawnSync(process.execPath, [fileURLToPath(script), ...args], { encoding: 'utf8', timeout: 5000 });
+  try {
+    writeFileSync(input, JSON.stringify([node('safe')]));
+    writeFileSync(template, '<script>const DATA = {};</script>');
+    const created = run(input, output, template);
+    assert.equal(created.status, 0, created.stderr);
+    assert.deepEqual(created.stdout.trim().split('\n').map(JSON.parse).map((row) => row.event),
+      ['generation_started', 'generation_completed']);
+    assert.match(readFileSync(output, 'utf8'), /"name":"safe"/);
+    const repeated = run(input, output, template);
+    assert.equal(repeated.status, 1);
+    assert.equal(JSON.parse(repeated.stderr).cause, 'EEXIST');
+    assert.match(readFileSync(output, 'utf8'), /"name":"safe"/);
+    assert.equal(run(input, input, template).status, 1);
+    assert.equal(run().status, 2);
+    writeFileSync(input, '{private-fixture-content');
+    const failed = run(input, join(dir, 'invalid.html'), template);
+    assert.equal(failed.status, 1);
+    assert.equal(JSON.parse(failed.stderr).code, 'INPUT_READ_FAILED');
+    assert.ok(!failed.stderr.includes('private-fixture-content'));
+    assert.ok(!existsSync(join(dir, 'invalid.html')));
+  } finally { rmSync(dir, { recursive: true, force: true }); }
+});
+
+test('parser selects DATA after return-regex and handles quoted script attributes', () => {
+  const { buildGraph, renderHtml } = require('./lib/concept-graph.cjs');
+  for (const opening of ['<script>', '<script data-note=">">']) {
+    const template = opening + 'function pattern(){ return /const DATA = {};/; } const DATA = {};</script>';
+    const rendered = renderHtml(template, buildGraph([node('actual')]));
+    const code = rendered.slice(opening.length, -'</script>'.length);
+    assert.equal(vm.runInNewContext(code + '\nDATA').nodes[0].name, 'actual');
+  }
+});
````

### test/maintenance.test.js

````diff
--- a/test/maintenance.test.js
+++ b/test/maintenance.test.js
@@ -0,0 +1,174 @@
+import { test } from 'node:test';
+import assert from 'node:assert/strict';
+import fs, { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync, chmodSync, statSync } from 'node:fs';
+import { syncBuiltinESMExports } from 'node:module';
+import { tmpdir } from 'node:os';
+import { join } from 'node:path';
+import { execFileSync } from 'node:child_process';
+import { repositoryFiles, buildOutputs } from '../scripts/check-doc-indexes.mjs';
+import { MAX_LOG_BYTES, rotateLogs } from '../scripts/rotate-workflow-logs.mjs';
+
+test('index census handles Unicode, newlines, ignored files and deleted paths', () => {
+  const root = mkdtempSync(join(tmpdir(), 'j3d-index-'));
+  try {
+    execFileSync('git', ['-c', 'init.defaultBranch=main', 'init', '--quiet', root]);
+    mkdirSync(join(root, 'docs'));
+    writeFileSync(join(root, '.gitignore'), 'ignored.json\n');
+    writeFileSync(join(root, 'package.json'), JSON.stringify({ version: '0.0.0', engines: { node: '>=18' }, scripts: {} }));
+    for (const file of ['café.json', 'line\nbreak.json', 'gone.json', 'ignored.json']) writeFileSync(join(root, file), '{}');
+    execFileSync('git', ['add', '--', 'café.json', 'line\nbreak.json', 'gone.json'], { cwd: root });
+    rmSync(join(root, 'gone.json'));
+    const paths = repositoryFiles(root);
+    assert.ok(paths.includes('café.json'));
+    assert.ok(paths.includes('line\nbreak.json'));
+    assert.ok(!paths.includes('gone.json'));
+    assert.ok(!paths.includes('ignored.json'));
+    const first = buildOutputs(root);
+    const inventory = JSON.parse(first.get('docs/high_signal_file_index.json'));
+    assert.equal(inventory.files.filter((file) => file.path === 'café.json').length, 1);
+    assert.deepEqual(buildOutputs(root), first);
+    writeFileSync(join(root, 'docs/hostile.md'), '# <img src=x> \\| [label]\n');
+    writeFileSync(join(root, 'docs/code).md'), '# export function fictional()\n');
+    writeFileSync(join(root, 'lib.cjs'), 'module.exports = { real };');
+    const outputs = buildOutputs(root);
+    const cards = JSON.parse(outputs.get('docs/high_signal_file_index.json')).files;
+    assert.deepEqual(cards.find((file) => file.path === 'docs/code).md').exports, []);
+    assert.deepEqual(cards.find((file) => file.path === 'lib.cjs').exports, ['real']);
+    const overview = outputs.get('docs/codebase-overview.md');
+    assert.ok(overview.includes('docs/code%29.md'));
+    assert.ok(!overview.includes('<img'));
+    assert.ok(overview.includes('&lt;img'));
+    assert.ok(overview.includes('line%0Abreak.json'));
+  } finally { rmSync(root, { recursive: true, force: true }); }
+});
+
+test('rotation retains numeric versions and private permissions', () => {
+  const root = mkdtempSync(join(tmpdir(), 'j3d-rotate-modes-'));
+  try {
+    const log = join(root, 'memory.md');
+    const original = '# Memory\n\n## v1 - yesterday\n' + 'old\n'.repeat(MAX_LOG_BYTES) +
+      '\n## v2 - today\nlatest body\n## validation\nstill latest\n```md\n## v9 - example\n```\n';
+    writeFileSync(log, original);
+    chmodSync(log, 0o600);
+    rotateLogs(root);
+    const retained = readFileSync(log, 'utf8');
+    const directory = join(root, 'docs/archive', readdirSync(join(root, 'docs/archive'))[0]);
+    const archive = join(directory, 'memory.md');
+    assert.match(retained, /## v2 - today\nlatest body/);
+    assert.equal(readFileSync(archive, 'utf8'), original);
+    assert.equal(readFileSync(join(directory, 'snapshot.md'), 'utf8'), original);
+    if (process.platform !== 'win32') {
+      assert.equal(statSync(directory).mode & 0o077, 0);
+      assert.equal(statSync(archive).mode & 0o077, 0);
+      assert.equal(statSync(log).mode & 0o077, 0);
+    }
+  } finally { rmSync(root, { recursive: true, force: true }); }
+});
+
+test('workflow rotation preserves complete originals and refuses editor swap files', () => {
+  const root = mkdtempSync(join(tmpdir(), 'j3d-logs-'));
+  try {
+    const original = '# Memory\n\n## v0.1.0 - 2026-11-11\n' + 'old entry\n'.repeat(MAX_LOG_BYTES / 8) +
+      '\n## v0.1.1 - 2026-11-12\nlatest entry\n';
+    writeFileSync(join(root, 'memory.md'), original);
+    writeFileSync(join(root, '.memory.md.swp'), 'editor');
+    assert.throws(() => rotateLogs(root), /EDITOR_SWAP_PRESENT/);
+    assert.equal(readFileSync(join(root, 'memory.md'), 'utf8'), original);
+    rmSync(join(root, '.memory.md.swp'));
+    assert.deepEqual(rotateLogs(root), ['memory.md']);
+    const archives = readdirSync(join(root, 'docs/archive'));
+    assert.equal(archives.length, 1);
+    assert.equal(readFileSync(join(root, 'docs/archive', archives[0], 'memory.md'), 'utf8'), original);
+    const retained = readFileSync(join(root, 'memory.md'), 'utf8');
+    assert.match(retained, /latest entry/);
+    assert.ok(!retained.includes('old entry'));
+    assert.deepEqual(rotateLogs(root), []);
+  } finally { rmSync(root, { recursive: true, force: true }); }
+});
+
+test('rotation preserves editor atomic saves at the retirement boundary', () => {
+  const root = mkdtempSync(join(tmpdir(), 'j3d-atomic-save-'));
+  const rename = fs.renameSync;
+  const log = join(root, 'memory.md');
+  const original = '# Memory\n## v1\n' + 'old\n'.repeat(MAX_LOG_BYTES) + '\n## v2\nlatest\n';
+  const saved = original + 'editor-save-marker\n';
+  try {
+    writeFileSync(log, original);
+    fs.renameSync = (source, target) => {
+      // The old implementation publishes a replacement; the new one retires the live path.
+      if (source === log || target === log) {
+        const editor = join(root, 'editor-save');
+        writeFileSync(editor, saved);
+        rename(editor, log);
+      }
+      return rename(source, target);
+    };
+    syncBuiltinESMExports();
+    assert.throws(() => rotateLogs(root), /LOG_CHANGED_DURING_ROTATION/);
+    assert.equal(readFileSync(log, 'utf8'), saved);
+  } finally {
+    fs.renameSync = rename;
+    syncBuiltinESMExports();
+    rmSync(root, { recursive: true, force: true });
+  }
+});
+
+test('rotation never deletes a pre-existing unowned temporary file', () => {
+  const root = mkdtempSync(join(tmpdir(), 'j3d-temp-owner-'));
+  try {
+    const log = join(root, 'memory.md');
+    writeFileSync(log, '# Memory\n## v1\n' + 'old\n'.repeat(MAX_LOG_BYTES) + '\n## v2\nlatest\n');
+    const unowned = `${log}.rotate-${process.pid}`;
+    writeFileSync(unowned, 'other-owner');
+    rotateLogs(root);
+    assert.equal(readFileSync(unowned, 'utf8'), 'other-owner');
+  } finally { rmSync(root, { recursive: true, force: true }); }
+});
+
+test('rotation preserves in-flight appends on the retired inode', () => {
+  const root = mkdtempSync(join(tmpdir(), 'j3d-append-'));
+  const rename = fs.renameSync;
+  const log = join(root, 'memory.md');
+  const original = '# Memory\n## v1\n' + 'old\n'.repeat(MAX_LOG_BYTES) + '\n## v2\nlatest\n';
+  try {
+    writeFileSync(log, original);
+    const descriptor = fs.openSync(log, 'a');
+    fs.renameSync = (source, target) => {
+      const result = rename(source, target);
+      if (source === log) fs.writeSync(descriptor, 'append-marker\n');
+      return result;
+    };
+    syncBuiltinESMExports();
+    try { assert.throws(() => rotateLogs(root), /LOG_CHANGED_DURING_ROTATION/); }
+    finally { fs.closeSync(descriptor); }
+    assert.equal(readFileSync(log, 'utf8'), original + 'append-marker\n');
+  } finally {
+    fs.renameSync = rename;
+    syncBuiltinESMExports();
+    rmSync(root, { recursive: true, force: true });
+  }
+});
+
+test('rotation preserves a new writer file created during the retirement gap', () => {
+  const root = mkdtempSync(join(tmpdir(), 'j3d-gap-'));
+  const rename = fs.renameSync;
+  const log = join(root, 'memory.md');
+  const original = '# Memory\n## v1\n' + 'old\n'.repeat(MAX_LOG_BYTES) + '\n## v2\nlatest\n';
+  try {
+    writeFileSync(log, original);
+    fs.renameSync = (source, target) => {
+      const result = rename(source, target);
+      if (source === log) writeFileSync(log, 'new-writer-marker');
+      return result;
+    };
+    syncBuiltinESMExports();
+    assert.throws(() => rotateLogs(root), { code: 'EEXIST' });
+    assert.equal(readFileSync(log, 'utf8'), 'new-writer-marker');
+    const directory = readdirSync(join(root, 'docs/archive'))[0];
+    assert.equal(readFileSync(join(root, 'docs/archive', directory, 'memory.md'), 'utf8'), original);
+  } finally {
+    fs.renameSync = rename;
+    syncBuiltinESMExports();
+    rmSync(root, { recursive: true, force: true });
+  }
+});
````

### test/package.json

````diff
--- a/test/package.json
+++ b/test/package.json
@@ -0,0 +1,3 @@
+{
+  "type": "module"
+}
````

### test/verify-copy.test.js

````diff
--- a/test/verify-copy.test.js
+++ b/test/verify-copy.test.js
@@ -1,7 +1,7 @@
 import { test } from 'node:test';
 import assert from 'node:assert/strict';
 import { spawnSync } from 'node:child_process';
-import { copyFileSync, mkdtempSync, writeFileSync, appendFileSync, rmSync } from 'node:fs';
+import { copyFileSync, mkdtempSync, writeFileSync, readFileSync, mkdirSync, appendFileSync, rmSync } from 'node:fs';
 import { tmpdir } from 'node:os';
 import { join, dirname, resolve } from 'node:path';
 import { fileURLToPath } from 'node:url';
@@ -15,6 +15,12 @@
     const copy = join(dir, 'copy.js');
     copyFileSync(join(root, 'concept-tree-3d.bundle.js'), copy);
     assert.equal(run(copy).status, 0);
+    const bytes = readFileSync(copy);
+    bytes[0] ^= 1;
+    writeFileSync(copy, bytes);
+    const sameLength = run(copy);
+    assert.equal(sameLength.status, 1);
+    assert.match(sameLength.stdout, /DIFFERS/);
     appendFileSync(copy, '\n');
     const bad = run(copy);
     assert.equal(bad.status, 1);
@@ -24,3 +30,19 @@
     writeFileSync(copy, '');
   } finally { rmSync(dir, { recursive: true, force: true }); }
 });
+
+test('all result lines drain to a pipe before the CLI exits', () => {
+  const dir = mkdtempSync(join(tmpdir(), 'j3d-pipe-'));
+  try {
+    mkdirSync(join(dir, 'scripts'));
+    const script = join(dir, 'scripts/verify-copy.mjs');
+    copyFileSync(join(root, 'scripts/verify-copy.mjs'), script);
+    const bundle = join(dir, 'concept-tree-3d.bundle.js');
+    writeFileSync(bundle, 'x');
+    const result = spawnSync(process.execPath, [script, ...Array(5000).fill('concept-tree-3d.bundle.js')], {
+      cwd: dir, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, timeout: 10000,
+    });
+    assert.equal(result.status, 0, result.stderr);
+    assert.equal(result.stdout.trim().split('\n').length, 5001);
+  } finally { rmSync(dir, { recursive: true, force: true }); }
+});
````

## 6. Blind re-audit

First gate: DISSENT. It independently reproduced two Critical failures (false DATA selection and
loss of editor atomic saves) plus Medium deletion of an unowned temporary. Those findings caused
round3. Regression tests were confirmed red before correction and green afterward.

Second gate: PASS — no corroborated Medium+ findings. The fresh reviewer read all12 requested
maintained source/config files in full, with only final code and the18-pass list. It ran20/20tests,
lint and docs checks successfully. Disposable adversarial experiments covered reversed ancestry,
dangling branches, multiple script blocks, script-boundary serialization and CRLF prompt rotation.
The reviewer checked atomic-save, append, retirement-gap and temporary-ownership behavior.
Windows execution was not performed. No prior findings or implementation rationale were supplied.

Cross-model gate: not invoked. No universal security or generated-browser correctness claim.

## 7. Recommendations

Not invoked (`--suggest` off). Existing absent-upstream boundaries remain documented; they are
not disguised as completed research or as new feature requirements.

## 8. Implemented features

Not invoked (`--implement-features` off). Changes are corroborated defect fixes and applicable
bootstrap requirements, not an ungrounded product redesign.

## 9. Summary

3 iterations · 18 active passes · standard profile · Final0C/0H/0M/0L · Verify: PASS · Status: CLEAN

## 10. Snapshot and rollback

Original54tracked files and per-iteration copies are held centrally. `run-stub.jsonl` records
continuation state. Restore only in this task's isolated checkout after preserving newer work;
these commands overwrite task-owned paths only. For delivered changes, prefer a reviewed revert
PR; never rewrite remote main. No shared stash or unrelated branch is modified.

```sh
rm .env.example
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/.github/CODEOWNERS .github/CODEOWNERS
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/.github/PULL_REQUEST_TEMPLATE.md .github/PULL_REQUEST_TEMPLATE.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/.github/SECURITY.md .github/SECURITY.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/.github/copilot-instructions.md .github/copilot-instructions.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/.github/dependabot.yml .github/dependabot.yml
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/.github/workflows/ci.yml .github/workflows/ci.yml
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/.gitignore .gitignore
rm .nvmrc
rm .vscode/extensions.json
rm .vscode/launch.json
rm .vscode/settings.json
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/CLAUDE.md CLAUDE.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/CONTRIBUTING.md CONTRIBUTING.md
rm GEMINI.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/README.md README.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/docs/ARCHITECTURE.md docs/ARCHITECTURE.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/docs/COMPONENTS.md docs/COMPONENTS.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/docs/DEVELOPMENT.md docs/DEVELOPMENT.md
rm docs/INSTALLATION.md
rm docs/MCP.md
rm docs/SECURITY.md
rm docs/TESTING.md
rm docs/archive/README.md
rm docs/caching-and-optimization.md
rm docs/code-deep-optimizer-2026-11-12.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/docs/codebase-overview.md docs/codebase-overview.md
rm docs/external-calls.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/docs/high_signal_file_index.json docs/high_signal_file_index.json
rm docs/integrations-and-assumptions.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/docs/known-issues.md docs/known-issues.md
rm docs/llm-repo-index.json
rm docs/logging.md
rm docs/maintenance-coverage-2026-11-12.md
rm docs/onboarding.md
rm docs/repo-bootstrap-audit-2026-11-12.md
rm docs/requirements.md
rm docs/runbooks/validation.md
rm docs/tool-inventory.json
rm docs/wiki/index.md
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/inject-data.js inject-data.js
rm lib/concept-graph.cjs
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/llms-facts.txt llms-facts.txt
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/llms-full.txt llms-full.txt
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/llms-small.txt llms-small.txt
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/llms.txt llms.txt
rm memory.md
rm package-lock.json
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/package.json package.json
rm prompts.md
rm scripts/check-doc-indexes.mjs
rm scripts/check-repo.mjs
rm scripts/rotate-workflow-logs.mjs
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/scripts/verify-copy.mjs scripts/verify-copy.mjs
rm test/inject-data.test.js
rm test/maintenance.test.js
rm test/package.json
cp ~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/test/verify-copy.test.js test/verify-copy.test.js
```

## 11. Index

index: n/a (outside corpus roots). Repository lexical retrieval metadata refreshed through
`npm run docs:update` and checked for drift. This is not a semantic-index or embeddings run.
No shared/global hook was disabled; the effective hook is registry-only, with no semantic action.

## 12. Memory-central

memory-central: 0 lessons · 7 conventions consulted · 0 regression checks fired.
No central memory files were edited. Stale no-package/no-tests guidance was verified against
source and corrected in repository docs. Stele carries the task and anchored decisions/risks;
repository memory.md and prompts.md carry the completed work and originating request. The local
batch receipt is authoritative for final PR, merge identity, check outcomes and checkout cleanup.
