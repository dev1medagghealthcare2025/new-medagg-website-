'use client';

import dynamic from 'next/dynamic';

const Home = dynamic(() => import('../../src/pages/Home'), { ssr: false });

export default function Page() {
  return <Home />;
}
