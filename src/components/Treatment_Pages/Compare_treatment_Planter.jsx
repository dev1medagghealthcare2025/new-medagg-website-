import React from 'react';

const CompareTreatmentPlanter = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2552] mb-4">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            See how Plantar Fascial Embolization compares to traditional surgical approaches.
          </p>
        </div>

        {/* Treatment Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Plantar Fascial Embolization Card */}
          <div className="bg-white border border-[#ff3576] rounded-2xl p-8 relative overflow-hidden flex flex-col items-center text-center hover:bg-[#FFF0F4] transition-all duration-300 cursor-pointer">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 border border-[#ff3576]">
                <img 
                  src="/Planter_compare1.jpg" 
                  alt="Plantar Fascial Embolization" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#2d2552]">Plantar Fascial Embolization</h3>
              <p className="text-gray-600">
                A simple heel/foot outline with a catheter/tube entering and vessel symbol.
              </p>
            </div>
          </div>   

          {/* Endoscopic Plantar Fasciotomy Card */}
          <div className="bg-white border border-[#ff3576] rounded-2xl p-8 relative overflow-hidden flex flex-col items-center text-center hover:bg-[#FFF0F4] transition-all duration-300 cursor-pointer">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 border border-[#ff3576]">
                <img 
                  src="/Planter_compare2.jpg" 
                  alt="Endoscopic Plantar Fasciotomy" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#2d2552]">Endoscopic Plantar Fasciotomy</h3>
              <p className="text-gray-600">
                A foot outline with a small endoscope/tool cutting fascia band.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl overflow-hidden mb-16">
          {/* Table Header */}
          <div className="bg-[#2d2552] text-white">
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-lg">Treatment</div>
              <div className="font-semibold text-lg text-center">Plantar Fascial Embolization</div>
              <div className="font-semibold text-lg text-center">
                Plantar Fasciitis Release Surgery/
                <br />Endoscopic Plantar Fasciotomy
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {/* Hospital Stay */}
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-[#2d2552]">Hospital Stay</div>
              <div className="text-center text-[#ff3576] font-medium">Outpatient or same-day discharge</div>
              <div className="text-center text-gray-600">Outpatient or 1-2 days' stay</div>
            </div>

            {/* Side Effects */}
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-[#2d2552]">Side Effects</div>
              <div className="text-center text-[#ff3576] font-medium">Mild (bruising, slight discomfort)</div>
              <div className="text-center text-gray-600">
                Moderate (swelling, risk of infection, nerve irritation)
              </div>
            </div>

            {/* Recovery Time */}
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-[#2d2552]">Recovery Time</div>
              <div className="text-center text-[#ff3576] font-medium">Few days to 2 weeks</div>
              <div className="text-center text-gray-600">Several weeks to months</div>
            </div>

            {/* Target Precision */}
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-[#2d2552]">Target Precision</div>
              <div className="text-center text-[#ff3576] font-medium">Targets inflamed blood vessels directly</div>
              <div className="text-center text-gray-600">Releases part of the fascia tissue surgically</div>
            </div>

            {/* Effectiveness */}
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-[#2d2552]">Effectiveness</div>
              <div className="text-center text-[#ff3576] font-medium">Highly effective with minimal trauma</div>
              <div className="text-center text-gray-600">Effective but involves cutting and longer healing</div>
            </div>

            {/* Performed By */}
            <div className="grid grid-cols-3 gap-4 p-6">
              <div className="font-semibold text-[#2d2552]">Performed By</div>
              <div className="text-center text-[#ff3576] font-medium">Interventional Radiologist</div>
              <div className="text-center text-gray-600">Orthopedic Surgeon/Podiatric Surgeon</div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default CompareTreatmentPlanter;