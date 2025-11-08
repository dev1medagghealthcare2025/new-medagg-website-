import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const bgImage = '/GAE_PAGE_BACKGROUND.jpg';

export default function GAE_Herosection() {
  const [formData, setFormData] = useState({
    healthConcern: '',
    city: '',
    fullName: '',
    phoneNumber: '',
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
            source: 'Website - GAE Hero Section Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ healthConcern: '', city: '', fullName: '', phoneNumber: '' });
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
      <div className='absolute inset-0 bg-[#2d2552] bg-opacity-60 z-0' />
      <div
        className='relative z-10 w-full max-w-7xl min-h-[460px] mx-auto flex flex-col lg:flex-row items-center justify-between'
        style={{ borderRadius: '24px', overflow: 'hidden' }}
      >
        {/* Left: Text */}
        <div className='flex-1 flex flex-col justify-center lg:pr-8 xl:pr-12 mb-8 lg:mb-0 text-center lg:text-left'>
          <h1 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6'>
            <div>Genicular Artery</div>
            <div className='mt-1'>Embolization (GAE)</div>
          </h1>
          <p className='text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-6 max-w-2xl mx-auto lg:mx-0'>
            A non-surgical option to relieve chronic knee pain.
          </p>
        </div>
        {/* Right: Form and Pills */}
        <div className='flex-1 flex flex-col items-center lg:items-end w-full max-w-md lg:max-w-none'>
          <form
            onSubmit={handleSubmit}
            className='bg-white rounded-xl shadow-2xl p-4 w-full max-w-md'
          >
            <h2 className='text-base sm:text-lg font-bold text-[#2d2552] mb-3 text-center lg:text-left'>Get Expert Consultation</h2>
            <textarea
              name='healthConcern'
              value={formData.healthConcern}
              onChange={handleInputChange}
              className='w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm resize-none mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'
              placeholder='Describe Your Health Concern'
              rows={2}
            />
            <input
              name='city'
              value={formData.city}
              onChange={handleInputChange}
              className='w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'
              placeholder='City'
              type='text'
            />
            <div className='flex flex-col sm:flex-row gap-2.5 mb-3'>
              <input
                name='fullName'
                value={formData.fullName}
                onChange={handleInputChange}
                className='w-full sm:w-1/2 border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'
                placeholder='Full Name'
                type='text'
                required
              />
              <input
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className='w-full sm:w-1/2 border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all'
                placeholder='Phone Number'
                type='tel'
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
          {/* Pills below the form */}
          <div className='flex flex-wrap gap-2.5 justify-center w-full mt-4 px-2'>
            <span className='bg-black/20 text-white text-xs px-3 py-1.5 rounded-full font-medium'>I was worried about side effects.</span>
            <span className='bg-black/20 text-white text-xs px-3 py-1.5 rounded-full font-medium'>I didn't want surgery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
