'use client';

import dynamic from 'next/dynamic';

const BreastNoduleCryoablationPage = dynamic(() => import('../../../src/pages/Breast_nodule_cryoablation'), { ssr: false });

export default function Page() {
  return <BreastNoduleCryoablationPage />;
}
