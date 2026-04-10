'use client';

import dynamic from 'next/dynamic';

const TAVI = dynamic(() => import('../../../src/pages/Transcatheter_aortic_valve_implantation'), { ssr: false });

export default function Page() {
  return <TAVI />;
}
