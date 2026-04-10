'use client';

import dynamic from 'next/dynamic';

const BecomeInvestor = dynamic(() => import('../../../src/pages/Become_an_investor'), { ssr: false });

export default function Page() {
  return <BecomeInvestor />;
}
