#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const MAX_LOG_BYTES = 200 * 1024;

/** Archive full originals before retaining each oversized log's latest version. */
export function rotateLogs(root) {
  const logs = ['memory.md', 'prompts.md'];
  if (readdirSync(root).some((name) => logs.some((log) =>
    name === `${log}~` || new RegExp(`^\\.?${log.replace('.', '\\.')}\\.sw[a-z]$`).test(name)))) {
    throw new Error('EDITOR_SWAP_PRESENT');
  }
  const rotated = [];
  for (const name of logs) {
    const path = join(root, name);
    if (!existsSync(path)) continue;
    const original = readFileSync(path, 'utf8');
    if (Buffer.byteLength(original) <= MAX_LOG_BYTES) continue;
    const sections = [...original.matchAll(/^## (?:v|Prompt v).+$/gm)];
    if (sections.length < 2) throw new Error('NO_ARCHIVABLE_SECTIONS');
    const archiveName = `${name.slice(0, -3)}-${createHash('sha256').update(original).digest('hex').slice(0, 16)}.md`;
    const archive = join(root, 'docs/archive', archiveName);
    mkdirSync(dirname(archive), { recursive: true });
    if (!existsSync(archive)) writeFileSync(archive, original, { flag: 'wx' });
    if (readFileSync(archive, 'utf8') !== original) throw new Error('ARCHIVE_MISMATCH');
    const retained = original.slice(0, sections[0].index) +
      `Previous entries: [archive](docs/archive/${archiveName}).\n\n` + original.slice(sections.at(-1).index);
    const temporary = `${path}.rotate-${process.pid}`;
    try {
      writeFileSync(temporary, retained, { flag: 'wx' });
      renameSync(temporary, path);
    } finally { rmSync(temporary, { force: true }); }
    rotated.push(name);
  }
  return rotated;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 2) throw new Error('USAGE_NO_ARGUMENTS');
    console.log(JSON.stringify({ event: 'workflow_logs_rotated', files: rotateLogs(resolve(dirname(fileURLToPath(import.meta.url)), '..')) }));
  } catch (error) {
    console.error(JSON.stringify({ event: 'workflow_log_rotation_failed', code: error.code || error.message }));
    process.exitCode = 1;
  }
}
