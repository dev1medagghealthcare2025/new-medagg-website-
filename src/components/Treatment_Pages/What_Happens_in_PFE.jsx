import React from 'react';
import { CheckCircle } from 'lucide-react';

const WhatHappensInPFE = () => {
  const procedureDetails = [
    {
      stage: 'Before the Procedure',
      description: 'You will have a consultation with our specialist to confirm that PFE is the right treatment for you. We will review your medical history, perform a physical examination, and may use imaging tests to assess the blood vessels in your foot.',
    },
    {
      stage: 'During the Procedure',
      description: 'The procedure is minimally invasive and performed under local anesthesia. A tiny catheter is inserted through a small puncture, usually in the ankle or groin. Using live imaging, the catheter is guided to the inflamed arteries in the foot. Microscopic particles are then injected to block these vessels, reducing blood flow and inflammation.',
    },
    {
      stage: 'After the Procedure',
      description: 'You will be monitored for a short period before being discharged the same day. Most patients can walk immediately and return to normal activities within a few days. You will receive specific aftercare instructions to ensure a smooth recovery.',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552] mb-4">
            What Happens During Plantar Fascial Embolization?
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-12">
            A simple, safe, and straightforward outpatient procedure.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {procedureDetails.map((item, index) => (
            <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-start">
                <CheckCircle className="text-[#ff3576] w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#2d2552] mb-2">{item.stage}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatHappensInPFE;
