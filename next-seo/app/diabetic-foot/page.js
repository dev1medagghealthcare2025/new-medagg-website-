'use client';

import dynamic from 'next/dynamic';

const DiabeticFootPage = dynamic(() => import('../../../src/pages/Diabetic _Foot'), { ssr: false });

export default function Page() {
  return <DiabeticFootPage />;
}
