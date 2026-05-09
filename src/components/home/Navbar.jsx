import React, { useEffect, useRef, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { MapPin, Menu, Search, X, ChevronDown, PhoneCall } from 'lucide-react';

import { filterTreatments, treatmentCategories } from './searchTreatments';
 
import {

  DEFAULT_CITIES,

  detectLocation,

  findClosestCity,

  getSavedLocation,

  saveLocation,

} from './locationUtils';



// Popular cities shown at top with lightning icons (matching reference image)

const POPULAR_CITIES = [

  'Bangalore',

  'Chennai',

  'Delhi',

  'Gurgaon',

  'Hyderabad',

  'Kolkata',

  'Lucknow',

  'Mumbai',

  'Pune',

];



// All remaining cities in Other Cities section (13 cities)

const OTHER_CITIES = DEFAULT_CITIES.filter(

  (city) => !POPULAR_CITIES.includes(city)

);


const MOBILE_CITY_GROUPS = [

  { title: 'TAMIL NADU', cities: ['Chennai', 'Coimbatore', 'Madurai'] },

  { title: 'KERALA', cities: ['Calicut', 'Kochi', 'Kollam', 'Trivandrum'] },

  { title: 'KARNATAKA', cities: ['Bangalore', 'Mangalore'] },

  { title: 'TELANGANA', cities: ['Hyderabad'] },

  { title: 'ANDHRA PRADESH', cities: ['Vijayawada', 'Vizag'] },

  { title: 'MAHARASHTRA', cities: ['Mumbai', 'Pune'] },

  { title: 'GUJARAT', cities: ['Ahmedabad', 'Surat'] },

  { title: 'DELHI', cities: ['Delhi'] },

  { title: 'WEST BENGAL', cities: ['Kolkata'] },

  { title: 'UTTAR PRADESH', cities: ['Agra', 'Greater Noida', 'Lucknow', 'Noida'] },

  { title: 'ODISHA', cities: ['Bhubaneswar'] },

  { title: 'GOA', cities: ['Goa'] },

  { title: 'HARYANA', cities: ['Gurgaon'] },

  { title: 'RAJASTHAN', cities: ['Jaipur'] },

];


export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchInputRef = useRef(null);

  const suggestionsRef = useRef(null);

  const navigate = useNavigate();



  // Location state

  const [userLocation, setUserLocation] = useState(null);

  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const cityDropdownRef = useRef(null);



  const [mobileView, setMobileView] = useState('main');



  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);



  const closeMobileMenu = () => {

    setIsMenuOpen(false);

    setMobileView('main');

    setShowSuggestions(false);

  };



  // Auto-detect location on mount

  useEffect(() => {

    const initLocation = async () => {

      // First check if user has a saved location

      const saved = getSavedLocation();

      if (saved?.city) {

        setUserLocation(saved);

        return;

      }



      // Auto-detect location

      setIsDetectingLocation(true);

      try {

        const detected = await detectLocation();

        if (detected?.city) {

          // Find closest matching city from our serviceable list

          const closestCity = findClosestCity(detected.city);

          const locationData = {

            ...detected,

            city: closestCity || detected.city,

            isServiceable: !!closestCity,

          };

          setUserLocation(locationData);

          saveLocation(locationData);

        }

      } catch (error) {

        console.log('Location detection failed:', error);

      } finally {

        setIsDetectingLocation(false);

      }

    };



    initLocation();

  }, []);



  // Handle city selection from dropdown

  const handleCitySelect = (city) => {

    const locationData = { city, method: 'manual', isServiceable: true };

    setUserLocation(locationData);

    saveLocation(locationData);

    setShowCityDropdown(false);

    setMobileView('main');

  };



  // Manual GPS detection for accuracy

  const handleDetectMyLocation = async () => {

    if (!navigator.geolocation) {

      alert('Geolocation is not supported by your browser');

      return;

    }



    setIsDetectingLocation(true);

    try {

      const position = await new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(resolve, reject, {

          timeout: 15000,

          enableHighAccuracy: true,

        });

      });



      // Reverse geocode using OpenStreetMap

      const { latitude, longitude } = position.coords;

      const response = await fetch(

        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,

        { headers: { 'Accept-Language': 'en' } }

      );



      if (!response.ok) throw new Error('Geocoding failed');



      const data = await response.json();

      const detectedCity =

        data.address?.city ||

        data.address?.town ||

        data.address?.district ||

        data.address?.county;



      if (detectedCity) {

        const closestCity = findClosestCity(detectedCity);

        const locationData = {

          city: closestCity || detectedCity,

          latitude,

          longitude,

          method: 'browser',

          isServiceable: !!closestCity,

        };

        setUserLocation(locationData);

        saveLocation(locationData);

        setShowCityDropdown(false);

      } else {

        alert('Could not detect your city. Please select manually.');

      }

    } catch (error) {

      console.log('GPS detection failed:', error);

      if (error.code === 1) {

        alert('Please allow location permission to detect your city.');

      } else {

        alert('Could not detect location. Please select your city manually.');

      }

    } finally {

      setIsDetectingLocation(false);

    }

  };



  // Toggle city dropdown

  const toggleCityDropdown = () => {

    setShowCityDropdown(!showCityDropdown);

  };



  // Close city dropdown when clicking outside

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (

        cityDropdownRef.current &&

        !cityDropdownRef.current.contains(e.target)

      ) {

        setShowCityDropdown(false);

      }

    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, []);



  // Handle search input changes - now returns grouped by category

  const handleSearchChange = (e) => {

    const value = e.target.value;

    setSearchQuery(value);

    const filtered = filterTreatments(value);

    setSuggestions(filtered);

    setShowSuggestions(value.trim().length > 0 && filtered.length > 0 && filtered.some((g) => g.items.length > 0));

  };



  // Handle search button click - show suggestions if not visible

  const handleSearchClick = () => {

    const filtered = filterTreatments(searchQuery);

    setSuggestions(filtered);

    setShowSuggestions(filtered.length > 0 && filtered.some((g) => g.items.length > 0));

    if (searchInputRef.current) {

      searchInputRef.current.focus();

    }

  };



  // Navigate to treatment on suggestion click

  const handleSuggestionClick = (path) => {

    const selectedCity = (userLocation && userLocation.city) ? String(userLocation.city).toLowerCase() : '';

    let targetPath = path;



    // City-specific static SEO pages (Chennai, Madurai, Coimbatore)

    const cityOverrides = {

      'chennai': {

        '/varicocele-embolization': '/varicocele-embolization-chennai',

        '/prostate-artery-embolization-pae': '/prostate-artery-embolization-pae-chennai',

        '/genicular-artery-embolization-gae': '/genicular-artery-embolization-gae-chennai',

        '/thyroid-nodule-ablation': '/thyroid-nodule-ablation-chennai',

        '/fallopian-tube-recanalization-ftr': '/fallopian-tube-recanalization-ftr-chennai',
        '/uterine-artery-embolization-uae': '/uterine-artery-embolization-uae-chennai',
        '/varicose-vein': '/varicose-vein-chennai',
        '/plantar-fascial-embolization': '/plantar-fascial-embolization-chennai',
        '/diabetic-foot': '/diabetic-foot-chennai',
        '/frozen-shoulder': '/frozen-shoulder-chennai',
        '/transcatheter-aortic-valve-replacement': '/transcatheter-aortic-valve-replacement-chennai',
        '/cto': '/cto-chennai',
        '/piles-hemorrhoids': '/piles-hemorrhoids-chennai',
        '/y90-radioembolization-tare': '/y90-radioembolization-tare-chennai',
        '/transarterial-chemoembolization-tace': '/transarterial-chemoembolization-tace-chennai',
        '/endovascular-coiling': '/endovascular-coiling-chennai',
        '/breast-nodule-vae': '/breast-nodule-vae-chennai',
        '/pelvic-vein-embolization': '/pelvic-vein-embolization-chennai',

      },

      'bangalore': {
        '/prostate-artery-embolization-pae': '/prostate-artery-embolization-pae-bangalore',
        '/genicular-artery-embolization-gae': '/genicular-artery-embolization-gae-bangalore',
        '/thyroid-nodule-ablation': '/thyroid-nodule-ablation-bangalore',
        '/varicocele-embolization': '/varicocele-embolization-bangalore',
        '/fallopian-tube-recanalization-ftr': '/fallopian-tube-recanalization-ftr-bangalore',
      },

      'mangalore': {
        '/prostate-artery-embolization-pae': '/prostate-artery-embolization-pae-mangalore',
        '/genicular-artery-embolization-gae': '/genicular-artery-embolization-gae-mangalore',
        '/thyroid-nodule-ablation': '/thyroid-nodule-ablation-mangalore',
        '/varicocele-embolization': '/varicocele-embolization-mangalore',
        '/fallopian-tube-recanalization-ftr': '/fallopian-tube-recanalization-ftr-mangalore',
      },

      'madurai': {

        '/varicocele-embolization': '/varicocele-embolization-madurai',

        '/prostate-artery-embolization-pae': '/prostate-artery-embolization-pae-madurai',

        '/genicular-artery-embolization-gae': '/genicular-artery-embolization-gae-madurai',

        '/thyroid-nodule-ablation': '/thyroid-nodule-ablation-madurai',

        '/fallopian-tube-recanalization-ftr': '/fallopian-tube-recanalization-ftr-madurai',
        '/uterine-artery-embolization-uae': '/uterine-artery-embolization-uae-madurai',
        '/varicose-vein': '/varicose-vein-madurai',
        '/plantar-fascial-embolization': '/plantar-fascial-embolization-madurai',
        '/diabetic-foot': '/diabetic-foot-madurai',
        '/frozen-shoulder': '/frozen-shoulder-madurai',
        '/transcatheter-aortic-valve-replacement': '/transcatheter-aortic-valve-replacement-madurai',
        '/cto': '/cto-madurai',
        '/piles-hemorrhoids': '/piles-hemorrhoids-madurai',
        '/y90-radioembolization-tare': '/y90-radioembolization-tare-madurai',
        '/transarterial-chemoembolization-tace': '/transarterial-chemoembolization-tace-madurai',
        '/endovascular-coiling': '/endovascular-coiling-madurai',
        '/breast-nodule-vae': '/breast-nodule-vae-madurai',
        '/pelvic-vein-embolization': '/pelvic-vein-embolization-madurai',

      },

      'coimbatore': {

        '/varicocele-embolization': '/varicocele-embolization-coimbatore',

        '/prostate-artery-embolization-pae': '/prostate-artery-embolization-pae-coimbatore',

        '/genicular-artery-embolization-gae': '/genicular-artery-embolization-gae-coimbatore',

        '/thyroid-nodule-ablation': '/thyroid-nodule-ablation-coimbatore',

        '/fallopian-tube-recanalization-ftr': '/fallopian-tube-recanalization-ftr-coimbatore',
        '/uterine-artery-embolization-uae': '/uterine-artery-embolization-uae-coimbatore',
        '/varicose-vein': '/varicose-vein-coimbatore',
        '/plantar-fascial-embolization': '/plantar-fascial-embolization-coimbatore',
        '/diabetic-foot': '/diabetic-foot-coimbatore',
        '/frozen-shoulder': '/frozen-shoulder-coimbatore',
        '/transcatheter-aortic-valve-replacement': '/transcatheter-aortic-valve-replacement-coimbatore',
        '/cto': '/cto-coimbatore',
        '/piles-hemorrhoids': '/piles-hemorrhoids-coimbatore',
        '/y90-radioembolization-tare': '/y90-radioembolization-tare-coimbatore',
        '/transarterial-chemoembolization-tace': '/transarterial-chemoembolization-tace-coimbatore',
        '/endovascular-coiling': '/endovascular-coiling-coimbatore',
        '/breast-nodule-vae': '/breast-nodule-vae-coimbatore',
        '/pelvic-vein-embolization': '/pelvic-vein-embolization-coimbatore',

      },

    };

    if (cityOverrides[selectedCity] && cityOverrides[selectedCity][path]) {

      targetPath = cityOverrides[selectedCity][path];

    }



    setShowSuggestions(false);

    setSearchQuery('');

    navigate(targetPath);

    setIsMenuOpen(false);

    setMobileView('main');

  };



  // Close suggestions when clicking outside

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (

        suggestionsRef.current &&

        !suggestionsRef.current.contains(e.target) &&

        searchInputRef.current &&

        !searchInputRef.current.contains(e.target)

      ) {

        setShowSuggestions(false);

      }

    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, []);



  // Keyboard navigation

  const handleKeyDown = (e) => {

    if (e.key === 'Escape') {

      setShowSuggestions(false);

    }

  };



  // Lock body scroll when mobile menu is open

  useEffect(() => {

    if (isMenuOpen) {

      document.body.classList.add('overflow-hidden');

    } else {

      document.body.classList.remove('overflow-hidden');

    }

    return () => document.body.classList.remove('overflow-hidden');

  }, [isMenuOpen]);



  return (

    <nav className='w-full bg-white lg:bg-[#392C5C] sticky top-0 z-50'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0'>

        <div className='flex items-center justify-between h-[64px] lg:h-[78px] gap-4'>

          {/* Desktop Left: Location + Search */}

          <div className='hidden lg:flex items-center gap-3 flex-1 min-w-0 relative'>

            <div className='flex items-center h-12 rounded-2xl border border-[#392C5C]/15 bg-white w-full max-w-[720px] shadow-[0_1px_0_rgba(0,0,0,0.02)] relative'>

              {/* Location Button with Dropdown */}

              <div className='relative h-full'>

                <button

                  type='button'

                  onClick={toggleCityDropdown}

                  className='inline-flex items-center gap-2 h-full px-4 text-[#392C5C] font-semibold whitespace-nowrap hover:bg-gray-50 transition-colors rounded-l-2xl'

                >

                  {userLocation?.city ? (

                    <MapPin size={18} className={`${isDetectingLocation ? 'animate-pulse' : ''} text-pink-500`} />

                  ) : (

                    <svg className='w-[18px] h-[18px] text-orange-500 animate-pulse' viewBox='0 0 24 24' fill='currentColor'>

                      <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />

                    </svg>

                  )}

                  <span className='max-w-[100px] truncate'>

                    {isDetectingLocation

                      ? 'Detecting...'

                      : userLocation?.city || 'Select City'}

                  </span>

                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />

                </button>



                {/* City Dropdown - Outside overflow container */}

                {showCityDropdown && (

                  <div

                    ref={cityDropdownRef}

                    onClick={(e) => e.stopPropagation()}

                    className='absolute top-[calc(100%+8px)] left-0 w-[360px] bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] max-h-[500px] overflow-y-auto'

                  >

                    {/* Header with detect button */}

                    <div className='p-4 border-b border-gray-100 flex items-center justify-between'>

                      <span className='text-sm font-semibold text-[#392C5C]'>Select Your City</span>

                      <button

                        type='button'

                        onClick={handleDetectMyLocation}

                        disabled={isDetectingLocation}

                        className='text-xs text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1 disabled:opacity-50'

                      >

                        {isDetectingLocation ? (

                          <>

                            <span className='w-3 h-3 border-2 border-pink-500 border-t-transparent rounded-full animate-spin'></span>

                            Detecting...

                          </>

                        ) : (

                          <>

                            <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor'>

                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />

                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />

                            </svg>

                            Detect my location

                          </>

                        )}

                      </button>

                    </div>



                    <div className='p-4'>

                      {/* Popular Cities - Grid Layout */}

                      <div className='mb-4'>

                        <h3 className='text-xs font-bold text-gray-500 uppercase tracking-wide mb-3'>Popular Cities</h3>

                        <div className='grid grid-cols-2 gap-2'>

                          {POPULAR_CITIES.map((city) => (

                            <button

                              key={city}

                              type='button'

                              onClick={() => handleCitySelect(city)}

                              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${

                                userLocation?.city === city

                                  ? 'bg-pink-50 text-pink-600 border border-pink-200'

                                  : 'bg-blue-50/50 text-blue-600 hover:bg-blue-50 border border-transparent'

                              }`}

                            >

                              <svg className='w-4 h-4 text-orange-500' fill='currentColor' viewBox='0 0 20 20'>

                                <path fillRule='evenodd' d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z' clipRule='evenodd' />

                              </svg>

                              <span className={userLocation?.city === city ? 'text-pink-600' : 'text-blue-700'}>

                                {city}

                              </span>

                            </button>

                          ))}

                        </div>

                      </div>



                      {/* Other Cities - List Layout */}

                      <div>

                        <h3 className='text-xs font-bold text-gray-500 uppercase tracking-wide mb-3'>Other Cities</h3>

                        <div className='grid grid-cols-2 gap-2'>

                          {OTHER_CITIES.map((city) => (

                            <button

                              key={city}

                              type='button'

                              onClick={() => handleCitySelect(city)}

                              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all ${

                                userLocation?.city === city

                                  ? 'bg-pink-50 text-pink-600 font-medium border border-pink-200'

                                  : 'text-gray-600 hover:bg-gray-50'

                              }`}

                            >

                              {userLocation?.city === city && (

                                <span className='w-2 h-2 rounded-full bg-pink-500 shrink-0'></span>

                              )}

                              <span>{city}</span>

                            </button>

                          ))}

                        </div>

                      </div>

                    </div>



                    {/* Footer with detection method */}

                    <div className='p-3 border-t border-gray-100 bg-gray-50/80 rounded-b-xl flex items-center justify-between'>

                      <span className='text-xs text-gray-500'>

                        {userLocation?.method === 'ip' && '⚠ IP detection (may be inaccurate)'}

                        {userLocation?.method === 'browser' && '✓ GPS detected'}

                        {userLocation?.method === 'manual' && userLocation?.city && `✓ ${userLocation.city} selected`}

                      </span>

                      {userLocation?.method === 'ip' && (

                        <button

                          type='button'

                          onClick={handleDetectMyLocation}

                          className='text-xs text-pink-600 hover:underline'

                        >

                          Use GPS instead

                        </button>

                      )}

                    </div>

                  </div>

                )}

              </div>



              <div className='h-full w-px bg-[#392C5C]/15 shrink-0' />



              <input

                ref={searchInputRef}

                value={searchQuery}

                onChange={handleSearchChange}

                onKeyDown={handleKeyDown}

                placeholder='Search disease'

                className='h-full px-5 text-[15px] text-[#392C5C] placeholder:text-[#392C5C]/45 outline-none w-full'

              />



              {/* Search Suggestions Dropdown - Grouped by Category */}

              {showSuggestions && (

                <div

                  ref={suggestionsRef}

                  className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[480px] overflow-y-auto'

                >

                  {suggestions.length === 0 || !suggestions.some((g) => g.items.length > 0) ? (

                    <div className='px-6 py-4 text-sm text-gray-500'>No treatments found</div>

                  ) : (

                    <div className='p-4'>

                      {suggestions.map((group, groupIdx) => (

                        <div key={groupIdx} className='mb-4 last:mb-0'>

                          <div className='flex items-center gap-2 mb-2 px-2'>

                            <span className='text-[11px] font-bold text-pink-600 uppercase tracking-wide'>

                              {group.category}

                            </span>

                            <div className='flex-1 h-px bg-gray-100' />

                          </div>

                          <ul className='space-y-1'>

                            {group.items.map((item, idx) => (

                              <li key={idx}>

                                <button

                                  type='button'

                                  onClick={() => handleSuggestionClick(item.path)}

                                  className='w-full text-left px-3 py-2.5 text-sm text-[#392C5C] hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-lg flex items-center gap-3'

                                >

                                  <span className='w-9 h-9 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-[#392C5C] shrink-0 shadow-sm'>

                                    {item.title.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}

                                  </span>

                                  <span className='font-medium'>{item.title}</span>

                                </button>

                              </li>

                            ))}

                          </ul>

                        </div>

                      ))}

                    </div>

                  )}

                  <div className='px-4 py-2 border-t border-gray-100 bg-gray-50/80 rounded-b-xl flex items-center justify-between'>

                    <span className='text-xs text-gray-400'>{suggestions.reduce((acc, g) => acc + g.items.length, 0)} results found</span>

                    <span className='text-xs text-gray-400'>Press ESC to close</span>

                  </div>

                </div>

              )}



              <button

                type='button'

                onClick={handleSearchClick}

                className='h-full px-6 bg-pink-500 text-white font-semibold inline-flex items-center gap-2 hover:bg-pink-600 transition-colors rounded-r-2xl'

                aria-label='Search'

              >

                <Search size={18} />

                <span>Search</span>

              </button>

            </div>

          </div>



          {/* Desktop Right: Phone + CTAs + ISVIR */}

          <div className='hidden lg:flex items-center gap-3 shrink-0 whitespace-nowrap'>

            <a

              href='tel:+919363656010'

              className='flex items-center gap-2 text-white font-semibold hover:opacity-90 transition-opacity h-10'

            >

              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-pink-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>

                <path strokeLinecap='round' strokeLinejoin='round' d='M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.7.7a16.001 16.001 0 006.36 6.36l.7-.7a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C7.82 21 3 16.18 3 10V5z' />

              </svg>

              <span className='text-sm xl:text-base leading-none'>+91 93636 56010</span>

            </a>



            <Link

              to='/join-with-us'

              className='hover-stable inline-flex h-10 px-4 rounded-md border border-pink-500 text-white font-medium hover:bg-pink-500/15 transition-colors items-center justify-center whitespace-nowrap'

            >

              Partner With Us

            </Link>

            <Link

              to='/investor'

              className='hover-stable inline-flex h-10 px-4 rounded-md border border-pink-500 text-white font-medium hover:bg-pink-500/15 transition-colors items-center justify-center whitespace-nowrap'

            >

              Become a Investor

            </Link>



            <div className='flex items-center h-10 pl-3 border-l border-white/15'>

              <img

                src='/New_ISVIR_LOGO.png'

                alt='ISVIR logo'

                className='h-9 w-auto'

              />

              <div className='ml-2 leading-tight'>

                <div className='text-white/80 text-[11px]'>

                  Corporate Member of ISVIR

                  <br />

                  Interventional Radiology

                </div>

              </div>

            </div>

          </div>



          <div className='lg:hidden w-full bg-white -mx-4 px-4 h-[64px] grid grid-cols-3 items-center'>

            <div className='flex items-center justify-start'>

              <button

                onClick={toggleMenu}

                className='text-[#392C5C] hover:text-pink-500 transition-colors p-2'

                aria-label='Toggle menu'

                aria-expanded={isMenuOpen}

                aria-controls='mobile-menu'

              >

                <Menu size={22} />

              </button>

            </div>

            <div className='flex items-center justify-center'>

              <Link to='/' className='flex items-center justify-center' onClick={closeMobileMenu}>

                <img

                  src='/new_part2.png'

                  alt='Medagg Healthcare'

                  className='h-16 w-auto max-w-[340px] object-contain scale-[1.06] origin-center'

                  loading='eager'

                  decoding='async'

                />

              </Link>

            </div>

            <div className='flex items-center justify-end'>

              <a

                href='tel:+919363656010'

                className='h-10 w-10 rounded-full bg-[#392C5C] text-white shadow-sm flex items-center justify-center hover:bg-pink-500 transition-colors'

                aria-label='Call'

              >

                <PhoneCall size={18} />

              </a>

            </div>

          </div>

        </div>



        {isMenuOpen && (

          <>

            <div

              className='fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 lg:hidden'

              onClick={closeMobileMenu}

            />

            <div id='mobile-menu' className='lg:hidden fixed inset-0 z-50'>

              <div className='h-full bg-[#392C5C] text-white overflow-y-auto'>

                <div className='h-[64px] bg-white text-[#392C5C] px-4 grid grid-cols-3 items-center'>

                  <div className='flex items-center justify-start'>

                    {mobileView === 'main' ? (

                      <button type='button' onClick={closeMobileMenu} className='p-2' aria-label='Close menu'>

                        <X size={22} />

                      </button>

                    ) : (

                      <button type='button' onClick={() => setMobileView('main')} className='p-2 text-pink-600 font-medium' aria-label='Back'>

                        <span className='text-sm'>Back</span>

                      </button>

                    )}

                  </div>

                  <div className='flex items-center justify-center'>

                    <img src='/new_part2.png' alt='Medagg Healthcare' className='h-16 w-auto max-w-[340px] object-contain scale-[1.06] origin-center' />

                  </div>

                  <div className='flex items-center justify-end'>

                    <a

                      href='tel:+919363656010'

                      className='h-10 w-10 rounded-full bg-[#392C5C] text-white shadow-sm flex items-center justify-center hover:bg-pink-500 transition-colors'

                      aria-label='Call'

                    >

                      <PhoneCall size={18} />

                    </a>

                  </div>

                </div>

                {mobileView === 'main' && (

                  <div className='px-4 pt-5 pb-8'>

                    <div className='flex items-center h-12 rounded-2xl border border-white/10 bg-white w-full shadow-sm'>

                      <button

                        type='button'

                        onClick={() => setMobileView('cities')}

                        className='inline-flex items-center gap-2 h-full px-4 text-[#392C5C] font-semibold whitespace-nowrap rounded-l-2xl'

                      >

                        <MapPin size={18} className='text-pink-500' />

                        <span className='max-w-[90px] truncate'>

                          {isDetectingLocation

                            ? 'Detecting...'

                            : userLocation?.city || 'Location'}

                        </span>

                      </button>

                      <div className='h-full w-px bg-[#392C5C]/15 shrink-0' />

                      <input

                        ref={searchInputRef}

                        value={searchQuery}

                        onChange={handleSearchChange}

                        onKeyDown={handleKeyDown}

                        placeholder='Search disease'

                        className='h-full px-4 text-[15px] text-[#392C5C] placeholder:text-[#392C5C]/45 outline-none w-full'

                      />

                      <button

                        type='button'

                        onClick={handleSearchClick}

                        className='h-full w-14 bg-pink-500 text-white font-semibold inline-flex items-center justify-center hover:bg-pink-600 transition-colors rounded-r-2xl'

                        aria-label='Search'

                      >

                        <Search size={18} />

                      </button>

                    </div>

                    {showSuggestions && (

                      <div

                        ref={suggestionsRef}

                        className='mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[360px] overflow-y-auto'

                      >

                        {suggestions.length === 0 || !suggestions.some((g) => g.items.length > 0) ? (

                          <div className='px-6 py-4 text-sm text-gray-500'>No treatments found</div>

                        ) : (

                          <div className='p-4'>

                            {suggestions.map((group, groupIdx) => (

                              <div key={groupIdx} className='mb-4 last:mb-0'>

                                <div className='flex items-center gap-2 mb-2 px-2'>

                                  <span className='text-[11px] font-bold text-pink-600 uppercase tracking-wide'>

                                    {group.category}

                                  </span>

                                  <div className='flex-1 h-px bg-gray-100' />

                                </div>

                                <ul className='space-y-1'>

                                  {group.items.map((item, idx) => (

                                    <li key={idx}>

                                      <button

                                        type='button'

                                        onClick={() => handleSuggestionClick(item.path)}

                                        className='w-full text-left px-3 py-2.5 text-sm text-[#392C5C] hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-lg flex items-center gap-3'

                                      >

                                        <span className='w-9 h-9 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-[#392C5C] shrink-0 shadow-sm'>

                                          {item.title.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}

                                        </span>

                                        <span className='font-medium'>{item.title}</span>

                                      </button>

                                    </li>

                                  ))}

                                </ul>

                              </div>

                            ))}

                          </div>

                        )}

                      </div>

                    )}

                    <div className='mt-6 grid grid-cols-2 gap-4'>

                      <button type='button' onClick={() => setMobileView('treatments')} className='bg-white text-[#392C5C] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2'>

                        <img src='/treatment_icon_navbar_mobile.png' alt='Treatments' className='h-10 w-10 object-contain' />

                        <span className='font-semibold'>Treatments</span>

                      </button>

                      <button type='button' onClick={() => setMobileView('cities')} className='bg-white text-[#392C5C] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2'>

                        <img src='/City_icon_navbar_mobileview.png' alt='Cities' className='h-10 w-10 object-contain' />

                        <span className='font-semibold'>Cities</span>

                      </button>

                      <Link to='/about' onClick={closeMobileMenu} className='bg-white text-[#392C5C] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2'>

                        <img src='/About_icon_navbar_mobileview.png' alt='About' className='h-10 w-10 object-contain' />

                        <span className='font-semibold'>About</span>

                      </Link>

                      <Link to='/blog' onClick={closeMobileMenu} className='bg-white text-[#392C5C] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2'>

                        <img src='/Blogs_icon_mobileview_navbar.png' alt='Blog' className='h-10 w-10 object-contain' />

                        <span className='font-semibold'>Blog</span>

                      </Link>

                      <Link to='/contact-us' onClick={closeMobileMenu} className='bg-white text-[#392C5C] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 col-span-2'>

                        <img src='/Contact_us_mobileview_navbar.png' alt='Contact Us' className='h-10 w-10 object-contain' />

                        <span className='font-semibold'>Contact Us</span>

                      </Link>

                    </div>

                    <div className='mt-6 grid grid-cols-2 gap-3'>

                      <Link

                        to='/join-with-us'

                        onClick={closeMobileMenu}

                        className='hover-stable block w-full px-3 py-3 bg-pink-500 text-white text-center rounded-lg font-semibold hover:bg-pink-600 transition-colors'

                      >

                        Partner With Us

                      </Link>

                      <Link

                        to='/investor'

                        onClick={closeMobileMenu}

                        className='hover-stable block w-full px-3 py-3 bg-pink-500 text-white text-center rounded-lg font-semibold hover:bg-pink-600 transition-colors'

                      >

                        Become a Investor

                      </Link>

                    </div>

                    <div className='mt-3'>

                      <Link

                        to='/contact-us'

                        onClick={closeMobileMenu}

                        className='hover-stable block w-full px-3 py-3 bg-pink-500 text-white text-center rounded-lg font-semibold hover:bg-pink-600 transition-colors'

                      >

                        Book Appointment

                      </Link>

                    </div>

                    <div className='mt-8 flex items-center justify-center gap-3 text-white/80'>

                      <img src='/New_ISVIR_LOGO.png' alt='ISVIR logo' className='h-10 w-auto' />

                      <div className='text-[12px] leading-tight'>

                        Corporate Member of ISVIR

                        <br />

                        Interventional Radiology

                      </div>

                    </div>

                  </div>

                )}

                {mobileView === 'treatments' && (

                  <div className='px-4 pt-5 pb-8 text-[#392C5C]'>

                    <div className='bg-white rounded-2xl p-4'>

                      {treatmentCategories.map((cat) => (

                        <div key={cat.id} className='mb-4 last:mb-0'>

                          <div className='text-[11px] font-extrabold text-gray-600 tracking-wide mb-2'>

                            {cat.name.toUpperCase()}

                          </div>

                          <div className='bg-gray-50 rounded-xl border border-gray-200 overflow-hidden'>

                            {cat.items.map((item) => (

                              <button

                                key={item.path}

                                type='button'

                                onClick={() => handleSuggestionClick(item.path)}

                                className='w-full text-left px-4 py-3 text-sm text-[#392C5C] hover:bg-pink-50 transition-colors border-b border-gray-200 last:border-b-0'

                              >

                                {item.title}

                              </button>

                            ))}

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                )}

                {mobileView === 'cities' && (

                  <div className='px-4 pt-5 pb-8 text-[#392C5C]'>

                    <div className='flex items-center justify-between mb-3'>

                      <button

                        type='button'

                        onClick={handleDetectMyLocation}

                        disabled={isDetectingLocation}

                        className='text-xs text-white bg-white/10 px-3 py-2 rounded-lg border border-white/10 disabled:opacity-50'

                      >

                        {isDetectingLocation ? 'Detecting...' : 'Detect my location'}

                      </button>

                    </div>

                    <div className='space-y-4'>

                      {MOBILE_CITY_GROUPS.map((group) => {

                        const availableCities = group.cities.filter((c) => DEFAULT_CITIES.includes(c));

                        if (availableCities.length === 0) return null;

                        return (

                          <div key={group.title} className='bg-white rounded-2xl p-4'>

                            <div className='text-[11px] font-extrabold text-gray-600 tracking-wide mb-2'>{group.title}</div>

                            <div className='bg-gray-50 rounded-xl border border-gray-200 overflow-hidden'>

                              {availableCities.map((city) => (

                                <button

                                  key={city}

                                  type='button'

                                  onClick={() => handleCitySelect(city)}

                                  className={`w-full text-left px-4 py-3 text-sm hover:bg-pink-50 transition-colors border-b border-gray-200 last:border-b-0 ${

                                    userLocation?.city === city ? 'text-pink-600 font-semibold' : 'text-[#392C5C]'

                                  }`}

                                >

                                  {city}

                                </button>

                              ))}

                            </div>

                          </div>

                        );

                      })}

                    </div>

                  </div>

                )}

              </div>

            </div>

          </>

        )}

      </div>

    </nav>

  );

}

