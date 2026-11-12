# Testing

`npm test` runs Node's built-in runner over `test/*.test.js`. `test/package.json` gives
these tests an explicit ESM scope, including on Node 18. Tests use private temporary
directories and synthetic input. They never read live hub data or start services.

| Suite | Command | Behavior covered |
|---|---|---|
| Bundle verifier | `node --test test/verify-copy.test.js` | Equal bytes, same-length corruption, missing file, usage, complete piped output |
| Generator | `node --test test/inject-data.test.js` | Cycles, prototype keys, unsafe names, DATA string delimiters, branch colors, malformed records, deep ancestry, regex/attribute parsing, browser end tags, commented/inert scripts, serialization and real CLI file/log outcomes |
| Maintenance | `node --test test/maintenance.test.js` | Unicode/newline paths, ignored/deleted paths, deterministic indexes, log archival, private modes, concurrent appends, atomic saves, retirement-gap writers, temporary ownership and editor swap protection |

`npm run lint` parses every non-ignored JSON file and runs `node --check` on every
maintained JS/CJS/MJS file. Vendored minified libraries are excluded from syntax rewriting
and review. `npm run docs:check` compares generated indexes and the llms family with deterministic
source-derived output. Both commands and `npm test` run in CI on Node 18 and pinned Node 24.

The target is meaningful coverage of important and changed/risky paths, including observable
logs and filesystem effects. There is no enforced numeric line-coverage target or coverage
percentage gate. Test count is not an empirical quality score. No held-out benchmark/eval set
exists, so optimizer empirical mode cannot auto-improve this repository.

Add a behavior-named test with real assertions and cleanup in `finally`. Keep input synthetic.
Use subprocess argument arrays, finite child-process timeouts and unique temporary directories.
Test files are independent and may run concurrently. Do not add sleeps to synchronize them.

CI does not render WebGL, test browser accessibility, rebuild upstream generated demos, prove
vendored dependency provenance, or audit minified third-party internals. For a requested renderer
change, add a browser check and update the owning upstream source rather than editing output.
