import React from 'react';
import { CURSOR_THEME, RESPECT_REDUCED_MOTION, DISABLE_ON_TOUCH } from '../../config/uiEnhancements';

// Linear interpolation helper
const lerp = (start, end, amt) => start + (end - start) * amt;

const isTouchLike = () => {
  if (!DISABLE_ON_TOUCH) return false;
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
};

const prefersReducedMotion = () => {
  if (!RESPECT_REDUCED_MOTION) return false;
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function Cursor() {
  const ringRef = React.useRef(null);
  const dotRef = React.useRef(null);
  const pos = React.useRef({ x: 0, y: 0 });
  const target = React.useRef({ x: 0, y: 0 });
  const rafRef = React.useRef(null);
  const disabled = isTouchLike() || prefersReducedMotion();

  React.useEffect(() => {
    if (disabled) return;

    const handleMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      // Move the small dot immediately for responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleOver = (e) => {
      const t = e.target;
      if (!ringRef.current) return;
      if (t.closest('a, button, [role="button"], input, textarea, select, .interactive')) {
        ringRef.current.dataset.hover = 'true';
      }
    };

    const handleOut = () => {
      if (!ringRef.current) return;
      ringRef.current.dataset.hover = 'false';
    };

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('mouseover', handleOver, true);
    window.addEventListener('mouseout', handleOut, true);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('mouseover', handleOver, true);
      window.removeEventListener('mouseout', handleOut, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [disabled]);

  if (disabled) return null;

  const size = 28; // ring diameter
  const dotSize = 6; // center dot

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        data-hover="false"
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `${-size / 2}px`,
          marginTop: `${-size / 2}px`,
          borderRadius: '9999px',
          border: `2px solid ${CURSOR_THEME.base}`,
          boxShadow: `0 0 0 6px ${CURSOR_THEME.outline}`,
          mixBlendMode: 'normal',
          transition: 'border-color 200ms ease, transform 120ms ease',
          pointerEvents: 'none',
          zIndex: 50,
          backdropFilter: 'saturate(120%)',
        }}
        className="cursor-ring"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          marginLeft: `${-dotSize / 2}px`,
          marginTop: `${-dotSize / 2}px`,
          borderRadius: '9999px',
          backgroundColor: CURSOR_THEME.base,
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />

      <style>{`
        .cursor-ring[data-hover="true"] {
          border-color: ${CURSOR_THEME.hover};
          transform: translate3d(${pos.current?.x || 0}px, ${pos.current?.y || 0}px, 0) scale(1.3);
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor-ring { transition: none !important; }
        }
        @media (pointer: coarse) {
          .cursor-ring { display: none !important; }
        }
      `}</style>
    </>
  );
}
