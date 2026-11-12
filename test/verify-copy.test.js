import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, writeFileSync, readFileSync, mkdirSync, appendFileSync, rmSync } from 'node:fs';
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
    const bytes = readFileSync(copy);
    bytes[0] ^= 1;
    writeFileSync(copy, bytes);
    const sameLength = run(copy);
    assert.equal(sameLength.status, 1);
    assert.match(sameLength.stdout, /DIFFERS/);
    appendFileSync(copy, '\n');
    const bad = run(copy);
    assert.equal(bad.status, 1);
    assert.match(bad.stdout, /DIFFERS/);
    assert.equal(run(join(dir, 'nope.js')).status, 1);
    assert.equal(run().status, 2);
    writeFileSync(copy, '');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('all result lines drain to a pipe before the CLI exits', () => {
  const dir = mkdtempSync(join(tmpdir(), 'j3d-pipe-'));
  try {
    mkdirSync(join(dir, 'scripts'));
    const script = join(dir, 'scripts/verify-copy.mjs');
    copyFileSync(join(root, 'scripts/verify-copy.mjs'), script);
    const bundle = join(dir, 'concept-tree-3d.bundle.js');
    writeFileSync(bundle, 'x');
    const result = spawnSync(process.execPath, [script, ...Array(5000).fill(bundle)], {
      encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, timeout: 10000,
    });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trim().split('\n').length, 5001);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
