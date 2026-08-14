import { shop, specStrip, ticker } from '../data/shop';
import Tachometer from './Tachometer';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow">
            {shop.city} · {shop.serviceArea}
          </p>

          <h1>
            <span className="accent">Dealer-level</span>
            <span className="line-2">BMW work,</span>
            <span>enthusiast hours.</span>
          </h1>

          <p className="hero-sub">
            Diagnostics, calibration and the bolt-ons in between — done by someone who
            drives them too. <b>HPA Certified EFI tuning</b>, factory <b>ISTA+</b>{' '}
            diagnostics, and a shop that's open when you're actually off work.
          </p>

          <div className="hero-actions">
            <a className="btn" href={shop.links.bookTune} target="_blank" rel="noreferrer">
              Book Diagnostic + Tune <span className="arrow">→</span>
            </a>
            <a
              className="btn btn-ghost"
              href={shop.links.bookService}
              target="_blank"
              rel="noreferrer"
            >
              Start a Service Request
            </a>
          </div>

          <dl className="spec-strip">
            {specStrip.map((s) => (
              <div className="spec-cell" key={s.k}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Tachometer />
      </div>

      <Ticker />
    </section>
  );
}

function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((code, i) => (
          <span
            key={`${code}-${i}`}
            className={`ticker-item ${i % 6 === 2 ? 'hot' : ''}`}
          >
            {code}
            <span style={{ color: '#2a2f34', marginLeft: 44 }}>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
