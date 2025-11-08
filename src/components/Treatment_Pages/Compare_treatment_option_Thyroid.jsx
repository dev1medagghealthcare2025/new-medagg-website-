import React from 'react';

const treatments = [
  {
    title: 'Thyroid Ablation',
    img: '/Thyroid_compare1.jpg',
    desc: 'Minimally invasive procedure to shrink thyroid nodules using heat.',
    highlight: true,
  },
  {
    title: 'Embolization',
    img: '/Thyroid_compare2.png',
    desc: 'Non-invasive procedure to block blood flow, shrinking thyroid nodules.',
    highlight: false,
  },
  {
    title: 'Total Thyroidectomy',
    img: '/Thyroid_compare3.jpg',
    desc: 'Requires general anesthesia, and surgical removal of the thyroid gland.',
    highlight: false,
  },
];

const tableRows = [
  {
    label: 'Procedure Type',
    ablation: <span className='text-[#ff3576] font-medium'>Non – Surgical</span>,
    embolization: 'Non-Surgical',
    thyroidectomy: 'Surgical',
  },
  {
    label: 'Invasiveness',
    ablation: <span className='text-[#ff3576] font-medium'>Minimally Invasive</span>,
    embolization: 'Minimally Invasive',
    thyroidectomy: 'Highly Invasive',
  },
  {
    label: 'Hospital Stay',
    ablation: <span className='text-[#ff3576] font-medium'>Day Care Procedure</span>,
    embolization: 'Day Care Procedure',
    thyroidectomy: '3-4 Days',
  },
  {
    label: 'Scars / Sutures',
    ablation: <span className='text-[#ff3576] font-medium'>None</span>,
    embolization: 'None',
    thyroidectomy: 'Noticeable Scar',
  },
  {
    label: 'Recovery',
    ablation: <span className='text-[#ff3576] font-medium'>1-2 Days</span>,
    embolization: '1-2 Days',
    thyroidectomy: '1-2 Weeks',
  },
  {
    label: 'Applicability',
    ablation: <span className='text-[#ff3576] font-medium'>Distinct nodules in the thyroid gland</span>,
    embolization: 'Multiple Nodules/ Goitre',
    thyroidectomy: 'Multiple Nodules/ Goitre',
  },
];

const CompareTreatmentOptionThyroid = () => (
  <section className='bg-white w-full py-12 sm:py-16 lg:py-20'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='text-left mb-12 lg:mb-16'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-4'>
          Compare Your <span className='text-[#ff3576]'>Treatment Options</span>
        </h2>
        <p className='text-lg text-gray-600'>
          See how thyroid ablation compares to traditional surgical approaches.
        </p>
      </div>

      {/* Treatment Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12'>
        {treatments.map((treatment, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 text-center transition-all duration-300 hover:bg-[#ff3576] hover:text-white group ${
              treatment.highlight
                ? 'bg-white text-[#2d2552] border-2 border-[#ff3576] shadow-lg'
                : 'bg-white text-gray-800 border-2 border-[#ff3576]/50 hover:border-[#ff3576] hover:shadow-xl'
            }`}
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 transition-colors duration-300 group-hover:border-white ${treatment.highlight ? 'bg-white border-[#ff3576]' : 'bg-white border-[#ff3576]/50'}`}
            >
              <img
                src={treatment.img}
                alt={treatment.title}
                className='w-12 h-12 object-contain'
              />
            </div>
            <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
              treatment.highlight ? 'text-[#2d2552] group-hover:text-white' : 'text-[#2d2552] group-hover:text-white'
            }`}>
              {treatment.title}
            </h3>
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              treatment.highlight ? 'text-gray-600 group-hover:text-white/90' : 'text-gray-600 group-hover:text-white/90'
            }`}>
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
              <th className='py-4 px-4 text-center font-semibold'>Ablation</th>
              <th className='py-4 px-4 text-center font-semibold'>Embolization</th>
              <th className='py-4 px-4 text-center font-semibold'>Total Thyroidectomy</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className='py-4 px-4 font-semibold text-gray-800'>{row.label}</td>
                <td className='py-4 px-4 text-center'>{row.ablation}</td>
                <td className='py-4 px-4 text-center text-gray-600'>{row.embolization}</td>
                <td className='py-4 px-4 text-center text-gray-600'>{row.thyroidectomy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ISVIR Membership */}
      <div className='flex justify-center py-8'>
        <img
          src='/member of ISVIR.jpg'
          alt='Corporate Member of ISVIR'
          className='w-auto h-auto max-w-full md:max-w-4xl object-contain'
        />
      </div>
    </div>
  </section>
);

export default CompareTreatmentOptionThyroid;
