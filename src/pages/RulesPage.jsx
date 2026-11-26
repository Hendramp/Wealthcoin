// src/pages/RulesPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const canDo = [
  {
    title: "Handmade & artisan goods",
    body: "Crafts, woodworking, candles, soap, art, clothing, jewelry, pottery.",
    highlight: "If you made it with skill, it belongs here.",
  },
  {
    title: "Digital products & services",
    body: "E-books, courses, templates, design, writing, editing, translation, coding, consulting.",
    highlight: "If you can deliver it digitally, you can sell it here.",
  },
  {
    title: "Physical goods you lawfully own",
    body: "Tools, furniture, electronics, books, collectibles, home goods.",
    highlight: "Legal, honestly described, and yours to sell — that's the whole bar.",
  },
  {
    title: "Services & skilled labor",
    body: "Lawn care, cleaning, handyman work, tutoring, automotive help.",
    highlight: "Honest work for honest pay is always welcome.",
  },
  {
    title: "Business & professional services",
    body: "Bookkeeping, marketing, web design, consulting.",
    highlight: "If you run a legitimate business, you can serve the community here.",
  },
  {
    title: "Local food & farm discovery",
    body: "Butchers, farmers, and food producers can post where to find them — their location, website, or contact. Signposts are for perishable, location-bound goods only.",
    highlight: "If it can be shipped or delivered digitally, it sells in WTC on-platform. Perishable goods are signposts — the sale happens off-platform, between you and the seller.",
  },
  {
    title: "Ministry & nonprofit presence",
    body: "Churches, ministries, and nonprofits may establish a presence and receive donations to a verified church or 501(c)(3).",
    highlight: "Donations go directly to that organization's WTC address — never through WealthCoin, never in exchange for a religious service.",
  },
  {
    title: "Anything legal, honest, and accurately described",
    body: "Anything that doesn't fall into a prohibited category.",
    highlight: "That's the test: legal, honest, and serves people rather than harms them.",
  },
];

const neverAllowed = [
  {
    title: "Illegal drugs, substances, or paraphernalia",
    body: "Including anything marketed as a 'research chemical' or 'for novelty use.'",
    highlight: "If it was the kind of thing sold on the Silk Road, it does not belong here.",
  },
  {
    title: "Weapons, firearms, ammunition, explosives",
    body: "Or any item designed to cause physical harm.",
    highlight: "The Marketplace is for building, not hurting.",
  },
  {
    title: "People",
    body: "Human trafficking, exploitation, 'companionship,' 'modeling,' 'dates,' or anything resembling the sale of a person.",
    highlight: "There is no exception, no 'consensual' framing, no gray area.",
  },
  {
    title: "Stolen goods, hacked accounts, counterfeit items",
    body: "Anything obtained illegally.",
    highlight: "If you don't lawfully own it, you can't sell it.",
  },
  {
    title: "Fraud, scams, phishing",
    body: "Anything intended to deceive or defraud another user.",
    highlight: "We don't play that.",
  },
  {
    title: "Anything that facilitates any of the above",
    body: "Guides, tools, or 'educational' material for illegal activity.",
    highlight: "If you have to ask whether it qualifies, it probably does.",
  },
  {
    title: "Anything the enemy would use to spread darkness and pain",
    body: "This is the ceiling on every rule.",
    highlight: "If it's not listed but serves the same purpose — it's prohibited.",
  },
];

const prohibitedSections = [
  {
    heading: "Controlled Substances & Drugs",
    note: "All illegal drugs, controlled substances, and drug paraphernalia — regardless of local legality.",
    items: [
      "Cannabis & derivatives — weed, marijuana, bud, flower, wax, dabs, edibles, THC products, seeds for cultivation.",
      "Psychedelics & hallucinogens — LSD, acid, mushrooms, psilocybin, DMT, ayahuasca, mescaline, peyote, 2C-B.",
      "Stimulants — cocaine, crack, methamphetamine, MDMA, molly, ecstasy, Adderall, Ritalin.",
      "Opioids, depressants & sedatives — heroin, fentanyl, krokodil, oxycodone, Xanax, Valium.",
      "Dissociatives — ketamine, PCP, DXM.",
      "Synthetic drugs & 'legal highs' — K2, spice, bath salts, synthetic cannabinoids.",
      "Prescription drugs & controlled medications — any medication, in any quantity, for any reason.",
      "Drug paraphernalia — pipes, bongs, grinders, syringes, scales marketed for weighing drugs, baggies.",
      "Research chemicals & analogues — anything marketed as a 'research chemical,' 'novelty item,' or 'not for human consumption.'",
      "Drug precursors & manufacturing equipment — pill presses, lab equipment, precursor chemicals, any guide for production.",
    ],
  },
  {
    heading: "Weapons & Violence",
    note: "Any item whose primary purpose is to cause physical harm.",
    items: [
      "Firearms — handguns, rifles, shotguns, functional, deactivated, or a replica.",
      "Ammunition — bullets, cartridges, casings, primers, gunpowder, reloading components.",
      "Explosives — bombs, grenades, blasting caps, fireworks marketed for destruction.",
      "Bladed weapons — switchblades, ballistic knives, throwing stars, swords marketed as weapons. Kitchen knives with a legitimate culinary purpose are fine.",
      "Other weapons — brass knuckles, nunchucks, tasers, stun guns, pepper spray marketed for assault.",
      "Weapon parts & modifications — suppressors, silencers, bump stocks, high-capacity magazines, ghost gun kits, unfinished receivers.",
      "3D-printed weapon files — any digital file, blueprint, or template for printing firearms or weapon components.",
      "Weapon training for harm — any service teaching how to harm others, evade law enforcement, or manufacture weapons.",
    ],
  },
  {
    heading: "People & Exploitation",
    note: "No exception, no gray area.",
    items: [
      "Human beings — the sale, trade, or rental of any person, in any form.",
      "Human trafficking — any listing that facilitates, advertises, or enables the movement or exploitation of people.",
      "Modeling & companionship services — 'modeling,' 'companionship,' 'dates,' 'escorts,' 'massage,' 'cuddling.'",
      "Human remains, organs, or specimens — any body part, organ, tissue, blood, or specimen, for any purpose.",
      "Exploitation of minors — anything involving, referencing, or facilitating minors in a sexual, exploitative, or trafficking context.",
    ],
  },
  {
    heading: "Livestock & Animals",
    note: "Livestock and meat are not for sale on the Marketplace.",
    items: [
      "Live animals for abuse — any animal listed for fighting, baiting, abuse, or harm.",
      "Endangered species — any animal, plant, or product made from an endangered or protected species, including anything covered by CITES.",
      "Exotic & dangerous animals — any live animal illegal to own, transport, or sell, or that requires specialized licensing.",
      "Animal specimens — any animal body part, organ, or specimen sold for unlawful or indecent purposes.",
      "Livestock & farm animals — not for sale on the Marketplace. Cattle, pigs, chickens, goats, sheep, horses — any farm animal sold live.",
      "Meat & animal products — not for sale on the Marketplace. Beef, pork, poultry, fish, seafood, jerky, sausages — any processed animal product intended for consumption.",
      "Butchers, farmers & food producers may still be found here — a verified producer may post a listing pointing people to where they can find them. The sale happens off-platform, and WealthCoin is not a party to it.",
    ],
  },
  {
    heading: "Fraud, Scams & Theft",
    note: "Anything intended to deceive or defraud another user.",
    items: [
      "Stolen goods — any item obtained illegally.",
      "Hacked accounts & credentials — any listing selling access to someone else's account, email, or system.",
      "Counterfeit items — fake designer goods, fake currency, fake documents, forged art.",
      "Phishing & malware — any link, file, software, or service designed to steal information or gain unauthorized access.",
      "Financial fraud — any scheme, 'investment opportunity,' signal group, 'pump' coordination, pyramid or Ponzi scheme.",
      "Identity documents — fake IDs, passports, driver's licenses, visas, birth certificates, Social Security cards.",
    ],
  },
];

const notForSale = [
  {
    title: "Prayer, worship, Bible studies, discipleship, spiritual counseling, or any religious service",
    highlight: "Freely received, freely given. Never for sale on WealthCoin.",
  },
  {
    title: "Ministry and nonprofit participation",
    highlight: "Churches, ministries, nonprofits may participate — but never for sale. Donations to a verified church or 501(c)(3) go directly to that organization's WTC address, not through WealthCoin.",
  },
  {
    title: "Anything that commodifies the sacred",
    highlight: "The Gospel is not a product. Scripture is not a product. Faith is not a product.",
  },
];

export default function RulesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface text-secondary">
      <header className="border-b border-border-subtle px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            to="/marketplace"
            className="text-sm font-semibold tracking-widest text-accent hover:text-accent"
          >
            ← Back to Marketplace
          </Link>
          <span className="text-xs uppercase tracking-widest text-secondary">
            Marketplace Rules &amp; Regulations
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight">
            Marketplace Rules &amp; Regulations
          </h1>
          <p className="text-secondary">
            Read carefully. Your continued use of the Marketplace means you agree
            to everything below. This is a house, not a marketplace of noise.
          </p>
        </div>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-accent">
            What You Can Do Here
          </h2>
          <p className="mb-6 text-secondary">
            The Marketplace is a place for stewards to trade honestly. Here's
            what's welcome:
          </p>
          <div className="space-y-3">
            {canDo.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border-subtle bg-elevated p-4"
              >
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-secondary">{item.body}</p>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {item.highlight}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-accent">
            Local Pickup &amp; Delivery — Signpost Listings
          </h2>
          <p className="mb-4 text-secondary">
            Some listings are signposts — they point you to a local producer
            (meat, produce, dairy, fresh baked goods) rather than completing the
            sale here. That's because perishable goods can't be shipped through
            the platform.
          </p>
          <div className="rounded-lg border border-border-subtle bg-elevated p-4">
            <p className="font-semibold text-secondary">Please understand:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-secondary">
              <li>
                A signpost sale happens{" "}
                <span className="font-semibold">between you and the seller</span>,
                off-platform. WealthCoin is not a party to it.
              </li>
              <li>
                <span className="font-semibold">
                  Meet in public, bring a friend, trust your instincts.
                </span>{" "}
                You are responsible for your own safety in any local exchange.
              </li>
              <li>
                If it can be shipped or delivered digitally, it must be sold in
                WTC on-platform.{" "}
                <span className="font-semibold">
                  Signposts are only for perishable, location-bound goods.
                </span>
              </li>
              <li>
                If a seller uses a signpost to complete a transaction that could
                have happened on-platform,{" "}
                <span className="font-semibold">
                  that's a violation — report it.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-accent">
            What Is Never Allowed
          </h2>
          <p className="mb-6 text-secondary">
            The following are permanently prohibited. No appeal, no gray area, no
            "it was a joke." If you list any of these, we will preserve the
            evidence associated with your account — including your verified
            email, IP data, and listing content — report it to law enforcement,
            and permanently ban you from WealthCoin.
          </p>
          <div className="space-y-3">
            {neverAllowed.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border-subtle bg-elevated p-4"
              >
                <p className="font-medium text-secondary">{item.title}</p>
                <p className="mt-1 text-sm text-secondary">{item.body}</p>
                <p className="mt-1 text-sm font-semibold text-secondary">
                  {item.highlight}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-accent">
            The Complete Prohibited List
          </h2>
          <p className="mb-6 text-secondary">
            This list is not exhaustive — it is a floor, not a ceiling. Laws vary
            by country, state, and jurisdiction; WealthCoin therefore directly
            prohibits these items regardless of local legality.
          </p>
          <div className="space-y-6">
            {prohibitedSections.map((section) => (
              <div
                key={section.heading}
                className="rounded-lg border border-border-subtle bg-elevated p-5"
              >
                <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-secondary">
                  <span className="inline-block h-2 w-2 rounded-sm bg-surface" />
                  {section.heading}
                </h3>
                <p className="mb-3 text-sm italic text-secondary">
                  {section.note}
                </p>
                <ul className="space-y-2">
                  {section.items.map((item, i) => {
                    const [lead, ...rest] = item.split("—");
                    return (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-secondary"
                      >
                        <span className="font-bold text-secondary">{lead}</span>
                        {rest.length > 0 && <>—{rest.join("—")}</>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-accent">
            Categories Not for Sale
          </h2>
          <p className="mb-6 text-secondary">
            These are not allowed to be listed for a price — no exceptions. If it
            falls in one of these categories, you may not charge for it:
          </p>
          <div className="space-y-3">
            {notForSale.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border-subtle bg-elevated p-4"
              >
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {item.highlight}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-semibold text-accent">
            Reviews &amp; Reputation
          </h2>
          <p className="mb-4 text-secondary">
            WealthCoin is not responsible for the transactions between buyers and
            sellers — but we hold everyone accountable through reputation and
            rules. Here's how trust works here:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary">
            <li>
              <span className="font-semibold">Every seller has a reputation</span>,
              tied to their verified account and wallet. A history of honest
              trades earns trust.
            </li>
            <li>
              <span className="font-semibold">Buyers can review sellers</span>{" "}
              after a transaction. One bad review is worth more than any
              guarantee.
            </li>
            <li>
              <span className="font-semibold">
                We don't guarantee delivery or safety
              </span>{" "}
              — but we do guarantee consequences. Rip someone off, and your
              account and reputation are gone.
            </li>
            <li>
              <span className="font-semibold">Report bad behavior.</span> One
              flag per user per listing. Every report is reviewed by a human, and
              repeat offenders are permanently banned.
            </li>
          </ul>
        </section>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/marketplace")}
            className="rounded-lg bg-accent px-8 py-3 font-semibold text-secondary transition hover:bg-accent"
          >
            Back to Marketplace
          </button>
        </div>
      </main>
    </div>
  );
}
