/** Hostnames allowed for Firebase Phone Auth + reCAPTCHA (Firebase blocks plain localhost). */
export const getOtpHostname = () => window.location.hostname;

export const getOtpDomainSetupHint = () => {
  const host = getOtpHostname();
  return (
    `Add "${host}" in Firebase Console → Authentication → Settings → Authorized domains. ` +
    'For local dev use http://127.0.0.1:5173 (not localhost). ' +
    'If using reCAPTCHA Enterprise, also add this host in Google Cloud → reCAPTCHA key domains.'
  );
};

export const isOtpFriendlyHostname = () => {
  const host = getOtpHostname();
  if (host === 'localhost') return false;
  if (host === '127.0.0.1') return true;
  // production / staging custom domains
  return host.includes('.');
};
