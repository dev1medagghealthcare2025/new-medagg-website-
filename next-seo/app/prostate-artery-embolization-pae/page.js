'use client';

import dynamic from 'next/dynamic';

const PAE_Treatmentpage = dynamic(() => import('../../../src/pages/PAE_Treatmentpage'), { ssr: false });

export default function Page() {
  return <PAE_Treatmentpage />;
}
