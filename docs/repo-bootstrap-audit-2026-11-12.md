# Repository bootstrap audit — 2026-11-12

Scope: only `mithudso/json-3d-renderer`; baseline `538c056`. Full default bootstrap and
optimizer workflows, without quick/changed-only mode or a 50-file cutoff. The source census
and exclusions are in [the coverage ledger](maintenance-coverage-2026-11-12.md). No earlier
`repo-bootstrap-audit-*.md` ledger existed. Existing known issues and ADRs were read first.

## Source and command baseline

The clean original checkout was on `main`; GitHub reported `mithudso/json-3d-renderer`, remote
`main`, and ADMIN access. Work used an isolated fetched-default branch. No other checkout,
installation, daemon, customer database or semantic index was changed. Pre-change originals
were copied to `~/.claude/skill-consolidation/backups/json-3d-renderer-20261112T082000Z/`.

Detected commands before verification: `npm test` (`node --test test/*.test.js`),
`node --check inject-data.js`, `node --check scripts/verify-copy.mjs`,
`node --check test/verify-copy.test.js`, and CI's tracked JSON parse loop. No build, lint or
static type-check command existed. Baseline: 1 test passed on Node 26.7.0; 7 JSON files parsed;
syntax checks passed. The test emitted an implicit ESM-scope warning. `npm audit --json` failed
with `ENOLOCK`; `npm outdated --json` returned `{}`. No held-out eval/benchmark exists, so
empirical mode is N/A; cannot auto-improve. No champion or embeddings were created.

## Manifest audit and disposition

| Standard | Baseline evidence | Result / applicability |
|---|---|---|
| Workflow guidance and logs | CLAUDE/Copilot denied the existing package/tests; GEMINI/memory/prompts were missing | Corrected guidance; restored versioned logs; package patch 0.1.1 |
| Agent catalog | No local agent definitions | Existing AGENTS catalog retained; no invented agents |
| Workflow log size | Restored logs are far below 200 KiB | Archive directory and guarded, tested rotation tool added |
| Editor and VCS metadata | Existing editorconfig/gitattributes/gitignore | Retained formatting/binary rules; ignored package archives and rotation temporaries |
| Node pin / lock | `engines >=18`, no runtime pin or lockfile | Node 24.22.3 maintainer pin and dependency-free lockfile; preserve Node >=18 compatibility |
| Environment and editor | No env reads or editor runtime config | Comment-only `.env.example`; local editor settings/extensions and verifier debug config |
| MCP config | No MCP dependency or runtime | N/A; documented in MCP.md; no fictional `.mcp.json` or editor MCP server |
| CI | Only JSON parsing; quoted Git paths could fail | Node 18/24 matrix runs tests, syntax/JSON validation, metadata drift; read-only permissions and SHA-pinned actions |
| Dependabot | Claimed no package manifest | Actions and npm ecosystems documented; vendor updates remain manual |
| CODEOWNERS | Placeholder `@owner` | Verified `@mithudso` assignments |
| PR/issue/security policies | Existing templates and security reporting | Added current validation, risk/rollback, threat-model link; preserve issue forms and legal files |
| License / conduct | GPL-3.0-only manifest, GPL license and conduct policy exist | Preserved; no new license grant or response SLA |
| Architecture / development / components | June docs omitted maintained Node tools | Refreshed actual commands, local library API, runtime boundaries and ADRs |
| Testing / security / MCP | Missing required docs | Added truthful scopes, meaningful behavior target, limitations, STRIDE boundaries and MCP N/A |
| Installation / requirements / onboarding | Missing | Added source-derived local setup, supported runtimes, requirements and walkthrough |
| Logging / caching / integrations / runbooks | Missing | Added actual I/O, tested generator events, no secrets, no fictional caches or services |
| External calls / operations | Only local files, Git and Node; no service integrations | Inventory added; local CLI tool inventory. Central daemon, dashboard, datastore registry and service drift check N/A |
| Retrieval indexes | 3 dead paths; omitted package, tests, generator and generated local page | Sole-writer regeneration plus CI drift/path census; complete maintained file map and llms metadata |
| Wiki | No maintained documentation landing page | Added docs/wiki/index.md |
| Semantic scripts and watcher | Absent; old guidance demanded a nonexistent script | Explicitly N/A and paused; no embeddings or watcher added/run |
| Context-specific installed skills | No `docs/*-context.md` files | N/A; no global skill installation or broad wrapper changes |
| Concept-tree freshness | Static upstream demo data, not this repo's research source | Preserve snapshot dates/counts; do not trigger research or rewrite frozen data |
| Native hosts / extension / OAuth | No corresponding executable surfaces | N/A after source inspection |
| Customer data / secrets | Static demo fixtures and repo docs; maintained diff checked | No customer source/import, credential or private transcript added |
| Hub registration | Existing entry resolved through supported `project_manager.py get` API | Canonical path/remote already match; final delivery receipt records the scoped metadata refresh |

## Validation and convergence

Six generator counterexamples failed against the original source and passed after correction.
Final local gates and independent review results are recorded in
[the optimizer report](code-deep-optimizer-2026-11-12.md). No source cap was applied. Retained
static/generated/vendor exclusions do not assert a browser audit or a dependency security clean bill.

The bootstrap drift pass was run after source/doc changes and again after index generation.
All applicable manifest requirements are covered. Accepted exceptions are explicit in the table;
these are architectural applicability decisions, not undisclosed missing implementations.

## Remaining boundaries

Original demo generators and the 3D bundle's reproducible build/dependency manifest remain absent.
Legacy generated tooltip sinks and fixed page subtitles require upstream changes. No WebGL/a11y
automation or numeric coverage SLA is claimed. Semantic indexing remains paused. The hub's old
outstanding item also refers to an alternate clone outside scope; that part is not closed by this run.

## Delivery

Deliver task-owned changes through a passing PR and confirm the exact final tree on remote `main`.
The local batch receipt holds the PR URL, merge commit, final check results and original-checkout sync.
A squash merge identity must be verified by merged PR plus content, not task-tip ancestry alone.
