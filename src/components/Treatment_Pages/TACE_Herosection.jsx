import React, { useState } from 'react';

const TACE_Herosection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    preferredLanguage: '',
    healthConcern: '',
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
            name: formData.name,
            phone: formData.phone,
            city: formData.location,
            health_concern: formData.healthConcern,
            preferredLanguage: formData.preferredLanguage,
            source: 'Website - TACE Hero Section Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', location: '', preferredLanguage: '', healthConcern: '' });
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
      className='relative text-white px-4 sm:px-6 lg:px-8 py-10 lg:py-14 overflow-hidden'
      style={{
        backgroundImage: "linear-gradient(rgba(45,37,82,0.35), rgba(45,37,82,0.35)), url('/y90_herosection.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '440px',
      }}
    >
      <style>{`
        .y90-form-input::placeholder {
          color: white !important;
          opacity: 1 !important;
          -webkit-text-fill-color: white !important;
        }
        .y90-form-input::-webkit-input-placeholder {
          color: white !important;
          opacity: 1 !important;
          -webkit-text-fill-color: white !important;
        }
        .y90-form-input::-moz-placeholder {
          color: white !important;
          opacity: 1 !important;
        }
        /* Force input and select text to be white */
        .y90-form-input {
          color: white !important;
          -webkit-text-fill-color: white !important;
        }
        /* Ensure options inside are readable (black text on white/gray bg) */
        select.y90-form-input option {
          color: black !important;
          background-color: white !important;
          -webkit-text-fill-color: black !important;
        }
      `}</style>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center'>
          <div className='text-center lg:text-left'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight'>
              <span className='text-white'>TACE (Transarterial </span>
              <br />
              <span className='text-white'>Chemoembolization)</span>
            </h1>
            <p className='mt-4 text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl mx-auto lg:mx-0'>
              A minimally invasive treatment that delivers targeted radiation directly to liver tumors while preserving healthy liver tissue.
            </p>
          </div>

          <div className='w-full max-w-lg mx-auto lg:ml-auto'>
            <div className='bg-white/10 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl p-5 sm:p-6'>
              <h2 className='text-lg sm:text-xl font-bold text-white mb-4'>Get Expert Consultation</h2>

              <form onSubmit={handleSubmit} className='space-y-3'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder='Name'
                    className='y90-form-input w-full rounded-md bg-white/15 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#ff3576]'
                    required
                  />
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder='Phone Number'
                    className='y90-form-input w-full rounded-md bg-white/15 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#ff3576]'
                    required
                  />
                </div>

                <input
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder='Location'
                  className='y90-form-input w-full rounded-md bg-white/15 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#ff3576]'
                  required
                />

                <select
                  name='preferredLanguage'
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  className='y90-form-input w-full rounded-md bg-white/15 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#ff3576]'
                  aria-label='Preferred Language'
                  required
                >
                  <option value='' disabled className='text-black'>Preferred Language</option>
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

                <textarea
                  name='healthConcern'
                  value={formData.healthConcern}
                  onChange={handleInputChange}
                  placeholder='Describe your Health Concern'
                  className='y90-form-input w-full rounded-md bg-white/15 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#ff3576] resize-none'
                  rows={4}
                  required
                />

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-[#ff3576] hover:bg-pink-600 text-white font-semibold text-sm sm:text-base py-3 rounded-md transition-colors disabled:bg-gray-400'
                >
                  {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
                </button>

                {formStatus === 'success' && (
                  <p className='text-green-300 text-center text-sm font-semibold pt-1'>
                    Thank you for reaching out. Our expert will contact you shortly.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className='text-red-300 text-center text-sm font-semibold pt-1'>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TACE_Herosection;
