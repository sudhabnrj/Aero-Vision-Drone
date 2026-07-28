import React, { useState } from 'react';
import { Heart, MessageSquare, Play, Globe, Camera, Award, ExternalLink, X } from 'lucide-react';

export const SkyPixelCommunitySection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const creatorPosts = [
    {
      id: 'post-1',
      author: 'Elena Rostova',
      location: 'Icelandic Glacier Valleys',
      title: 'Frozen Crystal River Run',
      drone: 'Aero Vision Mavic 3 Pro',
      cameraInfo: '24mm • f/2.8 • ISO 100 • 1/1000s',
      likes: '14.2K',
      comments: '382',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    {
      id: 'post-2',
      author: 'Marcus Vance',
      location: 'Tokyo City Lights at Twilight',
      title: 'Neon Odyssey 8K',
      drone: 'Aero Vision Air 3S',
      cameraInfo: '70mm Tele • f/2.8 • ISO 400 • 1/60s',
      likes: '18.9K',
      comments: '512',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    {
      id: 'post-3',
      author: 'Sarah Chen',
      location: 'Dolomites Alpine Peaks',
      title: 'Sunrise Ridge Dive FPV',
      drone: 'Aero Vision Avata 2',
      cameraInfo: '157° Ultra-Wide • 4K/120fps • D-Log M',
      likes: '22.1K',
      comments: '890',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 my-0 pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Globe className="w-4 h-4" />
            <span>SkyPixel Global Creators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Inspired by 10M+ SkyPixel Aerial Creators
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
            Explore award-winning master shots, EXIF camera settings, and 4K cinema projects created with Aero Vision gear.
          </p>
        </div>
      </div>

      {/* Creator Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {creatorPosts.map((post) => (
          <div
            key={post.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between transform hover:-translate-y-1.5"
          >
            {/* Image Preview Container */}
            <div className="relative h-60 sm:h-64 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Play Overlay Button */}
              <button
                onClick={() => setSelectedVideo(post.title)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#0070d2] transition-all duration-300 cursor-pointer"
              >
                <Play className="w-6 h-6 fill-white ml-1" />
              </button>

              {/* Drone Tag */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                {post.drone}
              </div>
            </div>

            {/* Author Info & Story */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{post.author}</h4>
                  <p className="text-xs text-slate-500">{post.location}</p>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0070d2] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <Camera className="w-3.5 h-3.5 inline mr-1.5 text-blue-500" />
                  {post.cameraInfo}
                </p>
              </div>

              {/* Engagement Counter */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1 font-semibold text-rose-500">
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1 font-semibold text-slate-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </span>
                </div>

                <button
                  onClick={() => setSelectedVideo(post.title)}
                  className="text-xs font-bold text-[#0070d2] hover:underline cursor-pointer"
                >
                  Watch Aerial Reel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 space-y-4 relative border border-slate-700 shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white">{selectedVideo} - 4K Master Reel</h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
              <div className="text-center p-8 space-y-3">
                <Play className="w-16 h-16 text-[#0070d2] mx-auto animate-pulse" />
                <p className="text-sm font-semibold text-slate-300">
                  Simulated 4K SkyPixel Aerial Reel playing for: {selectedVideo}
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-6 py-2.5 rounded-full bg-[#0070d2] hover:bg-[#005fb3] text-white text-xs font-bold cursor-pointer"
              >
                Close Video Player
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
