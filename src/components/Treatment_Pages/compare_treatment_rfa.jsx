import React from 'react';

const comparisonData = [
  { feature: 'Procedure Type', rfa: 'Non - Surgical', traditional: 'Major Surgery' },
  { feature: 'Invasiveness', rfa: 'Minimally Invasive', traditional: 'More Invasive' },
  { feature: 'Hospital Stay', rfa: 'Same Day or 1-Day Stay', traditional: '4-7 Days' },
  { feature: 'Scars / Sutures', rfa: 'No', traditional: 'Yes' },
  { feature: 'Anesthesia', rfa: 'Local Anesthesia with Sedation', traditional: 'General Anesthesia' },
  { feature: 'Risk Factors', rfa: 'Lower Risk Compare to Surgery', traditional: 'High Risk Due to Major Surgery' },
  { feature: 'Performed By', rfa: 'Interventional Radiologist', traditional: 'Cardiothoracic Surgeon' },
];

const Compare_treatment_rfa = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-3 text-lg text-gray-600">Explore RFA versus traditional arrhythmia surgery:</p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-[#ff3576] p-8 rounded-lg text-center hover:bg-[#ff3576] transition-all duration-300 group">
            <img src="/RFA_Compare1.png" alt="RFA Icon" className="mx-auto h-16 w-16 mb-4" />
            <h3 className="text-xl font-bold text-[#2d2552] group-hover:text-white">RFA (Radiofrequency Ablation)</h3>
            <p className="mt-2 text-gray-600 group-hover:text-white">Minimally invasive. Uses heat energy to destroy abnormal heart tissue, with a short recovery time.</p>
          </div>
          <div className="bg-white border border-[#ff3576] p-8 rounded-lg text-center hover:bg-[#ff3576] transition-all duration-300 group">
            <img src="/RFA_Compare2.png" alt="Surgery Icon" className="mx-auto h-16 w-16 mb-4" />
            <h3 className="text-xl font-bold text-[#2d2552] group-hover:text-white">Traditional Arrhythmia Surgery</h3>
            <p className="mt-2 text-gray-600 group-hover:text-white">Open invasive surgery to remove. Used for complex arrhythmias, Longer recovery time.</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2d2552] text-white">
                <th className="p-4 font-semibold">Treatment</th>
                <th className="p-4 font-semibold">RFA (Radiofrequency Ablation)</th>
                <th className="p-4 font-semibold">Traditional Arrhythmia Surgery</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-[#2d2552]">{item.feature}</td>
                  <td className="p-4 bg-[#ff3576] bg-opacity-10 text-[#ff3576] font-medium">{item.rfa}</td>
                  <td className="p-4 text-gray-600">{item.traditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default Compare_treatment_rfa;