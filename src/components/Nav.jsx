import { useState } from 'react';
import { shop } from '../data/shop';
import { useScrollProgress } from '../hooks/useReveal';

const LINKS = [
  ['#tuning', 'Tuning'],
  ['#bays', 'Services'],
  ['#diagnostics', 'Diagnostics'],
  ['#garage', 'The Garage'],
];

/** `base` is '/' on the projects page so the section links go back to the home page. */
export default function Nav({ base = '' }) {
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="shell nav-inner">
        <a className="brand" href={`${base}#top`} onClick={() => setOpen(false)}>
          <img className="brand-mark" src="/logo-mark.png" alt="" width="40" height="40" />
          <span className="brand-text">
            <strong>Copper</strong>
            <span>Calibration</span>
          </span>
        </a>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map(([href, label]) => (
            <a key={href} href={`${base}${href}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a
          className="btn nav-cta"
          href={shop.links.bookTune}
          target="_blank"
          rel="noreferrer"
        >
          Book a Slot <span className="arrow">→</span>
        </a>

        <button
          className="nav-burger"
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <div
        className="redline-bar"
        style={{ width: '100%', transform: `scaleX(${progress})` }}
      />
    </header>
  );
}
