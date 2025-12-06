import React, { useState } from 'react';

const FrozenShoulderHero = () => {
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

  // If you want this to submit to your CRM, plug the API here (same as other pages).
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');
    try {
      // Example only: replace with your actual endpoint if needed
      // await fetch('/api/lead', { method: 'POST', body: JSON.stringify(formData) });
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
    <section className="w-full relative">
      {/* Background */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/Diabetic.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1a1446] bg-opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left copy */}
            <div className="lg:col-span-7 text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
                Adhesive Capsulitis Embolization (ACE)
              </h1>
              <p className="mt-4 text-white text-base sm:text-lg max-w-2xl">
                A breakthrough non-surgical option to relieve frozen shoulder pain and stiffness.
              </p>
            </div>

            {/* Right form */}
            <div className="lg:col-span-5">
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
                      <option value="Kannada">Kannada</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Urdu">Urdu</option>
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
                    <p className="text-green-600 text-center text-sm">Thank you! We'll be in touch soon.</p>
                  )}
                  {formStatus === 'error' && (
                    <p className="text-red-600 text-center text-sm">Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrozenShoulderHero;