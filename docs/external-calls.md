# Executable I/O inventory

This static-artifact repo has no live external API or datastore operations. Local file/Git/Node
calls are listed below. The service-oriented five-standard operations contract is intentionally
adapted: CLI triggers, visible/tested outcomes, remediation and filesystem assertions apply;
central error daemons, dashboard cards and datastore read-back do not. Adding an app server or
operations dashboard for these short local tools would invent a runtime that the repo does not use.

| Source | Target / effect | Logging and tests | Remediation / retry |
|---|---|---|---|
| `inject-data.js:main` | Read explicit tree/template; create exclusive output | JSON start/outcome; `test/inject-data.test.js` reads back output | Fix input/template/path; never retry over existing output |
| `scripts/verify-copy.mjs:main` | Read reference and supplied copies; MD5 drift check | Hash/status lines; `test/verify-copy.test.js` | Select correct pin/copy; no automatic retry |
| `scripts/check-doc-indexes.mjs:repositoryFiles` | `git ls-files -z`; local read-only census | Exit status / error code; Unicode/newline fixture in maintenance tests | Run in a Git checkout |
| `scripts/check-doc-indexes.mjs:buildOutputs` | Read package/docs; optional metadata writes | Deterministic drift report; repeated-output test | Run `npm run docs:update` and review diff |
| `scripts/check-repo.mjs` | Parse JSON; `node --check` each maintained source | Counts and per-path failures; CI executes the command | Fix reported source; do not retry invalid JSON |
| `scripts/rotate-workflow-logs.mjs:rotateLogs` | Read logs; archive/read back originals; atomically replace retained log | JSON outcome; archive and swap-guard assertions | Close editor; inspect archive and current log before retry |
| `test/*.test.js` | Spawn Node/Git with argument arrays; disposable filesystem fixtures | Assertions, exit codes and cleanup in `finally` | Fix failing behavior; never use live external data |

No network retry/backoff, MCP trigger, dashboard, central error log or `DATASTORE_VERIFY_FAILED`
code applies. `docs/tool-inventory.json` describes local tools rather than fictional MCP routes.
