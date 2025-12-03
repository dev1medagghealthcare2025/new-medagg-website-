import React from 'react';

const steps = [
  {
    no: 1,
    title: 'Step 1: Vascular Assessment',
    desc:
      'We assess pulses, wounds, and symptoms, and review non-invasive tests such as Doppler ultrasound, CT/MR angiography or previous angiograms to map the blockages.',
    img: '/diabetic_work1.png',
  },
  {
    no: 2,
    title: 'Step 2: Tiny Pinhole Access',
    desc:
      'Under local anaesthesia, a thin catheter is inserted through a small puncture in the groin or sometimes at the ankle. No surgical cuts, no stitches.',
    img: '/Diabetic_work2.png',
  },
  {
    no: 3,
    title: 'Step 3: Angiogram: Visualising the Blockage',
    desc:
      'Contrast dye is injected and real-time X-ray imaging (digital subtraction angiography) is used to see the narrowed and blocked arteries supplying the foot.',
    img: '/Diabetic_work3.png',
  },
  {
    no: 4,
    title: 'Step 4: Recanalization & Angioplasty',
    desc:
      'Using fine wires and catheters, the blocked segments are carefully crossed (“recanalized”). A small balloon is then inflated to widen the artery and restore blood flow (balloon angioplasty).',
    img: '/Diabetic_work4.png',
  },
  {
    no: 5,
    title: 'Step 5: Stenting (When Needed)',
    desc:
      'In some areas, especially if the artery recoils or dissects after ballooning, a stent (tiny metal scaffold) is placed to help keep the vessel open. Drug-coated balloons or stents may be used depending on the segment and disease pattern.',
    img: '/Diabetic_work5.png',
  },
  {
    no: 6,
    title: 'Step 6: Blood Flow Restored',
    desc:
      'The final angiogram confirms improved blood supply to the foot and, when possible, direct flow to the wound area. Most patients can sit up and walk soon after the procedure and usually go home the same day or after an overnight stay, depending on their condition.',
    img: '/Diabetic_work6.png',
  },
];

const HowWorkDiabetic = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]">
          How Endovascular Recanalization & Stenting Works
        </h2>
        <p className="text-gray-600 mt-2 mb-8 sm:mb-10">
          Understanding each step helps you feel more confident and prepared.
        </p>

        {/* Timeline layout */}
        <div className="relative">
          {/* Center line on large screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-pink-300 rounded-full h-full" aria-hidden="true" />

          <div className="space-y-12">
            {steps.map((s, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div key={s.no} className="relative lg:grid lg:grid-cols-2 lg:gap-x-12 items-center">
                  {/* Step Marker - Centered on the line */}
                  <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-pink-600 text-white text-sm font-bold flex items-center justify-center ring-4 ring-white">
                      {s.no}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className={`text-center lg:text-left ${isEven ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8 lg:text-right'}`}>
                    <h3 className="text-pink-600 font-semibold mb-1 text-lg">{s.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                  </div>

                  {/* Image Content */}
                  <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="bg-white mt-4 lg:mt-0 rounded-xl border border-gray-100 shadow-md overflow-hidden">
                      <img
                        src={s.img}
                        alt={s.title}
                        className="w-full h-52 sm:h-56 md:h-64 object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step markers for mobile (removed as requested) */}
          <div className="hidden" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
};

export default HowWorkDiabetic;