'use client';

import dynamic from 'next/dynamic';

const Thyroid = dynamic(() => import('../../../src/pages/Thyroid_Nodule_Ablation_Treatmentpage'), { ssr: false });

export default function Page() {
  return <Thyroid />;
}
