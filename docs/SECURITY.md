# Security

## Boundaries and principals

A viewer opens local generated HTML and vendored JavaScript. A maintainer runs local Node
CLIs with filesystem permissions. No backend, user accounts, authentication tokens or datastore
ships here. Templates are executable code and must be trusted. Source-tree records are data.

## Threat model

| STRIDE class | Boundary and mitigation |
|---|---|
| Spoofing | No application identities exist; verify the repository and dependency origin before use |
| Tampering | Copy verification detects accidental bundle drift; review generated metadata and PR checks |
| Repudiation | CLI events and Git history record local work; no persistent central audit service exists |
| Information disclosure | Generator errors omit source text, paths and stacks; tests never read private hub input |
| Denial of service | The converter rejects ancestry cycles and resolves ancestry iteratively with memoization |
| Elevation / injection | Validate records; reject `<` in concept names; escape `<` and JS line separators when embedding JSON |

Legacy generated pages interpolate node names into HTML tooltips. Treat existing snapshots as
trusted artifacts; they are not a general untrusted-data renderer. The maintained converter rejects
markup-bearing names before those sinks. It also refuses existing output paths and ambiguous or
invalid DATA declarations. It does not sandbox a malicious template or make arbitrary generated
pages safe. Missing parent records remain visible as fragments without invalid rendered links.

MD5 in the copy verifier is an accidental-drift check, not a cryptographic authenticity guarantee.
The vendored 3D bundle has no reproducible build manifest here; its full transitive dependency
security status is unknown. D3 identifies v7.9.0 in its banner. No runtime npm dependencies exist.

## Secrets and incident response

No environment variables or secrets are required. Never commit credentials, source data from
private hubs, customer exports or diagnostic payloads. Review generated HTML and metadata before
publishing. Stop sharing an affected artifact, preserve evidence locally, and use the reporting
instructions in [.github/SECURITY.md](../.github/SECURITY.md). No response SLA or compliance
certification is promised by this repository.

Before contributing, check output encoding, trusted-template boundaries, bounded ancestry,
exclusive output creation, error redaction, vendor provenance and CI permissions.
