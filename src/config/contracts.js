export const CONTRACTS = {
  chainId: Number(import.meta.env.VITE_CHAIN_ID || 137),

  network:
    import.meta.env.VITE_NETWORK_NAME ||
    "Polygon Mainnet",

  token:
    import.meta.env.VITE_WTC_TOKEN_ADDRESS ||
    "0x394b57F4a40ff31530d66f904e1Db2C6516c018F",

  genesis:
    import.meta.env.VITE_GENESIS_ADDRESS ||
    "0x6a78f89e8e06327E772BEDc6650BBC3645BF6995",

  treasury:
    import.meta.env.VITE_TREASURY_ADDRESS ||
    "0x3032D0Adbb3bC432c08866e47604e0AE142eD60e",
};