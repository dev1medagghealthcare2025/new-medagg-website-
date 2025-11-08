import React, { useState } from 'react';

const BookAnAppointmentBreastNoduleRFA = () => {
  const [formData, setFormData] = useState({
    concern: '',
    city: '',
    fullName: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
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
            phone: formData.phone,
            city: formData.city,
            health_concern: formData.concern,
            source: 'Website - Breast Nodule RFA Book Appointment',
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
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className="w-full max-w-[1201px] h-auto md:h-[412px] rounded-[20px] shadow-lg overflow-hidden mx-auto bg-cover bg-center"
          style={{
            backgroundImage: "url('/book and appoinment background.jpg')",
          }}
        >
          <div className="bg-[#2d2552]/10 p-10 flex items-center h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
              {/* Left Side: Content */}
              <div className="text-white text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Think You Might Have
                  <br />
                  <span className="text-[#ff3576]">Breast Nodule?</span>
                </h2>
                <p className="text-base md:text-lg mb-6 text-white">
                  Book a clinic visit to evaluate your lump and find the best treatment for you.
                </p>
                <button className="bg-[#ff3576] hover:bg-[#e02e63] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300">
                  Book Appointment
                </button>
              </div>

              {/* Right Side: Form */}
              <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto flex flex-col">
                <h3 className="text-xl font-bold text-[#2d2552] mb-4">
                  Get Expert Consultation
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-4">
                  <textarea
                    name="concern"
                    value={formData.concern}
                    onChange={handleChange}
                    placeholder="Describe Your Health Concern"
                    className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] resize-none"
                    rows="2"
                  ></textarea>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ff3576] hover:bg-[#e02e63] text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 disabled:bg-gray-400"
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
      </div>
    </div>
  );
};

export default BookAnAppointmentBreastNoduleRFA;