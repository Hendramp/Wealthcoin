import StartHere from './components/home/StartHere';
import Charter from './components/foundation/Charter';
import { useCallback, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/Hero';
import WalletPanel from './components/wallet/WalletPanel';
import Presale from './components/presale/Presale';
import DevelopmentCenter from './components/home/DevelopmentCenter';
import LongTermSupport from './components/home/LongTermSupport';
import Footer from './components/layout/Footer';
import Toast from './components/layout/Toast';
import { useWallet } from './hooks/useWallet';
import { usePresale } from './hooks/usePresale';
import StakingCenter from './components/StakingCenter';

export default function App() {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 6000);
  }, []);

  const wallet = useWallet(addToast);
  const presale = usePresale(wallet.account, wallet.chainId, wallet.providerSource, addToast);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Toast toasts={toasts} />
      <Navbar
        account={wallet.account}
        chainId={wallet.chainId}
        onConnect={wallet.connectInjected}
        onWalletConnect={wallet.connectWalletConnect}
        onDisconnect={wallet.disconnect}
        onSwitch={wallet.switchToPolygon}
      />
      <Hero account={wallet.account} onConnect={wallet.connectInjected} />
      <WalletPanel account={wallet.account} chainId={wallet.chainId} stats={presale.stats} onRefresh={presale.refresh} onSwitch={wallet.switchToPolygon} />
<StakingCenter />
      <Presale
        account={wallet.account}
        chainId={wallet.chainId}
        stats={presale.stats}
        polInput={presale.polInput}
        setPolInput={presale.setPolInput}
        estimate={presale.estimate}
        loading={presale.loading}
        buy={presale.buy}
        addToast={addToast}
        onConnect={wallet.connectInjected}
        onSwitch={wallet.switchToPolygon}
      />
      <LongTermSupport />
      <DevelopmentCenter /
><StartHere
/><Charter />
      <Footer />
    </div>
  );
}
