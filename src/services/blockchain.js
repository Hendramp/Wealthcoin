import { ethers } from "ethers";
import { CONTRACTS } from "../config/contracts";
import GenesisArtifact from "../abi/WealthCoinGenesis.json";

export function getProvider() {
  if (!window.ethereum) {
    throw new Error("Wallet not detected");
  }

  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = getProvider();
  return provider.getSigner();
}

export async function getWalletBalance() {
  const provider = getProvider();
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const balance = await provider.getBalance(address);

  return ethers.formatEther(balance);
}

export function getContractAddresses() {
  return {
    genesis: CONTRACTS.genesis,
    token: CONTRACTS.token,
    treasury: CONTRACTS.treasury,
  };
}

export function getGenesisContract(providerOrSigner) {
  const runner = providerOrSigner || getProvider();

  return new ethers.Contract(
    CONTRACTS.genesis,
    GenesisArtifact.abi,
    runner
  );
}

export async function getGenesisWriteContract() {
  const signer = await getSigner();
  return getGenesisContract(signer);
}

export async function getGenesisOwner() {
  return getGenesisContract().owner();
}

export async function isSaleOpen() {
  return getGenesisContract().saleOpen();
}

export async function getTreasury() {
  return getGenesisContract().treasury();
}

export async function getWealthCoinAddress() {
  return getGenesisContract().wealthCoin();
}

export async function getTotalRaised() {
  return getGenesisContract().totalPolRaised();
}

export async function getTotalSold() {
  return getGenesisContract().totalWtcSold();
}

export async function getRemainingAllocation() {
  return getGenesisContract().remainingAllocation();
}

export async function getCurrentRate() {
  return getGenesisContract().currentRate();
}

export async function getCurrentStage() {
  return getGenesisContract().currentStage();
}

export async function getCurrentStageDetails() {
  const details =
    await getGenesisContract().getCurrentStageDetails();

  return {
    stageIndex: Number(details.stage),
    stageNumber: Number(details.stage) + 1,
    rate: details.rate,
    allocation: details.allocation,
    sold: details.sold,
    remaining: details.remaining,
    startTime: Number(details.startTime),
    endTime: Number(details.endTime),
  };
}

export async function calculateTokenAmount(polAmount) {
  const parsedPol = ethers.parseEther(
    String(polAmount)
  );

  return getGenesisContract().calculateTokenAmount(
    parsedPol
  );
}

export async function getRemainingWalletAllowance(
  walletAddress
) {
  return getGenesisContract().remainingWalletAllowance(
    walletAddress
  );
}

export async function buyGenesisTokens(polAmount) {
  const contract = await getGenesisWriteContract();

  const transaction = await contract.buyTokens({
    value: ethers.parseEther(String(polAmount)),
  });

  return transaction.wait();
}

export async function getGenesisStatus() {
  const contract = getGenesisContract();

  const [
    hasOpened,
    saleOpen,
    paused,
    saleFinalized,
    totalPolRaised,
    totalWtcSold,
    remainingAllocation,
    details,
  ] = await Promise.all([
    contract.hasOpened(),
    contract.saleOpen(),
    contract.paused(),
    contract.saleFinalized(),
    contract.totalPolRaised(),
    contract.totalWtcSold(),
    contract.remainingAllocation(),
    contract.getCurrentStageDetails(),
  ]);

  return {
    hasOpened,
    saleOpen,
    paused,
    saleFinalized,
    totalPolRaised,
    totalWtcSold,
    remainingAllocation,
    stageIndex: Number(details.stage),
    stageNumber: Number(details.stage) + 1,
    currentRate: details.rate,
    stageAllocation: details.allocation,
    stageSold: details.sold,
    stageRemaining: details.remaining,
    stageStartTime: Number(details.startTime),
    stageEndTime: Number(details.endTime),
  };
}