import { useEffect, useState } from 'react';
import { hours, shop } from '../data/shop';
import { useReveal } from '../hooks/useReveal';

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Garage() {
  const [ref, cls] = useReveal();
  const now = useNow();

  const todayDow = now.getDay();
  const decimalHour = now.getHours() + now.getMinutes() / 60;
  const today = hours.find((h) => h.dow === todayDow);
  const isOpen = Boolean(today?.o != null && decimalHour >= today.o && decimalHour < today.c);

  return (
    <section className="section" id="garage" ref={ref}>
      <div className={`shell ${cls}`}>
        <div className="section-head">
          <div>
            <p className="eyebrow">05 · The Garage</p>
            <h2>
              Open when
              <br />
              <em>you're off work</em>
            </h2>
          </div>
          <p className="section-note">
            Nights and weekends, by appointment. Which is exactly when a project car
            actually gets touched.
          </p>
        </div>

        <div className="garage-grid">
          <div className="pitboard">
            <div className="pitboard-head">
              <h3>Garage Hours</h3>
              <span className={`status-pill ${isOpen ? 'open' : ''}`}>
                <span className="dot" />
                {isOpen ? 'Lift is up' : 'Closed right now'}
              </span>
            </div>

            {hours.map((h) => {
              const closed = h.o == null;
              const left = closed ? 0 : (h.o / 24) * 100;
              const width = closed ? 0 : ((h.c - h.o) / 24) * 100;
              return (
                <div
                  key={h.short}
                  className={`hour-row ${h.dow === todayDow ? 'today' : ''} ${
                    closed ? 'closed' : ''
                  }`}
                >
                  <span className="hour-day">{h.short}</span>
                  <span className="hour-bar">
                    {!closed && (
                      <span
                        className="hour-fill"
                        style={{ left: `${left}%`, width: `${width}%` }}
                      />
                    )}
                  </span>
                  <span className="hour-time">{h.label}</span>
                </div>
              );
            })}
          </div>

          <div className="garage-side">
            <div className="info-card">
              <p className="eyebrow">Where</p>
              <p className="big" style={{ marginTop: 14 }}>
                {shop.city}
              </p>
              <p>
                Serving the {shop.serviceArea} area. Appointment only — book a slot and
                the bay is yours.
              </p>
            </div>

            <div className="info-card carfax-card">
              <h4>Paper trail included</h4>
              <p>{shop.carfaxNote}</p>
            </div>

            <div className="info-card">
              <h4>Certified to tune</h4>
              <p>
                {shop.cert} — calibration work backed by real training, not a forum
                thread.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
