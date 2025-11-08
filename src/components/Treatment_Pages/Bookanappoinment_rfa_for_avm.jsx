import React, { useState } from 'react';

const BookAppointmentRFAForAVM = () => {
  const [formData, setFormData] = useState({
    concern: '',
    city: '',
    fullName: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(''); // success, error, or ''

  const handleInputChange = (e) => {
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
            health_concern: formData.concern,
            city: formData.city,
            source: 'Website - RFA for AVM Book Appointment Form',
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
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          className="relative text-white rounded-2xl p-8 md:p-12 bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/book and appoinment background.jpg')" }}
        >
          <div className="absolute inset-0 bg-purple-800 bg-opacity-10"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side: Content */}
            <div className="flex flex-col gap-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                Think You Might Have An <br />
                <span className="text-pink-500">Brain Vessel Problems?</span>
              </h2>
              <p className="text-lg text-gray-200">
                Don't wait—headaches, vision changes, or neurological symptoms need expert evaluation.
              </p>
              <div className="mt-4">
                <button className="bg-pink-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors duration-300">
                  Book Appointment
                </button>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl w-full">
              <h3 className="text-2xl font-bold mb-6 text-center">Get Expert Consultation</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  name="concern"
                  value={formData.concern}
                  onChange={handleInputChange}
                  placeholder="Describe Your Health Concern"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="2"
                ></textarea>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300 disabled:bg-gray-400"
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
    </section>
  );
};

export default BookAppointmentRFAForAVM;