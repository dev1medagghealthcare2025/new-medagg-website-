import React, { useState } from 'react';

const JoinWithLanding = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    city: '',
    message: '', // Replaces hospitalName and specialization
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
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            experience: formData.experience,
            city: formData.city,
            specialization: formData.message, // Map message to specialization
            source: 'Website - Join With Us Form',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', email: '', experience: '', city: '', message: '' });
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
    <section id="join-with-us-section" className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Join our growing network of <span className="text-pink-500">Expert IR doctors</span> and be a part of <span className="text-pink-500">Medagg Healthcare's</span> trusted team.
            </h1>
          </div>

          {/* Right Form */}
          <div>
            <p className="text-lg font-medium text-gray-800 mb-6">Share your details and we will reach out to you with the next Steps</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name*" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500" required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Your Mobile No*" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500" required />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email ID*" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500" required />
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Select City*" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500" required />
                <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Experience (Years)*" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500" required />
              </div>
              <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message" rows="4" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"></textarea>
              <div>
                <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto rounded-md bg-pink-600 px-10 py-3 text-base font-semibold text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:bg-gray-400 transition-colors">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              {formStatus === 'success' && (
                <p className='text-green-600 font-semibold'>
                  Thank you for your submission. We will be in touch shortly.
                </p>
              )}
              {formStatus === 'error' && (
                <p className='text-red-600 font-semibold'>
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

export default JoinWithLanding;