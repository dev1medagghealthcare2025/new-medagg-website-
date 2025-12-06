import React from 'react';

const treatments = [
  {
    name: 'Adhesive Capsulitis Embolization',
    desc: 'Minimally invasive, uses local anaesthesia, faster recovery, day-care procedure.',
    icon: '/fr1.png',
    highlight: true,
  },
  {
    name: 'Physiotherapy',
    desc: 'Core first-line treatment but recovery may be slow or plateau in some patients.',
    icon: '/fr2.png',
  },
  {
    name: 'Steroid Injections',
    desc: 'Useful for short-term symptom relief; may need repetition.',
    icon: '/fr3.png',
  },
  {
    name: 'Manipulation Under Anaesthesia',
    desc: 'More invasive; considered when conservative treatments fail.',
    icon: '/fr4.png',
  },
];

const comparisonData = [
  {
    feature: 'Procedure Type',
    ace: 'Non-Surgical',
    physiotherapy: 'Non-surgical',
    steroid: 'Non-surgical',
    mua: 'Surgical',
  },
  {
    feature: 'Invasiveness',
    ace: 'Minimally Invasive',
    physiotherapy: 'None',
    steroid: 'Minimal Invasive',
    mua: 'Highly Invasive',
  },
  {
    feature: 'Hospital Stay',
    ace: 'Day Care Procedure',
    physiotherapy: 'OPD',
    steroid: 'OPD',
    mua: '1-2 days',
  },
  {
    feature: 'Scars / Sutures',
    ace: 'None',
    physiotherapy: 'None',
    steroid: 'None',
    mua: 'Possible',
  },
  {
    feature: 'Recovery',
    ace: 'Gradual improvement over weeks',
    physiotherapy: 'Slow, months',
    steroid: 'Short term',
    mua: 'Faster but with downtime',
  },
  {
    feature: 'Risk & Complications',
    ace: 'Uncommon in published studies',
    physiotherapy: 'None',
    steroid: 'Steroid effects possible',
    mua: 'Higher surgical risks',
  },
  {
    feature: 'Patient Suitability',
    ace: 'Patients not improving with standard care',
    physiotherapy: 'Early frozen shoulder',
    steroid: 'Pain relief',
    mua: 'Severe/refractory cases',
  },
];

const CompareFrozen = () => {
  return (
    <section className="w-full bg-gray-50 py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center lg:text-left mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]">
            Compare Your <span className="text-pink-600">Treatment Options</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto lg:mx-0">
            See how Adhesive Capsulitis Embolization compares to commonly used treatments.
          </p>
        </div>

        {/* Treatment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {treatments.map((treatment) => (
            <div
              key={treatment.name}
              className={`group rounded-2xl p-5 text-center transition-all duration-300 bg-white text-[#1a1446] border border-gray-200 shadow-md hover:bg-pink-600 hover:shadow-lg`}>
              <div className="flex justify-center mb-3">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-pink-50 group-hover:bg-white transition-colors`}>
                  <img src={treatment.icon} alt="" className="w-10 h-10 object-contain" />
                </div>
              </div>
              <h3 className={`font-bold text-base text-pink-600 group-hover:text-white`}>
                {treatment.name}
              </h3>
              <p className={`mt-2 text-xs text-gray-500 group-hover:text-pink-100`}>
                {treatment.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#1a1446]">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-bold text-white uppercase tracking-wider">Treatment</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-white uppercase tracking-wider">ACE</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-white uppercase tracking-wider">Physiotherapy</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-white uppercase tracking-wider">Steroid Injection</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-white uppercase tracking-wider">MUA</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comparisonData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">{row.feature}</td>
                  <td className={`py-4 px-4 text-sm whitespace-nowrap ${row.ace.includes('Non-Surgical') || row.ace.includes('Minimally') ? 'text-pink-600 font-semibold' : 'text-gray-600'}`}>{row.ace}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{row.physiotherapy}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{row.steroid}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{row.mua}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompareFrozen;