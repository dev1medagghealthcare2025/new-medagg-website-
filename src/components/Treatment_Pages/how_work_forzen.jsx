import React from 'react';

const steps = [
  {
    no: 1,
    title: 'Initial Consultation',
    desc: 'Your doctor evaluates shoulder pain, stiffness, range of motion, and imaging (MRI or ultrasound) to confirm if ACE is suitable for you.',
    img: '/frozen_work1.png',
  },
  {
    no: 2,
    title: 'Access Through a Tiny Pinhole',
    desc: 'A thin catheter is inserted through a blood vessel in your wrist or groin. No surgical cuts. No stitches. No general anaesthesia.',
    img: '/frozen_work2.png',
  },
  {
    no: 3,
    title: 'Guided Imaging to Identify Problem Arteries',
    desc: 'Using advanced imaging, the doctor maps tiny arteries responsible for fuelling inflammation around the shoulder capsule.',
    img: '/frozen_work3.png',
  },
  {
    no: 4,
    title: 'Blocking Inflammation-Causing Arteries',
    desc: 'Microscopic particles are gently released to reduce abnormal blood flow linked to pain and stiffness.',
    img: '/forzen_work4.png', // Note: using filename as provided
  },
  {
    no: 5,
    title: 'Relief & Mobility Improvement Begins',
    desc: 'As inflammation decreases, many patients experience gradual improvement in pain and shoulder movement over the following weeks.',
    img: '/forzen_work5.png', // Note: using filename as provided
  },
];

const HowWorkFrozen = () => {
  return (
    <section className="w-full bg-gray-50 py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center lg:text-left mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]">
            How <span className="text-pink-600">ACE</span> Works
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto lg:mx-0">
            Understanding the procedure step-by-step helps you feel confident about your treatment choice.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* The vertical line */}
          <div
            className="hidden lg:block absolute top-0 left-1/2 -ml-px w-0.5 h-full bg-pink-200"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <div
              key={step.no}
              className="relative lg:grid lg:grid-cols-2 lg:gap-x-12 items-center mb-12"
            >
              {/* Content block */}
              <div
                className={`text-center lg:text-left ${
                  index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="mb-2">
                  <span className="text-pink-600 font-bold text-sm">Step {step.no}:</span>
                  <span className="font-bold text-[#1a1446] ml-2">{step.title}</span>
                </div>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>

              {/* Image block */}
              <div
                className={`mt-6 lg:mt-0 ${
                  index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <img
                  src={step.img}
                  alt={`Step ${step.no}: ${step.title}`}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>

              {/* Step marker on the line */}
              <div
                className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-pink-600 text-white items-center justify-center font-bold`}
              >
                {step.no}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWorkFrozen;