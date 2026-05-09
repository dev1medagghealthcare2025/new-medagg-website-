import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: 'How long is the recovery?',
    answer: 'Recovery is quick—most patients return to normal activities within 1-2 days. You may experience mild soreness or bruising at the treatment site, but this is temporary and manageable with over-the-counter pain medications.',
    isOpen: true,
  },
  {
    id: 2,
    question: 'Will the lump come back?',
    answer: "Once the nodule is fully removed through VAE, the same lump won't return. However, it's important to note that new nodules may form later as this is a natural process that can occur in breast tissue.",
  },
  {
    id: 3,
    question: 'Are these procedures safe?',
    answer: 'Yes, VAE is very safe with a low risk of complications. The procedure is performed under imaging guidance (ultrasound or mammography) and uses only local anesthesia, eliminating the risks associated with general anesthesia.',
  },
  {
    id: 4,
    question: 'Will I need surgery later?',
    answer: 'Usually not. If the nodule is confirmed to be benign and is fully removed during the VAE procedure, no further surgical treatment is typically needed. Regular follow-up appointments will be scheduled to monitor your recovery.',
    isOpen: true,
  },
  {
    id: 5,
    question: 'What are the cosmetic results like?',
    answer: 'Excellent cosmetic results are one of the main advantages of VAE. The procedure leaves minimal scarring (usually just a small mark from the needle entry) and causes no changes to breast shape or size.',
    isOpen: true,
  },
  {
    id: 6,
    question: 'Are these procedures painful?',
    answer: 'Vacuum-Assisted Excision is performed under local anesthesia, so most patients experience little to no pain during the procedure. You may feel mild discomfort or pressure, but it is generally well tolerated. Post-procedure discomfort is minimal and can be managed with standard pain relief.',
    isOpen: true,
  },
  {
    id: 7,
    question: 'How long does the procedure take?',
    answer: "The VAE procedure typically takes 30-60 minutes, depending on the size and location of the nodule. It's performed as an outpatient procedure, meaning you can go home the same day.",
    isOpen: true,
  },
];

const BreastNoduleFaq = () => {
  const [faqs, setFaqs] = useState(faqData);
  const [question, setQuestion] = useState('');
  const [showFullLongAnswer, setShowFullLongAnswer] = useState(false); // only for id: 8
  const [showMoreMobile, setShowMoreMobile] = useState(false); // mobile: show more/less

  const toggleFAQ = (id) => {
    setFaqs(faqs.map(faq =>
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false },
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      console.log('Question submitted:', question);
      setQuestion('');
      // Here you would typically send the question to your backend
    }
  };

  return (
    <section className='py-10 md:py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main grid layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>

          {/* Left side - FAQ Header and Question Form */}
          <div className='flex flex-col justify-center'>
            {/* Header section using flexbox */}
            <div className='flex flex-col mb-6'>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-2'>
                Frequently Asked
              </h2>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3576] mb-4'>
                Questions
              </h2>
              <p className='text-gray-600 text-lg'>
                Got Questions? Find Quick Answers About Our Treatments And Patient Support.
              </p>
            </div>

            {/* Can't Locate Answer section */}
            <div className='mb-8'>
            </div>
          </div>

          {/* Right side - FAQ Accordion (Mobile) */}
          <div className='flex flex-col md:hidden'>
            <div className='space-y-4'>
              {(showMoreMobile ? faqs : faqs.slice(0, 3)).map((faq) => (
                <div
                  key={faq.id}
                  className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm'
                >
                  {/* Question header using flexbox */}
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

                  {/* Answer section with smooth transition */}
                  {faq.isOpen && (
                    <div className='px-4 pb-4'>
                      <div className='bg-[#2d2552] p-4 rounded-lg'>
                        {faq.id === 8 ? (
                          <>
                            <p
                              className='leading-relaxed text-white'
                              style={
                                showFullLongAnswer
                                  ? {}
                                  : {
                                      display: '-webkit-box',
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                    }
                              }
                            >
                              {faq.answer}
                            </p>
                            <button
                              type='button'
                              onClick={() => setShowFullLongAnswer((v) => !v)}
                              className='mt-3 text-sm font-medium text-[#ff3576] hover:underline'
                            >
                              {showFullLongAnswer ? 'Less' : 'More'}
                            </button>
                          </>
                        ) : (
                          <p className='leading-relaxed text-white'>{faq.answer}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Show more/less button */}
            <div className='flex justify-center mt-4'>
              <button
                type='button'
                onClick={() => setShowMoreMobile((v) => !v)}
                className='px-4 py-2 text-sm font-semibold text-[#2d2552] border border-gray-300 rounded-full bg-white hover:bg-gray-50'
              >
                {showMoreMobile ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>

          {/* Right side - FAQ Accordion (Desktop unchanged) */}
          <div className='hidden md:flex md:flex-col'>
            <div className='space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm'
                >
                  {/* Question header using flexbox */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className='w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200'
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

                  {/* Answer section with smooth transition */}
                  {faq.isOpen && (
                    <div className='px-6 pb-6'>
                      <div className='bg-[#2d2552] p-4 rounded-lg'>
                        {faq.id === 8 ? (
                          <>
                            <p
                              className='leading-relaxed text-white'
                              style={
                                showFullLongAnswer
                                  ? {}
                                  : {
                                      display: '-webkit-box',
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                    }
                              }
                            >
                              {faq.answer}
                            </p>
                            <button
                              type='button'
                              onClick={() => setShowFullLongAnswer((v) => !v)}
                              className='mt-3 text-sm font-medium text-[#ff3576] hover:underline'
                            >
                              {showFullLongAnswer ? 'Less' : 'More'}
                            </button>
                          </>
                        ) : (
                          <p className='leading-relaxed text-white'>{faq.answer}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ISVIR Logo */}
        <div className='mt-16 flex justify-center'>
          <img
            src='/member of ISVIR.jpg'
            alt='Member of ISVIR'
            className='h-16 sm:h-24 w-auto object-contain drop-shadow-lg'
          />
        </div>
      </div>
    </section>
  );
};

export default BreastNoduleFaq;
