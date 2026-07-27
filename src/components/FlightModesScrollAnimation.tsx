import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FLIGHT_FRAMES = 240;

const getFlightFrameUrl = (index: number) => {
  const frameNum = String(index).padStart(4, '0');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/flight_modes_webp/frame_${frameNum}.webp`;
};

export const FlightModesScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FLIGHT_FRAMES).fill(null));
  const loadingStatusRef = useRef<boolean[]>(new Array(TOTAL_FLIGHT_FRAMES).fill(false));
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);

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
      img.src = getFlightFrameUrl(index);
      img.onload = () => {
        imagesRef.current[index] = img;
        setLoadedCount((prev) => prev + 1);
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

  // Preload initial batch instantly, then stream remaining frames
  useEffect(() => {
    let isMounted = true;

    async function initLoading() {
      // Load first 15 frames for 0ms initial render
      const initialPromises = [];
      for (let i = 0; i < Math.min(15, TOTAL_FLIGHT_FRAMES); i++) {
        initialPromises.push(loadFrame(i));
      }

      await Promise.all(initialPromises);
      if (!isMounted) return;
      renderFrame(0);

      // Stream remaining frames in small non-blocking chunks
      const chunkSize = 10;
      for (let i = 15; i < TOTAL_FLIGHT_FRAMES; i += chunkSize) {
        if (!isMounted) break;
        const chunkPromises = [];
        for (let j = i; j < Math.min(i + chunkSize, TOTAL_FLIGHT_FRAMES); j++) {
          chunkPromises.push(loadFrame(j));
        }
        await Promise.all(chunkPromises);
        await new Promise((r) => setTimeout(r, 10));
      }
    }

    initLoading();

    return () => {
      isMounted = false;
    };
  }, []);

  // Render frame to canvas with aspect-cover math & DPR scaling
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameIdx = Math.max(0, Math.min(TOTAL_FLIGHT_FRAMES - 1, Math.round(index)));

    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete) {
      loadFrame(frameIdx);
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

  // Smooth rAF lerp loop for scroll scrubbing
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

  // Handle scroll position mapping
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const scrollFraction = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));

      const nextTarget = scrollFraction * (TOTAL_FLIGHT_FRAMES - 1);
      targetFrameRef.current = nextTarget;

      const targetIdx = Math.round(nextTarget);
      for (let f = targetIdx; f <= Math.min(targetIdx + 3, TOTAL_FLIGHT_FRAMES - 1); f++) {
        if (!loadingStatusRef.current[f]) {
          loadFrame(f);
        }
      }
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
    <section ref={containerRef} className="relative w-full h-[400vh] bg-black mb-0">
      {/* Full-screen sticky canvas container without text or overlay components */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
        />
      </div>
    </section>
  );
};
