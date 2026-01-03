import { motion, animate } from "framer-motion";
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useRef(false);

  const numericValue = parseInt(String(value).replace(/[^0-9]/g, ""), 10);
  const suffix = String(value).replace(/[0-9]/g, "");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true; // Animate only once
          animate(0, numericValue, {
            duration: 2,
            onUpdate(latest) {
              element.textContent = Math.round(latest);
            },
          });
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [numericValue]);

  return (
    <>
      <span ref={ref}>0</span>
      {suffix}
    </>
  );
}

function CTAContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    city: '',
    preferredLanguage: '',
    designation: '',
    company: '',
    message: '',
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
            preferredLanguage: formData.preferredLanguage,
            designation: formData.designation,
            company: formData.company,
            specialization: formData.message, // Map message to specialization
            source: 'Website - Join With Us CTA',
          },
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', email: '', experience: '', city: '', preferredLanguage: '', designation: '', company: '', message: '' });
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
      id="join-with-us-section"
      className="py-24 px-6 lg:px-12 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2B3445 0%, #1a1f2e 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(233, 41, 106, 0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(233, 41, 106, 0.1) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full" style={{ background: "rgba(233, 41, 106, 0.2)" }}>
                <span style={{ color: "#FCE8F0" }}>Join the Ecosystem</span>
              </div>

              <h2 className="text-4xl lg:text-5xl text-white leading-tight">
                Be part of the IR ecosystem shaping the future of non-surgical care.
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                Connect with us to explore partnership opportunities and become part of India's leading interventional radiology network.
              </p>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl">
            <p className='text-lg font-medium text-gray-800 mb-6'>Share your details and we will reach out to you with the next Steps</p>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <input type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder='Your Name*' className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 caret-slate-900 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500' required />
                <input type='tel' name='phone' value={formData.phone} onChange={handleInputChange} placeholder='Your Mobile No*' className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 caret-slate-900 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500' required />
                <input type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Email ID*' className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 caret-slate-900 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500' required />
                <input type='text' name='city' value={formData.city} onChange={handleInputChange} placeholder='Select City*' className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 caret-slate-900 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500' required />
                <input type='text' name='experience' value={formData.experience} onChange={handleInputChange} placeholder='Experience (Years)*' className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 caret-slate-900 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500' required />
                <input type='text' name='designation' value={formData.designation} onChange={handleInputChange} placeholder='Designation' className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 caret-slate-900 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500' />
                <input type='text' name='company' value={formData.company} onChange={handleInputChange} placeholder='Company Name' className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 caret-slate-900 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500' />
                <select name='preferredLanguage' value={formData.preferredLanguage} onChange={handleInputChange} className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 caret-slate-900 focus:ring-pink-500 focus:border-pink-500'>
                  <option value='' disabled className="text-slate-500">Preferred Language</option>
                  <option value='English' className="bg-white text-slate-900">English</option>
                  <option value='Hindi' className="bg-white text-slate-900">Hindi</option>
                  <option value='Tamil' className="bg-white text-slate-900">Tamil</option>
                  <option value='Telugu' className="bg-white text-slate-900">Telugu</option>
                  <option value='Kannada' className="bg-white text-slate-900">Kannada</option>
                  <option value='Malayalam' className="bg-white text-slate-900">Malayalam</option>
                  <option value='Bengali' className="bg-white text-slate-900">Bengali</option>
                  <option value='Marathi' className="bg-white text-slate-900">Marathi</option>
                  <option value='Gujarati' className="bg-white text-slate-900">Gujarati</option>
                  <option value='Punjabi' className="bg-white text-slate-900">Punjabi</option>
                  <option value='Urdu' className="bg-white text-slate-900">Urdu</option>
                </select>
              </div>
              <textarea name='message' value={formData.message} onChange={handleInputChange} placeholder='Your Message' rows='4' className='w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md text-slate-900 caret-slate-900 placeholder:text-slate-500 focus:ring-pink-500 focus:border-pink-500'></textarea>
              <div>
                <button type='submit' disabled={isSubmitting} className='w-full sm:w-auto rounded-md bg-pink-600 px-10 py-3 text-base font-semibold text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:bg-gray-400 transition-colors'>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              {formStatus === 'success' && (
                <p className='text-green-400 font-semibold'>
                  Thank you for your submission. We will be in touch shortly.
                </p>
              )}
              {formStatus === 'error' && (
                <p className='text-red-400 font-semibold'>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { label: "Healthcare Professionals", value: "500+" },
    { label: "Partner Hospitals", value: "100+" },
    { label: "Procedures Enabled", value: "10K+" },
    { label: "Cities Covered", value: "25+" }
  ];

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: "#E9296A" }}>
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function FinalCTA() {
  return (
    <section>
      <CTAContent />
      <StatsBar />
    </section>
  );
}