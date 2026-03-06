import React from 'react';

const WhatHappenDiabetic = () => {
  return (
    <section className="w-full bg-gray-50 py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start lg:items-center">
          {/* Left: bullet points */}
          <div>
            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446]">
                What Happens in{' '}
                <span className="text-pink-600">Endovascular Recanalization & Stenting?</span>
              </h2>
              <p className="mt-3 text-gray-600 max-w-3xl">
                Watch this short video to understand how we open blocked leg arteries and what to
                expect on the day of your procedure.
              </p>
            </div>
            <ul className="space-y-6">
              {[
                'Simple explanation of the procedure',
                'Animation of how embolization works',
                'Hear from our experts in interventional radiology',
              ].map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex items-center justify-center w-7 h-7 rounded-full bg-pink-100"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-4 h-4 text-pink-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="text-[#1a1446] font-semibold text-base sm:text-lg">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: video placeholder */}
          <div className="w-full flex justify-center lg:justify-end lg:pr-10">
            <div className="relative w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] aspect-[9/16] rounded-xl bg-gray-200 overflow-hidden shadow">
              {/* Replace this with an iframe if you have a video URL */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/QmSzkxd2KOo"
                title="Endovascular Recanalization & Stenting"
                frameBorder="0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              {/* <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Endovascular Recanalization & Stenting"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatHappenDiabetic;