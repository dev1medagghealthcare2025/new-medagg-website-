/** Branding shown in the OTP verification modal (SMS text is controlled by Firebase). */
export const OTP_BRAND = {
  companyName: import.meta.env.VITE_OTP_BRAND_NAME || 'MedAgg Healthcare',
  productName: import.meta.env.VITE_OTP_PRODUCT_NAME || 'NoSurgeries',
  tagline: import.meta.env.VITE_OTP_BRAND_TAGLINE || 'Minimally invasive care',
  logoSrc: import.meta.env.VITE_OTP_BRAND_LOGO || '/Medagg_new_logo_nosurgeries.png',
  website: import.meta.env.VITE_OTP_BRAND_WEBSITE || 'nosurgeries.in',
};

/** What users see in Firebase SMS on web (domain-based). */
export const getSmsSenderLabel = () => {
  if (typeof window === 'undefined') return OTP_BRAND.website;
  const host = window.location.hostname;
  if (host === '127.0.0.1' || host === 'localhost') {
    return `${OTP_BRAND.website} (live site; local dev shows ${host})`;
  }
  return host || OTP_BRAND.website;
};
