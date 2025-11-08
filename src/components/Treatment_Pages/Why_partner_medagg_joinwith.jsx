import React from 'react';

const partnerData = [
  {
    image: '/j_partner1.png',
    text: 'Expand your patient reach across multiple cities',
  },
  {
    image: '/j_partner2.png',
    text: 'Collaborate with a trusted network of healthcare professionals',
  },
  {
    image: '/J_partner3.png',
    text: 'Be part of targeted campaigns driving real patient traffic',
  },
  {
    image: '/j_partner4.png',
    text: 'Hassle-free onboarding and dedicated support',
  },
];

const WhyPartnerMedagg = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#eaf2f8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2d2552]">
            Why Partner with Medagg Healthcare?
          </h2>
        </div>
        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {partnerData.map((item, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src={item.image} alt="Partner card" className="w-full h-72 md:h-80 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerMedagg;