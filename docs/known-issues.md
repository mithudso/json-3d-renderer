# Known issues

_Snapshot: 2026-06-20. Inferred from the actual files and the repo's history during the
bootstrap pass._

## 1. `examples/*.html` library paths — **RESOLVED 2026-06-20** (durable fix still pending)

**Was:** each demo page loaded its library with a bare filename (e.g.
`<script src="concept-tree-3d.bundle.js">`), but the libraries live in the repo **root**, not
in `examples/`, so the `<script>` 404'd and the page rendered blank. Introduced when the demo
pages were moved into `examples/` without updating the `src=` paths.

**Fix applied:** the four pages now reference `../concept-tree-3d.bundle.js` /
`../d3.v7.min.js`, which resolve from `examples/`:

- `examples/concept-tree-3d.html` → `../concept-tree-3d.bundle.js`
- `examples/concept-tree.html` → `../d3.v7.min.js`
- `examples/skills-graph.html`, `examples/skills-graph-full.html` → `../concept-tree-3d.bundle.js`

> ⚠️ **Durable fix still pending.** These are **generated** files (issue 2). The same `../`
> change must be made in the upstream generator, or it will regress the next time the pages
> are regenerated. Until the generators are vendored in, treat this hand-edit as temporary.

## 2. The generators and canonical source data are not in this repo — **major**

The generated files carry banners referencing scripts that **do not exist here**:

- `scripts/build-concept-tree-3d.py` → `concept-tree-3d.html`
- `scripts/build-concept-tree-viz.mjs` → `concept-tree.html`, `concept-tree.md`
- `scripts/build-concept-tree-mindmap.py` → `tree-mindmap.md`
- canonical input referenced as `concept-tree/tree.json` (upstream path)

Consequence: **you cannot regenerate the artifacts from this repo.** Hand-edits to generated
files will not survive a regeneration done elsewhere.

**Fix options:** vendor the generator scripts + the canonical `tree.json` into this repo
(e.g. under `scripts/` and `data/`), or document the upstream repo as the source of truth in
`docs/ARCHITECTURE.md`.

## 3. Node counts disagree across artifacts — **minor (by design, document it)**

Different artifacts report different totals because each counts a different slice:

| Artifact | Reported | What it counts |
|---|---|---|
| 3D page subtitle | 465 backbone · 86 domains · 454 concepts · 3404 leaves | backbone vs concepts vs expandable leaves |
| `concept-tree.md` | 454 concepts · 129 groups (76 roots + 53 fragments) | concept entries + dangling fragments |
| `tree.md` | 449 concepts · 76 roots · 7,307 sources | concept entries (a different generation) |
| `tree-mindmap.md` | 473 concept-entry nodes · 86 domains | mindmap entry nodes |

These are not bugs to "reconcile" — a future reader should not "correct" a number that is
right for its context. (The slight 454 vs 449 vs 473 differences also reflect that the
artifacts were generated at different times.)

## 4. Dangling parent edges + 1 malformed node in the source tree — **minor**

`concept-tree.md` reports **53 fragments** whose `parentConcept` names a node that doesn't
exist (e.g. `Blockchain protocols`, `Human Psychology`, `Programming Languages`), plus **1
malformed node** filtered during the build. This is a data-quality issue in the upstream
`tree.json`, surfaced by visualizing it. Roughly **23%** of concepts carry zero sources
(structural placeholders).

## 5. Files removed during the reorg — **verify intent**

During the bootstrap, two files present at the start were removed, and the root README was
relocated:

- `concept-tree-screenshot.png` — removed.
- `tree-mindmap-full.mmd` (the full leaf-expanded Mermaid mindmap, ~3929 nodes) — removed.
- root `README.md` — moved to `examples/README.md` (git shows `D README.md`); a fresh root
  `README.md` was written by the bootstrap as the repo entry point.

If any of these removals were unintentional, restore from git history
(`git checkout HEAD -- README.md` for the old root README) or regenerate.

## 7. Demos duplicated at root and under `examples/` — **intentional (documented)**

The demo pages exist in **two** locations by choice:

- **Repo root** — `concept-tree-3d.html`, `concept-tree.html`, `skills-graph.html`,
  `skills-graph-full.html` (+ `skills-graph*.json`). These sit beside the libraries and use
  **bare** `src=` paths (`concept-tree-3d.bundle.js` / `d3.v7.min.js`).
- **`examples/`** — the same pages with `../` paths (libraries are one level up).

The `.json` data files are byte-identical between the two locations. Trade-off: ~2 MB of
duplicated content in history, and any regeneration must update **both** copies. If this
duplication stops being useful, collapse to one location and update the docs + this note.

## 6. Large binaries in the repo — **watch**

`concept-tree-3d.bundle.js` (~1.6 MB) and the demo JSON/HTML are sizable. If history growth
becomes a problem, consider Git LFS (a commented-out filter is in `.gitattributes`).
