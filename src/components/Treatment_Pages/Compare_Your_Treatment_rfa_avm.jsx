import React from 'react';

const comparisonData = [
  { feature: 'Procedure Type', rfa: 'Non - Surgical', resection: 'Major Surgery' },
  { feature: 'Invasiveness', rfa: 'Minimally Invasive', resection: 'More Invasive' },
  { feature: 'Hospital Stay', rfa: 'Same-day or 1-day stay', resection: '4-7 days' },
  { feature: 'Scars / Sutures', rfa: 'Minimal or None', resection: 'Yes' },
  { feature: 'Anesthesia', rfa: 'Local Anesthesia with Sedation', resection: 'General Anesthesia' },
  { feature: 'Risk Factors', rfa: 'Lower Risk Compare to Surgery', resection: 'High Risk Due to Major Surgery' },
  { feature: 'Performed By', rfa: 'Interventional Radiologist', resection: 'Neurosurgeon' },
];

const CompareYourTreatmentRFAAVM = () => {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Compare Your <span className="text-pink-500">Treatment Options</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore RFA versus open AVM surgery
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="group border border-gray-300 rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-pink-500">
            <img src="/rfa_for_avm_compare1.png" alt="RFA Icon" className="h-16 w-16 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-white">RFA (Radiofrequency Ablation)</h3>
            <p className="text-gray-600 transition-colors duration-300 group-hover:text-white">Minimally invasive, uses heat energy to treat AVMs effectively, ensuring precise targeting with a short recovery time.</p>
          </div>
          <div className="group border border-gray-300 rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-pink-500">
            <img src="/rfa_for_avm_compare2.png" alt="AVM Resection Icon" className="h-16 w-16 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-white">AVM Resection</h3>
            <p className="text-gray-600 transition-colors duration-300 group-hover:text-white">Open surgical procedure to remove AVMs, used for complex cases, with a longer recovery time.</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-800 text-white">
                <th className="p-4 font-bold">Treatment</th>
                <th className="p-4 font-bold">Endovascular Coiling</th>
                <th className="p-4 font-bold">Surgical Clipping</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700">{row.feature}</td>
                  <td className="p-4 text-pink-500 bg-pink-50">{row.rfa}</td>
                  <td className="p-4 text-gray-600">{row.resection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompareYourTreatmentRFAAVM;