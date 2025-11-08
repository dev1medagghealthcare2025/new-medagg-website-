import React from 'react';

const CompareTreatmentVAE = () => {
  const comparisonData = [
    {
      feature: 'Procedure Type',
      vae: 'Non-Surgical',
      surgical: 'Traditional Surgery (Lumpectomy & Mastectomy)',
    },
    {
      feature: 'Invasiveness',
      vae: 'Very low',
      surgical: 'High',
    },
    {
      feature: 'Hospital Stay',
      vae: 'Day Care / Outpatient',
      surgical: '2–3 Days',
    },
    {
      feature: 'Blood Loss',
      vae: 'Minimal',
      surgical: 'Moderate',
    },
    {
      feature: 'Recovery',
      vae: '1–3 Days',
      surgical: '1–2 Weeks',
    },
    {
      feature: 'Performed By',
      vae: 'Interventional Radiologist',
      surgical: 'Breast/Oncoplastic Surgeon',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-[#2d2552] sm:text-4xl">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto sm:mx-0">
            See how Vacuum-Assisted Excision compares to traditional surgical approaches.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#ff3576] rounded-lg p-8 text-center shadow-lg group hover:bg-[#ff3576] transition-all duration-300 cursor-pointer">
            <img src="/VAE_Comapre1.jpg" alt="Vacuum-Assisted Excision" className="mx-auto h-20 w-20" />
            <h3 className="mt-6 text-xl font-bold text-[#ff3576] group-hover:text-white">Vacuum-Assisted Excision</h3>
            <p className="mt-2 text-gray-600 group-hover:text-white">
              Minimally invasive, uses extreme cold to destroy abnormal breast tissue, with a short recovery time.
            </p>
          </div>
          <div className="bg-white border border-[#ff3576] rounded-lg p-8 text-center shadow-lg group hover:bg-[#ff3576] transition-all duration-300 cursor-pointer">
            <img src="/VAE_Compare2.jpg" alt="Surgical Excision" className="mx-auto h-20 w-20" />
            <h3 className="mt-6 text-xl font-bold text-[#ff3576] group-hover:text-white">Surgical Excision</h3>
            <p className="mt-2 text-gray-600 group-hover:text-white">
              Open invasive surgery to remove abnormal breast tissue, used for complex cases, with a longer recovery time.
            </p>
          </div>
        </div>

        <div className="mt-12 overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border-b border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#2d2552]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Treatment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Vacuum-Assisted Excision
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Surgical Excision
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisonData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.feature}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.vae}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.surgical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <img src="/member of ISVIR.jpg" alt="ISVIR Member" className="h-20 sm:h-24 w-auto max-w-xs" />
          
        </div>
      </div>
    </div>
  );
};

export default CompareTreatmentVAE;
