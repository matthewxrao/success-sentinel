"use client";
import { useEffect, useRef } from "react";
import Carousel from "./Carousel";
import WorkflowLoop from "./WorkflowLoop";

const features = [
  { label: "01", title: "Centralized Data Integration", desc: "Connects Canvas, grade databases, attendance records, and advisor notes into one unified student profile." },
  { label: "02", title: "AI-Based Risk Detection", desc: "Predictive analytics identify patterns — repeated absences, missed assignments, declining grades — and surface at-risk students in real time." },
  { label: "03", title: "Role-Based Dashboards", desc: "Advisors, professors, and students each see a tailored view. No one is overwhelmed with irrelevant data." },
  { label: "04", title: "Intervention Tracking", desc: "Every outreach, meeting, and referral is logged so advisors always know where a student stands in their support journey." },
  { label: "05", title: "Automated Appointment Workflows", desc: "The system can auto-schedule advising appointments or send personalized nudges, reducing the burden on staff." },
  { label: "06", title: "Feedback Loop", desc: "Outcome data flows back into the model so prediction accuracy improves continuously over time." },
];

const views = [
  {
    role: "Student",
    items: ["Personalized success plan with action items", "Upcoming deadlines & office hour prompts", "Progress tracker across all enrolled courses", "Direct link to schedule advisor meetings"],
  },
  {
    role: "Advisor",
    items: ["Cross-course attendance & grade trends", "AI-generated risk signals with context", "Prior meeting notes & intervention history", "Faculty flags & engagement alerts"],
  },
  {
    role: "Professor",
    items: ["Class-level attendance trend visualization", "Assignment completion rates per student", "One-click flag to alert advising office", "Suggestions to improve course engagement"],
  },
];

const slides = [
  {
    heading: "How It Works",
    content: <WorkflowLoop />,
  },
  {
    heading: "Features",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-white/5 bg-navy-900 p-6 hover:border-teal-500/20 transition-colors duration-300 group">
            <p className="text-teal-500/50 font-mono text-xs mb-3 group-hover:text-teal-400 transition-colors">{f.label}</p>
            <h3 className="font-serif text-white font-bold text-xl mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed overflow-wrap anywhere">{f.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    heading: "Role-Based Dashboard Views",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {views.map((v) => (
          <div key={v.role} className="rounded-xl border border-teal-500/15 bg-teal-500/5 p-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 border border-teal-500/25 text-teal-300 mb-5">
              {v.role} View
            </span>
            <ul className="space-y-3">
              {v.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="text-teal-500 mt-0.5 shrink-0 text-xs">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Solution() {
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
    <section id="solution" className="py-32 px-6 bg-navy-900/40" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="fade-up text-center mb-20" style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}>
          <p className="text-teal-400 font-semibold text-xs uppercase tracking-[0.2em] mb-5">The Solution</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">One platform. Every student.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Success Sentinel integrates with the university&apos;s existing digital infrastructure to surface risk signals before they become crises.
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

        <a
          href="/demo"
          className="mt-16 block w-fit mx-auto font-serif italic font-bold text-3xl text-teal-400 hover:text-teal-100 transition-colors text-center"
        >
          Check out our interactive demo →
        </a>
      </div>
    </section>
  );
}
