import React from 'react';
import { INNOVATION_ITEMS } from '../data/djiData';
import { Lightbulb, ArrowUpRight, Award, FileText } from 'lucide-react';

export const InnovationSection: React.FC = () => {
  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white  my-0 border-b border-slate-100">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-[#0070d2] text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Pioneering Robotics & AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Standing at the Forefront of Innovation
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            As we explore new technology, we push the capabilities of what is possible, driving industry progress through continuous breakthroughs.
          </p>
        </div>

        {/* 2 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INNOVATION_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="group relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-8 sm:p-10 border border-slate-200/80 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                {/* Soft overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/20" />
              </div>

              {/* Top Category Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                  {idx === 0 ? <FileText className="w-3.5 h-3.5 text-blue-600" /> : <Award className="w-3.5 h-3.5 text-amber-500" />}
                  <span>{item.category}</span>
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                  {item.title}
                </h3>

                {/* Attractive Button */}
                <div>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-[#0070d2] hover:text-white text-xs sm:text-sm font-bold shadow-xl transition-all duration-300 group/btn"
                  >
                    <span>{item.linkText.replace('>', '').trim()}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
