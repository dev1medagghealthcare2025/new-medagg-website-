import React, { useState } from 'react';
import Navbar from '../components/home/Navbar';
import Treatmentnavbar from '../components/home/Treatmentnavbar';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    message: '',
    preferredLanguage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(''); // success, error, or ''

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input change:', name, value); // Debug log
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      console.log('New form data:', newData);
      return newData;
    });
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
            locations: formData.location,
            message: formData.message,
            preferredLanguage: formData.preferredLanguage,
            source: 'Website - Contact Us Page',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', location: '', message: '', preferredLanguage: '' });
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
    <>
      <Navbar />
      <Treatmentnavbar />
      <div className="bg-white">
        {/* Top Gradient Section */}
        <div className="bg-gradient-to-r from-[#3a2f6e] to-[#864f85] pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">We're here to help 24/7</h1>
            <p className="mt-4 text-lg text-gray-200">
              Whether you have a question, need support, or want to book a consultation — we're here for you. Fill out the form below and our team will connect with you soon.
            </p>
          </div>
        </div>

        {/* Contact Card Section */}
        <div className="-mt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
            {/* Left Side: Contact Info */}
            <div className="w-full lg:w-1/3 bg-gradient-to-br from-[#3a2f6e] to-[#5e4f9b] p-8 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">Contact Information</h2>
                <p className="text-gray-300 mb-8">
                  We usually respond within 1 working day. For urgent queries, call us directly.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-center">
                    <Phone className="h-6 w-6 mr-4 flex-shrink-0" />
                    <span>+91 9363656010/ +91 8925928840</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-6 w-6 mr-4 flex-shrink-0" />
                    <span>contact@medagg.com</span>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-6 w-6 mr-4 flex-shrink-0" />
                    <span>Perungudi, Chennai</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-2/3 p-8 sm:p-12">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange}
                      placeholder="Your name" 
                      className="w-full border-2 border-gray-300 focus:border-[#ff3576] focus:ring-2 focus:ring-pink-200 outline-none py-2 px-3 rounded-lg transition-colors bg-white" 
                      autoComplete="name"
                      tabIndex="0"
                      style={{ pointerEvents: 'auto', userSelect: 'text' }}
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                      placeholder="Your Phone Number" 
                      className="w-full border-2 border-gray-300 focus:border-[#ff3576] focus:ring-2 focus:ring-pink-200 outline-none py-2 px-3 rounded-lg transition-colors bg-white" 
                      autoComplete="tel"
                      tabIndex="0"
                      style={{ pointerEvents: 'auto', userSelect: 'text' }}
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="Your Location" className="w-full border-2 border-gray-300 focus:border-[#ff3576] focus:ring-2 focus:ring-pink-200 outline-none py-2 px-3 rounded-lg transition-colors" autoComplete="off" />
                  </div>
                  <div>
                    <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                    <select id="preferredLanguage" name="preferredLanguage" value={formData.preferredLanguage} onChange={handleInputChange} className="w-full border-2 border-gray-300 focus:border-[#ff3576] focus:ring-2 focus:ring-pink-200 outline-none py-2 px-3 rounded-lg transition-colors bg-white">
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Kannada">Kannada</option>
                    </select>
                  </div>
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Type Message" rows="4" className="w-full border-2 border-gray-300 focus:border-[#ff3576] focus:ring-2 focus:ring-pink-200 outline-none py-2 px-3 rounded-lg transition-colors resize-none"></textarea>
                </div>
                <div>
                  <button type="submit" disabled={isSubmitting} className="bg-[#ff3576] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors disabled:bg-gray-400">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                {formStatus === 'success' && (
                  <p className='text-green-600 mt-4 font-semibold'>
                    Thank you for your message. We will get back to you shortly.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className='text-red-600 mt-4 font-semibold'>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
