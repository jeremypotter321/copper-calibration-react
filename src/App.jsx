import Nav from './components/Nav';
import Hero from './components/Hero';
import Tuning from './components/Tuning';
import Bays from './components/Bays';
import Diagnostics from './components/Diagnostics';
import Garage from './components/Garage';
import Booking from './components/Booking';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Tuning />
        <Bays />
        <Diagnostics />
        <Garage />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
