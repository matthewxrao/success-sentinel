"use client";
import Carousel from "@/components/Carousel";

const demoCards = [
  { label: "01", title: "No Early Warning System", desc: "Universities lack proactive tools to flag struggling students before decline becomes irreversible." },
  { label: "02", title: "Fragmented Student Data", desc: "Academic records, attendance logs, and advisor notes live in completely separate systems with no unified view." },
  { label: "03", title: "Delayed Intervention", desc: "Manual processes mean advisors often reach out weeks after warning signs first appeared." },
];

export default function CarouselDemo() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-slate-500 text-xs mb-3">Single-item carousel - auto-cycles, arrow navigation, dot indicators</p>
        <Carousel
          interval={3000}
          items={demoCards.map((c) => (
            <div className="rounded-xl border border-white/5 bg-navy-900 p-8 min-h-[160px]">
              <p className="text-teal-500/60 font-mono text-xs mb-3">{c.label}</p>
              <h3 className="font-serif text-white font-bold text-xl mb-3">{c.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        />
      </div>
    </div>
  );
}
