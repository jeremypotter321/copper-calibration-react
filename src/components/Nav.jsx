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
          <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="18" fill="none" stroke="#c0743a" strokeWidth="2" />
            <circle cx="20" cy="20" r="12" fill="none" stroke="#33383f" strokeWidth="1.5" />
            <path d="M20 4 L20 12" stroke="#e0392c" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 20 L30 13" stroke="#e7913f" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="20" cy="20" r="3" fill="#e7913f" />
          </svg>
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
