/**
 * Mirror HTML under /sketch-threejs/ so Vercel serves the same paths as GitHub Pages.
 * Assets stay at /js, /css, etc. and are mapped via vercel.json rewrites.
 */
const fs = require('fs');
const path = require('path');

const docs = path.join(__dirname, '..', 'docs');
const base = path.join(docs, 'sketch-threejs');
const sketchSrc = path.join(docs, 'sketch');
const sketchDest = path.join(base, 'sketch');

fs.mkdirSync(sketchDest, { recursive: true });

const indexSrc = path.join(docs, 'index.html');
if (!fs.existsSync(indexSrc)) {
  console.error('vercel-output: docs/index.html not found — run gulp build first');
  process.exit(1);
}

fs.copyFileSync(indexSrc, path.join(base, 'index.html'));

for (const file of fs.readdirSync(sketchSrc)) {
  if (file.endsWith('.html')) {
    fs.copyFileSync(path.join(sketchSrc, file), path.join(sketchDest, file));
  }
}

console.log('vercel-output: copied index + sketch pages to docs/sketch-threejs/');
