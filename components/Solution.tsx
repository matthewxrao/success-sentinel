"use client";
import { useEffect, useRef } from "react";

const features = [
  { icon: "🔗", title: "Centralized Data Integration", desc: "Connects Canvas, grade databases, attendance records, and advisor notes into one unified student profile." },
  { icon: "🤖", title: "AI-Based Risk Detection", desc: "Predictive analytics identify patterns ,  repeated absences, missed assignments, declining grades ,  and surface at-risk students in real time." },
  { icon: "📊", title: "Role-Based Dashboards", desc: "Advisors, professors, and students each see a tailored view. No one is overwhelmed with irrelevant data." },
  { icon: "📋", title: "Intervention Tracking", desc: "Every outreach, meeting, and referral is logged so advisors always know where a student stands in their support journey." },
  { icon: "📅", title: "Automated Appointment Workflows", desc: "The system can auto-schedule advising appointments or send personalized nudges, reducing the burden on staff." },
  { icon: "🔄", title: "Feedback Loop", desc: "Outcome data flows back into the model so prediction accuracy improves continuously over time." },
];

const views = [
  {
    role: "Student",
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    badge: "bg-blue-500/20 text-blue-300",
    items: [
      "Personalized success plan with action items",
      "Upcoming deadlines & office hour prompts",
      "Progress tracker across all enrolled courses",
      "Direct link to schedule advisor meetings",
    ],
  },
  {
    role: "Advisor",
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    badge: "bg-violet-500/20 text-violet-300",
    items: [
      "Cross-course attendance & grade trends",
      "AI-generated risk signals with context",
      "Prior meeting notes & intervention history",
      "Faculty flags & engagement alerts",
    ],
  },
  {
    role: "Professor",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    badge: "bg-emerald-500/20 text-emerald-300",
    items: [
      "Class-level attendance trend visualization",
      "Assignment completion rates per student",
      "One-click flag to alert advising office",
      "Suggestions to improve course engagement",
    ],
  },
];

const steps = [
  { num: "01", label: "Data Intake", desc: "Canvas, SIS, attendance, advisor notes" },
  { num: "02", label: "AI Analysis", desc: "Pattern detection & risk scoring" },
  { num: "03", label: "Alert", desc: "Advisor dashboard notification" },
  { num: "04", label: "Outreach", desc: "Personalized student support plan" },
  { num: "05", label: "Outcome", desc: "Data feeds back to improve model" },
];

export default function Solution() {
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
    <section id="solution" className="py-28 px-6 bg-white/[0.02]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div
          className="fade-up text-center mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}
        >
          <p className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3">The Solution</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">One platform. Every student.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Success Sentinel is a web-based, AI-enabled student success platform that integrates
            with the university&apos;s existing digital infrastructure to surface risk signals before they become crises.
          </p>
        </div>

        {/* Workflow */}
        <div
          className="fade-up mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.1s" }}
        >
          <h3 className="text-white font-semibold text-xl text-center mb-8">How It Works</h3>
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="flex md:flex-col items-center gap-4 md:gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {s.num}
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">{s.label}</p>
                  <p className="text-gray-500 text-xs mt-1">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-blue-500/30 to-violet-500/30 mt-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div
          className="fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.2s" }}
        >
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition-colors">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Dashboard mockups */}
        <div
          className="fade-up"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.3s" }}
        >
          <h3 className="text-white font-semibold text-xl text-center mb-8">Role-Based Dashboard Views</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {views.map((v) => (
              <div key={v.role} className={`rounded-2xl border ${v.border} ${v.bg} p-6`}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${v.badge} mb-4`}>
                  {v.role} View
                </span>
                <ul className="space-y-3">
                  {v.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-200">
                      <span className="mt-0.5 text-gray-400 shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
