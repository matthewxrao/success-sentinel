"use client";
import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";

interface CarouselProps {
  items: React.ReactNode[];
  interval?: number;
  className?: string;
}

export default function Carousel({ items, interval = 4500, className = "" }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [height, setHeight] = useState<number>(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const count = items.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [paused, next, interval, count]);

  // Synchronous measurement before paint — prevents the async height delta that
  // triggers browser scroll anchoring when the carousel is above the viewport.
  // items-start on the track means offsetHeight = own content height, not stretched.
  useLayoutEffect(() => {
    const el = slideRefs.current[current];
    if (el) setHeight(el.offsetHeight);
  }, [current]);

  // ResizeObserver only for window-resize responsiveness (e.g. SVG aspect-ratio
  // slides). Wrapped in rAF to batch with the browser's own reflow and avoid
  // ResizeObserver loop warnings.
  useEffect(() => {
    const el = slideRefs.current[current];
    if (!el) return;
    let raf = 0;
    const obs = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setHeight(el.offsetHeight));
    });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [current]);

  return (
    <div
      className={`relative ${className}`}
      style={{ overflowAnchor: "none" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track — height animates to match current slide */}
      <div
        className="overflow-hidden rounded-xl"
        style={{
          height: height > 0 ? `${height}px` : "auto",
          transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowAnchor: "none",
        }}
      >
        <div
          className="flex items-start transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="w-full shrink-0 px-25"
              ref={(el) => { slideRefs.current[i] = el; }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-navy-950/80 backdrop-blur border border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/40 transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-navy-950/80 backdrop-blur border border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/40 transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5.5 2.5L10 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="flex justify-center gap-1.5 mt-5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-teal-400" : "w-1.5 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
