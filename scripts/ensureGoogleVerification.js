const fs = require('node:fs');
const path = require('node:path');

const distDir = path.resolve(__dirname, '..', 'dist');
const publicFile = path.resolve(__dirname, '..', 'public', 'google5f869c9128547998.html');
const distFile = path.resolve(distDir, 'google5f869c9128547998.html');
const content = 'google-site-verification: google5f869c9128547998.html';

fs.mkdirSync(distDir, { recursive: true });

if (fs.existsSync(publicFile)) {
  const publicContent = fs.readFileSync(publicFile, 'utf8').trim();
  if (publicContent !== content) {
    fs.writeFileSync(publicFile, content, 'utf8');
  }
} else {
  fs.writeFileSync(publicFile, content, 'utf8');
}

fs.writeFileSync(distFile, content, 'utf8');

const written = fs.readFileSync(distFile, 'utf8');
if (written !== content) {
  throw new Error(`Google verification file content mismatch. Got ${written.length} chars, expected ${content.length}.`);
}

console.log('[google-verification] Wrote exact verification file to', distFile);
