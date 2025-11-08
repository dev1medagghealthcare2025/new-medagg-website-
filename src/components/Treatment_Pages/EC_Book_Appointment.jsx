import React, { useState } from 'react';

const EC_Book_Appointment = () => {
  const [formData, setFormData] = useState({
    concern: '',
    name: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

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
            source: 'Website - Endovascular Coiling Book Appointment',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ concern: '', name: '', phone: '' });
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
      className="relative bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/book and appoinment background.jpg')",
        height: '393px',
      }}
    >
      <div className="absolute inset-0 bg-[#2d2552] opacity-20"></div>
      <div className="relative container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="text-white text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Think You Might Have An <br />
            <span className="text-[#ff3576]">Aneurysm?</span>
          </h2>
          <p className="text-lg md:text-xl mt-4 mb-8 text-white">
            Don't wait—headaches, vision changes, or neurological symptoms need expert evaluation.
          </p>
          <button className="bg-[#ff3576] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors duration-300 text-lg">
            Book Appointment
          </button>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              name="concern"
              value={formData.concern}
              onChange={handleInputChange}
              placeholder="Describe Your Health Concern"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
              rows="4"
              required
            ></textarea>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ff3576] text-white font-bold py-4 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300 text-lg disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Speak To Experts'}
            </button>
            {formStatus === 'success' && <p className='text-green-600 text-center font-semibold mt-2 text-sm'>Thank you! We will be in touch soon.</p>}
            {formStatus === 'error' && <p className='text-red-600 text-center font-semibold mt-2 text-sm'>Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EC_Book_Appointment;
