/**
 * TeleCRM submissions OTP gate control.
 *
 * TEMPORARILY DISABLED: OTP gate is paused until Firebase billing is active.
 * TO RE-ENABLE: Change `ENABLE_OTP_GATE` back to `true`.
 */
const ENABLE_OTP_GATE = false;

export const isTelecrmOtpGateEnabled = () => {
  if (!ENABLE_OTP_GATE) return false;

  const skipRequested = import.meta.env.VITE_SKIP_TELECRM_OTP === 'true';
  if (!skipRequested) return true;
  if (!import.meta.env.DEV) {
    console.warn('[OTP] VITE_SKIP_TELECRM_OTP is ignored in production — OTP is required.');
    return true;
  }
  return false;
};

