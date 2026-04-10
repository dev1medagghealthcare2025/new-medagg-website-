'use client';

import dynamic from 'next/dynamic';

const VaricoseVeinPage = dynamic(() => import('../../../src/pages/varicosevein'), { ssr: false });

export default function Page() {
  return <VaricoseVeinPage />;
}
