import React from 'react';
import { FIELD_ITEMS } from '../data/djiData';
import { Video, Building2, Sprout, ArrowRight, Layers } from 'lucide-react';

export const FieldsSection: React.FC = () => {
  const getFieldIcon = (id: string) => {
    switch (id) {
      case 'video-production':
        return <Video className="w-6 h-6 text-sky-400" />;
      case 'enterprise':
        return <Building2 className="w-6 h-6 text-amber-400" />;
      case 'agriculture':
        return <Sprout className="w-6 h-6 text-emerald-400" />;
      default:
        return <Layers className="w-6 h-6 text-[#0070d2]" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0070d2]">Specialized Ecosystems</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Explore Aero Vision Solutions Across Industries
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          From Hollywood filmmaking to smart agricultural drone spraying, see how Aero Vision empowers professionals worldwide.
        </p>
      </div>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FIELD_ITEMS.map((field) => (
          <div
            key={field.id}
            className="group relative h-[460px] sm:h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-8 text-white border border-slate-200/50 transform hover:-translate-y-2"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={field.image}
                alt={field.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20 group-hover:via-slate-950/40 transition-colors" />
            </div>

            {/* Top Icon Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 shadow-lg">
                {getFieldIcon(field.id)}
              </div>
              <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
                Professional Grade
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                {field.title}
              </h3>
              <p className="text-xs sm:text-sm font-normal text-slate-200 leading-relaxed drop-shadow-xs">
                {field.description}
              </p>

              {/* Attractive Button */}
              <div className="pt-2">
                <a
                  href={`#field-${field.id}`}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 border border-white/30 backdrop-blur-md text-xs font-bold transition-all duration-300 shadow-md group/link"
                >
                  <span>Explore Industry Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
