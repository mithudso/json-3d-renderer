# Logging

`inject-data.js` emits JSON lines to stdout for `generation_started` and `generation_completed`
(with node/link counts). It emits `generation_failed` to stderr with a stage code and a bounded
cause code. Usage errors print a synopsis and exit 2. Other failures exit 1; success exits 0.
No source records, JSON parser excerpts, private paths or stack traces enter generator logs.

The copy verifier preserves its human-readable hash/status output (`OK`, `DIFFERS`, `MISSING`)
and reference-read error. It sets `process.exitCode` so piped output can drain. Tests assert
result lines and failure/success events. The maintenance CLIs report success or actionable
failures on stdout/stderr; log rotation uses JSON events. No remote logger, central error file,
long-running worker or telemetry backend is configured.

Do not log credentials, customer data, raw source JSON, template contents or secrets. Log a
stable stage/error code and a count or status instead. Use [the validation runbook](runbooks/validation.md)
for failed checks. There is no automated retry of invalid input or existing output files.
