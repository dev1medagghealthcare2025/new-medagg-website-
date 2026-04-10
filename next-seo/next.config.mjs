/** @type {import('next').NextConfig} */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingRoot: projectRoot,
  experimental: {
    externalDir: true,
  },
  async redirects() {
    return [
      { source: '/pae', destination: '/prostate-artery-embolization-pae', permanent: true },
      { source: '/gae', destination: '/genicular-artery-embolization-gae', permanent: true },
      { source: '/thyroid', destination: '/thyroid-nodule-ablation', permanent: true },
      { source: '/fte', destination: '/fallopian-tube-recanalization-ftr', permanent: true },
      { source: '/uae', destination: '/uterine-artery-embolization-uae', permanent: true },
      { source: '/pfe', destination: '/plantar-fascial-embolization', permanent: true },
      { source: '/hemorrhoidal', destination: '/piles-hemorrhoids', permanent: true },
      { source: '/privacy-policy', destination: '/policy', permanent: true },
      { source: '/book-an-appointment', destination: '/contact-us', permanent: false },
      { source: '/book-appointment', destination: '/contact-us', permanent: false },
    ];
  },
  webpack: (config, { webpack }) => {
    const blogCssAbs = path.resolve('../src/assets/css/blog.css');

    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        'import.meta.env': 'process.env',
      })
    );
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'lucide-react': path.resolve('./node_modules/lucide-react'),
      'react-router-dom': path.resolve('./shims/react-router-dom.js'),
      [blogCssAbs]: path.resolve('./shims/empty-style.js'),
    };
    return config;
  },
};

export default nextConfig;
