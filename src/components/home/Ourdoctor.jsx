import React, { useState, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const doctors = [
  // Chennai Doctors
  {
    name: 'Dr. Arul Arokia',
    degrees: 'MBBS, MD, FENVIR',
    specialty: 'Interventional Radiologist',
    city: 'Chennai',
    image: '/Dr_Arul-removebg-preview.png',
  },
  {
    name: 'Dr. Deepashree',
    degrees: 'MBBS, MD, FENVIR',
    specialty: 'Interventional Radiologist',
    city: 'Chennai',
    image: '/Deepashree.png',
  },
  {
    name: 'Dr. S Kiran Kumar',
    degrees: 'MBBS, DNB (RD), FVIR, EBIR',
    specialty: 'Interventional Radiology',
    city: 'Chennai',
    image: '/Dr_S_Kiran-removebg-preview.png',
  },
  {
    name: 'Dr. Sankesh Mehta',
    degrees: 'MBBS, MD, FENVIR',
    specialty: 'Interventional Radiologist',
    city: 'Chennai',
    image: '/Dr_Sankesh_Mehta-removebg-preview.png',
  },
  {
    name: 'Dr. Pushparajan',
    degrees: 'MBBS, MD, FENVIR',
    specialty: 'Interventional Radiologist',
    city: 'Chennai',
    image: '/Dr Pushparajan.png',
  },
  {
    name: 'Dr. Praveen',
    degrees: 'MBBS, MD, FENVIR',
    specialty: 'Interventional Radiologist',
    city: 'Chennai',
    image: '/Dr preveen.png',
  },
  {
    name: 'Dr. Ravindran',
    degrees: 'MBBS, MD, FENVIR',
    specialty: 'Interventional Radiologist',
    city: 'Chennai',
    image: '/Dr Ravindran_chennai.png',
  },
  // Coimbatore Doctors
  {
    name: 'Dr. Muthurajan',
    degrees: 'MBBS, DMRD, DNB',
    specialty: 'Interventional Radiologist',
    city: 'Coimbatore',
    image: '/Dr. P Muthurajan.png',
  },

  // Bangalore Doctors
  {
    name: 'Dr. Rohit K Srinivas',
    degrees: 'MBBS, DMRD, DNB',
    specialty: 'Interventional Radiologist',
    city: 'Bangalore',
    image: '/Dr. Rohit K Srinivas.png',
  },
  {
    name: 'Dr. Rohit Madhukar',
    degrees: 'MBBS, MD, DNB (Radiodiagnosis)',
    specialty: 'Interventional Radiology',
    city: 'Bangalore',
    image: 'Dr Rohit new .png',
  },
  {
    name: 'Dr. Uthappa',
    degrees: 'MBBS, MD, DNB (Radiodiagnosis)',
    specialty: 'Interventional Radiology',
    city: 'Bangalore',
    image: 'Dr utthapa.png',
  },
  {
    name: 'Dr. Bhaskar M V',
    degrees: 'MBBS, MD, DNB (Radiodiagnosis)',
    specialty: 'Interventional Radiology',
    city: 'Bangalore',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Dr. Bhavya',
    degrees: 'MBBS, MD, DNB (Radiodiagnosis)',
    specialty: 'Interventional Radiology',
    city: 'Bangalore',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Dr. Junaid',
    degrees: 'MBBS, MD, DNB (Radiodiagnosis)',
    specialty: 'Interventional Radiology',
    city: 'Bangalore',
    image: 'https://via.placeholder.com/150',
  },

  // Madurai Doctors
  {
    name: 'Dr. Vinayagamani',
    degrees: 'MBBS, DMRD, DNB',
    specialty: 'Interventional Radiology',
    city: 'Madurai',
    image: '/Vinayagamani.png',
  },

  // Salem Doctors
  {
    name: 'Dr. Karthikeyan',
    degrees: 'MBBS, DMRD, DNB',
    specialty: 'Interventional Radiology',
    city: 'Salem',
    image: '/Karthikeyan.png',
  },

  // Hyderabad Doctors
  {
    name: 'Dr. Balaji Patel Kola',
    degrees: 'MBBS, DMRD, DNB',
    specialty: 'Interventional Radiology',
    city: 'Hyderabad',
    image: '/Dr. Balaji Patel Kola.png',
  },
  {
    name: 'Dr. Sailesh Kumar Garge',
    degrees: 'MBBS, DMRD, DNB',
    specialty: 'Interventional Radiology',
    city: 'Hyderabad',
    image: '/Sailesh Kumar Garge.png',
  },
  {
    name: 'Dr. Avinash Malla',
    degrees: 'MBBS, DMRD, DNB',
    specialty: 'Interventional Radiology',
    city: 'Hyderabad',
    image: '/Avinash Malla.png',
  },
  {
    name: 'Dr. Arjun Somi Reddy',
    degrees: 'MBBS, DMRD, DNB',
    specialty: 'Interventional Radiology',
    city: 'Hyderabad',
    image: '/Arjun Somi Reddy.png',
  },
  
  // Vijayawada Doctors
  {
    name: 'Dr. Bhavani Shankar',
    degrees: 'MBBS, DMRD, DNB',
    specialty: 'Interventional Radiology',
    city: 'Vijayawada',
    image: '/Bhavani shankar.png',
  },
  // Vizag Doctors
  {
    name: 'Dr. Anil Devara',
    degrees: 'MBBS, MD, FVIR',
    specialty: 'Interventional Radiology',
    city: 'Vizag',
    image: '/Anil Devara.png',
  },
  {
    name: 'Dr. Siba Shankar Dalai',
    degrees: 'MBBS, MD, FVIR',
    specialty: 'Interventional Radiology',
    city: 'Vizag',
    image: '/Siba shankar dalai.png',
  },
 

  // Delhi Doctors
  {
    name: 'Dr. Sahil Bansal',
    degrees: 'MBBS, MD, FVIR',
    specialty: 'Interventional Radiology',
    city: 'Delhi',
    image: '/Sahil Bansal.png',
  },
  // Kolkata Doctors
  {
    name: 'Dr. Partha Pratim Samui',
    degrees: 'MBBS, MD, DMRD',
    specialty: 'Interventional Radiologist',
    city: 'Kolkata',
    image: '/Dr. Partha.png',
  },
  // Ahmedabad Doctors
  {
    name: 'Dr. Raj Soni',
    degrees: 'MBBS, DNB, FVIR',
    specialty: 'Interventional Radiology',
    city: 'Ahmedabad',
    image: '/Raj Soni.png',
  },
   // Bhuvaneshwar Doctors
   {
    name: 'Dr. Setham Kumar',
    degrees: 'MBBS, DNB, FVIR',
    specialty: 'Interventional Radiology',
    city: 'Bhuvaneshwar',
    image: '/Dr. T Seetam.png',
  },
     // Goa Doctors
     {
      name: 'Dr. Charudatta sambhaji',
      degrees: 'MBBS, DNB, FVIR',
      specialty: 'Interventional Radiology',
      city: 'Goa',
      image: '/Charudatta sambhaji.png',
    },
     // Surat Doctors
     {
      name: 'Dr. Vivek Mavani',
      degrees: 'MBBS, DNB, FVIR',
      specialty: 'Interventional Radiology',
      city: 'Surat',
      image: '/vivek_new.png',
    },

    // Jaipur Doctors
    {
      name: 'Dr. Amol Nagvekar',
      degrees: 'MBBS, DNB, FVIR',
      specialty: 'Interventional Radiology',
      city: 'Jaipur',
      image: '/Dr Amol.jpeg',
    },

    // Calicut Doctors
    {
      name: 'Dr. Jithu Subhash Babu',
      degrees: 'MBBS, DNB, FVIR',
      specialty: 'Interventional Radiology',
      city: 'Calicut',
      image: '/Dr Jitu.png',
    },

     // Trivandrum Doctors
     {
      name: 'Dr. Manish Kumar Yadav',
      degrees: 'MBBS, DNB, FVIR',
      specialty: 'Interventional Radiology',
      city: 'Trivandrum',
      image: '/Dr. Manish Kumar Yadav.png',
    },
    {
      name: 'Dr. Praveen Kesav',
      degrees: 'MBBS, DNB, FVIR',
      specialty: 'Interventional Radiology',
      city: 'Trivandrum',
      image: '/Dr Praveen Kesav.png',
    },

    // Perinthlmanna Doctors
    {
      name: 'Dr. Thoufiq Ali',
      degrees: 'MBBS, DNB, FVIR',
      specialty: 'Interventional Radiology',
      city: 'Perinthalmanna',
      image: '/Dr. Thoufiq Ali.png',
    },

    
];

// Extract unique cities from doctors data
const cities = ['All', ...Array.from(new Set(doctors.map(doctor => doctor.city))).sort()];

// Fisher-Yates shuffle algorithm for randomizing doctors
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const OurDoctor = ({ randomize = false, initialShowCount = 4 }) => {
  const location = useLocation();
  const [filters, setFilters] = useState({ name: '', city: 'All' });
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const doctorList = useMemo(() => {
    if (randomize) {
      // Fully shuffle when randomize is requested
      return shuffleArray(doctors);
    }
    // Otherwise, vary the ordering per-page so the first N differ across routes
    // Create a small rotation offset from the pathname characters
    const offset = Array.from(location.pathname).reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % doctors.length;
    const rotated = [...doctors.slice(offset), ...doctors.slice(0, offset)];
    return rotated;
  }, [randomize, location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setShowAll(false);
  };

  const handleImageError = useCallback((imagePath) => {
    setImageErrors(prev => ({ ...prev, [imagePath]: true }));
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctorList.filter(doc => {
      const nameMatch = doc.name.toLowerCase().includes(filters.name.toLowerCase());
      const cityMatch = filters.city === 'All' || doc.city === filters.city;
      return nameMatch && cityMatch;
    });
  }, [doctorList, filters]);

  const doctorsToDisplay = showAll ? filteredDoctors : filteredDoctors.slice(0, initialShowCount);
  const hasMoreDoctors = filteredDoctors.length > initialShowCount;

  return (
    <section className='w-full bg-white'>
      <div className='max-w-6xl mx-auto px-4 py-6 lg:py-8'>
        <div className='text-center md:text-left'>
          <h2 className='text-3xl lg:text-4xl font-extrabold mb-2'>
            Our <span className='text-[#ff3576]'>Doctors</span>
          </h2>
          <p className='text-gray-500 mb-6 lg:mb-8 max-w-2xl text-sm lg:text-base mx-auto md:mx-0'>
            Our expert doctors provide personalized, non-surgical care with a patient-first approach, guiding you to safe and effective treatments.
          </p>
        </div>

        {/* Search/filter box */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4 lg:p-6 mb-6 lg:mb-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4'>
            <div>
              <label htmlFor='doctorName' className='block font-medium text-sm mb-1'>
                Doctor&apos;s Name
              </label>
              <input
                id='doctorName'
                type='text'
                name='name'
                value={filters.name}
                onChange={handleInputChange}
                placeholder='Search by name'
                className='w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-2 focus:ring-[#ff3576] outline-none'
                aria-label="Search by doctor's name"
              />
            </div>
            <div>
              <label htmlFor='locationSelect' className='block font-medium text-sm mb-1'>
                Location
              </label>
              <select
                id='locationSelect'
                name='city'
                value={filters.city}
                onChange={handleInputChange}
                className='w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-2 focus:ring-[#ff3576] outline-none'
                aria-label='Filter by location'
              >
                <option value='All'>All Cities</option>
                {cities.filter(city => city !== 'All').map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='text-sm text-gray-500 mb-4'>
            Showing {doctorsToDisplay.length} of {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
          </div>
        </div>

        {/* Doctor cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
          {doctorsToDisplay.length > 0 ? (
            doctorsToDisplay.map((doc) => (
              <div
                key={`${doc.name}-${doc.city}`}
                className='bg-gray-200 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center p-4 lg:p-6 hover:shadow-md transition-shadow'
              >
                {!imageErrors[doc.image] ? (
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className='w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-lg mb-3 lg:mb-4'
                    onError={() => handleImageError(doc.image)}
                    loading="lazy"
                  />
                ) : (
                  <div className='w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-[#ff3576] to-[#2d2552] rounded-lg mb-3 lg:mb-4 flex items-center justify-center'>
                    <div className='text-white font-bold text-xl lg:text-2xl'>
                      {doc.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  </div>
                )}
                <Link 
                  to="/contact-us"
                  className='w-full mb-3 lg:mb-4 py-2 border border-[#ff3576] rounded-md text-[#ff3576] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#ff3576] hover:text-white transition no-underline hover:no-underline focus:no-underline active:no-underline'
                >
                  <span className='text-lg'>→</span>
                  Book Appointment
                </Link>
                <div className='text-center'>
                  <div className='font-bold text-base lg:text-lg'>{doc.name}</div>
                  <div className='text-gray-700 text-xs lg:text-sm'>{doc.degrees}</div>
                  <div className='text-gray-500 text-xs'>{doc.specialty}</div>
                  <div className='text-gray-400 text-xs mt-1'>{doc.city}</div>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-full text-center py-8 text-gray-500'>
              <div className='text-lg mb-2'>No doctors found</div>
              <div className='text-sm'>Try adjusting your search criteria</div>
            </div>
          )}
        </div>

        {/* Show More / Show Less Button */}
        {hasMoreDoctors && (
          <div className='flex justify-center mt-8'>
            <button
              onClick={() => setShowAll(prev => !prev)}
              className='px-8 py-3 bg-[#ff3576] text-white font-semibold rounded-lg hover:bg-[#e1006a] transition-colors duration-300 shadow-md hover:shadow-lg'
            >
              {showAll ? 'Show Less' : `Show More (${filteredDoctors.length - initialShowCount} more)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurDoctor;
