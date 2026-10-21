#!/usr/bin/env node
// Check that a consumer's copy of concept-tree-3d.bundle.js is byte-identical to this repo's bundle.
//
//   node scripts/verify-copy.mjs <path-to-consumer-copy> [more paths...]
//
// Exit 0 when every copy matches, 1 when any differs or is missing, 2 on usage error.
// Prints the md5 of the bundle and of each copy so a mismatch is easy to read.

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const BUNDLE = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'concept-tree-3d.bundle.js');
const md5 = (file) => createHash('md5').update(readFileSync(file)).digest('hex');

const paths = process.argv.slice(2);
if (!paths.length || paths.includes('-h') || paths.includes('--help')) {
  console.error('Usage: node scripts/verify-copy.mjs <path-to-consumer-copy> [more paths...]');
  process.exit(2);
}

const want = md5(BUNDLE);
console.log(`bundle   ${want}  ${BUNDLE}`);
let bad = 0;
for (const p of paths) {
  let got;
  try {
    got = md5(resolve(p));
  } catch (e) {
    console.log(`MISSING  ${p} (${e.code || e.message})`);
    bad++;
    continue;
  }
  const same = got === want;
  if (!same) bad++;
  console.log(`${same ? 'OK      ' : 'DIFFERS '} ${got}  ${p}`);
}
process.exit(bad ? 1 : 0);
