import React, { useState } from 'react';
import { UserRound } from 'lucide-react';

const PVCHeroSection = ({ city = '', variant = '' }) => {
  const cityLower = (city || '').toLowerCase();
  const variantLower = (variant || '').toLowerCase();
  const isChennai = variantLower === 'chennai' || cityLower === 'chennai';
  const isMadurai = variantLower === 'madurai' || cityLower === 'madurai';
  const isCoimbatore = variantLower === 'coimbatore' || cityLower === 'coimbatore';
  const isCitySpecific = isChennai || isMadurai || isCoimbatore;

  const getCityName = () => {
    if (isChennai) return 'Chennai';
    if (isMadurai) return 'Madurai';
    if (isCoimbatore) return 'Coimbatore';
    return '';
  };

  // City-specific background image or default
  const getCityImage = () => {
    if (isChennai) return '/hero_varicocele_chennai.png';
    if (isMadurai) return '/hero_varicocele_madhuri.png';
    if (isCoimbatore) return '/hero_varicocele_coimbatore.png';
    return '/pvc_hero_bg.png';
  };
  const bgImage = getCityImage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: getCityName(),
    preferredLanguage: '',
    concern: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            name: formData.name,
            phone: formData.phone,
            city: formData.location,
            health_concern: formData.concern,
            preferredLanguage: formData.preferredLanguage,
            source: 'Website - Pelvic Vein Embolization Hero Section Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', location: '', preferredLanguage: '', concern: '' });
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
      className='relative w-full bg-cover bg-center py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8 text-white'
      style={{ backgroundImage: `url('${bgImage}')`, minHeight: '420px' }}
    >
      <div className='absolute inset-0 bg-[#4b3b6a] opacity-40'></div>

      <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center'>
        <div className='lg:col-span-7 text-center lg:text-left text-white'>
          {isCitySpecific ? (
            <>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white'>
                No-Surgery Pelvic Vein congestion Treatment in {getCityName()}
              </h1>
              <p className='mt-4 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 text-white/90'>
                Advanced Non-Surgical Treatment for Pelvic Pain by Interventional Radiology Specialists | NoSurgeries by Medagg
              </p>
            </>
          ) : (
            <>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white'>Pelvic Vein Embolization</h1>
              <p className='mt-4 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 text-white/90'>
                A minimally invasive treatment to relieve chronic pelvic pain caused by pelvic vein congestion.
              </p>
            </>
          )}
        </div>

        <div className='lg:col-span-5 w-full max-w-md mx-auto'>
          <div className='rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-2xl p-5 sm:p-6 text-white'>
            <h2 className='text-lg font-bold text-center mb-4 text-white'>Get Expert Consultation</h2>

            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3'>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Name'
                  className='w-full rounded-md bg-white/15 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/20'
                  required
                />
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Phone Number'
                  className='w-full rounded-md bg-white/15 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/20'
                  required
                />
              </div>

              <div className='mb-3'>
                <input
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  placeholder='Location'
                  className='w-full rounded-md bg-white/15 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/20'
                  required
                />
              </div>

              <div className='mb-3'>
                <select
                  name='preferredLanguage'
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className='w-full rounded-md bg-white/15 border border-white/20 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-400'
                  aria-label='Preferred Language'
                  required
                >
                  <option value='' disabled className='text-black'>
                    Preferred Language
                  </option>
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
              </div>

              <div className='mb-4'>
                <textarea
                  name='concern'
                  value={formData.concern}
                  onChange={handleChange}
                  placeholder='Describe your Health Concern'
                  className='w-full rounded-md bg-white/15 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-white placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none focus:bg-white/20'
                  rows='3'
                  required
                />
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-md transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2'
              >
                {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
                <UserRound size={18} />
              </button>

              {formStatus === 'success' && (
                <p className='text-green-200 text-center mt-3 text-sm font-semibold'>
                  Thank you for reaching out. Our expert will contact you shortly.
                </p>
              )}
              {formStatus === 'error' && (
                <p className='text-red-200 text-center mt-3 text-sm font-semibold'>Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PVCHeroSection;
