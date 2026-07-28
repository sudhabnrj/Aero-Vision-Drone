import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { FOOTER_DATA } from '../data/djiData';

interface FooterProps {
  onOpenFeedbackModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFeedbackModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#18191c] text-[#a0a4aa] text-xs pt-12 pb-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links Grid (5 Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {FOOTER_DATA.map((col, idx) => (
            <div key={idx} className="space-y-6">
              {/* Primary Column Header */}
              <div className="space-y-3">
                <h4 className="text-white text-xs font-bold tracking-tight uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="hover:text-white transition-colors duration-200 block py-0.5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub-sections if any */}
              {col.sections?.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-3 pt-2">
                  <h4 className="text-white text-xs font-bold tracking-tight uppercase">
                    {sec.title}
                  </h4>
                  <ul className="space-y-2">
                    {sec.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a
                          href={link.href}
                          className="hover:text-white transition-colors duration-200 block py-0.5"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {/* Subscribe Box in 5th Column area */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 space-y-3">
            <h4 className="text-white text-xs font-bold tracking-tight uppercase">
              Subscribe
            </h4>
            <p className="text-[11px] text-slate-400">Get the latest news from Aero Vision</p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#27292d] text-white text-xs px-3 py-2 pr-9 rounded-sm border border-slate-700 focus:outline-hidden focus:border-slate-500 placeholder:text-slate-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Submit newsletter subscription"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-emerald-400 mt-1">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        {/* Middle Brand & Corporate Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Aero Vision Logo Mark */}
            <a href="#" className="text-white font-black text-xl tracking-tighter mr-2">
              Aero Vision
            </a>
            <a href="#who-we-are" className="hover:text-white transition-colors">Who We Are</a>
            <span className="text-slate-700">|</span>
            <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
            <span className="text-slate-700">|</span>
            <a href="#careers" className="hover:text-white transition-colors">Careers</a>
            <span className="text-slate-700">|</span>
            <a href="#dealer-portal" className="hover:text-white transition-colors">Dealer Portal</a>
            <span className="text-slate-700">|</span>
            <a href="#robomaster" className="hover:text-white transition-colors">RoboMaster</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 text-slate-400">
            <a href="#facebook" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
            </a>
            <a href="#twitter" className="hover:text-white transition-colors" aria-label="X / Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="#youtube" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
            <a href="#tiktok" className="hover:text-white transition-colors" aria-label="TikTok">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.04.83.1v-3.5a6.37 6.37 0 00-1-.08A6.26 6.26 0 003 15.5a6.26 6.26 0 0010.5 4.5V10a8.16 8.16 0 005.09 1.76V8.26a4.85 4.85 0 01-2.09-.57z" /></svg>
            </a>
            <a href="#instagram" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Aero Vision Privacy Policy</a>
            <span>•</span>
            <a href="#cookies" className="hover:text-slate-300 transition-colors">Use of Cookies</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#business" className="hover:text-slate-300 transition-colors">Business Information</a>
            <span>•</span>
            <a href="#accessibility" className="hover:text-slate-300 transition-colors">Accessibility</a>
          </div>

          <div className="flex items-center space-x-4">
            <span>Copyright © 2026 Aero Vision All Rights Reserved.</span>

          </div>
        </div>
      </div>
    </footer>
  );
};
