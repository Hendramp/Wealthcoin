export const CONTRACTS = {
  chainId: Number(import.meta.env.VITE_CHAIN_ID),

  network: import.meta.env.VITE_NETWORK_NAME,

  genesis: import.meta.env.VITE_GENESIS_ADDRESS,

  token: import.meta.env.VITE_WTC_TOKEN_ADDRESS,

  treasury: import.meta.env.VITE_TREASURY_ADDRESS,
};