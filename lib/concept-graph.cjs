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

/** Replace exactly one JSON-object DATA declaration in a trusted template.
 * Scan JSON string boundaries so literal `};` inside a string cannot end the match.
 */
function renderHtml(html, graph) {
  const matches = [...html.matchAll(/\bconst DATA\s*=\s*/g)];
  if (matches.length !== 1) throw new TypeError('Expected one DATA declaration');
  const start = matches[0].index + matches[0][0].length;
  if (html[start] !== '{') throw new TypeError('Expected a DATA object');
  let depth = 0;
  let quoted = false;
  let escaped = false;
  let end = start;
  for (; end < html.length; end++) {
    const char = html[end];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === '{' || char === '[') depth++;
    else if (char === '}' || char === ']') {
      depth--;
      if (depth === 0) { end++; break; }
    }
  }
  JSON.parse(html.slice(start, end));
  if (!/^\s*;/.test(html.slice(end))) throw new TypeError('Expected DATA terminator');
  const json = JSON.stringify(graph).replace(/[<\u2028\u2029]/g, (char) =>
    `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`);
  return html.slice(0, start) + json + html.slice(end);
}

module.exports = { buildGraph, renderHtml };
