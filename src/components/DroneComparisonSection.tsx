import React, { useState } from 'react';
import { Check, ShoppingCart, ArrowRight, ShieldCheck, Zap, Scale, Video, Battery, Radio } from 'lucide-react';
import { DroneGraphic } from './DroneGraphic';
import { ProductCard } from '../types';
import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p5 from '../../assets/p5.png';

interface DroneComparisonSectionProps {
  onSelectProduct?: (product: ProductCard) => void;
}

export const DroneComparisonSection: React.FC<DroneComparisonSectionProps> = ({ onSelectProduct }) => {
  const [selectedSpec, setSelectedSpec] = useState<'camera' | 'flight' | 'transmission' | 'weight'>('camera');

  const compareModels = [
    {
      id: 'mavic-3-pro',
      category: 'Flagship Camera Drone',
      name: 'Aero Vision Mavic 3 Pro',
      price: '$2,199',
      camera: 'Triple Camera (4/3 CMOS Hasselblad)',
      flightTime: '43 Minutes Max',
      transmission: '15 km O4 Transmission',
      weight: '958g Pro Foldable',
      payload: 'Integrated Triple Gimbal',
      image: p2,
      badge: 'Best for Filmmakers'
    },
    {
      id: 'mini-4-pro',
      category: 'Ultralight Palm Drone',
      name: 'Aero Vision Mini 4 Pro',
      price: '$759',
      camera: '1/1.3" CMOS 4K/60fps HDR',
      flightTime: '34 Minutes Max',
      transmission: '20 km O4 Transmission',
      weight: '< 249g Registration Free',
      payload: 'True Vertical Gimbal',
      image: p5,
      badge: 'Best for Travelers'
    },
    {
      id: 'agras-t100',
      category: 'Smart Agriculture Drone',
      name: 'Aero Vision Agras T100',
      price: '$14,999',
      camera: 'Multispectral NDVI + RGB',
      flightTime: '22 Minutes Heavy Load',
      transmission: '10 km Centimeter RTK',
      weight: '50 kg Spray Payload',
      payload: '50L Atomizing Spray Tank',
      image: p1,
      badge: 'Best for Agriculture'
    }
  ];

  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 my-0 bg-[#0070d2]/10">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0070d2] text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Interactive Specifications Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Compare Flagship Drone Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Side-by-side comparison of camera sensors, max flight times, video transmission, and payload weights.
          </p>
        </div>

        {/* Feature Focus Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'camera', label: 'Camera & Optics', icon: Video },
            { id: 'flight', label: 'Battery & Flight Time', icon: Battery },
            { id: 'transmission', label: 'Video Transmission', icon: Radio },
            { id: 'weight', label: 'Weight & Payload', icon: Zap }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedSpec(tab.id as any)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer ${selectedSpec === tab.id
                  ? 'bg-[#0070d2] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3 Column Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {compareModels.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    {model.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-[#0070d2] uppercase border border-blue-100">
                    {model.badge}
                  </span>
                </div>

                {/* Drone Graphic */}
                <div className="w-full h-44 my-4">
                  <DroneGraphic src={model.image} alt={model.name} className="w-full h-full" />
                </div>

                {/* Title & Price */}
                <div className="text-center my-4 space-y-1">
                  <h3 className="text-xl font-black text-slate-900">{model.name}</h3>
                  <div className="text-2xl font-black text-[#0070d2]">{model.price}</div>
                </div>

                {/* Specs Breakdown */}
                <div className="space-y-3 my-6 pt-4 border-t border-slate-100 text-xs">
                  <div className={`p-3 rounded-2xl transition-colors ${selectedSpec === 'camera' ? 'bg-blue-50 border border-blue-200 font-bold text-slate-900' : 'bg-slate-50 text-slate-700'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono">Camera Sensor</span>
                    <span>{model.camera}</span>
                  </div>

                  <div className={`p-3 rounded-2xl transition-colors ${selectedSpec === 'flight' ? 'bg-blue-50 border border-blue-200 font-bold text-slate-900' : 'bg-slate-50 text-slate-700'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono">Max Flight Time</span>
                    <span>{model.flightTime}</span>
                  </div>

                  <div className={`p-3 rounded-2xl transition-colors ${selectedSpec === 'transmission' ? 'bg-blue-50 border border-blue-200 font-bold text-slate-900' : 'bg-slate-50 text-slate-700'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono">Transmission Range</span>
                    <span>{model.transmission}</span>
                  </div>

                  <div className={`p-3 rounded-2xl transition-colors ${selectedSpec === 'weight' ? 'bg-blue-50 border border-blue-200 font-bold text-slate-900' : 'bg-slate-50 text-slate-700'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono">Weight / Payload</span>
                    <span>{model.weight}</span>
                  </div>
                </div>
              </div>

              {/* Standardized Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`#${model.id}-learn`}
                  className="w-full inline-flex items-center justify-center space-x-1.5 py-3 px-3 rounded-full border border-slate-300 hover:border-slate-800 bg-white/10 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-bold shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group/btn"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={() => onSelectProduct && onSelectProduct({
                    id: model.id,
                    category: model.category,
                    title: model.name,
                    subtitle: model.badge,
                    price: model.price,
                    image: model.image,
                    imageAlt: model.name,
                    links: []
                  })}
                  className="w-full inline-flex items-center justify-center space-x-1.5 py-3 px-3 rounded-full bg-[#0070d2] hover:bg-[#005fb3] text-white text-xs font-bold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
