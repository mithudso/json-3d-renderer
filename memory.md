# memory.md — operator log

Versioned log of active task / completed work / next steps. Newest entry on top.

---

## v0.1.0 — 2026-06-20 — Tailored repo bootstrap

**Active task:** Bring the repo up to a tailored subset of the mdb-tam documentation
standard (the parts that fit a static client-side visualization tool — no backend, so no
operations-registry / MCP / server / datastore-verify machinery).

**Completed:**
- Investigated the actual repo: identified the renderer libraries, the inlined-`const DATA`
  demo pages, the JSON/Markdown data schemas, and the generator scripts (which are NOT in
  this repo).
- Authored workflow infra: `CLAUDE.md`, `.github/copilot-instructions.md`, `AGENTS.md`,
  `GEMINI.md`, `memory.md`, `prompts.md`.
- Authored dotfile/meta + `.github/` templates and a lightweight JSON-validation CI.
- Authored the docs suite: `README.md` (rewrite), `docs/ARCHITECTURE.md`,
  `docs/DEVELOPMENT.md`, `docs/COMPONENTS.md`, `docs/codebase-overview.md`,
  `docs/high_signal_file_index.json`, `docs/known-issues.md`.

**Context note:** The repository was being reorganized concurrently during this work. Two
waves: (1) demo HTML/JSON moved root → `examples/`; (2) generated `.md` companions + the root
`README.md` moved into `examples/`, and `concept-tree-screenshot.png` + `tree-mindmap-full.mmd`
were removed. Docs reflect the final post-move snapshot (root = libraries + repo meta;
`examples/` = demos, data, generated companions). Two consequences captured in
`docs/known-issues.md`: (a) `examples/*.html` reference their rendering library by bare
filename while the libraries sit in the repo root (broken path); (b) the old root `README.md`
shows as deleted in git — a fresh root `README.md` was written as the entry point, and the
original blurb now lives at `examples/README.md`.

**Follow-up done:** Fixed the broken `examples/*.html` → library paths — all four pages now
use `../concept-tree-3d.bundle.js` / `../d3.v7.min.js` (verified they resolve from
`examples/`). Caveat: these are generated files, so the same `../` change must land in the
upstream generator or it regresses on regeneration.

**Next steps (not done here):**
- Decide whether to vendor the upstream generator scripts + canonical source data into this
  repo so artifacts can be regenerated here (and to make the path fix durable).
- Consider Git LFS for the large binary/bundle files if history growth becomes a concern.
