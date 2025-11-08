import React from 'react';
import { CheckCircle2, PlayCircle } from 'lucide-react';

const What_Happens_in_CTO_treatment = () => {
  const listItems = [
    'Detailed explanation of the procedure',
    'Animation of how Treatment works',
    'Hear from our medical experts',
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2552]">
              What Happens in
              <br />
              <span className="text-[#ff3576]">CTO Treatment</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Watch this short video to understand exactly how the Chronic
              Total Occlusion, procedure works and what to expect on the day
              of treatment.
            </p>
            <ul className="mt-6 space-y-4">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-[#ff3576] mr-3 flex-shrink-0" />
                  <span className="text-lg text-gray-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content (Video Placeholder) */}
          <div className="relative flex justify-center items-center bg-gray-200 rounded-2xl w-full h-64 md:h-80">
            <button
              aria-label="Play video"
              className="absolute text-[#ff3576] hover:text-pink-500 transition-transform transform hover:scale-110 focus:outline-none"
            >
              <PlayCircle className="h-20 w-20" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default What_Happens_in_CTO_treatment;