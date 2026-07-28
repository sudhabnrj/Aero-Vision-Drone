import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera, Play, Eye, ShoppingCart, Info } from 'lucide-react';
import { SHOT_ON_SLIDES } from '../data/djiData';

export const ShotOnSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? SHOT_ON_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === SHOT_ON_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const current = SHOT_ON_SLIDES[activeSlide];

  return (
    <section className="w-full py-16 md:py-20 my-0 overflow-hidden bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-sky-400 backdrop-blur-md border border-white/10">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Cinematography Gallery</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Shot on Aero Vision Aerial Cameras
              </h2>
            </div>
          </div>

          {/* Quick Telemetry Tag */}
          <div className="hidden md:flex items-center space-x-3 text-xs font-mono text-slate-300 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <span>4K / 60fps HDR</span>
            <span className="text-slate-600">•</span>
            <span>10-Bit D-Log M</span>
            <span className="text-slate-600">•</span>
            <span>24mm f/1.7</span>
          </div>
        </div>

        {/* Banner Frame */}
        <div className="relative min-h-[480px] sm:min-h-[560px] md:min-h-[620px] rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-12 group shadow-2xl border border-white/10">
          {/* Background Image with smooth transition */}
          <div className="absolute inset-0 z-0">
            <img
              src={current.image}
              alt={current.caption}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay for high legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60" />
          </div>

          {/* Top Camera HUD Overlay */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>RAW Master Capture</span>
            </span>

            <div className="flex items-center space-x-2">
              {SHOT_ON_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`relative rounded-xl overflow-hidden h-12 w-16 border-2 transition-all cursor-pointer ${activeSlide === idx ? 'border-sky-400 scale-105 shadow-md' : 'border-white/30 opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Center Title and Attractive Buttons */}
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-3 my-auto">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-sky-300 uppercase drop-shadow-sm">
              {current.title}
            </span>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">
              {current.subtitle}
            </h3>
            <p className="text-xs sm:text-base text-slate-200 font-light max-w-lg mx-auto leading-relaxed drop-shadow-sm">
              {current.caption}
            </p>

            {/* Enhanced Styled Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#shot-on-learn"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 border border-white/30 backdrop-blur-md text-xs sm:text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <Eye className="w-4 h-4" />
                <span>Explore Showcase</span>
              </a>

              <a
                href="#shot-on-buy"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#0070d2] hover:bg-[#005fb3] text-white text-xs sm:text-sm font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Buy Drone Combo</span>
              </a>
            </div>
          </div>

          {/* Bottom HUD Bar & Controls */}
          <div className="relative z-10 flex items-center justify-between text-xs text-white/90 pt-6 border-t border-white/15">
            <div className="flex items-center space-x-4">
              <span className="font-mono text-[11px] text-slate-300">
                0{activeSlide + 1} / 0{SHOT_ON_SLIDES.length}
              </span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="hidden sm:inline font-medium text-slate-200">
                Aerial Master Shot Series
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-90"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-90"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
