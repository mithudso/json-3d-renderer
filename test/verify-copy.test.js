import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, writeFileSync, appendFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const run = (...args) => spawnSync(process.execPath, [join(root, 'scripts/verify-copy.mjs'), ...args], { encoding: 'utf8' });

test('identical copy passes, edited copy fails, missing file fails, no args is a usage error', () => {
  const dir = mkdtempSync(join(tmpdir(), 'j3d-'));
  try {
    const copy = join(dir, 'copy.js');
    copyFileSync(join(root, 'concept-tree-3d.bundle.js'), copy);
    assert.equal(run(copy).status, 0);
    appendFileSync(copy, '\n');
    const bad = run(copy);
    assert.equal(bad.status, 1);
    assert.match(bad.stdout, /DIFFERS/);
    assert.equal(run(join(dir, 'nope.js')).status, 1);
    assert.equal(run().status, 2);
    writeFileSync(copy, '');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
