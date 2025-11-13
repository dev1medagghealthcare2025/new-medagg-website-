import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookAppointmentVaricocele = () => {
  const [formData, setFormData] = useState({
    concern: '',
    city: '',
    fullName: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
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
            name: formData.fullName,
            phone: formData.phone,
            city: formData.city,
            health_concern: formData.concern,
            source: 'Website - Varicocele Book Appointment',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ concern: '', city: '', fullName: '', phone: '' });
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
    <section className="py-16 sm:py-24 flex items-center justify-center bg-gray-100">
      <div
        className='relative w-full max-w-[1201px] h-auto md:h-[421px] rounded-[20px] overflow-hidden mx-4'
        style={{
          backgroundImage: "url('/book and appoinment background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#2d2552] opacity-5"></div>
        <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full'>
            {/* Left Side */}
            <div className='text-center md:text-left py-8 md:py-0'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white'>
                Think You Might Have A <br />
                <span className='text-[#ff3576]'>Varicocele?</span>
              </h2>
              <p className='text-white text-base md:text-lg font-medium mb-8 max-w-md mx-auto md:mx-0'>
                Book a scan review and connect with leading IR specialists.
              </p>
              <Link to="/contact-us">
                <button className='bg-[#ff3576] text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-50 transition-transform duration-300 hover:scale-105'>
                  Book Appointment
                </button>
              </Link>
            </div>

            {/* Right Side - Form */}
            <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto'>
              <h3 className="text-xl font-bold text-[#2d2552] mb-4">Get Expert Consultation</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  name="concern"
                  value={formData.concern}
                  onChange={handleChange}
                  placeholder='Describe Your Health Concern'
                  rows='2'
                  className='w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition resize-none'
                  required
                ></textarea>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  placeholder='City'
                  className='w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition'
                  required
                />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder='Full Name'
                    className='w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition'
                    required
                  />
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='Phone Number'
                    className='w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition'
                    required
                  />
                </div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-[#ff3576] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-transform duration-300 hover:scale-105 disabled:bg-gray-400'
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
    </section>
  );
};

export default BookAppointmentVaricocele;
