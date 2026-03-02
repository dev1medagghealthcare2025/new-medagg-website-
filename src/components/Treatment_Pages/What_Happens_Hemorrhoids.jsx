
import React from 'react';

const What_Happens_Hemorrhoids = () => {
  const points = [
    'Performed under local anesthesia',
    'Tiny catheter inserted through wrist/groin',
    'Blood supply to hemorrhoids is reduced',
    'No cuts, no stitches',
  ];

  return (
    <section className="w-full bg-[#F6F8FB]">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-[#1E1B4B] sm:text-4xl">
              What Happens in <span className="text-[#FF2D7A]">Rectal</span>
              <br />
              <span className="text-[#FF2D7A]">Artery Embolization?</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Most patients experience significant reduction in bleeding and discomfort within days to
              weeks.
            </p>

            <ul className="mt-7 space-y-4">
              {points.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-[#FF2D7A]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.6 11.2L3.7 8.3L2.7 9.3L6.6 13.2L13.5 6.3L12.5 5.3L6.6 11.2Z"
                        fill="#FF2D7A"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-slate-700 sm:text-base">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full justify-center lg:justify-end">
            <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="aspect-[16/9] w-full" />
              <button
                type="button"
                aria-label="Play video"
                className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF2D7A] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF2D7A]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="translate-x-[1px]"
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default What_Happens_Hemorrhoids;

