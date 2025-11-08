import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookAppointmentFTE = () => {
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
            source: 'Website - FTE Book Appointment',
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
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50 flex items-center justify-center">
      <div
        className="relative bg-cover bg-center rounded-[20px] overflow-hidden shadow-2xl max-w-6xl mx-auto"
        style={{
          backgroundImage: "url('/book and appoinment background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#2D2552] opacity-10"></div>
        <div className="relative w-full h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full p-12">
            {/* Left Side: Text Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Think You Might Have A
                <br />
                <span className="text-[#ff3576]">Tubal Blockage?</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                You don’t need IVF first—non-surgical restoration may be effective.
              </p>
              <Link to="/contact-us">
                <button className="mt-8 bg-[#ff3576] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition duration-300">
                  Book Appointment
                </button>
              </Link>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2552] mb-4">Get Expert Consultation</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <textarea
                    name="healthConcern"
                    value={formData.healthConcern}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                    rows="3"
                    placeholder="Describe Your Health Concern"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                    placeholder="City"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#ff3576] text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition duration-300 disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
                </button>
                {formStatus === 'success' && (
                  <p className='text-green-600 text-center mt-4 font-semibold'>
                    Thank you for reaching out. Our expert will contact you shortly.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className='text-red-600 text-center mt-4 font-semibold'>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentFTE;
