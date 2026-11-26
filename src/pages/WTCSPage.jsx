import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

const servicePaths = [
  {
    number: "01",
    name: "Individual",
    summary: "Learn self-custody and set up a wallet with confidence.",
    includes: "Wallet setup · Safety education · Recovery planning",
  },
  {
    number: "02",
    name: "Business",
    summary: "Prepare your team to accept cryptocurrency at the counter.",
    includes: "Payment setup · QR signage · Employee training",
  },
  {
    number: "03",
    name: "Ministry",
    summary: "Receive digital-asset donations with clear stewardship practices.",
    includes: "Donation setup · QR signage · Leadership training",
  },
  {
    number: "04",
    name: "Enterprise",
    summary: "Train an internal team to implement across multiple locations.",
    includes: "Team training · Implementation · Internal certification",
  },
];

export default function WTCSPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-base text-primary">
        <div className="pointer-events-none absolute inset-0 bg-ambient" />
        <div className="pointer-events-none absolute -right-32 top-28 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-content px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
          <Link
            to="/#home"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#C2BDB5] transition hover:text-accent-hover"
          >
            <span aria-hidden="true">←</span> Back to WealthCoin
          </Link>

          <header className="relative mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-[#1a1710] via-surface to-base px-6 py-10 text-center sm:mt-10 sm:px-12 sm:py-14">
            <img
              src="/assets/logos/polygon-logo.png"
              alt=""
              aria-hidden="true"
              className="absolute -right-7 -top-8 h-36 w-36 object-contain opacity-[0.12] sm:h-52 sm:w-52"
            />
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-accent-hover">
                <img
                  src="/assets/logos/polygon-logo.png"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 object-contain"
                />
                WealthCoin Solutions
              </p>
              <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight text-primary sm:text-6xl">
                Digital assets, made practical.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#D0CCC4] sm:text-lg sm:leading-8">
                Clear education and hands-on implementation for individuals,
                businesses, ministries, and growing organizations.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="/documents/WTCS_Menu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold min-h-12 px-6 py-3 text-center font-semibold"
                >
                  View the Full Services Menu
                </a>
                <a
                  href="mailto:WTCteam@outlook.com"
                  className="btn-ghost min-h-12 px-6 py-3 text-center font-semibold"
                >
                  Book a Complimentary Consultation
                </a>
              </div>
            </div>
          </header>

          <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-hover">
                  Quick Guide
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl">
                  Find your starting point
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#C2BDB5]">
                Just the essentials here. The full menu has scope, pricing, and
                complete service details.
              </p>
            </div>

            <div className="rounded-3xl border border-accent/30 bg-[#101012]/95 p-4 shadow-accent-soft sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {servicePaths.map((service) => (
                  <article
                    key={service.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-accent/35 hover:bg-accent/[0.04] sm:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm text-accent">
                        {service.number}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-primary">
                        {service.name}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#D0CCC4]">
                      {service.summary}
                    </p>
                    <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-accent-hover">
                      {service.includes}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-accent/20 bg-accent/[0.06] p-5 text-center sm:flex-row sm:p-6 sm:text-left">
                <div>
                  <p className="font-semibold text-primary">
                    Want the full scope and pricing?
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#C2BDB5]">
                    Open the complete WTCS menu for detailed descriptions and
                    engagement information.
                  </p>
                </div>
                <a
                  href="/documents/WTCS_Menu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold min-h-12 shrink-0 px-6 py-3 font-semibold"
                >
                  Open Full Menu
                </a>
              </div>
            </div>
          </section>

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-7 text-[#C2BDB5]">
            Security · Stewardship · Education
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
