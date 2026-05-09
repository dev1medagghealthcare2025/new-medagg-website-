import { useState } from 'react';
import { Link } from 'react-router-dom';

const PVCBookAppointment = ({ city = '', variant = '' }) => {
  const cityLower = (city || '').toLowerCase();
  const variantLower = (variant || '').toLowerCase();
  const isChennai = variantLower === 'chennai' || cityLower === 'chennai';
  const isMadurai = variantLower === 'madurai' || cityLower === 'madurai';
  const isCoimbatore = variantLower === 'coimbatore' || cityLower === 'coimbatore';
  const isBangalore = variantLower === 'bangalore' || cityLower === 'bangalore' || cityLower === 'bengaluru';
  const isMangalore = variantLower === 'mangalore' || cityLower === 'mangalore' || cityLower === 'mangaluru';
  const isCitySpecific = isChennai || isMadurai || isCoimbatore || isBangalore || isMangalore;
  const cityName = isChennai ? 'Chennai' : isMadurai ? 'Madurai' : isCoimbatore ? 'Coimbatore' : isBangalore ? 'Bangalore' : isMangalore ? 'Mangalore' : '';

  const [formData, setFormData] = useState({
    healthConcern: '',
    city: cityName,
    fullName: '',
    phoneNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(''); // success, error, or ''

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            source: 'Website - PVC Book Appointment',
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
    <section className='py-10 md:py-16 bg-white'>
      <div
        className='relative w-full max-w-[1201px] mx-auto rounded-[20px] overflow-hidden bg-cover bg-center p-6 sm:p-8 md:p-12 min-h-[420px] md:h-[421px]'
        style={{ backgroundImage: 'url(\'/book and appoinment background.jpg\')' }}
      >
        <div className='absolute inset-0 bg-[#2d2552] opacity-40'></div>

        <div className='relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center h-full'>
          {/* Left Content */}
          <div className='text-white space-y-5 text-center md:text-left max-w-xl mx-auto md:mx-0'>
            {isCitySpecific ? (
              <>
                <h2 className='text-3xl md:text-4xl font-extrabold leading-tight'>
                  <span className='text-white'>Suffering From Pelvic Vein Congestion? Get Checked</span> <br />
                  <span className='text-[#ff3576]'>In {cityName}</span>
                </h2>
                <p className='text-base md:text-lg text-white/90 font-medium max-w-md mx-auto md:mx-0 leading-relaxed'>
                  Non-surgical, Pelvic Pain solution available now
                </p>
              </>
            ) : (
              <>
                <h2 className='text-3xl md:text-4xl font-extrabold leading-tight'>
                  <span className='text-white'>Think You Might Have</span> <br />
                  <span className='text-[#ff3576]'>Pelvic Vein Congestion Syndrome?</span>
                </h2>
                <p className='text-base md:text-lg text-white/90 font-medium max-w-md mx-auto md:mx-0 leading-relaxed'>
                  consult our specialists to find out if Pelvic Vein Embolization is the right treatment for you
                </p>
              </>
            )}
            <div className='pt-2'>
              <Link to='/contact-us'>
                <button className='bg-[#ff3576] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-pink-700 transition-all shadow-lg'>
                  Book Appointment
                </button>
              </Link>
            </div>
          </div>

          {/* Right Form */}
          <div className='bg-white rounded-2xl p-4 sm:p-6 shadow-2xl w-full max-w-sm mx-auto lg:ml-auto lg:mr-0'>
            <h3 className='text-lg font-bold text-[#2d2552] mb-4'>Get Expert Consultation</h3>
            <form onSubmit={handleSubmit} className='space-y-3'>
              <textarea
                name='healthConcern'
                value={formData.healthConcern}
                onChange={handleInputChange}
                placeholder='Describe Your Health Concern'
                rows={2}
                className='w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-sm'
                required
              />
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
                placeholder='City'
                className='w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-sm'
                required
              />
              <div className='grid grid-cols-1 gap-3'>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder='Full Name'
                  className='w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-sm'
                  required
                />
                <input
                  type='tel'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder='Phone Number'
                  className='w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 text-sm'
                  required
                />
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-[#ff3576] text-white py-3 rounded-lg font-bold text-base hover:bg-pink-700 transition-all shadow-lg disabled:bg-gray-400 uppercase tracking-wide mt-2'
              >
                {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
              </button>
              {formStatus === 'success' && (
                <p className='text-green-600 text-center mt-4 font-bold'>
                  Thank you! Our expert will contact you shortly.
                </p>
              )}
              {formStatus === 'error' && (
                <p className='text-red-600 text-center mt-4 font-bold'>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PVCBookAppointment;
