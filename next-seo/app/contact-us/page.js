'use client';

import dynamic from 'next/dynamic';

const ContactUsPage = dynamic(() => import('../../../src/pages/contact_us_page'), { ssr: false });

export default function Page() {
  return <ContactUsPage />;
}
