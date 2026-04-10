'use client';

import dynamic from 'next/dynamic';

const BreastNoduleVAEPage = dynamic(() => import('../../../src/pages/Breast_Nodule_VAE'), { ssr: false });

export default function Page() {
  return <BreastNoduleVAEPage />;
}
