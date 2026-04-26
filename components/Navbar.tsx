"use client";
import { useState, useEffect } from "react";
import Hero from "./Hero";

const links = [
  { href: "/demo", label: "Check out our Demo !" },
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#strategy", label: "Strategy" },
  { href: "#social", label: "Social Theory" },
  { href: "#impact", label: "Impact" },
  { href: "#team", label: "Team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-950/95 backdrop-blur-md border-b border-white/5"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold tracking-tight flex items-center gap-2">
          <img src="/logo.png" alt="Success Sentinel" className="h-10 w-10" />
          <span className="text-white font-mono">SUCCESS SENTINEL</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 current:text-white hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
