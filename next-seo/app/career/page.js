'use client';

import dynamic from 'next/dynamic';

const CareerPage = dynamic(() => import('../../../src/pages/career'), { ssr: false });

export default function Page() {
  return <CareerPage />;
}
