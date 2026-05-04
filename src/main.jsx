import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { openThankYouModal } from './lib/thankYouModal';

const originalFetch = window.fetch.bind(window);
window.fetch = async (...args) => {
  const response = await originalFetch(...args);
  try {
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
    const isTeleCRM = typeof url === 'string' && url.includes('api.telecrm.in') && url.includes('/autoupdatelead');
    if (isTeleCRM && response.ok) {
      openThankYouModal();
    }
  } catch {
    // Silent fail - don't break form submission if modal fails
  }
  return response;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
