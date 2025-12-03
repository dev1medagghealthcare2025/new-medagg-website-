import React from 'react';

const summaryData = [
  {
    title: 'Endovascular Recanalization & Stenting',
    description: 'Minimally invasive, pinhole access, usually local anaesthesia; restores blood flow through balloon angioplasty with or without stents.',
    icon: '/diabetic_png1.png',
    highlight: true,
  },
  {
    title: 'Bypass Surgery',
    description: 'Open operation using a vein or graft to route blood around long blockages. More invasive, longer recovery, but still important for selected patients.',
    icon: '/diabetic_png2.png',
    highlight: false,
  },
  {
    title: 'No Revascularization',
    description: 'Dressings, antibiotics and off-loading without restoring blood flow. In severe ischaemia, this often fails to heal the ulcer and amputation risk remains high.',
    icon: '/diabetic_png3.png',
    highlight: false,
  },
  {
    title: 'Primary Amputation',
    description: 'Removal of part of the leg when tissue loss is extensive or revascularization is not possible or appropriate.',
    icon: '/diabetic_png4.png',
    highlight: false,
  },
];

const tableData = [
  {
    feature: 'Procedure Type',
    options: ['Minimally invasive, catheter-based', 'Open surgical operation', 'Conservative only', 'Surgical removal of affected part of the foot/leg'],
  },
  {
    feature: 'Anaesthesia',
    options: ['Local ± light sedation', 'Regional or general', 'Not applicable', 'Regional or general'],
  },
  {
    feature: 'Scars / Sutures',
    options: ['Tiny skin puncture, no stitches', 'Surgical incision(s)', 'None', 'Surgical incision at level of amputation'],
  },
  {
    feature: 'Hospital Stay',
    options: ['Day-care or 1–2 days', 'Several days', 'Depends on wound', 'Usually several days to weeks depending on recovery'],
  },
  {
    feature: 'Recovery',
    options: ['Usually several days to weeks depending on recovery', 'Longer recovery', 'Ongoing wound burden', 'Variable; depends on healing and prosthetic fitting'],
  },
  {
    feature: 'Repeat Procedures',
    options: ['Sometimes needed', 'Less frequent but larger surgery', 'Often progression to major amputation', 'May need further revision surgery or higher-level amputation'],
  },
  {
    feature: 'Goal',
    options: ['Restore blood flow to heal wounds & avoid amputation', 'Restore blood flow long-term', 'Symptom/wound management only', 'Remove dead/infected tissue when limb salvage is no longer possible'],
  },
];

const CompareDiabetic = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]">
            Compare Your <span className="text-pink-600">Treatment Options</span>
          </h2>
          <p className="mt-2 text-gray-600 max-w-3xl">
            See how endovascular treatment fits alongside other options for diabetic foot with blocked arteries.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {summaryData.map((item) => (
            <div
              key={item.title}
              className={`group rounded-xl p-4 text-center transition-all duration-300 flex flex-col justify-between bg-white border border-gray-200 shadow-lg hover:bg-pink-600 hover:text-white hover:border-pink-300 hover:shadow-xl`}
            >
              <div className="flex justify-center mb-3">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-gray-100 transition-colors group-hover:bg-white`}>
                  <img src={item.icon} alt={`${item.title} icon`} className="w-10 h-10 transition-transform duration-200 ease-out group-hover:scale-110" />
                </div>
              </div>
              <h3 className={`text-lg font-bold mb-2 text-[#1a1446] group-hover:text-white`}>{item.title}</h3>
              <p className={`text-xs text-gray-600 group-hover:text-pink-100`}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#1a1446]">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Treatment</th>
                {summaryData.map(item => (
                  <th key={item.title} className="py-3 px-4 text-left text-xs font-semibold text-white uppercase tracking-wider">{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, rowIndex) => (
                <tr key={row.feature} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-4 font-medium text-sm text-gray-800">{row.feature}</td>
                  {row.options.map((option, optionIndex) => (
                    <td key={optionIndex} className={`py-4 px-4 text-sm text-gray-600 ${optionIndex === 0 ? 'bg-pink-50 text-pink-800 font-medium' : ''}`}>
                      {option}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompareDiabetic;