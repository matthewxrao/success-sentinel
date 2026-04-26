"use client";
import { useEffect, useRef } from "react";
import Carousel from "./Carousel";

const groups = [
  { who: "Students", points: ["Receive targeted academic and personal support before challenges escalate", "Access a clear, personalized success plan with actionable steps", "Greater sense of visibility and institutional care"] },
  { who: "Advisors & Faculty", points: ["Unified dashboard eliminates manual cross-system data searching", "Prioritized alerts surface the highest-need students first", "Logged interventions improve coordination across support staff"] },
  { who: "University Administration", points: ["Higher retention and graduation rates improve national rankings", "Stronger tuition revenue through reduced attrition", "Differentiated student support culture attracts prospective students"] },
];

const scalability = [
  { label: "Expandable", text: "Expandable to financial aid, mental health, and career services" },
  { label: "Self-improving", text: "Model improves with every intervention outcome logged" },
  { label: "Privacy-first", text: "Data privacy built in; students see only their own data" },
  { label: "Integrates", text: "Integrates with existing LMS and SIS infrastructure" },
];

const slides = [
  {
    heading: "Who Benefits",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {groups.map((g) => (
          <div key={g.who} className="rounded-xl border border-white/5 bg-navy-900 p-6 hover:border-teal-500/20 transition-colors duration-300">
            <h3 className="font-serif text-teal-300 font-bold text-lg mb-4">{g.who}</h3>
            <ul className="space-y-3">
              {g.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="text-teal-500 mt-0.5 shrink-0 text-xs">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    heading: "Societal Impact",
    content: (
      <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-8">
        <h3 className="font-serif text-white font-bold text-2xl mb-4">A broader mission</h3>
        <p className="text-slate-300 leading-relaxed">
          At the societal level, Success Sentinel contributes to higher degree completion rates across a broader,
          more diverse student population. By reducing dropout risk for first-generation students, students from
          lower-income backgrounds, and those facing personal hardship, the platform supports a stronger pipeline
          of skilled graduates, creating lasting economic and social benefits for communities and industries.
        </p>
      </div>
    ),
  },
  {
    heading: "Scalability & Sustainability",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scalability.map((s) => (
          <div key={s.text} className="flex items-start gap-4 rounded-xl border border-white/5 bg-navy-900 p-5 hover:border-teal-500/15 transition-colors duration-300">
            <span className="text-xs font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1.5 rounded shrink-0">{s.label}</span>
            <p className="text-slate-300 text-sm leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Impact() {
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
    <section id="impact" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="fade-up text-center mb-20" style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}>
          <p className="text-teal-400 font-semibold text-xs uppercase tracking-[0.2em] mb-5">Expected Impact</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Who benefits, and how</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Success Sentinel creates measurable value for students, advisors, the university, and society.
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
