import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const PlanterHeroSection = () => {
  const [formData, setFormData] = useState({
    healthConcern: '',
    city: '',
    fullName: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(''); // success, error, or ''

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
            source: 'Website - Planter Hero Section Form',
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
    <div
      className="relative bg-cover bg-center text-white py-8 sm:py-10 lg:py-14 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/Planter_herosection_bg.jpg')", minHeight: '460px' }}
    >
      <div className="absolute inset-0 bg-[#2d2552] bg-opacity-60"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side Content */}
          <div className="text-white text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-3 sm:mb-5">
              Plantar Fascial Embolization (PFE)
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto lg:mx-0">
              Minimally invasive, image-guided relief for chronic heel pain
            </p>
          </div>

          {/* Right Side Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-2xl p-4">
              <h2 className="text-base sm:text-lg font-bold text-[#2d2552] mb-3 text-center">Get Expert Consultation</h2>
              <form onSubmit={handleSubmit}>
                <textarea
                  name="healthConcern"
                  value={formData.healthConcern}
                  onChange={handleChange}
                  placeholder="Describe Your Health Concern"
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm resize-none mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                  rows="2"
                  required
                ></textarea>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm mb-3 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                  required
                />
                <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full sm:w-1/2 border border-gray-200 rounded-lg p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                  <p className='text-green-600 text-center mt-3 text-sm font-semibold'>
                    Thank you! Our expert will contact you shortly.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className='text-red-600 text-center mt-3 text-sm font-semibold'>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
            <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2.5 px-2">
                <span className='bg-black/20 text-white text-xs px-3 py-1.5 rounded-full font-medium'>I was worried about side effects.</span>
                <span className='bg-black/20 text-white text-xs px-3 py-1.5 rounded-full font-medium'>I didn't want surgery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanterHeroSection;
