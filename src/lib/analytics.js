// GA4 lightweight helper for Vite + React Router
// Activates only when a valid GA Measurement ID is provided.

let initialized = false;
let currentId = null;

export function initGA(measurementId) {
  if (!measurementId || typeof window === 'undefined') return;
  if (initialized && currentId === measurementId) return;
  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('js', new Date());
  gtag('config', measurementId, { send_page_view: false }); // SPA: we send page_view manually

  initialized = true;
  currentId = measurementId;
}

export function trackPageView(pathname, search = '') {
  if (!initialized || !window.gtag || !currentId) return;
  const page_location = window.location.origin + pathname + (search || '');
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location,
    page_path: pathname + (search || ''),
  });
}
