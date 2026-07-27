import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 300;

const getFrameUrl = (index: number) => {
  const frameNum = String(index + 1).padStart(4, '0');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/extracted_frames_webp/frame_${frameNum}.webp`;
};

interface HeroScrollAnimationProps {
  onProgress?: (percent: number) => void;
}

export const HeroScrollAnimation: React.FC<HeroScrollAnimationProps> = ({ onProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadingStatusRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [titleOpacity, setTitleOpacity] = useState<number>(1);

  // Helper to load a single frame on demand
  const loadFrame = (index: number): Promise<HTMLImageElement> => {
    if (imagesRef.current[index] && imagesRef.current[index]?.complete) {
      return Promise.resolve(imagesRef.current[index]!);
    }

    if (loadingStatusRef.current[index] && imagesRef.current[index]) {
      return new Promise((resolve) => {
        const img = imagesRef.current[index]!;
        if (img.complete) resolve(img);
        else img.onload = () => resolve(img);
      });
    }

    loadingStatusRef.current[index] = true;
    return new Promise((resolve) => {
      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        imagesRef.current[index] = img;
        setLoadedCount((prev) => {
          const next = prev + 1;
          if (next >= 10) setIsReady(true);
          return next;
        });
        if (Math.round(currentFrameRef.current) === index) {
          renderFrame(index);
        }
        resolve(img);
      };
      img.onerror = () => {
        loadingStatusRef.current[index] = false;
        setLoadedCount((prev) => prev + 1);
        resolve(img);
      };
      imagesRef.current[index] = img;
    });
  };

  // Dedicated effect to notify parent of progress without React render warnings
  useEffect(() => {
    if (onProgress) {
      const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
      onProgress(pct);
    }
  }, [loadedCount, onProgress]);

  // Preload initial batch instantly, then queue remaining frames
  useEffect(() => {
    let isMounted = true;

    async function initLoading() {
      // 1. Immediately load first 15 frames for 0ms initial render
      const initialPromises = [];
      for (let i = 0; i < Math.min(15, TOTAL_FRAMES); i++) {
        initialPromises.push(loadFrame(i));
      }

      await Promise.all(initialPromises);
      if (!isMounted) return;
      setIsReady(true);
      renderFrame(0);

      // 2. Stream load remaining frames in small non-blocking chunks
      const chunkSize = 10;
      for (let i = 15; i < TOTAL_FRAMES; i += chunkSize) {
        if (!isMounted) break;
        const chunkPromises = [];
        for (let j = i; j < Math.min(i + chunkSize, TOTAL_FRAMES); j++) {
          chunkPromises.push(loadFrame(j));
        }
        await Promise.all(chunkPromises);
        await new Promise((r) => setTimeout(r, 10));
      }

      if (isMounted && onProgress) {
        onProgress(100);
      }
    }

    initLoading();

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
    
    // Find nearest loaded frame if target is still downloading
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete) {
      // Priority load target frame
      loadFrame(frameIdx);
      // Fallback to nearest loaded frame for instant display
      for (let offset = 1; offset < 20; offset++) {
        const prev = imagesRef.current[frameIdx - offset];
        if (prev && prev.complete) { img = prev; break; }
        const next = imagesRef.current[frameIdx + offset];
        if (next && next.complete) { img = next; break; }
      }
    }

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
      
      const nextTarget = scrollFraction * (TOTAL_FRAMES - 1);
      targetFrameRef.current = nextTarget;

      // Eagerly prefetch target frame and next 3 frames on scroll
      const targetIdx = Math.round(nextTarget);
      for (let f = targetIdx; f <= Math.min(targetIdx + 3, TOTAL_FRAMES - 1); f++) {
        if (!loadingStatusRef.current[f]) {
          loadFrame(f);
        }
      }

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
            className={`absolute bottom-6 right-6 z-20 pointer-events-none transition-opacity duration-500 ${
              isReady ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-slate-300 font-mono">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>Optimized frames ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
