import { shop } from '../data/shop';
import { useReveal } from '../hooks/useReveal';

export default function Booking() {
  const [ref, cls] = useReveal();

  return (
    <section className="book" id="book" ref={ref}>
      <div className={`shell book-inner ${cls}`}>
        <p className="eyebrow">Grid is open</p>
        <h2>
          Bring the car.
          <br />
          <span>Let's find the power.</span>
        </h2>
        <p>
          Pick a slot that works, tell me what the car is doing, and roll in. Diagnosis
          first, calibration second, guessing never.
        </p>
        <div className="book-actions">
          <a className="btn" href={shop.links.bookTune} target="_blank" rel="noreferrer">
            Book Diagnostic + Tune <span className="arrow">→</span>
          </a>
          <a
            className="btn btn-ghost"
            href={shop.links.bookService}
            target="_blank"
            rel="noreferrer"
          >
            Service Request
          </a>
        </div>
      </div>
    </section>
  );
}
