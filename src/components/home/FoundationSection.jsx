import React, { useState } from "react";
import DocumentViewer from "../shared/DocumentViewer";

const resources = [
  {
    icon: "📜",
    title: "Founding Charter",
    description:
      "Our commitment to faith, stewardship, transparency, service, and long-term responsibility.",
    href: "/documents/WealthCoin_Founding_Charter.pdf",
    action: "Read Charter",
  },
  {
    icon: "🌍",
    title: "Ecosystem Overview",
    description:
      "Explore how WealthCoin connects community, commerce, education, governance, and stewardship.",
    href: "/documents/WealthCoin_Ecosystem_Overview.pdf",
    action: "View Ecosystem",
  },
  {
    icon: "👛",
    title: "Wallet Guide — English",
    description:
      "Prepare your wallet, obtain POL, switch to Polygon, and get ready for WealthCoin.",
    href: "/documents/Wallet_Guide_EN.pdf",
    action: "Open Guide",
  },
  {
    icon: "🌐",
    title: "Wallet Guide — Español",
    description:
      "Prepara tu wallet, obtén POL, cambia a Polygon y prepárate para WealthCoin.",
    href: "/documents/Wallet_Guide_ES.pdf",
    action: "Abrir Guía",
  },
];

export default function FoundationSection() {
  const [activeDocument, setActiveDocument] = useState(null);

  return (
    <>
      <section
        id="foundation"
        className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#071009] px-6 py-24 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_38%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-sm uppercase tracking-[0.4em] text-[#D4AF37]">
              The Foundation
            </p>

            <h2 className="gold-text mt-5 font-display text-4xl font-bold sm:text-5xl">
              Built for Stewardship
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
              Explore the documents and guides that define WealthCoin, explain
              the ecosystem, and prepare every community member to participate
              responsibly.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <article
                key={resource.title}
                className="flex flex-col rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-7 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/55"
              >
                <div className="text-4xl">{resource.icon}</div>

                <h3 className="mt-5 font-display text-xl text-[#D4AF37]">
                  {resource.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-white/65">
                  {resource.description}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveDocument(resource)}
                    className="btn-gold rounded-xl px-4 py-3 text-sm font-bold"
                  >
                    Preview
                  </button>

                  <a
                    href={resource.href}
                    download
                    className="btn-ghost rounded-xl px-4 py-3 text-center text-sm font-bold"
                  >
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DocumentViewer
        selectedDocument={activeDocument}
        onClose={() => setActiveDocument(null)}
      />
    </>
  );
}