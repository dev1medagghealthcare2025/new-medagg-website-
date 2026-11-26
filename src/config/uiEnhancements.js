// Central toggle for UI enhancements. Set to false to instantly disable.
export const UI_ENHANCEMENTS_ENABLED = false;

// Blog listing grouped UI (non-destructive; set to false to revert instantly)
export const GROUPED_BLOGS_UI = true;

// Cursor visual style: 'ring' | 'ring-particles' (particles not yet enabled)
export const CURSOR_STYLE = 'ring';

// Brand/theming colors for the cursor. Fallbacks provided.
export const CURSOR_THEME = {
  base: '#ec4899', // Tailwind pink-500
  hover: '#db2777', // Tailwind pink-600
  outline: 'rgba(236, 72, 153, 0.15)',
};

// Respect users that prefer reduced motion
export const RESPECT_REDUCED_MOTION = true;

// Limit to non-touch pointers only
export const DISABLE_ON_TOUCH = true;

// Image cursor controls (independent of UI_ENHANCEMENTS_ENABLED)
// Set to true to apply a custom image cursor globally.
export const IMAGE_CURSOR_ENABLED = false;
// Path relative to public/ (Vite serves this at "/cather.png")
export const CURSOR_IMAGE_URL = '/cather-removebg.png';
// Hotspot coordinates: where the "click point" is in the image (pixels from top-left)
export const CURSOR_IMAGE_HOTSPOT = { x: 0, y: 0 };
// Apply to interactive elements explicitly (links, buttons, inputs)
export const APPLY_IMAGE_CURSOR_TO_INTERACTIVE = true;
// Target size (pixels) for the cursor image; many browsers prefer <= 64, often 32 is ideal
export const CURSOR_IMAGE_TARGET_SIZE = 48;

// Smooth interactions for buttons/links (disabled to prevent event hijacking)
export const BUTTON_INTERACTIONS_ENABLED = false;
export const MAGNETIC_HOVER_ENABLED = false;
export const RIPPLE_PRESS_ENABLED = false;

// Proximity hover/click
export const PROXIMITY_INTERACTION_ENABLED = false;
export const PROXIMITY_RADIUS = 28;

// Show default system cursor on CTAs
export const DEFAULT_CURSOR_ON_CTA_ENABLED = false;
