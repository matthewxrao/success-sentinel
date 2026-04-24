"use client";
import { useEffect, useRef } from "react";

const valueChain = [
  { activity: "Data Intake", university: "Collects grades, attendance, LMS usage", is: "Centralized student data system" },
  { activity: "Operations", university: "Detects at-risk students, prioritizes interventions", is: "Predictive analytics & automated alerts" },
  { activity: "Delivery", university: "Advisors, tutors & counselors reach out", is: "Scheduling system & case management" },
  { activity: "Marketing", university: "Communicates strong student support culture", is: "Website personalization, retention stats, CRM" },
  { activity: "Feedback Loop", university: "Uses outcomes to improve future interventions", is: "Reporting & learning analytics" },
];

const vrin = [
  { letter: "V", label: "Valuable", color: "text-blue-400", desc: "Improves student outcomes and reduces dropout risk while protecting tuition revenue and institutional reputation." },
  { letter: "R", label: "Rare", color: "text-violet-400", desc: "Built on CMU's unique student data, support ecosystem, staff-to-student ratios, and institutional trust built over decades." },
  { letter: "I", label: "Inimitable", color: "text-emerald-400", desc: "Accumulated institutional data, staff workflows, and student relationships cannot be easily replicated by competitors." },
  { letter: "N", label: "Non-substitutable", color: "text-amber-400", desc: "Fragmented spreadsheets and disconnected manual processes are weaker substitutes ,  they cannot provide integrated predictive support." },
];

const bizCards = [
  { title: "Business Strategy", subtitle: "Customer Intimacy", desc: "Focused on improving retention, graduation rates, and personalized student support. Aligns with the Value Discipline Model." },
  { title: "Business Model", subtitle: "Centralized Success Platform", desc: "Creates value by catching struggling students early. Delivers through alerts and dashboards. Captures value through higher retention and tuition stability." },
  { title: "Competitive Positioning", subtitle: "Differentiation through IS", desc: "Higher retention and graduation rates improve rankings and attract prospective students ,  reinforcing the university's brand and mission." },
];

export default function Strategy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
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
    <section id="strategy" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div
          className="fade-up text-center mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}
        >
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">Strategic Analysis</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Building a lasting competitive advantage</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Success Sentinel is more than a tool ,  it&apos;s a strategic asset built around Customer Intimacy and VRIN resource theory.
          </p>
        </div>

        <div
          className="fade-up grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.1s" }}
        >
          {bizCards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{c.title}</p>
              <h3 className="text-white font-semibold text-lg mb-3">{c.subtitle}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div
          className="fade-up mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.2s" }}
        >
          <h3 className="text-white font-semibold text-xl mb-6">Value Chain Analysis</h3>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 bg-white/5 px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">
              <span>Activity</span>
              <span>What the University Does</span>
              <span>Role of IS</span>
            </div>
            {valueChain.map((row, i) => (
              <div
                key={row.activity}
                className={`grid grid-cols-3 px-6 py-4 text-sm gap-4 border-t border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
              >
                <span className="text-blue-300 font-medium">{row.activity}</span>
                <span className="text-gray-300">{row.university}</span>
                <span className="text-gray-400">{row.is}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="fade-up"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.3s" }}
        >
          <h3 className="text-white font-semibold text-xl mb-6">VRIN ,  Sustainable Competitive Advantage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {vrin.map((v) => (
              <div key={v.letter} className="rounded-2xl border border-white/10 bg-white/5 p-6 flex gap-5">
                <div className={`text-4xl font-black ${v.color} shrink-0`}>{v.letter}</div>
                <div>
                  <p className="text-white font-semibold mb-1">{v.label}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
