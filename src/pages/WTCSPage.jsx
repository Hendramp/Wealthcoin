import React from "react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Individual",
    service: "Digital Asset Education & Wallet Setup",
    digital: "$80",
    cash: "$100",
    description:
      "For the person who wants to hold their own keys and actually understand what that means.",
    deliverables: [
      "Personal wallet setup, done with you, not for you",
      "Cryptocurrency and self-custody education",
      "Security best practices and recovery planning",
      "Digital Wallet Guide",
      "Certificate of Completion",
    ],
  },
  {
    name: "Business",
    service: "Cryptocurrency Payment Implementation",
    digital: "$700",
    cash: "$850",
    description:
      "For the business that wants to accept crypto at the counter, correctly, from day one.",
    deliverables: [
      "Business wallet setup",
      "Cryptocurrency payment implementation",
      "QR payment signage",
      "Employee introduction training",
      "Business Wallet Guide · Employee Quick Reference · Post-Implementation Handbook",
      "Certificate of Completion",
    ],
  },
  {
    name: "Ministry",
    service: "Cryptocurrency Donation Implementation",
    digital: "$700",
    cash: "$850",
    description:
      "For the ministry that wants to receive giving in digital assets without compromising stewardship or trust.",
    deliverables: [
      "Ministry wallet setup",
      "Donation QR signage",
      "Leadership and volunteer training",
      "Ministry Wallet Guide · Volunteer Quick Reference · Post-Implementation Handbook",
      "Certificate of Completion",
    ],
  },
];

const enterpriseDeliverables = [
  "Comprehensive WTCS implementation methodology",
  "Cryptocurrency payment implementation training",
  "Hands-on implementation at your first approved location",
  "Wallet security and operational best practices",
  "Internal implementation workflow and team education methodology",
  "Live implementation exercises and Q&A sessions",
  "WTCS Internal Team Certification",
];

const enterpriseScopes = [
  ["Single location, small team", "$5,000 – $10,000"],
  ["Multi-location, 2–5 sites", "$10,000 – $20,000"],
  ["Franchise or 6+ locations", "$20,000 – $30,000"],
];

const addOns = [
  ["NOWPayments merchant integration", "+$80", "+$90"],
  ["Additional wallet setup", "+$20", "+$25 per wallet"],
  ["Confidential Digital Asset Record Book", "$25", "$25"],
  ["Additional business or ministry location", "from $250", "from $275"],
];

const engagementSteps = [
  ["Discovery call.", "We scope what you actually need before anything is quoted."],
  ["Written scope and quote.", "Fixed price, fixed deliverables, no surprises."],
  ["50% deposit to schedule.", "Balance due on completion."],
  ["Implementation.", "Done with your team, on your systems."],
  ["Handoff.", "Guides, records, and certification so you can run it without us."],
];

function PriceCard({ tier }) {
  return (
    <article className="card-gold flex h-full flex-col p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {tier.name}
      </p>
      <h3 className="mt-3 text-h3 font-semibold text-primary">{tier.service}</h3>
      <div className="mt-6 border-y border-border-subtle/25 py-5">
        <p className="font-display text-3xl font-semibold text-accent">
          {tier.digital}{" "}
          <span className="font-sans text-sm font-medium text-secondary">
            in digital assets
          </span>
        </p>
        <p className="mt-2 text-sm text-secondary">{tier.cash} cash</p>
      </div>
      <p className="mt-5 text-sm leading-7 text-secondary">{tier.description}</p>
      <ul className="mt-5 space-y-3 text-sm leading-6 text-secondary">
        {tier.deliverables.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-accent" aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function AddOnCards() {
  return (
    <div className="mt-8 grid gap-3 md:hidden">
      {addOns.map(([name, digital, cash]) => (
        <article key={name} className="rounded-card border border-border-subtle/25 bg-elevated p-5">
          <h3 className="font-semibold text-primary">{name}</h3>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-secondary">Digital Assets</dt>
              <dd className="mt-1 text-accent">{digital}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-secondary">Cash</dt>
              <dd className="mt-1 text-secondary">{cash}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export default function WTCSPage() {
  return (
    <main className="min-h-screen bg-base text-primary">
      <div className="pointer-events-none fixed inset-0 bg-ambient" aria-hidden="true" />
      <div className="relative mx-auto max-w-content px-6 pb-24 pt-12 sm:pt-16">
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-secondary transition hover:text-accent-hover"
          >
            <span aria-hidden="true">←</span> Back to WealthCoin
          </Link>
        </div>

        <section className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            WealthCoin Solutions
          </p>
          <h1 className="mt-5 text-display font-semibold">
            Safely accept cryptocurrency — as an individual, business, or ministry.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary">
            With the professional education and support to do it responsibly.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-secondary">
            Whether you're just curious or ready to move, we'll meet you where you are.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="mailto:WTCteam@outlook.com"
              className="btn-gold min-h-12 w-full px-6 py-3 text-center font-semibold sm:w-auto"
            >
              Schedule a Complimentary Virtual Consultation
            </a>
            <a
              href="/documents/WTCS_Menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost min-h-12 w-full px-6 py-3 text-center font-semibold sm:w-auto"
            >
              View WTCS Menu
            </a>
          </div>
        </section>

        <section className="mt-20 border-t border-border-subtle/25 pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Choose Your Path
            </p>
            <h2 className="mt-3 text-h2 font-semibold">Four tiers. One methodology.</h2>
            <p className="mt-4 leading-7 text-secondary">
              Every engagement ends with your people able to run it without us.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {tiers.map((tier) => <PriceCard key={tier.name} tier={tier} />)}

            <article className="card-gold grid gap-8 p-6 sm:p-8 lg:col-span-3 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Enterprise
                </p>
                <h3 className="mt-3 text-h3 font-semibold text-primary">
                  Internal Implementation Team Training &amp; Certification
                </h3>
                <p className="mt-5 font-display text-3xl font-semibold text-accent">
                  $5,000 – $30,000
                </p>
                <p className="mt-2 text-sm text-secondary">scoped to organization size</p>
                <p className="mt-5 text-sm leading-7 text-secondary">
                  For franchises, multi-location businesses, ministries, and organizations that want a certified internal team running the WTCS methodology themselves.
                </p>

                <h4 className="mt-7 font-semibold text-primary">What the engagement includes:</h4>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary">
                  {enterpriseDeliverables.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-accent" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-primary">How the scope scales:</h4>
                <div className="mt-4 hidden overflow-hidden rounded-card border border-border-subtle/25 md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-elevated text-xs uppercase tracking-wide text-secondary">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Organization size</th>
                        <th className="px-4 py-3 font-semibold">Engagement range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle/20">
                      {enterpriseScopes.map(([size, range]) => (
                        <tr key={size}>
                          <td className="px-4 py-4 text-secondary">{size}</td>
                          <td className="px-4 py-4 font-medium text-accent">{range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 grid gap-3 md:hidden">
                  {enterpriseScopes.map(([size, range]) => (
                    <div key={size} className="rounded-card border border-border-subtle/25 bg-elevated p-4">
                      <p className="text-sm text-secondary">{size}</p>
                      <p className="mt-2 font-semibold text-accent">{range}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-secondary">
                  Final scope is set after a discovery call. Enterprise engagements are invoiced in digital assets or by wire.
                </p>
                <p className="mt-5 rounded-card border border-border-subtle/25 bg-elevated p-4 text-sm leading-6 text-secondary">
                  <span className="font-semibold text-primary">Certification Notice:</span>{" "}
                  WTCS Internal Team Certification is valid for internal organizational use only. Certification authorizes approved participants to implement the WTCS methodology within their own organization. Separate certification agreements apply.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-20 rounded-card border border-border-subtle/25 bg-surface p-6 sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Implementation Add-Ons
            </p>
            <p className="mt-3 text-secondary">Available with any tier.</p>
          </div>
          <div className="mt-8 hidden overflow-hidden rounded-card border border-border-subtle/25 md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-elevated text-xs uppercase tracking-wide text-secondary">
                <tr>
                  <th className="px-5 py-4 font-semibold">Add-On</th>
                  <th className="px-5 py-4 font-semibold">Digital Assets</th>
                  <th className="px-5 py-4 font-semibold">Cash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/20">
                {addOns.map(([name, digital, cash]) => (
                  <tr key={name}>
                    <td className="px-5 py-4 text-primary">{name}</td>
                    <td className="px-5 py-4 font-medium text-accent">{digital}</td>
                    <td className="px-5 py-4 text-secondary">{cash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AddOnCards />
        </section>

        <section className="mt-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              How Engagements Work
            </p>
            <h2 className="mt-3 text-h2 font-semibold">Clear scope. Practical handoff.</h2>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {engagementSteps.map(([title, detail], index) => (
              <li key={title} className="card-gold p-5">
                <span className="font-display text-2xl text-accent">0{index + 1}</span>
                <h3 className="mt-4 font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary">{detail}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-secondary">
            <span className="font-semibold text-primary">Payment:</span>{" "}
            Digital assets or cash. Digital asset pricing reflects lower processing cost and is offered as a discount, not a cash surcharge.
          </p>
        </section>

        <section className="mt-20 border-t border-border-subtle/25 pt-12 text-center">
          <p className="text-sm font-semibold text-primary">
            WealthCoin Solutions — Security · Stewardship · Education
          </p>
          <p className="mt-4 text-sm leading-7 text-secondary">
            WealthCoin Solutions is committed to helping individuals, businesses, ministries, and organizations confidently implement blockchain payment solutions through education, transparency, and practical support.
          </p>
          <p className="mt-6 text-sm text-secondary">
            OfficialWealthCoin.com
          </p>
        </section>
      </div>
    </main>
  );
}
