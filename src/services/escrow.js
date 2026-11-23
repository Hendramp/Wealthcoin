import { ethers } from "ethers";
import FactoryArtifact from "../abi/WealthCoinEscrowFactory.json";
import EscrowArtifact from "../abi/WealthCoinEscrow.json";

export const WTC_ADDRESS = "0x394b57F4a40ff31530d66f904e1Db2C6516c018F";

const ERC20_ABI = [
  "function approve(address spender,uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner,address spender) view returns (uint256)",
];

let feeBpsCache;
let feeBpsCachedAt = 0;
const FEE_BPS_CACHE_TTL_MS = 60_000;

export function getFactoryAddress() {
  const address = import.meta.env.VITE_ESCROW_FACTORY_ADDRESS;
  if (!address) {
    throw new Error("VITE_ESCROW_FACTORY_ADDRESS is missing");
  }
  return address;
}

export function getReadProvider() {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }

  const rpcUrl = import.meta.env.VITE_POLYGON_RPC_URL;
  if (rpcUrl) {
    return new ethers.JsonRpcProvider(rpcUrl);
  }

  throw new Error(
    "No read provider available. Set VITE_POLYGON_RPC_URL to enable public contract reads."
  );
}

export function getReadRunner() {
  return getReadProvider();
}

export function getSignerProvider() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("Wallet or injected provider not detected");
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export function getFactoryContract(signerOrProvider) {
  if (!signerOrProvider) throw new Error("A signer or provider is required");
  return new ethers.Contract(getFactoryAddress(), FactoryArtifact, signerOrProvider);
}

export function getEscrowContract(address, signerOrProvider) {
  if (!signerOrProvider) throw new Error("A signer or provider is required");
  if (!ethers.isAddress(address)) throw new Error("Invalid escrow address");
  return new ethers.Contract(address, EscrowArtifact, signerOrProvider);
}

export function decodeEscrowError(error) {
  const code = error?.errorName || error?.reason || error?.shortMessage || error?.message || "";
  const customErrors = {
    FeeTooHigh: "The fee is above the maximum allowed.",
    InvalidWindow: "The delivery window is invalid.",
    NotEscrow: "That address is not a WealthCoin escrow.",
    SameParties: "The buyer and seller cannot be the same address.",
    ZeroAddress: "A required address is missing.",
    ZeroPrice: "The price must be greater than zero.",
    SafeERC20FailedOperation: "The token transfer failed. Check your WTC balance and allowance.",
    OwnableInvalidOwner: "Only the contract owner can do that.",
    OwnableUnauthorizedAccount: "Only the contract owner can do that.",
    DeadlinePassed: "The payment window has closed.",
    DeadlineNotPassed: "The payment window is still open.",
    WindowNotElapsed: "The delivery window has not passed yet.",
    WrongState: "This escrow is not in the right state for that action.",
    NotBuyer: "Only the buyer can do that.",
    NotSeller: "Only the seller can do that.",
    NotParty: "You are not a party to this escrow.",
    NotResolver: "Only the resolver can resolve a dispute.",
  };

  for (const [name, message] of Object.entries(customErrors)) {
    if (code.includes(name)) return message;
  }
  if (error?.code === 4001 || error?.code === "ACTION_REJECTED") {
    return "You cancelled the transaction";
  }
  if (error?.shortMessage) return error.shortMessage;
  if (error?.reason) return error.reason;
  if (error?.message) return error.message;
  return "Transaction failed";
}

export async function getFeeBps(signerOrProvider) {
  if (
    feeBpsCache !== undefined &&
    Date.now() - feeBpsCachedAt < FEE_BPS_CACHE_TTL_MS
  ) {
    return feeBpsCache;
  }
  const runner = signerOrProvider || getReadProvider();
  try {
    const factory = getFactoryContract(runner);
    const [value, maxFeeBps] = await Promise.all([
      factory.feeBps(),
      factory.MAX_FEE_BPS(),
    ]);
    if (value > maxFeeBps) {
      console.warn(
        `Factory fee ${value.toString()} bps exceeds MAX_FEE_BPS ${maxFeeBps.toString()} bps.`
      );
    }
    const feeBps = Number(value);
    feeBpsCache = feeBps;
    feeBpsCachedAt = Date.now();
    return feeBps;
  } catch (error) {
    feeBpsCache = undefined;
    feeBpsCachedAt = 0;
    throw new Error(decodeEscrowError(error));
  }
}

export async function createEscrow({ buyer, seller, priceInWTC }, signer) {
  if (!signer) throw new Error("A signer is required");
  if (!ethers.isAddress(buyer) || !ethers.isAddress(seller)) throw new Error("Invalid buyer or seller address");
  try {
    const connected = (await signer.getAddress()).toLowerCase();
    if (connected !== buyer.toLowerCase()) {
      throw new Error("You must be the buyer to create this escrow.");
    }
    const contract = getFactoryContract(signer);
    const tx = await contract.createEscrow(buyer, seller, BigInt(priceInWTC));
    const receipt = await tx.wait();
    let escrowAddress;
    for (const log of receipt.logs) {
      try {
        const parsed = contract.interface.parseLog(log);
        if (parsed?.name === "EscrowCreated") {
          escrowAddress = parsed.args.escrow;
          break;
        }
      } catch {}
    }
    if (!escrowAddress) throw new Error("EscrowCreated event was not found in the transaction receipt");
    return { escrowAddress, txHash: tx.hash };
  } catch (error) {
    throw new Error(decodeEscrowError(error));
  }
}

export async function approveWtc(spender, amount, signer) {
  if (!signer) throw new Error("A signer is required");
  if (!ethers.isAddress(spender)) throw new Error("Invalid WTC spender address");
  try {
    const contract = new ethers.Contract(WTC_ADDRESS, ERC20_ABI, signer);
    const tx = await contract.approve(spender, BigInt(amount));
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw new Error(decodeEscrowError(error));
  }
}

async function runEscrowAction(address, signer, methodName, argument) {
  if (!signer) throw new Error("A signer is required");
  try {
    const contract = getEscrowContract(address, signer);
    const tx = argument === undefined ? await contract[methodName]() : await contract[methodName](argument);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw new Error(decodeEscrowError(error));
  }
}

export async function fundEscrow(address, signer) { return runEscrowAction(address, signer, "fund"); }
export async function deliverEscrow(address, signer) { return runEscrowAction(address, signer, "deliver"); }
export async function confirmDelivery(address, signer) { return runEscrowAction(address, signer, "confirmDelivery"); }
export async function claimAfterWindow(address, signer) { return runEscrowAction(address, signer, "claimAfterWindow"); }
export async function claimAfterNoDelivery(address, signer) { return runEscrowAction(address, signer, "claimAfterNoDelivery"); }
export async function raiseDispute(address, signer) { return runEscrowAction(address, signer, "raiseDispute"); }
export async function resolveEscrow(address, toSeller, signer) {
  if (!signer) throw new Error("A signer is required");
  return runEscrowAction(address, signer, "resolve", Boolean(toSeller));
}

export async function getEscrowState(address, signerOrProvider) {
  const runner = signerOrProvider || getReadRunner();
  try {
    const value = await getEscrowContract(address, runner).state();
    return ["Created", "Paid", "Delivered", "Completed", "Refunded", "Disputed"][Number(value)] || "Unknown";
  } catch (error) {
    throw new Error(decodeEscrowError(error));
  }
}

export async function getEscrowSummary(escrowAddress, signerOrProvider) {
  const runner = signerOrProvider || getReadRunner();
  const escrow = getEscrowContract(escrowAddress, runner);
  try {
    const [state, buyer, seller, priceInWTC, feeInWTC, feeBps, paymentDeadline, deliveryWindow, deliveredAt, resolver] =
      await Promise.all([
        escrow.state(),
        escrow.buyer(),
        escrow.seller(),
        escrow.priceInWTC(),
        escrow.feeInWTC(),
        escrow.feeBps(),
        escrow.paymentDeadline(),
        escrow.deliveryWindow(),
        escrow.deliveredAt(),
        escrow.resolver(),
      ]);
    const stateName = ["Created", "Paid", "Delivered", "Completed", "Refunded", "Disputed"][Number(state)] || "Unknown";
    return {
      state: stateName,
      buyer,
      seller,
      priceInWTC: priceInWTC.toString(),
      feeInWTC: feeInWTC.toString(),
      feeBps: feeBps.toString(),
      paymentDeadline: paymentDeadline.toString(),
      deliveryWindow: deliveryWindow.toString(),
      deliveredAt: deliveredAt.toString(),
      resolver,
    };
  } catch (error) {
    throw new Error(decodeEscrowError(error));
  }
}

export async function getSalesByBuyer(address, signerOrProvider) {
  const runner = signerOrProvider || getReadRunner();
  try {
    const factory = getFactoryContract(runner);
    const ids = await factory.salesByBuyer(address);
    return Promise.all(ids.map(async (id) => {
      const sale = await factory.sales(id);
      return { saleId: id.toString(), escrow: sale.escrow, buyer: sale.buyer, seller: sale.seller, priceInWTC: sale.priceInWTC.toString(), createdAt: sale.createdAt.toString() };
    }));
  } catch (error) {
    throw new Error(decodeEscrowError(error));
  }
}

export async function getSalesBySeller(address, signerOrProvider) {
  const runner = signerOrProvider || getReadRunner();
  try {
    const factory = getFactoryContract(runner);
    const ids = await factory.salesBySeller(address);
    return Promise.all(ids.map(async (id) => {
      const sale = await factory.sales(id);
      return { saleId: id.toString(), escrow: sale.escrow, buyer: sale.buyer, seller: sale.seller, priceInWTC: sale.priceInWTC.toString(), createdAt: sale.createdAt.toString() };
    }));
  } catch (error) {
    throw new Error(decodeEscrowError(error));
  }
}
