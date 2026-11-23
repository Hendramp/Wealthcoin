import { ethers } from "ethers";
import FactoryArtifact from "../abi/WealthCoinEscrowFactory.json";
import EscrowArtifact from "../abi/WealthCoinEscrow.json";

export const WTC_ADDRESS = "0x394b57F4a40ff31530d66f904e1Db2C6516c018F";

const ERC20_ABI = [
  "function approve(address spender,uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
];

let feeBpsCache;

function getFactoryAddress() {
  const address = import.meta.env.VITE_ESCROW_FACTORY_ADDRESS;
  if (!address) {
    throw new Error("VITE_ESCROW_FACTORY_ADDRESS is missing");
  }

  function getReadRunner() {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("Wallet or injected provider not detected");
    }
    return new ethers.BrowserProvider(window.ethereum);
  }
  return address;
}

export function getFactoryContract(signerOrProvider) {
  if (!signerOrProvider) {
    throw new Error("A signer or provider is required");
  }
  return new ethers.Contract(
    getFactoryAddress(),
    FactoryArtifact.abi,
    signerOrProvider
  );
}

export function getEscrowContract(address, signerOrProvider) {
  if (!signerOrProvider) {
    throw new Error("A signer or provider is required");
  }
  if (!ethers.isAddress(address)) {
    throw new Error("Invalid escrow address");
  }
  return new ethers.Contract(address, EscrowArtifact.abi, signerOrProvider);
}

function readableError(error) {
  if (error?.code === 4001 || error?.code === "ACTION_REJECTED") {
    return new Error("User rejected the transaction");
  }

  const text = [
    error?.shortMessage,
    error?.reason,
    error?.message,
    error?.info?.error?.message,
  ]
    .filter(Boolean)
    .join(" ");

  if (/insufficient balance|balance too low|ERC20.*insufficient/i.test(text)) {
    return new Error("Insufficient WTC balance");
  }

  const reason =
    error?.reason ||
    error?.shortMessage ||
    error?.info?.error?.message ||
    error?.message;

  if (reason) {
    return new Error(`Transaction failed: ${reason}`);
  }
  return new Error("Transaction failed");
}

export async function getFeeBps(signerOrProvider) {
  if (feeBpsCache !== undefined) return feeBpsCache;
  const runner = signerOrProvider || getReadRunner();

  try {
    feeBpsCache = await getFactoryContract(runner).feeBps();
    return feeBpsCache;
  } catch (error) {
    throw readableError(error);
  }
}

export async function createEscrow({ buyer, seller, priceInWTC }, signer) {
  if (!signer) throw new Error("A signer is required");
  if (!ethers.isAddress(buyer) || !ethers.isAddress(seller)) {
    throw new Error("Invalid buyer or seller address");
  }

  try {
    const contract = getFactoryContract(signer);
    const tx = await contract.createEscrow(
      buyer,
      seller,
      BigInt(priceInWTC)
    );
    const receipt = await tx.wait();

    let escrowAddress;
    for (const log of receipt.logs) {
      try {
        const parsed = contract.interface.parseLog(log);
        if (parsed?.name === "EscrowCreated") {
          escrowAddress =
            parsed.args.escrowAddress ||
            parsed.args.escrow ||
            parsed.args[0];
          break;
        }
      } catch {
        // Ignore logs not emitted by the factory.
      }
    }

    if (!escrowAddress) {
      throw new Error("EscrowCreated event was not found in the transaction receipt");
    }

    return { escrowAddress, txHash: tx.hash };
  } catch (error) {
    throw readableError(error);
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
    throw readableError(error);
  }
}

async function runEscrowAction(address, signer, methodName) {
  if (!signer) throw new Error("A signer is required");
  try {
    const contract = getEscrowContract(address, signer);
    const tx = await contract[methodName]();
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw readableError(error);
  }
}

export async function fundEscrow(address, signer) {
  return runEscrowAction(address, signer, "fund");
}

export async function deliverEscrow(address, signer) {
  return runEscrowAction(address, signer, "deliver");
}

export async function confirmDelivery(address, signer) {
  return runEscrowAction(address, signer, "confirmDelivery");
}

export async function claimAfterWindow(address, signer) {
  return runEscrowAction(address, signer, "claimAfterWindow");
}

export async function claimAfterNoDelivery(address, signer) {
  return runEscrowAction(address, signer, "claimAfterNoDelivery");
}

export async function raiseDispute(address, signer) {
  return runEscrowAction(address, signer, "raiseDispute");
}

export async function resolveEscrow(address, winner, signer) {
  if (!signer) throw new Error("A signer is required");
  if (!ethers.isAddress(winner)) throw new Error("Invalid winner address");
  try {
    const contract = getEscrowContract(address, signer);
    const tx = await contract.resolve(winner);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw readableError(error);
  }
}

export async function getEscrowState(address, signerOrProvider) {
  const runner = signerOrProvider || getReadRunner();

  try {
    const value = await getEscrowContract(address, runner).state();
    const states = [
      "Awaiting payment",
      "Funded",
      "Delivered",
      "Completed",
      "Disputed",
      "Refunded",
    ];
    const index = Number(value);
    return states[index] || "Unknown";
  } catch (error) {
    throw readableError(error);
  }
}

export async function getSalesByBuyer(address, signerOrProvider) {
  const runner = signerOrProvider || getReadRunner();
  try {
    const contract = getFactoryContract(runner);
    if (typeof contract.getEscrowsByBuyer === "function") {
      return await contract.getEscrowsByBuyer(address);
    }

    const filter = contract.filters.EscrowCreated(null, address, null);
    const events = await contract.queryFilter(filter);
    return events.map((event) => event.args.escrowAddress || event.args.escrow || event.args[0]);
  } catch (error) {
    throw readableError(error);
  }
}

export async function getSalesBySeller(address, signerOrProvider) {
  const runner = signerOrProvider || getReadRunner();
  try {
    const contract = getFactoryContract(runner);
    if (typeof contract.getEscrowsBySeller === "function") {
      return await contract.getEscrowsBySeller(address);
    }

    const filter = contract.filters.EscrowCreated(null, null, address);
    const events = await contract.queryFilter(filter);
    return events.map((event) => event.args.escrowAddress || event.args.escrow || event.args[0]);
  } catch (error) {
    throw readableError(error);
  }
}
