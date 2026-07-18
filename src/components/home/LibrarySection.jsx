import React from "react";

const libraryResources = [
  {
    title: "Wallet Guide — English",
    description:
      "A beginner-friendly guide for setting up a wallet, using Polygon, and purchasing WTC.",
    href: "/documents/Wallet_Guide_EN.pdf",
    label: "Open Guide",
    language: "English",
    icon: "📘",
  },
  {
    title: "Wallet Guide — Español",
    description:
      "Guía en español para configurar una billetera, usar Polygon y adquirir WTC.",
    href: "/documents/Wallet_Guide_ES.pdf",
    label: "Abrir Guía",
    language: "Español",
    icon: "📘",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    handle: "@Officialwealthcoin",
    description:
      "Follow official WealthCoin announcements, educational posts, launch updates, and community highlights.",
    href: "https://www.instagram.com/officialwealthcoin?igsh=ZjJwcXQ5Y3U3Njd6&utm_source=qr",
    action: "Follow on Instagram",
    icon: "📸",
  },
  {
    name: "Discord",
    handle: "WealthCoin Community",
    description:
      "Join the official Discord for presale updates, community discussion, support, and early-access announcements.",
    href: "https://discord.gg/TQCfMbXgK",
    action: "Join the Discord",
    icon: "💬",
  },
];

export default function LibrarySection() {
  return (
    <section
      id="library"
      className="relative overflow-hidden border-t border-[#D4AF37]/15 bg-[#030604] px-4 py-16 text-white sm:px-6 sm:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(212,175,55,0.07),transparent_32%),radial-gradient(circle_at_80%_75%,rgba(28,90,48,0.13),transparent_38%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            WealthCoin Library
          </p>

          <h2 className="gold-text mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Learn &amp; Stay Connected
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
            Access official wallet guides and connect with WealthCoin through
            the project&apos;s verified social channels.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {libraryResources.map((resource) => (
            <article
              key={resource.title}
              className="flex min-h-[280px] flex-col rounded-3xl border border-[#D4AF37]/20 bg-black/50 p-6 shadow-[0_0_35px_rgba(212,175,55,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-4xl" aria-hidden="true">
                  {resource.icon}
                </div>

                <span className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                  {resource.language}
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl text-white/90">
                {resource.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-white/50">
                {resource.description}
              </p>

              <a
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="btn-gold mt-6 rounded-xl px-5 py-3 text-center text-sm font-bold"
              >
                {resource.label}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-black/55 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
          <div className="border-b border-[#D4AF37]/15 px-6 py-6 text-center sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
              Official Social Channels
            </p>

            <h3 className="mt-3 font-display text-2xl text-white sm:text-3xl">
              Follow WealthCoin
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/55">
              Use only the official accounts below for presale updates,
              announcements, education, and community communication.
            </p>
          </div>

          <div className="grid gap-px bg-[#D4AF37]/15 md:grid-cols-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[235px] flex-col bg-[#061008] p-6 transition duration-300 hover:bg-[#0a160d] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-2xl">
                    {social.icon}
                  </div>

                  <span className="text-xl text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {social.name}
                </p>

                <h4 className="mt-2 font-display text-xl text-white/90">
                  {social.handle}
                </h4>

                <p className="mt-3 flex-1 text-sm leading-6 text-white/50">
                  {social.description}
                </p>

                <p className="mt-5 text-sm font-bold text-[#D4AF37]">
                  {social.action} →
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-[#D4AF37]/15 bg-black/35 p-5 text-center">
          <p className="text-sm leading-6 text-white/50">
            Additional educational resources will be added as the WealthCoin
            ecosystem continues to develop.
          </p>
        </div>
      </div>
    </section>
  );
}