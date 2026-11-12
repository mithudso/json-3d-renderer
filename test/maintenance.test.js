import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { repositoryFiles, buildOutputs } from '../scripts/check-doc-indexes.mjs';
import { MAX_LOG_BYTES, rotateLogs } from '../scripts/rotate-workflow-logs.mjs';

test('index census handles Unicode, newlines, ignored files and deleted paths', () => {
  const root = mkdtempSync(join(tmpdir(), 'j3d-index-'));
  try {
    execFileSync('git', ['-c', 'init.defaultBranch=main', 'init', '--quiet', root]);
    mkdirSync(join(root, 'docs'));
    writeFileSync(join(root, '.gitignore'), 'ignored.json\n');
    writeFileSync(join(root, 'package.json'), JSON.stringify({ version: '0.0.0', engines: { node: '>=18' }, scripts: {} }));
    for (const file of ['café.json', 'line\nbreak.json', 'gone.json', 'ignored.json']) writeFileSync(join(root, file), '{}');
    execFileSync('git', ['add', '--', 'café.json', 'line\nbreak.json', 'gone.json'], { cwd: root });
    rmSync(join(root, 'gone.json'));
    const paths = repositoryFiles(root);
    assert.ok(paths.includes('café.json'));
    assert.ok(paths.includes('line\nbreak.json'));
    assert.ok(!paths.includes('gone.json'));
    assert.ok(!paths.includes('ignored.json'));
    const first = buildOutputs(root);
    const inventory = JSON.parse(first.get('docs/high_signal_file_index.json'));
    assert.equal(inventory.files.filter((file) => file.path === 'café.json').length, 1);
    assert.deepEqual(buildOutputs(root), first);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('workflow rotation preserves complete originals and refuses editor swap files', () => {
  const root = mkdtempSync(join(tmpdir(), 'j3d-logs-'));
  try {
    const original = '# Memory\n\n## v0.1.0 - 2026-11-11\n' + 'old entry\n'.repeat(MAX_LOG_BYTES / 8) +
      '\n## v0.1.1 - 2026-11-12\nlatest entry\n';
    writeFileSync(join(root, 'memory.md'), original);
    writeFileSync(join(root, '.memory.md.swp'), 'editor');
    assert.throws(() => rotateLogs(root), /EDITOR_SWAP_PRESENT/);
    assert.equal(readFileSync(join(root, 'memory.md'), 'utf8'), original);
    rmSync(join(root, '.memory.md.swp'));
    assert.deepEqual(rotateLogs(root), ['memory.md']);
    const archives = readdirSync(join(root, 'docs/archive'));
    assert.equal(archives.length, 1);
    assert.equal(readFileSync(join(root, 'docs/archive', archives[0]), 'utf8'), original);
    const retained = readFileSync(join(root, 'memory.md'), 'utf8');
    assert.match(retained, /latest entry/);
    assert.ok(!retained.includes('old entry'));
    assert.deepEqual(rotateLogs(root), []);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
