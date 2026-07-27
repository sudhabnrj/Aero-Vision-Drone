import React, { useState } from 'react';

interface DroneGraphicProps {
  src?: string;
  alt: string;
  className?: string;
  modelId?: string;
}

export const DroneGraphic: React.FC<DroneGraphicProps> = ({ src, alt, className = '', modelId = '' }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError || !src) {
    return (
      <div className={`relative flex items-center justify-center p-4 ${className}`}>
        {/* Futuristic SVG Drone Graphic */}
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full text-[#0070d2] drop-shadow-2xl animate-pulse"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rotors Left Top */}
          <ellipse cx="40" cy="30" rx="28" ry="8" stroke="currentColor" strokeWidth="2.5" className="opacity-80" />
          <line x1="40" y1="30" x2="70" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Rotors Right Top */}
          <ellipse cx="160" cy="30" rx="28" ry="8" stroke="currentColor" strokeWidth="2.5" className="opacity-80" />
          <line x1="160" y1="30" x2="130" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          
          {/* Rotors Left Bottom */}
          <ellipse cx="30" cy="85" rx="28" ry="8" stroke="currentColor" strokeWidth="2.5" className="opacity-80" />
          <line x1="30" y1="85" x2="75" y2="65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Rotors Right Bottom */}
          <ellipse cx="170" cy="85" rx="28" ry="8" stroke="currentColor" strokeWidth="2.5" className="opacity-80" />
          <line x1="170" y1="85" x2="125" y2="65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

          {/* Central Body Fuselage */}
          <rect x="70" y="42" width="60" height="32" rx="16" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
          {/* Gimbal Camera Pod */}
          <circle cx="100" cy="78" r="10" fill="#0070d2" stroke="#ffffff" strokeWidth="2" />
          <circle cx="100" cy="78" r="4" fill="#60a5fa" />

          {/* Status LEDs */}
          <circle cx="40" cy="30" r="3" fill="#22c65e" />
          <circle cx="160" cy="30" r="3" fill="#22c65e" />
          <circle cx="30" cy="85" r="3" fill="#ef4444" />
          <circle cx="170" cy="85" r="3" fill="#ef4444" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Studio Pedestal Glow */}
      <div className="absolute bottom-1 w-32 h-5 bg-sky-500/20 rounded-full blur-md" />
      <img
        src={src}
        alt={alt}
        onError={() => setImageError(true)}
        className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-xl transition-all duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
