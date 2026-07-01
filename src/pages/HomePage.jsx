import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import StewardsJourney from '../components/home/StewardsJourney';
import Footer from '../components/layout/Footer';

export default function HomePage({ account, connectWallet, disconnectWallet }) {
  return (
    <>
      <Navbar
        account={account}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

      <main>
        <Hero account={account} connectWallet={connectWallet} />
        <StewardsJourney />
      </main>

      <Footer />
    </>
  );
}