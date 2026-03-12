
import React from 'react';

const TARE_Compare = () => {
  const comparisonCards = [
    {
      title: 'Y-90 Radioembolization',
      image: '/y90_comapre1.png',
      description: 'Targeted radiation delivered directly to liver tumors through blood vessels.',
      highlight: true
    },
    {
      title: 'Surgery',
      image: '/y90_compare2.png',
      description: 'Removal of liver tumors through an open or laparoscopic operation.'
    },
    {
      title: 'Systemic Chemotherapy',
      image: '/y90_compare3.png',
      description: 'Drug treatment that circulates throughout the body to control tumor growth.'
    }
  ];

  const tableData = [
    {
      feature: 'Procedure Type',
      y90: 'Non-Surgical',
      surgery: 'Major Surgery',
      chemo: 'Non-surgical',
      y90Highlight: true
    },
    {
      feature: 'Invasiveness',
      y90: 'Minimally Invasive',
      surgery: 'Highly Invasive',
      chemo: 'Non-Invasive',
      y90Highlight: true
    },
    {
      feature: 'Hospital Stay',
      y90: 'Short Stay',
      surgery: 'Several Days',
      chemo: 'Usually Outpatient'
    },
    {
      feature: 'Scars / Sutures',
      y90: 'None',
      surgery: 'Present',
      chemo: 'None'
    },
    {
      feature: 'Recovery',
      y90: 'Faster Recovery',
      surgery: 'Longer Recovery',
      chemo: 'Variable'
    },
    {
      feature: 'Performed By',
      y90: 'Interventional Radiologist',
      surgery: 'Surgical Oncologist',
      chemo: 'Medical Oncologist'
    }
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d2552]">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-4xl text-sm sm:text-base">
            See how Y-90 Radioembolization compares to conventional liver tumor treatments, offering targeted therapy with minimal downtime and faster recovery.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {comparisonCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 border border-[#ff3576]/30 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:bg-[#ff3576] group hover:shadow-lg hover:border-[#ff3576]"
            >
              <div className="w-20 h-20 mb-6 flex items-center justify-center bg-pink-50 rounded-full p-4 overflow-hidden group-hover:bg-white transition-colors duration-300">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-contain transition-all duration-300" 
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#ff3576] group-hover:text-white transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-lg">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#1e1b4b] text-white">
                <th className="py-5 px-6 font-bold text-sm tracking-wider uppercase">Treatment</th>
                <th className="py-5 px-6 font-bold text-sm tracking-wider uppercase">Y-90 Radioembolization</th>
                <th className="py-5 px-6 font-bold text-sm tracking-wider uppercase">Surgery</th>
                <th className="py-5 px-6 font-bold text-sm tracking-wider uppercase">Systemic Chemotherapy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-bold text-[#1e1b4b] text-sm sm:text-base whitespace-nowrap">{row.feature}</td>
                  <td className={`py-5 px-6 text-sm sm:text-base ${row.y90Highlight ? 'text-[#ff3576] font-bold' : 'text-gray-600'}`}>
                    {row.y90}
                  </td>
                  <td className="py-5 px-6 text-gray-600 text-sm sm:text-base">{row.surgery}</td>
                  <td className="py-5 px-6 text-gray-600 text-sm sm:text-base">{row.chemo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TARE_Compare;
