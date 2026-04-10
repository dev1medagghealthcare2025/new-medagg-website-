'use client';

import dynamic from 'next/dynamic';

const BreastNoduleRadiofrequencyAblation = dynamic(() => import('../../../src/pages/Breast_nodule_ radiofrequency_ablation'), { ssr: false });

export default function Page() {
  return <BreastNoduleRadiofrequencyAblation />;
}
