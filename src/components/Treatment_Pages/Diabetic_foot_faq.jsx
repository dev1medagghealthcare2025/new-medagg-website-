import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: 'Who performs Endovascular Recanalization & Stenting for Diabetic Foot?',
    answer: 'This procedure is performed by an Interventional Radiologist, a doctor trained in minimally invasive, image-guided treatments.',
    isOpen: true,
  },
  {
    id: 2,
    question: 'How is diabetic foot with blocked arteries diagnosed?',
    answer: 'Diagnosis involves clinical examination, blood flow assessment, imaging tests such as Doppler ultrasound, CT angiography, or angiography, and evaluation of wounds or ulcers',
  },
  {
    id: 3,
    question: 'Should I worry too much about diabetic foot symptoms?',
    answer: 'Diabetic foot problems should not be ignored. Reduced blood flow can delay wound healing and increase the risk of infection, which may lead to serious complications if untreated.',
  },
  {
    id: 4,
    question: 'Is diabetic foot always related to poor blood circulation?',
    answer: 'While nerve damage plays a role, poor blood circulation due to blocked arteries is a major factor in non-healing wounds and ulcers in diabetic foot patients.',
    isOpen: true,
  },
  {
    id: 5,
    question: 'What is the recovery time after endovascular treatment?',
    answer: 'Most patients recover quickly and can resume normal activities within a few days, depending on overall health and wound condition.',
    isOpen: true,
  },
  {
    id: 6,
    question: 'Is endovascular recanalization a permanent solution?',
    answer: 'The procedure helps restore blood flow, which supports healing. Long-term outcomes depend on diabetes control, foot care, and lifestyle measures.',
    isOpen: true,
  },
  {
    id: 7,
    question: 'Who is a suitable candidate for this procedure?',
    answer: 'This treatment may be suitable for diabetic patients with reduced blood flow to the legs or feet, especially those with non-healing wounds or ulcers.',
    isOpen: true,
  },
];

const DiabeticFootFaq = () => {
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

export default DiabeticFootFaq;
