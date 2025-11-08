import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Bookanappoinment_rfa = () => {
  const [formData, setFormData] = useState({
    concern: '',
    city: '',
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(''); // success, error, or ''

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
            name: formData.name,
            phone: formData.phone,
            health_concern: formData.concern,
            city: formData.city,
            source: 'Website - RFA Book Appointment Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ concern: '', city: '', name: '', phone: '' });
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
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div 
          className="relative bg-cover bg-center rounded-3xl shadow-2xl overflow-hidden"
          style={{ 
            backgroundImage: "url('/book and appoinment background.jpg')",
            width: '1201.54px',
            height: '412px',
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          <div className="absolute inset-0 bg-[#2d2552] bg-opacity-10"></div>
          <div className="relative h-full flex items-center px-8 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
              {/* Left Content */}
              <div className="text-white text-center lg:text-left lg:pr-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Think You Might Have An
                </h2>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ff3576] leading-tight">
                  Irregular Heartbeat?
                </h2>
                <p className="mt-3 text-base sm:text-lg text-gray-200 max-w-sm mx-auto lg:mx-0">
                  Book your consultation today and explore a safer alternative to bypass surgery.
                </p>
                <div className="mt-4">
                  <Link to="/contact-us">
                    <button className="bg-[#ff3576] text-white font-bold py-2 px-6 rounded-lg text-base hover:bg-pink-700 transition-all duration-300 shadow-lg">
                      Book Appointment
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Form */}
              <div className="w-full max-w-sm mx-auto lg:ml-auto lg:mr-8">
                <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-[#2d2552] mb-4 text-center">Get Expert Consultation</h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <textarea 
                      name="concern"
                      value={formData.concern}
                      onChange={handleInputChange}
                      placeholder="Describe Your Health Concern" 
                      className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] text-xs"
                      rows="2"
                      required
                    ></textarea>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City" 
                      className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] text-xs"
                      required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name" 
                        className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] text-xs"
                        required
                      />
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number" 
                        className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] text-xs"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#ff3576] text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition-all duration-300 shadow-lg disabled:bg-gray-400 text-sm"
                    >
                      {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
                    </button>
                    {formStatus === 'success' && (
                      <p className="text-green-600 text-center mt-1 font-semibold text-xs">
                        Thank you for reaching out. Our expert will contact you shortly.
                      </p>
                    )}
                    {formStatus === 'error' && (
                      <p className="text-red-600 text-center mt-1 font-semibold text-xs">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bookanappoinment_rfa;