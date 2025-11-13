import React, { useState, useCallback } from 'react';

const treatments = [
  {
    title: 'Genicular Artery Embolization',
    img: '/GAE_Compare1.jpg',
    desc: 'Minimally invasive, uses local anesthesia, shorter recovery, and a day care procedure.',
    highlight: false,
  },
  {
    title: 'Total Knee Replacement',
    img: '/GAE_Compare2.jpg',
    desc: 'TKR is a permanent solution for severe knee damage but requires longer recovery and higher surgical risk.',
    highlight: false,
  },
  {
    title: 'Platelet Rich Plasma',
    img: '/GAE_Compare3.jpg',
    desc: 'PRP is suitable for early-stage OA or mild knee pain, but effects are generally short-term. Might need more than 1 sitting.',
    highlight: false,
  },
];

const tableRows = [
  {
    label: 'Procedure Type',
    gae: <span className='text-[#ff3576] font-medium'>Non – Surgical</span>,
    tkr: 'Major Surgery',
    prp: 'Non-Surgical',
  },
  {
    label: 'Invasiveness',
    gae: <span className='text-[#ff3576] font-medium'>Minimally Invasive</span>,
    tkr: 'Highly Invasive',
    prp: 'Minimally Invasive',
  },
  {
    label: 'Hospital Stay',
    gae: <span className='text-[#ff3576] font-medium'>Day Care Procedure</span>,
    tkr: '5-7 days',
    prp: 'Day Care Procedure, may need > 1 sitting',
  },
  {
    label: 'Scars / Sutures',
    gae: <span className='text-[#ff3576] font-medium'>None</span>,
    tkr: 'Noticeable Scar',
    prp: 'None',
  },
  {
    label: 'Risk & Complications',
    gae: <span className='text-[#ff3576] font-medium'>Very Low</span>,
    tkr: 'Higher Surgical Risks',
    prp: 'Side Effects Possible',
  },
  {
    label: 'Patient Suitability',
    gae: <span className='text-[#ff3576] font-medium'>Cannot undergo TKR but seeking pain relief</span>,
    tkr: 'Seeking permanent repair of the knee joint',
    prp: 'Suitable for Early stage knee pain due to OA',
  },
];

const GAE_Compare_treatment_option = () => {
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoadAttempts, setImageLoadAttempts] = useState({});

  const handleImageError = useCallback((imagePath) => {
    // Prevent infinite retries by tracking attempts
    setImageLoadAttempts(prev => {
      const attempts = (prev[imagePath] || 0) + 1;
      if (attempts >= 3) {
        // Mark as permanently failed after 3 attempts
        setImageErrors(prevErrors => ({ ...prevErrors, [imagePath]: true }));
      }
      return { ...prev, [imagePath]: attempts };
    });
  }, []);

  const shouldShowImage = useCallback((imagePath) => {
    return !imageErrors[imagePath] && (imageLoadAttempts[imagePath] || 0) < 3;
  }, [imageErrors, imageLoadAttempts]);

  return (
    <section className='bg-white w-full py-12 sm:py-16 lg:py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-left mb-12 lg:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-4'>
            Compare Your <span className='text-[#ff3576]'>Treatment Options</span>
          </h2>
          <p className='text-lg text-gray-600'>
            See how Genicular Artery Embolization compares to traditional surgical approaches.
          </p>
        </div>

        {/* Treatment Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12'>
          {treatments.map((treatment, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl bg-white text-gray-800 border-2 border-gray-200 hover:border-[#ff3576] hover:bg-[#ff3576] hover:text-white group`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100 group-hover:bg-white/20`}
              >
                {shouldShowImage(treatment.img) ? (
                  <img
                    src={treatment.img}
                    alt={treatment.title}
                    className='w-10 h-10 object-contain'
                    onError={() => handleImageError(treatment.img)}
                    loading="lazy"
                    key={`${treatment.img}-${imageLoadAttempts[treatment.img] || 0}`}
                  />
                ) : (
                  <div className='w-10 h-10 bg-[#ff3576] rounded-full flex items-center justify-center'>
                    <span className='text-white font-bold text-xs'>
                      {treatment.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className={`text-xl font-bold mb-3 text-[#ff3576] group-hover:text-white`}>
                {treatment.title}
              </h3>
              <p className={`text-sm leading-relaxed text-gray-600 group-hover:text-white/90`}>
                {treatment.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className='overflow-x-auto mb-12'>
          <table className='w-full'>
            <thead>
              <tr className='bg-[#2d2552] text-white'>
                <th className='py-4 px-4 text-left font-semibold'>Treatment</th>
                <th className='py-4 px-4 text-center font-semibold'>Genicular Artery Embolization</th>
                <th className='py-4 px-4 text-center font-semibold'>Total Knee Replacement</th>
                <th className='py-4 px-4 text-center font-semibold'>Platelet Rich Plasma</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className='py-4 px-4 font-semibold text-gray-800'>{row.label}</td>
                  <td className='py-4 px-4 text-center'>{row.gae}</td>
                  <td className='py-4 px-4 text-center text-gray-600'>{row.tkr}</td>
                  <td className='py-4 px-4 text-center text-gray-600'>{row.prp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default GAE_Compare_treatment_option;
