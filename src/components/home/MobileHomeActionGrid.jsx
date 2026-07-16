import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, X } from 'lucide-react';
import { treatmentCategories } from './searchTreatments';
import {
  DEFAULT_CITIES,
  findClosestCity,
  getSavedLocation,
  saveLocation,
} from './locationUtils';

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

const PanelOverlay = ({ title, onClose, children }) => (
  <div className='fixed inset-0 z-[60] lg:hidden'>
    <div className='absolute inset-0 bg-black/40' onClick={onClose} aria-hidden='true' />
    <div className='absolute inset-x-0 bottom-0 top-16 bg-[#392C5C] text-white overflow-y-auto rounded-t-2xl shadow-2xl'>
      <div className='sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#392C5C] border-b border-white/10'>
        <h2 className='text-base font-semibold'>{title}</h2>
        <button type='button' onClick={onClose} className='p-2' aria-label='Close'>
          <X size={20} />
        </button>
      </div>
      <div className='px-4 pt-4 pb-8'>{children}</div>
    </div>
  </div>
);

const MobileHomeActionGrid = () => {
  const navigate = useNavigate();
  const [panel, setPanel] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const savedLocation = getSavedLocation();

  const handleCitySelect = (city) => {
    saveLocation({ city, method: 'manual', isServiceable: true });
    setPanel(null);
  };

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
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
        { headers: { 'Accept-Language': 'en' } },
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
        saveLocation({
          city: closestCity || detectedCity,
          latitude,
          longitude,
          method: 'browser',
          isServiceable: !!closestCity,
        });
        setPanel(null);
      } else {
        alert('Could not detect your city. Please select manually.');
      }
    } catch (error) {
      if (error.code === 1) {
        alert('Please allow location permission to detect your city.');
      } else {
        alert('Could not detect location. Please select your city manually.');
      }
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const closePanel = () => setPanel(null);

  return (
    <>
      <section className='md:hidden bg-[#392C5C] px-4 py-5'>
        <div className='grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={() => setPanel('treatments')}
            className='bg-white text-[#392C5C] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-[100px]'
          >
            <img src='/treatment_icon_navbar_mobile.png' alt='' className='h-10 w-10 object-contain' />
            <span className='font-semibold text-sm'>Treatments</span>
          </button>

          <Link
            to='/contact-us'
            className='bg-white text-[#392C5C] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-[100px]'
          >
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-pink-500'>
              <Calendar size={22} strokeWidth={2} />
            </span>
            <span className='font-semibold text-sm'>Book Now</span>
          </Link>

          <button
            type='button'
            onClick={() => setPanel('cities')}
            className='bg-white text-[#392C5C] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-[100px]'
          >
            <img src='/City_icon_navbar_mobileview.png' alt='' className='h-10 w-10 object-contain' />
            <span className='font-semibold text-sm'>Cities</span>
          </button>

          <Link
            to='/contact-us'
            className='bg-white text-[#392C5C] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-[100px]'
          >
            <img src='/Contact_us_mobileview_navbar.png' alt='' className='h-10 w-10 object-contain' />
            <span className='font-semibold text-sm'>Contact Us</span>
          </Link>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-3'>
          <Link
            to='/join-with-us'
            className='hover-stable block w-full px-3 py-3 bg-pink-500 text-white text-center rounded-lg font-semibold hover:bg-pink-600 transition-colors text-sm'
          >
            Partner With Us
          </Link>
          <Link
            to='/investor'
            className='hover-stable block w-full px-3 py-3 bg-pink-500 text-white text-center rounded-lg font-semibold hover:bg-pink-600 transition-colors text-sm'
          >
            Become a Investor
          </Link>
        </div>
      </section>

      {panel === 'treatments' && (
        <PanelOverlay title='Treatments' onClose={closePanel}>
          <div className='bg-white rounded-2xl p-4 text-[#392C5C]'>
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
                      onClick={() => {
                        closePanel();
                        navigate(item.path);
                      }}
                      className='w-full text-left px-4 py-3 text-sm text-[#392C5C] hover:bg-pink-50 transition-colors border-b border-gray-200 last:border-b-0'
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PanelOverlay>
      )}

      {panel === 'cities' && (
        <PanelOverlay title='Select City' onClose={closePanel}>
          <button
            type='button'
            onClick={handleDetectMyLocation}
            disabled={isDetectingLocation}
            className='mb-4 text-xs text-white bg-white/10 px-3 py-2 rounded-lg border border-white/10 disabled:opacity-50'
          >
            {isDetectingLocation ? 'Detecting...' : 'Detect my location'}
          </button>
          <div className='space-y-4'>
            {MOBILE_CITY_GROUPS.map((group) => {
              const availableCities = group.cities.filter((c) => DEFAULT_CITIES.includes(c));
              if (availableCities.length === 0) return null;
              return (
                <div key={group.title} className='bg-white rounded-2xl p-4 text-[#392C5C]'>
                  <div className='text-[11px] font-extrabold text-gray-600 tracking-wide mb-2'>{group.title}</div>
                  <div className='bg-gray-50 rounded-xl border border-gray-200 overflow-hidden'>
                    {availableCities.map((city) => (
                      <button
                        key={city}
                        type='button'
                        onClick={() => handleCitySelect(city)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-pink-50 transition-colors border-b border-gray-200 last:border-b-0 ${
                          savedLocation?.city === city ? 'text-pink-600 font-semibold' : 'text-[#392C5C]'
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
        </PanelOverlay>
      )}
    </>
  );
};

export default MobileHomeActionGrid;
