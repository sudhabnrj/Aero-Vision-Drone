import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/djiData';

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section className="relative w-full min-h-[82vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-900 group">
      {/* Background Image with smooth transition */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Dark Gradient Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Slide Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-16 pb-12 flex flex-col items-center justify-between min-h-[60vh]">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs sm:text-sm md:text-base font-light tracking-wide text-slate-200 uppercase">
            {currentSlide.category}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            {currentSlide.title}
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl font-medium text-slate-100 drop-shadow">
            {currentSlide.tagline}
          </p>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {currentSlide.buttons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                className="inline-flex items-center text-xs sm:text-sm font-medium px-5 py-2 rounded-full border border-white/60 bg-white/10 hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>

        {/* Carousel Bottom Dash Progress Indicator */}
        <div className="w-full max-w-xs mt-12 flex justify-center items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-12 bg-white'
                  : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full text-white/70 hover:text-white hover:bg-black/30 backdrop-blur-xs transition-all duration-200 cursor-pointer focus:outline-hidden"
        aria-label="Previous Hero Slide"
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full text-white/70 hover:text-white hover:bg-black/30 backdrop-blur-xs transition-all duration-200 cursor-pointer focus:outline-hidden"
        aria-label="Next Hero Slide"
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
      </button>
    </section>
  );
};
