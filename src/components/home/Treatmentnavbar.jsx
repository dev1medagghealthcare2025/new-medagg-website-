import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

 const treatments = [
  { title: 'Enlarged Prostate', path: '/prostate-artery-embolization-pae', subTreatments: [{ title: 'Prostate Artery Embolization', path: '/prostate-artery-embolization-pae' }] },
  { title: 'Knee Pain', path: '/genicular-artery-embolization-gae', subTreatments: [{ title: 'Genicular Artery Embolization', path: '/genicular-artery-embolization-gae' }] },
  { title: 'Thyroid Nodule', path: '/thyroid-nodule-ablation', subTreatments: [{ title: 'Thyroid Nodule Ablation', path: '/thyroid-nodule-ablation' }] },
  { title: 'Varicocele', path: '/varicocele-embolization', subTreatments: [{ title: 'Varicocele Embolization', path: '/varicocele-embolization' }] },
  { title: 'Fallopian Tube Block', path: '/fallopian-tube-recanalization-ftr', subTreatments: [{ title: 'Fallopian Tube Recanalization', path: '/fallopian-tube-recanalization-ftr' }] },
  { title: 'Uterine Fibroids', path: '/uterine-artery-embolization-uae', subTreatments: [{ title: 'Uterine Artery Embolization', path: '/uterine-artery-embolization-uae' }] },
  { title: 'Hemorrhoids/Piles', path: '/piles-hemorrhoids', subTreatments: [{ title: 'Piles Artery Embolization', path: '/piles-hemorrhoids' }] },
  {
    title: 'Y-90 Radioembolization',
    path: '/y90-radioembolization-tare',
    subTreatments: [
      { title: 'TARE', path: '/y90-radioembolization-tare' },
      { title: 'Transarterial Chemoembolization (TACE)', path: '/transarterial-chemoembolization-tace' },
    ],
  },
  {
    title: 'Interventional',
    subTreatments: [
      {
        title: 'Interventional Neurology',
        subTreatments: [
          { title: 'Endovascular Coiling', path: '/endovascular-coiling' },
          { title: 'RFA Treatment For AVM', path: '/radiofrequency-ablation-for-avm' },
        ],
      },
      {
        title: 'Interventional Cardiology',
        subTreatments: [
          { title: 'Transcatheter Aortic Valve Implantation', path: '/transcatheter-aortic-valve-replacement' },
          { title: 'Chronic Total Occlusion', path: '/cto' },
          { title: 'Radiofrequency Ablation For Arrhythmia', path: '/rfa' },
        ],
      },
    ],
  },
  {
    title: 'Breast Nodules',
    subTreatments: [
        { title: 'Breast Nodule VAE', path: '/breast-nodule-vae' },
        { title: 'Breast Nodule Cryoablation', path: '/breast-nodule-cryoablation' },
        { title: 'Breast Nodule Radiofrequency Ablation', path: '/breast-nodule-rfa' },

    ],
  },
 // { title: 'Plantar Fascial Embolization', path: '/pfe' },
 // { title: 'Varicose Veins', path: '/varicose-vein' },
  { title: 'Plantar Fascitis', path: '/plantar-fascial-embolization', subTreatments: [{ title: 'Plantar Fascitis Embolization', path: '/plantar-fascial-embolization' }] },
  { title: 'Varicose Veins', path: '/varicose-vein', subTreatments: [{ title: 'Endovenous Ablation', path: '/varicose-vein' }] },

  // New: Endovascular Recanalization & Stenting - Diabetic Foot
  { title: 'Diabetic Foot', path: '/diabetic-foot', subTreatments: [
    { title: 'Endovascular Recanalization & Stenting', path: '/diabetic-foot' }
  ] },

  // New: Adhesive Capsulitis Embolization - Frozen Shoulder
  { title: 'Frozen Shoulder', path: '/frozen-shoulder', subTreatments: [
    { title: 'Adhesive Capsulitis Embolization', path: '/frozen-shoulder' }
  ] },

];

const Thumb = ({ title }) => {
  const letter = (title || '?').trim().slice(0, 1).toUpperCase();
  return (
    <div className='w-9 h-9 rounded-lg bg-gray-200/80 ring-1 ring-gray-300 flex items-center justify-center text-gray-600 text-xs font-semibold shrink-0'>
      {letter}
    </div>
  );
};

const MegaColumn = ({ heading, items }) => {
  return (
    <div className='min-w-0'>
      <div className='text-sm font-semibold text-gray-900 mb-3'>{heading}</div>
      <div className='space-y-3'>
        {items.map((it) => (
          <Link
            key={it.title}
            to={it.path || '#'}
            className='flex items-center gap-3 text-sm text-gray-700 hover:text-pink-600'
          >
            <Thumb title={it.title} />
            <span className='leading-tight'>{it.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function Treatmentnavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const closeTimerRef = useRef(null);

  const orderedTreatments = useMemo(() => {
    const arr = [...treatments];
    const idx = arr.findIndex(t => t.title === 'Interventional');
    if (idx !== -1) {
      const [it] = arr.splice(idx, 1);
      arr.push(it);
    }
    return arr;
  }, []);

  const grouped = useMemo(() => {
    const byTitle = (title) => orderedTreatments.find((t) => t.title === title);
    const pick = (titles) => titles.map((t) => byTitle(t)).filter(Boolean).map((t) => ({ title: t.title, path: t.path }));

    const interventional = byTitle('Interventional');
    const neurology = (interventional?.subTreatments || []).find((s) => s.title === 'Interventional Neurology');
    const cardiology = (interventional?.subTreatments || []).find((s) => s.title === 'Interventional Cardiology');

    return {
      womens: pick(['Uterine Fibroids', 'Fallopian Tube Block', 'Breast Nodules']),
      mens: pick(['Enlarged Prostate', 'Varicocele']),
      pain: pick(['Knee Pain', 'Frozen Shoulder', 'Plantar Fascitis']),
      common: pick(['Hemorrhoids/Piles', 'Diabetic Foot', 'Thyroid Nodule', 'Varicose Veins']),
      neuro: (neurology?.subTreatments || []).map((x) => ({ title: x.title, path: x.path })),
      cardio: (cardiology?.subTreatments || []).map((x) => ({ title: x.title, path: x.path })),
    };
  }, [orderedTreatments]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    if (mq.addEventListener) mq.addEventListener('change', apply);
    window.addEventListener('orientationchange', apply);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', apply);
      window.removeEventListener('orientationchange', apply);
    };
  }, []);

  const openMenu = (key) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setActiveMenu(key);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setActiveMenu(null), 120);
  };

  const toggleMobile = () => {
    setIsMobileMenuOpen((v) => {
      const next = !v;
      if (!next) setMobileSection(null);
      return next;
    });
  };

  const toggleMobileSection = (section) => {
    setMobileSection((prev) => (prev === section ? null : section));
  };

  return (
    <nav className='sticky top-[100px] lg:top-[110px] z-40 w-full bg-white border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='h-24 flex items-center justify-between gap-4'>
          <Link to='/' className='flex items-center shrink-0'>
            <img
              src='/new_part2.png'
              alt='Medagg Healthcare'
              className='h-20 w-auto object-contain'
              loading='eager'
              decoding='async'
            />
          </Link>

          <div className='hidden md:flex flex-1 items-center justify-end'>
            <div className='flex items-center gap-8 text-sm font-medium text-gray-800'>
              <button
                type='button'
                className='flex items-center gap-1.5 hover:text-pink-600'
                onMouseEnter={() => openMenu('treatments')}
                onMouseLeave={scheduleClose}
                onClick={() => setActiveMenu((v) => (v === 'treatments' ? null : 'treatments'))}
                aria-expanded={activeMenu === 'treatments'}
              >
                Treatments
                <ChevronDown className='h-4 w-4' />
              </button>

              <Link to='/about' className='hover:text-pink-600'>About</Link>
              <Link to='/blog' className='hover:text-pink-600'>Blogs</Link>
              <Link to='/contact-us' className='hover:text-pink-600'>Contact Us</Link>
              <Link to='/contact-us' className='inline-flex items-center justify-center h-11 px-6 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors font-medium'>
                Book Appointment
              </Link>
            </div>
          </div>

          <div className='md:hidden flex items-center gap-3'>
            <button
              type='button'
              className='text-sm font-medium text-pink-600'
              onClick={toggleMobile}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? 'Close' : 'Open'}
            </button>
          </div>
        </div>
      </div>

      {!isMobile && activeMenu === 'treatments' && (
        <div
          className='absolute left-0 right-0 bg-white border-t border-gray-200 shadow-xl'
          onMouseEnter={() => openMenu('treatments')}
          onMouseLeave={scheduleClose}
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
              <MegaColumn heading="Women's Health" items={grouped.womens} />
              <div className='space-y-10'>
                <MegaColumn heading='Mens Health' items={grouped.mens} />
                <MegaColumn heading='Pain & Joint' items={grouped.pain} />
              </div>
              <MegaColumn heading='Common Health' items={grouped.common} />
              <div className='space-y-10'>
                <MegaColumn heading='Interventional Neurology' items={grouped.neuro} />
                <MegaColumn heading='Interventional Cardiology' items={grouped.cardio} />
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobile && isMobileMenuOpen && (
        <div className='border-t border-gray-200 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4'>
            <button
              type='button'
              className='w-full flex items-center justify-between text-left text-sm font-medium text-gray-900'
              onClick={() => toggleMobileSection('treatments')}
              aria-expanded={mobileSection === 'treatments'}
            >
              Treatments
              <ChevronDown className='h-4 w-4' />
            </button>

            {mobileSection === 'treatments' && (
              <div className='pt-2 space-y-6'>
                <MegaColumn heading="Women's Health" items={grouped.womens} />
                <MegaColumn heading='Mens Health' items={grouped.mens} />
                <MegaColumn heading='Pain & Joint' items={grouped.pain} />
                <MegaColumn heading='Common Health' items={grouped.common} />
                <MegaColumn heading='Interventional Neurology' items={grouped.neuro} />
                <MegaColumn heading='Interventional Cardiology' items={grouped.cardio} />
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
