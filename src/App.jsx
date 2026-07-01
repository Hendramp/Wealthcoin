import { useState } from 'react';
import HomePage from './pages/HomePage';

export default function App() {
  const [account, setAccount] = useState('');

  async function connectWallet() {
    if (!window.ethereum) {
      alert('Please install MetaMask or use a Web3 wallet.');
      return;
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    setAccount(accounts[0]);
  }

  function disconnectWallet() {
    setAccount('');
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <HomePage
        account={account}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />
    </div>
  );
}