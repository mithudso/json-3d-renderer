import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs, { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync, chmodSync, statSync } from 'node:fs';
import { syncBuiltinESMExports } from 'node:module';
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
    writeFileSync(join(root, 'docs/hostile.md'), '# <img src=x> \\| [label]\n');
    writeFileSync(join(root, 'docs/code).md'), '# export function fictional()\n');
    writeFileSync(join(root, 'lib.cjs'), 'module.exports = { real };');
    const outputs = buildOutputs(root);
    const cards = JSON.parse(outputs.get('docs/high_signal_file_index.json')).files;
    assert.deepEqual(cards.find((file) => file.path === 'docs/code).md').exports, []);
    assert.deepEqual(cards.find((file) => file.path === 'lib.cjs').exports, ['real']);
    const overview = outputs.get('docs/codebase-overview.md');
    assert.ok(overview.includes('docs/code%29.md'));
    assert.ok(!overview.includes('<img'));
    assert.ok(overview.includes('&lt;img'));
    assert.ok(overview.includes('line%0Abreak.json'));
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('rotation retains numeric versions and private permissions', () => {
  const root = mkdtempSync(join(tmpdir(), 'j3d-rotate-modes-'));
  try {
    const log = join(root, 'memory.md');
    const original = '# Memory\n\n## v1 - yesterday\n' + 'old\n'.repeat(MAX_LOG_BYTES) +
      '\n## v2 - today\nlatest body\n## validation\nstill latest\n```md\n## v9 - example\n```\n';
    writeFileSync(log, original);
    chmodSync(log, 0o600);
    rotateLogs(root);
    const retained = readFileSync(log, 'utf8');
    const directory = join(root, 'docs/archive', readdirSync(join(root, 'docs/archive'))[0]);
    const archive = join(directory, 'memory.md');
    assert.match(retained, /## v2 - today\nlatest body/);
    assert.equal(readFileSync(archive, 'utf8'), original);
    assert.equal(readFileSync(join(directory, 'snapshot.md'), 'utf8'), original);
    if (process.platform !== 'win32') {
      assert.equal(statSync(directory).mode & 0o077, 0);
      assert.equal(statSync(archive).mode & 0o077, 0);
      assert.equal(statSync(log).mode & 0o077, 0);
    }
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
    assert.equal(readFileSync(join(root, 'docs/archive', archives[0], 'memory.md'), 'utf8'), original);
    const retained = readFileSync(join(root, 'memory.md'), 'utf8');
    assert.match(retained, /latest entry/);
    assert.ok(!retained.includes('old entry'));
    assert.deepEqual(rotateLogs(root), []);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('rotation preserves editor atomic saves at the retirement boundary', () => {
  const root = mkdtempSync(join(tmpdir(), 'j3d-atomic-save-'));
  const rename = fs.renameSync;
  const log = join(root, 'memory.md');
  const original = '# Memory\n## v1\n' + 'old\n'.repeat(MAX_LOG_BYTES) + '\n## v2\nlatest\n';
  const saved = original + 'editor-save-marker\n';
  try {
    writeFileSync(log, original);
    fs.renameSync = (source, target) => {
      // The old implementation publishes a replacement; the new one retires the live path.
      if (source === log || target === log) {
        const editor = join(root, 'editor-save');
        writeFileSync(editor, saved);
        rename(editor, log);
      }
      return rename(source, target);
    };
    syncBuiltinESMExports();
    assert.throws(() => rotateLogs(root), /LOG_CHANGED_DURING_ROTATION/);
    assert.equal(readFileSync(log, 'utf8'), saved);
  } finally {
    fs.renameSync = rename;
    syncBuiltinESMExports();
    rmSync(root, { recursive: true, force: true });
  }
});

test('rotation never deletes a pre-existing unowned temporary file', () => {
  const root = mkdtempSync(join(tmpdir(), 'j3d-temp-owner-'));
  try {
    const log = join(root, 'memory.md');
    writeFileSync(log, '# Memory\n## v1\n' + 'old\n'.repeat(MAX_LOG_BYTES) + '\n## v2\nlatest\n');
    const unowned = `${log}.rotate-${process.pid}`;
    writeFileSync(unowned, 'other-owner');
    rotateLogs(root);
    assert.equal(readFileSync(unowned, 'utf8'), 'other-owner');
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('rotation preserves in-flight appends on the retired inode', () => {
  const root = mkdtempSync(join(tmpdir(), 'j3d-append-'));
  const rename = fs.renameSync;
  const log = join(root, 'memory.md');
  const original = '# Memory\n## v1\n' + 'old\n'.repeat(MAX_LOG_BYTES) + '\n## v2\nlatest\n';
  try {
    writeFileSync(log, original);
    const descriptor = fs.openSync(log, 'a');
    fs.renameSync = (source, target) => {
      const result = rename(source, target);
      if (source === log) fs.writeSync(descriptor, 'append-marker\n');
      return result;
    };
    syncBuiltinESMExports();
    try { assert.throws(() => rotateLogs(root), /LOG_CHANGED_DURING_ROTATION/); }
    finally { fs.closeSync(descriptor); }
    assert.equal(readFileSync(log, 'utf8'), original + 'append-marker\n');
  } finally {
    fs.renameSync = rename;
    syncBuiltinESMExports();
    rmSync(root, { recursive: true, force: true });
  }
});

test('rotation preserves a new writer file created during the retirement gap', () => {
  const root = mkdtempSync(join(tmpdir(), 'j3d-gap-'));
  const rename = fs.renameSync;
  const log = join(root, 'memory.md');
  const original = '# Memory\n## v1\n' + 'old\n'.repeat(MAX_LOG_BYTES) + '\n## v2\nlatest\n';
  try {
    writeFileSync(log, original);
    fs.renameSync = (source, target) => {
      const result = rename(source, target);
      if (source === log) writeFileSync(log, 'new-writer-marker');
      return result;
    };
    syncBuiltinESMExports();
    assert.throws(() => rotateLogs(root), { code: 'EEXIST' });
    assert.equal(readFileSync(log, 'utf8'), 'new-writer-marker');
    const directory = readdirSync(join(root, 'docs/archive'))[0];
    assert.equal(readFileSync(join(root, 'docs/archive', directory, 'memory.md'), 'utf8'), original);
  } finally {
    fs.renameSync = rename;
    syncBuiltinESMExports();
    rmSync(root, { recursive: true, force: true });
  }
});
