import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const UAE_Herosection = ({ city = '', variant = '' }) => {
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
            source: 'Website - UAE Hero Section Form',
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
  const isBangalore = variantLower === 'bangalore' || cityLower === 'bangalore' || cityLower === 'bengaluru';
  const isMangalore = variantLower === 'mangalore' || cityLower === 'mangalore' || cityLower === 'mangaluru';
  const isCitySpecific = isChennai || isMadurai || isCoimbatore || isBangalore || isMangalore;
  const cityName = isChennai ? 'Chennai' : isMadurai ? 'Madurai' : isCoimbatore ? 'Coimbatore' : isBangalore ? 'Bangalore' : isMangalore ? 'Mangalore' : '';
  const backgroundImage = isCitySpecific
    ? isBangalore
      ? '/hero_section_Bangalore.png'
      : isMangalore
        ? '/hero_section_Mangalore.png'
        : `/hero_varicocele_${isChennai ? 'chennai' : isMadurai ? 'madhuri' : 'coimbatore'}.png`
    : '/UAE_BG_image.jpg';
  const overlayOpacity = isCitySpecific ? 'opacity-0' : 'opacity-60';

  return (
    <section
      className='relative bg-cover bg-center text-white py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8'
      style={{ backgroundImage: `url('${backgroundImage}')`, minHeight: '460px' }}
    >
      <div className={`absolute inset-0 bg-[#2d2552] ${overlayOpacity}`}></div>
      {isCitySpecific && (
        <div className='absolute inset-y-0 left-0 w-full md:w-[55%] bg-gradient-to-r from-[#2d2552]/75 via-[#2d2552]/35 to-transparent pointer-events-none'></div>
      )}
      <div className='relative max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <div className='text-white text-center lg:text-left'>
            {isCitySpecific ? (
              <>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white mb-3 sm:mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'>
                  No-Surgery Uterine
                  <br />
                  Fibroid Treatment in
                  <br />
                  {cityName}
                </h1>
                <p className='text-sm sm:text-base md:text-lg text-gray-200 font-medium max-w-2xl mx-auto lg:mx-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]'>
                  Advanced Non-Surgical Treatment for Uterine Fibroids by Interventional Radiology Specialists | NoSurgeries by Medagg
                </p>
              </>
            ) : (
              <>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-3 sm:mb-5'>
                  Uterine Artery Embolization
                </h1>
                <p className='text-base sm:text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto lg:mx-0'>
                  Minimally invasive, uterus-preserving treatment for fibroids.
                </p>
              </>
            )}
          </div>

          {/* Right Side: Form */}
          <div className='w-full max-w-md mx-auto'>
            <div className={isCitySpecific ? 'bg-white/10 backdrop-blur-md text-white rounded-xl shadow-2xl p-5 sm:p-6 border border-white/20' : 'bg-white rounded-xl shadow-2xl p-4'}>
              {isCitySpecific && (
                <style>{`
                  .city-form-input::placeholder { color: white !important; opacity: 0.8; }
                  .city-form-input:-webkit-autofill,
                  .city-form-input:-webkit-autofill:hover,
                  .city-form-input:-webkit-autofill:focus { -webkit-text-fill-color: white !important; -webkit-box-shadow: 0 0 0px 1000px rgba(255,255,255,0.2) inset !important; }
                `}</style>
              )}
              <h2 className={isCitySpecific ? 'text-lg sm:text-xl font-bold mb-4 text-center' : 'text-base sm:text-lg font-bold text-[#2d2552] mb-3 text-center'}>
                Get Expert Consultation
              </h2>
              <form onSubmit={handleSubmit}>
                <textarea
                  name='healthConcern'
                  value={formData.healthConcern}
                  onChange={handleInputChange}
                  placeholder='Describe Your Health Concern'
                  className={isCitySpecific ? 'city-form-input w-full bg-white/20 border border-white/30 rounded-lg p-3 text-sm resize-none mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all outline-none placeholder:text-white' : 'w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm resize-none mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'}
                  style={isCitySpecific ? { color: 'white', WebkitTextFillColor: 'white' } : undefined}
                  rows='2'
                  required
                ></textarea>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder='Location'
                  className={isCitySpecific ? 'city-form-input w-full bg-white/20 border border-white/30 rounded-lg p-3 text-sm mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all outline-none placeholder:text-white' : 'w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'}
                  style={isCitySpecific ? { color: 'white', WebkitTextFillColor: 'white' } : undefined}
                  required
                />
                <select
                  name='preferredLanguage'
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  className={isCitySpecific ? 'city-form-input w-full bg-white/20 border border-white/30 rounded-lg p-3 text-sm mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all outline-none appearance-none placeholder:text-white' : 'w-full border border-gray-200 rounded-lg p-3 text-sm sm:text-base mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white text-black'}
                  style={isCitySpecific ? { color: 'white' } : undefined}
                  aria-label='Preferred Language'
                >
                  <option value='' disabled className={isCitySpecific ? 'text-gray-600 bg-white' : 'text-gray-500'}>Preferred Language</option>
                  <option value='English' className='text-black'>English</option>
                  <option value='Hindi' className='text-black'>Hindi</option>
                  <option value='Tamil' className='text-black'>Tamil</option>
                  <option value='Telugu' className='text-black'>Telugu</option>
                  <option value='Kannada' className='text-black'>Kannada</option>
                  <option value='Malayalam' className='text-black'>Malayalam</option>
                  <option value='Bengali' className='text-black'>Bengali</option>
                  <option value='Marathi' className='text-black'>Marathi</option>
                  <option value='Gujarati' className='text-black'>Gujarati</option>
                  <option value='Punjabi' className='text-black'>Punjabi</option>
                  <option value='Urdu' className='text-black'>Urdu</option>
                </select>
                <div className='flex flex-col sm:flex-row gap-2.5 mb-3'>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder='Full Name'
                    className={isCitySpecific ? 'city-form-input w-full sm:w-1/2 bg-white/20 border border-white/30 rounded-lg p-3 text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all outline-none placeholder:text-white' : 'w-full sm:w-1/2 border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'}
                    style={isCitySpecific ? { color: 'white', WebkitTextFillColor: 'white' } : undefined}
                    required
                  />
                  <input
                    type='tel'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder='Phone Number'
                    className={isCitySpecific ? 'city-form-input w-full sm:w-1/2 bg-white/20 border border-white/30 rounded-lg p-3 text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all outline-none placeholder:text-white' : 'w-full sm:w-1/2 border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'}
                    style={isCitySpecific ? { color: 'white', WebkitTextFillColor: 'white' } : undefined}
                    required
                  />
                </div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm sm:text-base py-2.5 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400'
                >
                  {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
                </button>
                {formStatus === 'success' && (
                  <p className={isCitySpecific ? 'text-green-200 text-center mt-3 text-sm font-semibold' : 'text-green-600 text-center mt-3 text-sm font-semibold'}>
                    Thank you for reaching out. Our expert will contact you shortly.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className={isCitySpecific ? 'text-red-200 text-center mt-3 text-sm font-semibold' : 'text-red-600 text-center mt-3 text-sm font-semibold'}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
            <div className='flex flex-wrap justify-center lg:justify-start gap-2.5 mt-4 px-2'>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UAE_Herosection;
