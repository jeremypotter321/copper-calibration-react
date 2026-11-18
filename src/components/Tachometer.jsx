import { useEffect, useRef, useState } from 'react';

const MAX_RPM = 8;
const REDLINE_AT = 6.5;
const START_ANGLE = -138; // 0 sits bottom-left, redline ends bottom-right
const SWEEP = 264;
const CX = 160;
const CY = 160;

const angleFor = (rpm) => START_ANGLE + (rpm / MAX_RPM) * SWEEP;
const rad = (deg) => ((deg - 90) * Math.PI) / 180;
const pointAt = (deg, r) => [CX + Math.cos(rad(deg)) * r, CY + Math.sin(rad(deg)) * r];

/**
 * Decorative instrument-cluster tachometer. The needle idles, sweeps to redline
 * on load, then answers the BLIP button. Purely a visual motif — no claims.
 */
const IDLE = 0.85;
const LIMITER = 7.0; // rev limiter cuts in just past the redline
const RISE = 3.6; // thousand rpm per second with the pedal down
const FALL = 4.8; // thousand rpm per second off the pedal

/** A blip target the site picks itself: anywhere from a lazy 2.5k to the limiter. */
const randomBlip = () => Math.round((2.5 + Math.random() * (LIMITER + 0.6 - 2.5)) * 10) / 10;

/**
 * Decorative instrument-cluster tachometer. The needle idles, sweeps to redline
 * on load, answers the BLIP button with a target it picks at random, and revs
 * while the gas pedal is held. Purely a visual motif — no claims.
 */
export default function Tachometer() {
  const [rpm, setRpm] = useState(0);
  const [pedal, setPedal] = useState(false);
  const [live, setLive] = useState(false); // needle follows the pedal frame by frame
  const timers = useRef([]);
  const rpmRef = useRef(0);
  const pedalRef = useRef(false);
  const frame = useRef(0);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const set = (v) => {
    rpmRef.current = v;
    setRpm(v);
  };

  const blip = () => {
    cancelAnimationFrame(frame.current);
    clearTimers();
    setLive(false);
    set(randomBlip());
    timers.current.push(setTimeout(() => set(1.1), 900));
  };

  // Pedal: rise while held (bouncing off the limiter), fall back to idle when let go.
  const run = () => {
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      let v = rpmRef.current;
      if (pedalRef.current) {
        v = v >= LIMITER ? LIMITER - 0.35 : Math.min(LIMITER, v + RISE * dt * (1 + v / 8));
      } else {
        v = Math.max(IDLE, v - FALL * dt);
      }
      set(v);
      if (pedalRef.current || v > IDLE) frame.current = requestAnimationFrame(step);
      else setLive(false);
    };
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(step);
  };

  const press = (down) => {
    if (pedalRef.current === down) return;
    pedalRef.current = down;
    setPedal(down);
    if (down) {
      clearTimers();
      setLive(true);
    }
    run();
  };

  // Key-on self-test: full sweep, settle to idle. Same thing the cluster does.
  useEffect(() => {
    timers.current.push(setTimeout(() => set(8), 420));
    timers.current.push(setTimeout(() => set(IDLE), 1500));
    return () => {
      clearTimers();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const ticks = [];
  for (let i = 0; i <= MAX_RPM * 2; i += 1) {
    const value = i / 2;
    const major = Number.isInteger(value);
    const deg = angleFor(value);
    const [x1, y1] = pointAt(deg, major ? 112 : 118);
    const [x2, y2] = pointAt(deg, 130);
    ticks.push(
      <line
        key={`t${i}`}
        className={`tach-tick ${major ? 'major' : ''} ${value >= REDLINE_AT ? 'red' : ''}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />
    );
    if (major) {
      const [nx, ny] = pointAt(deg, 92);
      ticks.push(
        <text
          key={`n${i}`}
          className={`tach-num ${value >= REDLINE_AT ? 'red' : ''}`}
          x={nx}
          y={ny}
        >
          {value}
        </text>
      );
    }
  }

  // Redline arc across the top-right of the dial
  const [ax, ay] = pointAt(angleFor(REDLINE_AT), 138);
  const [bx, by] = pointAt(angleFor(MAX_RPM), 138);

  return (
    <div className="tach-wrap">
      <svg
        className="tach"
        viewBox="0 0 320 320"
        role="img"
        aria-label="Decorative tachometer dial reading engine speed"
      >
        <defs>
          <radialGradient id="dialFace" cx="42%" cy="32%" r="78%">
            <stop offset="0%" stopColor="#1d2126" />
            <stop offset="58%" stopColor="#101316" />
            <stop offset="100%" stopColor="#050607" />
          </radialGradient>
          <linearGradient id="bezel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4c5259" />
            <stop offset="34%" stopColor="#20242a" />
            <stop offset="62%" stopColor="#5c636b" />
            <stop offset="100%" stopColor="#16191d" />
          </linearGradient>
        </defs>

        <circle className="tach-bezel" cx={CX} cy={CY} r={152} />
        <circle className="tach-face" cx={CX} cy={CY} r={146} />

        <path
          d={`M ${ax} ${ay} A 138 138 0 0 1 ${bx} ${by}`}
          fill="none"
          stroke="#e0392c"
          strokeWidth="7"
          opacity="0.85"
        />

        {ticks}

        <text className="tach-label" x={CX} y={104}>
          1/min × 1000
        </text>
        <text className="tach-brand" x={CX} y={210}>
          Copper
        </text>
        <text className="tach-readout" x={CX} y={236}>
          {(rpm * 1000).toFixed(0).padStart(4, '0')} RPM
        </text>

        <g
          className={`tach-needle ${live ? 'live' : ''}`}
          style={{ transform: `rotate(${angleFor(rpm) - 90}deg)` }}
        >
          <path
            className="tach-needle-body"
            d={`M ${CX - 6} ${CY} L ${CX + 128} ${CY - 2.5} L ${CX + 128} ${CY + 2.5} Z`}
          />
          <rect x={CX - 34} y={CY - 3.5} width={30} height={7} fill="#8e1c14" />
        </g>

        <circle className="tach-hub-outer" cx={CX} cy={CY} r={22} />
        <circle className="tach-hub-inner" cx={CX} cy={CY} r={11} />
      </svg>

      <div className="tach-controls">
        <button className="rev-btn" type="button" onClick={blip}>
          ⟳ Blip the throttle
        </button>

        <button
          className={`gas-pedal ${pedal ? 'down' : ''}`}
          type="button"
          aria-label="Gas pedal: hold to rev"
          aria-pressed={pedal}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture?.(e.pointerId);
            press(true);
          }}
          onPointerUp={() => press(false)}
          onPointerCancel={() => press(false)}
          onLostPointerCapture={() => press(false)}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              press(true);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === ' ' || e.key === 'Enter') press(false);
          }}
          onBlur={() => press(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <svg viewBox="0 0 60 92" aria-hidden="true">
            <rect className="gas-arm" x="27" y="0" width="6" height="22" rx="2" />
            <rect className="gas-pad" x="4" y="16" width="52" height="74" rx="9" />
            {[28, 38, 48, 58, 68, 78].map((y) => (
              <rect key={y} className="gas-rib" x="12" y={y} width="36" height="3.5" rx="1.75" />
            ))}
          </svg>
          <span>Hold to rev</span>
        </button>
      </div>
    </div>
  );
}
