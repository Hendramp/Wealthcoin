import React, { useEffect, useState } from "react";

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
    title: "Executive Whitepaper",
    description:
      "The official founding document of WealthCoin outlining our mission, governance framework, treasury philosophy, biblical stewardship, tokenomics, roadmap, and long-term organizational vision.",
    href: "https://1drv.ms/w/c/57767ff08af6e049/IQACoBD45nrwTIdTFM5pXGqOAZDhUtu9yirMwBbneRL-GHY?e=65bYW9",
    buttonLabel: "Read Whitepaper",
    edition: "Version 1.0 • Living Document",
    available: true,
    external: true,
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

  useEffect(() => {
    if (!activeDocument) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    function handleEscape(event) {
      if (event.key === "Escape") {
        setActiveDocument(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeDocument]);

  function openDocument(resource) {
    if (resource.external) {
      window.open(resource.href, "_blank", "noopener,noreferrer");
      return;
    }

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1024px)").matches;

    if (isMobile) {
      window.open(resource.href, "_blank", "noopener,noreferrer");
      return;
    }

    setActiveDocument(resource);
  }
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
        className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#071009] px-4 py-16 text-white sm:px-6 sm:py-24"
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

          <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <article
                key={resource.title}
                className={`relative flex min-h-0 flex-col overflow-hidden rounded-2xl border p-5 transition duration-300 sm:min-h-[390px] sm:p-7 ${
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
                    <div className="mt-7">
                      {resource.edition && (
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                          {resource.edition}
                        </p>
                      )}

                      {resource.external ? (
                        <button
                          type="button"
                          onClick={() => openDocument(resource)}
                          className="btn-gold min-h-[50px] w-full rounded-xl px-4 py-3 text-sm font-bold"
                        >
                          {resource.buttonLabel}
                        </button>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => openDocument(resource)}
                            className="btn-gold min-h-[50px] w-full rounded-xl px-4 py-3 text-sm font-bold"
                          >
                            {resource.previewLabel}
                          </button>

                          <a
                            href={resource.href}
                            download
                            className="btn-ghost flex min-h-[50px] w-full items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-bold"
                          >
                            {resource.downloadLabel}
                          </a>
                        </div>
                      )}
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

      {activeDocument && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="document-preview-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveDocument(null);
            }
          }}
        >
          <div className="flex h-[92svh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#020403] shadow-[0_0_70px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#D4AF37]/20 px-4 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Document Preview
                </p>

                <h2
                  id="document-preview-title"
                  className="mt-1 truncate font-display text-lg text-[#D4AF37] sm:text-xl"
                >
                  {activeDocument.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveDocument(null)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-black/50 text-xl text-white/75 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                aria-label="Close document preview"
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-[#111]">
              <iframe
                src={`${activeDocument.href}#toolbar=1&navpanes=0&view=FitH`}
                title={`${activeDocument.title} PDF preview`}
                className="h-full w-full border-0"
              />
            </div>

            <div className="grid gap-3 border-t border-[#D4AF37]/20 p-3 sm:grid-cols-2 sm:p-4">
              <a
                href={activeDocument.href}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost flex min-h-[48px] items-center justify-center rounded-xl px-5 py-3 text-sm font-bold"
              >
                Open Full Screen
              </a>

              <a
                href={activeDocument.href}
                download
                className="btn-gold flex min-h-[48px] items-center justify-center rounded-xl px-5 py-3 text-sm font-bold"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}