import React from 'react';

const comparisonData = [
  {
    feature: 'Procedure Type',
    tavr: 'Non-Surgical',
    surgery: 'Major Surgery',
  },
  {
    feature: 'Invasiveness',
    tavr: 'Minimally Invasive',
    surgery: 'More Invasive',
  },
  {
    feature: 'Hospital Stay',
    tavr: '2-3 Days',
    surgery: '5-7 Days',
  },
  {
    feature: 'Scars / Sutures',
    tavr: 'Minimal',
    surgery: 'Yes',
  },
  {
    feature: 'Anesthesia',
    tavr: 'Local Anesthesia with Sedation',
    surgery: 'General Anesthesia',
  },
  {
    feature: 'Risk Factors',
    tavr: 'Lower Risk Compare to Surgery',
    surgery: 'High Risk Due to Major Surgery',
  },
  {
    feature: 'Performed By',
    tavr: 'Interventional Radiologist',
    surgery: 'Cardiothoracic Surgeon',
  },
];

const CompareTAVITreatments = () => {
  return (
    <section className="py-10 md:py-16 bg-white font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Compare Your <span className="text-pink-500">Treatment Options</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-3xl">
            Understand the differences between minimally invasive and surgical treatment.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* TAVI Card */}
          <div className="group border border-pink-200 rounded-lg p-6 shadow-md hover:bg-pink-500 transition-colors duration-300">
            <img src="/TAVI_compare1.jpg" alt="TAVI Icon" className="mx-auto h-16 w-16 mb-3" />
            <h3 className="text-xl font-bold text-center text-pink-500 mb-2 group-hover:text-white">Transcatheter Aortic Valve Replacement</h3>
            <p className="text-center text-gray-600 group-hover:text-pink-100 text-sm md:text-base">Open-heart surgery, Longer recovery time, Suitable for a wider range of patients</p>
          </div>
          {/* Surgery Card */}
          <div className="group border border-pink-200 rounded-lg p-6 shadow-md hover:bg-pink-500 transition-colors duration-300">
            <img src="/TAVI_Compare2.jpg" alt="Surgery Icon" className="mx-auto h-16 w-16 mb-3" />
            <h3 className="text-xl font-bold text-center text-pink-500 mb-2 group-hover:text-white">Aortic Valve Replacement Surgery</h3>
            <p className="text-center text-gray-600 group-hover:text-pink-100 text-sm md:text-base">Minimally invasive, a short recovery time, Suitable for high-risk or inoperable patients</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full bg-white border-t border-b border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-blue-900 text-white font-bold">
              <div className="p-3">Treatment</div>
              <div className="p-3">TAVR/TAVI (Transcatheter Aortic Valve Replacement/Implantation)</div>
              <div className="p-3">Aortic Valve Replacement Surgery</div>
            </div>
            {/* Table Body */}
            <div>
              {comparisonData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 border-b border-gray-200 items-center">
                  <div className="p-3 font-semibold text-gray-800">{item.feature}</div>
                  <div className="p-3 text-pink-500 font-medium">{item.tavr}</div>
                  <div className="p-3 text-gray-600">{item.surgery}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer spacer */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          
  
        </div>
      </div>
    </section>
  );
};

export default CompareTAVITreatments;
