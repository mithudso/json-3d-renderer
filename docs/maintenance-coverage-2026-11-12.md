# Maintenance coverage — 2026-11-12

Baseline `538c056` has 54 tracked files. The census used NUL-delimited Git enumeration, not
an arbitrary 50-file selection. Every maintained source, test, CI/config and documentation file
was included. Final inventory and file roles are mechanically listed in
[codebase-overview.md](codebase-overview.md) and `high_signal_file_index.json`.

## Baseline accounting

| Set | Files | Review |
|---|---:|---|
| Maintained executable / package / CI | 5 | Separate fresh-context read-only per-file reviewers for inject-data.js, verify-copy.mjs, its test, package.json and ci.yml; repo-level architecture/dependency/tooling passes |
| Maintained docs and other config/legal | 24 | Full direct reads, manifest drift audit, privacy/link checks; legal content preserved |
| Generated HTML | 9 | Root and examples demos plus global-ai-hub-3d.html; generator banner and all local script paths verified; no hand edits or full generated-code security claim |
| Generated Markdown | 3 | examples/concept-tree.md, tree.md, tree-mindmap.md; preserved upstream output |
| Generated retrieval text | 4 | Existing llms family; regenerated with source-derived metadata through its new owning writer |
| Visualization data snapshots | 5 | JSON parse and duplicate-copy checks; no data/schema research or rewrite |
| Vendored minified libraries | 2 | Classified opaque; hashes preserved; no minified-source rewrite or exhaustive dependency-security claim |
| Screenshots | 2 | Binary exclusions; hashes preserved |
| **Total** | **54** | **29 maintained + 25 generated/data/vendor/binary** |

The old index had 3 dead paths: GEMINI.md, memory.md and prompts.md. Restoring these files and
regenerating the inventory removes that drift. Added tooling and tests receive the same per-file
review rather than being omitted because they are new. No tests, tools, CI or UI boundary was
silently dropped. The original generated UI is excluded from modification; template serialization
and data boundaries are tested with synthetic fixtures and the actual root template.

## Final source review

All 9 maintained JavaScript files, ci.yml, package.json and test/package.json receive separate
bounded fresh-context reviews. The driver also checks M3 architecture, cross-file M2 duplication,
T2 supply chain, T3 tooling and T4 test isolation. Each file review lists C1–C3, S1–S5, P1–P2,
M1/M2/M4, T1/T4 with explicit N/A reasons. T4 applies to test files; it is N/A on non-test sources.
No failed/empty bundle may be treated as CLEAN. A separate final blind review receives only final
code and the pass list; its outcome is recorded in the optimizer report.

## Exclusions and limits

No node_modules, build/dist cache, lockfile internals, binary pixels, private hub source, other
repository source, daemon or semantic/vector store is audited or mutated. The lockfile is checked
for package/dependency consistency. Generated artifact hashes (except intentionally regenerated
retrieval metadata) and the root/examples data-copy equivalence are verified after changes.
The source universe is complete for maintained files; browser rendering and absent upstream
sources remain bounded exclusions. Test counts are behavioral receipts, not coverage percentages.

## Delivery file accounting

The final inventory has88 paths. The task owns58 changed files (24 existing,34 new).
No baseline source was omitted or truncated. New code and all12 maintained executable/config
review targets were read in full in fresh contexts. Blind gate2 passed all18 passes before the final CodeQL HTML-parser finding. That finding
was repaired with parse5 and reviewed separately; no third blind gate is claimed. The first blind dissent and every correction remain visible
in the optimizer report. The final22 tests check behavior; no numeric coverage is claimed.

| Task-owned file | Disposition |
|---|---|
| `.env.example` | Created; reviewed |
| `.github/CODEOWNERS` | Updated; reviewed |
| `.github/PULL_REQUEST_TEMPLATE.md` | Updated; reviewed |
| `.github/SECURITY.md` | Updated; reviewed |
| `.github/copilot-instructions.md` | Updated; reviewed |
| `.github/dependabot.yml` | Updated; reviewed |
| `.github/workflows/ci.yml` | Updated; reviewed |
| `.gitignore` | Updated; reviewed |
| `.nvmrc` | Created; reviewed |
| `.vscode/extensions.json` | Created; reviewed |
| `.vscode/launch.json` | Created; reviewed |
| `.vscode/settings.json` | Created; reviewed |
| `CLAUDE.md` | Updated; reviewed |
| `CONTRIBUTING.md` | Updated; reviewed |
| `GEMINI.md` | Created; reviewed |
| `README.md` | Updated; reviewed |
| `docs/ARCHITECTURE.md` | Updated; reviewed |
| `docs/COMPONENTS.md` | Updated; reviewed |
| `docs/DEVELOPMENT.md` | Updated; reviewed |
| `docs/INSTALLATION.md` | Created; reviewed |
| `docs/MCP.md` | Created; reviewed |
| `docs/SECURITY.md` | Created; reviewed |
| `docs/TESTING.md` | Created; reviewed |
| `docs/archive/README.md` | Created; reviewed |
| `docs/caching-and-optimization.md` | Created; reviewed |
| `docs/code-deep-optimizer-2026-11-12.md` | Created; reviewed |
| `docs/codebase-overview.md` | Updated; reviewed |
| `docs/external-calls.md` | Created; reviewed |
| `docs/high_signal_file_index.json` | Updated; reviewed |
| `docs/integrations-and-assumptions.md` | Created; reviewed |
| `docs/known-issues.md` | Updated; reviewed |
| `docs/llm-repo-index.json` | Created; reviewed |
| `docs/logging.md` | Created; reviewed |
| `docs/maintenance-coverage-2026-11-12.md` | Created; reviewed |
| `docs/onboarding.md` | Created; reviewed |
| `docs/repo-bootstrap-audit-2026-11-12.md` | Created; reviewed |
| `docs/requirements.md` | Created; reviewed |
| `docs/runbooks/validation.md` | Created; reviewed |
| `docs/tool-inventory.json` | Created; reviewed |
| `docs/wiki/index.md` | Created; reviewed |
| `inject-data.js` | Updated; reviewed |
| `lib/concept-graph.cjs` | Created; reviewed |
| `llms-facts.txt` | Updated; reviewed |
| `llms-full.txt` | Updated; reviewed |
| `llms-small.txt` | Updated; reviewed |
| `llms.txt` | Updated; reviewed |
| `memory.md` | Created; reviewed |
| `package-lock.json` | Created; reviewed |
| `package.json` | Updated; reviewed |
| `prompts.md` | Created; reviewed |
| `scripts/check-doc-indexes.mjs` | Created; reviewed |
| `scripts/check-repo.mjs` | Created; reviewed |
| `scripts/rotate-workflow-logs.mjs` | Created; reviewed |
| `scripts/verify-copy.mjs` | Updated; reviewed |
| `test/inject-data.test.js` | Created; reviewed |
| `test/maintenance.test.js` | Created; reviewed |
| `test/package.json` | Created; reviewed |
| `test/verify-copy.test.js` | Updated; reviewed |
