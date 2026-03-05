
import React, { useState } from 'react';

const bgImage = '/Hemorrhoidal_bg.png';

export default function Hemorrhoidal_herosection() {
  const [formData, setFormData] = useState({
    healthConcern: '',
    location: '',
    fullName: '',
    phoneNumber: '',
    preferredLanguage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      const response = await fetch('https://api.telecrm.in/enterprise/658abddbf911ed2d692b0cf5/autoupdatelead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_TELECRM_API_KEY}`,
        },
        body: JSON.stringify({
          fields: {
            name: formData.fullName,
            phone: formData.phoneNumber,
            city: formData.location,
            health_concern: formData.healthConcern,
            preferredLanguage: formData.preferredLanguage,
            source: 'Website - Hemorrhoidal Hero Section Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ healthConcern: '', location: '', fullName: '', phoneNumber: '', preferredLanguage: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className='relative bg-cover bg-center text-white py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8'
      style={{
        backgroundImage: `url('${bgImage}')`,
        minHeight: '460px',
      }}
    >
      <div className='absolute inset-0 bg-[#2d2552] bg-opacity-15' />

      <div className='relative max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center'>
          <div className='text-white text-center lg:text-left'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-3 sm:mb-5'>
              Hemorrhoidal/Piles Artery Embolization
              
            </h1>
            <p className='text-sm sm:text-base md:text-lg text-gray-200 font-medium max-w-2xl mx-auto lg:mx-0'>
              Hemorrhoids/piles Treatment Without Surgery | No Cuts | No Stitches | Faster Recovery
            </p>
          </div>

          <div className='w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto'>
            <div className='hemo-hero-form bg-white/15 backdrop-blur-md rounded-xl shadow-2xl p-4 sm:p-5 border border-white/15'>
              <h2 className='text-base sm:text-lg font-bold text-white mb-3 text-center'>Get Expert Consultation</h2>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3'>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder='Name'
                    className='w-full rounded-lg px-3 py-2.5 text-xs sm:text-sm bg-white/20 text-white placeholder:text-white/70 !placeholder:text-white placeholder:opacity-70 border border-white/15 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none'
                    required
                  />
                  <input
                    type='tel'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder='Phone Number'
                    className='w-full rounded-lg px-3 py-2.5 text-xs sm:text-sm bg-white/20 text-white placeholder:text-white/70 !placeholder:text-white placeholder:opacity-70 border border-white/15 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none'
                    required
                  />
                </div>

                <input
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder='Location'
                  className='w-full rounded-lg px-3 py-2.5 text-xs sm:text-sm mb-3 bg-white/20 text-white placeholder:text-white/70 !placeholder:text-white placeholder:opacity-70 border border-white/15 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none'
                  required
                />

                <div className='relative mb-3'>
                  <select
                    name='preferredLanguage'
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className='w-full rounded-lg px-3 py-2.5 text-xs sm:text-sm bg-white/20 text-white border border-white/15 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none'
                    aria-label='Preferred Language'
                    required
                  >
                    <option value=''> </option>
                    <option value='English'>English</option>
                    <option value='Hindi'>Hindi</option>
                    <option value='Tamil'>Tamil</option>
                    <option value='Telugu'>Telugu</option>
                    <option value='Kannada'>Kannada</option>
                    <option value='Malayalam'>Malayalam</option>
                    <option value='Bengali'>Bengali</option>
                    <option value='Marathi'>Marathi</option>
                    <option value='Gujarati'>Gujarati</option>
                    <option value='Punjabi'>Punjabi</option>
                    <option value='Urdu'>Urdu</option>
                  </select>
                  {!formData.preferredLanguage && (
                    <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-white/70'>
                      Preferred Language
                    </span>
                  )}
                </div>

                <textarea
                  name='healthConcern'
                  value={formData.healthConcern}
                  onChange={handleInputChange}
                  placeholder='Describe your Health Concern'
                  className='w-full rounded-lg px-3 py-2.5 text-xs sm:text-sm resize-none mb-3 bg-white/20 text-white placeholder:text-white/70 !placeholder:text-white placeholder:opacity-70 border border-white/15 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none'
                  rows='3'
                  required
                />

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm sm:text-base py-2.5 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400 flex items-center justify-center gap-2'
                >
                  {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
                </button>

                {formStatus === 'success' && (
                  <p className='text-green-200 text-center mt-3 text-sm font-semibold'>
                    Thank you for reaching out. Our expert will contact you shortly.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className='text-red-200 text-center mt-3 text-sm font-semibold'>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
            <style>{`
              .hemo-hero-form input::placeholder,
              .hemo-hero-form textarea::placeholder {
                color: rgba(255, 255, 255, 0.7) !important;
                opacity: 1 !important;
              }

              .hemo-hero-form input,
              .hemo-hero-form textarea,
              .hemo-hero-form select {
                color: #ffffff !important;
                -webkit-text-fill-color: #ffffff !important;
              }

              .hemo-hero-form select option {
                color: #000000 !important;
                background: #ffffff !important;
                -webkit-text-fill-color: #000000 !important;
              }

              .hemo-hero-form input:-webkit-autofill,
              .hemo-hero-form textarea:-webkit-autofill,
              .hemo-hero-form select:-webkit-autofill {
                -webkit-text-fill-color: #ffffff !important;
                transition: background-color 9999s ease-in-out 0s;
                caret-color: #ffffff;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

