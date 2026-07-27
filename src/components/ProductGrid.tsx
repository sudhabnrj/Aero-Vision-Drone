import React, { useState } from 'react';
import { PRODUCT_CARDS } from '../data/djiData';
import { ProductCard } from '../types';
import { ArrowRight, ShoppingCart, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { DroneGraphic } from './DroneGraphic';

interface ProductGridProps {
  onSelectProduct?: (card: ProductCard) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct }) => {
  const [filter, setFilter] = useState<string>('all');

  // Ensure maximum 6 products display in a clean 3x2 grid layout (3 columns)
  const filteredCards = PRODUCT_CARDS.filter((card) => {
    if (filter === 'camera') return card.category.toLowerCase().includes('camera') || card.category.toLowerCase().includes('fpv') || card.category.toLowerCase().includes('travel');
    if (filter === 'agri') return card.category.toLowerCase().includes('agriculture');
    if (filter === 'enterprise') return card.category.toLowerCase().includes('enterprise') || card.category.toLowerCase().includes('inspection');
    return true;
  }).slice(0, 6);

  return (
    <section id="drones-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-[#0070d2] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flagship Aerial Lineup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Aero Vision Drone Technology
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
            Choose from 6 flagship drones engineered for aerial cinematography, precision agriculture, and commercial operations.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          {[
            { id: 'all', label: 'All Drones (6)' },
            { id: 'camera', label: 'Camera & FPV' },
            { id: 'agri', label: 'Agriculture' },
            { id: 'enterprise', label: 'Enterprise' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                filter === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3x2 Grid Container (3 columns on medium/large screens) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="group relative bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] hover:from-white hover:to-[#f8fafc] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl border border-slate-200/80 hover:border-blue-300 overflow-hidden transform hover:-translate-y-1.5"
          >
            {/* Top Badges */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-tight text-slate-500 uppercase">
                {card.category}
              </span>
              {card.isNew && (
                <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white tracking-wider uppercase shadow-xs">
                  NEW
                </span>
              )}
              {card.isBestSeller && (
                <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white tracking-wider uppercase shadow-xs">
                  BEST SELLER
                </span>
              )}
            </div>

            {/* Product Title & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#0070d2] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed min-h-[36px]">
                {card.subtitle}
              </p>
            </div>

            {/* Drone Image Rendering with Fallback */}
            <div className="my-6 w-full h-48 sm:h-52">
              <DroneGraphic src={card.image} alt={card.imageAlt} modelId={card.id} className="w-full h-full" />
            </div>

            {/* Features / Specs Bullets */}
            {card.specs && (
              <div className="space-y-1.5 mb-5 bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/60 shadow-2xs">
                {card.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center text-[11px] text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mr-1.5 shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Price Tag Section */}
            <div className="flex items-baseline justify-between pt-3 border-t border-slate-200/70 mb-5">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {card.price}
                </span>
                {card.originalPrice && (
                  <span className="ml-2 text-xs font-semibold text-slate-400 line-through">
                    {card.originalPrice}
                  </span>
                )}
              </div>
              {card.rating && (
                <div className="flex items-center text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  <span>{card.rating}</span>
                </div>
              )}
            </div>

            {/* Standardized Attractive Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`#${card.id}-details`}
                className="w-full inline-flex items-center justify-center space-x-1.5 py-3 px-4 rounded-full border border-slate-300 hover:border-slate-800 bg-white/10 hover:bg-slate-900 hover:text-white text-slate-800 text-xs sm:text-sm font-bold shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group/btn"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => onSelectProduct && onSelectProduct(card)}
                className="w-full inline-flex items-center justify-center space-x-1.5 py-3 px-4 rounded-full bg-[#0070d2] hover:bg-[#005fb3] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
