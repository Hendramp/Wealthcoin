export default function StewardsJourney() {
  const journey = [
    {
      icon: "🏕️",
      title: "Base Camp",
      text: "Begin your stewardship journey by learning the fundamentals."
    },
    {
      icon: "👛",
      title: "Create a Wallet",
      text: "Secure your digital identity and prepare for Web3."
    },
    {
      icon: "🟣",
      title: "Learn Polygon",
      text: "Understand the blockchain powering WealthCoin."
    },
    {
      icon: "🪙",
      title: "Acquire WealthCoin",
      text: "Participate after completing your educational foundation."
    },
    {
      icon: "📖",
      title: "Biblical Stewardship",
      text: "Grow in wisdom, responsibility, and faithful management."
    },
    {
      icon: "🤝",
      title: "Help Others Climb",
      text: "The summit is where your service begins."
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#111111]">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[0.4em] text-[#D4AF37] text-sm">
            The Steward's Journey
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Every Great Climb Begins With One Step
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {journey.map((step) => (

            <div
              key={step.title}
              className="card-gold rounded-3xl p-8"
            >

              <div className="text-5xl mb-4">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {step.title}
              </h3>

              <p className="text-white/60">
                {step.text}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}