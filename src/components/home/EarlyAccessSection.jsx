import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  formatEther,
  formatUnits,
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

const MINIMUM_PURCHASE_POL = 1;
const POLYGON_CHAIN_ID = 137;
const STAGE_COUNT = 10;
function isIosSafariBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent;

  const isIos =
    /iPhone|iPad|iPod/i.test(userAgent);

  const isSafari =
    /Safari/i.test(userAgent) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(
      userAgent
    );

  return isIos && isSafari;
}
const PUBLIC_POLYGON_RPC =
  "https://polygon.drpc.org";

const publicPolygonProvider =
  new JsonRpcProvider(
    PUBLIC_POLYGON_RPC,
    POLYGON_CHAIN_ID,
    {
      staticNetwork: true,
    }
  );
function shortenAddress(address) {
  if (!address) {
    return "Not connected";
  }

  return `${address.slice(0, 7)}...${address.slice(-5)}`;
}

function formatWtc(value, maximumFractionDigits = 4) {
  const numericValue = Number(value || 0);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return numericValue.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });
}

function formatCountdown(secondsRemaining) {
  if (
    !Number.isFinite(secondsRemaining) ||
    secondsRemaining <= 0
  ) {
    return "Stage ending";
  }

  const days = Math.floor(
    secondsRemaining / 86400
  );

  const hours = Math.floor(
    (secondsRemaining % 86400) / 3600
  );

  const minutes = Math.floor(
    (secondsRemaining % 3600) / 60
  );

  const seconds = Math.floor(
    secondsRemaining % 60
  );

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  return `${hours}h ${minutes}m ${seconds}s`;
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
    return "Genesis Early Access is currently paused or closed.";
  }

  if (message.includes("WalletCapExceeded")) {
    return "This purchase would exceed the wallet contribution limit.";
  }

  if (
    message.includes("NothingAvailableForPurchase")
  ) {
    return "The current Genesis stage has no WTC remaining.";
  }

  if (
    message.includes("InsufficientGenesisFunding")
  ) {
    return "The Genesis contract is not fully funded.";
  }

  if (
    message
      .toLowerCase()
      .includes("insufficient funds")
  ) {
    return "Your wallet does not have enough POL for the purchase and network fee.";
  }

  if (
    message.includes("could not coalesce error") ||
    error?.code === "UNKNOWN_ERROR"
  ) {
    const nestedMessage =
      error?.error?.message ||
      error?.info?.error?.message ||
      error?.payload?.error?.message;

    if (nestedMessage) {
      return nestedMessage;
    }

    return "The mobile wallet did not return a valid transaction response. Open WealthCoin inside your wallet's built-in browser, reconnect, and try again.";
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

  const [polAmount, setPolAmount] =
    useState("");

  const [polBalance, setPolBalance] =
    useState("0");

  const [balanceLoading, setBalanceLoading] =
    useState(false);

  const [balanceError, setBalanceError] =
    useState("");

  const [saleOpen, setSaleOpen] =
    useState(false);

  const [hasOpened, setHasOpened] =
    useState(false);

  const [salePaused, setSalePaused] =
    useState(true);

  const [saleFinalized, setSaleFinalized] =
    useState(false);

  const [saleLoading, setSaleLoading] =
    useState(false);

  const [saleError, setSaleError] =
    useState("");

  const [currentStage, setCurrentStage] =
    useState(0);

  const [currentRate, setCurrentRate] =
    useState(0);

  const [
    stageAllocation,
    setStageAllocation,
  ] = useState(0);

  const [stageSold, setStageSold] =
    useState(0);

  const [stageRemaining, setStageRemaining] =
    useState(0);

  const [stageStartTime, setStageStartTime] =
    useState(0);

  const [stageEndTime, setStageEndTime] =
    useState(0);

  const [totalPolRaised, setTotalPolRaised] =
    useState(0);

  const [totalWtcSold, setTotalWtcSold] =
    useState(0);

  const [
    totalRemainingAllocation,
    setTotalRemainingAllocation,
  ] = useState(0);

  const [
    countdownSeconds,
    setCountdownSeconds,
  ] = useState(0);

  const [isPurchasing, setIsPurchasing] =
    useState(false);

  const [purchaseError, setPurchaseError] =
    useState("");

  const [
    purchaseSuccess,
    setPurchaseSuccess,
  ] = useState("");

  const [
    transactionHash,
    setTransactionHash,
  ] = useState("");

  const [copiedLabel, setCopiedLabel] =
    useState("");

  const isPolygon =
    Number(chainId) === POLYGON_CHAIN_ID;

  const numericPolAmount =
    Number(polAmount);

  const showMobileWalletNotice =
    isIosSafariBrowser();

  const estimatedWtc = useMemo(() => {
    if (
      !Number.isFinite(numericPolAmount) ||
      numericPolAmount <= 0 ||
      currentRate <= 0
    ) {
      return 0;
    }

    return numericPolAmount * currentRate;
  }, [
    numericPolAmount,
    currentRate,
  ]);

  const stageProgress = useMemo(() => {
    if (
      !Number.isFinite(stageAllocation) ||
      stageAllocation <= 0
    ) {
      return 0;
    }

    const progress =
      (stageSold / stageAllocation) * 100;

    return Math.min(
      100,
      Math.max(0, progress)
    );
  }, [
    stageAllocation,
    stageSold,
  ]);

  const countdownText = useMemo(
    () =>
      formatCountdown(
        countdownSeconds
      ),
    [countdownSeconds]
  );

  const loadBalance =
    useCallback(async () => {
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
          new BrowserProvider(
            walletProvider
          );

        const balance =
          await provider.getBalance(
            address
          );

        const formatted =
          Number(
            formatEther(balance)
          );

        setPolBalance(
          formatted.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 5,
            }
          )
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
      setSaleLoading(true);
      setSaleError("");

      try {
        const provider = publicPolygonProvider;

        const genesis =
          new Contract(
            CONTRACTS.genesis,
            GenesisArtifact.abi,
            provider
          );

        const [
          openedStatus,
          openStatus,
          pausedStatus,
          finalizedStatus,
          details,
          raised,
          sold,
          remaining,
        ] = await Promise.all([
          genesis.hasOpened(),
          genesis.saleOpen(),
          genesis.paused(),
          genesis.saleFinalized(),
          genesis.getCurrentStageDetails(),
          genesis.totalPolRaised(),
          genesis.totalWtcSold(),
          genesis.remainingAllocation(),
        ]);

        const liveSale =
          Boolean(openStatus) &&
          !Boolean(pausedStatus) &&
          !Boolean(finalizedStatus);

        if (import.meta.env.DEV) {
          console.log("Genesis contract status:", {
            contract: CONTRACTS.genesis,
            opened: Boolean(openedStatus),
            open: Boolean(openStatus),
            paused: Boolean(pausedStatus),
            finalized: Boolean(finalizedStatus),
            live: liveSale,
          });
        }

        setHasOpened(
          Boolean(openedStatus)
        );

        setSaleOpen(liveSale);

        setSalePaused(
          Boolean(pausedStatus)
        );

        setSaleFinalized(
          Boolean(finalizedStatus)
        );

        setCurrentStage(
          Number(details.stage)
        );

        setCurrentRate(
          Number(
            formatUnits(
              details.rate,
              18
            )
          )
        );

        setStageAllocation(
          Number(
            formatUnits(
              details.allocation,
              18
            )
          )
        );

        setStageSold(
          Number(
            formatUnits(
              details.sold,
              18
            )
          )
        );

        setStageRemaining(
          Number(
            formatUnits(
              details.remaining,
              18
            )
          )
        );

        setStageStartTime(
          Number(details.startTime)
        );

        setStageEndTime(
          Number(details.endTime)
        );

        setTotalPolRaised(
          Number(
            formatEther(raised)
          )
        );

        setTotalWtcSold(
          Number(
            formatUnits(sold, 18)
          )
        );

        setTotalRemainingAllocation(
          Number(
            formatUnits(
              remaining,
              18
            )
          )
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
    }, []);

  useEffect(() => {
    loadBalance();
  }, [
    loadBalance,
    chainId,
  ]);

  useEffect(() => {
    loadSaleStatus();
  }, [loadSaleStatus]);

  useEffect(() => {
    if (
      !hasOpened ||
      saleFinalized ||
      stageEndTime <= 0
    ) {
      setCountdownSeconds(0);
      return undefined;
    }

    function updateCountdown() {
      const now = Math.floor(
        Date.now() / 1000
      );

      setCountdownSeconds(
        Math.max(
          0,
          stageEndTime - now
        )
      );
    }

    updateCountdown();

    const timer =
      window.setInterval(
        updateCountdown,
        1000
      );

    return () => {
      window.clearInterval(timer);
    };
  }, [
    hasOpened,
    saleFinalized,
    stageEndTime,
  ]);

  useEffect(() => {
    const refreshTimer =
      window.setInterval(() => {
        loadSaleStatus();
      }, 30000);

    return () => {
      window.clearInterval(
        refreshTimer
      );
    };
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
        name: "Polygon Mainnet",
        nativeCurrency: {
          name: "POL",
          symbol: "POL",
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: [
              "https://polygon.drpc.org",
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
        "The minimum Genesis purchase is 1 POL."
      );
      return;
    }

    if (!saleOpen) {
      setPurchaseError(
        "Genesis Early Access is currently paused or closed."
      );
      return;
    }

    setIsPurchasing(true);

    try {
      const provider =
        new BrowserProvider(
          walletProvider
        );

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
        tokenEstimate,
      ] = await Promise.all([
        genesis.saleOpen(),
        genesis.paused(),
        genesis.saleFinalized(),
        genesis.calculateTokenAmount(
          parseEther(polAmount)
        ),
      ]);
      if (
        !openStatus ||
        pausedStatus ||
        finalizedStatus
      ) {
        throw new Error(
          "Genesis Early Access is currently paused or closed."
        );
      }

      const confirmedEstimate =
        Number(
          formatUnits(
            tokenEstimate,
            18
          )
        );

      await genesis.buyTokens.staticCall({
        value: parseEther(polAmount),
      });

      const transaction =
        await genesis.buyTokens({
          value: parseEther(polAmount),
        });

      setTransactionHash(
        transaction.hash
      );

      setPurchaseSuccess(
        "Transaction submitted. Waiting for Polygon confirmation..."
      );

      await transaction.wait();

      setPurchaseSuccess(
        `Purchase confirmed. Approximately ${formatWtc(
          confirmedEstimate,
          6
        )} WTC was delivered to your wallet.`
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
  const saleStatusText = (() => {
    if (saleLoading) {
      return "Checking Genesis";
    }

    if (saleError) {
  return "Reconnecting";
}

    if (saleFinalized === true) {
      return "Genesis Finalized";
    }

    if (hasOpened !== true) {
      return "Genesis Not Open";
    }

    if (salePaused === true) {
      return "Genesis Paused";
    }

    if (saleOpen === true) {
      return "Genesis Live";
    }

    return "Genesis Closed";
  })();

  return (
    <section
      id="early-access"
      className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#020403] px-4 py-16 text-white sm:px-5 sm:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.10),transparent_35%),radial-gradient(circle_at_50%_75%,rgba(28,90,48,0.18),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-[#D4AF37] sm:text-sm sm:tracking-[0.4em]">
            WealthCoin Genesis Early Access
          </p>

          <h2 className="gold-text mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Begin Your Journey
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
            Connect securely, confirm
            Polygon Mainnet, review the live
            Genesis stage, and purchase WTC
            through the verified contract.
          </p>
        </div>

        <div className="mt-9 grid gap-6 lg:mt-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0 rounded-2xl border border-[#D4AF37]/30 bg-black/55 p-4 shadow-[0_0_45px_rgba(212,175,55,0.08)] sm:p-6">
            <div className="flex flex-col gap-3 border-b border-[#D4AF37]/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45 sm:text-sm sm:tracking-[0.25em]">
                  Current Offering
                </p>

                <h3 className="mt-1.5 font-display text-xl text-[#D4AF37]">
                  Stage{" "}
                  {currentStage + 1} of{" "}
                  {STAGE_COUNT}
                </h3>
              </div>

              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
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

                {saleStatusText}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="min-w-0 rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Connected Wallet
                </p>

                <p className="mt-1.5 break-all font-mono text-xs text-white/75">
                  {shortenAddress(address)}
                </p>
              </div>

              <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
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

              <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Available POL Balance
                </p>

                <p className="mt-1.5 font-display text-xl text-[#D4AF37]">
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

              <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Stage Time Remaining
                </p>

                <p className="mt-1.5 font-display text-xl text-[#D4AF37]">
                  {hasOpened &&
                  !saleFinalized
                    ? countdownText
                    : "Not started"}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Live Rate
                </p>

                <p className="mt-1.5 font-display text-lg text-[#D4AF37]">
                  {currentRate > 0
                    ? formatWtc(
                        currentRate,
                        6
                      )
                    : "—"}
                </p>

                <p className="mt-1 text-xs text-white/45">
                  WTC per POL
                </p>
              </div>

              <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Stage Remaining
                </p>

                <p className="mt-1.5 font-display text-lg text-[#D4AF37]">
                  {formatWtc(
                    stageRemaining,
                    2
                  )}
                </p>

                <p className="mt-1 text-xs text-white/45">
                  WTC
                </p>
              </div>

              <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Genesis Remaining
                </p>

                <p className="mt-1.5 font-display text-lg text-[#D4AF37]">
                  {formatWtc(
                    totalRemainingAllocation,
                    2
                  )}
                </p>

                <p className="mt-1 text-xs text-white/45">
                  WTC
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                  Stage Progress
                </p>

                <p className="text-sm text-white/55">
                  {formatWtc(
                    stageSold,
                    2
                  )}{" "}
                  /{" "}
                  {formatWtc(
                    stageAllocation,
                    2
                  )}{" "}
                  WTC
                </p>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-black/70">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8f6e16] via-[#D4AF37] to-[#f5df88] transition-all duration-500"
                  style={{
                    width: `${stageProgress}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-white/40">
                The stage ends when its
                allocation sells out or its
                seven-day window expires.
                Unsold stage tokens do not
                roll over.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#D4AF37]/15 bg-black/45 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Total POL Raised
                </p>

                <p className="mt-1.5 font-display text-xl text-[#D4AF37]">
                  {totalPolRaised.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits:
                        4,
                    }
                  )}{" "}
                  POL
                </p>
              </div>

              <div className="rounded-xl border border-[#D4AF37]/15 bg-black/45 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Total WTC Distributed
                </p>

                <p className="mt-1.5 font-display text-xl text-[#D4AF37]">
                  {formatWtc(
                    totalWtcSold,
                    2
                  )}{" "}
                  WTC
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                Current Genesis Rate
              </p>

              <p className="mt-1.5 font-display text-xl text-[#D4AF37]">
                1 POL ={" "}
                {currentRate > 0
                  ? formatWtc(currentRate, 6)
                  : "—"}{" "}
                WTC
              </p>

              <p className="mt-2 text-xs leading-5 text-white/45">
                Minimum purchase: 1 POL.
                WTC is delivered directly to
                the connected wallet after
                Polygon confirms the transaction.
              </p>
            </div>

{showMobileWalletNotice && (
  <div className="mt-5 rounded-xl border border-amber-400/30 bg-amber-950/20 p-4">
    <p className="font-semibold text-amber-200">
      📱 iPhone Safari Users
    </p>

    <p className="mt-2 text-xs leading-5 text-white/70">
      For the most reliable purchasing
      experience, open OfficialWealthCoin.com
      inside your wallet's built-in dApp
      browser. Some mobile wallets do not
      reliably return to Safari after signing
      a blockchain transaction.
    </p>
  </div>
)}
            <div className="mt-5">
              <label
                htmlFor="polAmount"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60"
              >
                Amount in POL
              </label>

              <div className="mt-3 flex items-center rounded-xl border border-[#D4AF37]/30 bg-black/60 px-4">
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
                  className="min-w-0 w-full bg-transparent py-4 text-lg text-white outline-none placeholder:text-white/20 disabled:opacity-50 sm:text-xl"
                />

                <span className="font-display text-lg text-[#D4AF37]">
                  POL
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                Estimated WealthCoin
              </p>

              <p className="mt-2 break-words font-display text-xl text-[#D4AF37]">
                {formatWtc(
                  estimatedWtc,
                  6
                )}{" "}
                WTC
              </p>

              <p className="mt-2 text-xs leading-5 text-white/40">
                This estimate uses the current
                on-chain stage rate. The contract
                calculates the final amount when
                your transaction is submitted.
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

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={openWallet}
                className="btn-ghost rounded-lg px-5 py-3 font-bold"
              >
                {isConnected
                  ? "Manage Wallet"
                  : "Connect Wallet"}
              </button>

              {isConnected &&
              !isPolygon ? (
                <button
                  type="button"
                  onClick={handleSwitchNetwork}
                  className="btn-gold rounded-lg px-5 py-3 font-bold"
                >
                  Switch to Polygon
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={purchaseDisabled}
                  className="btn-gold rounded-lg px-5 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isPurchasing
                    ? "Confirming Purchase..."
                    : saleOpen
                      ? "Purchase WTC"
                      : "Purchases Paused"}
                </button>
              )}
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-white/40">
              Cryptocurrency transactions are
              irreversible. Confirm the network,
              amount, and verified contract before
              approving.
            </p>
          </div>

          <aside className="min-w-0 space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-black/55 shadow-[0_0_40px_rgba(212,175,55,0.06)]">
              <div className="border-b border-[#D4AF37]/15 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Genesis Structure
                </p>

                <h3 className="mt-1.5 font-display text-xl text-[#D4AF37]">
                  Genesis Overview
                </h3>
              </div>

              <div className="divide-y divide-[#D4AF37]/10 px-5">
                {[
                  {
                    title: "10 Automatic Stages",
                    description:
                      "Each stage runs for up to seven days or closes early when its fixed allocation sells out.",
                  },
                  {
                    title: "No Stage Rollover",
                    description:
                      "Unsold WTC remains within the public allocation and does not move into the following stage.",
                  },
                  {
                    title: "Direct Wallet Delivery",
                    description:
                      "WTC is delivered directly to the purchasing wallet after Polygon confirms the transaction.",
                  },
                  {
                    title: "On-Chain Transparency",
                    description:
                      "Rates, allocations, sales totals, and stage timing are read directly from the verified Genesis contract.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-3 py-4"
                  >
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-sm text-[#D4AF37]">
                      ✓
                    </div>

                    <div>
                      <p className="font-semibold text-white/85">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/50">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/55 p-5 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    Live Contract Data
                  </p>

                  <h3 className="mt-1.5 font-display text-xl text-[#D4AF37]">
                    Stage Information
                  </h3>
                </div>

                <div
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                    saleOpen
                      ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
                      : "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.55)]"
                  }`}
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-3.5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Current Stage
                  </p>

                  <p className="mt-1.5 font-display text-lg text-[#D4AF37]">
                    {currentStage + 1} / {STAGE_COUNT}
                  </p>
                </div>

                <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-3.5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Current Rate
                  </p>

                  <p className="mt-1.5 font-display text-lg text-[#D4AF37]">
                    {currentRate > 0
                      ? formatWtc(currentRate, 4)
                      : "—"}
                  </p>

                  <p className="mt-1 text-[11px] text-white/35">
                    WTC per POL
                  </p>
                </div>

                <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-3.5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Stage Begins
                  </p>

                  <p className="mt-2 text-sm font-semibold text-white/80">
                    {stageStartTime > 0
                      ? new Date(
                          stageStartTime * 1000
                        ).toLocaleDateString()
                      : "Not started"}
                  </p>
                </div>

                <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-3.5">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Time Remaining
                  </p>

                  <p className="mt-2 text-sm font-semibold text-white/80">
                    {hasOpened && !saleFinalized
                      ? countdownText
                      : "Not started"}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-[#D4AF37]/15 bg-black/45 p-3.5">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/45">
                    Stage allocation remaining
                  </span>

                  <span className="font-semibold text-[#D4AF37]">
                    {formatWtc(stageRemaining, 2)} WTC
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/80">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#8f6e16] via-[#D4AF37] to-[#f5df88] transition-all duration-500"
                    style={{
                      width: `${stageProgress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/55 p-5 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Public Verification
                </p>

                <h3 className="mt-1.5 font-display text-xl text-[#D4AF37]">
                  Verified Contracts
                </h3>

                <p className="mt-3 text-xs leading-5 text-white/45">
                  Confirm these addresses before approving any transaction.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                      WTC Token
                    </p>

                    <span className="rounded-full border border-green-500/20 bg-green-950/20 px-2 py-1 text-[10px] uppercase tracking-wider text-green-300">
                      Polygon
                    </span>
                  </div>

                  <p className="mt-3 break-all font-mono text-xs leading-5 text-white/65">
                    {CONTRACTS.token}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        copyAddress(
                          CONTRACTS.token,
                          "WTC token address copied."
                        )
                      }
                      className="btn-ghost rounded-md px-3 py-2 text-xs font-bold"
                    >
                      Copy
                    </button>

                    <a
                      href={`https://polygonscan.com/token/${CONTRACTS.token}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost rounded-lg px-3 py-2 text-center text-sm font-bold"
                    >
                      View
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-[#D4AF37]/15 bg-[#071009]/70 p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                      Genesis Early Access
                    </p>

                    <span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-2 py-1 text-[10px] uppercase tracking-wider text-[#D4AF37]">
                      Verified
                    </span>
                  </div>

                  <p className="mt-3 break-all font-mono text-xs leading-5 text-white/65">
                    {CONTRACTS.genesis}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        copyAddress(
                          CONTRACTS.genesis,
                          "Genesis address copied."
                        )
                      }
                      className="btn-ghost rounded-md px-3 py-2 text-xs font-bold"
                    >
                      Copy
                    </button>

                    <a
                      href={`https://polygonscan.com/address/${CONTRACTS.genesis}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost rounded-lg px-3 py-2 text-center text-sm font-bold"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>

              {copiedLabel && (
                <p className="mt-4 rounded-xl border border-green-500/20 bg-green-950/20 p-3 text-sm text-green-300">
                  {copiedLabel}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}