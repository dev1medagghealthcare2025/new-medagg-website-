import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
  ],
  build: {
    target: 'es2018',
  },
  // Ensure assets are referenced from the root in production
  base: '/',
});
