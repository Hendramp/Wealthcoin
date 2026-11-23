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
    description: "Official announcements, education, and community highlights.",
    href: "https://www.instagram.com/officialwealthcoin?igsh=ZjJwcXQ5Y3U3Njd6&utm_source=qr",
    action: "Follow",
    icon: "📸",
  },
  {
    name: "Discord",
    handle: "WealthCoin Community",
    description: "Presale updates, discussion, support, and early access.",
    href: "https://discord.gg/TQCfMbXgK",
    action: "Join",
    icon: "💬",
  },
  {
    name: "X",
    handle: "@wealthcointeam",
    description: "Announcements, education, and community highlights.",
    href: "https://x.com/wealthcointeam",
    action: "Follow",
    icon: "𝕏",
  },
  {
    name: "Telegram",
    handle: "Official WealthCoin",
    description: "Presale updates, discussion, support, and early access.",
    href: "https://t.me/Officialwealthcoin",
    action: "Join",
    icon: "✈️",
  },
  {
    name: "Reddit",
    handle: "u/WealthcoinTeam",
    description: "Discussions, community updates, and educational content.",
    href: "https://www.reddit.com/u/WealthcoinTeam/",
    action: "Follow",
    icon: "👽",
  },
];

export default function LibrarySection() {
  return (
    <section
      id="library"
      className="relative overflow-hidden border-t border-[#D4AF37]/15 bg-[#030604] px-4 py-16 text-white sm:px-6 sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_45%),radial-gradient(circle_at_90%_90%,rgba(28,90,48,0.12),transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            WealthCoin Library
          </p>
          <h2 className="gold-text mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Learn &amp; Stay Connected
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
            Access official wallet guides, connect with the community,
            and step into the Hub to share with fellow stewards.

          </p>
        </div>

        {/* Community Hub — the hero moment */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#D4AF37]/12 via-black/40 to-black/60 p-8 text-center shadow-[0_0_60px_rgba(212,175,55,0.1)] sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-2xl">
            💬
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Community Hub
          </p>
          <h3 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Join the Conversation
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
            A text-only space for stewards to share, encourage, and learn
            together — no noise, just good conversation among God&apos;s people.

 
          </p>
          <a
            href="/hub"
            className="btn-gold mt-7 inline-block rounded-2xl px-10 py-4 text-base font-bold shadow-[0_0_30px_rgba(212,175,55,0.25)] transition duration-300 hover:-translate-y-0.5"
          >
            Enter the Hub →
          </a>
        </div>

        {/* Wallet Guides */}
        <div className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
                Official Guides
              </p>
              <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">
                Start Here
              </h3>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {libraryResources.map((resource) => (
              <article
                key={resource.title}
                className="group flex min-h-[240px] flex-col rounded-3xl border border-[#D4AF37]/20 bg-black/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-4xl" aria-hidden="true">
                    {resource.icon}
                  </div>
                  <span className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                    {resource.language}
                  </span>
                </div>
                <h4 className="mt-5 font-display text-2xl text-white/90">
                  {resource.title}
                </h4>
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
        </div>

        {/* Socials — compact */}
        <div className="mt-14">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
              Official Social Channels
            </p>
            <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">
              Follow WealthCoin
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/55">
              Use only the official accounts below for updates, education,
              and community communication.


            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[150px] flex-col rounded-2xl border border-[#D4AF37]/15 bg-black/40 p-5 transition duration-300 hover:border-[#D4AF37]/35 hover:bg-black/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-base">
                      {social.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                        {social.name}
                      </p>
                      <p className="text-sm text-white/80">{social.handle}</p>
                    </div>
                  </div>
                  <span className="text-lg text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
                <p className="mt-4 flex-1 text-xs leading-5 text-white/50">
                  {social.description}
                </p>
                <p className="mt-3 text-xs font-bold text-[#D4AF37]">
                  {social.action} →
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Security notice — tucked in, not shouting */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-sm font-bold text-red-400">
              !
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                Wallet Security Notice
              </p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Never share your private key, seed phrase, or recovery phrase
                with anyone. WealthCoin will never ask for this information.



              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-white/40">
          Additional educational resources will be added as the WealthCoin
          ecosystem continues to develop.



        </p>
      </div>
    </section>
  );
}
