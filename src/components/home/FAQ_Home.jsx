import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "Will the Medagg Healthcare assist for ambulance service?",
    answer: "Yes, we can help coordinate ambulance services if needed. However, Medagg is not an emergency care provider — we are an elective treatment platform focused on planned, non-emergency medical and interventional procedures.",
    isOpen: true
  },
  {
    id: 2,
    question: "Do you offer weekend and evening Appointments?",
    answer: "Appointment slots are based on each specialist’s availability. Our Care Custodians will help you schedule a time that best suits your convenience and the doctor’s schedule."
  },
  {
    id: 3,
    question: "How Medagg helps hospitals?",
    answer: "At Medagg, we make hospital operations smoother and smarter — managing patient onboarding, insurance, and counselling while bringing in new patients through our digital network. We also help hospitals build visibility with targeted campaigns and educational content, operating transparently with no retainer fees."
  },
  {
    id: 4,
    question: "Will Medagg arrange for post treatment care?",
    answer: "Yes. Medagg coordinates complete post-treatment care, including follow-ups, recovery guidance, and support services — ensuring your recovery is smooth and continuous.",
    isOpen: true
  },
  {
    id: 5,
    question: "Do you have a teleconsultation services?",
    answer: "Yes. We organize teleconsultations through our Care Custodians, connecting you with the hospitals and specialists of your choice — so you can access expert care from anywhere.",
    isOpen: true
  },
  {
    id: 6,
    question: "How do I find the Best Hospital?",
    answer: "Our Care Custodians will assess your treatment needs and present suitable hospital options along with estimated costs — helping you make an informed and confident decision.",
    isOpen: true
  },
  {
    id: 7,
    question: "What is the required information to register on Medagg Healthcare?",
    answer: "To register, please provide the following details: your full name, date of birth, mobile number, and email ID. You can begin by clicking on the “Book Appointment” tab at the top of our website. Our team will then guide you through the rest of the onboarding process.",
    isOpen: true
  },
  {
    id: 8,
    question: "Why do I need Care Custodians?",
    answer: "Just like we rely on expert advisors for finance, education, or major life decisions — you deserve trusted guidance for your health too. Medagg’s Care Custodians are experienced healthcare professionals who act as your personal care navigators. They provide unbiased advice, connect you to the right specialists, and ensure you get the best treatment for your needs.",
    isOpen: true
  },
];

const FAQ_Home = () => {
  const [faqs, setFaqs] = useState(faqData);
  const [question, setQuestion] = useState('');
  const [showFullLongAnswer, setShowFullLongAnswer] = useState(false); // only for id: 8

  const toggleFAQ = (id) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left side - FAQ Header and Question Form */}
          <div className="flex flex-col justify-center">
            {/* Header section using flexbox */}
            <div className="flex flex-col mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-2">
                Frequently Asked
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ff3576] mb-4">
                Questions
              </h2>
              <p className="text-gray-600 text-lg">
                Got Questions? Find Quick Answers About Our Treatments And Patient Support.
              </p>
            </div>

            {/* Can't Locate Answer section */}
            <div className="mb-8">
            </div>
          </div>

          {/* Right side - FAQ Accordion */}
          <div className="flex flex-col">
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                >
                  {/* Question header using flexbox */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-gray-700 font-medium pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {faq.isOpen ? (
                        <Minus className="w-6 h-6 text-[#ff3576]" />
                      ) : (
                        <Plus className="w-6 h-6 text-[#ff3576]" />
                      )}
                    </div>
                  </button>

                  {/* Answer section with smooth transition */}
                  {faq.isOpen && (
                    <div className="px-6 pb-6">
                      <div className="bg-[#2d2552] p-4 rounded-lg">
                        {faq.id === 8 ? (
                          <>
                            <p
                              className="leading-relaxed text-white"
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
                              type="button"
                              onClick={() => setShowFullLongAnswer((v) => !v)}
                              className="mt-3 text-sm font-medium text-[#ff3576] hover:underline"
                            >
                              {showFullLongAnswer ? 'Less' : 'More'}
                            </button>
                          </>
                        ) : (
                          <p className="leading-relaxed text-white">{faq.answer}</p>
                        )}
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

export default FAQ_Home;