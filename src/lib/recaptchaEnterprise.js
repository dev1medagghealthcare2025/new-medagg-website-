import { initializeRecaptchaConfig } from 'firebase/auth';

const SITE_KEY = import.meta.env.VITE_FIREBASE_RECAPTCHA_ENTERPRISE_SITE_KEY || '';

let scriptPromise = null;
let configPromise = null;
let enterpriseReady = false;

export const loadRecaptchaEnterpriseScript = () => {
  if (!SITE_KEY) return Promise.resolve(false);
  if (window.grecaptcha?.enterprise) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById('recaptcha-enterprise-script');
    if (existing) {
      if (window.grecaptcha?.enterprise) {
        resolve(true);
        return;
      }
      existing.addEventListener('load', () => resolve(true), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = 'recaptcha-enterprise-script';
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(SITE_KEY)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA Enterprise script'));
    document.head.appendChild(script);
  });

  return scriptPromise;
};

/** Returns true only if Firebase returns a valid Enterprise config. */
export const ensureRecaptchaEnterpriseConfig = async (auth) => {
  if (!SITE_KEY) return false;
  if (enterpriseReady) return true;
  if (configPromise) return configPromise;

  configPromise = (async () => {
    try {
      await loadRecaptchaEnterpriseScript();
      await initializeRecaptchaConfig(auth);
      enterpriseReady = true;
      console.log('[OTP] reCAPTCHA Enterprise config ready');
      return true;
    } catch (err) {
      console.warn('[OTP] Enterprise config unavailable, using reCAPTCHA v2:', err?.message || err);
      enterpriseReady = false;
      return false;
    } finally {
      configPromise = null;
    }
  })();

  return configPromise;
};
