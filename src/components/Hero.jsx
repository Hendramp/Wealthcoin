import { IconCoin } from './Icons';

export default function Hero({ account, onConnect }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 hero-bg"></div>
      <div className="absolute inset-0 grid-overlay opacity-10"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="w-28 h-28 mx-auto mb-6 animate-float drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
          <IconCoin />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8247E5]/10 border border-[#8247E5]/30 text-[#A670EF] text-xs font-medium mb-6 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8247E5] animate-pulse"></span>
          Built on Polygon
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="card-gold rounded-2xl p-5">
            <p className="text-[#D4AF37] font-semibold">Genesis 2:15</p>
            <p className="text-white/70 italic mt-2">
              “The Lord God took the man and put him in the garden of Eden to work it and keep it.”
            </p>
          </div>

          <div className="card-gold rounded-2xl p-5">
            <p className="text-[#D4AF37] font-semibold">Psalm 127:1</p>
            <p className="text-white/70 italic mt-2">
              “Unless the Lord builds the house, those who build it labor in vain.”
            </p>
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4">
          <span className="gold-text-shimmer">WealthCoin</span>
        </h1>

        <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          A stewardship-driven ecosystem built for education, community, transparency,
          and long-term utility.
        </p>

        <div className="card-gold-glow rounded-3xl p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Do you have a crypto wallet?
          </h2>

          <p className="text-white/55 mb-6">
            Choose your path. WealthCoin Academy will guide beginners step by step,
            while experienced users can connect and continue to the presale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!account ? (
              <button
                onClick={onConnect}
                className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold w-full sm:w-auto"
              >
                Yes, I Have a Wallet
              </button>
            ) : (
              <a
                href="#buy"
                className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold w-full sm:w-auto"
              >
                Continue to Presale
              </a>
            )}

            <a
              href="#academy"
              className="btn-ghost px-8 py-3.5 rounded-xl text-base font-semibold w-full sm:w-auto"
            >
              No, I’m New to Crypto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}