import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: 'What is endovenous ablation for varicose veins?',
    answer: 'Endovenous ablation is a minimally invasive procedure that uses heat energy, typically from radiofrequency or laser, to close off damaged veins in the legs, redirecting blood flow to healthier veins.',
    isOpen: true,
  },
  {
    id: 2,
    question: 'Who is a candidate for endovenous ablation?',
    answer: 'This procedure is recommended for patients with symptomatic varicose veins, such as leg pain, swelling, heaviness, skin changes, or ulcers caused by chronic venous insufficiency.',
  },
  {
    id: 3,
    question: 'Is the procedure painful?',
    answer: 'Most patients experience minimal discomfort during the procedure, as it is performed under local anesthesia. You may feel a slight warming sensation or pressure as the catheter is activated.',
  },
  {
    id: 4,
    question: 'How is the procedure performed?',
    answer: 'A small catheter is inserted into the affected vein through a tiny incision. Heat energy delivered through the catheter causes the vein to collapse and seal shut. The body then naturally reroutes blood flow to healthier veins.',
    isOpen: true,
  },
  {
    id: 5,
    question: 'What is the recovery time after endovenous ablation?',
    answer: 'Recovery is quick, with most patients returning to normal activities within 24-48 hours. Strenuous activities should be avoided for 1-2 weeks.',
    isOpen: true,
  },
  {
    id: 6,
    question: 'Are there any risks or side effects?',
    answer: 'Possible risks include bruising, mild swelling, skin discoloration, nerve irritation, or, rarely, blood clots. Serious complications are uncommon.',
    isOpen: true,
  },
  {
    id: 7,
    question: 'What are the benefits of endovenous ablation compared to traditional vein stripping?',
    answer: 'Endovenous ablation is less invasive, involves minimal scarring, and has a faster recovery time compared to traditional surgery. It also offers a high success rate in treating varicose veins.',
    isOpen: true,
  },
];

const VvFaq = () => {
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

export default VvFaq;
