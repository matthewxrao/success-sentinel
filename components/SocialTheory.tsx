"use client";
import { useEffect, useRef } from "react";
import Carousel from "./Carousel";

const slides = [
  {
    heading: "Theory 1 - Sociotechnical Systems Theory (SST)",
    content: (
      <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-8">
        <h3 className="font-serif text-white font-bold text-2xl mb-4">Sociotechnical Systems Theory (SST)</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Success Sentinel exemplifies SST: its effectiveness depends on both technology <em>and</em> people.
          Advisors, professors, and counselors bring irreplaceable human judgment; the platform surfaces the data
          that makes that judgment faster and better-informed. The outcome is not produced by technology alone,
          but by the relationship between humans and the platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Students & advisors form the social system",
            "AI analytics & dashboards form the technical system",
            "Neither alone produces the desired student outcome",
            "Trust in the data is essential for advisors to act",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span className="text-teal-400 mt-0.5 shrink-0 text-xs">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    heading: "Theory 2 - Technology Acceptance Model (TAM)",
    content: (
      <div className="rounded-xl border border-white/8 bg-navy-900 p-8">
        <h3 className="font-serif text-white font-bold text-2xl mb-4">Technology Acceptance Model (TAM)</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Adoption depends on perceived usefulness and ease of use. If advisors find alerts genuinely helpful
          and the interface intuitive, adoption follows naturally. If either is missing, even a technically
          perfect system will be ignored and students will still fall through the cracks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Perceived Usefulness", text: "Advisors save time locating at-risk students, improving outcomes with less manual work." },
            { label: "Ease of Use", text: "Clean role-based dashboards lower cognitive load and reduce onboarding friction." },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-teal-500/20 bg-teal-500/5 p-4">
              <p className="text-teal-300 font-semibold text-xs mb-2">{item.label}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    heading: "Design Implications",
    content: (
      <div className="rounded-xl border border-white/5 bg-navy-900 p-8">
        <h3 className="font-serif text-white font-bold text-2xl mb-4">How theory shaped our decisions</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Both theories directly shaped our design decisions. Role-based dashboards prevent information overload
          (TAM ease of use). Personalized student success plans replace numerical risk scores: advisors see
          actionable context, not intimidating numbers. Opt-in notifications respect advisor autonomy. Intervention
          logging keeps humans accountable and in the loop, honoring SST&apos;s insistence that technology supports,
          never replaces, human relationships.
        </p>
      </div>
    ),
  },
];

export default function SocialTheory() {
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
    <section id="social" className="py-32 px-6 bg-navy-900/40" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="fade-up text-center mb-20" style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}>
          <p className="text-teal-400 font-semibold text-xs uppercase tracking-[0.2em] mb-5">Social Theory</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Technology is only half the equation</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Two foundational IS theories explain why Success Sentinel must be designed around human behavior, not just data infrastructure.
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
