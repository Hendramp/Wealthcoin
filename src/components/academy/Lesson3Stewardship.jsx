import React, { useState } from "react";

const paths = [
  {
    id: "bold",
    door: "DOOR A",
    title: "You Trade Boldly",
    action:
      "You take the mina and put it to work — but not recklessly. You steward it into good ground, you put it to use, you don't bury it. You act with purpose, not with fear.",
    verdict: "WELL DONE, THOU GOOD SERVANT.",
    verse: "Because thou hast been faithful in a very little, have thou authority over ten cities.",
    ref: "LUKE 19:17 — JUB",
    outcome:
      "The bold steward put the mina to work and it multiplied tenfold. But notice — the master's reward wasn't for gambling. It was for being faithful: he took what was given and actually used it. The ten cities aren't a prize for risk — they're the reward for faithful action.",
  },
  {
    id: "cautious",
    door: "DOOR B",
    title: "You Trade Cautiously",
    action:
      "You take the mina and put it to work — carefully, deliberately, with wisdom. You don't gamble it away, but you don't bury it either. You steward it into safe ground that still bears fruit.",
    verdict: "WELL DONE, THOU GOOD SERVANT.",
    verse: "Because thou hast been faithful in a very little, have thou authority over five cities.",
    ref: "LUKE 19:19 — JUB",
    outcome:
      "The cautious steward gained five — half of the first. And the master's reward was the same. Faithfulness is not measured by the size of the result, but by whether you put it to work. Five is enough, if you were faithful with it. The point was never to risk everything — it was to do something.",
  },
  {
    id: "bury",
    door: "DOOR C",
    title: "You Bury It",
    action:
      "The master seems harsh. The stakes feel too high. It's safer to do nothing than to risk getting it wrong. You keep it safe — untouched, unchanged.",
    verdict: "THOU WICKED SERVANT.",
    verse: "Out of thine own mouth will I judge thee... Wherefore then gavest not thou my money into the bank?",
    ref: "LUKE 19:22–23 — JUB",
    outcome:
      "He didn't steal the mina. He didn't lose it. He returned exactly what he was given — and that was the condemnation. The sin wasn't losing it. The sin was doing nothing with it.",
  },
];


export default function Lesson3() {
  const [open, setOpen] = useState("bold");

  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <section className="relative mx-auto w-full max-w-4xl px-6 py-20 sm:px-8 sm:py-28">
      {/* Header */}
      <header className="mb-16 text-center sm:mb-20">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          Lesson 3 · The Journey of the Stewards
        </p>
        <h2 className="mt-5 font-display text-4xl leading-tight text-white sm:text-6xl">
          Faithful Stewardship
        </h2>
        <p className="mt-4 text-base font-bold uppercase tracking-[0.3em] text-[#D4AF37]/60">
          Luke 19 — JUB
        </p>
        <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </header>

      {/* The Setup */}
      <div className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12">
        <p className="font-display text-2xl leading-relaxed text-white sm:text-3xl">
          A nobleman was going away to receive a kingdom — but before he left, he
          called ten of his servants and gave each of them one mina.
        </p>
        <p className="mt-8 text-xl italic text-[#D4AF37] sm:text-2xl">
          “Occupy till I come.”
          <span className="ml-3 block text-sm font-bold uppercase tracking-wider not-italic text-white/40 sm:inline">
            Luke 19:13 — JUB
          </span>
        </p>
        <div className="mt-10 h-px w-full bg-[#D4AF37]/20" />
        <p className="mt-10 text-lg leading-8 text-white/60 sm:text-xl sm:leading-9">
          Equal resources. Equal charge. One journey ahead of you.
          <br />
          <span className="mt-2 block text-white/90">
            The question isn't how much you were given. It's what you do with it.
          </span>
        </p>
      </div>

      {/* Choose Your Path */}
      <div className="mb-16">
        <h3 className="mb-10 text-center font-display text-3xl text-white sm:text-4xl">
          Choose Your Path
        </h3>

        <div className="space-y-5">
          {paths.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-colors duration-300 hover:border-[#D4AF37]/40"
            >
              <button
                onClick={() => toggle(p.id)}
                className="flex w-full items-center justify-between gap-6 px-8 py-7 text-left sm:px-10"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                    {p.door}
                  </p>
                  <p className="mt-2 font-display text-2xl text-white sm:text-3xl">
                    {p.title}
                  </p>
                </div>
                <span
                  className={`text-4xl text-[#D4AF37] transition-transform duration-300 ${
                    open === p.id ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {open === p.id && (
                <div className="border-t border-white/10 px-8 py-8 sm:px-10 sm:py-10">
                  <p className="text-lg leading-8 text-white/70">{p.action}</p>
                  <div className="mt-8 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-8 sm:p-10">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                      The Verdict
                    </p>
                    <p className="mt-4 font-display text-2xl text-white sm:text-3xl">
                      {p.verdict}
                    </p>
                    <p className="mt-5 text-xl italic leading-relaxed text-[#D4AF37]">
                      {p.verse}
                      <span className="mt-2 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
                        {p.ref}
                      </span>
                    </p>
                    <p className="mt-6 text-lg leading-8 text-white/60">
                      {p.outcome}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-lg italic text-white/50">
          The napkin is the real warning. Not corruption — paralysis. Not greed —
          fear.
        </p>
      </div>

      {/* The Turn — where all paths converge */}
      <div className="relative mb-16">
        <div className="absolute left-1/2 top-0 h-14 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-[#D4AF37]/50" />
        <p className="mb-12 pt-20 text-center text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          Every Path Converges Here
        </p>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12">
          <h3 className="font-display text-3xl text-white sm:text-4xl">
            The Weight
          </h3>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
            Here's the part we don't like to sit with: the master in this parable
            is <span className="text-white">stern</span>. He reaps what he didn't
            sow. And the accounting is real — every one of us will answer for what
            we did with what was entrusted.
          </p>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
            And the third steward's excuse cuts deepest of all:
          </p>
          <p className="mt-6 text-xl italic text-[#D4AF37] sm:text-2xl">
            “I feared thee, because thou art an austere man.”
            <span className="mt-2 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
              Luke 19:21 — JUB
            </span>
          </p>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
            Fear is what buried the mina. Fear of the master. Fear of getting it
            wrong. Fear that the standard was too high. And that fear is... honest.
            Because if the standard is the law, none of us stewards it well enough.
            The stern master has every right to judge.
          </p>
        </div>
      </div>

      {/* The Finished Work */}
      <div className="relative mb-16">
        <div className="absolute left-1/2 top-0 h-14 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-[#D4AF37]/50" />
        <div className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#D4AF37]/10 to-transparent p-8 sm:p-12">
          <h3 className="font-display text-3xl text-white sm:text-4xl">
            The Finished Work
          </h3>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
            But this is where the story doesn't end the way the parable does —
            because there is one who stood in the judgment for you.
          </p>
          <p className="mt-8 text-xl italic leading-relaxed text-[#D4AF37] sm:text-2xl sm:leading-relaxed">
            “When Jesus therefore had received the vinegar, he said, It is
            finished: and he bowed his head, and gave up the ghost.”
            <span className="mt-3 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
              John 19:30 — JUB
            </span>
          </p>
          <p className="mt-8 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
            The stern master reaps what he did not sow. But on the cross, Christ{" "}
            <span className="text-white">sowed</span> what he did not reap — he
            took the judgment we earned, so that the accounting doesn't fall on
            us.
          </p>
          <p className="mt-8 text-xl italic leading-relaxed text-[#D4AF37] sm:text-2xl sm:leading-relaxed">
            “There is therefore now no condemnation to those who are in Christ
            Jesus.”
            <span className="mt-3 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
              Romans 8:1 — JUB
            </span>
          </p>
          <p className="mt-8 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
            The finished work changes everything. The fear that buried the mina is
            removed. You're not stewarding to earn the master's approval anymore —
            you're stewarding out of gratitude, because you've already been
            approved.
          </p>
        </div>
      </div>

      {/* The Charge */}
      <div className="rounded-3xl bg-white/5 p-10 text-center sm:p-16">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          The Charge
        </p>
        <p className="mt-8 text-2xl leading-relaxed text-white sm:text-3xl">
          The third steward buried the mina <span className="italic">because</span>{" "}
          he feared the master.
          <br />
          <span className="mt-3 block">The gospel says the fear is gone.</span>
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
          So now you're free to do the one thing fear made impossible — put the
          mina to work.
        </p>
        <div className="mx-auto mt-10 max-w-md space-y-4 text-lg text-white/60 sm:text-xl">
          <p>Not to be saved. Because you already are.</p>
          <p>Not to earn. Because it is finished.</p>
          <p>Not out of fear. Out of faithfulness.</p>
        </div>
        <div className="mx-auto mt-12 h-px w-2/3 bg-[#D4AF37]/25" />
        <p className="mt-12 text-xl italic text-[#D4AF37] sm:text-2xl">
          “Moreover it is required of stewards, that a man be found faithful.”
          <span className="mt-3 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
            1 Corinthians 4:2 — JUB
          </span>
        </p>
        <p className="mt-10 text-xl italic text-[#D4AF37] sm:text-2xl">
          “He that is faithful in that which is least is faithful also in much.”
          <span className="mt-3 block text-sm font-bold uppercase tracking-wider not-italic text-white/40">
            Luke 16:10 — JUB
          </span>
        </p>
        <p className="mt-12 font-display text-3xl text-white sm:text-4xl">
          Occupy till he comes.
        </p>
      </div>
    </section>
  );
}
