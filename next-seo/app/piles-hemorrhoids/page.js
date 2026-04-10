'use client';

import dynamic from 'next/dynamic';

const Hemorrhoidal = dynamic(() => import('../../../src/pages/Hemorrhoidal'), { ssr: false });

export default function Page() {
  return <Hemorrhoidal />;
}
