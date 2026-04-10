'use client';

import dynamic from 'next/dynamic';

const Testimonials = dynamic(() => import('../../../src/pages/Testiominal'), { ssr: false });

export default function Page() {
  return <Testimonials />;
}
