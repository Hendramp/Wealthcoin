import React from "react";

export default function WTCSPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">

        {/* Hero */}
        <section className="text-center">

          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400">
            WealthCoin Solutions
          </h1>

          <p className="mt-4 text-2xl text-gray-300">
            Professional Blockchain Payment Implementation
          </p>

          <p className="mt-10 max-w-3xl mx-auto text-lg leading-8 text-gray-400">
            WealthCoin Solutions (WTCS) helps individuals, businesses,
            ministries, and organizations confidently adopt blockchain
            technology through professional implementation, education,
            and ongoing support.
          </p>

          <a
            href="mailto:WTCteam@outlook.com"
            className="mt-10 inline-flex rounded-lg bg-yellow-400 px-6 py-3 text-black font-semibold transition hover:bg-yellow-300"
          >
            Schedule a Complimentary Consultation
          </a>
<a href="WTCS_Menu.pdf" target="_blank" class="menu-button">📄 View WTCS Menu</a>
        </section>

        {/* Divider */}

        <div className="my-20 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>

        {/* Services */}

        <section>

          <h2 className="text-3xl font-semibold text-yellow-400 text-center">
            Our Services
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-6">
              <h3 className="text-xl font-semibold text-white">
                Consultation
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Personalized guidance to understand your goals and
                determine the most appropriate blockchain payment
                solution for your organization.
              </p>
            </div>

            <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-6">
              <h3 className="text-xl font-semibold text-white">
                Implementation
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Professional implementation of digital asset payment
                systems, wallet configuration, and operational setup.
              </p>
            </div>

            <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-6">
              <h3 className="text-xl font-semibold text-white">
                Education
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Staff training, educational resources, and practical
                instruction designed to build confidence using
                blockchain technology.
              </p>
            </div>

            <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/40 p-6">
              <h3 className="text-xl font-semibold text-white">
                Ongoing Support
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Continued guidance following implementation to help
                ensure a smooth transition into blockchain payment
                operations.
              </p>
            </div>

          </div>

        </section>

        {/* Consultation */}

        <section className="mt-20 rounded-2xl border border-yellow-500/20 bg-zinc-900/40 p-10">

          <h2 className="text-3xl font-semibold text-yellow-400">
            Schedule a Complimentary Consultation
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Every implementation begins with a conversation.
          </p>

          <p className="mt-5 leading-8 text-gray-400">
            Contact us by email to schedule a complimentary consultation.
            During our meeting, we'll discuss your goals, answer your
            questions, and, if appropriate, provide a meeting link
            through Zoom or another applicable platform to begin
            planning your implementation.
          </p>

          <div className="mt-10 rounded-xl border border-yellow-500/20 bg-black/40 p-6">

            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Contact
            </p>

            <a
              href="mailto:WTCteam@outlook.com"
              className="mt-3 inline-block text-2xl font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              WTCteam@outlook.com
            </a>

          </div>

        </section>

        {/* Footer */}

        <footer className="mt-20 border-t border-zinc-800 pt-10 text-center">

          <p className="text-lg text-gray-400">
            Professional Blockchain Consulting & Education
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600 max-w-2xl mx-auto">
            WealthCoin Solutions is committed to helping individuals,
            businesses, ministries, and organizations confidently
            implement blockchain payment solutions through education,
            transparency, and practical support.
          </p>

        </footer>

      </div>
    </div>
  );
}