import { shop } from '../data/shop';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 style={{ fontSize: 30 }}>
              Copper <span style={{ color: 'var(--copper-hot)' }}>Calibration</span>
            </h3>
            <p>
              BMW diagnostics, calibration and mechanical work in {shop.city}, serving
              the {shop.serviceArea} area.
            </p>
          </div>

          <div className="footer-col">
            <h5>Shop</h5>
            <a href="#tuning">Tuning</a>
            <a href="#bays">Service Bays</a>
            <a href="#diagnostics">Diagnostics</a>
            <a href="#garage">Hours</a>
          </div>

          <div className="footer-col">
            <h5>Book</h5>
            <a href={shop.links.bookTune} target="_blank" rel="noreferrer">
              Diagnostic + Tune
            </a>
            <a href={shop.links.bookService} target="_blank" rel="noreferrer">
              Service Request
            </a>
          </div>

          <div className="footer-col">
            <h5>Follow the builds</h5>
            <a href={shop.links.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href={shop.links.tiktok} target="_blank" rel="noreferrer">
              TikTok ↗
            </a>
            <span>@coppercalibration</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            Concept redesign · unaffiliated fan build ·{' '}
            <a href={shop.links.site} target="_blank" rel="noreferrer">
              coppercalibration.com
            </a>
          </span>
          <span>Appointment only · {shop.cert}</span>
        </div>
      </div>
    </footer>
  );
}
