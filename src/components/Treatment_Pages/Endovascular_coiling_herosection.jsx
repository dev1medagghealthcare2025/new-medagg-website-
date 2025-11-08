import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const EndovascularCoilingHeroSection = () => {
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
            city: formData.city,
            health_concern: formData.concern,
            source: 'Website - Endovascular Coiling Hero Section Form',
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
    <div
      className="relative bg-cover bg-center text-white py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/Endo_co_herosection_bg.jpg')", minHeight: '460px' }}
    >
      <div className="absolute inset-0 bg-[#2d2552] bg-opacity-60"></div>
      <div className="relative container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="flex flex-col text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-3 sm:mb-5">
            Endovascular Coiling
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto lg:mx-0">
            Minimally invasive, image-guided treatment to secure brain aneurysms without open surgery.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col items-center w-full">
          <div className="bg-white text-gray-800 p-4 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-base sm:text-lg font-bold mb-3 text-center">Get Expert Consultation</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                name="concern"
                value={formData.concern}
                onChange={handleInputChange}
                placeholder="Describe Your Health Concern"
                className="w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm resize-none mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                rows="2"
                required
              ></textarea>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                required
              />
              <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full sm:w-1/2 border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full sm:w-1/2 border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm sm:text-base py-2.5 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
              </button>
              {formStatus === 'success' && (
                <p className="text-green-600 text-center mt-3 text-sm font-semibold">
                  Thank you for reaching out. Our expert will contact you shortly.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-600 text-center mt-3 text-sm font-semibold">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mt-4 px-2">
            <span className="bg-black/20 text-white text-xs px-3 py-1.5 rounded-full font-medium">
              I was worried about side effects
            </span>
            <span className="bg-black/20 text-white text-xs px-3 py-1.5 rounded-full font-medium">
              I didn't want surgery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndovascularCoilingHeroSection;