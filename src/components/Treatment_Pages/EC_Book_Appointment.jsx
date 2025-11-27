import React, { useState } from 'react';

const EC_Book_Appointment = () => {
  const [formData, setFormData] = useState({
    concern: '',
    city: '',
    name: '',
    phone: '',
    preferredLanguage: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

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
            health_concern: formData.concern,
            city: formData.city,
            preferredLanguage: formData.preferredLanguage,
            source: 'Website - Endovascular Coiling Book Appointment',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ concern: '', city: '', name: '', phone: '', preferredLanguage: '' });
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
    <div
      className='relative bg-cover bg-center flex items-center min-h-[420px] md:min-h-[393px] py-8 sm:py-10 md:py-12'
      style={{
        backgroundImage: 'url(\'/book and appoinment background.jpg\')',
      }}
    >
      <div className='absolute inset-0 bg-[#2d2552] opacity-20'></div>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center w-full'>
        {/* Left Side: Content */}
        <div className='text-white text-center lg:text-left'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white'>
            Think You Might Have An <br />
            <span className='text-[#ff3576]'>Aneurysm?</span>
          </h2>
          <p className='text-base md:text-lg mt-3 md:mt-4 mb-6 md:mb-8 text-white'>
            Don't wait—headaches, vision changes, or neurological symptoms need expert evaluation.
          </p>
          <button className='w-full sm:w-auto bg-[#ff3576] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors duration-300 text-base md:text-lg'>
            Book Appointment
          </button>
        </div>

        {/* Right Side: Form */}
        <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-auto'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <textarea
              name='concern'
              value={formData.concern}
              onChange={handleInputChange}
              placeholder='Describe Your Health Concern'
              className='w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff3576] text-xs'
              rows='3'
              required
            ></textarea>
            <input
              type='text'
              name='city'
              value={formData.city}
              onChange={handleInputChange}
              placeholder='City'
              className='w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff3576] text-xs'
              required
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='Full Name'
                className='w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff3576] text-xs'
                required
              />
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                placeholder='Phone Number'
                className='w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff3576] text-xs'
                required
              />
            </div>
            <select
              name='preferredLanguage'
              value={formData.preferredLanguage}
              onChange={handleInputChange}
              className='w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff3576] bg-white text-black text-xs'
              aria-label='Preferred Language'
            >
              <option value='' disabled>Preferred Language</option>
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
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-[#ff3576] text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-300 text-sm disabled:bg-gray-400'
            >
              {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
            </button>
            {formStatus === 'success' && <p className='text-green-600 text-center font-semibold mt-2 text-sm'>Thank you! We will be in touch soon.</p>}
            {formStatus === 'error' && <p className='text-red-600 text-center font-semibold mt-2 text-sm'>Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EC_Book_Appointment;
