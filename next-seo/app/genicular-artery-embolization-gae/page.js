'use client';

import dynamic from 'next/dynamic';

const GAE_Treatmentpage = dynamic(() => import('../../../src/pages/GAE_Treatmentpage'), { ssr: false });

export default function Page() {
  return <GAE_Treatmentpage />;
}
