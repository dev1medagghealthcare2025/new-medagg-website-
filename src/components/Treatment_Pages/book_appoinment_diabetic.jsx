import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookAppointmentDiabetic = () => {
  const navigate = useNavigate();
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
            city: formData.city,
            health_concern: formData.concern,
            preferredLanguage: formData.preferredLanguage,
            source: 'Website - Diabetic Foot Book Appointment Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ concern: '', city: '', name: '', phone: '', preferredLanguage: '' });
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative bg-cover bg-center rounded-3xl overflow-hidden p-8 sm:p-10 lg:p-12"
          style={{ backgroundImage: "url('/book and appoinment background.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#1a1446] bg-opacity-10" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="text-white text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white">
                Worried About a <span className="text-pink-500">Diabetic Foot Wound or Blackened Toe?</span>
              </h2>
              <p className="mt-4 text-white text-base sm:text-lg">
                Talk to our interventional radiology team to find out if endovascular treatment is an option for you.
              </p>
              <button
                onClick={() => navigate('/contact-us')}
                className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Book Appointment
              </button>
            </div>

            {/* Right Form */}
            <div className="w-full max-w-md mx-auto">
              <div className="bg-white rounded-xl shadow-2xl p-6">
                <h3 className="text-lg font-bold text-[#1a1446] mb-4 text-center">Get Expert Consultation</h3>
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
                      <option value="" disabled>Language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
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
                  {formStatus === 'success' && <p className="text-green-600 text-center text-sm">Thank you! We'll be in touch soon.</p>}
                  {formStatus === 'error' && <p className="text-red-600 text-center text-sm">Something went wrong. Please try again.</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentDiabetic;