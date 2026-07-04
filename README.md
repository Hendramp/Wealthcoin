# WealthCoin DApp

A faith-based, long-term wealth-building digital asset on Polygon blockchain.

## Setup

### Prerequisites
- Node.js 24.x installed
- npm or yarn package manager
- A Web3 wallet (MetaMask recommended)

### Installation

1. Open terminal and navigate to the project directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create your local environment file (required for WalletConnect QR modal):
```bash
# Copy the example and fill in your project ID
cp .env.example .env
```
Then edit `.env` and replace `your_walletconnect_project_id_here` with your actual ID from [cloud.reown.com](https://cloud.reown.com).

This will install:
- **Vite** - Lightning-fast dev server and build tool
- **React 18** - UI framework
- **ethers.js v6** - Web3 library for blockchain interactions
- **Tailwind CSS** - Utility-first CSS framework
- **WalletConnect / Reown AppKit** - QR code & mobile wallet connections

## Running the Development Server

Start the local dev server:
```bash
npm run dev
```

The app will automatically open at `http://localhost:5173`

### Hot-reload
Changes to any file will instantly reflect in your browser without page refresh.

## Building for Production

Create an optimized production build:
```bash
npm run build
```

Output files will be in the `dist/` folder.

Preview the production build locally:
```bash
npm run preview
```

## How to Use the DApp

1. **Connect Wallet**: Click "Connect Wallet" button to connect your Web3 wallet (MetaMask, etc.)
2. **Switch Network**: If not on Polygon, you'll be prompted to switch automatically
3. **Buy WTC**: Enter POL amount and purchase tokens
4. **Stake**: Approve tokens, then stake for rewards
5. **Claim**: Collect your staking rewards

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx           # Main React component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML entry point
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # This file
```

## Contract Details

- **Network**: Polygon (Chain ID: 137)
- **Contract Address**: `0x394b57F4a40ff31530d66f904e1Db2C6516c018F`
- **Token**: WTC (ERC-20)
- **Native Token**: POL (MATIC)

## Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 5174
```

**Module not found errors?**
Delete `node_modules` and reinstall:
```bash
rm -r node_modules
npm install
```

**Wallet not connecting?**
- Ensure MetaMask/wallet extension is installed and active
- Check browser console for error messages
- Refresh the page and try again

## Support

For issues or questions, check the contract address and verify you're on the Polygon network.

## Deploying to Vercel

Recommended steps to deploy the production build to Vercel:

1. Push the repository to GitHub.
2. Create a new project on Vercel and import the repo.
   - Framework Preset: **Vite**
   - Install Command: `npm ci` (or leave blank if using `vercel.json`)
   - Build Command: `npm run build` (or leave blank if using `vercel.json`)
   - Output Directory: `dist`
   - Node.js Version: `24.x`
   - Environment Variable: `VITE_WALLETCONNECT_PROJECT_ID`
3. Or deploy from CLI:
```bash
npm ci
npm run vercel-build
# then (if you have Vercel CLI configured)
vercel --prod
```

The project includes `.nvmrc`, `.node-version`, `package.json` engines, and `vercel.json` settings that all point to Node 24.

### WalletConnect QR Setup

To enable QR code wallet connections on Vercel:

1. Create a WalletConnect Project ID from the WalletConnect/Reown Cloud dashboard.
2. In Vercel, open the project settings and add this environment variable:
```bash
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```
3. Redeploy the project.

Direct browser wallet connections work through installed EVM extensions such as MetaMask, Coinbase Wallet, Rabby, and Trust Wallet. QR/mobile wallet connections use WalletConnect.
