const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

function ensureEmptyDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const repoRoot = path.resolve(__dirname, '..');
  const landingRoot = path.resolve(repoRoot, 'medagg-landing-page');
  const landingDist = path.resolve(landingRoot, 'dist');
  const landingNodeModules = path.resolve(landingRoot, 'node_modules');

  const mainDist = path.resolve(repoRoot, 'dist');
  const targetDir = path.resolve(mainDist, 'irpreneur2025');

  if (!fs.existsSync(landingNodeModules)) {
    console.log('[irpreneur2025] Installing landing page dependencies (npm ci)...');
    execSync('npm ci', {
      cwd: landingRoot,
      stdio: 'inherit',
      env: { ...process.env },
    });
  }

  console.log('[irpreneur2025] Building landing page...');
  execSync('npm run build', {
    cwd: landingRoot,
    stdio: 'inherit',
    env: { ...process.env },
  });

  if (!fs.existsSync(landingDist)) {
    throw new Error(`[irpreneur2025] Landing build did not produce dist at: ${landingDist}`);
  }

  console.log(`[irpreneur2025] Copying ${landingDist} -> ${targetDir}`);
  ensureEmptyDir(targetDir);
  copyDir(landingDist, targetDir);

  console.log('[irpreneur2025] Done.');
}

main();
