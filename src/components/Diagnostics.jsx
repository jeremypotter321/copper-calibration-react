import { useEffect, useRef, useState } from 'react';
import { scanSequence, toolbox } from '../data/shop';
import { useReveal } from '../hooks/useReveal';

/** Illustration of a full-system scan — a UI motif, not live vehicle data. */
function ScanTerminal() {
  const [visible, setVisible] = useState(0);
  const boxRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = boxRef.current;
    if (!node) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      scanSequence.forEach((_, i) => {
        setTimeout(() => setVisible(i + 1), 380 * (i + 1));
      });
    };

    if (!('IntersectionObserver' in window)) {
      run();
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div className="terminal" ref={boxRef}>
      <div className="term-bar">
        <span className="term-dot live" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-title">ISTA+ · Vehicle Test</span>
      </div>

      <div className="term-body">
        {scanSequence.slice(0, visible).map((row) => (
          <div className="term-line" key={row.module}>
            <span className="term-prompt">›</span>
            <span className="term-mod">{row.module}</span>
            <span className="term-desc">{row.label}</span>
            <span className="term-status">{row.status}</span>
          </div>
        ))}
        {visible < scanSequence.length && (
          <div className="term-line" style={{ opacity: 1, transform: 'none' }}>
            <span className="term-prompt">›</span>
            <span className="term-desc">scanning modules</span>
            <span className="term-caret" />
          </div>
        )}
      </div>

      <div className="term-foot">
        <span>Full system · not a code reader</span>
        <span>Copper Calibration</span>
      </div>
    </div>
  );
}

export default function Diagnostics() {
  const [ref, cls] = useReveal();

  return (
    <section className="section" id="diagnostics" ref={ref}>
      <div className={`shell ${cls}`}>
        <div className="section-head">
          <div>
            <p className="eyebrow">04 · Diagnostics</p>
            <h2>
              Stop guessing.
              <br />
              <em>Start testing.</em>
            </h2>
          </div>
          <p className="section-note">
            Parts-cannon repairs are expensive and they rarely work. Every job starts
            with a real diagnosis — factory software, OEM-level programming, a smoke
            machine and actual test results.
          </p>
        </div>

        <div className="diag-grid">
          <ScanTerminal />

          <div className="tool-list">
            {toolbox.map((tool, i) => (
              <div className="tool" key={tool.name}>
                <span className="tool-idx">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{tool.name}</h4>
                  <span className="tool-kind">{tool.kind}</span>
                  <p>{tool.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
