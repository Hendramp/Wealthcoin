import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import StewardsJourney from '../components/home/StewardsJourney';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StewardsJourney />
      </main>
      <Footer />
    </>
  );
}