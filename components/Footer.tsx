export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <a
            href="#hero"
            className="text-xl font-bold tracking-tight flex items-center gap-2"
          >
            <img src="/logo.png" alt="Success Sentinel" className="h-10 w-10" />
            <span className="text-white font-mono">SUCCESS SENTINEL</span>
          </a>
          <p className="text-slate-600 text-xs">
            CMU · 67-250 Information Systems People Project
          </p>
        </div>
        <div className="flex items-center gap-8">
          {["Problem", "Solution", "Strategy", "Impact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 hover:text-teal-400 transition-colors duration-200"
            >
              {l}
            </a>
          ))}
          <a
            href="/style"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 hover:text-teal-400 transition-colors duration-200"
          >
            Style Guide
          </a>
        </div>
      </div>
    </footer>
  );
}
