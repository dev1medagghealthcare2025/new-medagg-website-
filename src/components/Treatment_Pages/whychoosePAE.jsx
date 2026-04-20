import React from 'react';
import { Scissors, Clock, TrendingUp, Users } from 'lucide-react';

const features = [
  {
    icon: (props) => <Scissors size={32} {...props} />,
    title: 'Non-Surgical.',
    description:'No open surgery, No Scars, No Sutures.',
  },
  {
    icon: (props) => <Clock size={32} {...props} />,
    title: 'QUICK RECOVERY',
    description: 'Minimally invasive, quick recovery, minimal downtime.',
  },
  {
    icon: (props) => <TrendingUp size={32} {...props} />,
    title: 'EFFECTIVE RESULTS',
    description: 'May help relieve symptoms, long-lasting prostate size reduction.',
  },
  {
    icon: (props) => <Users size={32} {...props} />,
    title: 'NO SEXUAL SIDE EFFECTS',
    description: 'PAE preserves sexual function with no risk.',
  },
];

const WhyChoosePAE = ({ city = '', variant = '' }) => {
  const cityLower = (city || '').toLowerCase();
  const variantLower = (variant || '').toLowerCase();
  const isChennai = variantLower === 'chennai' || cityLower === 'chennai';
  const isMadurai = variantLower === 'madurai' || cityLower === 'madurai';
  const isCoimbatore = variantLower === 'coimbatore' || cityLower === 'coimbatore';
  const isCitySpecific = isChennai || isMadurai || isCoimbatore;
  const cityName = isChennai ? 'Chennai' : isMadurai ? 'Madurai' : isCoimbatore ? 'Coimbatore' : '';

  return (
    <div className='py-16 sm:py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>

        </div>

        <div className='text-center sm:text-left mb-12'>
          {isCitySpecific ? (
            <>
              <p className='text-lg font-semibold tracking-wide text-[#2d2552] mb-3'>
                Why Choose NoSurgeries / MEDAGG?
              </p>
              <h2 className='text-3xl sm:text-4xl font-extrabold text-[#ff3576] leading-tight mb-4'>
                In {cityName}, No-Surgery Treatment for Enlarged Prostate is Available
              </h2>
              <p className='mt-4 text-lg text-gray-600 w-full'>
                <span className='font-semibold text-[#2d2552]'>NoSurgeries</span> offers advanced non-surgical treatments for conditions often managed with surgery.
              </p>
              <p className='mt-4 text-lg text-gray-600 w-full'>
                Using <span className='font-semibold text-[#2d2552]'>Interventional Radiology</span>, our minimally invasive procedures help reduce surgical risk, recovery time, and hospital stay while delivering effective outcomes.
              </p>
              <div className='mt-6 rounded-xl border border-[#ff3576]/30 bg-white px-5 py-4'>
                <p className='text-gray-700'>
                  <span className='font-semibold text-[#ff3576]'>No surgery</span> for Enlarged Prostate through <span className="text-[#ff3576]">Prostate Artery Embolization (PAE)</span> — a minimally invasive, incision-free treatment that relieves symptoms with faster recovery and minimal downtime.
                </p>
              </div>
              <p className='mt-5 text-[#ff3576] font-semibold underline underline-offset-4'>
                Science-led. Patient-focused. Proven outcomes
              </p>
            </>
          ) : (
            <>
              <h2 className='text-3xl sm:text-4xl font-bold text-[#2d2552]'>
                Why Choose <span className='text-[#ff3576]'>Prostate Artery Embolization (PAE)?</span>
              </h2>
              <p className='mt-4 text-lg text-gray-600 w-full'>
                Prostate artery embolization (PAE) is a proven, minimally invasive option for men seeking relief from an enlarged prostate without surgery. By reducing excess blood flow to the prostate, Prostate artery embolization (PAE) can help shrink the gland and improve urinary symptoms safely. The procedure involves no cuts and typically does not require a hospital stay, helping you return to normal activities faster. As a trusted non-surgical treatment for prostate enlargement, Prostate artery embolization (PAE) also helps preserve quality of life. If you are looking for non-surgical enlarged prostate treatment in Chennai, Prostate artery embolization (PAE) offers effective outcomes with fewer surgical risks.
              </p>
            </>
          )}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#ff3576] transition-all duration-300 flex flex-col items-center text-center'
            >
              <div className='w-20 h-20 rounded-full bg-pink-50 group-hover:bg-white flex items-center justify-center mb-6 transition-colors duration-300'>
                {feature.icon({ className: 'text-[#ff3576]' })}
              </div>
              <h3 className='text-lg font-bold text-[#2d2552] group-hover:text-white mb-2 transition-colors duration-300'>{feature.title}</h3>
              <p className='text-gray-600 group-hover:text-white flex-grow transition-colors duration-300'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoosePAE;
