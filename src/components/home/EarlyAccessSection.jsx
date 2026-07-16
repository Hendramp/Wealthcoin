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
        const provider =
          walletProvider && isPolygon
            ? new BrowserProvider(
                walletProvider
              )
            : publicPolygonProvider;

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
    }, [
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
    if (!isConnected) {
      return "Connect to Check";
    }

    if (saleLoading) {
      return "Checking Genesis";
    }

    if (saleFinalized) {
      return "Genesis Finalized";
    }

    if (!hasOpened) {
      return "Genesis Not Open";
    }

    if (saleOpen) {
      return "Genesis Live";
    }

    if (salePaused) {
      return "Genesis Paused";
    }

    return "Genesis Closed";
  })();

  return (
    <section
      id="early-access"
      className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#020403] px-4 py-20 text-white sm:px-6 sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.10),transparent_35%),radial-gradient(circle_at_50%_75%,rgba(28,90,48,0.18),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-[#D4AF37] sm:text-sm sm:tracking-[0.4em]">
            WealthCoin Genesis Early Access
          </p>

          <h2 className="gold-text mt-5 font-display text-4xl font-bold sm:text-5xl md:text-6xl">
            Begin Your Journey
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Connect securely, confirm
            Polygon Mainnet, review the live
            Genesis stage, and purchase WTC
            through the verified contract.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0 rounded-3xl border border-[#D4AF37]/30 bg-black/55 p-5 shadow-[0_0_45px_rgba(212,175,55,0.08)] sm:p-8">
            <div className="flex flex-col gap-4 border-b border-[#D4AF37]/15 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45 sm:text-sm sm:tracking-[0.25em]">
                  Current Offering
                </p>

                <h3 className="mt-2 font-display text-2xl text-[#D4AF37]">
                  Stage{" "}
                  {currentStage + 1} of{" "}
                  {STAGE_COUNT}
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

                {saleStatusText}
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="min-w-0 rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
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

              <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
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

              <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Stage Time Remaining
                </p>

                <p className="mt-2 font-display text-2xl text-[#D4AF37]">
                  {hasOpened &&
                  !saleFinalized
                    ? countdownText
                    : "Not started"}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Live Rate
                </p>

                <p className="mt-2 font-display text-xl text-[#D4AF37]">
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

              <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Stage Remaining
                </p>

                <p className="mt-2 font-display text-xl text-[#D4AF37]">
                  {formatWtc(
                    stageRemaining,
                    2
                  )}
                </p>

                <p className="mt-1 text-xs text-white/45">
                  WTC
                </p>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Genesis Remaining
                </p>

                <p className="mt-2 font-display text-xl text-[#D4AF37]">
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

            <div className="mt-5 rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
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

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/70">
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

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#D4AF37]/15 bg-black/45 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Total POL Raised
                </p>

                <p className="mt-2 font-display text-2xl text-[#D4AF37]">
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

              <div className="rounded-2xl border border-[#D4AF37]/15 bg-black/45 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Total WTC Distributed
                </p>

                <p className="mt-2 font-display text-2xl text-[#D4AF37]">
                  {formatWtc(
                    totalWtcSold,
                    2
                  )}{" "}
                  WTC
                </p>
              </div>
            </div>
                        <div className="mt-7 rounded-2xl border border-[#D4AF37]/15 bg-[#071009]/70 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                Current Genesis Rate
              </p>

              <p className="mt-2 font-display text-2xl text-[#D4AF37]">
                1 POL ={" "}
                {currentRate > 0
                  ? formatWtc(currentRate, 6)
                  : "—"}{" "}
                WTC
              </p>

              <p className="mt-2 text-sm leading-6 text-white/45">
                Minimum purchase: 1 POL.
                WTC is delivered directly to
                the connected wallet after
                Polygon confirms the transaction.
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
{showMobileWalletNotice && (
  <div className="mt-7 rounded-2xl border border-amber-400/30 bg-amber-950/20 p-5">
    <p className="font-semibold text-amber-200">
      📱 iPhone Safari Users
    </p>

    <p className="mt-2 text-sm leading-6 text-white/70">
      For the most reliable purchasing
      experience, open OfficialWealthCoin.com
      inside your wallet's built-in dApp
      browser. Some mobile wallets do not
      reliably return to Safari after signing
      a blockchain transaction.
    </p>
  </div>
)}
            <div className="mt-7">
              <label
                htmlFor="polAmount"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60"
              >
                Amount in POL
              </label>

              <div className="mt-3 flex items-center rounded-2xl border border-[#D4AF37]/30 bg-black/60 px-4 sm:px-5">
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
                  className="min-w-0 w-full bg-transparent py-5 text-xl text-white outline-none placeholder:text-white/20 disabled:opacity-50 sm:text-2xl"
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

            <div className="mt-7 grid gap-4 md:grid-cols-2">
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
                  onClick={handleSwitchNetwork}
                  className="btn-gold rounded-xl px-6 py-4 font-bold"
                >
                  Switch to Polygon
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={purchaseDisabled}
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

          <aside className="min-w-0 space-y-6">
            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-6">
              <p className="font-display text-xl text-[#D4AF37]">
                Ten Automatic Stages
              </p>

              <p className="mt-3 leading-7 text-white/60">
                Each stage lasts up to seven days
                or closes early when its fixed
                allocation sells out. The contract
                automatically advances when the
                next transaction is processed.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-6">
              <p className="font-display text-xl text-[#D4AF37]">
                No Stage Rollover
              </p>

              <p className="mt-3 leading-7 text-white/60">
                Unsold WTC from an expired stage
                does not move into the next stage.
                It remains part of the public
                allocation for future community
                governance.
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
                The WealthCoin token and Genesis
                contracts are publicly inspectable
                on PolygonScan.
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

            <div className="rounded-2xl border border-[#D4AF37]/25 bg-black/45 p-6">
              <p className="font-display text-xl text-[#D4AF37]">
                Stage Schedule
              </p>

              <p className="mt-3 text-sm leading-7 text-white/60">
                Stage 1 begins when Genesis is
                officially opened. The displayed
                rate, remaining allocation, and
                countdown are read directly from
                the Polygon contract.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-[#D4AF37]/15 bg-black/50 p-3">
                  <p className="text-white/40">
                    Current stage
                  </p>

                  <p className="mt-1 font-semibold text-[#D4AF37]">
                    {currentStage + 1} /{" "}
                    {STAGE_COUNT}
                  </p>
                </div>

                <div className="rounded-xl border border-[#D4AF37]/15 bg-black/50 p-3">
                  <p className="text-white/40">
                    Stage begins
                  </p>

                  <p className="mt-1 font-semibold text-[#D4AF37]">
                    {stageStartTime > 0
                      ? new Date(
                          stageStartTime * 1000
                        ).toLocaleDateString()
                      : "Not started"}
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/documents/Wallet_Guide_EN.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost block w-full rounded-xl px-6 py-4 text-center font-bold"
            >
              Open Wallet Guide
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}