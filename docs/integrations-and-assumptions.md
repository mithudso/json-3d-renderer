# Integrations and assumptions

## External boundaries

Runtime pages load local files; no HTTP API, authentication service, MCP server or datastore
is configured. Node tools read/write explicit local files and use Git for inventory. CI uses
GitHub Actions checkout/setup-node and Node; npm installs no third-party packages. Actions are
pinned to verified commit SHAs. There is no deploy workflow.

The optional local static server binds `127.0.0.1:8000`. Templates retain their own script paths
and fixed UI subtitles. An output generated outside the repository needs its library at that
relative path. Templates must contain exactly one JSON-object `const DATA = ...;` declaration.

The maintained converter has no private default input or environment-variable dependency.
Original demo generators and the 3D bundle build source live outside this checkout and are not
invoked by validation. The exact canonical upstream checkout is not established here; do not
invent one. Metadata generation is lexical and deterministic, without embeddings or indexes
outside this repository. See [external-calls.md](external-calls.md) for executable boundaries.
