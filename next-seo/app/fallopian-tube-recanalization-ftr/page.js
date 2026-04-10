'use client';

import dynamic from 'next/dynamic';

const FTE = dynamic(() => import('../../../src/pages/FTE'), { ssr: false });

export default function Page() {
  return <FTE />;
}
