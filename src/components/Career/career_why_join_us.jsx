import React from 'react';

const CareerWhyJoinUs = () => {
  const items = [
    {
      img: '/career1.png',
      title: 'Grow With a Fast-Rising Healthcare Brand',
      desc: 'Work closely with leading doctors, innovators, and specialists as Medagg expands across India.',
      accent: 'bg-[#2d2552]',
    },
    {
      img: '/career2.png',
      title: 'You Grow, We Grow',
      desc: 'Your growth isn’t an option — it’s a priority. We invest in your career, skills, and leadership potential.',
      accent: 'bg-[#ff3576]',
    },
    {
      img: '/career3.png',
      title: 'Work-Life Balance That Respects You',
      desc: 'Healthy schedules, supportive environment, and a culture built around your well-being.',
      accent: 'bg-[#2d2552]',
    },
  ];

  return (
    <section className="w-full bg-[#faf7fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Intro */}
        <div className="max-w-3xl">
          <p className="text-[#ff3576] font-semibold text-sm sm:text-base">Why Join Us</p>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2d2552] leading-tight">
            Experience healthcare innovation at its finest
            <br />
            with a team that <span className="text-[#ff3576]">values your growth</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-[#4b4766]/80">
            Join a team innovating modern healthcare with compassion, technology, and precision.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className={`h-1.5 ${item.accent}`} />
              <div className="p-3">
                <div className="w-full h-24 flex items-start justify-start overflow-visible">
                  <img
                    src={item.img}
                    alt=""
                    className="w-80 h-64 -mt-2 -ml-4 object-contain object-left-top pointer-events-none select-none"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-1.5 font-extrabold text-[#2d2552] text-base leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-snug text-[#4b4766]/80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerWhyJoinUs;