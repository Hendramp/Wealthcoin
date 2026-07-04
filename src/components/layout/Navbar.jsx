import { IconCoin } from '../shared/Icons';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#D4AF37]/10 bg-[#0A0A0A]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <IconCoin />
          </div>

          <div>
            <p className="font-display text-lg font-bold gold-text">
              WealthCoin
            </p>
            <p className="text-xs text-white/40">
              Built on Polygon
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#academy" className="hover:text-[#D4AF37] transition">Academy</a>
          <a href="#documents" className="hover:text-[#D4AF37] transition">Documents</a>
          <a href="#foundation" className="hover:text-[#D4AF37] transition">Foundation</a>
          <a href="#community" className="hover:text-[#D4AF37] transition">Community</a>
        </nav>

        <a
          href="#connect"
          className="btn-gold px-5 py-2 rounded-xl font-semibold text-sm"
        >
          Connect Wallet
        </a>
      </div>
    </header>
  );
}