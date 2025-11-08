import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "Will the Medagg Healthcare assist for ambulance service?",
    answer: "We can. But we are not an emergency service provider but essentially an elective treatment platform",
    isOpen: true
  },
  {
    id: 2,
    question: "Do you offer weekend and evening Appointments?",
    answer: "It depends upon the doctor's availability."
  },
  {
    id: 3,
    question: "How Medagg helps hospitals?",
    answer: "Reducing the burden of functions/ processes (Front office, insurance, financial and clinical counselling),Medagg helps in bringing new patients to the hospitals.Medagg onboards the hospital with a new digital platform.Hospital promotions with blogs,videos and images periodically No retainer fees, we operate on service/patient cost."
  },
  {
    id: 4,
    question: "Will Medagg arrange for post treatment care?",
    answer: "yes, Medagg Healthcare will arrange for post Treatment care",
    isOpen: true
  },
  {
    id: 5,
    question: "Do you have a teleconsultation services?",
    answer: "Yes, We organise tele-consultation with the hospitals you choose through our Care Custodian.",
    isOpen: true
  },
  {
    id: 6,
    question: "How do I find the Best Hospital?",
    answer: "Talk to our Care Custodians and they will explore all available options for you along with the respective costs.",
    isOpen: true
  },
  {
    id: 7,
    question: "What is the required information to register on Medagg Healthcare?",
    answer: "The following information is required for the registration: Name, Date of Birth, Individual's Mobile Number, Email ID.",
    isOpen: true
  },
  {
    id: 8,
    question: "Why do I need Care Custodians?",
    answer: "We live in a world where unbiased advisory is something that we seek for a number of things. Don’t you think it is needed for something as important as your or your family’s health? Also, there are advisors available for a number of services starting from searching for a house, deciding on the best schools for your ward’s higher education, investment decisions to even matrimony! Don’t you need some good unbiased advice on your health? This is why you need our Care Custodians who are expert healthcare operators with many years of experience in our hospital industry.",
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