import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Evaluation & imaging',
    desc: 'Clinical exam, HSG (hysterosalpingogram), and pregnancy test to confirm proximal blockage and eligibility.',
    img: '/FTE_step1.jpg',
  },
  {
    step: 2,
    title: 'Planning & access',
    desc: 'Speculum and cervical catheter are placed; performed during proliferative phase (day 6-11 cycle) under moderate sedation.',
    img: '/FTE_step2.jpg',
  },
  {
    step: 3,
    title: 'Guided imaging to confirm blockage',
    desc: 'Contrast injection via catheter under fluoroscopy reveals proximal obstruction and anatomy.',
    img: '/FTE_Step3.jpg',
  },
  {
    step: 4,
    title: 'Recanalization of occluded tube',
    desc: 'A guidewire or microcatheter traverses the blockage; balloon or gentle flushing clears the obstruction.',
    img: '/FTE_Step4.jpg',
  },
  {
    step: 5,
    title: 'Fertility restoration begins',
    desc: 'Tubal patency is restored; most pregnancies occur within months after procedure.',
    img: '/FTE_Step5.jpg',
  },
];

const HowFTEWork = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2552]">
            How <span className="text-[#ff3576]">Fallopian Tube Recanalization</span> Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl">
            Step-by-step breakdown of the fallopian tube recanalization procedure
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line - visible on md screens and up */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-1 bg-pink-200 rounded-full"></div>

          {steps.map((item, index) => (
                        <div key={item.step} className="relative md:grid md:grid-cols-2 md:items-center md:gap-20 mb-16">
              {/* Step Number Circle */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-[#ff3576] rounded-full items-center justify-center text-white font-bold text-xl shadow-lg">
                {item.step}
              </div>

              {/* Content Block */}
                            {/* Content Block */}
              <div className={`text-center md:text-left ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:order-2'}`}>
                 <p className="text-lg font-bold text-[#ff3576] mb-2">Step {item.step}: {item.title}</p>
                <p className="text-gray-600">{item.desc}</p>
              </div>

              {/* Image Block */}
              <div className={`mt-8 md:mt-0 ${index % 2 === 0 ? '' : 'md:order-1'}`}>
                <img src={item.img} alt={`Step ${item.step}: ${item.title}`} className="rounded-lg shadow-xl w-full max-w-[515px] h-[218px] object-cover mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowFTEWork;
