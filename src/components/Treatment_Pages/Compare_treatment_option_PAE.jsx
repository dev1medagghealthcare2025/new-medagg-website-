import React from 'react';

const treatments = [
  {
    title: 'Prostate Artery Embolization',
    img: '/PAE.jpg',
    desc: 'Minimally invasive, uses local anesthesia, shorter recovery, and day care procedure.',
    highlight: true,
  },
  {
    title: 'Laser TURP',
    img: '/Laser TURP.jpg',
    desc: 'Minimally invasive procedure that uses laser energy to remove excess prostate tissue.',
    highlight: false,
  },
  {
    title: 'TURP',
    img: '/TURP.jpg',
    desc: 'Requires general or spinal anesthesia, longer recovery, hospital stay needed, and involves surgical removal.',
    highlight: false,
  },
];

const tableRows = [
  {
    label: 'Procedure Type',
    pae: <span className='text-[#FF4376] font-medium'>Non – Surgical</span>,
    laser: 'Surgical',
    turp: 'Surgical',
  },
  {
    label: 'Invasiveness',
    pae: <span className='text-[#FF4376] font-medium'>Minimally Invasive</span>,
    laser: 'Minimally Invasive',
    turp: 'More Invasive',
  },
  {
    label: 'Hospital Stay',
    pae: <span className='text-[#FF4376] font-medium'>Day Care Procedure</span>,
    laser: '1–2 days',
    turp: '3–4 days',
  },
  {
    label: 'Scars / Sutures',
    pae: <span className='text-[#FF4376] font-medium'>None</span>,
    laser: 'Minimal',
    turp: 'Minimal',
  },
  {
    label: 'Recovery',
    pae: <span className='text-[#FF4376] font-medium'>1–2 Days</span>,
    laser: '1 week',
    turp: '1–2 Weeks',
  },
  {
    label: 'Performed By',
    pae: <span className='text-[#FF4376] font-medium'>Interventional Radiologist</span>,
    laser: 'Urologist',
    turp: 'Urologist',
  },
];

const Compare_treatment_option_PAE = () => (
  <section className='bg-white w-full py-10 px-4 md:px-10 lg:px-20'>
    <div className='max-w-6xl mx-auto'>
      <h2 className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#2D2357] mb-2'>
        Compare Your <span className='text-[#FF4376]'>Treatment Options</span>
      </h2>
      <p className='text-gray-500 text-base md:text-lg mb-8'>
        See how Prostate Artery Embolization compares to traditional surgical approaches.
      </p>
      {/* Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        {treatments.map((t, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:bg-[#ff3576] hover:text-white group ${t.highlight ? 'bg-white text-[#2D2357] border-2 border-[#ff3576] shadow-lg' : 'bg-white text-[#2D2357] border border-[#ff3576] shadow-sm'}`}
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 border-2 transition-colors duration-300 group-hover:border-white ${t.highlight ? 'border-[#ff3576]' : 'border-[#ff3576]'}`}>
              <img src={t.img} alt={t.title} className='w-12 h-12 object-contain' />
            </div>
            <h3 className='font-bold text-lg mb-2 text-center'>{t.title}</h3>
            <p className='text-sm text-center font-medium opacity-90'>{t.desc}</p>
          </div>
        ))}
      </div>
      {/* Table */}
      <div className='overflow-x-auto rounded-xl shadow-sm'>
        <table className='min-w-full bg-white border border-[#2D2357]/10'>
          <thead>
            <tr className='bg-[#2D2357] text-white'>
              <th className='py-3 px-4 text-left font-bold'>Treatment</th>
              <th className='py-3 px-4 font-bold'>Prostate Artery Embolization</th>
              <th className='py-3 px-4 font-bold'>Laser TURP</th>
              <th className='py-3 px-4 font-bold'>TURP</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-[#F8F8FB]' : 'bg-white'}>
                <td className='py-3 px-4 font-semibold text-[#2D2357]'>{row.label}</td>
                <td className='py-3 px-4 text-center'>{row.pae}</td>
                <td className='py-3 px-4 text-center'>{row.laser}</td>
                <td className='py-3 px-4 text-center'>{row.turp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default Compare_treatment_option_PAE;
