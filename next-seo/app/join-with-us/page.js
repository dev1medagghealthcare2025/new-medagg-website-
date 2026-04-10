'use client';

import dynamic from 'next/dynamic';

const JoinWithUs = dynamic(() => import('../../../src/pages/Join_with_us'), { ssr: false });

export default function Page() {
  return <JoinWithUs />;
}
