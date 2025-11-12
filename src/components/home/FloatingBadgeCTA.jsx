import React from 'react';
import { Link } from 'react-router-dom';

const FloatingBadgeCTA = ({
  imgSrc = '/irpreneur.png',
  alt = 'IR preneur 2025',
  to = '/join-with-us',
  href,
  newTab = true,
  size = 140,
  mobileSize = 110,
  topOffset = 20,
  offsetX = 0,
  align = 'center', // 'center' | 'left'
  leftOffset = 24,
  zIndex = 30,
  showOnMobile = true,
  rotateImage = true,
  imageRotationDuration = '20s',
}) => {
  return (
    <div
      className={`pointer-events-auto select-none ${showOnMobile ? '' : 'hidden md:block'}`}
      style={{
        position: 'absolute',
        top: topOffset,
        left: align === 'left' ? leftOffset : '50%',
        transform: align === 'left' ? 'none' : `translateX(calc(-50% - ${offsetX}px))`,
        zIndex,
      }}
    >
      {/* Float + subtle tilt wrapper */}
      <div className="badge-float">
      {href ? (
        <a
          href={href}
          target={newTab ? '_blank' : '_self'}
          rel={newTab ? 'noopener noreferrer' : undefined}
          aria-label={alt}
          className="group floating-badge block focus:outline-none"
        >
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: size,
              height: size,
            }}
          >
            {/* Rotating dashed ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/80 animate-spin"
              style={{ animationDuration: '10s' }}
              aria-hidden
            />

            {/* Soft glow pulse */}
            <div
              className="absolute inset-0 rounded-full bg-pink-500/10 blur-md animate-pulse"
              aria-hidden
            />

            {/* Center PNG (optional rotation applied directly) */}
            <img
              src={imgSrc}
              alt={alt}
              className={`relative rounded-full shadow-xl ring-2 ring-white/70 group-hover:scale-105 transition-transform duration-300 ${rotateImage ? 'animate-spin' : ''}`}
              style={{
                width: size - 16,
                height: size - 16,
                objectFit: 'contain',
                animationDuration: rotateImage ? imageRotationDuration : undefined,
                animationTimingFunction: rotateImage ? 'linear' : undefined,
              }}
            />
          </div>
        </a>
      ) : (
        <Link
          to={to}
          aria-label={alt}
          className="group floating-badge block focus:outline-none"
        >
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: size,
            height: size,
          }}
        >
          {/* Rotating dashed ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/80 animate-spin"
            style={{ animationDuration: '10s' }}
            aria-hidden
          />

          {/* Soft glow pulse */}
          <div
            className="absolute inset-0 rounded-full bg-pink-500/10 blur-md animate-pulse"
            aria-hidden
          />

          {/* Center PNG (optional rotation applied directly) */}
          <img
            src={imgSrc}
            alt={alt}
            className={`relative rounded-full shadow-xl ring-2 ring-white/70 group-hover:scale-105 transition-transform duration-300 ${rotateImage ? 'animate-spin' : ''}`}
            style={{
              width: size - 16,
              height: size - 16,
              objectFit: 'contain',
              animationDuration: rotateImage ? imageRotationDuration : undefined,
              animationTimingFunction: rotateImage ? 'linear' : undefined,
            }}
          />
        </div>
        </Link>
      )}
      </div>

      {/* Note: Removed embedded <style> to prevent global CSS bleed. */}
    </div>
  );
};

export default FloatingBadgeCTA;
