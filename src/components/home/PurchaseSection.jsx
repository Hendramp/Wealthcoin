// src/components/home/PurchaseSection.jsx
import React, { useEffect, useState } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Contract, parseUnits, formatUnits } from "ethers";

const WTC_CONTRACT = "0x394b57F4a40ff31530d66f904e1Db2C6516c018F";
const USDC_CONTRACT = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
const WTC_DECIMALS = 18;
const USDC_DECIMALS = 6;
const FALLBACK_PRICE_USD = 0.00401;
const UNISWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E5587C3606A6E";

const WTC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
];

const USDC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

const ROUTER_ABI = [
  "function exactInputSingle(tuple(address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 deadline, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96) params) payable returns (uint256)",
];

export default function PurchaseSection() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [price, setPrice] = useState(null);
  const [change24h, setChange24h] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usdcAmount, setUsdcAmount] = useState("");
  const [swapError, setSwapError] = useState(null);
  const [wtcBalance, setWtcBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isSwapConfirmed, setIsSwapConfirmed] = useState(false);
  const [slippage, setSlippage] = useState(1); // percent

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${WTC_CONTRACT}`
        );
        const data = await res.json();
        const pair = data?.pairs?.[0];
        if (pair && pair.priceUsd) {
          setPrice(parseFloat(pair.priceUsd));
          setChange24h(pair.priceChange?.h24 ?? null);
        } else {
          setPrice(FALLBACK_PRICE_USD);
          setChange24h(null);
        }
      } catch (err) {
        console.error("Price fetch failed:", err);
        setPrice(FALLBACK_PRICE_USD);
        setChange24h(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPrice();
  }, []);

  useEffect(() => {
    async function loadBalances() {
      if (!isConnected || !address || !walletProvider) {
        setWtcBalance(0);
        setUsdcBalance(0);
        return;
      }
      try {
        const provider = new BrowserProvider(walletProvider);
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
  }, [isConnected, address, walletProvider]);

  const wtcValueUsd = wtcBalance * (price ?? FALLBACK_PRICE_USD);

  async function handleSwap() {
    setSwapError(null);
    setIsSwapConfirmed(false);

    if (!isConnected || !address || !walletProvider) {
      setSwapError("Connect your wallet first.");
      return;
    }
    if (!usdcAmount || parseFloat(usdcAmount) <= 0) {
      setSwapError("Enter an amount of USDC to swap.");
      return;
    }
    if (parseFloat(usdcAmount) > (usdcBalance)) {
      setSwapError("Insufficient USDC balance.");
      return;
    }

    try {
      setIsSwapping(true);
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const usdc = new Contract(USDC_CONTRACT, USDC_ABI, signer);
      const router = new Contract(UNISWAP_ROUTER, ROUTER_ABI, signer);

      const amountIn = parseUnits(usdcAmount, USDC_DECIMALS);
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
      const fee = 3000;

      // Approve the router to spend USDC
      const approveTx = await usdc.approve(UNISWAP_ROUTER, amountIn);
      await approveTx.wait();

      // Fetch current price from the pool to compute a real minimum output
      const poolAddress = await router.callStatic.exactInputSingle(
        {
          tokenIn: USDC_CONTRACT,
          tokenOut: WTC_CONTRACT,
          fee,
          recipient: address,
          deadline,
          amountIn,
          amountOutMinimum: 0n,
          sqrtPriceLimitX96: 0n,
        }
      );
      const slippageBps = Math.round(slippage * 100);
      const amountOutMinimum = (poolAddress * BigInt(10000 - slippageBps)) / BigInt(10000);

      const tx = await router.exactInputSingle(
        {
          tokenIn: USDC_CONTRACT,
          tokenOut: WTC_CONTRACT,
          fee,
          recipient: address,
          deadline,
          amountIn,
          amountOutMinimum,
          sqrtPriceLimitX96: 0n,
        }
      );
      await tx.wait();
      setIsSwapConfirmed(true);
      setUsdcAmount("");

      const wtc = new Contract(WTC_CONTRACT, WTC_ABI, provider);
      const usdcRefresh = new Contract(USDC_CONTRACT, USDC_ABI, provider);
      const [wtcRaw, usdcRaw] = await Promise.all([
        wtc.balanceOf(address),
        usdcRefresh.balanceOf(address),
      ]);
      setWtcBalance(parseFloat(formatUnits(wtcRaw, WTC_DECIMALS)));
      setUsdcBalance(parseFloat(formatUnits(usdcRaw, USDC_DECIMALS)));
    } catch (err) {
      console.error("Swap failed:", err);
      setSwapError(err?.shortMessage || "Swap failed. Please try again.");
    } finally {
      setIsSwapping(false);
    }
  }

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
            Swap directly on the Polygon network. Connect your wallet, enter an
            amount, and trade peer-to-peer with no middleman.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-black/50 shadow-[0_0_35px_rgba(212,175,55,0.05)]">
          <div className="border-b border-[#D4AF37]/15 px-6 py-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
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
                Connect your wallet to see your balances and swap.
              </p>
            )}

            <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5 text-left">
              <label className="block text-sm text-white/50 mb-2">
                Amount of USDC to swap
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={usdcAmount}
                onChange={(e) => setUsdcAmount(e.target.value)}
                placeholder="0.0"
                className="w-full rounded-xl border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-white placeholder-white/30 focus:border-[#D4AF37]/60 focus:outline-none"
              />
              {isConnected && (
                <button
                  type="button"
                  onClick={() => setUsdcAmount(usdcBalance.toFixed(2))}
                  className="mt-2 text-xs text-[#D4AF37] hover:underline"
                >
                  Max: {usdcBalance.toFixed(2)} USDC
                </button>
              )}

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-white/50">Slippage tolerance</span>
                <div className="flex gap-1">
                  {[0.5, 1, 2, 3].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlippage(s)}
                      className={`rounded-lg px-3 py-1 text-xs transition ${
                        slippage === s
                          ? "bg-[#D4AF37] text-black"
                          : "bg-white/10 text-white/60 hover:bg-white/20"
                      }`}
                    >
                      {s}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {swapError && (
              <p className="mt-4 text-center text-sm text-red-400">{swapError}</p>
            )}

            <button
              type="button"
              onClick={handleSwap}
              disabled={!isConnected || isSwapping}
              className="mt-6 w-full rounded-xl bg-[#D4AF37] px-10 py-4 text-lg font-semibold text-black shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#e8c65a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSwapping
                ? "Swapping…"
                : isSwapConfirmed
                  ? "Swap Complete ✓"
                  : isConnected
                    ? "Swap USDC for WTC"
                    : "Connect Wallet to Swap"}
            </button>
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
