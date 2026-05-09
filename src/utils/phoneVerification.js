const VERIFIED_PHONES_KEY = 'medagg_verified_phones';

export const normalizePhone = (phone) => {
  if (!phone) return '';
  return String(phone).replace(/\D/g, '').slice(-10);
};

export const isPhoneVerified = (phone) => {
  const cleaned = normalizePhone(phone);
  if (!cleaned) return false;
  const verifiedPhones = JSON.parse(sessionStorage.getItem(VERIFIED_PHONES_KEY) || '[]');
  return verifiedPhones.includes(cleaned);
};

export const setPhoneVerified = (phone) => {
  const cleaned = normalizePhone(phone);
  if (!cleaned) return;
  const verifiedPhones = JSON.parse(sessionStorage.getItem(VERIFIED_PHONES_KEY) || '[]');
  if (!verifiedPhones.includes(cleaned)) {
    verifiedPhones.push(cleaned);
    sessionStorage.setItem(VERIFIED_PHONES_KEY, JSON.stringify(verifiedPhones));
  }
};
