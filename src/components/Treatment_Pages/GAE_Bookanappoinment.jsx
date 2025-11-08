import { useState } from 'react';

const GAE_Bookanappoinment = () => {
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
    setFormData(prev => ({ ...prev, [name]: value }));
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
            source: 'Website - GAE Book Appointment',
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
    <section className="py-10 md:py-16 bg-white">
      <div
        className="relative max-w-[1201px] h-[421px] mx-auto rounded-[20px] overflow-hidden bg-cover bg-center p-8 md:p-12"
        style={{ backgroundImage: "url('/book and appoinment background.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#2d2552] opacity-15"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="text-white">Think You Might Have</span> <br />
              <span className="text-[#ff3576]">Knee Osteoarthritis?</span>
            </h2>
            <p className="text-base md:text-lg text-gray-200 max-w-md">
              Consult our interventional radiologists and find out if GAE is right for you.
            </p>
            <button className="bg-[#ff3576] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-colors shadow-lg">
              Book Appointment
            </button>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Get Expert Consultation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                name="healthConcern"
                value={formData.healthConcern}
                onChange={handleInputChange}
                placeholder="Describe Your Health Concern"
                rows={2}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ff3576] text-white py-3 rounded-lg font-bold text-lg hover:bg-pink-700 transition-colors shadow-lg disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
              </button>
              {formStatus === 'success' && (
                <p className='text-green-600 text-center font-semibold mt-2'>
                  Thank you for reaching out. Our expert will contact you shortly.
                </p>
              )}
              {formStatus === 'error' && (
                <p className='text-red-600 text-center font-semibold mt-2'>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GAE_Bookanappoinment;
