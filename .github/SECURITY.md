# Security Policy

## Scope

`json-3d-renderer` is a **client-side, offline visualization** project. It ships static
HTML pages and vendored JavaScript rendering libraries (three.js / 3d-force-graph via
`concept-tree-3d.bundle.js`, and D3 v7 via `d3.v7.min.js`). There is no server, no backend,
no authentication, and no network calls at runtime — each demo page renders data that is
**inlined into the page** as a `const DATA` literal.

The realistic security considerations are therefore:

- **Untrusted data → HTML injection.** If you generate a page from data you do not control,
  ensure the generator escapes node names, descriptions, and source URLs before embedding
  them in the DOM. Treat the `desc` and link fields in the data as untrusted.
- **Vendored library provenance.** `concept-tree-3d.bundle.js` and `d3.v7.min.js` are
  third-party builds. Update them only from their official upstream releases and verify
  integrity before committing.

## Reporting a vulnerability

If you believe you have found a security issue (for example, an XSS vector in a generated
page or a malicious vendored dependency):

1. **Do not** open a public issue with exploit details.
2. Open a private report via GitHub's **Security advisories** ("Report a vulnerability")
   on this repository, or contact the repository owner directly.
3. Include the affected file, how to reproduce, and the impact.

We will acknowledge the report and respond with next steps.
