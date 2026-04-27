const members = [
  {
    name: "Matthew Rao",
    design: "Website Design",
    responsible: "Information Systems Solution",
  },
  {
    name: "Ethan Vo",
    design: "Poster Design",
    responsible: "Strategic Analysis",
  },
  {
    name: "Seth Martin",
    design: "Poster Design",
    responsible: "Applying Social Theories",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-32 px-6 bg-navy-900/40">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-teal-400 font-semibold text-xs uppercase tracking-[0.2em] mb-5">Team</p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-14">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((m) => (
            <div key={m.name} className="rounded-xl border border-white/5 bg-navy-900 p-10 flex flex-col gap-4 text-left">
              <h3 className="font-serif text-2xl font-bold text-white">{m.name}</h3>
              <div>
                <p className="text-teal-400 font-semibold text-xs uppercase tracking-[0.15em] mb-1">Design</p>
                <p className="text-slate-300 text-sm">{m.design}</p>
              </div>
              <div>
                <p className="text-teal-400 font-semibold text-xs uppercase tracking-[0.15em] mb-1">Responsible For</p>
                <p className="text-slate-300 text-sm">{m.responsible}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
