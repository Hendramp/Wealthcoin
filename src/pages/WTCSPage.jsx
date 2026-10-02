import React from "react";
import { Link } from "react-router-dom";

export default function WTCSPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Soft ambient glow behind the hero */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.12),_transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-24">

        {/* Back to ecosystem */}
        <div className="mb-12 text-center sm:text-left">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37]/80 transition hover:text-[#D4AF37]"
          >
            <span aria-hidden="true">←</span>
            Back to WealthCoin
          </Link>
        </div>

        {/* Hero */}
        <section className="text-center">
          <p className="text-2xl font-bold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-3xl">
            WealthCoin Solutions
          </p>

          <h1 className="mt-5 font-display text-4xl leading-tight text-white sm:text-5xl">
            Safely accept cryptocurrency — as an individual, business, or ministry.

          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/60">
            With the professional education and support to do it responsibly.


          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/40">
            Whether you're just curious or ready to move, we'll meet you where you are.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:WTCteam@outlook.com"
              className="inline-flex rounded-lg bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:bg-[#c19e2f]"
            >
              Schedule a Complimentary Virtual Consultation
            </a>
            <a
              href="/documents/WTCS_Menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg border border-[#D4AF37]/40 px-6 py-3 font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
            >
              View WTCS Menu
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="my-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

        {/* Scripture anchor */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
            Everything we do starts here
          </p>
          <p className="mt-6 font-display text-2xl leading-9 text-white/80">
            "And the LORD God took the man and put him into the garden of Eden to dress itand to keep it."
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            Genesis  ‎2:15 — JUB
          </p>
        </section>

        {/* Divider */}
        <div className="my-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

        {/* Services */}
        <section>
          <h2 className="text-center font-display text-3xl text-white">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/50">
            Whether you're an individual learning the basics or an organization ready to implement,
            we'll meet you where you are.

          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="group rounded-xl border border-[#D4AF37]/15 bg-white/[0.03] p-7 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.05]">
              <h3 className="font-display text-xl text-[#D4AF37]">
                Wallet &amp; Education
              </h3>
              <p className="mt-4 leading-8 text-white/60">
                For individuals: personal wallet setup, self-custody education, and security best
                practices — so you understand what you're holding before you ever transact.


              </p>
            </div>

            <div className="group rounded-xl border border-[#D4AF37]/15 bg-white/[0.03] p-7 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.05]">
              <h3 className="font-display text-xl text-[#D4AF37]">
                Business Implementation
              </h3>
              <p className="mt-4 leading-8 text-white/60">
                For businesses: wallet setup, payment implementation, QR signage, employee
                training, and security best practices — so you can accept crypto confidently.


              </p>
            </div>

            <div className="group rounded-xl border border-[#D4AF37]/15 bg-white/[0.03] p-7 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.05]">
              <h3 className="font-display text-xl text-[#D4AF37]">
                Ministry Implementation
              </h3>
              <p className="mt-4 leading-8 text-white/60">
                For ministries: donation wallet setup, giving QR signage, leadership &amp; volunteer
                training, and stewardship guidance — so more of every gift goes to your mission.


              </p>
            </div>

            <div className="group rounded-xl border border-[#D4AF37]/15 bg-white/[0.03] p-7 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.05]">
              <h3 className="font-display text-xl text-[#D4AF37]">
                WealthCoin Support
              </h3>
              <p className="mt-4 leading-8 text-white/60">
                Questions after your implementation? Email us anytime — we're happy to help you
                keep things running smoothly.


              </p>
            </div>
          </div>
        </section>

        {/* Consultation */}
        <section className="mt-20 rounded-2xl border border-[#D4AF37]/15 bg-white/[0.03] p-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Start with a conversation
          </p>
          <h2 className="mt-4 font-display text-3xl text-white">
            Schedule a Complimentary Virtual Consultation
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Every implementation begins with a conversation — and we'd be honored to have that
            conversation with you.
          </p>

          <p className="mt-5 leading-8 text-white/60">
            During our meeting, we'll discuss your goals, answer your questions, and see if implementation
            is a good decision for you. No obligation, no pressure — just clarity.


          </p>

          <div className="mt-10 rounded-xl border border-[#D4AF37]/15 bg-black/40 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Contact
            </p>
            <a
              href="mailto:WTCteam@outlook.com"
              className="mt-3 inline-block text-2xl font-semibold text-[#D4AF37] transition-colors hover:text-[#c19e2f]"
            >
              WTCteam@outlook.com
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 pt-10 text-center">
          <p className="text-lg text-white/70">
            Professional Blockchain Consulting &amp; Education
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/40">
            WealthCoin Solutions is committed to helping individuals, businesses, ministries, and organizations confidently
            implement blockchain payment solutions through education, transparency, and practical support.


          </p>
          <p className="mt-8 font-display text-base text-[#D4AF37]/80">
            We'd be honored to walk with you.
          </p>
        </footer>

      </div>
    </div>
  );
}
