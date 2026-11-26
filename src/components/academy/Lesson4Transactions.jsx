import React from "react";

export default function Lesson4() {
  return (
    <section className="relative mx-auto w-full max-w-4xl px-6 py-20 sm:px-8 sm:py-28">
      {/* Back to Academy */}
      <a
        href="/academy"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37] transition-colors hover:text-white"
      >
        ← Back to Academy
      </a>

      {/* Header */}
      <header className="mb-16 text-center sm:mb-20">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          Lesson 4 · Transactions & the Keys
        </p>
        <h2 className="mt-5 font-display text-4xl leading-tight text-white sm:text-6xl">
          What's Yours to Share
          <span className="gold-text block">and What's Yours to Keep</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
          The mina is in your hand now. To put it to work — to actually transact —
          you need to know two things: <span className="text-white">what to share</span> and{" "}
          <span className="text-white">what to keep</span>.
        </p>
        <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </header>

      {/* The Foundation */}
      <div className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-8 text-center sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
          The Foundation
        </p>
        <p className="mt-6 text-2xl italic leading-relaxed text-white sm:text-3xl">
          “But thou shalt remember the LORD thy God: for it is he that giveth thee
          power to get wealth.”
        </p>
        <p className="mt-4 text-sm font-bold uppercase tracking-wider text-white/40">
          Deuteronomy 8:18 — JUB
        </p>
        <div className="mx-auto mt-8 h-px w-2/3 bg-[#D4AF37]/20" />
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
          Before a single transaction, this is the ground you stand on: the wealth
          isn't yours — it's <span className="text-white">entrusted</span>. God
          gives the power to get it, and you're the steward of it. That changes how
          you handle every address and every key, because you're not protecting
          your own treasure — you're protecting what was given to you to manage.
        </p>
      </div>

      {/* The Two Things You Hold */}
      <div className="mb-16">
        <h3 className="mb-10 text-center font-display text-3xl text-white sm:text-4xl">
          Two Things You Hold
        </h3>
        <p className="mx-auto mb-10 max-w-2xl text-center text-lg leading-8 text-white/60 sm:text-xl">
          Every wallet puts two very different things in your hand. Confuse them,
          and you've handed the mina to the wrong master.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* The Address */}
          <div className="rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Safe to Share
            </p>
            <h4 className="mt-3 font-display text-2xl text-white sm:text-3xl">
               The Receiving Address
            </h4>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Like a mailing address or an account number. It's how people send
              assets to you. It's public by design — that's what makes the chain
              transparent. Share it freely.
            </p>
            <p className="mt-6 text-xl italic text-[#D4AF37]">
              “Providing for honest things, not only in the sight of the Lord, but
              also in the sight of men.”
              <span className="mt-2 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
                2 Corinthians 8:21 — JUB
              </span>
            </p>
          </div>

          {/* The Keys */}
          <div className="rounded-3xl border border-red-500/25 bg-red-500/5 p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
              Never Share 
            </p>
            <h4 className="mt-3 font-display text-2xl text-white sm:text-3xl">
              The Private Key & Seed Phrase
            </h4>
            <p className="mt-5 text-lg leading-8 text-white/70">
              The password to your wallet — and the master key that restores it.
              Anyone who holds these controls your assets. They are the mina
              itself. NEVER share them.
            </p>
            <p className="mt-6 text-xl italic text-[#D4AF37]">
              “Keep thy heart with all diligence; for out of it are the issues of
              life.”
              <span className="mt-2 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
                Proverbs 4:23 — JUB
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* THE WALKTHROUGH — the highlight */}
      <div className="mb-16">
        <div className="relative rounded-3xl border-2 border-[#D4AF37]/40 bg-gradient-to-b from-[#D4AF37]/10 to-transparent p-8 sm:p-12">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            The Walkthrough
          </p>
          <h3 className="mt-4 text-center font-display text-3xl text-white sm:text-5xl">
            Putting the Mina to Work
          </h3>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-white/60 sm:text-xl">
            This is the heart of the lesson. Step by step — what you do, what you
            check, and what you never hand over.
          </p>

          {/* Receive */}
          <div className="mt-12">
            <h4 className="mb-6 font-display text-2xl text-[#D4AF37] sm:text-3xl">
              Receiving — how people give to you
            </h4>
            <ol className="space-y-4">
              {[
                "Open your wallet and tap Receive.",
                "Select the network — for WealthCoin, that's Polygon.",
                "Copy the address — the string that starts with 0x.(Can vary by blockchain network)",
                "Share ONLY that address. It's safe. It's how people send to you.",
                "Verify the address matches before anyone sends — character by character.",
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] font-display text-lg font-bold text-black">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-lg leading-8 text-white/80">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Send */}
          <div className="mt-12">
            <h4 className="mb-6 font-display text-2xl text-[#D4AF37] sm:text-3xl">
              Sending — how you put it to work
            </h4>
            <ol className="space-y-4">
              {[
                "Tap Send.",
                "Paste the receiving address — then verify it character by character. One wrong character and the mina goes to the wrong master.",
                "Confirm the network matches — i.e., Polygon, not Ethereum.",
                "Review the amount and the gas fee before you confirm.",
                "Confirm. It's on the chain now — irreversible. That's why the checking matters.",
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] font-display text-lg font-bold text-black">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-lg leading-8 text-white/80">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-6 text-center">
            <p className="text-lg italic leading-8 text-white/80">
              “A prudent man foreseeth the evil, and hideth himself: but the
              simple pass on, and are punished.”
            </p>
            <p className="mt-3 text-sm font-bold uppercase tracking-wider text-white/40">
              Proverbs 22:3 — JUB
            </p>
            <p className="mt-4 text-base leading-7 text-white/60">
              Checking before you send isn't paranoia. It's prudence. It's
              stewardship.
            </p>
          </div>
        </div>
      </div>

      {/* The Trap */}
      <div className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
          The Trap
        </p>
        <h3 className="mt-4 font-display text-3xl text-white sm:text-4xl">
          The Wolf in Sheep's Clothing
        </h3>
        <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
          No legitimate service — no exchange, no wallet, no "support," no
          "verification" — will ever ask for your seed phrase or private key. If
          anyone does, they are the wolf. The address is meant to be shared; the
          keys are meant to be kept. That's the whole test.
        </p>
        <p className="mt-6 text-xl italic text-[#D4AF37] sm:text-2xl">
          “Behold, I send you forth as sheep in the midst of wolves: be ye
          therefore wise as serpents, and harmless as doves.”
          <span className="mt-2 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
            Matthew 10:16 — JUB
          </span>
        </p>
        <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
          Wisdom looks like knowing who to trust. And no one gets the keys.
        </p>
      </div>

      {/* The Pivot */}
      <div className="relative mb-16">
        <div className="absolute left-1/2 top-0 h-14 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-[#D4AF37]/50" />
        <div className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#D4AF37]/10 to-transparent p-8 sm:p-12">
          <h3 className="font-display text-3xl text-white sm:text-4xl">
            Why You Can Hold It Loosely
          </h3>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
            The fear that makes people clutch their keys is the same fear that
            buried the mina — the fear that if you lose it, you've lost
            everything. But the gospel removes that fear:
          </p>
          <p className="mt-6 text-xl italic text-[#D4AF37] sm:text-2xl">
            “Take heed, and beware of covetousness: for a man's life consisteth
            not in the abundance of the things which he possesseth.”
            <span className="mt-2 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
              Luke 12:15 — JUB
            </span>
          </p>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
            Your worth isn't in your wallet. Your salvation isn't secured by your
            seed phrase. So you can guard your keys carefully — without clutching
            them in fear. You hold them loosely because you're not trying to earn
            anything. You're just being faithful with what's entrusted.
          </p>
        </div>
      </div>

      {/* The Charge */}
      <div className="rounded-3xl bg-white/5 p-10 text-center sm:p-16">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          The Charge
        </p>
        <p className="mt-8 text-2xl leading-relaxed text-white sm:text-3xl">
          Share the address. Guard the keys.
          <br />
          <span className="mt-3 block">Verify before you send.</span>
        </p>
        <div className="mx-auto mt-10 max-w-md space-y-4 text-lg text-white/60 sm:text-xl">
          <p>Not out of fear — out of faithfulness.</p>
          <p>Not to earn — because it is finished.</p>
          <p>Steward boldly. Steward wisely.</p>
        </div>
        <div className="mx-auto mt-12 h-px w-2/3 bg-[#D4AF37]/25" />
        <p className="mt-12 text-xl italic text-[#D4AF37] sm:text-2xl">
          “As every man hath received the gift, even so minister the same one to
          another, as good stewards of the manifold grace of God.”
          <span className="mt-3 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
            1 Peter 4:10 — JUB
          </span>
        </p>
        <p className="mt-10 text-xl italic text-[#D4AF37] sm:text-2xl">
          “If any of you lack wisdom, let him ask of God, that giveth to all men
          liberally.”
          <span className="mt-3 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
            James 1:5 — JUB
          </span>
        </p>
        <p className="mt-12 font-display text-3xl text-white sm:text-4xl">
          Occupy till he comes.
        </p>
      </div>
    </section>
  );
}
