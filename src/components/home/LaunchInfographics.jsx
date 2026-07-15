export default function LaunchInfographics() {
  const graphics = [
    {
      title: "Founding Charter",
      description:
        "The faith, stewardship, mission, and commitments behind WealthCoin.",
      image: "/assets/wealthcoin-founding-charter.jpeg",
      button: "Read Charter",
    },
    {
      title: "Get Started",
      description:
        "A simple launch-day path for new users to purchase POL, set up a wallet, and join the ecosystem.",
      image: "/assets/wealthcoin-get-started.jpeg",
      button: "Start Journey",
    },
    {
      title: "Ecosystem Overview",
      description:
        "The full WealthCoin vision: wallet, academy, governance, community, stewardship, and global impact.",
      image: "/assets/wealthcoin-ecosystem.jpeg",
      button: "View Ecosystem",
    },
  ];

  return (
    <section className="bg-[#050706] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-yellow-400">
            Launch Day Visual System
          </p>
          <h2 className="text-3xl font-bold text-yellow-300 md:text-5xl">
            Explore the WealthCoin Foundation
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/70">
            Three launch-ready visuals guide every visitor through the heart of
            WealthCoin: why it exists, how to begin, and where the ecosystem is
            going.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {graphics.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-yellow-500/30 bg-black/50 shadow-[0_0_35px_rgba(234,179,8,0.08)]"
            >
              <div className="aspect-[3/4] overflow-hidden border-b border-yellow-500/20 bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-yellow-300">
                  {item.title}
                </h3>
                <p className="mt-3 min-h-24 text-sm leading-6 text-white/70">
                  {item.description}
                </p>
                <button className="mt-6 rounded-full border border-yellow-400/60 px-5 py-2 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400 hover:text-black">
                  {item.button}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}