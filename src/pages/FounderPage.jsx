import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

const storySections = [
  {
    title: "The Calling",
    paragraphs: [
      <>
        You don&apos;t have to believe what I believe to be welcome here. You
        can belong before you believe in Christ. Before anything else, Almighty
        YHWH is my ultimate source. He blessed me with the wisdom and
        opportunity to build something like this, and my prayer is to glorify
        Him through everything I do and reach those who have ears to hear and
        believe in the Gospel of Christ.
      </>,
    ],
    quote:
      "He was battered and crucified on the cross for the sins of humankind, resurrected and defeated death on the third day, and commissioned not only His 12 disciples but us as well to make disciples for Him to the ends of the earth in Matthew 28:19. He has authority over all things in Heaven and on earth.",
  },
  {
    title: "The Journey",
    paragraphs: [
      <>
        I&apos;ve spent years running businesses, managing entire establishments
        in food service, and leading departments at retail stores. That taught
        me what stewardship really is: showing up, being accountable, building
        systems, and serving people well. That&apos;s why I&apos;m the one doing
        this.
      </>,
      <>
        My first impression of crypto was through the Silk Road, and after
        seeing a mock crypto in <em>Welcome to the Game</em> at around 10 years
        old, I got curious and started doing my own research but never made
        progress considering my young age. I&apos;ve seen how the accuser has
        used this technology to advance darkness through hidden transactions,
        trafficking, and deception, but because God is all sovereign it was
        unsuccessful and the technology has been redeemed for His Kingdom.
      </>,
      <>
        It wasn&apos;t until around 2024, when I finally got serious about
        learning crypto, that I even learned what a network was through
        learning pages on centralized exchanges like Coinbase. From there I
        taught myself how to move money efficiently and cheaply across multiple
        platforms, while also being introduced to Web3 by my first wallet, not
        knowing the doors it would open. This led me to using DEXs like gTrade
        and GMX, learning about leverage, supply, direct key ownership, and
        much more.
      </>,
      <>
        Along the way I saw how much potential memecoins have: how a simple
        token can build a community and move real value. This pushed me to
        learn how developers and traders moved through the crypto space, but
        the more I learned, the more I realized how difficult it was to find
        education that actually explained how to navigate the blockchain and
        Web3 space. Everything was either too technical or too shallow. That
        gap is exactly why I built this.
      </>,
    ],
  },
  {
    title: "Why I Built This",
    paragraphs: [
      <>
        So when I built this, I built every aspect of it myself by God
        Almighty&apos;s grace: the token, the website, the liquidity pool, the
        entire Academy curriculum, and most importantly, the foundation. A
        marketplace, staking yield, community hub, and much more are part of
        the work ahead.
      </>,
      <>
        When I teach wallet safety, blockchain basics, or any other lesson, I
        share what I actually did, from zero. This is about building something
        that works for everyday people, not just traders.
      </>,
    ],
    quote:
      "I wanted to understand every piece before asking anyone to trust it with their money.",
  },
];

export default function FounderPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-base px-5 pb-20 pt-12 text-primary sm:px-8 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-ambient" />
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <Link
            to="/#foundation"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#C2BDB5] transition hover:text-accent-hover"
          >
            <span aria-hidden="true">←</span> Back to WealthCoin
          </Link>

          <header className="relative mt-10 overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-[#1a1710] via-surface to-base p-7 sm:mt-12 sm:p-12">
            <img
              src="/assets/logos/polygon-logo.png"
              alt=""
              aria-hidden="true"
              className="absolute -right-6 -top-8 h-40 w-40 object-contain opacity-[0.12] sm:h-56 sm:w-56"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-hover">
                The story behind WealthCoin
              </span>
              <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-tight text-primary sm:text-6xl">
                Built from the ground up. <span className="text-accent-hover">By conviction.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#D0CCC4] sm:text-lg sm:leading-8">
                A founder&apos;s story about faith, learning, and creating a
                more approachable path into digital assets.
              </p>
            </div>
          </header>

          <div className="mx-auto mt-10 max-w-3xl space-y-8 sm:mt-14">
            {storySections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-white/10 bg-surface/75 p-6 sm:p-8"
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-accent-hover">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-[#D0CCC4] sm:text-lg sm:leading-9">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.title}-${index}`}>{paragraph}</p>
                  ))}
                </div>
                {section.quote && (
                  <blockquote className="mt-7 border-l-2 border-accent py-2 pl-5">
                    <p className="font-display text-lg font-semibold leading-8 text-accent-hover sm:text-xl">
                      {section.quote}
                    </p>
                  </blockquote>
                )}
              </section>
            ))}

            <section className="rounded-3xl border border-accent/35 bg-accent/[0.07] p-7 text-center sm:p-10">
              <p className="font-display text-xl font-bold leading-8 text-primary sm:text-2xl">
                Most projects ask you to trust them with money. I&apos;d rather
                earn that trust the way I always have: by building systems,
                being accountable, and doing the work myself. That&apos;s
                WealthCoin.
              </p>
              <Link
                to="/academy"
                className="btn-gold mt-7 inline-flex px-8 py-3 font-semibold"
              >
                Start Learning Free
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
