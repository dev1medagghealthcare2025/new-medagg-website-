import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Evaluation & imaging',
    description: 'Clinical evaluation plus scrotal ultrasound (and semen analysis) to confirm varicocele and assess impact on fertility.',
    image: '/varicocele_step1.jpg',
    alt: 'Doctor performing an ultrasound on a patient',
  },
  {
    step: 2,
    title: 'Access via wrist or groin',
    description: 'A catheter is inserted through a small puncture site in the wrist or groin vein — no general anesthesia required.',
    image: '/Varicocele_step2.jpg',
    alt: 'Close-up of a catheter insertion in an arm',
  },
  {
    step: 3,
    title: 'Guided imaging to locate problematic veins',
    description: 'X-ray dye (contrast) and fluoroscopy are used to visualize enlarged gonadal veins responsible for varicocele.',
    image: '/Varicocele_step3.jpg',
    alt: 'Medical imaging showing veins and a catheter',
  },
  {
    step: 4,
    title: 'Embolization of abnormal veins',
    description: 'Tiny coils or liquid embolic agents are deployed to block return flow through the varicocele veins, redirecting blood to healthy veins.',
    image: '/varcocele_step4.jpg',
    alt: 'Illustration of varicocele embolization procedure',
  },
  {
    step: 5,
    title: 'Symptom relief begins',
    description: 'Blocked veins shrink, relieving pain and swelling—fertility and sperm quality may improve over days to weeks.',
    image: '/varicocele_step5.jpg',
    alt: 'Illustration of a happy man with hearts and sperm icons',
  },
];

const HowVaricoceleEmbolizationWork = () => {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            How Varicocele <span className="text-[#ff3576]">Embolization Works</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Step-by-step breakdown of the varicocele embolization procedure
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute top-8 bottom-8 left-1/2 w-0.5 bg-[#ff3576] -translate-x-1/2"></div>

          {steps.map((item, index) => (
            <div key={item.step} className={`relative mb-12 md:mb-20 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Content */}
              <div className={`w-full md:w-1/2 p-4 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <h3 className="text-xl font-bold text-[#ff3576]">
                  Step {item.step}: <span className="text-[#2d2552]">{item.title}</span>
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>

              {/* Image */}
              <div className={`w-full md:w-1/2 p-4 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <img src={item.image} alt={item.alt} className="rounded-lg shadow-lg w-full" />
              </div>

              {/* Step Circle */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-[#ff3576] rounded-full items-center justify-center text-white font-bold text-xl border-4 border-gray-50">
                {item.step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowVaricoceleEmbolizationWork;
