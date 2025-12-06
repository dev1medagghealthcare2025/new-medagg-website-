import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookAppointmentFrozen = () => {
  const [formData, setFormData] = useState({
    concern: '',
    city: '',
    name: '',
    phone: '',
    preferredLanguage: '',
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
      // Replace with your actual API endpoint if needed
      await new Promise((r) => setTimeout(r, 600));
      setFormStatus('success');
      setFormData({ concern: '', city: '', name: '', phone: '', preferredLanguage: '' });
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-10 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="bg-cover bg-center rounded-2xl shadow-lg relative p-8 md:p-12"
          style={{ backgroundImage: "url('/book and appoinment background.jpg')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#1a1446] bg-opacity-15 rounded-2xl" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Think You Might Have <span className="text-pink-500">Frozen Shoulder?</span>
              </h2>
              <p className="mt-4 text-gray-200">
                Talk to our interventional radiologists and find out if ACE is right for you.
              </p>
              <Link to="/contact-us">
                <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Book Appointment
                </button>
              </Link>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded-xl shadow-2xl p-5 sm:p-6">
              <h3 className="text-lg font-bold text-[#1a1446] mb-4 text-center">
                Get Expert Consultation
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  name="concern"
                  value={formData.concern}
                  onChange={handleInputChange}
                  placeholder="Describe Your Health Concern"
                  rows="3"
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-pink-400"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-pink-400"
                    required
                  />
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-pink-400 bg-white"
                  >
                    <option value="" disabled>Preferred Language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-pink-400"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-pink-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
                </button>
                {formStatus === 'success' && (
                  <p className="text-green-600 text-center text-sm mt-2">Thank you! We'll be in touch soon.</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-600 text-center text-sm mt-2">Something went wrong. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentFrozen;