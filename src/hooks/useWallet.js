import { useEffect, useState } from "react";

const NETWORKS = {
  polygon: {
    chainId: "0x89",
    name: "Polygon Mainnet",
    rpc: "https://polygon-rpc.com",
    explorer: "https://polygonscan.com",
  },

  polygonAmoy: {
    chainId: "0x13882",
    name: "Polygon Amoy",
    rpc: "https://rpc-amoy.polygon.technology/",
    explorer: "https://amoy.polygonscan.com",
  },
};

const ACTIVE_NETWORK = NETWORKS.polygonAmoy;

export default function useWallet() {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  async function readWalletState() {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const currentChainId =
        await window.ethereum.request({
          method: "eth_chainId",
        });

      setAccount(accounts[0] || "");
      setChainId(currentChainId);
    } catch (walletError) {
      console.error(
        "Could not read wallet state:",
        walletError
      );
    }
  }

  useEffect(() => {
    readWalletState();

    if (!window.ethereum) return;

    function handleAccountsChanged(accounts) {
      setAccount(accounts[0] || "");
    }

    function handleChainChanged(nextChainId) {
      setChainId(nextChainId);
    }

    window.ethereum.on(
      "accountsChanged",
      handleAccountsChanged
    );

    window.ethereum.on(
      "chainChanged",
      handleChainChanged
    );

    return () => {
      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );

      window.ethereum.removeListener(
        "chainChanged",
        handleChainChanged
      );
    };
  }, []);

  async function switchNetwork() {
    if (!window.ethereum) {
      throw new Error("Wallet not detected.");
    }

    try {
      await window.ethereum.request({
        method:
          "wallet_switchEthereumChain",
        params: [
          {
            chainId:
              ACTIVE_NETWORK.chainId,
          },
        ],
      });
    } catch (switchError) {
      if (switchError.code !== 4902) {
        throw switchError;
      }

      await window.ethereum.request({
        method:
          "wallet_addEthereumChain",
        params: [
          {
            chainId:
              ACTIVE_NETWORK.chainId,

            chainName:
              ACTIVE_NETWORK.name,

            nativeCurrency: {
              name: "POL",
              symbol: "POL",
              decimals: 18,
            },

            rpcUrls: [
              ACTIVE_NETWORK.rpc,
            ],

            blockExplorerUrls: [
              ACTIVE_NETWORK.explorer,
            ],
          },
        ],
      });
    }

    setChainId(
      ACTIVE_NETWORK.chainId
    );
  }

  async function connectWallet() {
    setError("");
    setIsConnecting(true);

    try {
      if (!window.ethereum) {
        throw new Error(
          "Install MetaMask or another EVM wallet."
        );
      }

      const accounts =
        await window.ethereum.request({
          method:
            "eth_requestAccounts",
        });

      const currentChainId =
        await window.ethereum.request({
          method:
            "eth_chainId",
        });

      setAccount(
        accounts[0] || ""
      );

      setChainId(
        currentChainId
      );

      if (
        currentChainId !==
        ACTIVE_NETWORK.chainId
      ) {
        await switchNetwork();
      }

    } catch (walletError) {
      console.error(
        "Wallet connection failed:",
        walletError
      );

      if (walletError.code === 4001) {
        setError(
          "Wallet connection cancelled."
        );
      } else {
        setError(
          walletError.message
        );
      }

    } finally {
      setIsConnecting(false);
    }
  }

  return {
    account,
    chainId,
    error,
    isConnecting,

    network:
      ACTIVE_NETWORK.name,

    isCorrectNetwork:
      chainId === ACTIVE_NETWORK.chainId,

    connectWallet,
    switchNetwork,
  };
}