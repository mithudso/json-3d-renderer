# Workflow log archive

`npm run logs:rotate` archives complete oversized workflow logs here before retaining the latest
version in the root log. Archives are content-addressed and verified before replacement. The
command refuses editor swap files. No rotation was needed for the initial v0.1.1 entries.
