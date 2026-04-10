'use client';

import dynamic from 'next/dynamic';

const RadiofrequencyAblationAVM = dynamic(() => import('../../../src/pages/RadiofrequencyAblationAVM'), { ssr: false });

export default function Page() {
  return <RadiofrequencyAblationAVM />;
}
