import React from 'react';

const TreatmentCompareEC = () => {
  const comparisonData = [
    {
      feature: 'Procedure Type',
      endovascular: 'Non - Surgical',
      surgical: 'Major Surgery',
    },
    {
      feature: 'Invasiveness',
      endovascular: 'Minimally Invasive',
      surgical: 'More Invasive',
    },
    {
      feature: 'Hospital Stay',
      endovascular: '1 - 3 days',
      surgical: '5- 7 days',
    },
    {
      feature: 'Scars / Sutures',
      endovascular: 'Minimal or None',
      surgical: 'Yes',
    },
    {
      feature: 'Anesthesia',
      endovascular: 'Local Anesthesia with Sedation',
      surgical: 'General Anesthesia',
    },
    {
      feature: 'Risk Factors',
      endovascular: 'Lower Risk Compare to Surgery',
      surgical: 'High Risk Due to Major Surgery',
    },
    {
      feature: 'Performed By',
      endovascular: 'Interventional Radiologist',
      surgical: 'Neurosurgeon',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-[#2d2552] sm:text-4xl">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore Endovascular Coiling versus Surgical Clipping:
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#ff3576] rounded-lg p-8 text-center shadow-lg group hover:bg-[#ff3576] transition-all duration-300 cursor-pointer">
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-16 border-2 border-[#ff3576] group-hover:border-white group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300">
                <img src="/EC_compare1.jpg" alt="Endovascular Coiling" className="w-10 h-10" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#ff3576] group-hover:text-white mb-4 transition-colors duration-300">Endovascular Coiling</h3>
            <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
              Minimally invasive, uses coils to treat aneurysms, with quick recovery.
            </p>
          </div>
          
          <div className="bg-white border border-[#ff3576] rounded-lg p-8 text-center shadow-lg group hover:bg-[#ff3576] transition-all duration-300 cursor-pointer">
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-16 border-2 border-[#ff3576] group-hover:border-white group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300">
                <img src="/EC_Compare2.jpg" alt="Surgical Clipping" className="w-10 h-10" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#ff3576] group-hover:text-white mb-4 transition-colors duration-300">Surgical Clipping</h3>
            <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
              Open invasive surgery to clip aneurysms. Used for complex cases. Longer recovery time.
            </p>
          </div>
        </div>

        <div className="mt-12 overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#2d2552]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Treatment
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Endovascular Coiling
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                      Surgical Clipping
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.feature}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ff3576] font-medium">
                        {item.endovascular}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.surgical}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TreatmentCompareEC;