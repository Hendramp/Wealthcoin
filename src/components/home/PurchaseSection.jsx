// src/components/home/PurchaseSection.jsx
import React, { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";

const WTC_CONTRACT = "0x394b57F4a40ff31530d66f904e1Db2C6516c018F";
const WTC_CONTRACT_URL = `https://polygonscan.com/token/${WTC_CONTRACT}`;
const WTC_DECIMALS = 18;

// Fixed display price until the WTC/POL pool is indexed and has real volume.
// When that happens, add a fetch here and replace this with live state.
const FALLBACK_PRICE_USD = 0.000075;

const POL_CONTRACT = "0x0000000000000000000000000000000000001010";

const POOL_URL =
  `https://app.uniswap.org/swap?inputCurrency=${POL_CONTRACT}&outputCurrency=${WTC_CONTRACT}&chain=polygon`;

const WTC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
];

export default function PurchaseSection() {
  const { address, isConnected } = useAppKitAccount();
  const [wtcBalance, setWtcBalance] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadBalances() {
      if (!isConnected || !address) {
        setWtcBalance(0);
        return;
      }
      try {
        const provider = new BrowserProvider(window.ethereum);
        const wtc = new Contract(WTC_CONTRACT, WTC_ABI, provider);
        const wtcRaw = await wtc.balanceOf(address);
        setWtcBalance(parseFloat(formatUnits(wtcRaw, WTC_DECIMALS)));
      } catch (err) {
        console.error("Balance fetch failed:", err);
      }
    }
    loadBalances();
  }, [isConnected, address]);

  const wtcValueUsd = wtcBalance * FALLBACK_PRICE_USD;

  const handleCopyContract = async () => {
    try {
      await navigator.clipboard.writeText(WTC_CONTRACT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <section
      id="purchase"
      className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#030604] px-4 py-16 text-white sm:px-6 sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.09),transparent_40%),radial-gradient(circle_at_15%_85%,rgba(24,85,48,0.14),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="text-center">
          <p className="font-display text-sm uppercase tracking-[0.4em] text-[#D4AF37]">
            Purchase WTC
          </p>

          <h2 className="gold-text mt-5 font-display text-4xl font-bold sm:text-5xl">
            Swap POL for WTC
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Buy WTC on the Polygon network. Connect your wallet, then swap
            securely through Uniswap — peer-to-peer with no middleman.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-black/50 shadow-[0_0_35px_rgba(212,175,55,0.05)]">
          <div className="border-b border-[#D4AF37]/15 px-6 py-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8247E5]/50 bg-[#8247E5]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#8247E5]">
              <span className="h-2 w-2 rounded-full bg-[#8247E5] animate-pulse" />
              Live on Polygon Network
            </div>

            <div className="mt-4 text-sm uppercase tracking-widest text-white/50">
              WTC / POL
            </div>

            <div className="text-5xl font-bold">
              <span className="gold-text">${FALLBACK_PRICE_USD.toFixed(6)}</span>
            </div>
          </div>

          <div className="p-6">
            {isConnected ? (
              <div className="mb-6 space-y-3 rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Your WTC balance</span>
                  <span className="font-semibold">
                    {wtcBalance.toFixed(4)} WTC
                    <span className="text-white/40 ml-2">(≈${wtcValueUsd.toFixed(2)})</span>
                  </span>
                </div>
              </div>
            ) : (
              <p className="mb-6 text-center text-sm text-white/40">
                Connect your wallet to see your balances.
              </p>
            )}

            <a
              href={POOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-xl bg-[#D4AF37] px-10 py-4 text-center text-lg font-semibold text-black shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#e8c65a]"
            >
              Buy WTC on Uniswap
            </a>

            <p className="mt-4 text-center text-xs leading-5 text-white/40">
              Your swap is completed on Uniswap, the decentralized exchange
              hosting the WTC / POL pool. This keeps every trade secure,
              transparent, and peer-to-peer — no middleman.
            </p>

            <div className="mt-5 rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  WTC Contract Address
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={WTC_CONTRACT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs font-medium text-white/60 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                    title="View on Polygonscan"
                  >
                    Polygonscan
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <path d="M10 14L21 3" />
                    </svg>
                  </a>
                  <button
                    onClick={handleCopyContract}
                    className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs font-medium text-white/60 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                    title="Copy contract address"
                  >
                    {copied ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-2 break-all font-mono text-sm text-[#D4AF37]">
                {WTC_CONTRACT}
              </p>
              <p className="mt-2 text-xs leading-5 text-white/45">
                This is the official WTC token contract on the Polygon network.
                Always verify this address before transacting — scammers create
                fake tokens with similar addresses. Check it on Polygonscan any
                time.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#D4AF37]/15 bg-black/35 p-5 text-center">
          <p className="text-xs leading-6 text-white/45">
            Digital assets involve substantial risk, including market
            volatility and liquidity constraints. Never commit funds you cannot
            afford to lose. This is not financial advice.
          </p>
        </div>
      </div>
    </section>
  );
}
