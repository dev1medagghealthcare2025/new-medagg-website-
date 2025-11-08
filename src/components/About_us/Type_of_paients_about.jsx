import React from 'react';

const cards = [
  {
    type: 'Type 1',
    typeColor: 'bg-[#392C5C] text-white',
    img: '/Type1.png',
    title: '"I already know I need a procedure, help me find the best hospital."',
    bold: true,
    desc: 'You have a diagnosis but need guidance on where to get the best care with minimal waiting time.',
    quote: 'Medagg helped me find a clinic for my knee procedure with a 2-week shorter wait time.',
    name: 'Suraiya',
    city: 'Kolkata',
  },
  {
    type: 'Type 2',
    typeColor: 'bg-pink-500 text-white',
    img: '/Type2.png',
    title: '"I have symptoms but don\'t know where to start."',
    bold: true,
    desc: 'You\'re experiencing health issues but unsure which specialist to see or what treatments to consider.',
    quote: 'The care team guided me to the right specialist after months of trying to figure out my chronic pain issues.',
    name: 'Thomas',
    city: 'Chennai',
  },
  {
    type: 'Type 3',
    typeColor: 'bg-[#392C5C] text-white',
    img: '/Type3.png',
    title: '"I need a second opinion before I make a decision."',
    bold: true,
    desc: 'You\'ve received a diagnosis or treatment plan but want to explore alternatives before proceeding.',
    quote: 'Medagg’s second opinion saved me from unnecessary spinal surgery — I’m now pain-free with minimal treatment.',
    name: 'Nazim',
    city: 'Hyderabad',
  },
];

export default function Type_of_paients_about() {
  return (
    <section className='w-full py-16 lg:py-24 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-center md:text-left mb-12 lg:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D2552] mb-4'>
            Types of Patients <span className='text-pink-500'>We Serve</span>
          </h2>
          <p className='text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto md:mx-0'>
            No matter where you are in your healthcare journey, we&apos;re here to help you find the right path forward.
          </p>
        </div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {cards.map((card, idx) => (
            <div key={idx} className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-2'>
              {/* Card Image */}
              <div className='relative'>
                <img
                  src={card.img}
                  alt={card.type}
                  className='w-full h-52 object-cover'
                />
                <div className='absolute top-4 left-4'>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${card.typeColor}`}>
                    {card.type}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className='p-6 flex flex-col flex-1'>
                <h3 className='font-bold text-[#2D2552] text-lg mb-3 leading-tight'>
                  {card.title}
                </h3>
                <p className='text-gray-600 text-sm mb-6 leading-relaxed flex-grow'>
                  {card.desc}
                </p>

                {/* Testimonial Section */}
                <div className='border-t border-gray-200 pt-4 mt-auto'>
                  <blockquote className='italic text-[#392C5C] text-sm mb-3 leading-relaxed'>
                    &quot;{card.quote}&quot;
                  </blockquote>
                  <div className='text-sm text-gray-500'>
                    <span className='font-bold text-[#2D2552]'>{card.name}</span>
                    <span className='mx-1.5'>•</span>
                    <span>{card.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
