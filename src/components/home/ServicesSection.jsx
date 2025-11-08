import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const allServices = {
  set1: [
    {
      title: 'Geniculate Artery Embolization',
      desc: 'A non-surgical solution to relieve chronic knee pain safely.',
      img: '/Geniculate%20Artery%20Emblization.jpg',
      highlight: true,
      path: '/gae',
    },
    {
      title: 'Prostate Artery Embolization',
      desc: 'Minimally invasive relief for Prostate without surgery.',
      img: '/Prostate%20Artery%20Embolization.jpg',
      path: '/pae',
    },
    {
      title: 'Fallopian Tube Recanalization',
      desc: 'Non-surgical treatment to unblock fallopian tubes.',
      img: '/Fallopian%20Tube%20Recanalization.jpg',
      path: '/fte',
    },
    {
      title: 'Varicocele Embolization',
      desc: 'Minimally invasive relief for varicocele without surgery.',
      img: '/Varicocele%20Embolization.jpg',
      path: '/varicocele-embolization',
    },
    {
      title: 'Thyroid Nodule Ablation',
      desc: 'Minimally invasive treatment for thyroid nodules.',
      img: '/Thyroid%20Nodul%20Ablation.jpg',
      path: '/thyroid',
    },
    {
      title: 'Uterine Fibroid Embolization',
      desc: 'A non-surgical procedure to shrink fibroids and relieve symptoms.',
      img: '/Uterine%20Fibroid%20Embolization.jpg',
      path: '/uae',
    },
    {
      title: 'Varicose Veins',
      desc: 'Non-surgical treatment for varicose veins.',
      img: '/Varicose%20Veins.jpg',
      path: '/varicose-vein',
    },
    {
      title: 'Transcatheter Aortic Valve Replacement',
      desc: 'Non-surgical aortic valve replacement for better heart function.',
      img: '/Transcatheter%20Aortic%20Valve%20Replacement.jpg',
      path: '/transcatheter-aortic-valve-replacement',
    },
  ],
  set2: [
    {
      title: 'Chronic Total Occlusion',
      desc: 'Minimally invasive reopening of permanently blocked coronary arteries to restore blood flow and improve heart function.',
      img: '/chronic.svg',
      path: '/cto',
    },
    {
      title: 'Radiofrequency Ablation for Arrhythmia',
      desc: 'A minimally invasive procedure using heat energy to correct irregular heart rhythms—fast, safe relief without open-heart surgery.',
      img: '/rfa for Ar.svg',
      path: '/rfa',
    },
    {
      title: 'Endovascular coiling',
      desc: 'Minimally invasive, image-guided treatment to secure brain aneurysms without open surgery.',
      img: '/Endovascular coiling.svg',
      path: '/endovascular-coiling',
    },
    {
      title: 'Radiofrequency ablation for AVM',
      desc: 'Minimally invasive treatment to close off or shrink abnormal blood vessel tangles, reducing the risk of haemorrhage and neurological effects.',
      img: 'avm.svg',
      path: '/radiofrequency-ablation-for-avm',
    },
    {
      title: 'Plantar Fascial Embolization',
      desc: 'Plantar fasciitis occurs when the thick tissue along the bottom of the foot becomes inflamed. Treatment involves injecting tiny particles to reduce blood flow, easing inflammation and relieving pain.',
      img: '/planter_icon.jpg',
      path: '/pfe',
    },
    {
      title: 'Breast Nodule (VAE)',
      desc: 'A non-surgical technique for the removal of benign breast nodules, leaving minimal to no scarring.',
      img: '/Breast_nodule_icon.svg',
      path: '/breast-nodule-vae',
    },
  ],
};

const ArrowButton = ({ highlight }) => (
  <button
    className={`w-9 h-9 flex items-center justify-center rounded-full focus:outline-none mt-2 bg-white text-[#1a1446] border border-gray-200 shadow-md hover:bg-[#ff3576] hover:text-white hover:border-[#ff3576] transition-colors duration-300`}
  >
    <svg width='20' height='20' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='10' fill='none' />
      <path d='M10 8l4 4-4 4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  </button>
);

const OurServiceSection = () => {
  const navigate = useNavigate();
  const [activeSet, setActiveSet] = useState('set1');
  const intervalRef = useRef(null);

  const services = allServices[activeSet];

  const handleCardClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  // Auto-rotation effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveSet(prevSet => prevSet === 'set1' ? 'set2' : 'set1');
    }, 15000); // 15 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section id='services' className='w-full bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 flex flex-col items-center sm:items-start relative'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1446] mb-3 sm:mb-4 text-center sm:text-left'>
          Say Goodbye to <span className='text-[#ff3576]'>Surgery</span>
        </h2>
        <p className='text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center sm:text-left max-w-2xl'>
          Explore Safer, Scar-Free Treatments
        </p>

        {/* Left Arrow - only show when on set2 */}
        {activeSet === 'set2' && (
          <button
            onClick={() => setActiveSet('set1')}
            className='absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#1a1446] border border-gray-200 shadow-lg hover:bg-[#ff3576] hover:text-white hover:border-[#ff3576] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff3576] focus:ring-offset-2 z-10'
            aria-label='Show first set of services'
          >
            <svg width='24' height='24' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
              <path d='M14 8l-4 4 4 4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full'>
          {services.map((t, idx) => (
            <div
              key={t.title}
              role='button'
              tabIndex={0}
              className='bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:bg-pink-50 hover:border-pink-500 focus:outline-none focus:ring-2 focus:ring-[#ff3576] focus:ring-offset-2 cursor-pointer h-full border-2 border-transparent'
              onClick={() => handleCardClick(t.path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(t.path);
                }
              }}
              aria-label={`${t.title}. ${t.desc} Click to ${t.path ? 'learn more' : 'view details'}`}
            >
              <div className='flex-1'>
                <h3 className='text-base font-bold text-[#1a1446] mb-2 leading-tight'>{t.title}</h3>
                <p className='text-gray-400 text-sm mb-3 leading-relaxed line-clamp-4'>{t.desc}</p>
              </div>
              <div className='flex items-center justify-between mt-auto pt-2'>
                <ArrowButton highlight={!!t.highlight} />
                <img
                  src={t.img}
                  alt=''
                  className='w-12 h-12 object-contain flex-shrink-0'
                  aria-hidden='true'
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow - only show when on set1 */}
        {activeSet === 'set1' && (
          <button
            onClick={() => setActiveSet('set2')}
            className='absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#1a1446] border border-gray-200 shadow-lg hover:bg-[#ff3576] hover:text-white hover:border-[#ff3576] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff3576] focus:ring-offset-2 z-10'
            aria-label='Show second set of services'
          >
            <svg width='24' height='24' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
              <path d='M10 8l4 4-4 4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default OurServiceSection;
