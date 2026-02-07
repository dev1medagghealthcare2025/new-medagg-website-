import React from 'react';

// Why Choose section for Diabetic Foot
// - Matches card layout/visuals used across treatment pages
// - Badge style mirrors the reference: soft pink circle with a darker pink ring and icon inside
// - If you provide a PNG icon path in public/ (e.g., '/icons/non_surgical.png'), it will be used.
//   Otherwise we fall back to an emoji glyph.
const WhyChooseDiabeticFoot = () => {
  const items = [
    {
      title: 'Non‑Surgical',
      desc: 'No open incisions; most patients avoid general anaesthesia.',
      icon: '/Diabetic1.png',
      fallback: '✂️',
    },
    {
      title: 'Limb‑Salvage Focused',
      desc: 'Revascularization helps healing and lowers major amputation risk.',
      icon: '/Diabetic2.png',
      fallback: '❗',
    },
    {
      title: 'Faster Recovery',
      desc: 'Shorter hospital stay and quicker return to daily activities.',
      icon: '/Diabetic3.png',
      fallback: '📈',
    },
    {
      title: 'Tailored To Each Artery',
      desc: 'Angioplasty, stents, and other tech chosen per disease pattern.',
      icon: '/Diabetic4.png',
      fallback: '✅',
    },
  ];

  return (
    <section className='w-full bg-white py-10 sm:py-12 lg:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1446] mb-2'>
          Why Choose <span className='text-pink-500'>Endovascular Treatment</span> For Diabetic Foot?
        </h2>
        <p className='text-gray-600 mb-8 sm:mb-10 max-w-3xl'>
          Endovascular treatment for diabetic foot improves blood flow, supports wound healing, and reduces amputation risk without open surgery.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {items.map((it) => (
            <div
              key={it.title}
              className='group rounded-2xl bg-white shadow-md border border-gray-100 p-5 transition-all flex flex-col items-center text-center hover:bg-pink-100 hover:border-pink-300 hover:shadow-xl'
            >
              {/* Badge - styled to mimic PNG-in-circle look */}
              <div className='mb-4 w-full flex items-center justify-center'>
                <div className='relative inline-flex items-center justify-center'>
                  {/* Outer soft circle */}
                  <div className='w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center transition-colors group-hover:bg-pink-300'>
                    {/* Inner ring */}
                    <div className='w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-pink-500 transition-colors group-hover:border-pink-700'>
                      {it.icon ? (
                        <img
                          src={it.icon}
                          alt={`${it.title} icon`}
                          className='block w-6 h-6 object-contain mx-auto shrink-0 transition-transform duration-200 ease-out group-hover:scale-110'
                          aria-hidden='true'
                        />
                      ) : (
                        <span className='text-pink-600 text-xl leading-none' aria-hidden='true'>{it.fallback}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className='text-[#1a1446] font-bold text-lg mb-2'>{it.title}</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseDiabeticFoot;