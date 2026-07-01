export default function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/10 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="font-display text-3xl gold-text mb-3">
          WealthCoin
        </h2>

        <p className="text-white/50 max-w-2xl mx-auto">
          Building a stewardship-driven ecosystem through education,
          transparency, community, and faithful service.
        </p>

        <div className="mt-8 text-sm text-white/30">
          © {new Date().getFullYear()} WealthCoin Foundation
        </div>

      </div>
    </footer>
  );
}