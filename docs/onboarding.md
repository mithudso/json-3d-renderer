# Onboarding

Read [the README](../README.md), [CLAUDE.md](../CLAUDE.md), and [DEVELOPMENT.md](DEVELOPMENT.md).
Use the pinned Node runtime, run `npm ci --ignore-scripts`, then `npm test`, `npm run lint` and
`npm run docs:check`. Open a static demo through a loopback server if you need to inspect UI.

Distinguish maintained tooling (`inject-data.js`, `lib/`, `scripts/`, `test/`) from generated
snapshots and vendored bundles. Change the owning generator for original demo changes. Use only
synthetic fixtures; never regenerate a private hub snapshot as an incidental check. Start a task
branch and deliver reviewed, passing changes through a PR. The full [file map](codebase-overview.md)
and [documentation index](wiki/index.md) show the maintained surfaces and known limitations.
