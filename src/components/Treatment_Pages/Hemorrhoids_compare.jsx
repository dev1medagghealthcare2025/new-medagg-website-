
import React from 'react';

const optionCards = [
  {
    title: 'Piles Artery Embolization',
    desc: 'Minimally invasive, uses local anesthesia, day-care procedure with faster recovery.',
    icon: '/Compare_Hemorrhoids_1.png',
    highlight: true,
  },
  {
    title: 'Laser Treatment',
    desc: 'Minimally invasive surgical option; small incision, short hospital stay.',
    icon: '/compare_Hemorrhoids_2.png',
  },
  {
    title: 'Medical Management',
    desc: 'Includes medications and lifestyle changes; may control symptoms but recurrence is common.',
    icon: '/Compare_Hemorrhoids_3.png',
  },
  {
    title: 'Piles/Hemorrhoid Surgery',
    desc: 'Traditional surgical removal; effective but involves pain, stitches, and longer recovery.',
    icon: '/Compare_Hemorrhoids_4.png',
  },
];

const rows = [
  {
    label: 'Procedure Type',
    rae: 'Non-Surgical',
    laser: 'Minimally Surgical',
    medical: 'Non-surgical',
    surgery: 'Surgical',
  },
  {
    label: 'Invasiveness',
    rae: 'Minimally Invasive',
    laser: 'Minimal Incision',
    medical: 'None',
    surgery: 'Highly Invasive',
  },
  {
    label: 'Hospital Stay',
    rae: 'Day Care Procedure',
    laser: 'Day Care',
    medical: 'None',
    surgery: '1–3 days',
  },
  {
    label: 'Scars / Sutures',
    rae: 'None',
    laser: 'Small',
    medical: 'None',
    surgery: 'Yes',
  },
  {
    label: 'Recovery',
    rae: 'Few days',
    laser: '1–2 weeks',
    medical: 'Short term',
    surgery: '2–4 weeks',
  },
  {
    label: 'Risk & Complications',
    rae: 'Low in experienced hands',
    laser: 'Moderate',
    medical: 'Steroid effects possible',
    surgery: 'Higher surgical risks',
  },
  {
    label: 'Patient Suitability',
    rae: 'Grade II–III bleeding hemorrhoids',
    laser: 'Selected cases',
    medical: 'Pain relief',
    surgery: 'Severe / advanced cases',
  },
];

export default function Hemorrhoids_compare() {
  return (
    <section className='w-full bg-white py-10 sm:py-12 lg:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 text-center sm:text-left'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]'>
            Compare Your <span className='text-[#ff3576]'>Treatment Options</span>
          </h2>
          <p className='mt-3 text-sm sm:text-base text-gray-600'>
            See how Piles Artery Embolization compares to commonly used treatments.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          {optionCards.map((c) => (
            <div
              key={c.title}
              className='group bg-white rounded-2xl border border-gray-100 shadow-md transition-all duration-200 p-6 text-center hover:shadow-xl hover:-translate-y-0.5 hover:border-[#ff3576] hover:bg-[#ff3576]'
            >
              <div className='w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-white'>
                <img src={c.icon} alt='' className='w-12 h-12 object-contain' aria-hidden='true' />
              </div>
              <h3
                className={`text-base font-extrabold group-hover:text-white ${c.highlight ? 'text-[#ff3576]' : 'text-[#1a1446]'}`}
              >
                {c.title}
              </h3>
              <p className='mt-2 text-sm text-gray-600 group-hover:text-white/90'>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className='rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
          <div className='w-full overflow-x-auto'>
            <table className='min-w-[900px] w-full border-collapse'>
              <thead>
                <tr className='bg-[#1a1446] text-white'>
                  <th className='text-left px-4 py-3 text-xs sm:text-sm font-bold tracking-wide uppercase'>Treatment</th>
                  <th className='text-left px-4 py-3 text-xs sm:text-sm font-bold tracking-wide uppercase'>PAE</th>
                  <th className='text-left px-4 py-3 text-xs sm:text-sm font-bold tracking-wide uppercase'>Laser</th>
                  <th className='text-left px-4 py-3 text-xs sm:text-sm font-bold tracking-wide uppercase'>Medical Management</th>
                  <th className='text-left px-4 py-3 text-xs sm:text-sm font-bold tracking-wide uppercase'>Surgery</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={r.label} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#fbf7f8]'}>
                    <td className='px-4 py-4 text-sm font-semibold text-[#1a1446] border-t border-gray-100'>{r.label}</td>
                    <td className='px-4 py-4 text-sm text-[#ff3576] font-semibold border-t border-gray-100'>{r.rae}</td>
                    <td className='px-4 py-4 text-sm text-gray-700 border-t border-gray-100'>{r.laser}</td>
                    <td className='px-4 py-4 text-sm text-gray-700 border-t border-gray-100'>{r.medical}</td>
                    <td className='px-4 py-4 text-sm text-gray-700 border-t border-gray-100'>{r.surgery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

