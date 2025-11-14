import React from 'react';

const treatmentCards = [
  {
    title: 'Uterine Artery Embolization',
    description: 'Minimally invasive, preserves fertility, with a short recovery time.',
    icon: '/UAE_Compare1.jpg',
    bgColor: 'bg-white',
    textColor: 'text-gray-700',
    borderColor: 'border-[#ff3576]'
  },
  {
    title: 'Fibroid Surgery (Myomectomy)',
    description: 'Requires general anesthesia, longer recovery times, and hospital stays.',
    icon: '/UAE_Compare2.jpg',
    bgColor: 'bg-white',
    textColor: 'text-gray-700',
    borderColor: 'border-[#ff3576]'
  },
  {
    title: 'Hysterectomy',
    description: 'Permanent removal of the uterus, which eliminates fertility.',
    icon: '/UAE_Comapre3.jpg',
    bgColor: 'bg-white',
    textColor: 'text-gray-700',
    borderColor: 'border-[#ff3576]'
  }
];

const comparisonData = [
    { 'Procedure Type': ['Non - Surgical', 'Major surgery', 'Major surgery'] },
    { 'Invasiveness': ['Minimally Invasive', 'Highly Invasive', 'Highly Invasive'] },
    { 'Hospital Stay': ['0-1 day', '1-3 days', '1-3 days'] },
    { 'Recovery': ['1-2 weeks', '2-6 weeks', '2-6 weeks'] },
    { 'Recurrence': ['<10% at 2 years', '<10% at 2 years', 'None'] },
    { 'Reintervention': ['~12% at 2 years', '~8% at 2 years', '~7% at 2 years'] }
];

const UAE_Compare = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            See how Uterine artery embolization compares to traditional surgical approaches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {treatmentCards.map((card, index) => (
            <div key={index} className={`p-8 rounded-2xl shadow-lg border-2 ${card.borderColor} ${card.bgColor} ${card.textColor} hover:bg-[#ff3576] hover:text-white transition-all duration-300 ease-in-out cursor-pointer`}>
              <img src={card.icon} alt={`${card.title} icon`} className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center mb-2">{card.title}</h3>
              <p className="text-center text-sm">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
            <div className="min-w-full bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="grid grid-cols-4 bg-[#2d2552] text-white font-bold rounded-t-lg">
                    <div className="p-4">Treatment</div>
                    <div className="p-4">Uterine Fibroid Embolization</div>
                    <div className="p-4">Myomectomy</div>
                    <div className="p-4">Hysterectomy</div>
                </div>
                <div className="divide-y divide-gray-200">
                    {comparisonData.map((row, rowIndex) => {
                        const [label, values] = Object.entries(row)[0];
                        return (
                            <div key={rowIndex} className="grid grid-cols-4 items-center">
                                <div className="p-4 font-semibold text-gray-800">{label}</div>
                                {values.map((value, valueIndex) => (
                                    <div key={valueIndex} className={`p-4 ${valueIndex === 0 ? 'bg-pink-50 text-[#ff3576] font-semibold' : 'text-gray-600'}`}>
                                        {value}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 border-t pt-8">
    
        </div>
      </div>
    </div>
  );
};

export default UAE_Compare;
