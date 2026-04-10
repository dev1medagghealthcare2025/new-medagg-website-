'use client';

import dynamic from 'next/dynamic';

const RFA = dynamic(() => import('../../../src/pages/RFA_treatmentpage'), { ssr: false });

export default function Page() {
  return <RFA />;
}
