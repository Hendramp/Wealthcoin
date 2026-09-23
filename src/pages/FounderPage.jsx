import React from 'react';
import { Link } from 'react-router-dom';

const FounderPage = () => {
  return (
    <div className="min-h-screen bg-[#020302] px-4 pt-32 pb-20 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Back to WealthCoin */}
        <div className="mb-10 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/[0.06] px-5 py-2.5 text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/[0.12]"
          >
            <span aria-hidden="true">←</span>
            Back to WealthCoin
          </Link>
        </div>

        {/* Header with portrait */}
        <header className="mb-14 text-center">
          <div className="mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full border-2 border-[#D4AF37]/60 shadow-lg shadow-[#D4AF37]/10">
            <img
  src="/assets/Founder/Founder_Photo.jpg"
  alt="Hendrick Ramirez, Founder of WealthCoin"
  className="h-full w-full object-cover"
/>

          </div>

          <span className="rounded-full border border-[#D4AF37]/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            Meet the Founder
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl">
            Hendrick Ramirez
          </h1>

          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
        </header>

        {/* The Calling */}
        <section className="mb-12">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]/70">
            The Calling
          </h2>

          <p className="text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
            You don't have to believe what I believe to be welcome here. You
            can belong before you believe in Christ. Before anything else, Almighty YHWH is my ultimate source. He blessed
          me with the wisdom and opportunity to build something like this — and
          my prayer is to glorify Him through everything I do and reach those
          who have ears to hear and believe in the Gospel of Christ.
          </p>

          <blockquote className="my-8 border-l-2 border-[#D4AF37] py-2 pl-6">
            <p className="font-display text-xl font-semibold leading-9 text-[#D4AF37] sm:text-2xl">
              He was battered and crucified on the cross for the sins of
              humankind, resurrected and defeated death on the third day, and
              commissioned not only His 12 disciples but us as well to make
              disciples for Him to the ends of the earth in Matthew 28:19.
            </p>
          </blockquote>
        </section>

        {/* The Journey */}
        <section className="mb-12">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]/70">
            The Journey
          </h2>

          <p className="text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
            <strong className="highlight">
              I've spent years running businesses,
            </strong>{' '}
             managing entire establishments in the food service industry and leading departments at retail stores.
             That taught me what stewardship really is: showing
            up, being accountable, building systems, serving people well.
            That's why I'm the one doing this.
          </p>

          <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
            But the reason I can teach this isn't a title — it's that I
            started exactly where most do, with no clue what I was doing. My
            first impression of crypto was through the Silk Road, and after
            seeing a mock crypto in <em>Welcome to the Game</em> at around 10
            years old, I got curious and started doing my own research but
            never made progress considering my young age.{' '}
            <strong className="highlight">
              It wasn't until around 2024 that I even learned what a network
              was through learning pages on centralized exchanges like
              Coinbase.
            </strong>{' '}
            From there I taught myself how to move money efficiently and
            cheaply across multiple platforms, while also being introduced to
            web3 by my first wallet, not knowing the doors it would open. This
            led me to using DEXs like gTrade and GMX, learning about leverage,
            supply, direct key ownership, and much more.
          </p>

          <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
            Along the way I saw how much potential memecoins have —{' '}
            <strong className="highlight">
              how a simple token can build a community and move real value.
            </strong>{' '}
            This pushed me to learn how developers and traders moved through
            the crypto space, but the more I learned, the more I realized how
            difficult it was to find education that actually explained how to
            navigate the blockchain and web3 space. Everything was either too
            technical or too shallow. That gap is exactly why I built this.
          </p>
        </section>

        {/* Why I Built This */}
        <section className="mb-12">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]/70">
            Why I Built This
          </h2>

          <p className="text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
            So when I built this, I built every aspect of it myself: the
            token, the website, the liquidity pool, the entire Academy
            curriculum, and most importantly, the foundation. 
            Thats just the start, a marketplace, staking yield, community hub and much more is being built towards.
          </p>

          <blockquote className="my-8 border-l-2 border-[#D4AF37] py-2 pl-6">
            <p className="font-display text-xl font-semibold leading-9 text-[#D4AF37] sm:text-2xl">
              I wanted to understand every piece before asking anyone to trust
              it with their money.
            </p>
          </blockquote>

          <p className="text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
            When I teach you wallet safety, blockchain basics, or any other
            lesson I may publish, I'm not reading from a script — I'm showing
            you what I actually did, from zero. And that's what this is all
            about: building something that actually works for everyday people,
            not just traders.
          </p>
        </section>

        {/* Closing statement */}
        <div className="mt-12 rounded-3xl border border-[#D4AF37]/40 bg-[#D4AF37]/[0.06] p-8 text-center sm:p-10">
          <p className="font-display text-xl font-bold uppercase tracking-wide text-[#D4AF37] sm:text-2xl">
            Most projects ask you to trust them with money. I'd rather earn
            that trust the way I always have: by building systems, being
            accountable, and doing the work myself. That's WealthCoin.
          </p>

          <Link
            to="/academy"
            className="btn-gold mt-8 inline-block rounded-xl px-8 py-3 font-semibold text-black transition hover:bg-[#e8c65a]"
          >
            Start Learning Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FounderPage;
