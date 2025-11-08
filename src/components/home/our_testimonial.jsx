import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Hi I am suresh from old perungalathur I have Vericose wines problem last week just I call one phone Medagghelath care. He take care very well and suggest her tie up hospitals for our nearest and convience. His service are very good and trustable.",
    name: "Suresh Suresh prabha",
    location: "Salem",
    avatar: "/public/patient-avatar-1.jpg"
  },
  {
    id: 2,
    quote: "Good platform with best service.",
    name: "Abhina p das",
    location: "Chennai",
    avatar: "/public/patient-avatar-2.jpg"
  },
  {
    id: 3,
    quote: "Im feeling excited to share my feedback about Medagg health care team. Really their support and co ordination is professional & delightfu My sincere thanks to Mr. Jai kiran and Mr.Mark for his greatness and friendly behaviour.",
    name: "Ramesh Sankaranarayanan",
    location: "Thanjavur",
    avatar: "/public/patient-avatar-3.jpg"
  },
  {
    id: 4,
    quote: "User friendly app to choose the appropriate hospital sitting at home. It was very much useful for treating my fibroid problem.",
    name: "Kokila Yogesh Babu",
    location: "Chennai",
    avatar: "/public/patient-avatar-4.jpg"
  },
  {
    id: 5,
    quote: "Real professionals in offering advice about specialised doctors and hospitals.Appreciate their commitment to follow up even after advice.",
    name: "C R Prakash",
    location: "Chennai",
    avatar: "/public/patient-avatar-5.jpg"
  },
  {
    id: 6,
    quote: "Mark McLeod who is working with Medagg service is very excellent. He coordinated right from fixing doctor, hospital's per our convince and he was with us till we reach our home after my circumcision surgery. His company motto is very much service oriented with dedication and full filling 100% of our expectation. If there is any rating above 5 star I prefer that for MEDAGG.",
    name: "Durairaj",
    location: "Chennai",
    avatar: "/public/patient-avatar-6.jpg"
  }
  
];

const OurTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isPaused) return;

    const scrollSpeed = 1; // pixels per frame
    let animationFrameId;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset scroll position for infinite loop
        const maxScroll = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      setIsPaused(true);
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
      setTimeout(() => setIsPaused(false), 1000); // Resume after 1 second
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      setIsPaused(true);
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
      setTimeout(() => setIsPaused(false), 1000); // Resume after 1 second
    }
  };
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat flex items-center min-h-[542px]"
      style={{
        backgroundImage: `url('/book and appoinment background.jpg')`,
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#2d2552] bg-opacity-30"></div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header section using flexbox */}
        <div className="flex flex-col items-start text-left mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our Patients Says
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
            Real stories from real patients — see how Medagg's care made a real difference.
          </p>
        </div>

        {/* Navigation arrows and testimonials container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#2d2552] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#2d2552] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonials horizontal scroll container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide px-12 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`}
                className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 relative flex-shrink-0 w-64 min-h-64 flex flex-col"
              >
              {/* Quote icon */}
              <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#ff3576] rounded-full flex items-center justify-center z-10">
                <svg 
                  className="w-3 h-3 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

              {/* Testimonial content */}
              <div className="flex-1 mb-3">
                {/* Google logo */}
                <div className="flex items-center mb-2">
                  <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">Google Review</span>
                </div>
                <p className="text-gray-700 text-xs leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>

              {/* Patient info using flexbox */}
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center overflow-hidden">
                  <div className="w-7 h-7 bg-[#ff3576] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-semibold text-gray-900 text-xs">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-[10px]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTestimonial;