import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookappoinmentPlanter = () => {
  const [formData, setFormData] = useState({
    healthConcern: '',
    city: '',
    fullName: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
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
            source: 'Website - Planter Book Appointment Form',
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
    <div className="bg-white py-16 sm:py-20">
      <div
        className="relative bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden mx-auto max-w-7xl"
        style={{ backgroundImage: "url('/book and appoinment background.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#2d2552] bg-opacity-10"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="text-white">Think You Might Need</span> <br />
                <span className="text-[#ff3576]">Plantar Fascia Relief?</span>
              </h2>
              <p className="text-lg text-gray-200 max-w-lg mx-auto lg:mx-0">
                Book your consultation to review your case and see if you qualify for PFE.
              </p>
              <Link to="/contact-us">
                <button className="bg-[#ff3576] text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-300 text-lg">
                  Book Appointment
                </button>
              </Link>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md">
                <h3 className="text-2xl font-bold text-[#2d2552] mb-6 text-center">Get Expert Consultation</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="healthConcern"
                    value={formData.healthConcern}
                    onChange={handleInputChange}
                    placeholder="Describe Your Health Concern"
                    className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ff3576] text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition-colors duration-300 disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
                  </button>
                  {formStatus === 'success' && <p className='text-green-600 text-center font-semibold mt-2'>Thank you! We will be in touch soon.</p>}
                  {formStatus === 'error' && <p className='text-red-600 text-center font-semibold mt-2'>Something went wrong. Please try again.</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookappoinmentPlanter;