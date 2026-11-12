#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { repositoryFiles } from './check-doc-indexes.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let failed = false;
let jsonCount = 0;
let sourceCount = 0;
for (const path of repositoryFiles(root)) {
  try {
    if (path.endsWith('.json')) {
      JSON.parse(readFileSync(resolve(root, path), 'utf8'));
      jsonCount++;
    }
    // Frozen minified bundles have their own upstream build; never rewrite them.
    if (/\.(?:cjs|mjs|js)$/.test(path) && !['concept-tree-3d.bundle.js', 'd3.v7.min.js'].includes(path)) {
      execFileSync(process.execPath, ['--check', resolve(root, path)], { stdio: 'pipe' });
      sourceCount++;
    }
  } catch (error) {
    console.error(`FAIL ${path} (${error.code || 'INVALID_SOURCE'})`);
    failed = true;
  }
}
console.log(`Repository checks: ${jsonCount} JSON files, ${sourceCount} maintained JavaScript files; ${failed ? 'FAIL' : 'OK'}`);
process.exitCode = failed ? 1 : 0;
