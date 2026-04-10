'use client';

import dynamic from 'next/dynamic';

const Varicocele = dynamic(() => import('../../../src/pages/Varicocele_embolization'), { ssr: false });

export default function Page() {
  return <Varicocele />;
}
