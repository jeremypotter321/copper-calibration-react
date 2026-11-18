import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Nav from './components/Nav';
import Projects from './components/Projects';
import Booking from './components/Booking';
import Footer from './components/Footer';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav base="/" />
    <main>
      <Projects />
      <Booking showProjectsLink={false} />
    </main>
    <Footer base="/" />
  </StrictMode>
);
