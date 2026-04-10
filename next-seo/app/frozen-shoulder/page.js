'use client';

import dynamic from 'next/dynamic';

const FrozenShoulderPage = dynamic(() => import('../../../src/pages/frozen_shoulder'), { ssr: false });

export default function Page() {
  return <FrozenShoulderPage />;
}
