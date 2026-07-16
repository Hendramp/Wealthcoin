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
    "0x294032E6e4D39218840fBF3aEac25f14F0520fd4",

  treasury:
    import.meta.env.VITE_TREASURY_ADDRESS ||
    "0x3032d0adbb3bc432c08866e47604e0ae142ed60e",
};