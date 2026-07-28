import React, { useState } from 'react';
import { Gauge, ShieldAlert, Zap, Compass, BatteryCharging, Video, Sliders, Play, Pause, Check } from 'lucide-react';

export const DroneSimulatorSection: React.FC = () => {
  const [flightMode, setFlightMode] = useState<'cinematic' | 'sport' | 'agri' | 'night'>('cinematic');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [recording, setRecording] = useState<boolean>(false);

  const modeConfig = {
    cinematic: {
      title: 'Cinematic 4K Smooth Mode',
      speed: 45, // km/h
      altitude: 120, // meters
      battery: 88, // %
      transmission: '15.2 km (O4 HD)',
      cameraSetting: '4K / 60fps HDR • D-Log M',
      obstacleRadar: '360° Omnidirectional Active',
      bgColor: 'from-slate-900 via-blue-950 to-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
    },
    sport: {
      title: 'High-Speed Sport Aerobatic Mode',
      speed: 85, // km/h
      altitude: 210, // meters
      battery: 74, // %
      transmission: '18.0 km (O4 HD)',
      cameraSetting: '4K / 120fps Slow-Mo',
      obstacleRadar: 'Rear & Downward Distance Sensing',
      bgColor: 'from-slate-900 via-amber-950 to-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop'
    },
    agri: {
      title: 'Precision Agriculture Spray Mode',
      speed: 25, // km/h
      altitude: 15, // meters
      battery: 92, // %
      transmission: '10.0 km Centimeter RTK',
      cameraSetting: 'Multispectral NDVI + RGB',
      obstacleRadar: 'Active Phased Array Terrain Follow',
      bgColor: 'from-slate-900 via-emerald-950 to-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop'
    },
    night: {
      title: 'Nightscape LiDAR Inspection Mode',
      speed: 35, // km/h
      altitude: 85, // meters
      battery: 81, // %
      transmission: '12.5 km Thermal Stream',
      cameraSetting: '1" Night CMOS + Thermal Infrared',
      obstacleRadar: 'Forward LiDAR Obstacle Detection',
      bgColor: 'from-slate-900 via-[#070b19] to-slate-900',
      bgImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop'
    }
  };

  const current = modeConfig[flightMode];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 my-0">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0070d2] text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>Interactive Flight Telemetry Simulator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Test-Drive Aero Vision Smart Flight Modes
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Experience real-time flight controls, obstacle avoidance radar, and live camera HUD settings.
        </p>
      </div>

      {/* Simulator HUD Container */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800">
        {/* Background Flight Video/Image Feed */}
        <div className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full overflow-hidden">
          <img
            src={current.bgImage}
            alt={current.title}
            className={`w-full h-full object-cover transition-all duration-700 ${isSimulating ? 'scale-105 filter brightness-90' : 'scale-100 filter brightness-75'
              }`}
            referrerPolicy="no-referrer"
          />
          {/* HUD Overlay Grids & Radar Circle */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none" />

          {/* Central Target Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-48 h-48 border-2 border-sky-400/30 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_12px_#38bdf8]" />
              <div className="absolute top-0 w-0.5 h-4 bg-sky-400/80" />
              <div className="absolute bottom-0 w-0.5 h-4 bg-sky-400/80" />
              <div className="absolute left-0 h-0.5 w-4 bg-sky-400/80" />
              <div className="absolute right-0 h-0.5 w-4 bg-sky-400/80" />
            </div>
          </div>

          {/* Top Control Header HUD */}
          <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-20">
            <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15">
              <span className={`w-3 h-3 rounded-full ${recording ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
                {recording ? 'REC 00:02:45 • 4K HDR' : 'STANDBY • LIVE FEED'}
              </span>
            </div>

            {/* Flight Mode Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-2xl border border-white/15">
              {(['cinematic', 'sport', 'agri', 'night'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFlightMode(mode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${flightMode === mode
                    ? 'bg-[#0070d2] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry Widgets Overlay (Bottom HUD) */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 grid grid-cols-2 md:grid-cols-4 gap-3 z-20">
            {/* Speed Widget */}
            <div className="bg-slate-900/80 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/15">
              <div className="flex items-center space-x-2 text-sky-400 text-xs font-bold mb-1">
                <Gauge className="w-4 h-4" />
                <span>FLIGHT SPEED</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {current.speed} <span className="text-xs font-semibold text-slate-400">km/h</span>
              </div>
            </div>

            {/* Altitude Widget */}
            <div className="bg-slate-900/80 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/15">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold mb-1">
                <Compass className="w-4 h-4" />
                <span>ALTITUDE</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {current.altitude} <span className="text-xs font-semibold text-slate-400">meters</span>
              </div>
            </div>

            {/* Battery Widget */}
            <div className="bg-slate-900/80 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/15">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold mb-1">
                <BatteryCharging className="w-4 h-4" />
                <span>INTELLIGENT BATTERY</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {current.battery}% <span className="text-xs font-semibold text-slate-400">38 min remaining</span>
              </div>
            </div>

            {/* Radar Sensing */}
            <div className="bg-slate-900/80 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/15">
              <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>RADAR SENSING</span>
              </div>
              <div className="text-xs font-semibold text-slate-200 truncate mt-1">
                {current.obstacleRadar}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Controls & Buttons */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{current.title}</span>
            </div>
            <p className="text-xs text-slate-400">
              Camera Feed: {current.cameraSetting} | Signal: {current.transmission}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setRecording(!recording)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 inline-flex items-center space-x-2 cursor-pointer ${recording
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                : 'bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/30 backdrop-blur-md'
                }`}
            >
              <Video className="w-4 h-4" />
              <span>{recording ? 'Stop Recording' : 'Simulate 4K Recording'}</span>
            </button>

            <a
              href="#drones-catalog"
              className="bg-[#0070d2] hover:bg-[#005fb3] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 inline-flex items-center space-x-2"
            >
              <span>Explore Drones in Catalog</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
