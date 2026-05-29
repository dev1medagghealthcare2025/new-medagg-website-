/**
 * TeleCRM submissions require phone OTP unless explicitly skipped (dev only).
 * Production builds always enforce OTP even if VITE_SKIP_TELECRM_OTP=true.
 */
export const isTelecrmOtpGateEnabled = () => {
  const skipRequested = import.meta.env.VITE_SKIP_TELECRM_OTP === 'true';
  if (!skipRequested) return true;
  if (!import.meta.env.DEV) {
    console.warn('[OTP] VITE_SKIP_TELECRM_OTP is ignored in production — OTP is required.');
    return true;
  }
  return false;
};
