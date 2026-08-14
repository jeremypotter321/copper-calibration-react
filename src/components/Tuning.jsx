import { useState } from 'react';
import { tuningModes } from '../data/shop';
import { useReveal } from '../hooks/useReveal';

export default function Tuning() {
  const [active, setActive] = useState(tuningModes[0].id);
  const [ref, cls] = useReveal();
  const mode = tuningModes.find((m) => m.id === active);

  return (
    <section className="section" id="tuning" ref={ref}>
      <div className={`shell ${cls}`}>
        <div className="section-head">
          <div>
            <p className="eyebrow">02 · Calibration</p>
            <h2>
              The tune is
              <br />
              the <em>whole point</em>
            </h2>
          </div>
          <p className="section-note">
            A calibration is not a file you download. It's fuel, timing and boost sorted
            out for your motor, your fuel, your mods — and verified in the logs before
            the keys go back.
          </p>
        </div>

        <div className="tune-tabs" role="tablist" aria-label="Tuning options">
          {tuningModes.map((m) => (
            <button
              key={m.id}
              role="tab"
              type="button"
              aria-selected={m.id === active}
              className={`tune-tab ${m.id === active ? 'on' : ''}`}
              onClick={() => setActive(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="tune-body" key={mode.id}>
          <div className="tune-left">
            <p className="eyebrow">{mode.kicker}</p>
            <h3>{mode.label}</h3>
            <p>{mode.blurb}</p>
            <a className="btn" href={mode.cta.href} target="_blank" rel="noreferrer">
              {mode.cta.label} <span className="arrow">→</span>
            </a>
          </div>

          <div className="tune-sheet">
            <p className="sheet-title">Spec Sheet</p>
            <dl style={{ margin: 0 }}>
              {mode.sheet.map(([k, v]) => (
                <div className="sheet-row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
