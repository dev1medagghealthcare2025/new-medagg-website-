'use client';

import dynamic from 'next/dynamic';

const TermsConditionPage = dynamic(() => import('../../../src/pages/terms_condition'), { ssr: false });

export default function Page() {
  return <TermsConditionPage />;
}
