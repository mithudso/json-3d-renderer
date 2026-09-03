const fs = require('fs');
const path = require('path');

async function main() {
  try {
    const treeDataPath = '/Users/mitch.hudson/.global-ai-hub/concept-tree/tree.json';
    const treeDataRaw = fs.readFileSync(treeDataPath, 'utf8');
    const treeData = JSON.parse(treeDataRaw);

    const nodes = [];
    const links = [];

    const colors = [
      "#ffffff", "hsl(0, 62%, 60%)", "hsl(138, 62%, 60%)", "hsl(275, 62%, 60%)", "hsl(53, 62%, 60%)",
      "hsl(190, 62%, 60%)", "hsl(328, 62%, 60%)", "hsl(105, 62%, 60%)", "hsl(243, 62%, 60%)", "hsl(20, 62%, 60%)"
    ];
    let colorIdx = 0;
    const groupColorMap = {};

    // Precompute map for O(1) lookups
    const conceptMap = new Map();
    for (const item of treeData) {
      conceptMap.set(item.concept, item);
    }

    for (const item of treeData) {
      const isRoot = item.parentConcept === null;
      const isGroup = item.childConcepts && item.childConcepts.length > 0;
      
      let group = item.concept;
      if (!isRoot && item.parentConcept) {
        let p = conceptMap.get(item.parentConcept);
        while (p && p.parentConcept) {
          group = p.parentConcept;
          p = conceptMap.get(p.parentConcept);
        }
      }

      if (!groupColorMap[group]) {
        groupColorMap[group] = colors[colorIdx % colors.length];
        colorIdx++;
      }

      nodes.push({
        id: item.concept,
        name: item.concept,
        isRoot,
        isGroup,
        group: group,
        color: groupColorMap[group],
        val: isRoot ? 40 : (isGroup ? 16 : 8),
        desc: `Researched on ${item.researchedAt}`,
        leafCount: item.childConcepts ? item.childConcepts.length : 0
      });

      if (item.parentConcept) {
        links.push({
          source: item.parentConcept,
          target: item.concept
        });
      }
    }

    const DATA = { nodes, links };

    const templatePath = path.join(__dirname, 'concept-tree-3d.html');
    const html = fs.readFileSync(templatePath, 'utf8');
    
    // Replace DATA using a function to avoid regex '$' replacement bugs, and handle multi-line objects
    const newHtml = html.replace(/const DATA\s*=\s*\{[\s\S]*?\};/, () => `const DATA = ${JSON.stringify(DATA)};`);

    const outputPath = path.join(__dirname, 'global-ai-hub-3d.html');
    fs.writeFileSync(outputPath, newHtml);
    console.log('Successfully generated global-ai-hub-3d.html');
  } catch (error) {
    console.error('Error injecting data:', error);
    process.exit(1);
  }
}

main();
