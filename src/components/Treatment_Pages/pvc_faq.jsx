import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: 'What is pelvic vein congestion syndrome?',
    answer: 'Pelvic vein congestion syndrome occurs when veins in the pelvis become enlarged and blood pools, causing chronic pelvic pain, heaviness, and discomfort.',
    isOpen: true,
  },
  {
    id: 2,
    question: 'Can pelvic vein congestion be treated without surgery?',
    answer: 'Yes. Pelvic vein embolization is a minimally invasive, non-surgical procedure that blocks abnormal veins and relieves symptoms without open surgery.',
  },
  {
    id: 3,
    question: 'How long does pelvic vein embolization take?',
    answer: 'The procedure typically takes 1-2 hours and is performed as a day-care treatment under local anesthesia with sedation.',
  },
  {
    id: 4,
    question: 'When can I return to normal activities?',
    answer: 'Most patients resume light daily activities within a few days and return to work within 1-2 weeks, depending on individual recovery.',
    isOpen: true,
  },
];

const PVC_FAQ = ({ city = '', variant = '' }) => {
  const cityLower = (city || '').toLowerCase();
  const variantLower = (variant || '').toLowerCase();
  const isChennai = variantLower === 'chennai' || cityLower === 'chennai';
  const isMadurai = variantLower === 'madurai' || cityLower === 'madurai';
  const isCoimbatore = variantLower === 'coimbatore' || cityLower === 'coimbatore';
  const isBangalore = variantLower === 'bangalore' || cityLower === 'bangalore' || cityLower === 'bengaluru';
  const isMangalore = variantLower === 'mangalore' || cityLower === 'mangalore' || cityLower === 'mangaluru';
  const isCitySpecific = isChennai || isMadurai || isCoimbatore || isBangalore || isMangalore;
  const cityName = isChennai
    ? 'Chennai'
    : isMadurai
      ? 'Madurai'
      : isCoimbatore
        ? 'Coimbatore'
        : isBangalore
          ? 'Bangalore'
          : isMangalore
            ? 'Mangalore'
            : '';

  const [faqs, setFaqs] = useState(faqData);

  const toggleFAQ = (id) => {
    setFaqs(faqs.map(faq =>
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false },
    ));
  };

  return (
    <section className='py-10 md:py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          <div className='flex flex-col justify-center'>
            <div className='flex flex-col mb-6'>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-2'>
                Frequently Asked Questions
              </h2>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3576] mb-4'>
                {isCitySpecific ? `Pelvic Vein Treatment in ${cityName}` : 'About Pelvic Vein Embolization'}
              </h2>
              <p className='text-gray-600 text-lg'>
                Got Questions? Find Quick Answers About Our Treatments And Patient Support.
              </p>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='space-y-4'>
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm'
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className='w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200'
                  >
                    <span className='text-gray-700 font-medium pr-4'>
                      {faq.question}
                    </span>
                    <div className='flex-shrink-0'>
                      {faq.isOpen ? (
                        <Minus className='w-6 h-6 text-[#ff3576]' />
                      ) : (
                        <Plus className='w-6 h-6 text-[#ff3576]' />
                      )}
                    </div>
                  </button>

                  {faq.isOpen && (
                    <div className='px-4 pb-4'>
                      <div className='bg-[#2d2552] p-4 rounded-lg'>
                        <p className='leading-relaxed text-white'>{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PVC_FAQ;
