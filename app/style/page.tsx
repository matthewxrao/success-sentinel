import CarouselDemo from "./CarouselDemo";

export const metadata = { title: "Style Guide - Success Sentinel" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-white/5" />
        <p className="text-teal-400 font-sans text-xs font-semibold uppercase tracking-[0.2em]">{title}</p>
        <div className="h-px flex-1 bg-white/5" />
      </div>
      {children}
    </section>
  );
}

function Swatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 rounded-lg border border-white/5 ${className}`} />
      <p className="text-xs text-slate-300 font-medium">{name}</p>
      <p className="text-xs text-slate-500 font-mono">{hex}</p>
    </div>
  );
}

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-navy-950 px-8 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <p className="text-teal-400 font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Design System
          </p>
          <h1 className="font-serif text-6xl font-bold text-white mb-4">
            Style Reference
          </h1>
          <p className="font-serif text-2xl italic text-slate-400 mb-6">
            Success Sentinel visual language.
          </p>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            A living reference for all colors, type styles, and UI components used across the platform.
            Every decision here serves the dark navy + teal design language.
          </p>
        </div>

        {/* Color Palette */}
        <Section title="Color Palette">
          <div className="space-y-8">
            <div>
              <p className="text-slate-400 text-sm mb-4">Navy - Backgrounds & Surfaces</p>
              <div className="grid grid-cols-5 gap-3">
                <Swatch name="Navy 950" hex="#07091a" className="bg-navy-950 ring-1 ring-white/10" />
                <Swatch name="Navy 900" hex="#0c1126" className="bg-navy-900" />
                <Swatch name="Navy 800" hex="#101830" className="bg-navy-800" />
                <Swatch name="Navy 700" hex="#151e38" className="bg-navy-700" />
                <Swatch name="Navy 600" hex="#1e2a4a" className="bg-navy-600" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-4">Teal - Accent & Action</p>
              <div className="grid grid-cols-5 gap-3">
                <Swatch name="Teal 300" hex="#5eead4" className="bg-teal-300" />
                <Swatch name="Teal 400" hex="#2dd4bf" className="bg-teal-400" />
                <Swatch name="Teal 500" hex="#14b8a6" className="bg-teal-500" />
                <Swatch name="Teal 600" hex="#0d9488" className="bg-teal-600" />
                <Swatch name="Teal 700" hex="#0f766e" className="bg-teal-700" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-4">Neutrals - Text</p>
              <div className="grid grid-cols-5 gap-3">
                <Swatch name="White" hex="#ffffff" className="bg-white" />
                <Swatch name="Slate 100" hex="#f1f5f9" className="bg-slate-100" />
                <Swatch name="Slate 300" hex="#cbd5e1" className="bg-slate-300" />
                <Swatch name="Slate 400" hex="#94a3b8" className="bg-slate-400" />
                <Swatch name="Slate 600" hex="#475569" className="bg-slate-600" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-4">Semantic - Tint surfaces</p>
              <div className="grid grid-cols-4 gap-3">
                <div className="h-16 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs">teal/10</div>
                <div className="h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 text-xs">white/5</div>
                <div className="h-16 rounded-lg bg-slate-500/10 border border-slate-500/20 flex items-center justify-center text-slate-400 text-xs">slate/10</div>
                <div className="h-16 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-xs">red/10</div>
              </div>
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <div className="space-y-10">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Serif - Playfair Display · Headers &amp; Impact</p>
              <div className="space-y-4 border-l-2 border-teal-500/30 pl-6">
                <div>
                  <p className="text-slate-600 text-xs mb-1">H1 · 60px / Bold</p>
                  <p className="font-serif text-6xl font-bold text-white leading-tight">Display Heading</p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-1">H2 · 48px / Bold</p>
                  <p className="font-serif text-5xl font-bold text-white leading-tight">Section Heading</p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-1">H3 · 36px / Bold</p>
                  <p className="font-serif text-4xl font-bold text-white leading-tight">Sub Heading</p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-1">H4 · 24px / Semibold</p>
                  <p className="font-serif text-2xl font-semibold text-white">Card Heading</p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-1">Italic Impact · 48px</p>
                  <p className="font-serif text-5xl font-bold italic text-teal-400 leading-tight">before they fall.</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Sans - Inter · Body &amp; UI</p>
              <div className="space-y-4 border-l-2 border-white/10 pl-6">
                <div>
                  <p className="text-slate-600 text-xs mb-1">Lead · 20px / Regular</p>
                  <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                    An AI-enabled student success platform that unifies academic, attendance, and engagement data.
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-1">Body · 16px / Regular</p>
                  <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                    Success Sentinel is a web-based platform that integrates with the university&apos;s existing digital
                    infrastructure to surface risk signals before they become crises.
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-1">Small · 14px / Regular</p>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                    Advisors, professors, and students each see a tailored view. No one is overwhelmed with irrelevant data.
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-1">Eyebrow · 12px / Semibold / Uppercase</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">The Challenge</p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-1">Caption · 12px / Muted</p>
                  <p className="text-xs text-slate-500">CMU · 67-250 Information Systems Milestone Project</p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs mb-1">Mono / Data</p>
                  <p className="font-mono text-sm text-teal-300">risk_score: 0.87</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors">
                Primary
              </button>
              <button className="px-6 py-3 rounded-lg border border-white/20 hover:border-teal-500/40 hover:bg-teal-500/5 text-white font-semibold text-sm transition-colors">
                Secondary
              </button>
              <button className="px-6 py-3 rounded-lg border border-teal-500/40 text-teal-400 hover:bg-teal-500/10 font-semibold text-sm transition-colors">
                Outline Teal
              </button>
              <button className="px-6 py-3 rounded-lg text-slate-400 hover:text-white font-semibold text-sm transition-colors">
                Ghost
              </button>
              <button className="px-6 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-semibold text-sm transition-colors">
                Destructive
              </button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs transition-colors">
                Small
              </button>
              <button className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors">
                Medium
              </button>
              <button className="px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-base transition-colors">
                Large
              </button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <button disabled className="px-6 py-3 rounded-lg bg-teal-500/30 text-white/40 font-semibold text-sm cursor-not-allowed">
                Disabled
              </button>
              <button className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-colors flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Loading
              </button>
            </div>
          </div>
        </Section>

        {/* Badges & Pills */}
        <Section title="Badges & Pills">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Live
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              At Risk
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-300 text-xs font-semibold">
              Student
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-300 text-xs font-semibold">
              Advisor
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/8 border border-white/10 text-slate-300 text-xs font-semibold">
              Professor
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold">
              High Risk
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-xs font-semibold">
              Monitor
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              On Track
            </span>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-white/5 bg-navy-900 p-6">
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Default Card</p>
              <h3 className="font-serif text-xl font-semibold text-white mb-3">Centralized Data</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connects Canvas, grade databases, attendance records, and advisor notes into one unified student profile.
              </p>
            </div>
            <div className="rounded-xl border border-teal-500/25 bg-teal-500/5 p-6">
              <p className="text-teal-400 text-xs uppercase tracking-widest mb-1">Highlighted Card</p>
              <h3 className="font-serif text-xl font-semibold text-white mb-3">AI Risk Detection</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Predictive analytics identify patterns and surface at-risk students in real time.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-navy-900 p-6 text-center">
              <p className="font-serif text-5xl font-bold text-teal-400 mb-2">40%</p>
              <p className="text-slate-400 text-sm">of dropouts show early warning signs weeks in advance</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-navy-900 p-6 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 text-lg shrink-0">
                ↗
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Icon Card</p>
                <p className="text-slate-400 text-sm">A card variant with a leading icon for feature lists and action items.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Dividers */}
        <Section title="Dividers & Layout">
          <div className="space-y-8">
            <div>
              <p className="text-slate-500 text-xs mb-3">Default divider</p>
              <div className="h-px bg-white/5" />
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-3">Teal accent divider</p>
              <div className="h-px bg-teal-500/30" />
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-3">With label</p>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-slate-500 text-xs uppercase tracking-widest">How It Works</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-3">Step indicator</p>
              <div className="flex items-center gap-0">
                {["01", "02", "03", "04", "05"].map((n, i) => (
                  <div key={n} className="flex items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border ${i === 0 ? "bg-teal-500 border-teal-500 text-white" : "bg-navy-900 border-white/10 text-slate-400"}`}>
                      {n}
                    </div>
                    {i < 4 && <div className="w-10 h-px bg-white/8" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Shadows & Glow */}
        <Section title="Glow & Depth">
          <div className="grid grid-cols-3 gap-5">
            <div className="rounded-xl border border-white/5 bg-navy-900 p-6 text-center">
              <p className="text-slate-400 text-xs mb-2">No Glow</p>
              <div className="w-10 h-10 rounded-full bg-navy-700 mx-auto" />
            </div>
            <div className="rounded-xl border border-teal-500/20 bg-navy-900 p-6 text-center" style={{ boxShadow: "0 0 30px rgba(20,184,166,0.06)" }}>
              <p className="text-slate-400 text-xs mb-2">Subtle Glow</p>
              <div className="w-10 h-10 rounded-full bg-teal-500/30 mx-auto" style={{ boxShadow: "0 0 16px rgba(20,184,166,0.3)" }} />
            </div>
            <div className="rounded-xl border border-teal-500/30 bg-navy-900 p-6 text-center" style={{ boxShadow: "0 0 50px rgba(20,184,166,0.12)" }}>
              <p className="text-slate-400 text-xs mb-2">Strong Glow</p>
              <div className="w-10 h-10 rounded-full bg-teal-400 mx-auto" style={{ boxShadow: "0 0 24px rgba(20,184,166,0.5)" }} />
            </div>
          </div>
        </Section>

        {/* Carousel */}
        <Section title="Carousel">
          <CarouselDemo />
        </Section>

        {/* Navigation back */}
        <div className="pt-10 border-t border-white/5 flex items-center justify-between">
          <a href="/" className="text-sm text-slate-500 hover:text-teal-400 transition-colors">
            ← Back to main site
          </a>
          <p className="text-slate-600 text-xs">Success Sentinel · Design System</p>
        </div>
      </div>
    </div>
  );
}
