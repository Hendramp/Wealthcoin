import React, { useEffect, useMemo, useState } from "react";
import { BrowserProvider, formatEther } from "ethers";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
} from "@reown/appkit/react";

const WTC_PER_POL = 1500;
const POLYGON_CHAIN_ID = 137;

function shortenAddress(address) {
  if (!address) return "Not connected";
  return `${address.slice(0, 7)}...${address.slice(-5)}`;
}

export default function EarlyAccessSection() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { chainId, switchNetwork } = useAppKitNetwork();
  const { walletProvider } = useAppKitProvider("eip155");

  const [polAmount, setPolAmount] = useState("");
  const [polBalance, setPolBalance] = useState("0");
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState("");

  const isPolygon = Number(chainId) === POLYGON_CHAIN_ID;

  const estimatedWtc = useMemo(() => {
    const amount = Number(polAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return 0;
    }

    return amount * WTC_PER_POL;
  }, [polAmount]);

  useEffect(() => {
    async function loadBalance() {
      if (!isConnected || !address || !walletProvider) {
        setPolBalance("0");
        setBalanceError("");
        return;
      }

      setBalanceLoading(true);
      setBalanceError("");

      try {
        const provider = new BrowserProvider(walletProvider);
        const balance = await provider.getBalance(address);
        const formatted = Number(formatEther(balance));

        setPolBalance(
          formatted.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          })
        );
      } catch (error) {
        console.error("Could not read POL balance:", error);
        setBalanceError("Unable to read wallet balance.");
      } finally {
        setBalanceLoading(false);
      }
    }

    loadBalance();
  }, [address, isConnected, walletProvider, chainId]);

  function openWallet() {
    open({
      view: isConnected ? "Account" : "Connect",
    });
  }

  async function handleSwitchNetwork() {
    try {
      await switchNetwork({
        id: POLYGON_CHAIN_ID,
        name: "Polygon",
        nativeCurrency: {
          name: "POL",
          symbol: "POL",
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ["https://polygon-rpc.com"],
          },
        },
        blockExplorers: {
          default: {
            name: "PolygonScan",
            url: "https://polygonscan.com",
          },
        },
      });
    } catch (error) {
      console.error("Polygon switch failed:", error);
    }
  }

  function handlePurchase() {
    alert(
      "Purchases remain disabled until the contract, treasury, rate, allocation, and complete test transaction are verified."
    );
  }

  return (
    <section
      id="early-access"
      className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#020403] px-6 py-24 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.10),transparent_35%),radial-gradient(circle_at_50%_75%,rgba(28,90,48,0.18),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-display text-sm uppercase tracking-[0.4em] text-[#D4AF37]">
            WealthCoin Early Access
          </p>

          <h2 className="gold-text mt-5 font-display text-4xl font-bold sm:text-5xl md:text-6xl">
            Begin Your Journey
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Connect securely, confirm the Polygon network, review your POL
            balance, and calculate the estimated WTC before participation opens.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-black/55 p-6 shadow-[0_0_45px_rgba(212,175,55,0.08)] sm:p-8">
            <div className="flex flex-col gap-4 border-b border-[#D4AF37]/15 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                  Current Offering
                </p>

                <h3 className="mt-2 font-display text-2xl text-[#D4AF37]">
                  Early Access Phase
                </h3>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/25 px-4 py-2 text-sm text-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Preparing for Launch
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Connected Wallet
                </p>

                <p className="mt-2 break-all font-mono text-sm text-white/75">
                  {shortenAddress(address)}
                </p>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Network
                </p>

                <p
                  className={`mt-2 font-semibold ${
                    isConnected && isPolygon
                      ? "text-green-300"
                      : "text-amber-200"
                  }`}
                >
                  {!isConnected
                    ? "Connect wallet"
                    : isPolygon
                      ? "Polygon Mainnet"
                      : `Wrong network (${chainId || "unknown"})`}
                </p>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Available POL Balance
                </p>

                <p className="mt-2 font-display text-2xl text-[#D4AF37]">
                  {balanceLoading ? "Loading…" : `${polBalance} POL`}
                </p>

                {balanceError && (
                  <p className="mt-2 text-sm text-red-300">
                    {balanceError}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                Early Access Rate
              </p>

              <p className="mt-2 font-display text-2xl text-[#D4AF37]">
                1 POL = {WTC_PER_POL.toLocaleString()} WTC
              </p>

              <p className="mt-2 text-sm leading-6 text-white/45">
                This rate remains a planned interface value until the final
                contract configuration is verified.
              </p>
            </div>

            <div className="mt-7">
              <label
                htmlFor="polAmount"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60"
              >
                Amount in POL
              </label>

              <div className="mt-3 flex items-center rounded-2xl border border-[#D4AF37]/30 bg-black/60 px-5">
                <input
                  id="polAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={polAmount}
                  onChange={(event) => setPolAmount(event.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent py-5 text-2xl text-white outline-none placeholder:text-white/20"
                />

                <span className="font-display text-lg text-[#D4AF37]">
                  POL
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                Estimated WealthCoin
              </p>

              <p className="mt-2 break-words font-display text-3xl text-[#D4AF37]">
                {estimatedWtc.toLocaleString()} WTC
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={openWallet}
                className="btn-ghost rounded-xl px-6 py-4 font-bold"
              >
                {isConnected ? "Manage Wallet" : "Connect Wallet"}
              </button>

              {isConnected && !isPolygon ? (
                <button
                  type="button"
                  onClick={handleSwitchNetwork}
                  className="btn-gold rounded-xl px-6 py-4 font-bold"
                >
                  Switch to Polygon
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={
                    !isConnected ||
                    !isPolygon ||
                    !polAmount ||
                    Number(polAmount) <= 0
                  }
                  className="btn-gold rounded-xl px-6 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Purchase Coming Soon
                </button>
              )}
            </div>

            <p className="mt-5 text-center text-sm leading-6 text-white/40">
              Purchases are intentionally disabled until the full transaction
              flow has passed end-to-end testing.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-6">
              <p className="font-display text-xl text-[#D4AF37]">
                Built on Polygon
              </p>

              <p className="mt-3 leading-7 text-white/60">
                Early Access is planned to use POL on Polygon Mainnet for
                efficient settlement and low network fees.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-6">
              <p className="font-display text-xl text-[#D4AF37]">
                Direct Wallet Delivery
              </p>

              <p className="mt-3 leading-7 text-white/60">
                The final contract is intended to distribute WTC directly to
                the connected wallet under the verified phase rules.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-6">
              <p className="font-display text-xl text-[#D4AF37]">
                Contract Transparency
              </p>

              <p className="mt-3 leading-7 text-white/60">
                Verified token, Early Access, treasury, and distribution
                addresses will be displayed before participation opens.
              </p>

              <div className="mt-5 rounded-xl border border-[#D4AF37]/15 bg-black/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                  Early Access Contract
                </p>

                <p className="mt-2 break-all font-mono text-sm text-white/60">
                  Awaiting final verified deployment
                </p>
              </div>
            </div>

            <a
              href="/documents/Wallet_Guide_EN.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost w-full rounded-xl px-6 py-4 text-center font-bold"
            >
              Open Wallet Guide
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}