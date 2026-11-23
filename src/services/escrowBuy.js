import { ethers } from "ethers";
import {
  WTC_ADDRESS,
  getFactoryContract,
  getEscrowContract,
  decodeEscrowError,
} from "./escrow";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner,address spender) view returns (uint256)",
  "function approve(address spender,uint256 amount) returns (bool)",
];

export async function buyListing({ listing, signer, onStep, wtcPrice }) {
  if (!signer) throw new Error("Connect your wallet to continue");
  if (!listing?.seller_wallet) throw new Error("Seller has not set a payout wallet");
  if (!listing?.priceInWTC) throw new Error("The WTC price is unavailable");
  if (listing.delivery_method === "local_pickup") throw new Error("Local pickup listings do not use escrow");

  let buyerAddress;
  try {
    buyerAddress = await signer.getAddress();
  } catch (error) {
    throw new Error(decodeEscrowError(error));
  }

  if (buyerAddress.toLowerCase() === listing.seller_wallet.toLowerCase()) {
    throw new Error("You cannot buy your own listing.");
  }

  if (!ethers.isAddress(buyerAddress) || !ethers.isAddress(listing.seller_wallet)) {
    throw new Error("A valid buyer or seller wallet address is required");
  }

  const priceInWTC = BigInt(listing.priceInWTC);
  if (priceInWTC <= 0n) throw new Error("The purchase amount is zero.");

  // Guard against malformed or accidental overflow-sized approvals. One billion
  // WTC is a deliberately generous upper bound for normal marketplace purchases.
  const MAX_PURCHASE_WTC = 1_000_000_000n * 10n ** 18n;
  if (priceInWTC > MAX_PURCHASE_WTC) {
    throw new Error("This purchase amount is too large.");
  }
  if (!Number.isFinite(wtcPrice) || wtcPrice <= 0) {
    throw new Error("The WTC price is unavailable.");
  }

  try {
    const wtc = new ethers.Contract(WTC_ADDRESS, ERC20_ABI, signer);
    const balance = await wtc.balanceOf(buyerAddress);
    if (balance < priceInWTC) {
      throw new Error("You do not have enough WTC for this purchase.");
    }

    onStep?.("creating escrow");
    const factory = getFactoryContract(signer);
    const createTx = await factory.createEscrow(
      buyerAddress,
      listing.seller_wallet,
      priceInWTC
    );
    onStep?.("creating escrow");
    const receipt = await createTx.wait();

    let escrowAddress;
    for (const log of receipt.logs) {
      try {
        const parsed = factory.interface.parseLog(log);
        if (parsed?.name === "EscrowCreated") {
          escrowAddress = parsed.args.escrow;
          break;
        }
      } catch {}
    }
    if (!escrowAddress) {
      throw new Error("The escrow address was not returned by the transaction.");
    }

    const escrow = getEscrowContract(escrowAddress, signer);
    const onChainPrice = await escrow.priceInWTC();
    if (onChainPrice !== priceInWTC) {
      throw new Error("The escrow price changed. Please reopen the purchase.");
    }

    const allowance = await wtc.allowance(buyerAddress, escrowAddress);
    if (allowance < priceInWTC) {
      onStep?.("approving");
      const approveTx = await wtc.approve(escrowAddress, priceInWTC);
      await approveTx.wait();
    }

    onStep?.("funding");
    const fundTx = await escrow.fund();
    await fundTx.wait();
    return { escrowAddress, txHash: fundTx.hash };
  } catch (error) {
    throw new Error(decodeEscrowError(error));
  }
}
