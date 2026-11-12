#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, renameSync, rmSync, linkSync, lstatSync, mkdtempSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const MAX_LOG_BYTES = 200 * 1024;

function versionSections(text) {
  const sections = [];
  let offset = 0;
  let fence = '';
  for (const line of text.split(/(?<=\n)/)) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length &&
          line.slice(marker[0].length).trim() === '') fence = '';
    } else if (!fence && /^## (?:v\d+(?:\.\d+){0,2}|Prompt v\d+)(?: - [^\r\n]+)?\s*$/.test(line)) {
      sections.push({ index: offset });
    }
    offset += line.length;
  }
  return sections;
}

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
    const stat = lstatSync(path);
    if (!stat.isFile()) throw new Error('LOG_NOT_REGULAR');
    const original = readFileSync(path, 'utf8');
    if (Buffer.byteLength(original) <= MAX_LOG_BYTES) continue;
    const sections = versionSections(original);
    if (sections.length < 2) throw new Error('NO_ARCHIVABLE_SECTIONS');
    const archiveRoot = join(root, 'docs/archive');
    mkdirSync(archiveRoot, { recursive: true });
    // A private, exclusively created directory owns all temporary and archive paths.
    const directory = mkdtempSync(join(archiveRoot, `${name.slice(0, -3)}-`));
    const archive = join(directory, name);
    const temporary = join(directory, 'retained.tmp');
    const mode = stat.mode & 0o777;
    writeFileSync(join(directory, 'snapshot.md'), original, { flag: 'wx', mode });
    const archiveLink = `docs/archive/${directory.slice(archiveRoot.length + 1)}/${name}`;
    const retained = original.slice(0, sections[0].index) +
      `Previous entries: [archive](${archiveLink}).\n\n` + original.slice(sections.at(-1).index);
    let temporaryCreated = false;
    let retired = false;
    try {
      writeFileSync(temporary, retained, { flag: 'wx', mode });
      temporaryCreated = true;
      // Capture the live inode, including any editor atomic save since the initial read.
      renameSync(path, archive);
      retired = true;
      if (readFileSync(archive, 'utf8') !== original) throw new Error('LOG_CHANGED_DURING_ROTATION');
      // Never replace a new file that another writer created during the retirement gap.
      linkSync(temporary, path);
    } catch (error) {
      if (retired) {
        try { linkSync(archive, path); }
        catch (restoreError) { if (restoreError.code !== 'EEXIST') throw restoreError; }
      }
      throw error;
    } finally {
      if (temporaryCreated) rmSync(temporary);
    }
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
