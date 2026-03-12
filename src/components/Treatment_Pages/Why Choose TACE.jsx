import React from 'react';
import { Crosshair, Stethoscope, ShieldCheck, TrendingUpDown } from 'lucide-react';

const WhyChooseTACE = () => {
  const items = [
    {
      title: 'Targeted Delivery of\nChemotherapy',
      description: 'Chemotherapy drugs are delivered directly into the blood vessels supplying the tumor.',
      Icon: Crosshair,
    },
    {
      title: 'Minimally Invasive Treatment',
      description: 'The procedure is performed using a catheter inserted through a small puncture in the artery.',
      Icon: Stethoscope,
    },
    {
      title: 'Reduced Systemic Side Effects',
      description: 'Since the drug is concentrated in the tumor, exposure to the rest of the body is reduced.',
      Icon: ShieldCheck,
    },
    {
      title: 'Helps Control Tumor Growth',
      description: 'Blocking the tumor blood supply helps slow or stop tumor progression.',
      Icon: TrendingUpDown,
    },
  ];

  return (
    <section className='bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-14'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-left'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#241b3a]'>
            Why Choose <span className='text-[#ff3576]'>TACE</span>
            <span className='text-[#241b3a]'> (Transarterial Chemoembolization)</span>
          </h2>
          <p className='mt-3 text-sm sm:text-base text-gray-500 max-w-3xl'>
            TACE is often recommended when surgery is not possible or when tumors cannot be removed safely.
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7'>
          {items.map(({ title, description, Icon }) => (
            <div
              key={title}
              className='rounded-2xl border border-[#ff3576]/55 bg-white shadow-sm hover:shadow-md transition-shadow p-6'
            >
              <div className='flex items-center justify-center'>
                <div className='h-14 w-14 rounded-full bg-[#ff3576]/10 flex items-center justify-center ring-1 ring-[#ff3576]/15'>
                  <Icon className='h-7 w-7 text-[#ff3576]' strokeWidth={2.2} />
                </div>
              </div>

              <h3 className='mt-5 text-center text-sm sm:text-base font-extrabold text-[#241b3a] whitespace-pre-line leading-snug'>
                {title}
              </h3>
              <p className='mt-3 text-center text-sm text-gray-500 leading-relaxed'>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTACE;