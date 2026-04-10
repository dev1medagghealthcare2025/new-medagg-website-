'use client';

import dynamic from 'next/dynamic';

const CTO_treatmentpage = dynamic(() => import('../../../src/pages/CTO_treatmentpage'), { ssr: false });

export default function Page() {
  return <CTO_treatmentpage />;
}
