import React from 'react';

interface C2SLogoProps {
  variant?: 'light' | 'dark'; // 'light' for light background (navbar), 'dark' for dark background (footer)
  height?: number | string;
  className?: string;
}

export const C2SLogo: React.FC<C2SLogoProps> = ({
  variant = 'light',
  height = 46,
  className = '',
}) => {
  return (
    <div
      className={`c2s-logo-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        userSelect: 'none',
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      <img
        src="/c2s-logo.png"
        alt="Care2Solutions Official Logo"
        style={{
          height: '100%',
          width: 'auto',
          objectFit: 'contain',
          // If on dark background, add subtle drop-shadow or brightness filter so dark text stands out cleanly
          filter: variant === 'dark' ? 'drop-shadow(0 0 2px rgba(255,255,255,0.8)) brightness(1.15)' : 'none',
        }}
      />
    </div>
  );
};

export default C2SLogo;
