"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.35 + 0.08,
      });
    }

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20,184,166,${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(20,184,166,${0.05 * (1 - dist / 130)})`;
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,rgba(20,184,166,0.07),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-semibold tracking-wide mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          CMU · 67-250 Information Systems People Project
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-[1.08]">
          <span className="text-white">Catch students</span>
          <br />
          <span className="italic text-teal-400">before they fall.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          <b className="text-white font-semibold">Success Sentinel </b>is an AI-powered <b className="text-white">student success platform </b> that unifies academic,
          attendance, and engagement data to <b className="text-white font-semibold">identify at-risk students early</b>, so advisors can
          intervene before it&apos;s too late.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#problem"
            className="px-7 py-3.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors duration-200"
          >
            Explore the Problem
          </a>
          <a
            href="#solution"
            className="px-7 py-3.5 rounded-lg border border-white/15 hover:border-white/30 hover:bg-white/5 text-white font-semibold text-sm transition-colors duration-200"
          >
            See the Solution
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs">
        <span className="uppercase tracking-widest text-[10px]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-teal-500/40 to-transparent" />
      </div>
    </section>
  );
}
