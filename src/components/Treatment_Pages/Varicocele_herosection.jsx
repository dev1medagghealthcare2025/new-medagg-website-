import React, { useState } from 'react';

const Varicocele_herosection = ({ city = '', variant = '' }) => {
  const [formData, setFormData] = useState({
    healthConcern: '',
    city: city || '',
    fullName: '',
    phoneNumber: '',
    preferredLanguage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(''); // success, error, or ''

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
            city: formData.city,
            health_concern: formData.healthConcern,
            preferredLanguage: formData.preferredLanguage,
            source: 'Website - Varicocele Hero Section Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ healthConcern: '', city: '', fullName: '', phoneNumber: '', preferredLanguage: '' });
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

  const cityLower = (city || '').toLowerCase();
  const variantLower = (variant || '').toLowerCase();
  const isChennai = variantLower === 'chennai' || cityLower === 'chennai';
  const isMadurai = variantLower === 'madurai' || cityLower === 'madurai';
  const isCoimbatore = variantLower === 'coimbatore' || cityLower === 'coimbatore';
  const isCitySpecific = isChennai || isMadurai || isCoimbatore;
  const backgroundImage = isCitySpecific ? `/hero_varicocele_${isChennai ? 'chennai' : isMadurai ? 'madhuri' : 'coimbatore'}.png` : "/PAE_PAGE_Background.jpg";
  const overlayOpacity = isCitySpecific ? 'opacity-0' : 'opacity-60';

  return (
    <div
      className='relative bg-cover bg-center text-white py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8'
      style={{ backgroundImage: `url('${backgroundImage}')`, minHeight: '460px' }}
    >
      <div className={`absolute inset-0 bg-[#2d2552] ${overlayOpacity}`}></div>
      {isCitySpecific && (
        <div className='absolute inset-y-0 left-0 w-full md:w-[55%] bg-gradient-to-r from-[#2d2552]/75 via-[#2d2552]/35 to-transparent pointer-events-none'></div>
      )}
      <div className='relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-center'>

        {/* Left Side: Content */}
        <div className='text-center md:text-left'>
          {isCitySpecific ? (
            <>
              <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white mb-3 sm:mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'>
                No-Surgery
                <br />
                Varicocele Treatment
                <br />
                in {isChennai ? 'Chennai' : isMadurai ? 'Madurai' : 'Coimbatore'}
              </h1>
              <p className='text-sm sm:text-base md:text-lg text-gray-200 font-medium max-w-2xl mx-auto md:mx-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]'>
                Advanced Non-Surgical Treatment for Varicocele by Interventional Radiology Specialists | NoSurgeries by Medagg
              </p>
            </>
          ) : (
            <>
              <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-3 sm:mb-5'>
                Varicocele Embolization
              </h1>
              <p className='text-base sm:text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto md:mx-0'>
                Scar-free treatment for varicocele without surgery
              </p>
            </>
          )}
        </div>

        {/* Right Side: Form */}
        <div>
          <div className='bg-white text-gray-800 p-4 rounded-xl shadow-2xl max-w-md mx-auto'>
            <h2 className='text-lg sm:text-xl font-bold mb-4 text-center'>Get Expert Consultation</h2>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col sm:flex-row gap-2.5 mb-3'>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder='Name'
                  className='w-full sm:w-1/2 border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'
                  required
                />
                <input
                  type='tel'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder='Phone Number'
                  className='w-full sm:w-1/2 border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'
                  required
                />
              </div>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
                placeholder='Location'
                className='w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'
              />
              <select
                name='preferredLanguage'
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                className='w-full border border-gray-200 rounded-lg p-3 text-sm sm:text-base mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white text-black'
                aria-label='Preferred Language'
              >
                <option value='' disabled className='text-gray-500'>
                  Preferred Language
                </option>
                <option value='English' className='text-black'>
                  English
                </option>
                <option value='Hindi' className='text-black'>
                  Hindi
                </option>
                <option value='Tamil' className='text-black'>
                  Tamil
                </option>
                <option value='Telugu' className='text-black'>
                  Telugu
                </option>
                <option value='Kannada' className='text-black'>
                  Kannada
                </option>
                <option value='Malayalam' className='text-black'>
                  Malayalam
                </option>
                <option value='Bengali' className='text-black'>
                  Bengali
                </option>
                <option value='Marathi' className='text-black'>
                  Marathi
                </option>
                <option value='Gujarati' className='text-black'>
                  Gujarati
                </option>
                <option value='Punjabi' className='text-black'>
                  Punjabi
                </option>
                <option value='Urdu' className='text-black'>
                  Urdu
                </option>
              </select>
              <textarea
                name='healthConcern'
                value={formData.healthConcern}
                onChange={handleInputChange}
                className='w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm resize-none mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'
                rows='3'
                placeholder='Describe your Health Concern'
              ></textarea>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm sm:text-base py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:bg-gray-400 flex items-center justify-center gap-2'
              >
                {isSubmitting ? 'Submitting...' : (
                  <>
                    Speak To Experts
                    <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' />
                    </svg>
                  </>
                )}
              </button>
              {formStatus === 'success' && (
                <p className='text-green-600 text-center mt-3 text-sm font-semibold'>
                  Thank you for reaching out. Our expert will contact you shortly.
                </p>
              )}
              {formStatus === 'error' && (
                <p className='text-red-600 text-center mt-3 text-sm font-semibold'>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Varicocele_herosection;
