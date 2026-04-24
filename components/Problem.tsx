"use client";
import { useEffect, useRef } from "react";

const painPoints = [
  {
    icon: "⚠️",
    title: "No Early Warning System",
    desc: "Universities lack proactive tools to flag struggling students. By the time decline is noticed, effective intervention may already be out of reach.",
  },
  {
    icon: "🗂️",
    title: "Fragmented Student Data",
    desc: "Academic records, attendance logs, financial aid status, and advisor notes live in completely separate systems with no unified view.",
  },
  {
    icon: "⏳",
    title: "Delayed Intervention",
    desc: "Manual processes and siloed information mean advisors often reach out weeks after warning signs first appeared.",
  },
  {
    icon: "📉",
    title: "Poor Retention Rates",
    desc: "Without timely support, students who could have succeeded withdraw, reducing graduation rates and institutional revenue.",
  },
];

const stats = [
  { value: "40%", label: "of college dropouts show early warning signs weeks in advance" },
  { value: "26%", label: "of first-year students leave before their sophomore year" },
  { value: "3×", label: "higher retention when early interventions are deployed" },
];

export default function Problem() {
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
    <section id="problem" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div
          className="fade-up text-center mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}
        >
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
            The Challenge
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Students are falling through the cracks
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Universities support thousands of students across academic, financial, and personal
            dimensions ,  but the systems meant to help them are broken and disconnected.
          </p>
        </div>

        <div
          className="fade-up grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.1s" }}
        >
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <div
                className="text-4xl font-bold mb-2"
                style={{
                  background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <p className="text-gray-300 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        <div
          className="fade-up grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.2s" }}
        >
          {painPoints.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition-colors"
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div
          className="fade-up mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.3s" }}
        >
          <h3 className="text-white font-semibold text-xl mb-3">Why This Matters at CMU</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            Carnegie Mellon operates across a large, diverse student population spanning multiple
            colleges. Student information is distributed across Canvas, the Student Information
            System, advising platforms, and financial aid portals. Without a unified view, advisors
            cannot efficiently identify who needs help ,  and students who show early warning signs
            go unnoticed until intervention is no longer effective.
          </p>
        </div>
      </div>
    </section>
  );
}
