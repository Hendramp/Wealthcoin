import React from "react";

const TOTAL_SUPPLY = 1_000_000_000;
const LOGO_SRC = "/wealthcoin-logo.png";

const allocations = [
  {
    name: "Public Sale",
    percent: 30,
    amount: "300,000,000 WTC",
    tone: "#D4AF37",
    description:
      "Allocated for community distribution through public token sales.",
    detail: "Genesis: 7% • Future distribution: 23%",
  },
  {
    name: "Treasury",
    percent: 17,
    amount: "170,000,000 WTC",
    tone: "#A88C32",
    description:
      "Supports ecosystem development, operations, liquidity, and long-term sustainability.",
  },
  {
    name: "Missions & Donations",
    percent: 15,
    amount: "150,000,000 WTC",
    tone: "#4D7A42",
    description:
      "Reserved for Kingdom missions, charity, humanitarian efforts, and community initiatives.",
  },
  {
    name: "Staking",
    percent: 13,
    amount: "130,000,000 WTC",
    tone: "#365F35",
    description:
      "Rewards long-term participation and future ecosystem utility.",
  },
  {
    name: "Founder",
    percent: 12,
    amount: "120,000,000 WTC",
    tone: "#203F2A",
    description:
      "Reserved for founding stewardship and long-term project leadership.",
  },
  {
    name: "Burn Allocation",
    percent: 10,
    amount: "100,000,000 WTC",
    tone: "#756E4D",
    description:
      "Reserved for strategic burns supporting long-term supply stewardship.",
  },
  {
    name: "Marketing",
    percent: 3,
    amount: "30,000,000 WTC",
    tone: "#78984A",
    description:
      "Supports responsible promotion, outreach, partnerships, and community growth.",
  },
];

const libraryResources = [
  {
    title: "Wallet Guide — English",
    description:
      "A beginner-friendly guide for setting up a wallet, using Polygon, and purchasing WTC.",
    href: "/documents/Wallet_Guide_EN.pdf",
    label: "Open Guide",
  },
  {
    title: "Wallet Guide — Español",
    description:
      "Guía en español para configurar una billetera, usar Polygon y adquirir WTC.",
    href: "/documents/Wallet_Guide_ES.pdf",
    label: "Abrir Guía",
  },
];

const donutGradient =
  "conic-gradient(" +
  [
    "#D4AF37 0% 30%",
    "#A88C32 30% 47%",
    "#4D7A42 47% 62%",
    "#365F35 62% 75%",
    "#203F2A 75% 87%",
    "#756E4D 87% 97%",
    "#78984A 97% 100%",
  ].join(", ") +
  ")";

function AllocationCard({ allocation }) {
  return (
    <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
      <div className="flex items-start gap-3">
        <span
          className="mt-1 h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: allocation.tone }}
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="font-semibold text-white/85">
              {allocation.name}
            </p>

            <p className="font-display text-lg text-[#D4AF37]">
              {allocation.percent}%
            </p>
          </div>

          <p className="mt-1 text-sm text-white/70">
            {allocation.amount}
          </p>

          <p className="mt-2 text-xs leading-5 text-white/45">
            {allocation.description}
          </p>

          {allocation.detail && (
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]/75">
              {allocation.detail}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LibrarySection() {
  return (
    <section
      id="library"
      className="relative overflow-hidden border-t border-[#D4AF37]/15 bg-[#030604] px-4 py-16 text-white sm:px-6 sm:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(212,175,55,0.07),transparent_32%),radial-gradient(circle_at_80%_75%,rgba(28,90,48,0.13),transparent_38%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            WealthCoin Library
          </p>

          <h2 className="gold-text mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Knowledge, Transparency &amp; Stewardship
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
            Explore WealthCoin resources, educational materials, allocation
            information, and the economic structure supporting the long-term
            ecosystem.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-2xl border border-[#D4AF37]/20 bg-black/50 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">
              Educational Resources
            </p>

            <h3 className="mt-2 font-display text-2xl text-[#D4AF37]">
              Documents &amp; Guides
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Resources designed to help both new and experienced users
              interact with WealthCoin safely and confidently.
            </p>

            <div className="mt-5 space-y-3">
              {libraryResources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4 transition hover:border-[#D4AF37]/40 hover:bg-[#0a160d]"
                >
                  <p className="font-semibold text-white/85">
                    {resource.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    {resource.description}
                  </p>

                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                    {resource.label}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[#D4AF37]/15 bg-black/40 p-4">
              <p className="font-semibold text-white/80">
                Additional Library Materials
              </p>

              <p className="mt-1 text-xs leading-5 text-white/45">
                The Charter, project overview, risk disclosures, Academy
                lessons, governance materials, and treasury reports will
                continue to be added as development progresses.
              </p>
            </div>
          </div>

          <div
            id="tokenomics"
            className="rounded-2xl border border-[#D4AF37]/25 bg-black/55 p-5 shadow-[0_0_40px_rgba(212,175,55,0.05)] sm:p-6"
          >
            <div className="flex flex-col gap-3 border-b border-[#D4AF37]/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Economic Structure
                </p>

                <h3 className="mt-2 font-display text-2xl text-[#D4AF37] sm:text-3xl">
                  WealthCoin Tokenomics
                </h3>
              </div>

              <span className="w-fit rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-semibold text-[#D4AF37]">
                Initial Launch Allocation
              </span>
            </div>

            <div className="mt-6 grid items-center gap-7 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="relative mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border border-[#D4AF37]/30 shadow-[0_0_32px_rgba(212,175,55,0.08)]"
                  style={{ background: donutGradient }}
                />

                <div className="absolute inset-[21%] rounded-full border border-[#D4AF37]/30 bg-[#020403] shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]" />

                <div className="relative z-10 flex max-w-[66%] flex-col items-center text-center">
                  <img
                    src={LOGO_SRC}
                    alt="WealthCoin logo"
                    className="h-16 w-16 rounded-full object-contain sm:h-20 sm:w-20"
                  />

                  <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-white/40">
                    Total Supply
                  </p>

                  <p className="mt-1 font-display text-2xl text-[#D4AF37] sm:text-3xl">
                    {TOTAL_SUPPLY.toLocaleString()}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white/70">
                    WTC
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {allocations.map((allocation) => (
                  <AllocationCard
                    key={allocation.name}
                    allocation={allocation}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/60 p-4">
                <p className="font-semibold text-white/80">
                  Genesis Public Sale
                </p>

                <p className="mt-2 text-xs leading-5 text-white/45">
                  Genesis Early Access represents 7% of total supply,
                  equal to 21,000,000 WTC. It is the first portion of the
                  broader 30% public-sale allocation.
                </p>
              </div>

              <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/60 p-4">
                <p className="font-semibold text-white/80">
                  Liquidity Stewardship
                </p>

                <p className="mt-2 text-xs leading-5 text-white/45">
                  Liquidity is not a separate token allocation. It is
                  intended to be funded through Genesis proceeds and
                  treasury management.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Governance Notice
              </p>

              <p className="mt-2 text-xs leading-5 text-white/50">
                These allocations represent WealthCoin&apos;s initial
                launch tokenomics. As the ecosystem matures, future
                governance mechanisms may propose and approve changes to
                token allocations, treasury strategy, or ecosystem
                funding. Any approved changes are intended to be
                transparent, documented, and subject to the project&apos;s
                governance process.
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-950/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                Risk Notice
              </p>

              <p className="mt-2 text-xs leading-5 text-white/45">
                Digital assets may be volatile and involve substantial
                risk. Allocation plans, utility, liquidity, market value,
                and governance outcomes are not guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}