"use client";
import { useEffect, useRef } from "react";
import Carousel from "./Carousel";

const painPoints = [
  { label: "01", title: "No Early Warning System", desc: "Universities lack proactive tools to flag struggling students. By the time decline is noticed, effective intervention may already be out of reach." },
  { label: "02", title: "Fragmented Student Data", desc: "Academic records, attendance logs, financial aid status, and advisor notes live in completely separate systems with no unified view." },
  { label: "03", title: "Delayed Intervention", desc: "Manual processes and siloed information mean advisors often reach out weeks after warning signs first appeared." },
  { label: "04", title: "Poor Retention Rates", desc: "Without timely support, students who could have succeeded withdraw, reducing graduation rates and institutional revenue." },
];

const stats = [
  { value: "40%", label: "of college dropouts show early warning signs weeks in advance" },
  { value: "26%", label: "of first-year students leave before their sophomore year" },
  { value: "3×", label: "higher retention when early interventions are deployed" },
];

const slides = [
  {
    heading: "By the Numbers",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((s) => (
          <div key={s.value} className="rounded-xl border border-white/5 bg-navy-900 p-8 text-center">
            <div className="font-serif text-5xl font-bold text-teal-400 mb-3">{s.value}</div>
            <p className="text-slate-400 text-sm leading-relaxed">{s.label}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    heading: "Pain Points",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {painPoints.map((p) => (
          <div key={p.title} className="rounded-xl border border-white/5 bg-navy-900 p-6 hover:border-teal-500/20 transition-colors duration-300 group">
            <p className="text-teal-500/50 font-mono text-xs mb-3 group-hover:text-teal-400 transition-colors">{p.label}</p>
            <h3 className="font-serif text-white font-bold text-lg mb-3">{p.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    heading: "A Local Urgency",
    content: (
      <div className="space-y-5">
        {/* Reframe headline */}
        <div className="rounded-xl border border-teal-500/25 bg-teal-500/5 p-8">
          <p className="text-teal-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Statistics Can Be Deceiving</p>
          <p className="font-serif text-white text-2xl font-bold leading-snug mb-4">
            CMU boasts an impressive graduation rate.<br />
            <span className="italic text-teal-400">The picture underneath is more complicated.</span>
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            On paper, Carnegie Mellon looks healthy. Graduation rates are strong. Substance abuse is low.
            Students report high happiness and purpose. But the university&apos;s own Life@CMU Project, commissioned
            by the Office of the Provost, found something harder to see in the aggregate numbers: nearly
            6 in 10 students showed high depressive symptoms before the semester was over.
          </p>
        </div>

        {/* CMU Life@CMU stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { value: "81%", label: "of CMU students graduate in 4 years, well above the 50% national average", src: "U.S News" },
            { value: "58%", label: "of CMU students showed high depressive symptoms by end of semester", src: "Life@CMU Project" },
            { value: "86%", label: "accuracy in predicting end-of-semester depression from data", src: "Life@CMU Project" },
          ].map((s) => (
            <div key={s.value} className="rounded-xl border border-white/5 bg-navy-900 p-5 flex flex-col justify-between gap-3">
              <div className="font-serif text-4xl font-bold text-teal-400 leading-none">{s.value}</div>
              <div>
                <p className="text-slate-300 text-xs leading-relaxed mb-2 align-top">{s.label}</p>
                <p className="text-slate-600 text-[10px] uppercase tracking-widest">{s.src}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quotes + implication */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/5 bg-navy-900 p-5 flex flex-col gap-3">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              &ldquo;Given that we&apos;re seeing so much depression symptomology in our students, we&apos;ve been really getting
              interested to see if we can predict who&apos;s going to be depressed and what factors may cause
              students to be vulnerable.&rdquo;
            </p>
            <p className="text-teal-400 text-[10px] font-semibold uppercase tracking-widest">
              David Creswell, Principal Investigator, Life@CMU Project
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-navy-900 p-5 flex flex-col justify-between gap-4">
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">The Implication</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                CMU&apos;s own researchers used data to predict depression with 86% accuracy. The
                ability to identify at-risk students earlier has been demonstrated to work, but what is missing is a platform
                that connects it to the advisors who can actually intervene.
              </p>
            </div>
            <p className="font-serif text-white text-base font-bold italic">
              &ldquo;Some of our students are not OK.&rdquo;
              <span className="block text-slate-500 font-sans not-italic text-[10px] font-normal uppercase tracking-widest mt-1">
                David Eckhardt, CS Professor, CMU
              </span>
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Problem() {
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
    <section id="problem" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="fade-up text-center mb-20" style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s ease" }}>
          <p className="text-teal-400 font-semibold text-xs uppercase tracking-[0.2em] mb-5">The Challenge</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Students are falling through the cracks</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Universities support thousands of students across academic, financial, and personal dimensions, but the systems meant to help them are broken and disconnected.
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
