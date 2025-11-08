import React from 'react';

const treatmentOptions = [
  {
    title: 'Varicocele Embolization',
    description: 'Minimally invasive, local anesthesia, outpatient, and quick recovery.',
    icon: '/varicocele_compare1.jpg',
    isFeatured: true,
  },
  {
    title: 'Open Varicocelectomy',
    description: 'Surgical, general/spinal anesthesia, hospital stay, and longer recovery.',
    icon: '/Varcocele_compare2.jpg',
    isFeatured: false,
  },
  {
    title: 'Laparoscopic Varicocelectomy',
    description: 'Minimally invasive surgery, general anesthesia, hospital stay, and moderate recovery.',
    icon: '/varicocele_compare3.jpg',
    isFeatured: false,
  },
];

const comparisonData = [
  { feature: 'Procedure Type', options: ['Non - Surgical', 'Surgical', 'Surgical'] },
  { feature: 'Invasiveness', options: ['Minimally Invasive', 'Highly Invasive', 'Minimally Invasive'] },
  { feature: 'Hospital Stay', options: ['Day Care Procedure', '3-4 Days', '1-2 Days'] },
  { feature: 'Scars / Sutures', options: ['None', 'Sutures', 'Noticeable Scar'] },
  { feature: 'Recovery', options: ['2-3 Days', '3-4 Weeks', '1 Week'] },
  { feature: 'Performed By', options: ['Interventional Radiologist', 'Urologist', 'Lap Trained Urologist'] },
];

const CompareTreatmentOptionVaricocele = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d2552]">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how varicocele embolization compares to traditional surgical approaches.
          </p>
        </div>

        {/* Treatment Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {treatmentOptions.map((option, index) => (
                        <div 
              key={index}
              className={`group relative rounded-2xl p-8 text-center border transition-all duration-300 ${option.isFeatured ? 'bg-white border-[#ff3576]' : 'bg-white border-gray-200'}`}>
              <div className={`absolute inset-0 bg-[#ff3576] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                    <img src={option.icon} alt={`${option.title} icon`} className="h-16 w-16" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${option.isFeatured ? 'text-[#2d2552]' : 'text-[#2d2552]'} group-hover:text-white`}>{option.title}</h3>
                <p className={`${option.isFeatured ? 'text-gray-600' : 'text-gray-600'} group-hover:text-pink-100`}>{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 bg-[#2d2552] text-white font-bold rounded-tl-lg">Treatment</th>
                <th className="p-4 bg-[#2d2552] text-white font-bold">Varicocele Embolization</th>
                <th className="p-4 bg-[#2d2552] text-white font-bold">Open Varicocelectomy</th>
                <th className="p-4 bg-[#2d2552] text-white font-bold rounded-tr-lg">Laparoscopic Varicocelectomy</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-[#2d2552]">{row.feature}</td>
                  {row.options.map((option, colIndex) => (
                    <td key={colIndex} className={`p-4 ${colIndex === 0 ? 'bg-pink-50 text-[#ff3576] font-medium' : 'text-gray-700'}`}>
                      {option}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ISVIR Membership */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <img src="/member of ISVIR.jpg" alt="ISVIR Logo" className="h-28 object-contain" />
            <div className="w-px bg-gray-300 h-16 hidden md:block"></div>
        </div>

      </div>
    </section>
  );
};

export default CompareTreatmentOptionVaricocele;
