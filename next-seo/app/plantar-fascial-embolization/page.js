'use client';

import dynamic from 'next/dynamic';

const Planter = dynamic(() => import('../../../src/pages/Planter'), { ssr: false });

export default function Page() {
  return <Planter />;
}
