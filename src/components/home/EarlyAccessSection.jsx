import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BrowserProvider,
  Contract,
  formatEther,
  parseEther,
} from "ethers";

import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
} from "@reown/appkit/react";

import GenesisArtifact from "../../abi/WealthCoinGenesis.json";
import { CONTRACTS } from "../../config/contracts";

const WTC_PER_POL = 350;
const MINIMUM_PURCHASE_POL = 1;
const POLYGON_CHAIN_ID = 137;

function shortenAddress(address) {
  if (!address) {
    return "Not connected";
  }

  return `${address.slice(0, 7)}...${address.slice(-5)}`;
}

function getReadableError(error) {
  const message =
    error?.shortMessage ||
    error?.reason ||
    error?.info?.error?.message ||
    error?.message ||
    "The transaction could not be completed.";

  if (
    error?.code === 4001 ||
    error?.code === "ACTION_REJECTED"
  ) {
    return "The transaction was cancelled in your wallet.";
  }

  if (message.includes("BelowMinimumPurchase")) {
    return "The minimum Early Access purchase is 1 POL.";
  }

  if (
    message.includes("SaleNotOpen") ||
    message.includes("EnforcedPause")
  ) {
    return "Early Access is currently paused or closed.";
  }

  if (message.includes("WalletCapExceeded")) {
    return "This purchase would exceed the wallet contribution limit.";
  }

  if (message.includes("AllocationExceeded")) {
    return "The requested amount exceeds the remaining WTC allocation.";
  }

  if (message.toLowerCase().includes("insufficient funds")) {
    return "Your wallet does not have enough POL for the purchase and network fee.";
  }

  return message;
}

export default function EarlyAccessSection() {
  const { open } = useAppKit();

  const {
    address,
    isConnected,
  } = useAppKitAccount();

  const {
    chainId,
    switchNetwork,
  } = useAppKitNetwork();

  const {
    walletProvider,
  } = useAppKitProvider("eip155");

  const [polAmount, setPolAmount] = useState("");

  const [polBalance, setPolBalance] =
    useState("0");

  const [balanceLoading, setBalanceLoading] =
    useState(false);

  const [balanceError, setBalanceError] =
    useState("");

  const [saleOpen, setSaleOpen] =
    useState(false);

  const [saleLoading, setSaleLoading] =
    useState(false);

  const [saleError, setSaleError] =
    useState("");

  const [isPurchasing, setIsPurchasing] =
    useState(false);

  const [purchaseError, setPurchaseError] =
    useState("");

  const [purchaseSuccess, setPurchaseSuccess] =
    useState("");

  const [transactionHash, setTransactionHash] =
    useState("");

  const [copiedLabel, setCopiedLabel] =
    useState("");

  const isPolygon =
    Number(chainId) === POLYGON_CHAIN_ID;

  const numericPolAmount =
    Number(polAmount);

  const estimatedWtc = useMemo(() => {
    if (
      !Number.isFinite(numericPolAmount) ||
      numericPolAmount <= 0
    ) {
      return 0;
    }

    return numericPolAmount * WTC_PER_POL;
  }, [numericPolAmount]);

  const loadBalance = useCallback(async () => {
    if (
      !isConnected ||
      !address ||
      !walletProvider
    ) {
      setPolBalance("0");
      setBalanceError("");
      return;
    }

    setBalanceLoading(true);
    setBalanceError("");

    try {
      const provider =
        new BrowserProvider(walletProvider);

      const balance =
        await provider.getBalance(address);

      const formatted =
        Number(formatEther(balance));

      setPolBalance(
        formatted.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })
      );
    } catch (error) {
      console.error(
        "Could not read POL balance:",
        error
      );

      setBalanceError(
        "Unable to read the wallet POL balance."
      );
    } finally {
      setBalanceLoading(false);
    }
  }, [
    address,
    isConnected,
    walletProvider,
  ]);

  const loadSaleStatus =
    useCallback(async () => {
      if (
        !isConnected ||
        !walletProvider ||
        !isPolygon
      ) {
        setSaleOpen(false);
        setSaleLoading(false);
        setSaleError("");
        return;
      }

      setSaleLoading(true);
      setSaleError("");

      try {
        const provider =
          new BrowserProvider(walletProvider);

        const genesis =
          new Contract(
            CONTRACTS.genesis,
            GenesisArtifact.abi,
            provider
          );

        const [
          openStatus,
          pausedStatus,
          finalizedStatus,
        ] = await Promise.all([
          genesis.saleOpen(),
          genesis.paused(),
          genesis.saleFinalized(),
        ]);

        setSaleOpen(
          Boolean(openStatus) &&
          !Boolean(pausedStatus) &&
          !Boolean(finalizedStatus)
        );
      } catch (error) {
        console.error(
          "Could not read Genesis status:",
          error
        );

        setSaleOpen(false);

        setSaleError(
          "Unable to read the verified Genesis contract status."
        );
      } finally {
        setSaleLoading(false);
      }
    }, [
      isConnected,
      isPolygon,
      walletProvider,
    ]);

  useEffect(() => {
    loadBalance();
  }, [
    loadBalance,
    chainId,
  ]);

  useEffect(() => {
    loadSaleStatus();
  }, [loadSaleStatus]);

  function openWallet() {
    open({
      view: isConnected
        ? "Account"
        : "Connect",
    });
  }

  async function handleSwitchNetwork() {
    setPurchaseError("");

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
            http: [
              "https://polygon-rpc.com",
            ],
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
      console.error(
        "Polygon network switch failed:",
        error
      );

      setPurchaseError(
        getReadableError(error)
      );
    }
  }

  async function copyAddress(
    value,
    label
  ) {
    try {
      await navigator.clipboard.writeText(
        value
      );

      setCopiedLabel(label);

      window.setTimeout(() => {
        setCopiedLabel("");
      }, 2500);
    } catch (error) {
      console.error(
        "Could not copy address:",
        error
      );

      setPurchaseError(
        "Unable to copy the contract address."
      );
    }
  }

  async function handlePurchase() {
    setPurchaseError("");
    setPurchaseSuccess("");
    setTransactionHash("");

    if (!isConnected || !address) {
      setPurchaseError(
        "Connect your wallet before purchasing."
      );
      return;
    }

    if (!isPolygon) {
      setPurchaseError(
        "Switch your wallet to Polygon Mainnet."
      );
      return;
    }

    if (!walletProvider) {
      setPurchaseError(
        "The connected wallet provider is unavailable."
      );
      return;
    }

    if (
      !Number.isFinite(
        numericPolAmount
      ) ||
      numericPolAmount <
        MINIMUM_PURCHASE_POL
    ) {
      setPurchaseError(
        "The minimum Early Access purchase is 1 POL."
      );
      return;
    }

    if (!saleOpen) {
      setPurchaseError(
        "Early Access is currently paused or closed."
      );
      return;
    }

    setIsPurchasing(true);

    try {
      const provider =
        new BrowserProvider(walletProvider);

      const signer =
        await provider.getSigner();

      const signerAddress =
        await signer.getAddress();

      if (
        signerAddress.toLowerCase() !==
        address.toLowerCase()
      ) {
        throw new Error(
          "The active wallet account changed. Reconnect and try again."
        );
      }

      const network =
        await provider.getNetwork();

      if (
        Number(network.chainId) !==
        POLYGON_CHAIN_ID
      ) {
        throw new Error(
          "Your wallet is not connected to Polygon Mainnet."
        );
      }

      const genesis =
        new Contract(
          CONTRACTS.genesis,
          GenesisArtifact.abi,
          signer
        );

      const [
        openStatus,
        pausedStatus,
        finalizedStatus,
      ] = await Promise.all([
        genesis.saleOpen(),
        genesis.paused(),
        genesis.saleFinalized(),
      ]);

      if (
        !openStatus ||
        pausedStatus ||
        finalizedStatus
      ) {
        throw new Error(
          "Early Access is currently paused or closed."
        );
      }

      const purchaseValue =
        parseEther(polAmount);

      const transaction =
        await genesis.buyTokens({
          value: purchaseValue,
        });

      setTransactionHash(
        transaction.hash
      );

      setPurchaseSuccess(
        "Transaction submitted. Waiting for Polygon confirmation..."
      );

      await transaction.wait();

      setPurchaseSuccess(
        `Purchase confirmed. Approximately ${estimatedWtc.toLocaleString()} WTC was delivered to your wallet.`
      );

      setPolAmount("");

      await Promise.all([
        loadBalance(),
        loadSaleStatus(),
      ]);
    } catch (error) {
      console.error(
        "WTC purchase failed:",
        error
      );

      setPurchaseSuccess("");

      setPurchaseError(
        getReadableError(error)
      );
    } finally {
      setIsPurchasing(false);
    }
  }

  const purchaseDisabled =
    !isConnected ||
    !isPolygon ||
    !saleOpen ||
    saleLoading ||
    isPurchasing ||
    !polAmount ||
    !Number.isFinite(
      numericPolAmount
    ) ||
    numericPolAmount <
      MINIMUM_PURCHASE_POL;

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
            Connect securely, confirm
            Polygon Mainnet, review your POL
            balance, and purchase WTC through
            the verified Genesis contract.
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

              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm ${
                  saleOpen
                    ? "border-green-500/30 bg-green-950/25 text-green-200"
                    : "border-amber-500/30 bg-amber-950/25 text-amber-200"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    saleOpen
                      ? "bg-green-400"
                      : "bg-amber-400"
                  }`}
                />

                {!isConnected
                  ? "Connect to Check"
                  : saleLoading
                    ? "Checking Genesis"
                    : saleOpen
                      ? "Early Access Live"
                      : "Purchases Paused"}
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
                    isConnected &&
                    isPolygon
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
                  {balanceLoading
                    ? "Loading..."
                    : `${polBalance} POL`}
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
                1 POL ={" "}
                {WTC_PER_POL.toLocaleString()}{" "}
                WTC
              </p>

              <p className="mt-2 text-sm leading-6 text-white/45">
                Minimum purchase: 1 POL.
                WTC is delivered directly to
                the connected wallet after
                confirmation.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-[#D4AF37]/20 bg-black/45 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
                Verified Polygon Contracts
              </p>

              <div className="mt-5 rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  WealthCoin Token Contract
                </p>

                <p className="mt-2 break-all font-mono text-sm text-white/75">
                  {CONTRACTS.token}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      copyAddress(
                        CONTRACTS.token,
                        "WTC token address copied."
                      )
                    }
                    className="btn-ghost rounded-lg px-4 py-2 text-sm font-bold"
                  >
                    Copy WTC Address
                  </button>

                  <a
                    href={`https://polygonscan.com/token/${CONTRACTS.token}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost rounded-lg px-4 py-2 text-sm font-bold"
                  >
                    View WTC
                  </a>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Genesis Early Access Contract
                </p>

                <p className="mt-2 break-all font-mono text-sm text-white/75">
                  {CONTRACTS.genesis}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      copyAddress(
                        CONTRACTS.genesis,
                        "Genesis address copied."
                      )
                    }
                    className="btn-ghost rounded-lg px-4 py-2 text-sm font-bold"
                  >
                    Copy Genesis Address
                  </button>

                  <a
                    href={`https://polygonscan.com/address/${CONTRACTS.genesis}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost rounded-lg px-4 py-2 text-sm font-bold"
                  >
                    View Genesis
                  </a>
                </div>
              </div>

              {copiedLabel && (
                <p className="mt-4 text-sm text-green-300">
                  {copiedLabel}
                </p>
              )}

              <p className="mt-4 text-xs leading-5 text-white/40">
                Always verify both contract
                addresses before approving a
                transaction.
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
                  min="1"
                  step="0.01"
                  value={polAmount}
                  disabled={isPurchasing}
                  onChange={(event) => {
                    setPolAmount(
                      event.target.value
                    );

                    setPurchaseError("");
                    setPurchaseSuccess("");
                    setTransactionHash("");
                  }}
                  placeholder="1.00"
                  className="w-full bg-transparent py-5 text-2xl text-white outline-none placeholder:text-white/20 disabled:opacity-50"
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
                {estimatedWtc.toLocaleString()}{" "}
                WTC
              </p>
            </div>

            {saleError && (
              <p className="mt-5 rounded-xl border border-red-500/25 bg-red-950/20 p-4 text-sm text-red-200">
                {saleError}
              </p>
            )}

            {purchaseError && (
              <p className="mt-5 rounded-xl border border-red-500/25 bg-red-950/20 p-4 text-sm text-red-200">
                {purchaseError}
              </p>
            )}

            {purchaseSuccess && (
              <div className="mt-5 rounded-xl border border-green-500/25 bg-green-950/20 p-4 text-sm text-green-200">
                <p>{purchaseSuccess}</p>

                {transactionHash && (
                  <a
                    href={`https://polygonscan.com/tx/${transactionHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block font-semibold text-[#D4AF37] underline"
                  >
                    View transaction on
                    PolygonScan
                  </a>
                )}
              </div>
            )}

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={openWallet}
                className="btn-ghost rounded-xl px-6 py-4 font-bold"
              >
                {isConnected
                  ? "Manage Wallet"
                  : "Connect Wallet"}
              </button>

              {isConnected &&
              !isPolygon ? (
                <button
                  type="button"
                  onClick={
                    handleSwitchNetwork
                  }
                  className="btn-gold rounded-xl px-6 py-4 font-bold"
                >
                  Switch to Polygon
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={
                    purchaseDisabled
                  }
                  className="btn-gold rounded-xl px-6 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isPurchasing
                    ? "Confirming Purchase..."
                    : saleOpen
                      ? "Purchase WTC"
                      : "Purchases Paused"}
                </button>
              )}
            </div>

            <p className="mt-5 text-center text-sm leading-6 text-white/40">
              Cryptocurrency transactions are
              irreversible. Confirm the network,
              amount, and verified contract before
              approving.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-6">
              <p className="font-display text-xl text-[#D4AF37]">
                Built on Polygon
              </p>

              <p className="mt-3 leading-7 text-white/60">
                Early Access uses POL on Polygon
                Mainnet for settlement and network
                fees.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-6">
              <p className="font-display text-xl text-[#D4AF37]">
                Direct Wallet Delivery
              </p>

              <p className="mt-3 leading-7 text-white/60">
                The verified Genesis contract
                delivers WTC directly to the
                purchasing wallet in the confirmed
                transaction.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-6">
              <p className="font-display text-xl text-[#D4AF37]">
                Contract Transparency
              </p>

              <p className="mt-3 leading-7 text-white/60">
                Both the WealthCoin token and
                Genesis Early Access contracts are
                publicly inspectable on
                PolygonScan.
              </p>

              <a
                href={`https://polygonscan.com/address/${CONTRACTS.genesis}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block break-all rounded-xl border border-[#D4AF37]/15 bg-black/60 p-4 font-mono text-sm text-[#D4AF37] underline"
              >
                {CONTRACTS.genesis}
              </a>
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