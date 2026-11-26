import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      "Explore WealthCoin’s mission, ecosystem, token structure, governance, and long-term vision.",
    href: "/documents/WealthCoin_Executive_Whitepaper_V1.0.pdf",
    previewLabel: "Preview",
    downloadLabel: "Download",
    edition: "Version 1.0",
    available: true,
    external: false,
  },
  {
    icon: "🧭",
    title: "Development Roadmap",
    description:
      "Explore WealthCoin's planned development phases, ecosystem milestones, and long-term implementation strategy.",
    href: "/documents/WTC_Development_Roadmap.pdf",
    previewLabel: "Preview",
    downloadLabel: "Download",
    edition:"Current Vision",
    available:true,
    external:false,
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
      document.body.classList.remove("scroll-locked");
      return undefined;
    }

    document.body.classList.add("scroll-locked");

    function handleEscape(event) {
      if (event.key === "Escape") {
        setActiveDocument(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("scroll-locked");
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

  return (
    <>
      <section
        id="foundation"
        className="relative overflow-hidden border-t border-accent/20 bg-surface px-4 py-16 text-white sm:px-6 sm:py-24"
      >
        <div className="absolute inset-0 bg-ambient" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-sm uppercase tracking-[0.4em] text-accent">
              The Foundation
            </p>

            <h2 className="gold-text mt-5 font-display text-4xl font-bold sm:text-5xl">
              Built for Stewardship
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-secondary">
              Explore the foundational documents that define WealthCoin,
              communicate its vision, and establish the principles guiding its
              continued development.

            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              {
                title: "Our Mission",
                text: "WealthCoin advances responsible digital-asset education, implementation, and stewardship through transparent tools and practical learning.",
              },
              {
                title: "Our Method",
                text: "We lead with education, explain risks clearly, and build systems around security, accountability, and informed participation.",
              },
              {
                title: "Our Commitment",
                text: "We prioritize community outcomes, accountable practice, and patient long-term stewardship.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-card border border-border-subtle/25 bg-surface p-6"
              >
                <h3 className="text-xl font-semibold text-accent">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-secondary">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center justify-between gap-5 rounded-2xl border border-accent/25 bg-black/35 p-5 sm:flex-row sm:p-6">
            <div className="flex items-center gap-4">
              <img
                src="/assets/logos/polygon-logo.png"
                alt=""
                aria-hidden="true"
                className="h-10 w-10 shrink-0 object-contain"
              />
              <div>
                <p className="font-display text-lg font-semibold text-primary">
                  The Founder&apos;s Story
                </p>
                <p className="mt-1 text-sm leading-6 text-secondary">
                  The conviction and hands-on journey behind WealthCoin.
                </p>
              </div>
            </div>
            <Link
              to="/founder"
              className="btn-ghost min-h-11 w-full px-5 py-2.5 font-semibold sm:w-auto"
            >
              Meet the Founder
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <article
                key={resource.title}
                className={`relative flex min-h-0 flex-col overflow-hidden rounded-2xl border p-5 transition duration-200 sm:min-h-[390px] sm:p-7 ${
                  resource.available
                    ? "border-accent/25 bg-black/45 hover:-translate-y-0.5 hover:border-accent/55"
                    : "border-accent/20 bg-black/35"
                }`}
              >
                {!resource.available && (
                  <div className="pointer-events-none absolute inset-0 bg-ambient" />
                )}

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-4xl" aria-hidden="true">
                      {resource.icon}
                    </div>

                    {!resource.available && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent">
                        In Development
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-xl text-accent">
                    {resource.title}
                  </h3>

                  <p className="mt-4 flex-1 leading-7 text-secondary">
                    {resource.description}
                  </p>

                  {resource.available ? (
                    <div className="mt-7">
                      {resource.edition && (
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent">
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
                      <div className="rounded-xl border border-accent/20 bg-accent/5 px-5 py-4 text-center">
                        <p className="font-display text-sm uppercase tracking-[0.2em] text-accent">
                          {resource.status}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-secondary">
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

          <div className="mx-auto mt-10 max-w-4xl border-y border-accent/20 py-8 text-center">
            <p className="font-display text-xl italic leading-9 text-secondary sm:text-2xl">
              “For which of you, intending to build a tower, sitteth not down
              first, and counteth the cost...”
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Luke  ️14:28
            </p>
          </div>

          <div
            id="risk-section"
            className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-accent/20 bg-black/45 shadow-accent-soft"
          >
            <div className="border-b border-accent/15 px-6 py-6 sm:px-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-danger/40 bg-danger/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-hover">
                  Risk
                </span>

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                  Transparency &amp; Risk Disclosure
                </p>
              </div>

              <h3 className="mt-4 font-display text-2xl text-white sm:text-3xl">
                Responsible Participation Begins With Understanding the Risks
              </h3>
            </div>

            <div className="px-6 py-8 sm:px-8">
              <p className="text-sm leading-7 text-secondary sm:text-base">
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
                    className="rounded-xl border border-accent/15 bg-surface/70 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-accent-hover">⚠</span>

                      <span className="text-sm font-semibold text-primary">
                        {factor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-accent/15 bg-surface/60 p-5">
                <p className="text-sm leading-6 text-secondary">
                  Participation should be based on independent research,
                  responsible financial stewardship, and careful consideration
                  of personal circumstances. Never commit funds you cannot
                  afford to lose. 
                </p>
              </div>

              <p className="mt-6 text-xs leading-6 text-secondary">
                This disclosure is provided for transparency and education only
                and should not be interpreted as financial, legal, tax, or
                investment advice. 
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-base leading-8 text-secondary sm:text-lg">
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
          <div className="flex h-[92svh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-accent/30 bg-base shadow-elevated">
            <div className="flex items-center justify-between gap-4 border-b border-accent/20 px-4 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">
                  Document Preview
                </p>

                <h2
                  id="document-preview-title"
                  className="mt-1 truncate font-display text-lg text-accent sm:text-xl"
                >
                  {activeDocument.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveDocument(null)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-black/50 text-xl text-secondary transition hover:border-accent/50 hover:text-accent"
                aria-label="Close document preview"
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-base">
              <iframe
                src={`${activeDocument.href}#toolbar=1&navpanes=0&view=FitH`}
                title={`${activeDocument.title} PDF preview`}
                className="h-full w-full border-0"
              />
            </div>

            <div className="grid gap-3 border-t border-accent/20 p-3 sm:grid-cols-2 sm:p-4">
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
