"use client";
import { useEffect, useRef } from "react";
import Carousel from "./Carousel";

const valueChain = [
  { activity: "Data Intake", university: "Collects grades, attendance, LMS usage", is: "Centralized student data system" },
  { activity: "Operations", university: "Detects at-risk students, prioritizes interventions", is: "Predictive analytics & automated alerts" },
  { activity: "Delivery", university: "Advisors, tutors & counselors reach out", is: "Scheduling system & case management" },
  { activity: "Marketing", university: "Communicates strong student support culture", is: "Website personalization, retention stats, CRM" },
  { activity: "Feedback Loop", university: "Uses outcomes to improve future interventions", is: "Reporting & learning analytics" },
];

const vrin = [
  { letter: "V", label: "Valuable", desc: "Improves student outcomes and reduces dropout risk while protecting tuition revenue and institutional reputation." },
  { letter: "R", label: "Rare", desc: "Built on CMU's unique student data, support ecosystem, staff-to-student ratios, and institutional trust built over decades." },
  { letter: "I", label: "Inimitable", desc: "Accumulated institutional data, staff workflows, and student relationships cannot be easily replicated by competitors." },
  { letter: "N", label: "Non-substitutable", desc: "Fragmented spreadsheets and disconnected manual processes are weaker substitutes and cannot provide integrated predictive support." },
];

const bizCards = [
  { title: "Business Strategy", subtitle: "Customer Intimacy", desc: "Focused on improving retention, graduation rates, and personalized student support. Aligns with the Value Discipline Model." },
  { title: "Business Model", subtitle: "Centralized Success Platform", desc: "Creates value by catching struggling students early. Delivers through alerts and dashboards. Captures value through higher retention and tuition stability." },
  { title: "Competitive Positioning", subtitle: "Differentiation through IS", desc: "Higher retention and graduation rates improve rankings and attract prospective students, reinforcing the university's brand and mission." },
];

const slides = [
  {
    heading: "Business Strategy",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bizCards.map((c) => (
          <div key={c.title} className="rounded-xl border border-white/5 bg-navy-900 p-6 hover:border-teal-500/20 transition-colors duration-300">
            <p className="text-xs text-teal-500/60 uppercase tracking-[0.15em] mb-2">{c.title}</p>
            <h3 className="font-serif text-white font-bold text-xl mb-3">{c.subtitle}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    heading: "Value Chain Analysis",
    content: (
      <div className="rounded-xl border border-white/5 overflow-hidden">
        <div className="grid grid-cols-3 bg-navy-800 px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-[0.12em]">
          <span>Activity</span>
          <span>What the University Does</span>
          <span>Role of IS</span>
        </div>
        {valueChain.map((row, i) => (
          <div key={row.activity} className={`grid grid-cols-3 px-6 py-4 text-sm gap-4 border-t border-white/5 ${i % 2 === 0 ? "bg-navy-950/50" : "bg-navy-900/30"}`}>
            <span className="text-teal-300 font-semibold">{row.activity}</span>
            <span className="text-slate-300">{row.university}</span>
            <span className="text-slate-400">{row.is}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    heading: "VRIN - Sustainable Competitive Advantage",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {vrin.map((v, i) => (
          <div key={v.letter} className="rounded-xl border border-white/5 bg-navy-900 p-6 flex gap-5 hover:border-teal-500/20 transition-colors duration-300">
            <div className="font-serif text-5xl font-black shrink-0 leading-none" style={{ color: `rgba(20,184,166,${1 - i * 0.15})` }}>
              {v.letter}
            </div>
            <div>
              <p className="text-white font-serif text-xl mb-2">{v.label}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Strategy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="strategy" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="fade-up text-center mb-20" style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}>
          <p className="text-teal-400 font-semibold text-xs uppercase tracking-[0.2em] mb-5">Strategic Analysis</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Building a lasting competitive advantage</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Success Sentinel is more than a tool, it&apos;s a strategic asset built around Customer Intimacy and VRIN resource theory.
          </p>
        </div>

        <div className="fade-up" style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.1s" }}>
          <Carousel
            interval={6000}
            items={slides.map((s) => (
              <div key={s.heading}>
                <p className="text-slate-500 text-xs uppercase tracking-[0.18em] mb-5">{s.heading}</p>
                {s.content}
              </div>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
