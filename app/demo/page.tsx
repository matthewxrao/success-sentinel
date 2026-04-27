"use client";
import { useState, useId, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Home, Users, Bell, BarChart2, FileText, Settings,
  TrendingDown, AlertTriangle, CheckCircle, Calendar,
  Activity, Flag, Zap, ArrowUpRight, BookOpen,
  ChevronRight, MessageSquare,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "student" | "advisor" | "professor";

// ─── Charts ──────────────────────────────────────────────────────────────────
function Donut({ score, size = 104 }: { score: number; size?: number }) {
  const sw = 10, r = (size - sw) / 2, circ = 2 * Math.PI * r;
  const color = score >= 70 ? "#ef4444" : score >= 50 ? "#f59e0b" : "#14b8a6";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={`${(score / 100) * circ} ${circ}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xl font-bold text-white leading-none">{score}</span>
        <span className="text-[9px] text-slate-400">/100</span>
      </div>
    </div>
  );
}

function Spark({ data, color = "#14b8a6", w = 220, h = 56 }: {
  data: number[]; color?: string; w?: number; h?: number;
}) {
  const uid = useId().replace(/:/g, "s");
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  const xg = w / (data.length - 1);
  const pts = data.map((v, i): [number, number] => [i * xg, h - ((v - mn) / rng) * (h * 0.8) - h * 0.1]);
  const line = `M ${pts.map(([x, y]) => `${x},${y}`).join(" L ")}`;
  const area = `${line} L ${pts.at(-1)![0]},${h} L 0,${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${uid})`} />
      <path d={line} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill={color} />)}
    </svg>
  );
}

function Bar({ pct, color = "#14b8a6" }: { pct: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] text-slate-400 w-8 text-right shrink-0">{pct}%</span>
    </div>
  );
}

// ─── Clickable card wrapper ────────────────────────────────────────────────────
function CalloutCard({ children, calloutN, active, onToggle, className, style }: {
  children: React.ReactNode;
  calloutN: number;
  active: boolean;
  onToggle: (n: number) => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const INTERACTIVE = ["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA"];
  function handleClick(e: React.MouseEvent) {
    const t = e.target as HTMLElement;
    if (INTERACTIVE.includes(t.tagName) || t.closest("button,a,input,select,textarea")) return;
    onToggle(calloutN);
  }
  return (
    <div onClick={handleClick} className={`cursor-pointer ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}

// ─── Callout marker — dot + fixed-position portal tooltip ─────────────────────
const TIP_W = 224;

function CalloutMarker({ n, active, onClick, title, desc }: {
  n: number; active: boolean; onClick: () => void;
  title: string; desc: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tip, setTip] = useState<{ top: number; left: number; flip: boolean } | null>(null);

  useEffect(() => {
    if (!active) { setTip(null); return; }
    const place = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const flip = r.right + TIP_W + 12 > window.innerWidth;
      setTip({ top: r.top + r.height / 2, left: flip ? r.left - TIP_W - 8 : r.right + 8, flip });
    };
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place, { passive: true });
    return () => { window.removeEventListener("scroll", place); window.removeEventListener("resize", place); };
  }, [active]);

  return (
    <>
      <button ref={ref} onClick={onClick} aria-label={`Callout ${n}`}
        className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-full
          text-[10px] font-bold border transition-all shrink-0 select-none
          ${active
            ? "bg-teal-400 border-teal-400 text-[#07091a] shadow-[0_0_8px_rgba(20,184,166,0.5)]"
            : "bg-[#07091a] border-teal-500/60 text-teal-400 hover:border-teal-400"}`}>
        {n}
      </button>
      {active && tip && createPortal(
        <div style={{ position: "fixed", top: tip.top, left: tip.left, transform: "translateY(-50%)", width: TIP_W, zIndex: 9999 }}
          className="pointer-events-none">
          {/* Diamond arrow pointing toward the dot */}
          <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#0c1126]"
            style={tip.flip
              ? { right: -5, borderTop: "1px solid rgba(20,184,166,0.4)", borderRight: "1px solid rgba(20,184,166,0.4)" }
              : { left: -5, borderBottom: "1px solid rgba(20,184,166,0.4)", borderLeft: "1px solid rgba(20,184,166,0.4)" }} />
          <div className="bg-[#0c1126] border border-teal-500/40 rounded-xl p-3.5 shadow-2xl shadow-black/60">
            <p className="text-xs font-semibold text-teal-300 mb-1.5">{title}</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">{desc}</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// ─── Callout copy ─────────────────────────────────────────────────────────────
const CALLOUTS: Record<Role, { title: string; desc: string }[]> = {
  student: [
    { title: "Success Score",     desc: "AI-generated daily score from grades, attendance, and engagement. Falls below 65 → advisor is automatically notified." },
    { title: "Course Risk Flags", desc: "Color-coded per course. Green is healthy, yellow needs attention, red is critical. Ensures issues are noticed before final grades are impacted." },
    { title: "Advisor Connect",   desc: "One-click scheduling links to your advisor's live calendar. No email chains, availability is shown in real time." },
    { title: "AI Action Plan",    desc: "Personalized next steps ranked by urgency. Regenerated each evening from fresh Canvas and SIS data." },
  ],
  advisor: [
    { title: "Live Risk Feed",       desc: "Student list refreshes every 15 min from Canvas, SIS, and attendance. Sort by risk score, major, or last contact date." },
    { title: "Risk Score Breakdown", desc: "Click any student to see which factors are driving their score: missed assignments, absences, grade drops, or disengagement." },
    { title: "Alert Triage Queue",   desc: "Red = act today, Yellow = monitor this week. Each alert includes an AI-suggested outreach message to send." },
    { title: "Intervention Log",     desc: "Every meeting, referral, and email is timestamped here. Ensures continuity of care if a student changes advisors." },
  ],
  professor: [
    { title: "Attendance Trend",     desc: "Week-over-week rate calculated automatically from LMS logins and in-class check-ins. A >10% drop flags the advising office." },
    { title: "Assignment Heatmap",   desc: "Shows which specific assignments are causing grade drops; helps separate content gaps from student engagement failures." },
    { title: "Flag to Advising",     desc: "One click routes a student to their advisor's alert queue with your context notes pre-filled. No separate email needed." },
    { title: "Engagement Composite", desc: "Combines LMS logins, discussion posts, office hour visits, and submission timing into a single score per student." },
  ],
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const GRADE_TREND = [88, 85, 82, 78, 74, 70, 66, 62];
const RISK_TREND  = [120, 128, 135, 142, 148, 151, 155, 156];
const ATT_TREND   = [95, 93, 90, 88, 84, 80, 77, 74];
const WEEKS       = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

const COURSES = [
  { code: "ECON 301", name: "Macroeconomics",  grade: 62, att: 74, flag: "red"   },
  { code: "CS 201",   name: "Data Structures", grade: 81, att: 91, flag: "green" },
  { code: "MATH 241", name: "Calculus III",     grade: 55, att: 68, flag: "red"   },
  { code: "ENGL 102", name: "Tech Writing",     grade: 88, att: 95, flag: "green" },
];

const AT_RISK_STUDENTS = [
  { name: "Alex Rivera",  major: "Economics",   score: 82, last: "2d ago",  sev: "red"    },
  { name: "Maya Patel",   major: "Comp Sci",    score: 71, last: "Today",   sev: "yellow" },
  { name: "Jordan Lee",   major: "Mathematics", score: 68, last: "3d ago",  sev: "red"    },
  { name: "Sam Torres",   major: "English",     score: 55, last: "1d ago",  sev: "yellow" },
  { name: "Casey Nguyen", major: "Biology",     score: 88, last: "1w ago",  sev: "red"    },
];

const CLASS_STUDENTS = [
  { name: "Alex Rivera",  grade: 62, att: 68, engage: 41, flag: true  },
  { name: "Maya Patel",   grade: 78, att: 85, engage: 72, flag: false },
  { name: "Jordan Lee",   grade: 55, att: 71, engage: 35, flag: true  },
  { name: "Sam Torres",   grade: 85, att: 88, engage: 80, flag: false },
  { name: "Casey Nguyen", grade: 69, att: 62, engage: 55, flag: true  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function gradeColor(g: number) {
  return g < 65 ? "text-red-400" : g < 75 ? "text-amber-400" : "text-teal-400";
}
function attColor(a: number) {
  return a < 75 ? "text-red-400" : a < 85 ? "text-amber-400" : "text-slate-300";
}
function engColor(e: number) {
  return e < 50 ? "text-red-400" : e < 70 ? "text-amber-400" : "text-teal-400";
}
function engBg(e: number) {
  return e < 50 ? "#ef4444" : e < 70 ? "#f59e0b" : "#14b8a6";
}
function scoreBg(s: number) {
  return s >= 70 ? "#ef4444" : s >= 50 ? "#f59e0b" : "#14b8a6";
}

// ─── Student Dashboard ────────────────────────────────────────────────────────
function StudentView({ active, set }: { active: number | null; set: (n: number | null) => void }) {
  const score = 62;
  const C = CALLOUTS.student;
  const cm = (n: number) => ({ n, active: active === n, onClick: () => set(active === n ? null : n), title: C[n-1].title, desc: C[n-1].desc });
  const hi = (n: number) => active === n
    ? "border-teal-400 shadow-[0_0_0_2px_rgba(20,184,166,0.18)]"
    : "border-white/[0.06]";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left column */}
      <div className="flex flex-col gap-4">
        {/* Score card */}
        <CalloutCard calloutN={1} active={active === 1} onToggle={n => set(active === n ? null : n)} className={`rounded-xl bg-navy-900 border p-5 transition-all ${hi(1)}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-slate-400 tracking-widest">SUCCESS SCORE</span>
            <CalloutMarker {...cm(1)} />
          </div>
          <div className="flex items-center gap-4">
            <Donut score={score} />
            <div>
              <p className="text-xs font-semibold text-red-400">Risk Level: HIGH</p>
              <div className="flex items-center gap-1 text-red-400 text-[11px] mt-1.5">
                <TrendingDown size={11} />
                <span>–4 pts this week</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">Updated today · 8:02 AM</p>
            </div>
          </div>
        </CalloutCard>

        {/* Grade trend */}
        <div className="rounded-xl bg-navy-900 border border-white/[0.06] p-4">
          <p className="text-[10px] text-slate-400 tracking-widest mb-3">GRADE TREND</p>
          <Spark data={GRADE_TREND} color="#ef4444" w={220} h={56} />
          <div className="flex justify-between mt-1.5 text-[9px] text-slate-500">
            {WEEKS.map(w => <span key={w}>{w}</span>)}
          </div>
        </div>

        {/* Advisor */}
        <CalloutCard calloutN={3} active={active === 3} onToggle={n => set(active === n ? null : n)} className={`rounded-xl bg-navy-900 border p-5 transition-all ${hi(3)}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-slate-400 tracking-widest">YOUR ADVISOR</span>
            <CalloutMarker {...cm(3)} />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-sm font-bold text-teal-400 shrink-0">
              SL
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Dr. Sarah Lin</p>
              <p className="text-[11px] text-slate-400">Academic Advising · Rm 204</p>
            </div>
          </div>
          <button className="w-full py-2 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-400 text-xs font-semibold hover:bg-teal-500/25 transition-colors flex items-center justify-center gap-2">
            <Calendar size={12} />
            Schedule Appointment
          </button>
        </CalloutCard>
      </div>

      {/* Right two-thirds */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* Course table */}
        <CalloutCard calloutN={2} active={active === 2} onToggle={n => set(active === n ? null : n)} className={`rounded-xl bg-navy-900 border p-5 transition-all ${hi(2)}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-slate-400 tracking-widest">COURSE PERFORMANCE</span>
            <CalloutMarker {...cm(2)} />
          </div>
          <div className="space-y-2">
            {COURSES.map(c => (
              <div key={c.code} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${c.flag === "red" ? "bg-red-400" : "bg-teal-400"}`} />
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{c.code}</span>
                <span className="text-xs text-white flex-1 truncate">{c.name}</span>
                <span className="text-[10px] text-slate-400 shrink-0">
                  Att: <span className={attColor(c.att)}>{c.att}%</span>
                </span>
                <span className={`text-xs font-bold shrink-0 w-9 text-right ${gradeColor(c.grade)}`}>
                  {c.grade}%
                </span>
              </div>
            ))}
          </div>
        </CalloutCard>

        {/* Recent alerts */}
        <div className="rounded-xl bg-navy-900 border border-white/[0.06] p-5">
          <p className="text-[10px] text-slate-400 tracking-widest mb-3">RECENT ALERTS</p>
          <div className="space-y-2.5">
            {[
              { sev: "red",    msg: "Missed 3 assignments in ECON 301",  time: "Today"      },
              { sev: "yellow", msg: "Attendance below 75% in MATH 241",  time: "Yesterday"  },
              { sev: "yellow", msg: "Grade dropped 8 pts in ECON 301",   time: "3 days ago" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${a.sev === "red" ? "bg-red-400/15" : "bg-amber-400/15"}`}>
                  <AlertTriangle size={10} className={a.sev === "red" ? "text-red-400" : "text-amber-400"} />
                </div>
                <span className="flex-1 text-xs text-slate-300">{a.msg}</span>
                <span className="text-[10px] text-slate-500 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI action plan */}
        <CalloutCard calloutN={4} active={active === 4} onToggle={n => set(active === n ? null : n)} className={`rounded-xl border p-5 transition-all ${active === 4 ? "bg-teal-500/5 border-teal-400 shadow-[0_0_0_2px_rgba(20,184,166,0.15)]" : "bg-navy-900 border-white/[0.06]"}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap size={13} className="text-teal-400" />
              <span className="text-[10px] text-slate-400 tracking-widest">AI ACTION PLAN</span>
            </div>
            <CalloutMarker {...cm(4)} />
          </div>
          <div className="space-y-2.5">
            {[
              { text: "Attend ECON 301 office hours this week",       tag: "Urgent",      tc: "red"   },
              { text: "Book MATH 241 tutoring center session",         tag: "This week",   tc: "amber" },
              { text: "Meet with Dr. Lin — financial aid options",     tag: "Recommended", tc: "teal"  },
              { text: "Submit 2 missing ECON 301 assignments",         tag: "Urgent",      tc: "red"   },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle size={13} className="text-teal-500/30 shrink-0" />
                <span className="flex-1 text-xs text-slate-300">{s.text}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                  s.tc === "red"   ? "bg-red-400/15 text-red-400"   :
                  s.tc === "amber" ? "bg-amber-400/15 text-amber-400" :
                                     "bg-teal-400/15 text-teal-400"}`}>
                  {s.tag}
                </span>
              </div>
            ))}
          </div>
        </CalloutCard>
      </div>
    </div>
  );
}

// ─── Advisor Dashboard ────────────────────────────────────────────────────────
function AdvisorView({ active, set }: { active: number | null; set: (n: number | null) => void }) {
  const C = CALLOUTS.advisor;
  const cm = (n: number) => ({ n, active: active === n, onClick: () => set(active === n ? null : n), title: C[n-1].title, desc: C[n-1].desc });
  const hi = (n: number) => active === n
    ? "border-teal-400 shadow-[0_0_0_2px_rgba(20,184,166,0.15)]"
    : "border-white/[0.05]";

  return (
    <div className="flex rounded-xl overflow-hidden border border-white/[0.06]" style={{ minHeight: 560 }}>
      {/* Sidebar */}
      <nav className="w-44 shrink-0 bg-navy-950 border-r border-white/[0.06] py-5 flex flex-col">
        <div className="px-4 mb-5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
            <Activity size={13} className="text-teal-400" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-bold text-white tracking-wider">SUCCESS</p>
            <p className="text-[10px] font-bold text-teal-400 tracking-wider">SENTINEL</p>
          </div>
        </div>
        {[
          { icon: Home,      label: "Overview",  on: true  },
          { icon: Users,     label: "Students",  on: false },
          { icon: Bell,      label: "Alerts",    on: false },
          { icon: BarChart2, label: "Analytics", on: false },
          { icon: FileText,  label: "Reports",   on: false },
          { icon: Settings,  label: "Settings",  on: false },
        ].map(n => (
          <button key={n.label} className={`relative flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors
            ${n.on
              ? "text-teal-400 bg-teal-500/10 before:absolute before:left-0 before:inset-y-0 before:w-0.5 before:bg-teal-400"
              : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"}`}>
            <n.icon size={14} />
            {n.label}
          </button>
        ))}
      </nav>

      {/* Main area */}
      <div className="flex-1 bg-navy-900 overflow-auto">
        <div className="p-5 flex flex-col gap-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "AT-RISK STUDENTS", val: "156", sub: "15% of total",     delta: "+12%", bad: true,  Icon: Users    },
              { label: "ALERTS TODAY",     val: "12",  sub: "Require attention", delta: "+3",   bad: true,  Icon: Bell     },
              { label: "ACTIVE CASES",     val: "34",  sub: "In intervention",   delta: "+1",   bad: false, Icon: Activity },
            ].map(s => (
              <div key={s.label} className="rounded-xl bg-navy-800/70 border border-white/[0.05] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] text-slate-400 tracking-widest">{s.label}</span>
                  <s.Icon size={11} className="text-slate-500" />
                </div>
                <p className="text-3xl font-bold text-white">{s.val}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{s.sub}</p>
                <div className={`flex items-center gap-0.5 mt-1.5 text-[10px] ${s.bad ? "text-red-400" : "text-teal-400"}`}>
                  <ArrowUpRight size={10} />
                  <span>{s.delta} from last week</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-3">
            {/* Risk trend */}
            <div className="rounded-xl bg-navy-800/70 border border-white/[0.05] p-4">
              <p className="text-[9px] text-slate-400 tracking-widest mb-3">RISK TREND · LAST 8 WEEKS</p>
              <Spark data={RISK_TREND} color="#ef4444" w={200} h={56} />
              <div className="flex justify-between mt-1.5 text-[9px] text-slate-500">
                {WEEKS.map(w => <span key={w}>{w}</span>)}
              </div>
            </div>

            {/* Alert summary */}
            <CalloutCard calloutN={3} active={active === 3} onToggle={n => set(active === n ? null : n)} className={`rounded-xl border p-4 transition-all ${hi(3)} bg-navy-800/70`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] text-slate-400 tracking-widest">ALERT SUMMARY</p>
                <CalloutMarker {...cm(3)} />
              </div>
              <div className="space-y-2">
                {[
                  { sev: "red",    msg: "Alex Rivera — 3+ assignments missed",     time: "Today"      },
                  { sev: "yellow", msg: "Jordan Lee — attendance below threshold",  time: "Yesterday"  },
                  { sev: "yellow", msg: "Casey Nguyen — grade drop in 2+ courses", time: "2 days ago" },
                  { sev: "blue",   msg: "Maya Patel — low discussion engagement",  time: "3 days ago" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      a.sev === "red" ? "bg-red-500/20" : a.sev === "yellow" ? "bg-amber-500/20" : "bg-blue-500/20"
                    }`}>
                      <AlertTriangle size={9} className={
                        a.sev === "red" ? "text-red-400" : a.sev === "yellow" ? "text-amber-400" : "text-blue-400"
                      } />
                    </div>
                    <span className="flex-1 text-[11px] text-slate-300 truncate">{a.msg}</span>
                    <span className="text-[9px] text-slate-500 shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </CalloutCard>
          </div>

          {/* At-risk student table */}
          <CalloutCard calloutN={1} active={active === 1} onToggle={n => set(active === n ? null : n)} className={`rounded-xl border p-4 transition-all bg-navy-800/70 ${active === 1 ? "border-teal-400 shadow-[0_0_0_2px_rgba(20,184,166,0.12)]" : "border-white/[0.05]"}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <p className="text-[9px] text-slate-400 tracking-widest">AT-RISK STUDENTS</p>
                <CalloutMarker {...cm(1)} />
              </div>
              <button className="text-[10px] text-teal-400 hover:text-teal-300 transition-colors">View all →</button>
            </div>
            {/* Column headers */}
            <div className="grid gap-2 px-2 py-1.5 text-[9px] text-slate-500 tracking-wider border-b border-white/[0.04] mb-1"
              style={{ gridTemplateColumns: "1fr 90px 110px 80px 24px" }}>
              <span>STUDENT</span>
              <span>MAJOR</span>
              <div className="flex items-center gap-1.5">
                <span>RISK SCORE</span>
                <CalloutMarker {...cm(2)} />
              </div>
              <span>LAST CONTACT</span>
              <span />
            </div>
            {AT_RISK_STUDENTS.map((s, i) => (
              <div key={i} className="grid gap-2 items-center px-2 py-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
                style={{ gridTemplateColumns: "1fr 90px 110px 80px 24px" }}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.sev === "red" ? "bg-red-400" : "bg-amber-400"}`} />
                  <span className="text-xs text-slate-200 truncate">{s.name}</span>
                </div>
                <span className="text-[11px] text-slate-400 truncate">{s.major}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold shrink-0" style={{ color: scoreBg(s.score) }}>{s.score}</span>
                  <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.score}%`, backgroundColor: scoreBg(s.score) }} />
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">{s.last}</span>
                <ChevronRight size={13} className="text-slate-600" />
              </div>
            ))}
          </CalloutCard>

          {/* Intervention log */}
          <CalloutCard calloutN={4} active={active === 4} onToggle={n => set(active === n ? null : n)} className={`rounded-xl border p-4 transition-all bg-navy-800/70 ${hi(4)}`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[9px] text-slate-400 tracking-widest">INTERVENTION LOG</p>
              <CalloutMarker {...cm(4)} />
            </div>
            <div className="space-y-3">
              {[
                { who: "Alex Rivera",  what: "Email sent re: ECON 301 absences",        when: "Apr 24, 2:15 PM",  Icon: MessageSquare },
                { who: "Jordan Lee",   what: "Meeting scheduled — May 1 at 10:00 AM",   when: "Apr 23, 11:00 AM", Icon: Calendar      },
                { who: "Casey Nguyen", what: "Referred to tutoring center for BIOL 202", when: "Apr 22, 3:45 PM",  Icon: BookOpen      },
              ].map((l, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.07] flex items-center justify-center shrink-0 mt-0.5">
                    <l.Icon size={11} className="text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-slate-200">{l.who}</span>
                    <span className="text-xs text-slate-400"> — {l.what}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">{l.when}</span>
                </div>
              ))}
            </div>
          </CalloutCard>
        </div>
      </div>
    </div>
  );
}

// ─── Professor Dashboard ──────────────────────────────────────────────────────
function ProfView({ active, set }: { active: number | null; set: (n: number | null) => void }) {
  const C = CALLOUTS.professor;
  const cm = (n: number) => ({ n, active: active === n, onClick: () => set(active === n ? null : n), title: C[n-1].title, desc: C[n-1].desc });
  const hi = (n: number) => active === n
    ? "border-teal-400 shadow-[0_0_0_2px_rgba(20,184,166,0.15)]"
    : "border-white/[0.06]";

  return (
    <div className="flex flex-col gap-4">
      {/* Course header */}
      <div className="rounded-xl bg-navy-900 border border-white/[0.06] p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={13} className="text-teal-400" />
              <span className="text-[10px] text-teal-400 tracking-widest">ECON 301 · SECTION 02 · SPRING 2026</span>
            </div>
            <h2 className="text-lg font-serif font-bold text-white">Macroeconomics</h2>
            <p className="text-xs text-slate-400 mt-0.5">Prof. Marcus Webb · 38 enrolled</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">74%</p>
              <p className="text-[9px] text-slate-400 tracking-wider mt-0.5">AVG ATTENDANCE</p>
            </div>
            <div className="w-px h-10 bg-white/[0.08]" />
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">68%</p>
              <p className="text-[9px] text-slate-400 tracking-wider mt-0.5">COMPLETION RATE</p>
            </div>
            <div className="w-px h-10 bg-white/[0.08]" />
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">11</p>
              <p className="text-[9px] text-slate-400 tracking-wider mt-0.5">AT-RISK</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Attendance trend */}
        <CalloutCard calloutN={1} active={active === 1} onToggle={n => set(active === n ? null : n)} className={`rounded-xl bg-navy-900 border p-5 transition-all ${hi(1)}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] text-slate-400 tracking-widest">CLASS ATTENDANCE TREND</p>
            <CalloutMarker {...cm(1)} />
          </div>
          <Spark data={ATT_TREND} color="#f59e0b" w={220} h={56} />
          <div className="flex justify-between mt-1.5 text-[9px] text-slate-500">
            {WEEKS.map(w => <span key={w}>{w}</span>)}
          </div>
          <p className="text-[10px] text-amber-400 mt-2.5 flex items-center gap-1">
            <AlertTriangle size={10} />
            Down 21 pts from W1 — early warning triggered
          </p>
        </CalloutCard>

        {/* Assignment heatmap */}
        <CalloutCard calloutN={2} active={active === 2} onToggle={n => set(active === n ? null : n)} className={`rounded-xl bg-navy-900 border p-5 transition-all ${hi(2)}`}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-slate-400 tracking-widest">ASSIGNMENT COMPLETION</p>
            <CalloutMarker {...cm(2)} />
          </div>
          <div className="space-y-3">
            {[
              { name: "Problem Set 3",  pct: 62, color: "#ef4444" },
              { name: "Midterm Essay",  pct: 78, color: "#f59e0b" },
              { name: "Reading Quiz 7", pct: 85, color: "#14b8a6" },
              { name: "Discussion 4",   pct: 71, color: "#f59e0b" },
            ].map(a => (
              <div key={a.name}>
                <p className="text-[10px] text-slate-400 mb-1">{a.name}</p>
                <Bar pct={a.pct} color={a.color} />
              </div>
            ))}
          </div>
        </CalloutCard>
      </div>

      {/* Student table — two callouts (3 & 4) share this card; clicking anywhere toggles whichever is unset */}
      <div className={`rounded-xl bg-navy-900 border p-5 transition-all ${active === 3 || active === 4 ? "border-teal-400 shadow-[0_0_0_2px_rgba(20,184,166,0.12)]" : "border-white/[0.06]"}`}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] text-slate-400 tracking-widest">STUDENT PERFORMANCE</p>
          <button className="text-[10px] text-teal-400 hover:text-teal-300 transition-colors">Export →</button>
        </div>
        {/* Headers */}
        <div className="grid gap-3 px-2 py-1.5 text-[9px] text-slate-500 tracking-wider border-b border-white/[0.04] mb-1"
          style={{ gridTemplateColumns: "1fr 64px 80px 120px 96px" }}>
          <span>STUDENT</span>
          <span>GRADE</span>
          <span>ATTENDANCE</span>
          <div className="flex items-center gap-1.5">
            <span>ENGAGEMENT</span>
            <CalloutMarker {...cm(4)} />
          </div>
          <div className="flex items-center gap-1.5">
            <span>ACTION</span>
            <CalloutMarker {...cm(3)} />
          </div>
        </div>
        {CLASS_STUDENTS.map((s, i) => (
          <div key={i} className="grid gap-3 items-center px-2 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors"
            style={{ gridTemplateColumns: "1fr 64px 80px 120px 96px" }}>
            <span className="text-xs text-slate-200">{s.name}</span>
            <span className={`text-xs font-bold ${gradeColor(s.grade)}`}>{s.grade}%</span>
            <span className={`text-xs ${attColor(s.att)}`}>{s.att}%</span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium shrink-0 ${engColor(s.engage)}`}>{s.engage}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${s.engage}%`, backgroundColor: engBg(s.engage) }} />
              </div>
            </div>
            {s.flag ? (
              <button className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25 hover:bg-amber-500/25 transition-colors w-fit">
                <Flag size={10} />
                Flag
              </button>
            ) : (
              <span className="text-[11px] text-slate-600">—</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const ROLES: { id: Role; label: string; desc: string }[] = [
  { id: "student",   label: "Student",   desc: "Success score, course flags, action plan" },
  { id: "advisor",   label: "Advisor",   desc: "At-risk list, alert queue, intervention log" },
  { id: "professor", label: "Professor", desc: "Class trends, engagement scores, one-click flags" },
];

export default function DemoPage() {
  const [role, setRole] = useState<Role>("advisor");
  const [active, setActive] = useState<number | null>(null);

  function switchRole(r: Role) {
    setRole(r);
    setActive(null);
  }

  return (
    <main className="min-h-screen bg-[#07091a] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Navigation back */}
        <div className="pt-10 mb-10 flex items-center justify-between">
          <a href="/#solution" className="text-sm text-slate-500 hover:text-teal-400 transition-colors">
            ← Back to main site
          </a>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-teal-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Interactive Demo</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-3">
            See Success Sentinel in action
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Switch between roles to explore each perspective. Click a numbered marker to see what each feature does.
          </p>
        </div>

        {/* Role selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {ROLES.map(r => (
            <button
              key={r.id}
              onClick={() => switchRole(r.id)}
              className={`px-5 py-3 rounded-xl border text-left transition-all duration-200 min-w-[160px]
                ${role === r.id
                  ? "bg-teal-500/10 border-teal-500/50"
                  : "bg-navy-900/60 border-white/[0.07] hover:border-white/[0.14]"}`}
            >
              <p className={`text-sm font-semibold ${role === r.id ? "text-teal-400" : "text-slate-300"}`}>
                {r.label}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{r.desc}</p>
            </button>
          ))}
        </div>

        {/* Dashboard */}
        <div>
          {role === "student"   && <StudentView active={active} set={setActive} />}
          {role === "advisor"   && <AdvisorView active={active} set={setActive} />}
          {role === "professor" && <ProfView    active={active} set={setActive} />}
        </div>
      </div>
    </main>
  );
}
