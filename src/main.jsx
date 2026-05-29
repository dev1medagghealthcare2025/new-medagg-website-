import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { openThankYouModal } from './lib/thankYouModal';
import { isTelecrmOtpGateEnabled } from './config/otp';
import { normalizePhone } from './utils/phoneVerification';

// Remove legacy cache that previously skipped OTP after first verify
try {
  sessionStorage.removeItem('medagg_verified_phones');
} catch {}

const extractTelecrmPhone = (init) => {
  try {
    const body = init?.body;
    if (!body || typeof body !== 'string') return '';
    const parsed = JSON.parse(body);
    return parsed?.fields?.phone || parsed?.fields?.phoneNumber || '';
  } catch {
    return '';
  }
};

const waitForOtpVerifier = (timeoutMs = 15000) =>
  new Promise((resolve, reject) => {
    if (typeof window.__medaggTelecrmOtpVerify === 'function') {
      resolve(window.__medaggTelecrmOtpVerify);
      return;
    }
    const deadline = Date.now() + timeoutMs;
    const timer = setInterval(() => {
      if (typeof window.__medaggTelecrmOtpVerify === 'function') {
        clearInterval(timer);
        resolve(window.__medaggTelecrmOtpVerify);
      } else if (Date.now() >= deadline) {
        clearInterval(timer);
        reject(new Error('OTP verification is not ready. Please refresh the page.'));
      }
    }, 50);
  });

const telecrmBlockedResponse = (message) =>
  new Response(JSON.stringify({ error: message }), {
    status: 400,
    statusText: 'OTP Required',
    headers: { 'Content-Type': 'application/json' },
  });

const originalFetch = window.fetch.bind(window);
window.fetch = async (...args) => {
  const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
  const isTeleCRM = typeof url === 'string' && url.includes('api.telecrm.in') && url.includes('/autoupdatelead');
  const init = args[1] || {};
  const doFetch = () => originalFetch(...args);

  let response;

  if (isTeleCRM && isTelecrmOtpGateEnabled()) {
    const phone = extractTelecrmPhone(init);
    const cleaned = normalizePhone(phone);

    if (!cleaned) {
      console.error('[OTP] Blocked TeleCRM submit: missing valid phone number');
      return telecrmBlockedResponse('Phone number is required');
    }

    try {
      const verify = await waitForOtpVerifier();
      window.dispatchEvent(new CustomEvent('medagg:otp-gate-open'));
      response = await verify({ phone: cleaned, retry: doFetch });
    } catch (err) {
      console.error('[OTP] TeleCRM blocked:', err?.message || err);
      return telecrmBlockedResponse(err?.message || 'OTP verification required');
    }
  } else {
    response = await doFetch();
  }

  try {
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
