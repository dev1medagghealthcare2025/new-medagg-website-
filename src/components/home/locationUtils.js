// Location utilities for auto-detecting and managing user location

// Serviceable cities list - all cities where services are available
export const DEFAULT_CITIES = [
  'Ahmedabad',
  'Bangalore',
  'Bhubaneswar',
  'Calicut',
  'Chennai',
  'Coimbatore',
  'Delhi',
  'Goa',
  'Gurgaon',
  'Hyderabad',
  'Jaipur',
  'Kolkata',
  'Lucknow',
  'Madurai',
  'Mumbai',
  'Perinthalmanna',
  'Pune',
  'Salem',
  'Surat',
  'Trivandrum',
  'Vijayawada',
  'Vizag',
];

const STORAGE_KEY = 'user_location';

// Get saved location from localStorage
export function getSavedLocation() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// Save location to localStorage
export function saveLocation(location) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  } catch {
    // Ignore storage errors
  }
}

// Detect location using IP geolocation (free service)
export async function detectLocationByIP() {
  try {
    // Try ipapi.co (free tier: 45 requests/minute)
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('IP API failed');
    
    const data = await response.json();
    
    return {
      city: data.city,
      region: data.region,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
      method: 'ip',
    };
  } catch (error) {
    console.log('IP detection failed:', error);
    return null;
  }
}

// Detect location using Browser Geolocation API
export function detectLocationByBrowser() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Reverse geocode to get city name
          const { latitude, longitude } = position.coords;
          const city = await reverseGeocode(latitude, longitude);
          
          resolve({
            city: city || 'Unknown',
            latitude,
            longitude,
            method: 'browser',
          });
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        reject(error);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  });
}

// Reverse geocode lat/lng to city name using OpenStreetMap Nominatim
async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
      { headers: { 'Accept-Language': 'en' } }
    );
    
    if (!response.ok) throw new Error('Geocoding failed');
    
    const data = await response.json();
    return data.address?.city || 
           data.address?.town || 
           data.address?.district || 
           data.address?.county ||
           null;
  } catch (error) {
    console.log('Reverse geocode failed:', error);
    return null;
  }
}

// Main function to detect location with fallback
export async function detectLocation() {
  // 1. Try IP-based detection first (no permission needed)
  const ipLocation = await detectLocationByIP();
  if (ipLocation?.city) {
    return ipLocation;
  }

  // 2. Fallback to browser geolocation (requires permission)
  try {
    const browserLocation = await detectLocationByBrowser();
    if (browserLocation?.city) {
      return browserLocation;
    }
  } catch (error) {
    console.log('Browser detection failed:', error);
  }

  // 3. Return null if all methods fail
  return null;
}

// Check if a city is in our serviceable cities list
export function isCityServiceable(cityName) {
  if (!cityName) return false;
  return DEFAULT_CITIES.some(
    (c) => c.toLowerCase() === cityName.toLowerCase()
  );
}

// Find closest matching city from our list
export function findClosestCity(cityName) {
  if (!cityName) return null;
  
  // Exact match
  const exact = DEFAULT_CITIES.find(
    (c) => c.toLowerCase() === cityName.toLowerCase()
  );
  if (exact) return exact;

  // Partial match (contains)
  const partial = DEFAULT_CITIES.find((c) =>
    cityName.toLowerCase().includes(c.toLowerCase()) ||
    c.toLowerCase().includes(cityName.toLowerCase())
  );
  if (partial) return partial;

  return null;
}
