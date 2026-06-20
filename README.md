# json-3d-renderer

Converts mind-map-style JSON into an interactive **3D mind-map visualization** with focus
mode and per-node descriptions — plus 2D (D3) and Markdown/Mermaid renderings of the same
data.

> **Status:** early. This repo currently ships the rendering **libraries** and a set of
> **generated demo visualizations** under [`examples/`](examples/). The build scripts that
> generate those demos from source JSON live in a separate upstream repo and are not yet
> checked in here — see [docs/known-issues.md](docs/known-issues.md).

## Quick start

Everything renders client-side and offline — no server, no install, no network.

1. Clone the repo.
2. Open a demo. Because the demos load a rendering library from the repo root, open them
   through a tiny local web server rather than `file://` so relative paths resolve cleanly:

   ```sh
   # from the repo root
   python3 -m http.server 8000
   # then visit, e.g.:
   #   http://localhost:8000/examples/concept-tree-3d.html
   ```

   The demo pages load their rendering library from the repo root via a `../` relative path
   (`../concept-tree-3d.bundle.js` / `../d3.v7.min.js`), so serving from the repo root and
   opening the page under `examples/` works. (Note: these are generated files — see
   [docs/known-issues.md](docs/known-issues.md) for why the `../` fix must also land upstream.)

## The demos

| File | What it is | Renders with |
|---|---|---|
| [`examples/concept-tree-3d.html`](examples/concept-tree-3d.html) | 3D force-directed mind map — rotate/zoom, search, layout modes, click a node to isolate its neighbors and read its description | `concept-tree-3d.bundle.js` (three.js + 3d-force-graph) |
| [`examples/concept-tree.html`](examples/concept-tree.html) | 2D radial tree / treemap / charts of the same data | `d3.v7.min.js` |
| [`examples/skills-graph.html`](examples/skills-graph.html) · [`-full`](examples/skills-graph-full.html) | Node-link graph of skills and their relationships | `concept-tree-3d.bundle.js` |
| [`examples/concept-tree.md`](examples/concept-tree.md) · [`tree.md`](examples/tree.md) · [`tree-mindmap.md`](examples/tree-mindmap.md) | Static Markdown / Mermaid renderings | — |

The sample input data is [`examples/tree.json`](examples/tree.json) (concept-tree shape) and
[`examples/skills-graph.json`](examples/skills-graph.json) (graph shape). Each HTML demo also
**inlines** its own data as a `const DATA = {...}` literal, so a single `.html` file is
self-contained except for the rendering library.

## How it works (one paragraph)

A generator reads a hierarchical JSON file (concept → parent/children, with metadata),
transforms it into a `{ nodes, links }` graph, and emits a self-contained HTML page with that
graph inlined and a `<script>` tag pointing at a rendering library. The 3D page uses
3d-force-graph (three.js under the hood); the 2D page uses D3 v7. See
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and the data schemas in
[docs/COMPONENTS.md](docs/COMPONENTS.md).

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — how the pieces fit, data flow, decisions
- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) — running the demos, regenerating, troubleshooting
- [docs/COMPONENTS.md](docs/COMPONENTS.md) — the renderers and the data schemas
- [docs/codebase-overview.md](docs/codebase-overview.md) — file-by-file map
- [docs/known-issues.md](docs/known-issues.md) — active gaps and workarounds
- [CONTRIBUTING.md](CONTRIBUTING.md) · [CLAUDE.md](CLAUDE.md) (AI-agent guidance)

## License

See [LICENSE](LICENSE).
