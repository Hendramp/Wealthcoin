import React, { useEffect, useMemo, useRef, useState } from "react";

const allocations = [
  {
    title: "Public Sale",
    percent: 30,
    amount: "300,000,000 WTC",
    shortAmount: "300M WTC",
    colorClass: "text-accent",
    description:
      "Supports community distribution through Genesis Early Access and future public offerings.",
  },
  {
    title: "Treasury",
    percent: 17,
    amount: "170,000,000 WTC",
    shortAmount: "170M WTC",
    colorClass: "text-accent-hover",
    description:
      "Supports ecosystem development, operations, liquidity, security, and future initiatives.",
  },
  {
    title: "Mission Fund",
    percent: 15,
    amount: "150,000,000 WTC",
    shortAmount: "150M WTC",
    colorClass: "text-secondary",
    description:
      "Reserved for charitable outreach, humanitarian projects, and community impact.",
  },
  {
    title: "Staking",
    percent: 13,
    amount: "130,000,000 WTC",
    shortAmount: "130M WTC",
    colorClass: "text-accent",
    description:
      "Reserved for future staking rewards and long-term participation incentives.",
  },
  {
    title: "Founders",
    percent: 12,
    amount: "120,000,000 WTC",
    shortAmount: "120M WTC",
    colorClass: "text-accent-hover",
    description:
      "Allocated for long-term leadership, development, and continued ecosystem stewardship.",
  },
  {
    title: "Burn Reserve",
    percent: 10,
    amount: "100,000,000 WTC",
    shortAmount: "100M WTC",
    colorClass: "text-border-subtle",
    description:
      "Reserved for future permanent supply reduction through transparent token burns.",
  },
  {
    title: "Marketing",
    percent: 3,
    amount: "30,000,000 WTC",
    shortAmount: "30M WTC",
    colorClass: "text-primary",
    description:
      "Supports responsible awareness, strategic partnerships, education, and community growth.",
  },
];

const CHART_SIZE = 320;
const CHART_CENTER = CHART_SIZE / 2;
const CHART_RADIUS = 112;
const CHART_STROKE = 58;
const CHART_CIRCUMFERENCE = 2 * Math.PI * CHART_RADIUS;
const SLICE_GAP = 1.15;

function getSliceOffset(index) {
  return allocations
    .slice(0, index)
    .reduce((total, allocation) => total + allocation.percent, 0);
}

function getSliceMovement(index, distance = 8) {
  const startPercent = getSliceOffset(index);
  const middlePercent =
    startPercent + allocations[index].percent / 2;

  const angle = middlePercent * 3.6 - 90;
  const radians = (angle * Math.PI) / 180;

  return {
    x: Math.cos(radians) * distance,
    y: Math.sin(radians) * distance,
  };
}

export default function TokenomicsSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [line, setLine] = useState(null);
  const [chartVisible, setChartVisible] = useState(false);

  const sectionRef = useRef(null);
  const interactionAreaRef = useRef(null);
  const chartRef = useRef(null);
  const cardRefs = useRef([]);

  const activeAllocation =
    activeIndex !== null ? allocations[activeIndex] : null;

  const sliceOffsets = useMemo(
    () =>
      allocations.map((_, index) =>
        getSliceOffset(index)
      ),
    []
  );

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChartVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateLine = () => {
      if (
        activeIndex === null ||
        !interactionAreaRef.current ||
        !chartRef.current ||
        !cardRefs.current[activeIndex]
      ) {
        setLine(null);
        return;
      }

      const containerRect =
        interactionAreaRef.current.getBoundingClientRect();

      const chartRect =
        chartRef.current.getBoundingClientRect();

      const cardRect =
        cardRefs.current[activeIndex].getBoundingClientRect();

      const startX =
        chartRect.right - containerRect.left - 20;

      const startY =
        chartRect.top -
        containerRect.top +
        chartRect.height / 2;

      const endX =
        cardRect.left - containerRect.left + 3;

      const endY =
        cardRect.top -
        containerRect.top +
        cardRect.height / 2;

      const distance = Math.max(endX - startX, 90);

      setLine({
        startX,
        startY,
        endX,
        endY,
        controlX1: startX + distance * 0.38,
        controlX2: endX - distance * 0.38,
      });
    };

    calculateLine();

    window.addEventListener("resize", calculateLine);

    const resizeObserver = new ResizeObserver(calculateLine);

    if (interactionAreaRef.current) {
      resizeObserver.observe(interactionAreaRef.current);
    }

    return () => {
      window.removeEventListener("resize", calculateLine);
      resizeObserver.disconnect();
    };
  }, [activeIndex]);
  return (
    <section
      ref={sectionRef}
      id="tokenomics"
      className="relative overflow-hidden border-t border-border-subtle/20 bg-surface px-6 py-20 text-primary"
    >
      <div className="absolute inset-0 bg-ambient" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-display text-sm uppercase tracking-[0.4em] text-accent">
            WealthCoin Tokenomics
          </p>

          <h2 className="gold-text mt-5 font-display text-4xl font-bold sm:text-5xl">
            Designed for Long-Term Stewardship
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-secondary sm:text-lg">
            Every allocation within WealthCoin has been intentionally designed
            to support responsible growth, transparency, community
            participation, and long-term ecosystem development.
          </p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Total Supply
            </p>

            <h3 className="gold-text mt-2 font-display text-4xl font-bold sm:text-5xl">
              1,000,000,000
            </h3>

            <p className="mt-1 text-secondary">WTC</p>
          </div>
        </div>

        <div
          ref={interactionAreaRef}
          className="relative mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {line && activeAllocation && (
            <svg
              className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible lg:block"
              aria-hidden="true"
            >
              <defs>
                <filter
                  id="tokenomicsLineGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur
                    stdDeviation="3"
                    result="coloredBlur"
                  />

                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d={`M ${line.startX} ${line.startY}
                    C ${line.controlX1} ${line.startY},
                      ${line.controlX2} ${line.endY},
                      ${line.endX} ${line.endY}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 6"
                pathLength="1"
                filter="url(#tokenomicsLineGlow)"
                className={`${activeAllocation.colorClass} tokenomics-line-draw`}
              />

              <circle
                cx={line.startX}
                cy={line.startY}
                r="4"
                fill="currentColor"
                className={activeAllocation.colorClass}
                filter="url(#tokenomicsLineGlow)"
              />

              <circle
                cx={line.endX}
                cy={line.endY}
                r="4"
                fill="currentColor"
                className={activeAllocation.colorClass}
                filter="url(#tokenomicsLineGlow)"
              />
            </svg>
          )}

          <div className="relative z-20 flex justify-center">
            <div
              ref={chartRef}
              className="relative h-72 w-72 sm:h-80 sm:w-80"
            >
              <div className="absolute inset-[7%] rounded-full border border-border-subtle/20" />

              <div className="absolute inset-[12%] rounded-full border border-white/5" />

              <svg
                viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
                className="absolute inset-0 h-full w-full overflow-visible"
                role="img"
                aria-label="WealthCoin token allocation chart"
              >
                <defs>
                  <filter
                    id="tokenomicsSliceGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      stdDeviation="5"
                      result="sliceBlur"
                    />

                    <feMerge>
                      <feMergeNode in="sliceBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <circle
                  cx={CHART_CENTER}
                  cy={CHART_CENTER}
                  r={CHART_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  className="text-secondary"
                  strokeWidth={CHART_STROKE + 8}
                />

                {allocations.map((allocation, index) => {
                  const isActive = activeIndex === index;
                  const anotherIsActive =
                    activeIndex !== null && activeIndex !== index;

                  const movement = isActive
                    ? getSliceMovement(index)
                    : { x: 0, y: 0 };

                  const sliceLength =
                    (allocation.percent / 100) *
                    CHART_CIRCUMFERENCE;

                  const visibleLength = Math.max(
                    sliceLength -
                      (SLICE_GAP / 100) *
                        CHART_CIRCUMFERENCE,
                    0
                  );

                  const offsetLength =
                    (sliceOffsets[index] / 100) *
                    CHART_CIRCUMFERENCE;

                  return (
                    <circle
                      key={allocation.title}
                      cx={CHART_CENTER}
                      cy={CHART_CENTER}
                      r={CHART_RADIUS}
                      fill="none"
                      stroke="currentColor"
                      className={`${allocation.colorClass} cursor-pointer transition-all duration-200 ${
                        chartVisible
                          ? anotherIsActive
                            ? "opacity-40"
                            : "opacity-100"
                          : "opacity-0"
                      }`}
                      strokeWidth={
                        isActive
                          ? CHART_STROKE + 5
                          : CHART_STROKE
                      }
                      strokeLinecap="butt"
                      strokeDasharray={`${visibleLength} ${
                        CHART_CIRCUMFERENCE - visibleLength
                      }`}
                      strokeDashoffset={-offsetLength}
                      transform={`rotate(-90 ${CHART_CENTER} ${CHART_CENTER}) translate(${movement.x} ${movement.y})`}
                      filter={
                        isActive
                          ? "url(#tokenomicsSliceGlow)"
                          : undefined
                      }
                      onMouseEnter={() =>
                        setActiveIndex(index)
                      }
                      onMouseLeave={() =>
                        setActiveIndex(null)
                      }
                      onFocus={() => setActiveIndex(index)}
                      tabIndex={0}
                      aria-label={`${allocation.title}: ${allocation.percent}%`}
                    />
                  );
                })}
              </svg>

              <div
                className="absolute inset-[29%] flex flex-col items-center justify-center rounded-full border border-border-subtle/25 bg-base px-3 text-center transition-all duration-200"
              >
                <div
                  key={
                    activeAllocation
                      ? activeAllocation.title
                      : "total-supply"
                  }
                  className="flex flex-col items-center animate-fade-in"
                >
                  {activeAllocation ? (
                    <>
                      <span
                        className={`font-display text-3xl font-bold ${activeAllocation.colorClass}`}
                      >
                        {activeAllocation.percent}%
                      </span>

                      <span className="mt-1 max-w-[120px] text-[9px] font-bold uppercase tracking-[0.16em] text-secondary">
                        {activeAllocation.title}
                      </span>

                      <span className="mt-2 text-[10px] font-semibold text-secondary">
                        {activeAllocation.shortAmount}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-display text-3xl font-bold text-accent">
                        1B
                      </span>

                      <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-secondary">
                        Total WTC
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
                    <div className="relative z-20 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {allocations.map((allocation, index) => {
              const isActive = activeIndex === index;
              const anotherIsActive =
                activeIndex !== null && activeIndex !== index;

              return (
                <article
                  key={allocation.title}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                  onClick={() =>
                    setActiveIndex((currentIndex) =>
                      currentIndex === index ? null : index
                    )
                  }
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  className={`group relative cursor-pointer overflow-hidden rounded-card border p-4 outline-none transition-all duration-200 ${
                    isActive
                      ? "-translate-y-1 border-accent/60 bg-elevated"
                      : "border-border-subtle/15 bg-surface hover:-translate-y-0.5"
                  } ${
                    anotherIsActive ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-[2px] bg-accent transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-20"
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />

                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">
                        {allocation.title}
                      </p>
                    </div>

                    <p
                      className={`mt-3 font-display text-2xl font-bold transition-colors duration-200 ${
                        isActive ? allocation.colorClass : "text-accent"
                      }`}
                    >
                      {allocation.percent}%
                    </p>

                    <p className="mt-1 text-xs leading-5 text-secondary">
                      {allocation.amount}
                    </p>

                    <div
                      className={`grid transition-all duration-200 ${
                        isActive
                          ? "mt-3 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-border-subtle/30 pt-3 text-[11px] leading-5 text-secondary">
                          {allocation.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="card-gold p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Genesis Early Access
            </p>

            <h3 className="mt-3 font-display text-xl text-primary">
              Part of the Public Sale Allocation
            </h3>

            <p className="mt-3 text-sm leading-7 text-secondary">
              Genesis Early Access distributes{" "}
              <span className="font-semibold text-primary">
                21,000,000 WTC
              </span>{" "}
              from the 300,000,000 WTC Public Sale allocation. It is not an
              additional allocation beyond the established total supply.
            </p>
          </article>

          <article className="card-gold p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Governance Notice
            </p>

            <h3 className="mt-3 font-display text-xl text-primary">
              An Initial Stewardship Framework
            </h3>

            <p className="mt-3 text-sm leading-7 text-secondary">
              These allocations represent WealthCoin&apos;s initial stewardship
              plan. Certain ecosystem allocations may later be adjusted through
              transparent, community-approved governance proposals.
            </p>
          </article>
        </div>
      </div>

    </section>
  );
}