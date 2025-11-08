import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookAnAppointmentVAE = () => {
  const [formData, setFormData] = useState({
    healthConcern: '',
    city: '',
    fullName: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
            source: 'Website - VAE Book Appointment',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ healthConcern: '', city: '', fullName: '', phone: '' });
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
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="flex justify-center">
        <div 
          className="bg-[#2d2552] rounded-3xl p-6 sm:p-8 lg:p-12 flex items-center bg-cover bg-center relative w-full max-w-[1201px] min-h-[300px] sm:min-h-[350px] lg:min-h-[412px]"
          style={{ 
            backgroundImage: "url('/book and appoinment background.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-[#2d2552] bg-opacity-10 rounded-3xl"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full z-10">
            <div className="text-white text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                <span className="text-white">Think You Might Have</span><br />
                <span className="text-[#ff3576]">Breast Nodule?</span>
              </h2>
              <p className="mt-4 text-base text-gray-200 leading-relaxed">
              Scar-free removal of benign breast nodules through minimally invasive technology.
              </p>
              <Link to="/contact-us">
                <button className="mt-6 bg-[#ff3576] text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-700 transition duration-300 text-sm">
                  Book Appointment
                </button>
              </Link>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md ml-0 sm:ml-4 lg:ml-10">
              <h3 className="text-xl font-bold text-[#2d2552] mb-5 text-center">Get Expert Consultation</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  id="healthConcern"
                  name="healthConcern"
                  rows="3"
                  value={formData.healthConcern}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] text-sm"
                  placeholder="Describe Your Health Concern"
                  required
                ></textarea>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] text-sm"
                  placeholder="City"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] text-sm"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] text-sm"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#ff3576] text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition duration-300 disabled:bg-gray-400 text-base"
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

export default BookAnAppointmentVAE;
