'use client';

import dynamic from 'next/dynamic';

const Y90_TAREPage = dynamic(() => import('../../../src/pages/Y90_TARE'), { ssr: false });

export default function Page() {
  return <Y90_TAREPage />;
}
