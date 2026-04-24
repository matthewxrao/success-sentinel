export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div>
          <span className="text-blue-400 font-semibold">Success</span>
          <span className="text-violet-400 font-semibold">Sentinel</span>
          <span className="ml-3">,  CMU 67-250 Information Systems Milestone Project</span>
        </div>
        <div className="flex gap-6">
          {["Problem", "Solution", "Strategy", "Impact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-gray-300 transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
