import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x394b57F4a40ff31530d66f904e1Db2C6516c018F';
const TARGET_CHAIN_ID = 137;
const CHAIN_HEX = '0x89';
const POLYGON_RPC_URLS = [
  'https://polygon-rpc.com/',
  'https://rpc-mainnet.matic.quiknode.pro/',
  'https://rpc.ankr.com/polygon',
];
const POLYGON_RPC_URL = POLYGON_RPC_URLS[0];
const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

const CONTRACT_ABI = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
  {"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},
  {"inputs":[],"name":"tokensPerMatic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"stakedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"}
];

// ── helpers ──────────────────────────────────────────────────────────────────
function shortAddr(addr) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';
}
function fmt(val, dec = 18, digits = 2) {
  try {
    const s = ethers.formatUnits(val, dec); // e.g. "1000000000.0"
    const [intPart, fracPart = ''] = s.split('.');
    // Format the integer part with locale commas
    const intFormatted = BigInt(intPart).toLocaleString();
    // Trim fractional digits
    const frac = fracPart.slice(0, digits).replace(/0+$/, '');
    return frac ? `${intFormatted}.${frac}` : intFormatted;
  } catch { return '0'; }
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconCoin = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="url(#coinGrad)" stroke="#B8860B" strokeWidth="1.5"/>
    <circle cx="32" cy="32" r="24" fill="none" stroke="#FFD700" strokeWidth="0.8" opacity="0.5"/>
    <text x="32" y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0A0A0A" fontFamily="Cinzel,serif">W</text>
    <defs>
      <radialGradient id="coinGrad" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="60%" stopColor="#D4AF37"/>
        <stop offset="100%" stopColor="#8B6914"/>
      </radialGradient>
    </defs>
  </svg>
);

const IconFire = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 7 7 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.5 15.5 7.5 14 6C14 8 13 9 12 9C12 7 12 4 12 2Z" fill="#FF6B35"/>
    <path d="M12 17C10.34 17 9 15.66 9 14C9 12.5 10 11.5 11 11C11 12 11.5 13 12 13C12.5 13 13 12 13 11C14 11.5 15 12.5 15 14C15 15.66 13.66 17 12 17Z" fill="#FFD700"/>
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="11" width="14" height="10" rx="2" fill="#D4AF37"/>
    <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11" stroke="#D4AF37" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="16" r="1.5" fill="#0A0A0A"/>
  </svg>
);

const IconCross = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 3H13V10H20V12H13V21H11V12H4V10H11V3Z" fill="#D4AF37"/>
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="3,17 8,12 13,15 21,7" stroke="#00C853" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <polyline points="17,7 21,7 21,11" stroke="#00C853" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#D4AF37" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

const IconPolygon = () => (
  <svg viewBox="0 0 38 33" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.5 9.5L19 4L9.5 9.5V20.5L19 26L28.5 20.5V9.5Z" fill="#8247E5"/>
    <path d="M19 4L28.5 9.5L24 12.25L19 9.5L14 12.25L9.5 9.5L19 4Z" fill="#A670EF" opacity="0.8"/>
  </svg>
);

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map(t => (
        <div key={t.id} className={`px-4 py-3 rounded-xl text-sm font-medium shadow-2xl border backdrop-blur-sm transition-all duration-300 ${
          t.type === 'success' ? 'bg-emerald-900/90 border-[#00C853]/40 text-[#00C853]' :
          t.type === 'error' ? 'bg-red-900/90 border-red-500/40 text-red-300' :
          'bg-[#1a1a1a]/90 border-[#D4AF37]/40 text-[#D4AF37]'
        }`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function ConnectWalletModal({ open, connectingMethod, hasWalletConnectProject, onClose, onConnectInjected, onConnectWalletConnect }) {
  if (!open) return null;

  const isConnecting = Boolean(connectingMethod);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close wallet connection options"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-[#D4AF37]/25 bg-[#111111] p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-1">Connect Wallet</div>
            <h2 className="text-white text-xl font-bold">Choose connection method</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost w-9 h-9 rounded-lg text-lg leading-none"
            aria-label="Close"
          >
            x
          </button>
        </div>

        <div className="grid gap-3">
          <button
            type="button"
            onClick={onConnectInjected}
            disabled={isConnecting}
            className="connect-option"
          >
            <span className="connect-option-icon">WEB</span>
            <span className="text-left">
              <span className="block text-white font-semibold">Browser Wallet</span>
              <span className="block text-white/45 text-xs mt-0.5">MetaMask, Coinbase Wallet, Rabby, Trust Wallet</span>
            </span>
            {connectingMethod === 'injected' && <span className="connect-spinner" />}
          </button>

          <button
            type="button"
            onClick={onConnectWalletConnect}
            disabled={isConnecting || !hasWalletConnectProject}
            className={`connect-option ${!hasWalletConnectProject ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <span className="connect-option-icon">QR</span>
            <span className="text-left">
              <span className="block text-white font-semibold">WalletConnect QR</span>
              <span className="block text-white/45 text-xs mt-0.5">Scan with a mobile wallet or open a wallet app</span>
            </span>
            {connectingMethod === 'walletconnect' && <span className="connect-spinner" />}
          </button>
        </div>

        {!hasWalletConnectProject && (
          <p className="mt-4 rounded-xl border border-red-500/25 bg-red-950/30 px-3 py-2 text-xs text-red-200">
            Add VITE_WALLETCONNECT_PROJECT_ID in Vercel to enable QR connections.
          </p>
        )}
      </div>
    </div>
  );
}

function Navbar({ account, chainId, onConnect, onDisconnect, onSwitch }) {
  const wrongNetwork = account && chainId !== TARGET_CHAIN_ID;
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#D4AF37]/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8"><IconCoin /></div>
          <span className="font-display text-lg font-semibold gold-text">WealthCoin</span>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#8247E5]/20 bg-[#8247E5]/10 px-3 py-1.5 shadow-[0_0_20px_rgba(130,71,229,0.12)]">
            <div className="w-4 h-4"><IconPolygon /></div>
            <span className="text-[#A670EF] text-xs font-medium tracking-wide">Polygon</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {account ? (
            <>
              {wrongNetwork ? (
                <button onClick={onSwitch} className="btn-danger text-xs px-3 py-1.5 rounded-lg">
                  ⚠ Switch to Polygon
                </button>
              ) : (
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#D4AF37]/70 bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse"></span>
                  {shortAddr(account)}
                </span>
              )}
              <button onClick={onDisconnect} className="btn-ghost text-xs px-3 py-1.5 rounded-lg">
                Disconnect
              </button>
            </>
          ) : (
            <button onClick={onConnect} className="btn-gold px-4 py-1.5 rounded-lg text-sm font-semibold">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ account, onConnect }) {
  const scriptures = [
    {
      text: "For God so loved the world that He gave His only begotten Son, that whosoever believes in Him should not perish but have eternal life.",
      ref: 'John 3:16',
    },
    {
      text: "The Lord is my shepherd; I shall not want.",
      ref: 'Psalm 23:1',
    },
    {
      text: "Trust in the Lord with all your heart and lean not on your own understanding.",
      ref: 'Proverbs 3:5',
    },
    {
      text: "And we know that all things work together for good to those who love God.",
      ref: 'Romans 8:28',
    },
    {
      text: "For the Lord, the Holy God of Israel, says, 'The jar of meal will not run out, and the jar of oil will not fail, until that day that the Lord sends rain.'",
      ref: '1 Kings 17:14',
    },
    {
      text: "This plan, which God will complete when the time is right, is to bring all creation together, everything in heaven and on earth, with Christ as head.",
      ref: 'Ephesians 1:10',
    },
  ];

  const [scriptureIndex, setScriptureIndex] = useState(0);
  const [showScripture, setShowScripture] = useState(true);

  useEffect(() => {
    let fadeTimeout;
    const cycleScripture = () => {
      setShowScripture(false);
      fadeTimeout = setTimeout(() => {
        setScriptureIndex(prev => (prev + 1) % scriptures.length);
        setShowScripture(true);
      }, 750);
    };

    const interval = setInterval(cycleScripture, 7500);
    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [scriptures.length]);

  const scripture = scriptures[scriptureIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 hero-bg"></div>
      <div className="absolute inset-0 grid-overlay opacity-10"></div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#D4AF37]/5 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#00C853]/5 blur-3xl animate-pulse" style={{animationDelay:'1s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-[#D4AF37]/8 blur-2xl animate-pulse" style={{animationDelay:'2s'}}></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Coin */}
        <div className="w-28 h-28 mx-auto mb-8 animate-float drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
          <IconCoin />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8247E5]/10 border border-[#8247E5]/30 text-[#A670EF] text-xs font-medium mb-6 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8247E5] animate-pulse"></span>
          Live on Polygon Network
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4">
          <span className="gold-text-shimmer">Build Generational</span>
          <br />
          <span className="text-white">Wealth</span>
        </h1>

        <p className="text-[#D4AF37]/70 text-base sm:text-lg md:text-xl mb-4 font-light tracking-wide">
          Rooted in Faith — Powered by Blockchain
        </p>

        <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          WealthCoin (WTC) is a faith-based, long-term wealth asset built on Polygon.
          Earn staking rewards, benefit from scheduled burns, and join a Christian community
          committed to financial stewardship.
        </p>

        {/* Scripture */}
        <div className="mb-8 max-w-2xl mx-auto">
          <p className={`text-white/70 text-base sm:text-lg italic text-center leading-relaxed animate-scripture ${showScripture ? 'scripture-visible' : 'scripture-hidden'}`}>
            "{scripture.text}"
            <span className="block mt-1 text-white/40 text-sm">— {scripture.ref}</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!account ? (
            <button onClick={onConnect} className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold animate-pulse-gold">
              Connect Wallet to Start
            </button>
          ) : (
            <a href="#buy" className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold">
              Buy WTC Now
            </a>
          )}
          <a href="#about" className="btn-ghost px-8 py-3.5 rounded-xl text-base font-semibold">
            Learn More ↓
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { label: 'Network', val: 'Polygon' },
            { label: 'Token', val: 'WTC' },
            { label: 'Total Supply', val: '7.5B' },
            { label: 'Moon Goal', val: '$0.75' },
          ].map(s => (
            <div key={s.label} className="card-glass p-3 rounded-xl text-center">
              <div className="text-[#D4AF37] font-bold text-sm">{s.val}</div>
              <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 text-xs">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37]/40 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}

// ── Wallet Panel ──────────────────────────────────────────────────────────────
function WalletPanel({ account, maticBalance, wlthBalance, stakedBal, pendingRew, chainId, onConnect, onSwitch }) {
  const wrongNetwork = account && chainId !== TARGET_CHAIN_ID;
  if (!account) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="card-gold p-5 rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
              <span className="text-[#D4AF37] font-bold text-sm">WTC</span>
            </div>
            <div>
              <div className="text-white/50 text-xs">Connected Wallet</div>
              <div className="text-[#D4AF37] font-mono text-sm font-medium">{shortAddr(account)}</div>
            </div>
          </div>
          {wrongNetwork && (
            <button onClick={onSwitch} className="btn-danger px-4 py-2 rounded-lg text-sm font-semibold">
              ⚠ Switch to Polygon
            </button>
          )}
          <div className="flex flex-wrap gap-6">
            <Stat label="POL Balance" value={Number(maticBalance).toFixed(4)} unit="POL" color="white" />
            <Stat label="WTC Balance" value={wlthBalance} unit="WTC" color="gold" />
            <Stat label="Staked" value={stakedBal} unit="WTC" color="green" />
            <Stat label="Pending Rewards" value={pendingRew} unit="WTC" color="green" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, unit, color }) {
  const c = color === 'gold' ? 'text-[#FFD700]' : color === 'green' ? 'text-[#00C853]' : 'text-white';
  return (
    <div>
      <div className="text-white/40 text-xs mb-0.5">{label}</div>
      <div className={`${c} font-bold text-sm`}>{value} <span className="text-white/30 font-normal text-xs">{unit}</span></div>
    </div>
  );
}

// ── Buy Section ───────────────────────────────────────────────────────────────
function BuySection({ account, chainId, tokensPerMatic, totalSupply, addToast, onConnect }) {
  const [maticAmt, setMaticAmt] = useState('');
  const [loading, setLoading] = useState(false);
  const wrongNetwork = account && chainId !== TARGET_CHAIN_ID;

  const estimated = maticAmt && tokensPerMatic
    ? (parseFloat(maticAmt) * Number(tokensPerMatic)).toLocaleString()
    : '0';

  async function handleBuy() {
    if (!maticAmt || parseFloat(maticAmt) <= 0) { addToast('Enter a valid POL amount', 'error'); return; }
    const maticValue = parseFloat(maticAmt);
    const maticBal = parseFloat(maticBalance);
    if (maticValue > maticBal) { addToast(`Insufficient POL balance. You have ${maticBal.toFixed(4)} POL`, 'error'); return; }
    setLoading(true);
    try {
      const rawProvider = window.__qdapp_getProvider ? await window.__qdapp_getProvider() : window.ethereum;
      const provider = new ethers.BrowserProvider(rawProvider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const value = ethers.parseEther(maticAmt);
      addToast('Confirm transaction in wallet…', 'info');
      const tx = await contract.buy({ value });
      addToast(`Transaction submitted: ${shortAddr(tx.hash)}`, 'info');
      await tx.wait();
      addToast(`Successfully purchased WTC! TX: ${shortAddr(tx.hash)}`, 'success');
      setMaticAmt('');
      await loadContractData(account);
    } catch (e) {
      if (e?.code === 'INSUFFICIENT_FUNDS') {
        addToast('Insufficient gas funds to complete transaction', 'error');
      } else if (e?.reason) {
        addToast(`Transaction failed: ${e.reason}`, 'error');
      } else {
        addToast(e?.message || 'Transaction failed', 'error');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="buy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionLabel>Purchase</SectionLabel>
      <h2 className="section-title mb-12">Buy <span className="gold-text">WTC</span> with POL</h2>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Buy card */}
        <div className="card-glass p-8 rounded-2xl border border-[#D4AF37]/20">
          <h3 className="text-white font-semibold text-lg mb-6">Purchase WealthCoin</h3>

          <div className="space-y-4">
            <div>
              <label className="text-white/50 text-xs mb-2 block uppercase tracking-wider">Amount (POL)</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={maticAmt}
                  onChange={e => setMaticAmt(e.target.value)}
                  placeholder="0.0"
                  className="input-gold w-full pr-20"
                />
  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 text-sm font-medium">POL</span>
              </div>
            </div>

            {/* Estimated output */}
            <div className="bg-[#00C853]/5 border border-[#00C853]/20 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-sm">You receive (estimated)</span>
                <span className="text-[#00C853] font-bold text-lg">{estimated} <span className="text-sm font-normal">WTC</span></span>
              </div>
              {tokensPerMatic && (
                <div className="text-white/30 text-xs mt-1">Rate: 1 POL = {Number(tokensPerMatic).toLocaleString()} WTC</div>
              )}
            </div>

            {/* Quick amounts */}
            <div className="flex gap-2 flex-wrap">
{['10', '100', '500', '1000'].map(v => (
                <button key={v} onClick={() => setMaticAmt(v)}
                  className="px-3 py-1.5 rounded-lg text-xs border border-[#D4AF37]/20 text-[#D4AF37]/60 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-all">
                  {v} POL
                </button>
              ))}
            </div>

            {!account ? (
              <button onClick={onConnect} className="btn-gold w-full py-3.5 rounded-xl font-bold text-base">
                Connect Wallet to Buy
              </button>
            ) : wrongNetwork ? (
              <button disabled className="btn-disabled w-full py-3.5 rounded-xl font-bold text-base">
                Switch to Polygon First
              </button>
            ) : (
              <button onClick={handleBuy} disabled={loading}
                className={`w-full py-3.5 rounded-xl font-bold text-base transition-all ${loading ? 'btn-disabled' : 'btn-green'}`}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing…
                  </span>
                ) : 'Buy WTC Now'}
              </button>
            )}
          </div>
        </div>

        {/* Info cards */}
        <div className="space-y-4">
          <div className="card-glass p-5 rounded-2xl border border-[#D4AF37]/20">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Total Supply</div>
            <div className="text-[#FFD700] font-bold text-2xl">{totalSupply || '7,500,000,000'}</div>
            <div className="text-white/30 text-xs mt-0.5">WTC tokens (7.5 billion)</div>
          </div>
          <div className="card-glass p-5 rounded-2xl border border-[#00C853]/20">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-1">🌙 Moon Goal</div>
            <div className="text-[#00C853] font-bold text-2xl">$0.75</div>
            <div className="text-white/30 text-xs mt-0.5">per WTC — $5.625B market cap</div>
          </div>
          <div className="card-glass p-5 rounded-2xl border border-[#D4AF37]/20">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Exchange Rate</div>
            <div className="text-[#FFD700] font-bold text-2xl">
              {tokensPerMatic ? `${Number(tokensPerMatic).toLocaleString()}` : '—'}
            </div>
            <div className="text-white/30 text-xs mt-0.5">WTC per 1 POL</div>
          </div>
          <div className="card-glass p-5 rounded-2xl border border-[#D4AF37]/20">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-3">Why Buy WTC?</div>
            <ul className="space-y-2">
              {['Deflationary — scheduled token burns', 'Staking rewards for holders', 'Team tokens time-locked', 'Faith-based, community-driven'].map(item => (
                <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  const pillars = [
    {
      icon: <IconFire />,
      title: 'Scheduled Burns',
      desc: 'Regular, pre-scheduled token burns permanently reduce the circulating supply — creating built-in deflationary pressure that increases the value of every WTC you hold.',
      color: '#FF6B35',
    },
    {
      icon: <IconLock />,
      title: 'Team Coin Locks',
      desc: 'All team and founder tokens are time-locked in smart contracts. This ensures long-term commitment, eliminates the risk of insider dumps, and aligns leadership with community success.',
      color: '#D4AF37',
    },
    {
      icon: <IconCross />,
      title: 'Christian Community',
      desc: 'WealthCoin is built for and governed by a faith-based community rooted in Biblical principles of stewardship, integrity, and generosity. Finance meets faith in a trustworthy ecosystem.',
      color: '#D4AF37',
    },
    {
      icon: <IconChart />,
      title: 'Consistent Marketing',
      desc: 'A dedicated, funded marketing strategy drives continuous growth. From social campaigns to partnerships, WealthCoin maintains visibility and momentum in the DeFi space.',
      color: '#00C853',
    },
    {
      icon: <IconStar />,
      title: 'Staking Rewards',
      desc: 'Stake your WTC to earn passive income. Rewards are distributed to long-term holders who believe in the mission — turning your holdings into a growing wealth engine.',
      color: '#D4AF37',
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionLabel>About</SectionLabel>
      <h2 className="section-title mb-6">What is <span className="gold-text">WealthCoin?</span></h2>
      <p className="text-white/50 text-base sm:text-lg max-w-3xl mx-auto text-center mb-16 leading-relaxed">
        WealthCoin (WTC) is a long-term wealth-building digital asset deployed on the Polygon blockchain.
        Combining faith-based values with cutting-edge DeFi technology, it offers a transparent, community-governed
        ecosystem designed for generational wealth creation.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <div key={i} className="card-glass p-6 rounded-2xl border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
              style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
              {p.icon}
            </div>
            <h3 className="text-white font-semibold text-base mb-2">{p.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
        {/* Sixth card — vision */}
        <div className="card-gold-glow p-6 rounded-2xl sm:col-span-2 lg:col-span-1">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#D4AF37]/20 border border-[#D4AF37]/40">
            <span className="text-2xl">✦</span>
          </div>
          <h3 className="text-[#FFD700] font-semibold text-base mb-2">Our Vision</h3>
          <p className="text-[#D4AF37]/70 text-sm leading-relaxed">
            To create the world's most trusted faith-based cryptocurrency — a beacon of financial freedom, 
            transparency, and community stewardship for generations to come.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Community Resources Section ───────────────────────────────────────────────
function CommunityResourcesSection() {
  const resources = [
    {
      title: 'Weekly Devotional',
      desc: 'Gather as a community each week for devotional teaching, prayer, and spiritual encouragement.',
    },
    {
      title: 'Financial Discipleship',
      desc: 'Access free DeFi basics and wealth stewardship courses built for biblical financial growth.',
    },
    {
      title: 'Ambassador Program',
      desc: 'Share your referral code, grow the network, and earn WTC rewards for every new member you bring in.',
    },
    {
      title: 'Staking Competitions',
      desc: 'Join friendly contests that reward active, long-term holders and strengthen community engagement.',
    },
    {
      title: 'Social Media & Support',
      desc: 'Stay connected with dedicated community channels, updates, and responsive customer support.',
    },
    {
      title: 'And Much More',
      desc: 'Future benefits, events, and new initiatives are coming for holders who stay committed.',
    },
  ];

  return (
    <section id="community" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionLabel>Community</SectionLabel>
      <h2 className="section-title mb-6">Long-Term Support for Holders</h2>
      <p className="text-white/40 text-base text-center max-w-3xl mx-auto mb-12 leading-relaxed">
        WealthCoin is more than a token — it is a movement designed to equip holders with resources,
        relationships, and rewards that empower faith-based financial growth. All of this is planned to be delivered remotely so our community can connect from anywhere in the world.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((item, index) => (
          <div key={index} className="card-glass p-6 rounded-3xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/20 transition-all duration-300">
            <div className="text-[#D4AF37] font-semibold text-sm uppercase tracking-widest mb-4">
              {item.title}
            </div>
            <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Staking Section ───────────────────────────────────────────────────────────
function StakingSection({ account, chainId, wlthBalance, stakedBal, pendingRew, totalStaked, addToast, onConnect }) {
  const [stakeAmt, setStakeAmt] = useState('');
  const [unstakeAmt, setUnstakeAmt] = useState('');
  const [loadingStake, setLoadingStake] = useState(false);
  const [loadingUnstake, setLoadingUnstake] = useState(false);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const wrongNetwork = account && chainId !== TARGET_CHAIN_ID;

  async function execTx(fn, setLoading, successMsg) {
    setLoading(true);
    try {
      const rawProvider = window.__qdapp_getProvider ? await window.__qdapp_getProvider() : window.ethereum;
      const provider = new ethers.BrowserProvider(rawProvider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      addToast('Confirm transaction in wallet…', 'info');
      const tx = await fn(contract);
      addToast(`Transaction submitted: ${shortAddr(tx.hash)}`, 'info');
      await tx.wait();
      addToast(successMsg, 'success');
      await loadContractData(account);
    } catch (e) {
      if (e?.reason?.includes('insufficient')) {
        addToast('Insufficient balance or allowance', 'error');
      } else if (e?.reason) {
        addToast(`Transaction failed: ${e.reason}`, 'error');
      } else {
        addToast(e?.message || 'Transaction failed', 'error');
      }
    } finally {
      setLoading(false);
    }
  }

  const handleApprove = async (amount) => {
    try {
      const rawProvider = window.__qdapp_getProvider ? await window.__qdapp_getProvider() : window.ethereum;
      const provider = new ethers.BrowserProvider(rawProvider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      addToast('Confirm approval in wallet…', 'info');
      const tx = await contract.approve(CONTRACT_ADDRESS, ethers.parseUnits(amount, 18));
      addToast(`Approval submitted: ${shortAddr(tx.hash)}`, 'info');
      await tx.wait();
      addToast('Token approval successful!', 'success');
      await loadContractData(account);
    } catch (e) {
      addToast(e?.reason || e?.message || 'Approval failed', 'error');
    }
  }

  const handleStake = () => {
    if (!stakeAmt || parseFloat(stakeAmt) <= 0) { addToast('Enter stake amount', 'error'); return; }
    const stakeValue = parseFloat(stakeAmt);
    const wtcBal = parseFloat(wlthBalance);
    if (stakeValue > wtcBal) { addToast(`Insufficient WTC balance. You have ${wtcBal.toFixed(4)} WTC`, 'error'); return; }
    const requiredAllowance = ethers.parseUnits(stakeAmt, 18);
    if (BigInt(allowance) < requiredAllowance) {
      addToast('Approval required. Click "Approve" first.', 'error');
      return;
    }
    execTx(c => c.stake(ethers.parseUnits(stakeAmt, 18)), setLoadingStake, `Staked ${stakeAmt} WTC successfully!`);
  };

  const handleUnstake = () => {
    if (!unstakeAmt || parseFloat(unstakeAmt) <= 0) { addToast('Enter unstake amount', 'error'); return; }
    const unstakeValue = parseFloat(unstakeAmt);
    const stakedValue = parseFloat(stakedBal);
    if (unstakeValue > stakedValue) { addToast(`Insufficient staked balance. You have ${stakedValue.toFixed(4)} WTC staked`, 'error'); return; }
    execTx(c => c.unstake(ethers.parseUnits(unstakeAmt, 18)), setLoadingUnstake, `Unstaked ${unstakeAmt} WTC successfully!`);
  };

  const handleClaim = () => {
    execTx(c => c.claimRewards(), setLoadingClaim, 'Rewards claimed successfully!');
  };

  const benefits = [
    'Earn passive income on your WTC holdings',
    'Governance rights in community decisions',
    'Priority access to new WealthCoin features',
    'Reduced transaction fees for stakers',
  ];

  return (
    <section id="staking" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionLabel>Earn</SectionLabel>
      <h2 className="section-title mb-4">Staking <span className="gold-text">Rewards</span></h2>
      <p className="text-white/40 text-base text-center max-w-2xl mx-auto mb-14">
        Stake your WTC tokens to earn passive rewards. The longer you hold, the more you earn.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'APY (Est.)', value: '10.5%', color: '#00C853' },
          { label: 'Total Staked', value: totalStaked || '—', unit: 'WTC', color: '#D4AF37' },
          { label: 'Your Stake', value: stakedBal || '—', unit: 'WTC', color: '#D4AF37' },
          { label: 'Pending Rewards', value: pendingRew || '—', unit: 'WTC', color: '#00C853' },
        ].map(s => (
          <div key={s.label} className="card-glass p-5 rounded-2xl border border-[#D4AF37]/15 text-center">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-2">{s.label}</div>
            <div className="font-bold text-xl" style={{ color: s.color }}>{s.value}</div>
            {s.unit && <div className="text-white/30 text-xs mt-0.5">{s.unit}</div>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Stake / Unstake */}
        <div className="card-glass p-8 rounded-2xl border border-[#D4AF37]/20 space-y-6">
          <h3 className="text-white font-semibold text-lg">Stake & Unstake</h3>

          {/* Stake */}
          <div className="space-y-3">
            <label className="text-white/50 text-xs uppercase tracking-wider block">Stake Amount</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input type="number" min="0" step="1" value={stakeAmt} onChange={e => setStakeAmt(e.target.value)}
                  placeholder="0.0" className="input-gold w-full pr-16" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 text-xs">WTC</span>
              </div>
              {account && !wrongNetwork ? (
                <button onClick={handleStake} disabled={loadingStake}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0 transition-all ${loadingStake ? 'btn-disabled' : 'btn-gold'}`}>
                  {loadingStake ? <span className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin inline-block"></span> : 'Stake'}
                </button>
              ) : (
                <button onClick={onConnect} className="btn-gold px-5 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0">
                  {account ? 'Wrong Net' : 'Connect'}
                </button>
              )}
            </div>
            {stakeAmt && account && !wrongNetwork && BigInt(allowance) < ethers.parseUnits(stakeAmt, 18) && (
              <button onClick={() => handleApprove(stakeAmt)} className="btn-ghost w-full py-2 rounded-lg text-xs">
                ⚠ Approve {stakeAmt} WTC First
              </button>
            )}
          </div>

          {/* Unstake */}
          <div className="space-y-3">
            <label className="text-white/50 text-xs uppercase tracking-wider block">Unstake Amount</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input type="number" min="0" step="1" value={unstakeAmt} onChange={e => setUnstakeAmt(e.target.value)}
                  placeholder="0.0" className="input-gold w-full pr-16" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 text-xs">WTC</span>
              </div>
              {account && !wrongNetwork ? (
                <button onClick={handleUnstake} disabled={loadingUnstake}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0 transition-all ${loadingUnstake ? 'btn-disabled' : 'btn-ghost'}`}>
                  {loadingUnstake ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span> : 'Unstake'}
                </button>
              ) : (
                <button disabled className="btn-disabled px-5 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0">Unstake</button>
              )}
            </div>
          </div>

          {/* Claim */}
          <div className="pt-2 border-t border-[#D4AF37]/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/50 text-sm">Claimable Rewards</span>
              <span className="text-[#00C853] font-bold">{pendingRew || '0'} <span className="text-white/30 text-xs font-normal">WTC</span></span>
            </div>
            {account && !wrongNetwork ? (
              <button onClick={handleClaim} disabled={loadingClaim}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${loadingClaim ? 'btn-disabled' : 'btn-green'}`}>
                {loadingClaim ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Claiming…
                  </span>
                ) : 'Claim Rewards'}
              </button>
            ) : (
              <button onClick={onConnect} className="btn-green w-full py-3 rounded-xl font-semibold text-sm">
                {account ? 'Switch Network' : 'Connect to Claim'}
              </button>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          <div className="card-glass p-6 rounded-2xl border border-[#00C853]/20">
            <h3 className="text-white font-semibold text-base mb-4">Staking Benefits</h3>
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#00C853]/20 border border-[#00C853]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#00C853] text-xs">✓</span>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-glass p-5 rounded-2xl border border-[#D4AF37]/15">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📖</span>
              <div>
                <div className="text-[#D4AF37] font-semibold text-sm mb-1">Stewardship Principle</div>
                <p className="text-white/40 text-xs leading-relaxed">
                  "Wealth gained hastily will dwindle, but whoever gathers little by little will increase it." 
                  — Proverbs 13:11. WealthCoin rewards patient, faithful stewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Tokenomics ────────────────────────────────────────────────────────────────
function TokenomicsSection() {
  const allocations = [
    { label: 'Public Sale', pct: 30, color: '#D4AF37', desc: 'Allocated for community purchase and market access' },
    { label: 'Staking Rewards', pct: 20, color: '#00C853', desc: 'Distributed to long-term holders and stakers' },
    { label: 'Team (Locked)', pct: 10, color: '#B8860B', desc: 'Time-locked for accountability and trust' },
    { label: 'Marketing', pct: 5, color: '#FFD700', desc: 'Lean growth and awareness funding' },
    { label: 'Burns Reserve', pct: 20, color: '#FF6B35', desc: 'Deflationary reserve to protect token value' },
    { label: 'Missionaries & Donations', pct: 15, color: '#8B5CF6', desc: 'Support faith-driven initiatives and outreach' },
  ];

  return (
    <section id="tokenomics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionLabel>Tokenomics</SectionLabel>
      <h2 className="section-title mb-4">Strategic <span className="gold-text">Allocation</span></h2>
      <p className="text-white/40 text-base text-center max-w-2xl mx-auto mb-6">
        Designed for sustainable growth, community stewardship, and meaningful impact through missionary support and long-term value preservation.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14">
        <div className="card-glass px-6 py-4 rounded-2xl border border-[#D4AF37]/20 text-center">
          <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Total Supply</div>
          <div className="text-[#FFD700] font-bold text-2xl">7,500,000,000</div>
          <div className="text-white/30 text-xs mt-0.5">7.5 Billion WTC</div>
        </div>
        <div className="card-glass px-6 py-4 rounded-2xl border border-[#00C853]/20 text-center">
          <div className="text-white/40 text-xs uppercase tracking-wider mb-1">🌙 Moon Goal</div>
          <div className="text-[#00C853] font-bold text-2xl">$0.75 <span className="text-sm font-normal text-white/40">/ WTC</span></div>
          <div className="text-white/30 text-xs mt-0.5">$5.625B fully diluted market cap</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {allocations.map((a, i) => (
          <div key={i} className="card-glass p-6 rounded-3xl border border-white/10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ borderColor: `${a.color}30` }}>
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#1E1E1E" strokeWidth="8"/>
                <circle cx="40" cy="40" r="32" fill="none" stroke={a.color} strokeWidth="8"
                  strokeDasharray={`${a.pct * 2.01} ${201 - a.pct * 2.01}`}
                  strokeLinecap="round" opacity="0.95"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-lg" style={{ color: a.color }}>{a.pct}%</span>
              </div>
            </div>
            <div className="text-white font-semibold text-sm mb-2">{a.label}</div>
            <div className="text-white/35 text-xs leading-relaxed">{a.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ addToast }) {
  function copyAddr() {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    addToast('Contract address copied!', 'success');
  }

  return (
    <footer className="border-t border-[#D4AF37]/10 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7"><IconCoin /></div>
              <span className="font-display text-base font-semibold gold-text">WealthCoin</span>
            </div>
            <p className="text-white/30 text-xs leading-relaxed max-w-xs">
              Build generational wealth rooted in faith. WealthCoin (WTC) — the Christian community's 
              long-term DeFi asset on Polygon.
            </p>
          </div>

          {/* Contract */}
          <div>
            <div className="text-white/40 text-xs uppercase tracking-wider mb-3">Contract Address</div>
            <div className="flex items-center gap-2">
              <code className="text-[#D4AF37]/70 text-xs font-mono bg-[#D4AF37]/5 px-3 py-1.5 rounded-lg border border-[#D4AF37]/15 truncate max-w-[180px]">
                {CONTRACT_ADDRESS}
              </code>
              <button onClick={copyAddr}
                className="p-1.5 rounded-lg border border-[#D4AF37]/20 text-[#D4AF37]/50 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all text-xs">
                ⧉
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-white/40 text-xs uppercase tracking-wider mb-3">Community</div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Whitepaper', href: '#' },
                { label: 'Twitter / X', href: '#' },
                { label: 'Telegram', href: '#' },
                { label: 'Community', href: '#community' },
              ].map(l => (
                <a key={l.label} href={l.href}
                  className="text-white/40 hover:text-[#D4AF37] text-xs transition-colors px-3 py-1.5 rounded-lg border border-white/5 hover:border-[#D4AF37]/30">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© 2024 WealthCoin. All rights reserved.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8247E5]/10 border border-[#8247E5]/20">
            <IconPolygon />
            <span className="text-[#8247E5] text-xs font-medium">Powered by Polygon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="h-px w-8 bg-[#D4AF37]/30"></div>
      <span className="text-[#D4AF37]/60 text-xs uppercase tracking-widest font-medium">{children}</span>
      <div className="h-px w-8 bg-[#D4AF37]/30"></div>
    </div>
  );
}

function getEvmProviders() {
  if (typeof window === 'undefined') return [];
  const injected = window.ethereum;
  const providers = [];

  if (injected) providers.push(injected);
  if (Array.isArray(injected?.providers)) providers.push(...injected.providers);

  return providers.filter((provider, index, self) => {
    if (!provider) return false;
    const key = `${provider?.isMetaMask ? 'metamask' : ''}${provider?.isCoinbaseWallet ? 'coinbase' : ''}${provider?.isTrust ? 'trust' : ''}${provider?.isRabby ? 'rabby' : ''}${provider?.uuid || provider?.chainId || ''}`;
    return self.findIndex(candidate => `${candidate?.isMetaMask ? 'metamask' : ''}${candidate?.isCoinbaseWallet ? 'coinbase' : ''}${candidate?.isTrust ? 'trust' : ''}${candidate?.isRabby ? 'rabby' : ''}${candidate?.uuid || candidate?.chainId || ''}` === key) === index;
  });
}

function getPreferredProvider() {
  const providers = getEvmProviders();
  if (!providers.length) return null;

  return providers.find(provider => provider?.isMetaMask) ||
    providers.find(provider => provider?.isCoinbaseWallet) ||
    providers.find(provider => provider?.isTrust) ||
    providers.find(provider => provider?.isRabby) ||
    providers[0];
}

// ── Main App ──────────────────────────────────────────────────────────────────
async function createWalletConnectProvider() {
  if (!WALLETCONNECT_PROJECT_ID) {
    throw new Error('WalletConnect is not configured. Add VITE_WALLETCONNECT_PROJECT_ID in Vercel.');
  }

  const { default: EthereumProvider } = await import('@walletconnect/ethereum-provider');
  return EthereumProvider.init({
    projectId: WALLETCONNECT_PROJECT_ID,
    chains: [TARGET_CHAIN_ID],
    optionalChains: [TARGET_CHAIN_ID],
    showQrModal: true,
    rpcMap: {
      [TARGET_CHAIN_ID]: POLYGON_RPC_URL,
    },
    metadata: {
      name: 'WealthCoin',
      description: 'WealthCoin DApp on Polygon',
      url: window.location.origin,
      icons: [`${window.location.origin}/preview.png`],
    },
  });
}

export default function App() {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [maticBalance, setMaticBalance] = useState('0');
  const [wlthBalance, setWlthBalance] = useState('0');
  const [stakedBal, setStakedBal] = useState('0');
  const [pendingRew, setPendingRew] = useState('0');
  const [totalStaked, setTotalStaked] = useState('0');
  const [totalSupply, setTotalSupply] = useState('');
  const [tokensPerMatic, setTokensPerMatic] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [allowance, setAllowance] = useState('0');
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [connectingMethod, setConnectingMethod] = useState(null);
  const providerRef = useRef(null);
  const walletConnectProviderRef = useRef(null);

  const addToast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    globalThis.setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  }, []);

  const loadContractData = useCallback(async (addr) => {
    // Try each RPC in order until one succeeds
    let lastError;
    for (const rpcUrl of POLYGON_RPC_URLS) {
      try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        const queries = [
          contract.totalSupply(),
          contract.tokensPerMatic(),
          addr ? contract.balanceOf(addr) : Promise.resolve(0n),
          addr ? contract.stakedBalance(addr) : Promise.resolve(0n),
          addr ? contract.pendingRewards(addr) : Promise.resolve(0n),
          contract.totalStaked(),
          addr ? provider.getBalance(addr) : Promise.resolve(0n),
        ];
        if (addr) queries.push(contract.allowance(addr, CONTRACT_ADDRESS));

        const results = await Promise.allSettled(queries);
        const [ts, tpm, bal, staked, rewards, totalS, maticBal, allowanceData] = results;

        // Log any individual call failures to help diagnose issues
        results.forEach((r, i) => {
          if (r.status === 'rejected') console.warn(`Contract query[${i}] failed (${rpcUrl}):`, r.reason);
        });

        if (ts.status === 'fulfilled') setTotalSupply(fmt(ts.value));
        if (tpm.status === 'fulfilled') setTokensPerMatic(tpm.value);
        if (totalS.status === 'fulfilled') setTotalStaked(fmt(totalS.value));
        // Only update per-address state when we actually have an address —
        // a null-address call resolves these to 0n and must not overwrite real balances.
        if (addr) {
          if (bal.status === 'fulfilled') { console.log('WTC balance raw:', bal.value.toString()); setWlthBalance(fmt(bal.value)); }
          if (staked.status === 'fulfilled') setStakedBal(fmt(staked.value));
          if (rewards.status === 'fulfilled') setPendingRew(fmt(rewards.value));
          if (maticBal.status === 'fulfilled') setMaticBalance(ethers.formatEther(maticBal.value));
          if (allowanceData && allowanceData.status === 'fulfilled') setAllowance(allowanceData.value.toString());
        }
        return; // success — stop trying more RPCs
      } catch (e) {
        console.warn(`RPC ${rpcUrl} failed:`, e);
        lastError = e;
      }
    }
    console.warn('All RPCs failed:', lastError);
  }, []);

  const connect = useCallback(async (method = 'injected') => {
    setConnectingMethod(method);
    try {
      let preferredProvider;

      if (method === 'walletconnect') {
        preferredProvider = walletConnectProviderRef.current || await createWalletConnectProvider();
        walletConnectProviderRef.current = preferredProvider;
        providerRef.current = preferredProvider;
        await preferredProvider.connect();
        // After WalletConnect .connect() the session is established;
        // accounts and chainId are already populated on the provider.
        const wcAccounts = preferredProvider.accounts ?? [];
        if (!wcAccounts.length) {
          addToast('No wallet account was selected.', 'error');
          return;
        }
        const wcChainId = preferredProvider.chainId ?? TARGET_CHAIN_ID;
        setAccount(wcAccounts[0]);
        setChainId(typeof wcChainId === 'string' ? parseInt(wcChainId, 16) : wcChainId);
        setConnectModalOpen(false);
        await loadContractData(wcAccounts[0]);
        return;
      } else {
        preferredProvider = getPreferredProvider();
      }

      if (!preferredProvider) {
        addToast('No compatible wallet detected. Please install MetaMask, Coinbase Wallet, Rabby, Trust Wallet, or another EVM wallet and try again.', 'error');
        return;
      }

      providerRef.current = preferredProvider;
      const accounts = await preferredProvider.request({ method: 'eth_requestAccounts' });
      if (!accounts?.length) {
        addToast('No wallet account was selected.', 'error');
        return;
      }

      const chainHex = await preferredProvider.request({ method: 'eth_chainId' });
      setAccount(accounts[0]);
      setChainId(parseInt(chainHex, 16));
      setConnectModalOpen(false);
      await loadContractData(accounts[0]);
    } catch (e) {
      if (e?.code === 4001) {
        addToast('Connection request was rejected.', 'error');
      } else {
        addToast(e?.message || 'Connection failed', 'error');
      }
    } finally {
      setConnectingMethod(null);
    }
  }, [addToast, loadContractData]);

  const disconnect = useCallback(async () => {
    try {
      await walletConnectProviderRef.current?.disconnect?.();
    } catch (e) {
      console.warn('WalletConnect disconnect warning:', e);
    }
    walletConnectProviderRef.current = null;
    providerRef.current = null;
    setAccount(null);
    setChainId(null);
    setMaticBalance('0');
    setWlthBalance('0');
    setStakedBal('0');
    setPendingRew('0');
    addToast('Wallet disconnected', 'info');
  }, [addToast]);

  const switchNetwork = useCallback(async () => {
    try {
      const rawProvider = providerRef.current || window.ethereum;
      if (!rawProvider) { 
        addToast('Wallet not connected', 'error');
        return;
      }
      await rawProvider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: CHAIN_HEX }] });
      addToast('Network switched to Polygon!', 'success');
    } catch (e) {
      if (e?.code === 4902) {
        try {
          const rawProvider = providerRef.current || window.ethereum;
          await rawProvider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: CHAIN_HEX,
              chainName: 'Polygon Mainnet',
              nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
              rpcUrls: [POLYGON_RPC_URL],
              blockExplorerUrls: ['https://polygonscan.com/'],
            }],
          });
          addToast('Polygon network added and switched!', 'success');
        } catch (addErr) {
          addToast('Failed to add Polygon network', 'error');
        }
      } else if (e?.code !== 4001) {
        addToast(e?.message || 'Failed to switch network', 'error');
      }
    }
  }, [addToast]);

  useEffect(() => {
    window.__qdapp_getProvider = async () => providerRef.current || getPreferredProvider();
    return () => {
      if (window.__qdapp_getProvider) delete window.__qdapp_getProvider;
    };
  }, []);

  // Listen for account/chain changes
  useEffect(() => {
    const setup = async () => {
      const preferredProvider = getPreferredProvider();
      if (!preferredProvider) return;

      providerRef.current = preferredProvider;

      const handleAccountsChanged = (accs) => {
        if (accs.length === 0) disconnect();
        else { setAccount(accs[0]); loadContractData(accs[0]); }
      };

      const handleChainChanged = (hex) => {
        setChainId(parseInt(hex, 16));
      };

      preferredProvider.on?.('accountsChanged', handleAccountsChanged);
      preferredProvider.on?.('chainChanged', handleChainChanged);

      try {
        const accounts = await preferredProvider.request({ method: 'eth_accounts' });
        if (accounts?.[0]) {
          setAccount(accounts[0]);
          const chainHex = await preferredProvider.request({ method: 'eth_chainId' });
          setChainId(parseInt(chainHex, 16));
          loadContractData(accounts[0]);
        }
      } catch (e) {
        console.warn('Provider initialization warning:', e);
      }

      return () => {
        preferredProvider.removeListener?.('accountsChanged', handleAccountsChanged);
        preferredProvider.removeListener?.('chainChanged', handleChainChanged);
      };
    };

    const cleanupPromise = setup();
    loadContractData(null);

    return () => {
      cleanupPromise?.then(cleanup => cleanup?.());
    };
  }, [disconnect, loadContractData]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Toast toasts={toasts} />
      <ConnectWalletModal
        open={connectModalOpen}
        connectingMethod={connectingMethod}
        hasWalletConnectProject={Boolean(WALLETCONNECT_PROJECT_ID)}
        onClose={() => setConnectModalOpen(false)}
        onConnectInjected={() => connect('injected')}
        onConnectWalletConnect={() => connect('walletconnect')}
      />
      <Navbar account={account} chainId={chainId} onConnect={() => setConnectModalOpen(true)} onDisconnect={disconnect} onSwitch={switchNetwork} />
      <Hero account={account} onConnect={() => setConnectModalOpen(true)} />
      <WalletPanel
        account={account} chainId={chainId}
        maticBalance={maticBalance} wlthBalance={wlthBalance}
        stakedBal={stakedBal} pendingRew={pendingRew}
        onConnect={() => setConnectModalOpen(true)} onSwitch={switchNetwork}
      />
      <BuySection
        account={account} chainId={chainId}
        tokensPerMatic={tokensPerMatic} totalSupply={totalSupply}
        addToast={addToast} onConnect={() => setConnectModalOpen(true)}
      />
      <AboutSection />
      <CommunityResourcesSection />
      <StakingSection
        account={account} chainId={chainId}
        wlthBalance={wlthBalance} stakedBal={stakedBal}
        pendingRew={pendingRew} totalStaked={totalStaked}
        addToast={addToast} onConnect={() => setConnectModalOpen(true)}
      />
      <TokenomicsSection />
      <Footer addToast={addToast} />
    </div>
  );
}
