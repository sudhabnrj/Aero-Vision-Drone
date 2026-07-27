import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 300;

const getFrameUrl = (index: number) => {
  const frameNum = String(index + 1).padStart(4, '0');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/extracted_frames_30fps_jpg/frame_${frameNum}.jpg`;
};

export const HeroScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [titleOpacity, setTitleOpacity] = useState<number>(1);

  // Preload frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (i === 0 || count === 1) {
          // Immediately draw initial frame as soon as frame 0 or first image loads
          renderFrame(0);
        }
        if (count >= 15) {
          setIsReady(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // Function to render a specific frame onto the canvas with crisp aspect-cover math
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    const img = imagesRef.current[frameIdx] || imagesRef.current[0];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate aspect ratio cover math
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      drawHeight = height;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // Smooth rAF loop for interpolating frames during scroll
  useEffect(() => {
    const updateLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current = current + diff * 0.25;
        renderFrame(currentFrameRef.current);
      } else if (current !== target) {
        currentFrameRef.current = target;
        renderFrame(target);
      }

      animationFrameIdRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  // Handle scroll position mapping & title fade out logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const scrollFraction = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));

      targetFrameRef.current = scrollFraction * (TOTAL_FRAMES - 1);

      // Title fades out as user scrolls through the first 30% of the section (scrollFraction 0 -> 0.3)
      const opacity = Math.max(0, 1 - (scrollFraction / 0.3));
      setTitleOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[450vh] bg-black mb-0">
      {/* Sticky container for full-screen scroll canvas */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
        />

        {/* Large & Very Bold Display Title behind/integrated with Drone */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none z-10 select-none transition-opacity duration-75 ease-out px-4 text-center"
          style={{ opacity: titleOpacity }}
        >
          <h1 className="text-6xl sm:text-8xl md:text-[8vw] font-black tracking-tighter uppercase text-white/80 drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] font-sans leading-none">
            MAVIC 3 PRO
          </h1>
        </div>

        {/* Minimal loading indicator until initial batch is ready */}
        {loadedCount < TOTAL_FRAMES && (
          <div
            className={`absolute bottom-6 right-6 z-20 pointer-events-none transition-opacity duration-500 ${isReady ? 'opacity-0' : 'opacity-100'
              }`}
          >
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-slate-300 font-mono">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>Loading frames ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
