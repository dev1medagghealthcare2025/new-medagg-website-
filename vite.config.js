import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          '@babel/plugin-transform-optional-chaining',
          '@babel/plugin-transform-nullish-coalescing-operator',
        ],
      },
    }),
    {
      name: 'irpreneur2025-landing-page',
      configureServer(server) {
        const root = server.config.root;
        const landingRoot = path.resolve(root, 'medagg-landing-page');
        const landingIndex = path.resolve(landingRoot, 'index.html');
        const landingPublicDir = path.resolve(landingRoot, 'public');

        const getContentType = (filePath) => {
          const ext = path.extname(filePath).toLowerCase();
          if (ext === '.html') return 'text/html';
          if (ext === '.js') return 'application/javascript';
          if (ext === '.css') return 'text/css';
          if (ext === '.json') return 'application/json';
          if (ext === '.svg') return 'image/svg+xml';
          if (ext === '.png') return 'image/png';
          if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
          if (ext === '.gif') return 'image/gif';
          if (ext === '.webp') return 'image/webp';
          if (ext === '.ico') return 'image/x-icon';
          return 'application/octet-stream';
        };

        server.middlewares.use((req, res, next) => {
          try {
            const url = req.originalUrl || req.url || '';
            const cleanUrl = url.split('?')[0].split('#')[0];

            if (cleanUrl === '/irpreneur2025' || cleanUrl === '/irpreneur2025/') {
              if (!fs.existsSync(landingIndex)) {
                res.statusCode = 404;
                res.end('Landing page not found');
                return;
              }

              const rawHtml = fs.readFileSync(landingIndex, 'utf8');
              const rewrittenHtml = rawHtml.replace(
                /<script\s+type="module"\s+src="\/[^"]*">\s*<\/script>/,
                '<script type="module" src="/medagg-landing-page/src/main.jsx"></script>',
              );

              server.transformIndexHtml('/irpreneur2025', rewrittenHtml).then((html) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
              }, next);
              return;
            }

            if (cleanUrl && cleanUrl.startsWith('/') && !cleanUrl.startsWith('/@')) {
              const rawRel = cleanUrl.slice(1);
              let rel = rawRel;
              try {
                rel = decodeURIComponent(rawRel);
              } catch {
                rel = rawRel;
              }
              if (rel && !rel.includes('..')) {
                const candidate = path.resolve(landingPublicDir, rel);
                if (candidate.startsWith(landingPublicDir) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', getContentType(candidate));
                  fs.createReadStream(candidate).pipe(res);
                  return;
                }
              }
            }
          } catch {}
          next();
        });
      },
    },
  ],
  build: {
    target: 'es2018',
  },
  // Ensure assets are referenced from the root in production
  base: '/',
  server: {
    // Firebase Phone Auth often fails on "localhost" — use http://127.0.0.1:5173
    host: '127.0.0.1',
    port: 5173,
    headers: {
      // Empty Permissions-Policy to suppress experimental feature warnings
      'Permissions-Policy': '',
    },
  },
});
