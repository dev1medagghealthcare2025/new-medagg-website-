import React from 'react';

const treatments = [
  {
    name: 'Endovenous Ablation',
    icon: '/vv_compare1.jpg',
    description: 'Heat-based procedure. Minimally invasive outpatient procedure using local anesthesia and hence quick recovery.',
    highlight: true,
  },
  {
    name: 'Vein Stripping',
    icon: '/vv_compare2.jpg',
    description: 'Surgical procedure with general or spinal anesthesia. Hospital stay required. Vein removal through incisions. Longer recovery.',
    highlight: false,
  },
  {
    name: 'Venous Glue Closure',
    icon: '/vv_compare3.jpg',
    description: 'Minimally invasive outpatient procedure with quick recovery. Glue based vein closure.',
    highlight: false,
  },
];

const comparisonData = [
  {
    feature: 'Procedure Type',
    options: ['Non-Surgical', 'Major surgery', 'Non-Surgical'],
  },
  {
    feature: 'Invasiveness',
    options: ['Minimally Invasive', 'Highly Invasive', 'Minimally Invasive'],
  },
  {
    feature: 'Hospital Stay',
    options: ['Day Care Procedure', '2-3 Days', 'Day Care Procedure'],
  },
  {
    feature: 'Scars / Sutures',
    options: ['None', 'Minimal', 'None'],
  },
  {
    feature: 'Recovery',
    options: ['1-2 Days', '2-4 Weeks', '1-2 Days'],
  },
  {
    feature: 'Performed By',
    options: ['Vascular Surgeon or IR', 'Vascular Surgeon', 'Vascular Surgeon or IR'],
  },
];

const CompareTreatmentOptions = () => {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2552]">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            See how Uterine artery embolization compares to traditional surgical approaches.
          </p>
        </div>

        {/* Treatment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className={'group rounded-2xl p-8 text-center border bg-white border-gray-200 hover:bg-[#ff3576] hover:border-transparent transition-colors duration-300 cursor-pointer'}
            >
              <img src={treatment.icon} alt={`${treatment.name} icon`} className="mx-auto h-16 w-16 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-[#2d2552] group-hover:text-white">
                {treatment.name}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-white">
                {treatment.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full border border-gray-200 rounded-lg">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-[#2d2552] text-white font-bold">
              <div className="p-4">Treatment</div>
              <div className="p-4">Endovenous Ablation</div>
              <div className="p-4">Vein Stripping</div>
              <div className="p-4">Venous Glue</div>
            </div>
            {/* Table Body */}
            <div>
              {comparisonData.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-4 items-center border-t border-gray-200">
                  <div className="p-4 font-semibold text-[#2d2552]">{row.feature}</div>
                  {row.options.map((option, colIndex) => (
                    <div
                      key={colIndex}
                      className={`p-4 ${colIndex === 0 ? 'bg-pink-50 text-[#ff3576] font-medium' : 'text-gray-700'}`}>
                      {option}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ISVIR Member Section */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <img src="/member of ISVIR.jpg" alt="ISVIR Logo" className="h-24" />
        
        </div>

      </div>
    </div>
  );
};

export default CompareTreatmentOptions;
