const fs = require('fs');
const path = require('path');

const TARGET_DIRS = ['./components', './app'];

const REPLACEMENTS = [
  { match: /\bbg-white\b/g, replace: 'bg-card' },
  { match: /\btext-gray-900\b/g, replace: 'text-foreground' },
  { match: /\btext-gray-800\b/g, replace: 'text-foreground' },
  { match: /\btext-gray-700\b/g, replace: 'text-foreground' },
  { match: /\btext-gray-600\b/g, replace: 'text-muted-foreground' },
  { match: /\btext-gray-500\b/g, replace: 'text-muted-foreground' },
  { match: /\bbg-gray-50\b/g, replace: 'bg-muted/50' },
  { match: /\bbg-gray-100\b/g, replace: 'bg-muted' },
  { match: /\bbg-gray-200\b/g, replace: 'bg-accent' },
  { match: /\bborder-gray-100\b/g, replace: 'border-border' },
  { match: /\bborder-gray-200\b/g, replace: 'border-border' },
  { match: /\bborder-gray-300\b/g, replace: 'border-border/80' },
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

let modifiedCount = 0;

TARGET_DIRS.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = walk(dir);
    files.forEach(file => {
      let content = fs.readFileSync(file, 'utf8');
      let original = content;
      
      REPLACEMENTS.forEach(({ match, replace }) => {
        content = content.replace(match, replace);
      });
      
      if (original !== content) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated colors in: ${file}`);
        modifiedCount++;
      }
    });
  }
});

console.log(`Complete. Modified ${modifiedCount} files.`);
