import React, { useState } from 'react';

const ThinkYouMightNeedUAE = () => {
  const [formData, setFormData] = useState({
    healthConcern: '',
    city: '',
    fullName: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50 flex items-center justify-center">
      <div
        className="relative bg-cover bg-center rounded-[20px] overflow-hidden shadow-2xl max-w-6xl mx-auto"
        style={{
          backgroundImage: "url('/book and appoinment background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#2d2552] opacity-10"></div>
        <div className="relative w-full h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full p-12">
            {/* Left Side: Text Content */}
            <div className="text-white text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
                Think You Might Need <br />
                <span className="text-[#ff3576]">Fibroid Treatment?</span>
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-gray-200">
                Non-surgical, uterus-preserving solution available now
              </p>
              <button 
                className="mt-8 bg-[#ff3576] text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Book Appointment
              </button>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-[#2D2552] mb-4 text-center">Get Expert Consultation</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  name="healthConcern"
                  value={formData.healthConcern}
                  onChange={handleChange}
                  placeholder="Describe Your Health Concern"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition duration-300"
                ></textarea>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition duration-300"
                />
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition duration-300"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff3576] transition duration-300"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#ff3576] text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Speak To Experts
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkYouMightNeedUAE;
