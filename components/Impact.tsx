"use client";
import { useEffect, useRef } from "react";

const groups = [
  {
    who: "Students",
    color: "text-blue-300",
    points: [
      "Receive targeted academic and personal support before challenges escalate",
      "Access a clear, personalized success plan with actionable steps",
      "Greater sense of visibility and institutional care",
    ],
  },
  {
    who: "Advisors & Faculty",
    color: "text-violet-300",
    points: [
      "Unified dashboard eliminates manual cross-system data searching",
      "Prioritized alerts surface the highest-need students first",
      "Logged interventions improve coordination across support staff",
    ],
  },
  {
    who: "University Administration",
    color: "text-emerald-300",
    points: [
      "Higher retention and graduation rates improve national rankings",
      "Stronger tuition revenue through reduced attrition",
      "Differentiated student support culture attracts prospective students",
    ],
  },
];

const scalability = [
  { icon: "📈", text: "Expandable to financial aid, mental health, and career services" },
  { icon: "🧠", text: "Model improves with every intervention outcome logged" },
  { icon: "🔐", text: "Data privacy built in ,  students see only their own data" },
  { icon: "⚙️", text: "Integrates with existing LMS and SIS infrastructure" },
];

export default function Impact() {
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
    <section id="impact" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div
          className="fade-up text-center mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}
        >
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">Expected Impact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Who benefits ,  and how</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Success Sentinel creates measurable value for students, advisors, the university, and society.
          </p>
        </div>

        <div
          className="fade-up grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.1s" }}
        >
          {groups.map((g) => (
            <div key={g.who} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className={`font-semibold text-lg mb-4 ${g.color}`}>{g.who}</h3>
              <ul className="space-y-3">
                {g.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-0.5 text-gray-500 shrink-0">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="fade-up rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 mb-10"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.2s" }}
        >
          <h3 className="text-white font-semibold text-xl mb-3">Societal Impact</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            At the societal level, Success Sentinel contributes to higher degree completion rates across a broader,
            more diverse student population. By reducing dropout risk for first-generation students, students from
            lower-income backgrounds, and those facing personal hardship, the platform supports a stronger pipeline
            of skilled graduates ,  creating lasting economic and social benefits for communities and industries.
          </p>
        </div>

        <div
          className="fade-up"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.3s" }}
        >
          <h3 className="text-white font-semibold text-xl mb-6">Scalability &amp; Sustainability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scalability.map((s) => (
              <div key={s.text} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <span className="text-2xl">{s.icon}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
