import React from 'react';
import { ShoppingBag, Headphones, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';

export const QuickServicesSection: React.FC = () => {
  const services = [
    {
      id: 'where-to-buy',
      icon: ShoppingBag,
      title: 'Where to Buy',
      description: 'Find official online stores, flagship retail locations, and authorized drone dealers.',
      linkText: 'Find Store Near You',
      href: '#where-to-buy',
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    },
    {
      id: 'support',
      icon: Headphones,
      title: 'Global Customer Support',
      description: 'Access 24/7 technical assistance, firmwares, user manuals, and repair services.',
      linkText: 'Get Support',
      href: '#support',
      color: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      id: 'fly-safe',
      icon: ShieldCheck,
      title: 'Fly Safe & Airspace',
      description: 'Check GEO zones, flight tips, safety compliance, and regulatory airspaces.',
      linkText: 'Check Flight Map',
      href: '#fly-safe',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      id: 'care-refresh',
      icon: RefreshCw,
      title: 'Aero Vision Care Refresh',
      description: 'Comprehensive protection plan offering low-cost replacements for accidental damage.',
      linkText: 'Learn Protection Plans',
      href: '#care-refresh',
      color: 'text-purple-600 bg-purple-50 border-purple-100'
    }
  ];

  return (
    <section className="bg-[#0070d2]/10 py-16 md:py-20 mb-0 border-t border-slate-200/80 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0070d2] uppercase tracking-widest">Peace of Mind</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Complete Ecosystem & Service Support
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-start text-left shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/80 group transform hover:-translate-y-1"
              >
                <div>
                  <div className={`p-4 rounded-2xl border ${srv.color} inline-block mb-5 shadow-xs`}>
                    <IconComponent className="w-7 h-7 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                    {srv.description}
                  </p>
                </div>

                <a
                  href={srv.href}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0070d2] hover:text-[#005fb3] group-hover:underline transition-colors"
                >
                  <span>{srv.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
