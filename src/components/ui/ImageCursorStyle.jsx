import React from 'react';
import { IMAGE_CURSOR_ENABLED, CURSOR_IMAGE_URL, CURSOR_IMAGE_HOTSPOT, APPLY_IMAGE_CURSOR_TO_INTERACTIVE, CURSOR_IMAGE_TARGET_SIZE } from '../../config/uiEnhancements';

export default function ImageCursorStyle() {
  const [dataUrl, setDataUrl] = React.useState(null);

  React.useEffect(() => {
    if (!IMAGE_CURSOR_ENABLED) return;
    let cancelled = false;

    const img = new Image();
    // Same-origin asset served by Vite from public/, CORS not needed
    img.src = CURSOR_IMAGE_URL;
    img.onload = () => {
      if (cancelled) return;
      const size = Math.max(8, Math.min(128, Number(CURSOR_IMAGE_TARGET_SIZE) || 32));
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Draw image fitted within square while preserving aspect ratio
      const scale = Math.min(size / img.width, size / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const dx = (size - drawW) / 2;
      const dy = (size - drawH) / 2;
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, dx, dy, drawW, drawH);

      const url = canvas.toDataURL('image/png');
      setDataUrl(url);
    };
    img.onerror = () => {
      // Fallback to original path if canvas conversion fails
      setDataUrl(CURSOR_IMAGE_URL);
    };

    return () => {
      cancelled = true;
    };
  }, []);

  if (!IMAGE_CURSOR_ENABLED) return null;

  const x = CURSOR_IMAGE_HOTSPOT?.x || 0;
  const y = CURSOR_IMAGE_HOTSPOT?.y || 0;

  return (
    <style>
      {`
        @media (pointer: fine) {
          /* Apply image cursor ONLY when body does NOT have cursor-system */
          body:not(.cursor-system), body:not(.cursor-system) * { cursor: url(${dataUrl || CURSOR_IMAGE_URL}) ${x} ${y}, auto !important; }
          ${APPLY_IMAGE_CURSOR_TO_INTERACTIVE ? 'body:not(.cursor-system) a, body:not(.cursor-system) button, body:not(.cursor-system) [role="button"], body:not(.cursor-system) [role="link"], body:not(.cursor-system) [href], body:not(.cursor-system) input[type="button"], body:not(.cursor-system) input[type="submit"], body:not(.cursor-system) textarea, body:not(.cursor-system) select, body:not(.cursor-system) .btn, body:not(.cursor-system) .btn-primary, body:not(.cursor-system) .btn-secondary, body:not(.cursor-system) .cta, body:not(.cursor-system) [data-ux-btn], body:not(.cursor-system) [data-ux-cta], body:not(.cursor-system) nav a, body:not(.cursor-system) footer a, body:not(.cursor-system) nav button, body:not(.cursor-system) footer button { cursor: pointer !important; }' : ''}

          /* When body has cursor-system, use native cursors */
          body.cursor-system, body.cursor-system * { cursor: auto !important; }
          body.cursor-system a,
          body.cursor-system button,
          body.cursor-system [role="button"],
          body.cursor-system input,
          body.cursor-system textarea,
          body.cursor-system select,
          body.cursor-system .btn-primary,
          body.cursor-system .btn-secondary,
          body.cursor-system [data-ux-btn],
          body.cursor-system [data-ux-cta],
          body.cursor-system .cta { cursor: pointer !important; }
        }
      `}
    </style>
  );
}
