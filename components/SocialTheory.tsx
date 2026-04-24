"use client";
import { useEffect, useRef } from "react";

export default function SocialTheory() {
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
    <section id="social" className="py-28 px-6 bg-white/[0.02]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div
          className="fade-up text-center mb-16"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}
        >
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">Social Theory</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technology is only half the equation
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Two foundational IS theories explain why Success Sentinel must be designed around human behavior ,  not just data infrastructure.
          </p>
        </div>

        <div
          className="fade-up grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.1s" }}
        >
          {/* SST */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold mb-5">
              Theory 1
            </div>
            <h3 className="text-white font-bold text-xl mb-4">Sociotechnical Systems Theory (SST)</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Success Sentinel exemplifies SST ,  its effectiveness depends on both technology <em>and</em> people.
              Advisors, professors, and counselors bring irreplaceable human judgment; the platform surfaces the data
              that makes that judgment faster and better-informed. The outcome is not produced by technology alone,
              but by the relationship between humans and the platform.
            </p>
            <div className="space-y-3">
              {[
                "Students & advisors form the social system",
                "AI analytics & dashboards form the technical system",
                "Neither alone produces the desired student outcome",
                "Trust in the data is essential for advisors to act",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-amber-400 mt-0.5 shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* TAM */}
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold mb-5">
              Theory 2
            </div>
            <h3 className="text-white font-bold text-xl mb-4">Technology Acceptance Model (TAM)</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Adoption depends on perceived usefulness and ease of use. If advisors find alerts genuinely helpful
              and the interface intuitive, adoption follows naturally. If either is missing, even a technically
              perfect system will be ignored ,  and students will still fall through the cracks.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Perceived Usefulness", text: "Advisors save time locating at-risk students, improving outcomes with less manual work." },
                { label: "Ease of Use", text: "Clean role-based dashboards lower cognitive load and reduce onboarding friction." },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
                  <p className="text-blue-300 font-semibold text-xs mb-1">{item.label}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="fade-up mt-8 rounded-2xl border border-white/10 bg-white/5 p-8"
          style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease 0.2s" }}
        >
          <h3 className="text-white font-semibold text-lg mb-3">Design Implications</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Both theories directly shaped our design decisions. Role-based dashboards prevent information overload
            (TAM ease of use). Personalized student success plans replace numerical risk scores ,  advisors see
            actionable context, not intimidating numbers. Opt-in notifications respect advisor autonomy. Intervention
            logging keeps humans accountable and in the loop, honoring SST&apos;s insistence that technology supports
            ,  never replaces ,  human relationships.
          </p>
        </div>
      </div>
    </section>
  );
}
