import React, { useEffect, useMemo, useRef, useState } from "react";

const allocations = [
  {
    title: "Public Sale",
    percent: 30,
    amount: "300,000,000 WTC",
    shortAmount: "300M WTC",
    color: "#D4AF37",
    description:
      "Supports community distribution through Genesis Early Access and future public offerings.",
  },
  {
    title: "Treasury",
    percent: 17,
    amount: "170,000,000 WTC",
    shortAmount: "170M WTC",
    color: "#22C55E",
    description:
      "Supports ecosystem development, operations, liquidity, security, and future initiatives.",
  },
  {
    title: "Mission Fund",
    percent: 15,
    amount: "150,000,000 WTC",
    shortAmount: "150M WTC",
    color: "#84CC16",
    description:
      "Reserved for charitable outreach, humanitarian projects, and community impact.",
  },
  {
    title: "Staking",
    percent: 13,
    amount: "130,000,000 WTC",
    shortAmount: "130M WTC",
    color: "#F59E0B",
    description:
      "Reserved for future staking rewards and long-term participation incentives.",
  },
  {
    title: "Founders",
    percent: 12,
    amount: "120,000,000 WTC",
    shortAmount: "120M WTC",
    color: "#8B5CF6",
    description:
      "Allocated for long-term leadership, development, and continued ecosystem stewardship.",
  },
  {
    title: "Burn Reserve",
    percent: 10,
    amount: "100,000,000 WTC",
    shortAmount: "100M WTC",
    color: "#EF4444",
    description:
      "Reserved for future permanent supply reduction through transparent token burns.",
  },
  {
    title: "Marketing",
    percent: 3,
    amount: "30,000,000 WTC",
    shortAmount: "30M WTC",
    color: "#0EA5E9",
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
      className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#071009] px-6 py-20 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_40%),radial-gradient(circle_at_90%_70%,rgba(24,85,48,0.10),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-display text-sm uppercase tracking-[0.4em] text-[#D4AF37]">
            WealthCoin Tokenomics
          </p>

          <h2 className="gold-text mt-5 font-display text-4xl font-bold sm:text-5xl">
            Designed for Long-Term Stewardship
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Every allocation within WealthCoin has been intentionally designed
            to support responsible growth, transparency, community
            participation, and long-term ecosystem development.
          </p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
              Total Supply
            </p>

            <h3 className="gold-text mt-2 font-display text-4xl font-bold sm:text-5xl">
              1,000,000,000
            </h3>

            <p className="mt-1 text-white/60">WTC</p>
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
                stroke={activeAllocation.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 6"
                pathLength="1"
                filter="url(#tokenomicsLineGlow)"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 0,
                  animation: "tokenomicsLineDraw 320ms ease-out",
                }}
              />

              <circle
                cx={line.startX}
                cy={line.startY}
                r="4"
                fill={activeAllocation.color}
                filter="url(#tokenomicsLineGlow)"
              />

              <circle
                cx={line.endX}
                cy={line.endY}
                r="4"
                fill={activeAllocation.color}
                filter="url(#tokenomicsLineGlow)"
              />
            </svg>
          )}

          <div className="relative z-20 flex justify-center">
            <div
              ref={chartRef}
              className="relative h-72 w-72 sm:h-80 sm:w-80"
            >
              <div className="absolute inset-[7%] rounded-full border border-[#D4AF37]/20 shadow-[0_0_45px_rgba(212,175,55,0.10)]" />

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
                  stroke="rgba(255,255,255,0.04)"
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
                      stroke={allocation.color}
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
                      className="cursor-pointer transition-all duration-300"
                      style={{
                        opacity: chartVisible
                          ? anotherIsActive
                            ? 0.42
                            : 1
                          : 0,
                        transition:
                          "opacity 650ms ease, stroke-width 250ms ease, transform 250ms ease",
                        transitionDelay: chartVisible
                          ? `${index * 75}ms`
                          : "0ms",
                      }}
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
                className="absolute inset-[29%] flex flex-col items-center justify-center rounded-full border bg-[#071009]/95 px-3 text-center shadow-[inset_0_0_24px_rgba(212,175,55,0.06),0_0_30px_rgba(0,0,0,0.40)] transition-all duration-300"
                style={{
                  borderColor: activeAllocation
                    ? `${activeAllocation.color}66`
                    : "rgba(212,175,55,0.20)",
                  boxShadow: activeAllocation
                    ? `inset 0 0 24px ${activeAllocation.color}12, 0 0 24px ${activeAllocation.color}22`
                    : undefined,
                }}
              >
                <div
                  key={
                    activeAllocation
                      ? activeAllocation.title
                      : "total-supply"
                  }
                  className="flex flex-col items-center animate-[fadeIn_250ms_ease-out]"
                >
                  {activeAllocation ? (
                    <>
                      <span
                        className="font-display text-3xl font-bold"
                        style={{
                          color: activeAllocation.color,
                        }}
                      >
                        {activeAllocation.percent}%
                      </span>

                      <span className="mt-1 max-w-[120px] text-[9px] font-bold uppercase tracking-[0.16em] text-white/70">
                        {activeAllocation.title}
                      </span>

                      <span className="mt-2 text-[10px] font-semibold text-white/45">
                        {activeAllocation.shortAmount}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-display text-3xl font-bold text-[#D4AF37]">
                        1B
                      </span>

                      <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/45">
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
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-black/35 p-4 outline-none transition-all duration-300 ${
                    isActive
                      ? "-translate-y-1 bg-black/65"
                      : "border-[#D4AF37]/15 hover:-translate-y-1"
                  } ${
                    anotherIsActive ? "opacity-50" : "opacity-100"
                  }`}
                  style={{
                    borderColor: isActive
                      ? allocation.color
                      : undefined,
                    boxShadow: isActive
                      ? `0 0 26px ${allocation.color}24`
                      : undefined,
                  }}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      backgroundColor: allocation.color,
                      boxShadow: `0 0 14px ${allocation.color}`,
                    }}
                  />

                  <div
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                    style={{
                      backgroundColor: allocation.color,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: allocation.color,
                          boxShadow: isActive
                            ? `0 0 12px ${allocation.color}`
                            : "none",
                        }}
                      />

                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                        {allocation.title}
                      </p>
                    </div>

                    <p
                      className="mt-3 font-display text-2xl font-bold transition-colors duration-300"
                      style={{
                        color: isActive
                          ? allocation.color
                          : "#D4AF37",
                      }}
                    >
                      {allocation.percent}%
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/55">
                      {allocation.amount}
                    </p>

                    <div
                      className={`grid transition-all duration-300 ${
                        isActive
                          ? "mt-3 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className="border-t pt-3 text-[11px] leading-5 text-white/55"
                          style={{
                            borderColor: `${allocation.color}33`,
                          }}
                        >
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
          <article className="rounded-2xl border border-[#D4AF37]/20 bg-black/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-black/55">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              Genesis Early Access
            </p>

            <h3 className="mt-3 font-display text-xl text-white">
              Part of the Public Sale Allocation
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/55">
              Genesis Early Access distributes{" "}
              <span className="font-semibold text-white/80">
                21,000,000 WTC
              </span>{" "}
              from the 300,000,000 WTC Public Sale allocation. It is not an
              additional allocation beyond the established total supply.
            </p>
          </article>

          <article className="rounded-2xl border border-[#D4AF37]/20 bg-black/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-black/55">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              Governance Notice
            </p>

            <h3 className="mt-3 font-display text-xl text-white">
              An Initial Stewardship Framework
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/55">
              These allocations represent WealthCoin&apos;s initial stewardship
              plan. Certain ecosystem allocations may later be adjusted through
              transparent, community-approved governance proposals.
            </p>
          </article>
        </div>
      </div>

      <style>{`
        @keyframes tokenomicsLineDraw {
          from {
            stroke-dashoffset: 1;
            opacity: 0;
          }

          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #tokenomics *,
          #tokenomics *::before,
          #tokenomics *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}