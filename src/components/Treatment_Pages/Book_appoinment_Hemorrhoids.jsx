
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Book_appoinment_Hemorrhoids = () => {
  const [formData, setFormData] = useState({
    healthConcern: '',
    city: '',
    fullName: '',
    phone: '',
    preferredLanguage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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
            phone: formData.phone,
            city: formData.city,
            health_concern: formData.healthConcern,
            preferredLanguage: formData.preferredLanguage,
            source: 'Website - Hemorrhoids Book Appointment Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ healthConcern: '', city: '', fullName: '', phone: '', preferredLanguage: '' });
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
    <div className='bg-white py-12 sm:py-14'>
      <div
        className='relative bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden mx-auto max-w-6xl'
        style={{ backgroundImage: 'url(\'/book and appoinment background.jpg\')' }}
      >
        <div className='absolute inset-0 bg-[#2d2552] bg-opacity-15' />

        <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center'>
            <div className='text-white space-y-5 text-center lg:text-left'>
              <h2 className='text-3xl md:text-4xl font-bold leading-tight'>
                <span className='text-white'>Think You Might Have</span> <br />
                <span className='text-[#ff3576]'>Piles/Hemorrhoids?</span>
              </h2>
              <p className='text-base sm:text-lg text-gray-200 max-w-lg mx-auto lg:mx-0'>
                Book a consultation with our Interventional Radiology experts to understand whether Piles Artery
                Embolization is right for you.
              </p>
              <div className='pt-2'>
                <Link to='/contact-us'>
                <button className='bg-[#ff3576] text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-300 text-base sm:text-lg'>
                  Book Appointment
                </button>
                </Link>
              </div>
            </div>

            <div className='flex justify-center lg:justify-end'>
              <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-lg w-full max-w-xl'>
                <h3 className='text-xl sm:text-2xl font-bold text-[#2d2552] mb-5 sm:mb-6 text-center'>Get Expert Consultation</h3>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <textarea
                    name='healthConcern'
                    value={formData.healthConcern}
                    onChange={handleInputChange}
                    placeholder='Describe Your Health Concern'
                    rows={3}
                    className='w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] resize-none'
                    required
                  />

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder='City'
                      className='w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]'
                      required
                    />

                    <select
                      name='preferredLanguage'
                      value={formData.preferredLanguage}
                      onChange={handleInputChange}
                      className='w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] text-black'
                      aria-label='Preferred Language'
                      required
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

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <input
                      type='text'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder='Full Name'
                      className='w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]'
                      required
                    />
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder='Phone Number'
                      className='w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]'
                      required
                    />
                  </div>

                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-[#ff3576] text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition-colors duration-300 disabled:bg-gray-400'
                  >
                    {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
                  </button>

                  {formStatus === 'success' && (
                    <p className='text-green-600 text-center font-semibold mt-2'>Thank you! We will be in touch soon.</p>
                  )}
                  {formStatus === 'error' && (
                    <p className='text-red-600 text-center font-semibold mt-2'>Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book_appoinment_Hemorrhoids;

