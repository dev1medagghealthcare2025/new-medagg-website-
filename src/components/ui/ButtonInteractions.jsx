import React from 'react';
import { BUTTON_INTERACTIONS_ENABLED, MAGNETIC_HOVER_ENABLED, RIPPLE_PRESS_ENABLED, RESPECT_REDUCED_MOTION, PROXIMITY_INTERACTION_ENABLED, PROXIMITY_RADIUS, DEFAULT_CURSOR_ON_CTA_ENABLED } from '../../config/uiEnhancements';

const prefersReducedMotion = () => {
  if (!RESPECT_REDUCED_MOTION) return false;
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const SELECTOR = 'a, button, input[type="button"], input[type="submit"], .btn, .btn-primary, .btn-secondary, .cta, [data-ux-btn], [data-ux-cta]';

export default function ButtonInteractions() {
  React.useEffect(() => {
    if (!BUTTON_INTERACTIONS_ENABLED) return;
    if (prefersReducedMotion()) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

    const elements = Array.from(document.querySelectorAll(SELECTOR));

    const cleanupFns = [];

    // -----------------------------
    // Proximity hover
    // -----------------------------
    if (PROXIMITY_INTERACTION_ENABLED) {
      let raf = null;
      let lastEvent = null;
      let currentHovered = null;

      const distanceToRect = (x, y, r) => {
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        return Math.hypot(dx, dy);
      };

      const tick = () => {
        raf = null;
        if (!lastEvent) return;
        const { clientX, clientY } = lastEvent;
        const radius = Math.max(PROXIMITY_RADIUS || 0, 16);
        let best = { el: null, d: Infinity };
        // Query live each frame to include dynamically added buttons
        const candidates = document.querySelectorAll(SELECTOR);
        candidates.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const d = distanceToRect(clientX, clientY, rect);
          if (d < best.d) best = { el, d };
        });
        const within = best.d <= radius;
        if (within) {
          if (currentHovered !== best.el) {
            currentHovered && currentHovered.classList.remove('ux-prox-hover');
            currentHovered = best.el;
            currentHovered.classList.add('ux-prox-hover');
          }
        } else if (currentHovered) {
          currentHovered.classList.remove('ux-prox-hover');
          currentHovered = null;
        }
      };

      const onMove = (e) => {
        lastEvent = e;
        if (!raf) raf = requestAnimationFrame(tick);
      };
      window.addEventListener('pointermove', onMove);
      cleanupFns.push(() => {
        window.removeEventListener('pointermove', onMove);
        if (raf) cancelAnimationFrame(raf);
        if (currentHovered) currentHovered.classList.remove('ux-prox-hover');
      });

      const onDown = (e) => {
        if (!currentHovered) return;
        // If the target is not within the hovered element, redirect click
        if (!currentHovered.contains(e.target)) {
          e.preventDefault();
          e.stopPropagation();
          currentHovered.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, clientX: e.clientX, clientY: e.clientY }));
        }
      };
      window.addEventListener('pointerdown', onDown, true);
      cleanupFns.push(() => window.removeEventListener('pointerdown', onDown, true));
    }

    // -----------------------------
    // Default system cursor on CTAs
    // -----------------------------
    if (DEFAULT_CURSOR_ON_CTA_ENABLED) {
      let hoverCount = 0;
      const onOver = (e) => {
        const el = e.target && e.target.closest(SELECTOR);
        if (!el) return;
        hoverCount += 1;
        document.body.classList.add('cursor-system');
      };
      const onOut = (e) => {
        // mouseout provides relatedTarget to know where we go next
        const fromEl = e.target && e.target.closest(SELECTOR);
        const toEl = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(SELECTOR);
        if (!fromEl) return;
        if (toEl) return; // still inside a CTA
        hoverCount = Math.max(0, hoverCount - 1);
        if (hoverCount === 0) document.body.classList.remove('cursor-system');
      };
      document.addEventListener('mouseover', onOver, true);
      document.addEventListener('mouseout', onOut, true);
      cleanupFns.push(() => {
        document.removeEventListener('mouseover', onOver, true);
        document.removeEventListener('mouseout', onOut, true);
        document.body.classList.remove('cursor-system');
      });
    }

    if (MAGNETIC_HOVER_ENABLED) {
      elements.forEach((el) => {
        el.style.willChange = 'transform';
        el.style.transition = el.style.transition || 'transform 180ms ease, box-shadow 180ms ease';

        const state = { raf: null };

        const onMove = (e) => {
          const rect = el.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const dx = (mx - cx) / cx; // -1..1
          const dy = (my - cy) / cy; // -1..1
          const max = Math.min(10, Math.max(rect.width, rect.height) * 0.06); // px
          const tx = dx * max;
          const ty = dy * max;
          if (state.raf) cancelAnimationFrame(state.raf);
          state.raf = requestAnimationFrame(() => {
            el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
          });
        };
        const onEnter = () => {
          el.addEventListener('mousemove', onMove);
        };
        const onLeave = () => {
          el.removeEventListener('mousemove', onMove);
          if (state.raf) cancelAnimationFrame(state.raf);
          el.style.transform = 'translate3d(0,0,0)';
          el.style.boxShadow = '';
        };
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
          el.removeEventListener('mousemove', onMove);
          if (state.raf) cancelAnimationFrame(state.raf);
        });
      });
    }

    if (RIPPLE_PRESS_ENABLED) {
      const onPointerDown = (e) => {
        const el = e.target.closest(SELECTOR);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.4;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const ripple = document.createElement('span');
        ripple.className = 'ux-ripple';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        el.style.position = el.style.position || 'relative';
        el.appendChild(ripple);
        setTimeout(() => {
          ripple.remove();
        }, 600);
      };
      document.addEventListener('pointerdown', onPointerDown);
      cleanupFns.push(() => document.removeEventListener('pointerdown', onPointerDown));
    }

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  if (!BUTTON_INTERACTIONS_ENABLED) return null;
  return (
    <style>{`
      .ux-ripple {
        position: absolute;
        border-radius: 9999px;
        background: rgba(0,0,0,0.15);
        transform: scale(0);
        animation: ux-ripple 600ms ease-out;
        pointer-events: none;
      }
      @keyframes ux-ripple {
        to { transform: scale(1); opacity: 0; }
      }
      .ux-prox-hover { outline: 2px solid rgba(99,102,241,0.25); outline-offset: 2px; }
    `}</style>
  );
}
