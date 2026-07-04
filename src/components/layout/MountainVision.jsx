export default function MountainVision() {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.35em] font-semibold mb-4">
            The Steward&apos;s Journey
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
            Every steward starts at the base.
          </h2>

          <p className="text-white/55 leading-relaxed mb-8">
            Growth is upward, but the climb can be steep. WealthCoin is built
            to guide people step by step through education, community,
            transparency, and long-term utility.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['🏕️', 'Base Camp', 'Everyone starts somewhere.'],
              ['🎓', 'Education', 'Learn before you climb.'],
              ['🤝', 'Community', 'Do not climb alone.'],
              ['🏔️', 'Summit', 'Help others climb.'],
            ].map(([icon, title, text]) => (
              <div key={title} className="card-gold rounded-2xl p-5">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-white/45 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] rounded-3xl border border-[#D4AF37]/20 bg-[#0f0f0f] overflow-hidden card-gold-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.18),transparent_35%)]" />

          <svg viewBox="0 0 600 420" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <path d="M0 380 L170 170 L250 270 L380 90 L600 380 Z" fill="rgba(212,175,55,0.13)" />
            <path d="M170 170 L210 220 L250 270 L380 90 L445 180 L600 380 L0 380 Z" fill="rgba(255,255,255,0.04)" />
            <path d="M380 90 L340 155 L395 135 L430 195 Z" fill="rgba(255,215,0,0.28)" />
            <path d="M70 335 C170 285, 255 290, 330 230 C410 165, 465 175, 535 125" fill="none" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 14" />
            <circle cx="70" cy="335" r="10" fill="#D4AF37" />
            <circle cx="535" cy="125" r="12" fill="#FFD700" />
          </svg>

          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/50 border border-[#D4AF37]/20 p-5 backdrop-blur">
            <p className="text-[#D4AF37] font-semibold mb-1">
              Helping Others Climb
            </p>
            <p className="text-white/55 text-sm">
              The summit is not just reaching the top. It is turning back to
              guide, encourage, and serve others.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}