import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";
import Navbar from "../components/layout/Navbar";
import { supabase } from "../lib/supabase";
import {
  getSalesByBuyer,
  getSalesBySeller,
  getEscrowSummary,
  deliverEscrow,
  confirmDelivery,
  claimAfterWindow,
  claimAfterNoDelivery,
  raiseDispute,
  resolveEscrow,
} from "../services/escrow";

function formatDate(seconds) {
  if (!seconds || Number(seconds) <= 0) return "Not scheduled";
  return new Date(Number(seconds) * 1000).toLocaleString();
}

export default function OrdersPage() {
  const { address, isConnected } = useAppKitAccount();
  const [tab, setTab] = useState("purchases");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState("");
  const [error, setError] = useState("");
  const [disputeReason, setDisputeReason] = useState({});

  async function loadRows() {
    if (!isConnected || !address) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const sales = tab === "purchases"
        ? await getSalesByBuyer(address)
        : await getSalesBySeller(address);
      const escrowAddresses = sales.map((sale) => sale.escrow);
      let listings = [];
      if (escrowAddresses.length) {
        const { data } = await supabase
          .from("marketplace_listings")
          .select("*")
          .in("escrow_address", escrowAddresses);
        listings = data || [];
      }
      const enriched = await Promise.all(sales.map(async (sale) => {
        try {
          const summary = await getEscrowSummary(sale.escrow);
          const listing = listings.find((row) => row.escrow_address?.toLowerCase() === sale.escrow.toLowerCase());
          return { ...sale, summary, listing };
        } catch (err) {
          return { ...sale, summaryError: err.message, listing: listings.find((row) => row.escrow_address?.toLowerCase() === sale.escrow.toLowerCase()) };
        }
      }));
      setRows(enriched);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRows();
  }, [tab, address, isConnected]);

  async function runAction(row, name, action) {
    setPending(`${row.escrow}:${name}`);
    setError("");
    try {
      if (!window.ethereum) throw new Error("Connect your wallet to continue");
      const signer = await new ethers.BrowserProvider(window.ethereum).getSigner();
      await action(signer);
      const chainState = await getEscrowSummary(row.escrow);
      if (row.listing?.id) {
        const { error: writeError } = await supabase
          .from("marketplace_listings")
          .update({ status_chain: chainState.state })
          .eq("id", row.listing.id);
        if (writeError) console.error("Could not sync escrow state:", writeError);
      }
      await loadRows();
    } catch (err) {
      setError(err.message);
    } finally {
      setPending("");
    }
  }

  function renderActions(row) {
    if (!row.summary) return null;
    const summary = row.summary;
    const now = Math.floor(Date.now() / 1000);
    const buyer = address && summary.buyer?.toLowerCase() === address.toLowerCase();
    const seller = address && summary.seller?.toLowerCase() === address.toLowerCase();
    const resolver = address && summary.resolver?.toLowerCase() === address.toLowerCase();
    const deliveredAt = Number(summary.deliveredAt);
    const deliveryDeadline = deliveredAt + Number(summary.deliveryWindow);
    const refundDeadline = Number(summary.paymentDeadline) + Number(summary.deliveryWindow);
    const key = row.escrow;

    const button = (name, label, action) => (
      <button
        type="button"
        disabled={Boolean(pending)}
        onClick={() => runAction(row, name, action)}
        className="min-h-[44px] rounded-lg border border-[#D4AF37]/30 px-3 py-2 text-sm font-bold text-[#D4AF37] disabled:opacity-50"
      >
        {pending === `${key}:${name}` ? `${label}…` : label}
      </button>
    );

    return (
      <div className="flex flex-col gap-2">
        {seller && summary.state === "Paid" && button("deliver", row.listing?.delivery_method === "digital" ? "Mark as delivered" : "Mark as shipped", (signer) => deliverEscrow(row.escrow, signer))}
        {buyer && summary.state === "Delivered" && button("confirm", "Confirm receipt", (signer) => confirmDelivery(row.escrow, signer))}
        {seller && summary.state === "Delivered" && (
          <>
            {now >= deliveryDeadline
              ? button("claim-window", "Claim after window", (signer) => claimAfterWindow(row.escrow, signer))
              : <button type="button" disabled className="min-h-[44px] rounded-lg border border-white/10 px-3 py-2 text-sm text-white/40">Claim after window</button>}
            {now < deliveryDeadline && <span className="text-xs text-white/40">Available {formatDate(deliveryDeadline)}</span>}
          </>
        )}
        {buyer && summary.state === "Paid" && (
          <>
            {now >= refundDeadline
              ? button("claim-refund", "Claim refund", (signer) => claimAfterNoDelivery(row.escrow, signer))
              : <button type="button" disabled className="min-h-[44px] rounded-lg border border-white/10 px-3 py-2 text-sm text-white/40">Claim refund</button>}
            {now < refundDeadline && <span className="text-xs text-white/40">Available {formatDate(refundDeadline)}</span>}
          </>
        )}
        {(buyer || seller) && (summary.state === "Paid" || summary.state === "Delivered") && (
          <div className="flex flex-col gap-2">
            <input
              value={disputeReason[key] || ""}
              onChange={(event) => setDisputeReason((prev) => ({ ...prev, [key]: event.target.value }))}
              placeholder="Dispute reason"
              className="min-h-[44px] rounded-lg border border-white/10 bg-black/40 px-3 text-sm"
            />
            {button("dispute", "Open dispute", async (signer) => {
              await raiseDispute(row.escrow, signer);
              const reason = disputeReason[key]?.trim();
              if (reason) {
                await supabase.from("escrow_disputes").insert({
                  escrow_address: row.escrow,
                  reason,
                  raised_by: address,
                }).then(({ error: writeError }) => {
                  if (writeError) console.error("Could not store dispute reason:", writeError);
                });
              }
            })}
          </div>
        )}
        {resolver && summary.state === "Disputed" && (
          <div className="flex gap-2">
            {button("resolve-seller", "Resolve to seller", (signer) => resolveEscrow(row.escrow, true, signer))}
            {button("resolve-buyer", "Resolve to buyer", (signer) => resolveEscrow(row.escrow, false, signer))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07110d] text-white">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36">
        <h1 className="font-display text-3xl font-bold">Orders</h1>
        <div className="mt-6 flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {[
            ["purchases", "Purchases"],
            ["sales", "Sales"],
          ].map(([value, label]) => (
            <button key={value} type="button" onClick={() => setTab(value)} className={`min-h-[44px] flex-1 rounded-lg text-sm font-bold ${tab === value ? "bg-[#D4AF37] text-black" : "text-white/60"}`}>{label}</button>
          ))}
        </div>
        {error && <p className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">{error}</p>}
        {loading ? (
          <p className="py-16 text-center text-white/40">Loading orders…</p>
        ) : rows.length === 0 ? (
          <p className="py-16 text-center text-white/40">{tab === "purchases" ? "You haven't bought anything yet" : "You haven't sold anything yet."}</p>
        ) : (
          <div className="mt-5 grid gap-4">
            {rows.map((row) => (
              <article key={row.escrow} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <h2 className="truncate font-display text-lg font-bold">{row.listing?.title || row.escrow}</h2>
                  <p className="mt-1 break-all font-mono text-xs text-white/40">{row.escrow}</p>
                  <p className="mt-2 text-sm"><span className="text-white/40">Price:</span> <span className="font-mono font-bold text-[#D4AF37]">{ethers.formatUnits(row.summary?.priceInWTC || row.priceInWTC, 18)} WTC</span></p>
                  <p className="mt-1 text-sm"><span className="text-white/40">State:</span> {row.summary?.state || "syncing"}</p>
                  {row.summaryError && <p className="mt-1 text-xs text-amber-300">syncing chain state…</p>}
                </div>
                <div className="mt-4 min-w-[220px] sm:mt-0">{row.summary ? renderActions(row) : null}</div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
