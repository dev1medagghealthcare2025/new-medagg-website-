const fs = require('node:fs');
const path = require('node:path');

const distDir = path.resolve(__dirname, '..', 'dist');
const publicFile = path.resolve(__dirname, '..', 'public', 'google5f869c9128547998.html');
const distFile = path.resolve(distDir, 'google5f869c9128547998.html');
const content = 'google-site-verification: google5f869c9128547998.html\n';

fs.mkdirSync(distDir, { recursive: true });

if (fs.existsSync(publicFile)) {
  fs.copyFileSync(publicFile, distFile);
} else {
  fs.writeFileSync(distFile, content, 'utf8');
}

if (fs.readFileSync(distFile, 'utf8').trim() !== content.trim()) {
  throw new Error('Google verification file content is incorrect in dist/');
}

console.log('[google-verification] Wrote', distFile);
