import React from 'react';

const comparisonData = [
  { label: 'Procedure Type', ftr: 'Non-Surgical', ls: 'Surgical' },
  { label: 'Invasiveness', ftr: 'Minimally Invasive', ls: 'Highly Invasive' },
  { label: 'Hospital Stay', ftr: '1-3 Days', ls: 'No Hospital Stay' },
  { label: 'Scars / Sutures', ftr: 'None', ls: 'Sutures' },
  { label: 'Recovery', ftr: '2-3 Days', ls: '3-4 Weeks' },
  { label: 'Performed By', ftr: 'Interventional Radiologist', ls: 'Gynaecologist' },
];

const CompareTreatmentOptionFTE = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2552]">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            See how Fallopian Tube Recanalization compares to traditional surgical approaches.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Fallopian Tube Recanalization with Hover Effect */}
          <div className="relative group border border-pink-300 rounded-xl p-8 text-center shadow-lg overflow-hidden transition-all duration-300">
            <div className="relative z-10">
                <img src="/fte_compare1.jpg" alt="Fallopian Tube Icon" className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-[#2D2552] group-hover:text-white transition-colors duration-300">Fallopian Tube Recanalization</h3>
                <p className="text-gray-600 group-hover:text-white transition-colors duration-300">Non-surgical, typically requires local anesthesia, quick recovery, and restores fertility by clearing blockages.</p>
            </div>
            <div className="absolute inset-0 bg-[#ff3576] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
          </div>

          {/* Card 2: Laparoscopic Surgery with Hover Effect */}
          <div className="relative group border border-pink-300 rounded-xl p-8 text-center shadow-lg overflow-hidden transition-all duration-300">
            <div className="relative z-10">
                <img src="/fte_compare2.jpg" alt="Laparoscopic Surgery Icon" className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#2D2552] mb-2 group-hover:text-white transition-colors duration-300">Laparoscopic Surgery</h3>
                <p className="text-gray-600 group-hover:text-white transition-colors duration-300">Small incisions are made to insert a camera and specialized tools for treatment. It offers less pain, quicker recovery, and smaller scars compared to open surgery.</p>
            </div>
            <div className="absolute inset-0 bg-[#ff3576] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full border-collapse">
            <div className="bg-[#2D2552] text-white grid grid-cols-3 font-bold">
              <div className="p-4">Treatment</div>
              <div className="p-4">Fallopian Tube Recanalization</div>
              <div className="p-4">Laparoscopic Surgery</div>
            </div>
            {comparisonData.map((row, index) => (
              <div key={index} className={`grid grid-cols-3 items-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="p-4 font-semibold text-[#2D2552]">{row.label}</div>
                <div className="p-4 text-[#ff3576]">{row.ftr}</div>
                <div className="p-4 text-gray-700">{row.ls}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer spacer (ISVIR logo removed) */}
        <div className="mt-12" />
      </div>
    </section>
  );
};

export default CompareTreatmentOptionFTE;
