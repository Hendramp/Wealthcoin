import { TARGET_CHAIN_ID } from '../contracts/addresses';
import { shortAddr } from '../utils/format';
import { IconCoin } from './Icons';

export default function Navbar({ account, chainId, onConnect, onWalletConnect, onDisconnect, onSwitch }) {
  const wrongNetwork = account && chainId !== TARGET_CHAIN_ID;
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#D4AF37]/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8"><IconCoin /></div>
          <span className="font-display text-lg font-semibold gold-text">WealthCoin</span>
          <span className="hidden sm:inline text-xs text-[#D4AF37]/50 font-mono">WTC</span>
        </div>
        <div className="flex items-center gap-2">
          {account ? (
            <>
              {wrongNetwork && <button onClick={onSwitch} className="btn-danger text-xs px-3 py-1.5 rounded-lg">Switch to Polygon</button>}
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#D4AF37]/70 bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse"></span>{shortAddr(account)}
              </span>
              <button onClick={onDisconnect} className="btn-ghost text-xs px-3 py-1.5 rounded-lg">Disconnect</button>
            </>
          ) : (
            <>
              <button onClick={onConnect} className="btn-gold px-4 py-1.5 rounded-lg text-sm font-semibold">Connect Wallet</button>
             <button onClick={onWalletConnect} className="btn-ghost px-3 py-1.5 rounded-lg text-xs">Mobile / QR</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
