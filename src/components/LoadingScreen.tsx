import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [isFlyingAway, setIsFlyingAway] = useState<boolean>(false);
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);
  const [isFullyHidden, setIsFullyHidden] = useState<boolean>(false);

  // Smooth progress counter interpolation + max fallback timer
  useEffect(() => {
    const target = Math.min(100, Math.max(0, Math.round(progress)));
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < target) {
          return prev + 1;
        }
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev;
      });
    }, 12);

    // Fallback timer: Force 100% after max 2.5s so loading screen never hangs
    const maxFallbackTimer = setTimeout(() => {
      setDisplayProgress(100);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(maxFallbackTimer);
    };
  }, [progress]);

  // Trigger drone fly-away animation to top-right when 100% reached
  useEffect(() => {
    if (displayProgress >= 100) {
      const flyTimer = setTimeout(() => {
        setIsFlyingAway(true);
      }, 200);

      const fadeTimer = setTimeout(() => {
        setIsFadeOut(true);
      }, 700);

      const hideTimer = setTimeout(() => {
        setIsFullyHidden(true);
      }, 1200);

      return () => {
        clearTimeout(flyTimer);
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [displayProgress]);

  if (isFullyHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ease-out select-none ${
        isFadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Gradient & Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Floating Center Drone */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          className={`transition-all duration-800 ease-in-out transform ${
            isFlyingAway
              ? 'translate-x-[120vw] -translate-y-[120vh] rotate-[28deg] scale-40 opacity-0'
              : 'translate-y-0 scale-100 animate-float'
          }`}
        >
          <img
            src={`${import.meta.env.BASE_URL}loading.png`}
            alt="AeroVision Drone Loading"
            className="w-64 sm:w-80 md:w-[420px] object-contain drop-shadow-[0_20px_50px_rgba(0,112,210,0.5)]"
          />
          {/* Glowing Rotor LED Light Shadow */}
          <div className="w-56 h-6 bg-[#0070d2]/30 blur-xl rounded-full mx-auto -mt-6 animate-pulse" />
        </div>

        {/* Progress Controls & Counter (hides smoothly when drone flies away) */}
        <div
          className={`mt-8 flex flex-col items-center space-y-4 transition-all duration-300 ${
            isFlyingAway ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight drop-shadow-md">
              {displayProgress}%
            </span>
          </div>

          {/* Glowing Progress Track */}
          <div className="w-64 sm:w-80 h-2 bg-slate-800/80 rounded-full overflow-hidden border border-white/10 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#0070d2] via-sky-400 to-blue-400 rounded-full transition-all duration-200 ease-out shadow-[0_0_12px_rgba(0,112,210,0.8)]"
              style={{ width: `${displayProgress}%` }}
            />
          </div>

          <p className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400 font-mono animate-pulse">
            {displayProgress < 100 ? 'Initializing AeroVision Systems...' : 'Systems Ready • Flying In'}
          </p>
        </div>
      </div>
    </div>
  );
};
