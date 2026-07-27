import React from 'react';

const treatmentOptions = [
  {
    id: 1,
    title: 'Radiosynovectomy',
    description:
      'Local intra-articular treatment using radioactive colloidal particles that deliver beta radiation to inflamed synovial tissue.',
    icon: '/Nuclear_compare1.png',
  },
  {
    id: 2,
    title: 'Surgical Synovectomy',
    description: 'Surgical removal of the inflamed synovial membrane through an operative procedure.',
    icon: '/Nuclear_Compare2.png',
  },
  {
    id: 3,
    title: 'Medical Therapy',
    description: 'Conventional treatment using medications to manage inflammatory joint diseases.',
    icon: '/Nuclear_compare3.png',
  },
];

const comparisonData = [
  {
    feature: 'Procedure Type',
    radiosynovectomy: 'Non-surgical',
    surgical: 'Major surgery',
    medical: 'Non-surgical',
  },
  {
    feature: 'Invasiveness',
    radiosynovectomy: 'Minimally invasive',
    surgical: 'Highly invasive',
    medical: 'Non-invasive',
  },
  {
    feature: 'Hospital Stay',
    radiosynovectomy: 'Day care procedure',
    surgical: '2-3 days',
    medical: 'Not required',
  },
  {
    feature: 'Scars / Sutures',
    radiosynovectomy: 'None',
    surgical: 'Minimal',
    medical: 'None',
  },
  {
    feature: 'Recovery',
    radiosynovectomy: '1-2 days',
    surgical: '2-4 weeks',
    medical: 'Not applicable',
  },
  {
    feature: 'Performed By',
    radiosynovectomy: 'Nuclear medicine specialist / Interventional radiologist',
    surgical: 'Orthopedic surgeon',
    medical: 'Rheumatologist',
  },
];

const NuclearCompare = () => (
  <section className='py-12 md:py-20 bg-white'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='mb-12'>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-[#2d2552] mb-4'>
          Compare Your <span className='text-[#ff3576]'>Treatment Options</span>
        </h2>
        <p className='text-gray-500 text-lg max-w-2xl'>
          See how radiosynovectomy compares to other treatment approaches for chronic synovitis.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
        {treatmentOptions.map((option) => (
          <div
            key={option.id}
            className='group rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 shadow-sm border border-[#ff3576]/20 bg-white text-[#2d2552] hover:bg-[#ff3576] hover:text-white'
          >
            <div className='w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-white border-2 border-dashed border-[#ff3576]/30 group-hover:border-white/50'>
              <img src={option.icon} alt={option.title} className='w-12 h-12 object-contain' />
            </div>
            <h3 className='text-xl font-bold mb-4 group-hover:text-white'>{option.title}</h3>
            <p className='text-sm leading-relaxed text-gray-500 group-hover:text-white/90'>
              {option.description}
            </p>
          </div>
        ))}
      </div>

      <div className='overflow-x-auto rounded-xl shadow-lg border border-gray-100'>
        <table className='w-full text-left border-collapse min-w-[640px]'>
          <thead>
            <tr className='bg-[#2d2552] text-white'>
              <th className='p-4 md:p-6 font-bold uppercase tracking-wider text-sm'>Treatment</th>
              <th className='p-4 md:p-6 font-bold uppercase tracking-wider text-sm text-center'>
                Radiosynovectomy
              </th>
              <th className='p-4 md:p-6 font-bold uppercase tracking-wider text-sm text-center'>
                Surgical Synovectomy
              </th>
              <th className='p-4 md:p-6 font-bold uppercase tracking-wider text-sm text-center'>
                Medical Therapy
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {comparisonData.map((row) => (
              <tr key={row.feature} className='hover:bg-gray-50 transition-colors'>
                <td className='p-4 md:p-6 font-bold text-[#2d2552] text-sm md:text-base'>{row.feature}</td>
                <td className='p-4 md:p-6 text-[#ff3576] font-semibold text-center text-sm md:text-base bg-[#fff5f7]/30'>
                  {row.radiosynovectomy}
                </td>
                <td className='p-4 md:p-6 text-gray-600 text-center text-sm md:text-base'>{row.surgical}</td>
                <td className='p-4 md:p-6 text-gray-600 text-center text-sm md:text-base'>{row.medical}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default NuclearCompare;
