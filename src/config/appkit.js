import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { polygon } from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "Missing VITE_REOWN_PROJECT_ID. Add it to the root .env file and restart Vite."
  );
}

const metadata = {
  name: "WealthCoin",
  description:
    "A stewardship-driven digital economy built on Polygon.",
  url: window.location.origin,
  icons: [
    `${window.location.origin}/assets/logos/wealthcoin-logo.png`,
  ],
};

export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [polygon],
  defaultNetwork: polygon,
  projectId,
  metadata,
  themeMode: "dark",

  themeVariables: {
    "--w3m-accent": "#D4AF37",
    "--w3m-color-mix": "#071009",
    "--w3m-color-mix-strength": 25,
    "--w3m-border-radius-master": "2px",
  },

  features: {
    analytics: false,
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
  },
});
