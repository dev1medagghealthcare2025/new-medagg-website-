'use client';

import dynamic from 'next/dynamic';

const UAEPage = dynamic(() => import('../../../src/pages/UAE'), { ssr: false });

export default function Page() {
  return <UAEPage />;
}
