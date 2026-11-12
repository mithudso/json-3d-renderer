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
