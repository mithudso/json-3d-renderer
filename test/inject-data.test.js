import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const script = new URL('../inject-data.js', import.meta.url);
const require = createRequire(script);
const node = (concept, parentConcept = null) => ({ concept, parentConcept });

// Exercise the original CLI with synthetic I/O; never read its old private default.
function generate(data, template = 'const DATA = {"nodes":[],"links":[]};') {
  let output;
  const messages = [];
  const module = { exports: {} };
  const process = { argv: ['node', 'inject-data.js', 'tree.json', 'out.html', 'template.html'], exitCode: 0,
    exit(code) { this.exitCode = code; } };
  const load = (name) => ['fs', 'node:fs'].includes(name) ? {
    readFileSync: (path) => path.endsWith('tree.json') ? JSON.stringify(data) : template,
    writeFileSync: (_path, text) => { output = text; },
  } : require(name);
  load.main = module;
  vm.runInNewContext(readFileSync(script, 'utf8'), {
    require: load, module, process, __dirname: new URL('..', script).pathname,
    console: { log: (text) => messages.push(text), error: (text) => messages.push(text) },
  }, { timeout: 1000 });
  return { output, messages, status: process.exitCode };
}

test('cyclic parents fail before writing output', () => {
  const result = generate([node('a', 'b'), node('b', 'a')]);
  assert.equal(result.status, 1);
  assert.equal(result.output, undefined);
});

test('prototype-like concept names receive string colors', () => {
  const result = generate([node('__proto__'), node('constructor'), node('toString')]);
  assert.equal(result.status, 0);
  const graph = vm.runInNewContext(`${result.output}\nDATA`);
  assert.ok(graph.nodes.every((item) => typeof item.color === 'string'));
});

test('markup names fail closed before reaching unsafe legacy tooltips', () => {
  const result = generate([node('</script><img src=x onerror=alert(1)>')]);
  assert.equal(result.status, 1);
  assert.equal(result.output, undefined);
  assert.ok(result.messages.every((line) => !line.includes('onerror')));
});

test('template replacement respects string delimiters and literal dollar sequences', () => {
  const result = generate([node('$& $` $\'')], 'const DATA = {"nodes":[{"id":"x};y"}],"links":[]};');
  assert.equal(result.status, 0);
  const graph = vm.runInNewContext(`${result.output}\nDATA`);
  assert.equal(graph.nodes[0].id, '$& $` $\'');
});

test('missing or ambiguous DATA declarations fail before writing', () => {
  for (const template of ['const DATA = [];', 'const DATA = {}; const DATA = {};', 'no data here']) {
    const result = generate([node('a')], template);
    assert.equal(result.status, 1);
    assert.equal(result.output, undefined);
  }
});

test('descendants keep their top-level branch color', () => {
  const result = generate([node('root'), node('group', 'root'), node('leaf', 'group')]);
  const graph = vm.runInNewContext(`${result.output}\nDATA`);
  assert.equal(graph.nodes[1].group, graph.nodes[2].group);
  assert.equal(graph.nodes[1].color, graph.nodes[2].color);
});

test('DATA declaration text inside strings, comments and regex literals is data', () => {
  const { buildGraph, renderHtml } = require('./lib/concept-graph.cjs');
  const template = '<p>It\'s a template</p><script>' +
    'const pattern = /["\']/; const label = "const DATA = "; /* const DATA = {}; */\n' +
    'const DATA = {"note":"const DATA = "};</script>';
  const first = renderHtml(template, buildGraph([node('const DATA = ')]));
  const second = renderHtml(first, buildGraph([node('replacement')]));
  assert.match(second, /"name":"replacement"/);
  assert.match(second, /const label = "const DATA = "/);
});

test('malformed records and duplicate ids fail without mutating input', () => {
  const { buildGraph } = require('./lib/concept-graph.cjs');
  for (const input of [{}, [null], [node('')], [node('x'), node('x')],
    [{ concept: 'a', childConcepts: {} }], [{ concept: 'a', researchedAt: {} }]]) {
    assert.throws(() => buildGraph(input), TypeError);
  }
  const input = Object.freeze([Object.freeze(node('fragment', 'missing'))]);
  assert.deepEqual(buildGraph(input).links, []);
  assert.equal(buildGraph(input).nodes[0].id, 'fragment');
});

test('deep ancestry resolves iteratively and serialization keeps script boundaries', () => {
  const { buildGraph, renderHtml } = require('./lib/concept-graph.cjs');
  const tree = Array.from({ length: 10000 }, (_, i) => node(`n${i}`, i ? `n${i - 1}` : null));
  const graph = buildGraph(tree.reverse());
  assert.equal(graph.nodes.length, 10000);
  assert.equal(graph.nodes[0].group, 'n1');
  const rendered = renderHtml('<script>const DATA = {};</script>',
    buildGraph([{ ...node('safe'), researchedAt: '</script>\u2028' }]));
  assert.equal((rendered.match(/<\/script>/g) || []).length, 1);
  assert.match(rendered, /\\u003c\/script>/);
  assert.match(rendered, /\\u2028/);
});

test('real CLI creates output once, reports outcomes, and protects existing files', () => {
  const dir = mkdtempSync(join(tmpdir(), 'j3d-generate-'));
  const input = join(dir, 'input.json');
  const output = join(dir, 'output.html');
  const template = join(dir, 'template.html');
  const run = (...args) => spawnSync(process.execPath, [fileURLToPath(script), ...args], { encoding: 'utf8', timeout: 5000 });
  try {
    writeFileSync(input, JSON.stringify([node('safe')]));
    writeFileSync(template, '<script>const DATA = {};</script>');
    const created = run(input, output, template);
    assert.equal(created.status, 0, created.stderr);
    assert.deepEqual(created.stdout.trim().split('\n').map(JSON.parse).map((row) => row.event),
      ['generation_started', 'generation_completed']);
    assert.match(readFileSync(output, 'utf8'), /"name":"safe"/);
    const repeated = run(input, output, template);
    assert.equal(repeated.status, 1);
    assert.equal(JSON.parse(repeated.stderr).cause, 'EEXIST');
    assert.match(readFileSync(output, 'utf8'), /"name":"safe"/);
    assert.equal(run(input, input, template).status, 1);
    assert.equal(run().status, 2);
    writeFileSync(input, '{private-fixture-content');
    const failed = run(input, join(dir, 'invalid.html'), template);
    assert.equal(failed.status, 1);
    assert.equal(JSON.parse(failed.stderr).code, 'INPUT_READ_FAILED');
    assert.ok(!failed.stderr.includes('private-fixture-content'));
    assert.ok(!existsSync(join(dir, 'invalid.html')));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('parser selects DATA after return-regex and handles quoted script attributes', () => {
  const { buildGraph, renderHtml } = require('./lib/concept-graph.cjs');
  for (const opening of ['<script>', '<script data-note=">">']) {
    const template = opening + 'function pattern(){ return /const DATA = {};/; } const DATA = {};</script>';
    const rendered = renderHtml(template, buildGraph([node('actual')]));
    const code = rendered.slice(opening.length, -'</script>'.length);
    assert.equal(vm.runInNewContext(code + '\nDATA').nodes[0].name, 'actual');
  }
});
