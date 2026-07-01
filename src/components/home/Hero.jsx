import { IconCoin } from "../shared/Icons";

export default function Hero({ account, connectWallet }) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-4 pt-10 pb-20">
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 mountain-bg" />
      <div className="absolute inset-0 grid-overlay opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <VerseCard title="Genesis 2:15">
            “The Lord God took the man and put him in the Garden of Eden to work it and keep it.”
          </VerseCard>

          <VerseCard title="Psalm 127:1">
            “Unless the Lord builds the house, those who build it labor in vain.”
          </VerseCard>
        </div>

        <div className="w-36 h-36 mx-auto mb-6 animate-float coin-glow">
          <IconCoin />
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#8247E5]/50 bg-[#8247E5]/10 text-[#B47CFF] text-sm uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-[#8247E5]" />
          Live on Polygon Network
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-5">
          <span className="gold-text-shimmer block">BUILD</span>
          <span className="gold-text-shimmer block">GENERATIONAL</span>
          <span className="text-white block">LEGACY</span>
        </h1>

        <p className="text-[#D4AF37]/80 text-xl mb-4">
          Rooted in Scripture — Built for Stewardship
        </p>

        <p className="text-white/60 max-w-3xl mx-auto mb-10">
          WealthCoin is a faith-driven ecosystem built on Polygon for education,
          transparency, community, and long-term utility.
        </p>

        <div className="hero-panel rounded-3xl p-6 md:p-8 max-w-6xl mx-auto">
          <h2 className="font-display gold-text text-3xl font-bold mb-2">
            Where are you on your journey?
          </h2>

          <p className="text-white/55 mb-8">
            Choose the path that best fits you.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-left">
            <JourneyCard
              icon="🏕️"
              title="I’m Brand New"
              text="Start at Base Camp with WealthCoin Academy and learn wallets, Polygon, POL, and safety step by step."
              button="Begin My Journey"
              href="#academy"
            />

            <button onClick={connectWallet} className="journey-card text-left">
              <div className="text-4xl mb-4">👛</div>
              <h3 className="font-display text-[#D4AF37] text-xl font-bold mb-3">
                I’ve Used Crypto Before
              </h3>
              <p className="text-white/55 text-sm mb-6">
                Skip the basics, connect your wallet, confirm Polygon, and continue toward the presale.
              </p>
              <span className="journey-button">
                {account ? "Wallet Connected" : "Connect Wallet"} →
              </span>
            </button>

            <JourneyCard
              icon="🪙"
              title="I Own WealthCoin"
              text="Go to your future dashboard for holdings, Academy progress, community, governance, and ecosystem updates."
              button="Go to Dashboard"
              href="#dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function VerseCard({ title, children }) {
  return (
    <div className="card-gold rounded-2xl p-5 text-left">
      <p className="text-[#D4AF37] font-bold">{title}</p>
      <p className="text-white/70 italic mt-2">{children}</p>
    </div>
  );
}

function JourneyCard({ icon, title, text, button, href }) {
  return (
    <a href={href} className="journey-card">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-display text-[#D4AF37] text-xl font-bold mb-3">
        {title}
      </h3>
      <p className="text-white/55 text-sm mb-6">{text}</p>
      <span className="journey-button">{button} →</span>
    </a>
  );
}