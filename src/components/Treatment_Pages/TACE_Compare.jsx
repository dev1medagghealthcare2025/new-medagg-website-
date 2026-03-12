import React from 'react';

const TACE_Compare = () => {
  const options = [
    {
      title: 'TACE (Transarterial Chemoembolization)',
      description: 'A minimally invasive procedure that delivers chemotherapy directly into tumor-feeding arteries.',
      image: '/y90_comapre1.png',
      active: true,
    },
    {
      title: 'Liver Surgery',
      description: 'Removal of tumors through an open or laparoscopic surgical operation.',
      image: '/y90_compare2.png',
      active: false,
    },
    {
      title: 'Systemic Chemotherapy',
      description: 'Drug treatment that circulates throughout the body to treat tumors',
      image: '/y90_compare3.png',
      active: false,
    },
  ];

  const comparisonData = [
    { label: 'Procedure Type', tace: 'Non-Surgical', surgery: 'Major Surgery', chemo: 'Non-surgical', highlight: true },
    { label: 'Invasiveness', tace: 'Minimally Invasive', surgery: 'Highly Invasive', chemo: 'Non-Invasive', highlight: true },
    { label: 'Hospital Stay', tace: 'Short Stay', surgery: '4-7 Days', chemo: 'Usually Outpatient' },
    { label: 'Scars / Sutures', tace: 'None', surgery: 'Present', chemo: 'None' },
    { label: 'Recovery', tace: 'Faster Recovery', surgery: 'Longer Recovery', chemo: 'Variable' },
    { label: 'Performed By', tace: 'Interventional Radiologist', surgery: 'Hepatobiliary Surgeon', chemo: 'Medical Oncologist' },
  ];

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241b3a]">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-3xl">
            See how TACE compares to traditional surgical approaches and other treatment options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {options.map((option, index) => (
            <div
              key={index}
              className={`rounded-2xl border-2 border-black bg-white p-6 flex flex-col items-center text-center shadow-sm transition-all duration-300 hover:border-[#ff3576] hover:shadow-md cursor-pointer group`}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img src={option.image} alt={option.title} className="w-full h-full object-contain" />
              </div>
              <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${option.active ? 'text-[#ff3576]' : 'text-[#2d2552]'} group-hover:text-[#ff3576]`}>
                {option.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {option.description}
              </p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1e1b4b] text-white">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Treatment</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">TACE</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Surgery</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Systemic Chemotherapy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {comparisonData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-[#2d2552]">{row.label}</td>
                  <td className={`px-6 py-4 text-sm font-bold ${row.highlight ? 'text-[#ff3576]' : 'text-gray-600'}`}>
                    {row.tace}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.surgery}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.chemo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TACE_Compare;
