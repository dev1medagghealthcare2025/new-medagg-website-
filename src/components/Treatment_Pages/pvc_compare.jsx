import React from 'react';

const treatmentOptions = [
  {
    id: 1,
    title: 'Pelvic Vein Embolization',
    description: 'Image-guided Procedure, Minimally invasive outpatient treatment using local anesthesia, ensuring quick recovery',
    icon: '/PVC_Compare1.png',
    highlight: true,
  },
  {
    id: 2,
    title: 'Pain Medication',
    description: 'Pain managed with medications. No anesthesia required. No hospital stay needed. No procedures involved. Temporary relief; symptoms may persist or recur.',
    icon: '/pvc_compare2.png',
    highlight: false,
  },
  {
    id: 3,
    title: 'Surgery',
    description: 'Surgical procedure under general or spinal anesthesia. Hospital stay required. Veins treated through incisions. Longer recovery period.',
    icon: '/pvc_compare_3.png',
    highlight: false,
  },
];

const comparisonData = [
  {
    feature: 'Procedure Type',
    pvc: 'Image-guided minimally invasive procedure',
    medication: 'Medication-based symptom management',
    surgery: 'Surgical procedure',
  },
  {
    feature: 'Invasiveness',
    pvc: 'Minimally invasive',
    medication: 'Non-invasive',
    surgery: 'Highly Invasive',
  },
  {
    feature: 'Hospital Stay',
    pvc: 'Same day discharge',
    medication: 'Not required',
    surgery: 'Usually 1-3 days',
  },
  {
    feature: 'Scars / Sutures',
    pvc: 'No scars or stitches',
    medication: 'None',
    surgery: 'Surgical scars and sutures',
  },
  {
    feature: 'Recovery',
    pvc: '1-3 days recovery',
    medication: 'Temporary symptom relief',
    surgery: '2-4 weeks recovery',
  },
  {
    feature: 'Performed By',
    pvc: 'Interventional Radiologist',
    medication: 'Gynecologist',
    surgery: 'Vascular Surgeon / Gynecologist',
  },
];

const PVCCompare = () => {
  return (
    <section className='py-12 md:py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12'>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-[#2d2552] mb-4'>
            Compare Your <span className='text-[#ff3576]'>Treatment Options</span>
          </h2>
          <p className='text-gray-500 text-lg max-w-2xl'>
            See how Pelvic Vein embolization compares to traditional surgical approaches.
          </p>
        </div>

        {/* Treatment Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          {treatmentOptions.map((option) => (
            <div
              key={option.id}
              className={`rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 shadow-sm border border-[#ff3576]/20 bg-white text-[#2d2552] hover:bg-[#ff3576] hover:text-white group`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-white border-2 border-dashed border-[#ff3576]/30 group-hover:border-white/50`}>
                <img src={option.icon} alt={option.title} className='w-12 h-12 object-contain' />
              </div>
              <h3 className='text-xl font-bold mb-4 uppercase tracking-wide'>{option.title}</h3>
              <p className={`text-sm leading-relaxed text-gray-500 group-hover:text-white/90`}>
                {option.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className='overflow-x-auto rounded-xl shadow-lg border border-gray-100'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-[#2d2552] text-white'>
                <th className='p-4 md:p-6 font-bold uppercase tracking-wider text-sm'>Treatment</th>
                <th className='p-4 md:p-6 font-bold uppercase tracking-wider text-sm text-center'>Pelvic Vein Embolization</th>
                <th className='p-4 md:p-6 font-bold uppercase tracking-wider text-sm text-center'>Pain Medication</th>
                <th className='p-4 md:p-6 font-bold uppercase tracking-wider text-sm text-center'>Surgery</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {comparisonData.map((row, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='p-4 md:p-6 font-bold text-[#2d2552] text-sm md:text-base'>{row.feature}</td>
                  <td className='p-4 md:p-6 text-[#ff3576] font-semibold text-center text-sm md:text-base bg-[#fff5f7]/30'>
                    {row.pvc}
                  </td>
                  <td className='p-4 md:p-6 text-gray-600 text-center text-sm md:text-base'>
                    {row.medication}
                  </td>
                  <td className='p-4 md:p-6 text-gray-600 text-center text-sm md:text-base'>
                    {row.surgery}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PVCCompare;
