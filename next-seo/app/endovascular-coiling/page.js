'use client';

import dynamic from 'next/dynamic';

const Endovascular_Coiling_treatment = dynamic(() => import('../../../src/pages/Endovascular_Coiling_treatment'), { ssr: false });

export default function Page() {
  return <Endovascular_Coiling_treatment />;
}
