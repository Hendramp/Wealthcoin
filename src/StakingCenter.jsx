const tiers = [
  {
    name: 'Flexible',
    apy: '3.0%',
    term: 'No lock',
    description: 'Earn rewards while retaining flexibility.',
    governance: 'Not governance eligible',
  },
  {
    name: '90 Days',
    apy: '5.0%',
    term: 'Short-term commitment',
    description: 'Increased rewards for committed participation.',
    governance: 'Governance eligible',
  },
  {
    name: '180 Days',
    apy: '6.5%',
    term: 'Medium-term commitment',
    description: 'Greater rewards for longer ecosystem support.',
    governance: 'Governance eligible',
  },
  {
    name: '365 Days',
    apy: '8.0%',
    term: 'Long-term steward',
    description: 'Highest rewards for long-term commitment.',
    governance: 'Governance eligible',
  },
];

export default function StakingCenter() {
  return (
    <section id="staking" className="section-padding bg-[#0A0A0A] relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-[#D4AF37] font-semibold tracking-[0.3em] uppercase text-sm mb-4">
            Stewardship Staking
          </p>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Stake With <span className="gold-text">Purpose</span>
          </h2>

          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Commit to the long-term health of the WealthCoin ecosystem while earning sustainable rewards
            and participating in eligible governance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="glass-card p-6 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition"
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>

              <div className="text-4xl font-black gold-text mb-3">
                {tier.apy}
              </div>

              <p className="text-white/60 text-sm mb-4">{tier.term}</p>

              <p className="text-white/75 mb-5">
                {tier.description}
              </p>

              <div className="text-sm text-[#D4AF37] font-semibold mb-6">
                {tier.governance}
              </div>

              <button className="btn-gold w-full py-3 rounded-xl font-bold">
                Begin Staking
              </button>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 border border-[#D4AF37]/20">
          <h3 className="text-2xl font-bold mb-4">Why Stake?</h3>

          <p className="text-white/70 leading-relaxed mb-4">
            Staking is designed to encourage long-term participation in the WealthCoin ecosystem.
            Eligible participants receive sustainable rewards and may participate in governance while
            helping strengthen the long-term health of the community.
          </p>

          <p className="text-white/50 text-sm">
            Reward rates are estimates and may evolve over time through transparent governance and
            long-term ecosystem sustainability decisions.
          </p>
        </div>
      </div>
    </section>
  );
}