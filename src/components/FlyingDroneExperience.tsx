import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  ShieldCheck,
  Radio,
  BatteryCharging,
  Sparkles,
  Compass,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Target,
  Zap,
  RotateCcw
} from 'lucide-react';

interface FeaturePoint {
  id: number;
  title: string;
  tagline: string;
  category: string;
  icon: React.ElementType;
  specs: string[];
  hudPosition: { x: number; y: number }; // Drone position percentage
  droneAngle: number; // degrees
  details: string;
  highlightColor: string;
}

const DRONE_FEATURES: FeaturePoint[] = [
  {
    id: 1,
    title: '4/3 CMOS Hasselblad Camera',
    tagline: 'Professional 5.1K Cinema Optics',
    category: 'Imaging System',
    icon: Camera,
    specs: ['5.1K / 50fps Video', '12.8 Stops Dynamic Range', '10-Bit D-Log M Color'],
    hudPosition: { x: 20, y: 35 },
    droneAngle: -5,
    details: 'Iconic Swedish brand Hasselblad designed the L2D-20c aerial camera, embedding a professional-grade 4/3 CMOS in an ultra-compact space.',
    highlightColor: 'from-sky-500 to-blue-600'
  },
  {
    id: 2,
    title: '360° Omnidirectional APAS 5.0 Radar',
    tagline: 'Zero-Collision Smart Flight Safeguard',
    category: 'Safety Systems',
    icon: ShieldCheck,
    specs: ['APAS 5.0 Auto-Rerouting', '8 Vision Sensors', 'Nightscape LiDAR Assist'],
    hudPosition: { x: 45, y: 25 },
    droneAngle: 8,
    details: 'Mavic 3 Pro senses objects in all directions and plans a smooth, safe flight route around obstacles even when flying in complex urban environments.',
    highlightColor: 'from-[#0070d2] to-cyan-400'
  },
  {
    id: 3,
    title: 'O4 Flagship HD Transmission',
    tagline: '20 km Low-Latency Live Video Link',
    category: 'Communication',
    icon: Radio,
    specs: ['20 km Max Range', '1080p/60fps Live Feed', 'Dual-Band Auto Switching'],
    hudPosition: { x: 75, y: 40 },
    droneAngle: -3,
    details: 'The next-generation O4 transmission system enables up to 20 km of transmission distance with superior anti-interference stability.',
    highlightColor: 'from-blue-500 to-purple-600'
  },
  {
    id: 4,
    title: '46-Min Intelligent Flight Endurance',
    tagline: 'Maximum Airtime for Master Shots',
    category: 'Power Management',
    icon: BatteryCharging,
    specs: ['46 Minutes Max Flight', 'Self-Heating Battery', 'Fast USB-C Charging Hub'],
    hudPosition: { x: 50, y: 65 },
    droneAngle: 12,
    details: 'Custom high-density energy cells coupled with optimized aerodynamic props deliver 50% longer flight durations than previous generations.',
    highlightColor: 'from-emerald-400 to-[#0070d2]'
  },
  {
    id: 5,
    title: 'FocusTrack & ActiveTrack 5.0 AI',
    tagline: 'Autonomous AI Cinematography',
    category: 'Automated AI',
    icon: Sparkles,
    specs: ['Spotlight 2.0 Tracking', 'Point of Interest 3.0', 'MasterShots AI Templates'],
    hudPosition: { x: 25, y: 70 },
    droneAngle: -8,
    details: 'Select your subject and let the drone automatically follow, orbit, or execute professional Hollywood camera movements effortlessly.',
    highlightColor: 'from-amber-400 to-sky-500'
  }
];

export const FlyingDroneExperience: React.FC = () => {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentFeature = DRONE_FEATURES[activeFeatureIdx];

  // Auto-advance features every 5 seconds
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveFeatureIdx((prev) => (prev + 1) % DRONE_FEATURES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleNext = () => {
    setAutoPlay(false);
    setActiveFeatureIdx((prev) => (prev + 1) % DRONE_FEATURES.length);
  };

  const handlePrev = () => {
    setAutoPlay(false);
    setActiveFeatureIdx((prev) => (prev === 0 ? DRONE_FEATURES.length - 1 : prev - 1));
  };

  const handleSelectFeature = (idx: number) => {
    setAutoPlay(false);
    setActiveFeatureIdx(idx);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 pt-0 mb-0">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#0070d2] text-xs font-bold uppercase tracking-wider border border-sky-200">
          <Zap className="w-4 h-4" />
          <span>Interactive Flight Exploration</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Watch the Drone Fly & Unlock Core Features
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Hover through air space to inspect the optical camera, 360° obstacle radar, O4 transmission, and AI tracking modes.
        </p>
      </div>

      {/* Main Interactive Animated Flight Canvas */}
      <div
        ref={containerRef}
        className="relative min-h-[560px] sm:min-h-[620px] rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800 p-6 sm:p-10 flex flex-col justify-between"
      >
        {/* Futuristic Grid & Cyberpunk Sky Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Background image overlay */}
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
            alt="Drone Sky Flight Background"
            className="w-full h-full object-cover opacity-25 filter brightness-50 contrast-125"
            referrerPolicy="no-referrer"
          />
          {/* Horizon & Radar grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,112,210,0.15)_0,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Top Flight HUD Bar */}
        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
                FLIGHT PATROL WAYPOINT 0{currentFeature.id} / 0{DRONE_FEATURES.length}
              </span>
              <h3 className="text-lg font-bold text-white">{currentFeature.category}</h3>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/15">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 inline-flex items-center space-x-1.5 cursor-pointer ${autoPlay ? 'bg-sky-500 text-white' : 'bg-white/10 text-slate-300 hover:text-white'
                }`}
            >
              {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{autoPlay ? 'Autopilot Active' : 'Manual Nav'}</span>
            </button>

            <button
              onClick={handlePrev}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Previous Feature"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Next Feature"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Flight Stage: Flying Drone with Motion Positioning */}
        <div className="relative z-10 my-auto h-72 sm:h-80 w-full overflow-hidden">
          {/* Waypoint Target Reticle */}
          {DRONE_FEATURES.map((feat, idx) => {
            const isActive = idx === activeFeatureIdx;
            return (
              <button
                key={feat.id}
                onClick={() => handleSelectFeature(idx)}
                style={{ left: `${feat.hudPosition.x}%`, top: `${feat.hudPosition.y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 cursor-pointer z-10"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isActive
                    ? 'border-sky-400 bg-sky-500/30 shadow-[0_0_20px_#38bdf8] scale-125'
                    : 'border-white/30 bg-slate-900/60 hover:border-white hover:scale-110'
                    }`}
                >
                  <Target
                    className={`w-4 h-4 ${isActive ? 'text-sky-300 animate-spin-slow' : 'text-slate-400'}`}
                  />
                </div>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold whitespace-nowrap bg-black/80 px-2 py-0.5 rounded-md border border-white/10 text-slate-300 group-hover:text-white">
                  0{feat.id}. {feat.title.split(' ')[0]}
                </span>
              </button>
            );
          })}

          {/* Dynamic Animated Flying Drone Entity */}
          <motion.div
            animate={{
              left: `${currentFeature.hudPosition.x}%`,
              top: `${currentFeature.hudPosition.y}%`,
              rotate: currentFeature.droneAngle
            }}
            transition={{
              type: 'spring',
              stiffness: 45,
              damping: 12,
              mass: 1
            }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
          >
            {/* Radar Pulse Rings from Flying Drone */}
            <div className="absolute inset-0 -m-8 w-36 h-36 rounded-full border border-sky-400/40 animate-ping pointer-events-none" />

            {/* Drone Vector Graphic */}
            <div className="relative w-28 sm:w-36 h-20 sm:h-24 filter drop-shadow-[0_10px_25px_rgba(0,112,210,0.6)]">
              <svg
                viewBox="0 0 200 120"
                className="w-full h-full text-sky-400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Rotors Left Top */}
                <ellipse cx="40" cy="30" rx="28" ry="8" stroke="currentColor" strokeWidth="2" className="animate-spin-slow opacity-80" />
                <line x1="40" y1="30" x2="70" y2="50" stroke="currentColor" strokeWidth="3" />
                {/* Rotors Right Top */}
                <ellipse cx="160" cy="30" rx="28" ry="8" stroke="currentColor" strokeWidth="2" className="animate-spin-slow opacity-80" />
                <line x1="160" y1="30" x2="130" y2="50" stroke="currentColor" strokeWidth="3" />

                {/* Rotors Left Bottom */}
                <ellipse cx="30" cy="85" rx="28" ry="8" stroke="currentColor" strokeWidth="2" className="animate-spin-slow opacity-80" />
                <line x1="30" y1="85" x2="75" y2="65" stroke="currentColor" strokeWidth="3" />
                {/* Rotors Right Bottom */}
                <ellipse cx="170" cy="85" rx="28" ry="8" stroke="currentColor" strokeWidth="2" className="animate-spin-slow opacity-80" />
                <line x1="170" y1="85" x2="125" y2="65" stroke="currentColor" strokeWidth="3" />

                {/* Central Body Fuselage */}
                <rect x="70" y="42" width="60" height="32" rx="16" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                {/* Gimbal Camera Pod */}
                <circle cx="100" cy="78" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="100" cy="78" r="5" fill="#38bdf8" className="animate-pulse" />

                {/* Status LEDs */}
                <circle cx="40" cy="30" r="3" fill="#22c65e" />
                <circle cx="160" cy="30" r="3" fill="#22c65e" />
                <circle cx="30" cy="85" r="3" fill="#ef4444" />
                <circle cx="170" cy="85" r="3" fill="#ef4444" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Bottom Active Feature HUD Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-20 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/15 grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
          >
            {/* Feature Info */}
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${currentFeature.highlightColor} text-white shadow-md`}>
                  <currentFeature.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                  {currentFeature.tagline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentFeature.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {currentFeature.details}
              </p>

              {/* Spec Bullets */}
              <div className="pt-2 flex flex-wrap gap-2">
                {currentFeature.specs.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-medium text-slate-200 border border-white/10"
                  >
                    • {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature Quick CTA */}
            <div className="flex flex-col items-stretch md:items-end justify-center gap-3 pt-4 md:pt-0 md:border-l border-white/10 md:pl-6">
              <a
                href="#drones-catalog"
                className="w-full text-center px-6 py-3 rounded-full bg-[#0070d2] hover:bg-[#005fb3] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 inline-flex items-center justify-center space-x-2"
              >
                <span>Buy Drone with {currentFeature.title.split(' ')[0]}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-slate-400">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>GPS Lock: 24 Satellites Active</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Feature Pagination Dots */}
        <div className="relative z-20 flex items-center justify-center space-x-2 pt-6">
          {DRONE_FEATURES.map((feat, idx) => (
            <button
              key={feat.id}
              onClick={() => handleSelectFeature(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeFeatureIdx === idx ? 'w-10 bg-sky-400' : 'w-2.5 bg-white/20 hover:bg-white/50'
                }`}
              aria-label={`Go to feature ${feat.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
