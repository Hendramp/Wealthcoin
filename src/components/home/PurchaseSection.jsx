import React, { useEffect, useState } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Contract, parseUnits, formatUnits } from "ethers";

const WTC_CONTRACT = "0x394b57F4a40ff31530d66f904e1Db2C6516c018F";
const WTC_DECIMALS = 18;
const FALLBACK_PRICE_USD = 0.00401;
const POL_NATIVE = "0x0000000000000000000000000000000000001010";
const UNISWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E5587C3606A6E";

const WTC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
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
  const [polAmount, setPolAmount] = useState("");
  const [swapError, setSwapError] = useState(null);
  const [wtcBalance, setWtcBalance] = useState(0);
  const [polBalance, setPolBalance] = useState(0);
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
        setPolBalance(0);
        return;
      }
      try {
        const provider = new BrowserProvider(walletProvider);
        const wtc = new Contract(WTC_CONTRACT, WTC_ABI, provider);
        const [wtcRaw, polRaw] = await Promise.all([
          wtc.balanceOf(address),
          provider.getBalance(address),
        ]);
        setWtcBalance(parseFloat(formatUnits(wtcRaw, WTC_DECIMALS)));
        setPolBalance(parseFloat(formatUnits(polRaw, WTC_DECIMALS)));
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
    if (!polAmount || parseFloat(polAmount) <= 0) {
      setSwapError("Enter an amount of POL to swap.");
      return;
    }
    if (parseFloat(polAmount) > (polBalance)) {
      setSwapError("Insufficient POL balance.");
      return;
    }

    try {
      setIsSwapping(true);
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const router = new Contract(UNISWAP_ROUTER, ROUTER_ABI, signer);

      const amountIn = parseUnits(polAmount, WTC_DECIMALS)
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
      const fee = 3000;

      // Fetch current price from the pool to compute a real minimum output
      const poolAddress = await router.callStatic.exactInputSingle(
        {
          tokenIn: POL_NATIVE,
          tokenOut: WTC_CONTRACT,
          fee,
          recipient: address,
          deadline,
          amountIn,
          amountOutMinimum: 0n,
          sqrtPriceLimitX96: 0n,
        },
        { value: amountIn }
      );
      const slippageBps = Math.round(slippage * 100);
      const amountOutMinimum = (poolAddress * BigInt(10000 - slippageBps)) / BigInt(10000);

      const tx = await router.exactInputSingle(
        {
          tokenIn: POL_NATIVE,
          tokenOut: WTC_CONTRACT,
          fee,
          recipient: address,
          deadline,
          amountIn,
          amountOutMinimum,
          sqrtPriceLimitX96: 0n,
        },
        { value: amountIn }
      );
      await tx.wait();
      setIsSwapConfirmed(true);
      setPolAmount("");

      const wtc = new Contract(WTC_CONTRACT, WTC_ABI, provider);
      const [wtcRaw, polRaw] = await Promise.all([
        wtc.balanceOf(address),
        provider.getBalance(address),
      ]);
      setWtcBalance(parseFloat(formatUnits(wtcRaw, WTC_DECIMALS)));
      setPolBalance(parseFloat(formatUnits(polRaw, WTC_DECIMALS)));
    } catch (err) {
      console.error("Swap failed:", err);
      setSwapError(err?.shortMessage || "Swap failed. Please try again.");
    } finally {
      setIsSwapping(false);
    }
  }

  return (
    <section id="purchase" className="py-20 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-sm text-[#d4af37] mb-6">
          <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
          Live on Polygon Network
        </div>

        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 mb-8">
          <div className="text-sm uppercase tracking-widest text-white/50 mb-2">
            WTC / USDC
          </div>
          <div className="text-5xl font-bold mb-2">
            {loading
              ? <span className="text-white/30">—</span>
              : price
                ? `$${price.toFixed(6)}`
                : <span className="text-white/30">Price unavailable</span>}
          </div>
          {change24h !== null && (
            <div className={`text-sm ${change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {change24h >= 0 ? "▲" : "▼"} {Math.abs(change24h).toFixed(2)}% 24h
            </div>
          )}
        </div>

        {isConnected ? (
          <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-6 space-y-3 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Your WTC balance</span>
              <span className="font-semibold">
                {wtcBalance.toFixed(4)} WTC
                <span className="text-white/40 ml-2">(≈${wtcValueUsd.toFixed(2)})</span>
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Your POL balance</span>
              <span className="font-semibold">{polBalance.toFixed(4)} POL</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/40 mb-6">
            Connect your wallet to see your balances and swap.
          </p>
        )}

        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-6 text-left">
          <label className="block text-sm text-white/50 mb-2">
            Amount of POL to swap
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={polAmount}
            onChange={(e) => setPolAmount(e.target.value)}
            placeholder="0.0"
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder-white/30 focus:border-[#d4af37]/60 focus:outline-none"
          />
          {isConnected && (
            <button
              type="button"
              onClick={() => setPolAmount(polBalance.toFixed(4))}
              className="mt-2 text-xs text-[#d4af37] hover:underline"
            >
              Max: {polBalance.toFixed(4)} POL
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
                  className={`rounded-lg px-3 py-1 text-xs transition ${slippage === s ? "bg-[#d4af37] text-black" : "bg-white/10 text-white/60 hover:bg-white/20"}`}
                >
                  {s}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {swapError && (
          <p className="text-sm text-red-400 mb-4">{swapError}</p>
        )}

        <button
          type="button"
          onClick={handleSwap}
          disabled={!isConnected || isSwapping}
          className="inline-block rounded-xl bg-[#d4af37] px-10 py-4 text-lg font-semibold text-black shadow-lg shadow-[#d4af37]/20 transition hover:bg-[#e8c65a] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSwapping
            ? "Swapping…"
            : isSwapConfirmed
              ? "Swap Complete ✓"
              : isConnected
                ? "Swap POL for WTC"
                : "Connect Wallet to Swap"}
        </button>
      </div>
    </section>
  );
}
