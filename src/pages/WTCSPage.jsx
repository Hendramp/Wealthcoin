import React from "react";
import { Link } from "react-router-dom";

export default function WTCSPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">

        {/* Back to ecosystem */}
        <div className="mb-8 text-center sm:text-left">
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

          <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
            Professional education &amp; setup for responsibly accepting cryptocurrency.

 
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-7 text-white/60">
            WealthCoin Solutions helps individuals, businesses, and ministries confidently adopt
            blockchain technology through professional implementation, education, and email support.


 
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
          <p className="font-display text-2xl leading-9 text-white/80">
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

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#D4AF37]/15 bg-white/[0.03] p-6">
              <h3 className="font-display text-xl text-[#D4AF37]">
                Consultation
              </h3>
              <p className="mt-3 leading-7 text-white/60">
                Personalized guidance to understand your goals and decide whether blockchain is helpful or not to you individually or as an organization.

 
              </p>
            </div>

            <div className="rounded-xl border border-[#D4AF37]/15 bg-white/[0.03] p-6">
              <h3 className="font-display text-xl text-[#D4AF37]">
                Implementation
              </h3>
              <p className="mt-3 leading-7 text-white/60">
                We direct organizations through wallet setup, staff training, signage, and security best practices. 

              </p>
            </div>

            <div className="rounded-xl border border-[#D4AF37]/15 bg-white/[0.03] p-6">
              <h3 className="font-display text-xl text-[#D4AF37]">
                Education
              </h3>
              <p className="mt-3 leading-7 text-white/60">
                Staff training, educational tools for customers &amp; staff guides, and practical security guidance. 

              </p>
            </div>

            <div className="rounded-xl border border-[#D4AF37]/15 bg-white/[0.03] p-6">
              <h3 className="font-display text-xl text-[#D4AF37]">
                Wealthcoin Support
              </h3>
              <p className="mt-3 leading-7 text-white/60">
                Email us with any questions regarding your implementation and we will be happy to assist you. 

              </p>
            </div>
          </div>
        </section>

        {/* Consultation */}
        <section className="mt-20 rounded-2xl border border-[#D4AF37]/15 bg-white/[0.03] p-10">
          <h2 className="font-display text-3xl text-white">
            Schedule a Complimentary Virtual Consultation
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Every implementation begins with a conversation.
 

          </p>

          <p className="mt-5 leading-8 text-white/60">
            Contact us by email to schedule a complimentary consultation. 

            During our meeting, we'll discuss your goals, answer your questions, and see if implementation is a good decision for you. 

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
        </footer>

      </div>
    </div>
  );
}
