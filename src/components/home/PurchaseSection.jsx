// src/components/home/PurchaseSection.jsx
import React, { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";

const WTC_CONTRACT = "0x394b57F4a40ff31530d66f904e1Db2C6516c018F";
const USDC_CONTRACT = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
const WTC_DECIMALS = 18;
const USDC_DECIMALS = 6;
const FALLBACK_PRICE_USD = 0.00025;
const POOL_URL =
  "https://app.uniswap.org/swap?chain=polygon&outputCurrency=0x394b57F4a40ff31530d66f904e1Db2C6516c018F&inputCurrency=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

const WTC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
];

const USDC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
];

export default function PurchaseSection() {
  const { address, isConnected } = useAppKitAccount();
  const [price, setPrice] = useState(null);
  const [change24h, setChange24h] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wtcBalance, setWtcBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);

  useEffect(() => {
    async function fetchPrice() {
      try {
        // 1) GeckoTerminal (CoinGecko) — indexes the WTC contract on Polygon
        const gt = await fetch(
          `https://api.geckoterminal.com/api/v2/networks/polygon_pos/tokens/${WTC_CONTRACT}`
        );
        const gtData = await gt.json();
        const gtPrice = gtData?.data?.attributes?.price_usd;
        if (gtPrice) {
          setPrice(parseFloat(gtPrice));
          const gtChange = gtData?.data?.attributes?.price_change_percentage;
          setChange24h(gtChange?.h24 ?? null);
          setLoading(false);
          return;
        }
        // 2) Fallback: DexScreener
        const ds = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${WTC_CONTRACT}`
        );
        const dsData = await ds.json();
        const pair = dsData?.pairs?.[0];
        if (pair && pair.priceUsd) {
          setPrice(parseFloat(pair.priceUsd));
          setChange24h(pair.priceChange?.h24 ?? null);
          setLoading(false);
          return;
        }
        throw new Error("no indexed price");
      } catch (err) {
        console.error("Price fetch failed:", err);
        setPrice(FALLBACK_PRICE_USD);
        setChange24h(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPrice();
    const id = setInterval(fetchPrice, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    async function loadBalances() {
      if (!isConnected || !address) {
        setWtcBalance(0);
        setUsdcBalance(0);
        return;
      }
      try {
        const provider = new BrowserProvider(window.ethereum);
        const wtc = new Contract(WTC_CONTRACT, WTC_ABI, provider);
        const usdc = new Contract(USDC_CONTRACT, USDC_ABI, provider);
        const [wtcRaw, usdcRaw] = await Promise.all([
          wtc.balanceOf(address),
          usdc.balanceOf(address),
        ]);
        setWtcBalance(parseFloat(formatUnits(wtcRaw, WTC_DECIMALS)));
        setUsdcBalance(parseFloat(formatUnits(usdcRaw, USDC_DECIMALS)));
      } catch (err) {
        console.error("Balance fetch failed:", err);
      }
    }
    loadBalances();
  }, [isConnected, address]);

  const wtcValueUsd = wtcBalance * (price ?? FALLBACK_PRICE_USD);

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
            Swap USDC for WTC
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Live price tracking for WTC on the Polygon network. Connect your
            wallet, then swap securely through Uniswap — peer-to-peer with no
            middleman.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-black/50 shadow-[0_0_35px_rgba(212,175,55,0.05)]">
          <div className="border-b border-[#D4AF37]/15 px-6 py-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8247E5]/50 bg-[#8247E5]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#8247E5]">
              <span className="h-2 w-2 rounded-full bg-[#8247E5] animate-pulse" />
              Live on Polygon Network
            </div>

            <div className="mt-4 text-sm uppercase tracking-widest text-white/50">
              WTC / USDC
            </div>

            <div className="text-5xl font-bold">
              {loading
                ? <span className="text-white/30">—</span>
                : price
                  ? <span className="gold-text">${price.toFixed(6)}</span>
                  : <span className="text-white/30">Price unavailable</span>}
            </div>

            {change24h !== null && (
              <div className={`mt-2 text-sm ${change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {change24h >= 0 ? "▲" : "▼"} {Math.abs(change24h).toFixed(2)}% 24h
              </div>
            )}
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
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Your USDC balance</span>
                  <span className="font-semibold">{usdcBalance.toFixed(2)} USDC</span>
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
              hosting the WTC / USDC pool. This keeps every trade secure,
              transparent, and peer-to-peer — no middleman.
            </p>
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
