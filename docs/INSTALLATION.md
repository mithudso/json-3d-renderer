# Installation

Clone this repository to view its static demos. A modern browser with WebGL is sufficient
for 3D rendering; Python 3 can serve files locally. Node 24.22.3 is the pinned maintainer
runtime. No runtime npm dependencies exist. Install development dependencies with `npm ci`
before using the checkout generator; it uses Acorn 8.19.0 and parse5 7.3.0 for template parsing.

```sh
npm ci --ignore-scripts
npm test
npm run lint
npm run docs:check
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/examples/concept-tree-3d.html`. See [DEVELOPMENT.md](DEVELOPMENT.md)
for local generation. See [the README](../README.md#consuming) for pinned bundle consumption.

Upgrade through a reviewed commit or release pin and rerun the checks. Review vendored library
provenance before replacing bytes. Uninstall by closing the browser page, stopping only your
local static server with Ctrl-C, and removing your own checkout or consumer package. No installed
service, daemon, database or global package needs removal.
