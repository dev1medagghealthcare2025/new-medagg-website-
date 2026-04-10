'use client';

import dynamic from 'next/dynamic';

const TACE = dynamic(() => import('../../../src/pages/Transarterial_Chemoembolization'), { ssr: false });

export default function Page() {
  return <TACE />;
}
