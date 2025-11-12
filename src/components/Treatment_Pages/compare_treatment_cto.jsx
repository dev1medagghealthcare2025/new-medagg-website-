import React from 'react';

const Compare_treatment_cto = () => {
  const comparisonData = [
    {
      feature: 'Procedure Type',
      cto_pci: 'Non – Surgical',
      cabg: 'Major surgery',
      pci: 'Non-Surgical',
    },
    {
      feature: 'Invasiveness',
      cto_pci: 'Minimally Invasive',
      cabg: 'Highly Invasive',
      pci: 'Minimally Invasive',
    },
    {
      feature: 'Hospital Stay',
      cto_pci: '1–2 Days',
      cabg: '5–7 Day',
      pci: '1–2 Days',
    },
    {
      feature: 'Recovery',
      cto_pci: 'Few Days to 1 Week',
      cabg: '4–6 Weeks',
      pci: '1–2 Days',
    },
    {
      feature: 'Scars / Sutures',
      cto_pci: 'Minimal',
      cabg: 'Visible Scars/Sutures',
      pci: 'Minimal',
    },
    {
      feature: 'Anesthesia',
      cto_pci: 'Local Anesthesia with Sedation',
      cabg: 'General Anesthesia',
      pci: 'Local Anesthesia with Sedation',
    },
    {
      feature: 'Performed By',
      cto_pci: 'Vascular Surgeon or IR',
      cabg: 'Cardiothoracic Surgeon',
      pci: 'Interventional Cardiologist',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Compare Your <span className="text-[#ff3576]">Treatment Options</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how minimally invasive CTO PCI compares to bypass surgery:
          </p>
        </div>

        {/* Top Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div className="border border-gray-200 p-8 rounded-2xl shadow-lg text-center">
            <img src="/Compare_cto1.png" alt="CTO PCI Icon" className="mx-auto h-20 w-20 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">CTO PCI (Chronic Total Occlusion PCI)</h3>
            <p className="mt-2 text-sm text-gray-600">Minimally invasive, Used to open complete block, with a short recovery time.</p>
          </div>
          <div className="border border-gray-200 p-8 rounded-2xl shadow-lg text-center">
            <img src="/Compare_cto2.png" alt="CABG Icon" className="mx-auto h-20 w-20 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">CABG (Coronary Artery Bypass Grafting)</h3>
            <p className="mt-2 text-sm text-gray-600">Open-heart surgery, Suitable for severe blockages. Longer recovery time.</p>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-[#2d2552] text-white text-base">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Treatment</th>
                <th scope="col" className="px-6 py-4 font-semibold">CTO PCI (Chronic Total Occlusion PCI)</th>
                <th scope="col" className="px-6 py-4 font-semibold">CABG (Coronary Artery Bypass Grafting)</th>
                <th scope="col" className="px-6 py-4 font-semibold">PCI (Percutaneous Coronary Intervention)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                  <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                    {item.feature}
                  </th>
                  <td className="px-6 py-4">
                    {item.cto_pci}
                  </td>
                  <td className="px-6 py-4">{item.cabg}</td>
                  <td className="px-6 py-4">{item.pci}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div className="mt-12" />

      </div>
    </section>
  );
};

export default Compare_treatment_cto;