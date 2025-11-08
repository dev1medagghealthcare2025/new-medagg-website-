import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, IndianRupee, MessageCircle, Phone } from 'lucide-react';

const statsData = [
  {
    icon: Heart,
    value: 2500,
    suffix: '+',
    label: 'Patients Helped',
  },
  {
    icon: Calendar,
    value: 5000,
    suffix: '+',
    label: 'Consultations Booked',
  },
  {
    icon: IndianRupee,
    value: 50000,
    prefix: '₹',
    label: 'Average Patient Savings',
  },
];

// Custom hook for animated counter
const useAnimatedCounter = (targetValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Set up interval to restart animation every 15 seconds when visible
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 15000);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(targetValue * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Reset count to 0 and start animation
    setCount(0);
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, targetValue, duration, animationKey]);

  return { count, elementRef };
};

// Counter component
const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const { count, elementRef } = useAnimatedCounter(value);
  
  return (
    <span ref={elementRef}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default function Trusted_by_Patients_Across_India() {
  const openChatbot = () => {
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      const chatbotButton = document.querySelector('[aria-label="Open chat"]');
      if (chatbotButton) {
        chatbotButton.click();
      }
    }, 100);
  };

  return (
    <section className='w-full py-16 lg:py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center sm:text-left mb-12'>
          <h2 className='text-4xl lg:text-5xl font-extrabold text-[#2D2552] mb-4'>
            Trusted by Patients <span className='text-pink-500'>Across India</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto sm:mx-0'>
            Join thousands of patients who have found better healthcare solutions through Medagg.
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 lg:mb-20'>
          {statsData.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className='bg-white rounded-xl p-8 text-center shadow-md border border-gray-100'>
                <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5'>
                  <IconComponent className='w-8 h-8 text-gray-500' />
                </div>
                <h3 className='text-3xl font-bold text-[#2D2552] mb-2'>
                  <AnimatedCounter 
                    value={stat.value} 
                    prefix={stat.prefix || ''} 
                    suffix={stat.suffix || ''} 
                  />
                </h3>
                <p className='text-gray-500'>{stat.label}</p>
              </div>
            );
          })}
        </div>

       

        {/* CTA Section */}
        <div
          className='relative rounded-2xl overflow-hidden p-12 text-center bg-cover bg-center'
          style={{
            backgroundImage: 'linear-gradient(rgba(45, 37, 82, 0.1), rgba(45, 37, 82, 0.15)), url("/book and appoinment background.jpg")',
          }}
        >
          <div className='relative z-10 flex flex-col items-start'>
            <h2 className='text-4xl font-extrabold text-white mb-4 text-left'>
              Ready To Explore Non-Surgical Options?
            </h2>
            <p className='text-lg text-white/80 max-w-3xl mb-8 text-left'>
              Discover safer, faster, and effective treatments — no scars, no stitches, and same-day recovery.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <button 
                onClick={openChatbot}
                className='bg-pink-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors shadow-lg'
              >
                <MessageCircle className='w-5 h-5' />
                <span>Talk With Medagg</span>
              </button>
              <button className='bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-colors shadow-lg'>
                <Phone className='w-5 h-5' />
                <span>+91 9363656010</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}