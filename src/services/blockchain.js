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
  return await provider.getSigner();
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

export function getGenesisContract() {
  const provider = getProvider();

  return new ethers.Contract(
    CONTRACTS.genesis,
    GenesisArtifact.abi,
    provider
  );
}

export async function getGenesisOwner() {
  const contract = getGenesisContract();
  return await contract.owner();
}

export async function isSaleOpen() {
  const contract = getGenesisContract();
  return await contract.saleOpen();
}
export async function getTreasury() {
  const contract = getGenesisContract();
  return await contract.treasury();
}

export async function getWealthCoinAddress() {
  const contract = getGenesisContract();
  return await contract.wealthCoin();
}

export async function getTotalRaised() {
  const contract = getGenesisContract();
  return await contract.totalPolRaised();
}

export async function getTotalSold() {
  const contract = getGenesisContract();
  return await contract.totalWtcSold();
}

export async function getRemainingAllocation() {
  const contract = getGenesisContract();
  return await contract.remainingAllocation();
}