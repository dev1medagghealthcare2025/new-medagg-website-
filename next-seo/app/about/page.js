'use client';

import dynamic from 'next/dynamic';

const About = dynamic(() => import('../../../src/pages/About'), { ssr: false });

export default function Page() {
  return <About />;
}
