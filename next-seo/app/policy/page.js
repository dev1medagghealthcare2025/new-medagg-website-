'use client';

import dynamic from 'next/dynamic';

const PolicyPage = dynamic(() => import('../../../src/pages/policy'), { ssr: false });

export default function Page() {
  return <PolicyPage />;
}
