const fs = require('node:fs');
const path = require('node:path');
const { buildGraph, renderHtml } = require('./lib/concept-graph.cjs');

/** Generate a new page from explicit local input. Never overwrite an existing file. */
function main(args = process.argv.slice(2)) {
  if (args.length < 2 || args.length > 3 || args.some((arg) => arg.startsWith('--'))) {
    console.error('Usage: node inject-data.js <tree.json> <new-output.html> [template.html]');
    return 2;
  }
  const [input, output, template = path.join(__dirname, 'concept-tree-3d.html')] = args.map((arg) => path.resolve(arg));
  if (output === input || output === template) {
    console.error(JSON.stringify({ event: 'generation_failed', code: 'OUTPUT_CONFLICT' }));
    return 1;
  }
  let stage = 'INPUT_READ';
  console.log(JSON.stringify({ event: 'generation_started' }));
  try {
    const tree = JSON.parse(fs.readFileSync(input, 'utf8'));
    stage = 'GRAPH_VALIDATION';
    const graph = buildGraph(tree);
    stage = 'TEMPLATE_READ';
    const html = fs.readFileSync(template, 'utf8');
    stage = 'TEMPLATE_VALIDATION';
    const rendered = renderHtml(html, graph);
    stage = 'OUTPUT_WRITE';
    fs.writeFileSync(output, rendered, { flag: 'wx' });
    console.log(JSON.stringify({ event: 'generation_completed', nodes: graph.nodes.length, links: graph.links.length }));
    return 0;
  } catch (error) {
    // Do not log source data, JSON parser excerpts, local paths or stack traces.
    console.error(JSON.stringify({ event: 'generation_failed', code: `${stage}_FAILED`,
      cause: /^[A-Z_]+$/.test(error.code || '') ? error.code : 'INVALID_DATA' }));
    return 1;
  }
}

module.exports = { main };
if (require.main === module) process.exitCode = main();
