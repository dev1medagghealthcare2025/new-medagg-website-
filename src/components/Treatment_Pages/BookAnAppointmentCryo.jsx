import React, { useState } from 'react';

const BookAnAppointmentVAE = () => {
  const [formData, setFormData] = useState({
    concern: '',
    city: '',
    name: '',
    phone: '',
    preferredLanguage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            city: formData.city,
            health_concern: formData.concern,
            preferredLanguage: formData.preferredLanguage,
            source: 'Website - Cryoablation Book Appointment',
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
      className='relative bg-cover bg-center flex items-center'
      style={{ backgroundImage: 'url(\'/book and appoinment background.jpg\')', minHeight: '320px' }}
    >
      <div className='absolute inset-0 bg-[#2d2552] opacity-25'></div>
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center'>
          <div className='text-white text-center lg:text-left'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white'>
              Think You Might Have <br />
              <span className='text-[#ff3576]'>Breast Nodule?</span>
            </h2>
            <p className='mt-4 text-lg text-white'>
              Book a clinic visit to evaluate your lump and find the best treatment for you.
            </p>
            <button className='mt-8 bg-[#ff3576] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition duration-300'>
              Book Appointment
            </button>
          </div>
          <div className='bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
              <div>
                <label htmlFor='concern' className='sr-only'>
                  Describe Your Health Concern
                </label>
                <textarea
                  id='concern'
                  name='concern'
                  rows='2'
                  value={formData.concern}
                  onChange={handleChange}
                  className='w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#ff3576] focus:border-[#ff3576] text-xs resize-none'
                  placeholder='Describe Your Health Concern'
                ></textarea>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor='name' className='sr-only'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#ff3576] focus:border-[#ff3576]'
                    placeholder='Full Name'
                  />
                </div>
                <div>
                  <label htmlFor='phone' className='sr-only'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#ff3576] focus:border-[#ff3576]'
                    placeholder='Phone Number'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                  <label htmlFor='city' className='sr-only'>City</label>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    className='w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#ff3576] focus:border-[#ff3576] text-xs'
                    placeholder='City'
                    required
                  />
                </div>
                <select
                  name='preferredLanguage'
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className='w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#ff3576] focus:border-[#ff3576] bg-white text-black text-xs'
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
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-[#ff3576] text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition duration-300 disabled:bg-gray-400'
              >
                {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
              </button>
              {formStatus === 'success' && <p className='text-green-600 text-center font-semibold mt-2 text-sm'>Thank you! We will be in touch soon.</p>}
              {formStatus === 'error' && <p className='text-red-600 text-center font-semibold mt-2 text-sm'>Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAnAppointmentVAE;
