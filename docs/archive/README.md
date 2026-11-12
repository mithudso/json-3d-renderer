# Workflow log archive

`npm run logs:rotate` archives oversized workflow logs before retaining the latest numeric
version in the root log. Close editors first; the command refuses editor swap files. No
rotation was needed for the initial v0.1.1 entries.

Each rotation creates a private directory. `snapshot.md` preserves the initial read. The tool
renames the live file into that directory, checks it against the snapshot, and creates the
retained root log exclusively. It never overwrites a new file created during that gap.
In-flight appends remain on the retired inode. An atomic editor save before retirement is
captured, detected and restored if the root path is still free. Files keep source permissions.

If rotation fails, inspect the root log and its archive before retrying. The command preserves
both snapshots and any competing root file. Installation has a short path-absence window;
rotation is a maintenance operation, not a continuously available logging service.
