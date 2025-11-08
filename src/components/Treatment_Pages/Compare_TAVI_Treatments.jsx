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
    <section className="py-16 md:py-24 bg-white font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Compare Your <span className="text-pink-500">Treatment Options</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Understand the differences between minimally invasive and surgical treatment.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* TAVI Card */}
          <div className="group border border-pink-200 rounded-lg p-8 shadow-lg hover:bg-pink-500 transition-colors duration-300">
            <img src="/TAVI_compare1.jpg" alt="TAVI Icon" className="mx-auto h-20 w-20 mb-4" />
            <h3 className="text-xl font-bold text-center text-pink-500 mb-2 group-hover:text-white">Transcatheter Aortic Valve Replacement</h3>
            <p className="text-center text-gray-600 group-hover:text-pink-100">Open-heart surgery, Longer recovery time, Suitable for a wider range of patients</p>
          </div>
          {/* Surgery Card */}
          <div className="group border border-pink-200 rounded-lg p-8 shadow-lg hover:bg-pink-500 transition-colors duration-300">
            <img src="/TAVI_Compare2.jpg" alt="Surgery Icon" className="mx-auto h-20 w-20 mb-4" />
            <h3 className="text-xl font-bold text-center text-pink-500 mb-2 group-hover:text-white">Aortic Valve Replacement Surgery</h3>
            <p className="text-center text-gray-600 group-hover:text-pink-100">Minimally invasive, a short recovery time, Suitable for high-risk or inoperable patients</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full bg-white border-t border-b border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-blue-900 text-white font-bold">
              <div className="p-4">Treatment</div>
              <div className="p-4">TAVR/TAVI (Transcatheter Aortic Valve Replacement/Implantation)</div>
              <div className="p-4">Aortic Valve Replacement Surgery</div>
            </div>
            {/* Table Body */}
            <div>
              {comparisonData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 border-b border-gray-200 items-center">
                  <div className="p-4 font-semibold text-gray-800">{item.feature}</div>
                  <div className="p-4 text-pink-500 font-medium">{item.tavr}</div>
                  <div className="p-4 text-gray-600">{item.surgery}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Logos */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <img src="/member of ISVIR.jpg" alt="ISVIR Logo" className="h-24" />
          <div className="flex items-center gap-4">
            <div className="h-20 w-px bg-gray-300 hidden md:block"></div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareTAVITreatments;
