import React, { useState } from "react";
import DocumentViewer from "../shared/DocumentViewer";

const resources = [
  {
    icon: "📜",
    title: "Founding Charter",
    description:
      "Our formal commitment to biblical stewardship, transparency, service, integrity, and long-term responsibility.",
    href: "/documents/WealthCoin_Founding_Charter.pdf",
    previewLabel: "Preview",
    downloadLabel: "Download",
    available: true,
  },
  {
    icon: "🌍",
    title: "Ecosystem Overview",
    description:
      "Explore how WealthCoin connects education, community, commerce, governance, and responsible stewardship.",
    href: "/documents/WealthCoin_Ecosystem_Overview.pdf",
    previewLabel: "Preview",
    downloadLabel: "Download",
    available: true,
  },
  {
    icon: "📖",
    title: "WealthCoin Whitepaper",
    description:
      "A comprehensive presentation of WealthCoin’s biblical foundation, technical architecture, tokenomics, treasury philosophy, governance framework, security considerations, and long-term roadmap.",
    status: "Currently in development",
    available: false,
  },
];

const riskFactors = [
  "Market Volatility",
  "Smart Contract Risk",
  "Liquidity Risk",
  "Regulatory Changes",
  "Personal Responsibility",
];

export default function FoundationSection() {
  const [activeDocument, setActiveDocument] = useState(null);

  const scrollToLibrary = () => {
    document.getElementById("library")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <section
        id="foundation"
        className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#071009] px-6 py-24 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.09),transparent_40%),radial-gradient(circle_at_85%_75%,rgba(24,85,48,0.12),transparent_35%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-sm uppercase tracking-[0.4em] text-[#D4AF37]">
              The Foundation
            </p>

            <h2 className="gold-text mt-5 font-display text-4xl font-bold sm:text-5xl">
              Built for Stewardship
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
              Explore the foundational documents that define WealthCoin,
              communicate its vision, and establish the principles guiding its
              continued development.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <article
                key={resource.title}
                className={`relative flex min-h-[390px] flex-col overflow-hidden rounded-2xl border p-7 transition duration-300 ${
                  resource.available
                    ? "border-[#D4AF37]/25 bg-black/45 hover:-translate-y-1 hover:border-[#D4AF37]/55"
                    : "border-[#D4AF37]/20 bg-black/35"
                }`}
              >
                {!resource.available && (
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(212,175,55,0.10),transparent_35%)]" />
                )}

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-4xl" aria-hidden="true">
                      {resource.icon}
                    </div>

                    {!resource.available && (
                      <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                        In Development
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-xl text-[#D4AF37]">
                    {resource.title}
                  </h3>

                  <p className="mt-4 flex-1 leading-7 text-white/65">
                    {resource.description}
                  </p>

                  {resource.available ? (
                    <div className="mt-7 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveDocument(resource)}
                        className="btn-gold rounded-xl px-4 py-3 text-sm font-bold"
                      >
                        {resource.previewLabel}
                      </button>

                      <a
                        href={resource.href}
                        download
                        className="btn-ghost rounded-xl px-4 py-3 text-center text-sm font-bold"
                      >
                        {resource.downloadLabel}
                      </a>
                    </div>
                  ) : (
                    <div className="mt-7">
                      <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-5 py-4 text-center">
                        <p className="font-display text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                          {resource.status}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-white/50">
                          The whitepaper will be released after its research,
                          review, and stewardship process is complete.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
                    <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-black/45 shadow-[0_0_35px_rgba(212,175,55,0.05)]">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
                  New to Cryptocurrency?
                </p>

                <h3 className="mt-3 font-display text-2xl text-white sm:text-3xl">
                  Begin With the Wallet Guide
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
                  Our beginner-friendly guides explain how to choose a
                  compatible wallet, use the Polygon network, connect to
                  WealthCoin, and purchase WTC responsibly.
                </p>

                <div className="mt-5 grid gap-2 text-sm text-white/55 sm:grid-cols-2">
                  <p>✓ Choose and set up a compatible wallet</p>
                  <p>✓ Add or use the Polygon network</p>
                  <p>✓ Connect your wallet to WealthCoin</p>
                  <p>✓ Follow the purchase steps safely</p>
                </div>
              </div>

              <button
                type="button"
                onClick={scrollToLibrary}
                className="btn-gold w-full rounded-xl px-6 py-4 text-sm font-bold lg:w-auto"
              >
                Begin With the Wallet Guide →
              </button>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl border-y border-[#D4AF37]/20 py-8 text-center">
            <p className="font-display text-xl italic leading-9 text-white/75 sm:text-2xl">
              “For which of you, intending to build a tower, sitteth not down
              first, and counteth the cost...”
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
              Luke 14:28
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-black/45 shadow-[0_0_35px_rgba(212,175,55,0.05)]">
            <div className="border-b border-[#D4AF37]/15 px-6 py-6 sm:px-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-red-300">
                  Risk
                </span>

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Transparency &amp; Risk Disclosure
                </p>
              </div>

              <h3 className="mt-4 font-display text-2xl text-white sm:text-3xl">
                Responsible Participation Begins With Understanding the Risks
              </h3>
            </div>

            <div className="px-6 py-8 sm:px-8">
              <p className="text-sm leading-7 text-white/60 sm:text-base">
                WealthCoin is committed to transparency. Digital assets involve
                substantial risk, including market volatility, liquidity
                constraints, technological vulnerabilities, and evolving
                regulations. Token utility, market value, platform development,
                liquidity, and governance outcomes are not guaranteed.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {riskFactors.map((factor) => (
                  <div
                    key={factor}
                    className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-red-400">⚠</span>

                      <span className="text-sm font-semibold text-white/85">
                        {factor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/60 p-5">
                <p className="text-sm leading-6 text-white/55">
                  Participation should be based on independent research,
                  responsible financial stewardship, and careful consideration
                  of personal circumstances. Never commit funds you cannot
                  afford to lose.
                </p>
              </div>

              <p className="mt-6 text-xs leading-6 text-white/35">
                This disclosure is provided for transparency and education only
                and should not be interpreted as financial, legal, tax, or
                investment advice.
              </p>
            </div>
          </div>
                    <div className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-base leading-8 text-white/65 sm:text-lg">
              WealthCoin seeks to honor God through responsible stewardship,
              transparency, education, and service. Every feature, partnership,
              and future initiative is intended to be developed with
              accountability, wisdom, and a long-term commitment to serving the
              community faithfully.
            </p>
          </div>
        </div>
      </section>

      <DocumentViewer
        isOpen={Boolean(activeDocument)}
        title={activeDocument?.title}
        pdfUrl={activeDocument?.href}
        onClose={() => setActiveDocument(null)}
      />
    </>
  );
}