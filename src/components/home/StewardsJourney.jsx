export default function StewardsJourney() {
  const resources = [
    {
      icon: "📜",
      title: "Founding Charter",
      text: "Read the principles and mission that guide the WealthCoin Foundation.",
      buttons: [
        { text: "Read Charter", href: "/documents/WealthCoin_Founding_Charter.pdf" },
        { text: "Download PDF", href: "/documents/WealthCoin_Founding_Charter.pdf" }
      ]
    },
    {
      icon: "👛",
      title: "Wallet Guide",
      text: "Begin your stewardship journey with our official multilingual wallet guides.",
      buttons: [
        { text: "🇺🇸 English", href: "/documents/Wallet_Guide_EN.pdf" },
        { text: "🇪🇸 Español", href: "/documents/Wallet_Guide_ES.pdf" }
      ]
    },
    {
      icon: "🌍",
      title: "Ecosystem Overview",
      text: "Discover the complete WealthCoin ecosystem and long-term vision.",
      buttons: [
        { text: "Preview", href: "/documents/WealthCoin_Ecosystem_Overview.pdf" },
        { text: "Download PDF", href: "/documents/WealthCoin_Ecosystem_Overview.pdf" }
      ]
    }
  ];

  return (
    <section id="foundation" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[0.4em] text-[#D4AF37] text-sm">
            WealthCoin Foundation
          </p>

          <h2 className="font-display text-5xl md:text-6xl gold-text mb-6">
            Stewardship Begins With Understanding
          </h2>

          <p className="max-w-3xl mx-auto text-white/70 text-lg leading-8">
            Before participating in Genesis, we encourage every visitor to
            understand the mission of the Foundation, learn how to safely
            steward digital assets, and explore the long-term vision of the
            WealthCoin ecosystem.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {resources.map((resource) => (

            <div
              key={resource.title}
              className="card-gold rounded-3xl p-8 flex flex-col"
            >

              <div className="text-5xl mb-6">
                {resource.icon}
              </div>

              <h3 className="font-display text-2xl text-[#D4AF37] mb-4">
                {resource.title}
              </h3>

              <p className="text-white/70 leading-7 flex-grow">
                {resource.text}
              </p>

              <div className="mt-8 flex flex-col gap-3">

                {resource.buttons.map((button) => (

                  <a
                    key={button.text}
                    href={button.href}
                    target="_blank"
                    rel="noreferrer"
                    className="journey-button text-center"
                  >
                    {button.text}
                  </a>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}