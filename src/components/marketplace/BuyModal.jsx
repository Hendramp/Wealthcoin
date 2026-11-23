import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";
import { buyListing } from "../../services/escrowBuy";
import {
  getFeeBps,
  getSignerProvider,
  WTC_ADDRESS,
} from "../../services/escrow";
import { supabase } from "../../lib/supabase";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
];

export default function BuyModal({ listing, priceInWTC, wtcPrice, onClose }) {
  const { address, isConnected } = useAppKitAccount();
  const [balance, setBalance] = useState(null);
  const [feeBps, setFeeBps] = useState(null);
  const [step, setStep] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        if (window.ethereum && address) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const wtc = new ethers.Contract(WTC_ADDRESS, ERC20_ABI, provider);
          const value = await wtc.balanceOf(address);
          if (active) setBalance(value);
        }
        const bps = await getFeeBps();
        if (active) setFeeBps(bps);
      } catch (err) {
        if (active) setError(err.message);
      }
    }
    load();
    return () => { active = false; };
  }, [address]);

  const priceBig = priceInWTC ? BigInt(priceInWTC) : 0n;
  const balanceShortfall = balance !== null && balance < priceBig ? priceBig - balance : 0n;
  const busy = step !== "idle";
  const priceText = priceBig ? ethers.formatUnits(priceBig, 18) : "0";
  const balanceText = balance === null ? "Loading…" : ethers.formatUnits(balance, 18);

  async function handleBuy() {
    setError("");
    if (!isConnected || !address) {
      setError("Connect your wallet to continue");
      return;
    }
    if (balance !== null && balance < priceBig) return;
    if (!listing?.seller_wallet) {
      setError("Seller has not set a payout wallet");
      return;
    }
    try {
      setStep("creating escrow");
      const signer = await getSignerProvider().getSigner();
      setStep("creating escrow");
      const purchase = await buyListing({
        listing: { ...listing, priceInWTC: priceBig.toString() },
        signer,
        onStep: setStep,
        wtcPrice,
      });
      setResult(purchase);
      setStep("idle");

      const { error: writeError } = await supabase
        .from("marketplace_listings")
        .update({
          escrow_address: purchase.escrowAddress,
          buyer_address: address,
          tx_hash: purchase.txHash,
          sold_at: new Date().toISOString(),
        })
        .eq("id", listing.id);
      if (writeError) console.error("Could not sync escrow purchase:", writeError);
    } catch (err) {
      setStep("idle");
      setError(err?.message || "Transaction failed");
    }
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[92svh] w-full overflow-y-auto rounded-t-2xl border border-[#D4AF37]/25 bg-[#07110d] p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl sm:p-6">
        {result ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Purchase funded</p>
            <h2 className="mt-2 font-display text-xl font-bold">{listing.title}</h2>
            <p className="mt-4 text-sm text-white/60">Escrow: <span className="break-all font-mono text-[#D4AF37]">{result.escrowAddress}</span></p>
            <a className="mt-3 inline-block min-h-[44px] py-3 text-sm font-bold text-emerald-400" target="_blank" rel="noreferrer" href={`https://polygonscan.com/tx/${result.txHash}`}>View transaction on Polygonscan</a>
            <button type="button" onClick={() => { window.location.href = "/orders"; }} className="mt-4 min-h-[48px] w-full rounded-xl bg-gradient-to-br from-[#F0D878] to-[#B8860B] font-bold text-black">View my purchases</button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Confirm purchase</p>
                <h2 className="mt-2 font-display text-xl font-bold">{listing.title}</h2>
              </div>
              <button type="button" onClick={onClose} disabled={busy} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-xl text-white/60">×</button>
            </div>

            <div className="mt-5 space-y-3 rounded-xl border border-white/10 bg-black/30 p-4 text-sm">
              <div className="flex justify-between gap-3"><span className="text-white/50">USD price</span><span>${Number(listing.price_usd).toFixed(2)}</span></div>
              <div className="flex justify-between gap-3"><span className="text-white/50">WTC amount</span><span className="font-mono font-bold text-[#D4AF37]">{priceText} WTC</span></div>
              <div className="flex justify-between gap-3"><span className="text-white/50">WTC/USD rate</span><span className="font-mono">${wtcPrice ? wtcPrice.toFixed(6) : "Unavailable"}</span></div>
              <div className="flex justify-between gap-3"><span className="text-white/50">Contract fee</span><span>{feeBps !== null ? `${(Number(feeBps) / 100).toFixed(2)}%` : "Loading…"}</span></div>
              <div className="flex justify-between gap-3 border-t border-white/10 pt-3"><span className="font-bold">Total</span><span className="font-mono font-bold">{priceText} WTC</span></div>
              <div className="flex justify-between gap-3"><span className="text-white/50">Your balance</span><span className="font-mono">{balanceText} WTC</span></div>
            </div>

            {balanceShortfall > 0n && (
              <p className="mt-3 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
                Shortfall: {ethers.formatUnits(balanceShortfall, 18)} WTC
              </p>
            )}

            <p className="mt-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-3 text-xs leading-5 text-white/70">
              This requires <strong>three wallet confirmations</strong> and gas on each: create escrow, approve WTC, then fund escrow.
            </p>

            {busy && (
              <div className="mt-4 flex items-center gap-3 text-sm text-[#D4AF37]">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" />
                <span>
                  {step === "creating escrow"
                    ? "Step 1 of 3 — Creating escrow…"
                    : step === "approving"
                      ? "Step 2 of 3 — Approving WTC…"
                      : "Step 3 of 3 — Funding escrow…"}
                </span>
              </div>
            )}
            {error && <p className="mt-3 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">{error}</p>}

            <button type="button" onClick={handleBuy} disabled={busy || balanceShortfall > 0n} className="mt-5 min-h-[48px] w-full rounded-xl bg-gradient-to-br from-[#F0D878] to-[#B8860B] font-bold text-black disabled:cursor-not-allowed disabled:opacity-50">
              {busy ? "Waiting for wallet…" : "Confirm purchase"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
