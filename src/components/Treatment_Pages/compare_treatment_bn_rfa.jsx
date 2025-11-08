import React from 'react';

const CompareTreatmentBnRFA = () => {
  const comparisonData = [
    {
      feature: 'Procedure Type',
      rfa: 'Non-Surgical',
      surgical: 'Traditional Surgery (Lumpectomy & Mastectomy)',
    },
    {
      feature: 'Invasiveness',
      rfa: 'Very low',
      surgical: 'High',
    },
    {
      feature: 'Hospital Stay',
      rfa: 'Day Care / Outpatient',
      surgical: '2-3 Days',
    },
    {
      feature: 'Blood Loss',
      rfa: 'Minimal',
      surgical: 'Moderate',
    },
    {
      feature: 'Recovery',
      rfa: '1-3 Days',
      surgical: '1-2 Weeks',
    },
    {
      feature: 'Performed By',
      rfa: 'Interventional Radiologist',
      surgical: 'Breast/Oncoplastic Surgeon',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-4 text-base text-gray-600">
            See how Radiofrequency Ablation compares to traditional surgical approaches.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Radiofrequency Ablation Card */}
          <div className="group border border-[#ff3576] rounded-2xl p-6 text-center flex flex-col items-center hover:bg-[#ff3576] transition-colors duration-300 cursor-pointer">
            <img src="/BN_RFA_Comapre1.png" alt="RFA Icon" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-bold text-[#2d2552] mb-2 group-hover:text-white">Radiofrequency Ablation</h3>
            <p className="text-sm text-gray-600 group-hover:text-white">
              Minimally invasive, uses extreme cold to destroy abnormal breast tissue, with a short recovery time.
            </p>
          </div>

          {/* Surgical Excision Card */}
          <div className="group border border-[#ff3576] rounded-2xl p-6 text-center flex flex-col items-center hover:bg-[#ff3576] transition-colors duration-300 cursor-pointer">
            <img src="/BN_RFA_Compare2.png" alt="Surgical Icon" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-bold text-[#2d2552] mb-2 group-hover:text-white">Surgical Excision</h3>
            <p className="text-sm text-gray-600 group-hover:text-white">
              Open invasive surgery to remove abnormal breast tissue, used for complex cases, with a longer recovery time.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="w-[1202px] h-[523px] mx-auto rounded-2xl overflow-hidden border border-gray-200 flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-[#2d2552] text-white font-bold">
            <div className="p-4">Treatment</div>
            <div className="p-4">Radiofrequency ablation (RFA)</div>
            <div className="p-4">Surgical Excision</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200 flex-grow flex flex-col">
            {comparisonData.map((row, index) => (
              <div key={index} className="grid grid-cols-3 items-center flex-grow">
                <div className="p-4 font-semibold text-[#2d2552]">{row.feature}</div>
                <div className={`p-4 ${['Procedure Type', 'Invasiveness', 'Hospital Stay', 'Blood Loss', 'Recovery', 'Performed By'].includes(row.feature) ? 'text-[#ff3576]' : 'text-gray-700'}`}>{row.rfa}</div>
                <div className="p-4 text-gray-700">{row.surgical}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* ISVIR Member Section */}
        <div className="max-w-5xl mx-auto mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
            <img src="/member of ISVIR.jpg" alt="ISVIR Logo" className="h-24" />
        
        </div>

      </div>
    </div>
  );
};

export default CompareTreatmentBnRFA;