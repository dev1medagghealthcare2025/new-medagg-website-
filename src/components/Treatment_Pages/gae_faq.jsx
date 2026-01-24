import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: 'How long does genicular artery embolization last?',
    answer: 'A GAE when performed by a trained interventional radiologist along with proper post procedure care such as physical therapy, and low impact exercises to reduce stress can contribute to healthy knees and will not require any further treatment or procedure.',
    isOpen: true,
  },
  {
    id: 2,
    question: 'What is the success rate of genicular artery embolization?',
    answer: 'Patients who have undergone GAE have found significant pain relief and have found their solution to treat severe pain caused by knee arthritis. While chronic knee pain cannot be treated by over-the-counter pain relievers or even sports medicine, GAE proves to be a promising solution.',
  },
  {
    id: 3,
    question: 'Who is a suitable candidate for GAE?',
    answer: 'GAE is a suitable treatment option for patients who have not responded well with other conventional treatments such as physical therapy, anti-inflammatory medications, steroid injections etc. <br> Moreover, patients who do not want to opt in for a major surgery such as Total Knee Replacement but want to get rid of knee pain can consider GAE. Patients with moderate to severe osteoarthritis are suitable candidates for GAE.',
  },
  {
    id: 4,
    question: 'What is causing Knee Pain?',
    answer: 'There can be several reasons that contribute to knee pain. Overuse of the knee such as indulging in rigorous training, repetitive physical activities, sports can all impact the knee joint. Injuries can also be a major reason for chronic knee pain.They pose higher risk of causing significant damage depending on the intensity of the injury and may even involve issues such as torn cartilage, broken bones etc. The other reason can simply be age and its associated wear and tear of the knee joint(Osteoarthritis).',
    isOpen: true,
  },
  {
    id: 5,
    question: 'What is an ACL tear?',
    answer: 'An anterior cruciate ligament(ACL) is one of the two cruciate ligaments in the knee. An ACL tear is a damage of the Anterior cruciate ligament that can cause symptoms such as pain, instability and joint swelling.Keeping the knee elevated, applying an ice pack are some of the immediate measures that can be taken for temporary pain relief. However, depending on the intensity of the injury, only consulting a healthcare provider and undergoing an appropriate treatment can provide permanent pain relief',
    isOpen: true,
  },
];

const FAQ_Home = () => {
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

export default FAQ_Home;
