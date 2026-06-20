# Architecture

_Snapshot: 2026-06-20. This repo was being reorganized when these docs were written; if the
layout has drifted, reconcile against `docs/codebase-overview.md`._

## System context

`json-3d-renderer` is a **client-side, offline** visualization project. There is no server,
no backend, and no runtime network access. The unit of delivery is a **self-contained HTML
page** that renders a graph entirely in the browser.

```
  ┌──────────────────┐     generator (upstream,        ┌─────────────────────────────┐
  │  source JSON      │     NOT in this repo —          │  examples/<name>.html        │
  │  (concept tree /  │ ──▶ scripts/build-*.py|.mjs ──▶ │  • data inlined as           │
  │   skills graph)   │                                 │    `const DATA = {nodes,links}` │
  └──────────────────┘                                 │  • <script src="…library">    │
                                                        └──────────────┬──────────────┘
                                                                       │ opened in a browser
                                                                       ▼
                                  ┌────────────────────────────────────────────────────┐
                                  │ rendering library (in repo root):                  │
                                  │  • concept-tree-3d.bundle.js  → three.js +          │
                                  │                                 3d-force-graph (3D) │
                                  │  • d3.v7.min.js               → D3 v7 (2D)          │
                                  └────────────────────────────────────────────────────┘
```

## Containers / components

| Component | File(s) | Responsibility |
|---|---|---|
| **3D renderer page** | `examples/concept-tree-3d.html` | Inlines a `{nodes, links}` graph; builds an interactive 3D force-directed mind map (search, layout modes, focus/isolate, details panel). |
| **2D renderer page** | `examples/concept-tree.html` | Inlines the same data; renders radial tree / treemap / charts with D3. |
| **Skills-graph pages** | `examples/skills-graph.html`, `examples/skills-graph-full.html` | Node-link graph of skills and relationships, rendered with the 3D bundle. |
| **3D rendering library** | `concept-tree-3d.bundle.js` (root) | Vendored build of three.js + 3d-force-graph. Opaque; ~1.6 MB. |
| **2D rendering library** | `d3.v7.min.js` (root) | Vendored D3 v7. Opaque; ~280 KB. |
| **Sample data** | `examples/tree.json`, `examples/skills-graph.json` | Source-shape JSON (also inlined into the pages). |
| **Static renderings** | `examples/concept-tree.md`, `examples/tree.md`, `examples/tree-mindmap.md` | Generated Markdown / Mermaid views of the same tree. |

## Data flow

1. A hierarchical **source JSON** describes concepts (or skills) with parent/child links and
   metadata (`skillId`, `researchedAt`, `sourcesCount`, descriptions).
2. An **upstream generator** transforms that tree into a flat `{ nodes, links }` graph and
   emits an HTML page with the graph **inlined** as `const DATA` and a `<script>` tag for the
   right library.
3. The browser loads the page, the library reads `DATA`, and renders the interactive view.

The generator scripts and the canonical source data are **not in this repo** today (see
[known-issues.md](known-issues.md)); what is checked in is the *output* of step 2 plus the
libraries from step 3. The schemas for both the source JSON and the inlined `DATA` graph are
documented in [COMPONENTS.md](COMPONENTS.md).

## Key architectural decisions

- **ADR-001 — Inline data, vendor the library.** Each page carries its own data and loads a
  shared library file. *Consequence:* a page is portable as a single file, but it depends on
  the library sitting at a resolvable relative path. The pages reference it as
  `../<library>` from `examples/` (fixed 2026-06-20); because they're generated, that fix
  must also land upstream — see [known-issues.md](known-issues.md).
- **ADR-002 — Two rendering stacks for one dataset.** 3D (3d-force-graph/three.js) for
  exploration; 2D (D3) and Markdown/Mermaid for static/printable views. *Consequence:* the
  same tree is represented in several artifacts whose node counts differ by design (they
  count different slices — see [known-issues.md](known-issues.md)).
- **ADR-003 — Offline-first, no server.** No build/runtime dependencies at view time.
  *Consequence:* opening via `file://` can hit browser path/security quirks; a tiny static
  server is the recommended way to view (see [DEVELOPMENT.md](DEVELOPMENT.md)).
