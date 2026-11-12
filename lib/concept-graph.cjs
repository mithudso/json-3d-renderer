const { parse } = require('acorn');
const { parse: parseHtml } = require('parse5');

const COLORS = Object.freeze([
  '#ffffff', 'hsl(0, 62%, 60%)', 'hsl(138, 62%, 60%)', 'hsl(275, 62%, 60%)',
  'hsl(53, 62%, 60%)', 'hsl(190, 62%, 60%)', 'hsl(328, 62%, 60%)',
  'hsl(105, 62%, 60%)', 'hsl(243, 62%, 60%)', 'hsl(20, 62%, 60%)',
]);

/** Validate a concept array and build a graph without mutating the input.
 * Missing parents are allowed as disconnected fragments. Cycles and duplicate ids fail.
 * Legacy templates interpolate names into HTML tooltips, so names containing < fail closed.
 */
function buildGraph(tree) {
  if (!Array.isArray(tree)) throw new TypeError('Expected a concept array');
  const concepts = new Map();
  for (const item of tree) {
    if (!item || typeof item.concept !== 'string' || !item.concept.trim() || item.concept.includes('<') ||
        !(item.parentConcept == null || typeof item.parentConcept === 'string') ||
        !(item.childConcepts == null || (Array.isArray(item.childConcepts) && item.childConcepts.every((child) => typeof child === 'string'))) ||
        !(item.researchedAt == null || typeof item.researchedAt === 'string') || concepts.has(item.concept)) {
      throw new TypeError('Invalid or duplicate concept');
    }
    concepts.set(item.concept, item);
  }
  // Resolve each ancestry once. A branch starts below a root or at a dangling fragment.
  const groups = new Map();
  for (const item of tree) {
    const chain = [];
    const visiting = new Set();
    let current = item;
    while (current && !groups.has(current.concept)) {
      if (visiting.has(current.concept)) throw new TypeError('Cyclic parents');
      visiting.add(current.concept);
      chain.push(current);
      current = concepts.get(current.parentConcept);
    }
    for (const entry of chain.reverse()) {
      const parent = concepts.get(entry.parentConcept);
      const group = parent && parent.parentConcept != null ? groups.get(parent.concept) : entry.concept;
      groups.set(entry.concept, group);
    }
  }
  const colors = new Map();
  const nodes = tree.map((item) => {
    const group = groups.get(item.concept);
    if (!colors.has(group)) colors.set(group, COLORS[colors.size % COLORS.length]);
    const isRoot = item.parentConcept == null;
    const isGroup = Boolean(item.childConcepts?.length);
    return { id: item.concept, name: item.concept, isRoot, isGroup, group, color: colors.get(group),
      val: isRoot ? 40 : isGroup ? 16 : 8,
      desc: item.researchedAt ? `Researched on ${item.researchedAt}` : '',
      leafCount: item.childConcepts?.length || 0 };
  });
  // A missing parent has no rendered endpoint; retain the node as a fragment.
  const links = tree.filter((item) => concepts.has(item.parentConcept))
    .map((item) => ({ source: item.parentConcept, target: item.concept }));
  return { nodes, links };
}

/** Replace exactly one top-level const DATA JSON object in a trusted classic script.
 * parse5 supplies HTML locations; Acorn supplies JS boundaries without executing code.
 */
function renderHtml(html, graph) {
  const options = { ecmaVersion: 'latest', sourceType: 'script' };
  let blocks;
  try {
    const program = parse(html, options);
    // Annex B HTML-style comments can consume a whole HTML document as empty JS.
    if (!program.body.length) throw new TypeError('Expected a bare JavaScript program');
    blocks = [{ program, code: html, offset: 0 }];
  } catch {
    blocks = [];
    const pending = [parseHtml(html, { sourceCodeLocationInfo: true })];
    while (pending.length) {
      const node = pending.pop();
      if (node.tagName === 'script') {
        const location = node.sourceCodeLocation;
        if (!location?.endTag) throw new TypeError('Expected a closed script element');
        const offset = location.startTag.endOffset;
        const code = html.slice(offset, location.endTag.startOffset);
        blocks.push({ program: parse(code, options), code, offset });
      }
      // Template contents are inert and live outside childNodes; do not inspect them.
      for (const child of node.childNodes || []) pending.push(child);
    }
  }
  const declarations = [];
  for (const { program, code, offset } of blocks) {
    for (const statement of program.body) {
      if (statement.type !== 'VariableDeclaration' || statement.kind !== 'const') continue;
      for (const declaration of statement.declarations) {
        if (declaration.id.type === 'Identifier' && declaration.id.name === 'DATA') {
          declarations.push({ expression: declaration.init, code, offset });
        }
      }
    }
  }
  if (declarations.length !== 1) throw new TypeError('Expected one DATA declaration');
  const { expression, code, offset } = declarations[0];
  if (expression?.type !== 'ObjectExpression') throw new TypeError('Expected a DATA object');
  JSON.parse(code.slice(expression.start, expression.end));
  const json = JSON.stringify(graph).replace(/[<\u2028\u2029]/g, (char) =>
    `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`);
  return html.slice(0, offset + expression.start) + json + html.slice(offset + expression.end);
}

module.exports = { buildGraph, renderHtml };
