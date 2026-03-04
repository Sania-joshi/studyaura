import React, { useState, useEffect, useRef } from 'react';
import './FlipClockTimer.css';

export default function FlipClockTimer({ timer }) {
  const {
    mode, seconds, running,
    start, pause, reset, setCountdown, switchMode
  } = timer;

  const [inputH, setInputH] = useState(0);
  const [inputM, setInputM] = useState(25);
  const prevDigitsRef = useRef([0, 0, 0, 0, 0, 0]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const digits = [
    Math.floor(h / 10), h % 10,
    Math.floor(m / 10), m % 10,
    Math.floor(s / 10), s % 10
  ];

  // Track flipping state per digit
  const [flipping, setFlipping] = useState([false, false, false, false, false, false]);

  useEffect(() => {
    const prev = prevDigitsRef.current;
    const newFlipping = digits.map((d, i) => d !== prev[i]);
    if (newFlipping.some(Boolean)) {
      setFlipping(newFlipping);
      const timeout = setTimeout(() => setFlipping([false, false, false, false, false, false]), 350);
      prevDigitsRef.current = [...digits];
      return () => clearTimeout(timeout);
    }
  }, [seconds]);

  const handleSet = () => {
    setCountdown(parseInt(inputH) || 0, parseInt(inputM) || 0);
  };

  return (
    <div className="flip-clock-timer">
      <div className="timer-mode-toggle">
        <button
          className={`mode-btn ${mode === 'countdown' ? 'active' : ''}`}
          onClick={() => switchMode('countdown')}
        >
          ⏳ Countdown
        </button>
        <button
          className={`mode-btn ${mode === 'stopwatch' ? 'active' : ''}`}
          onClick={() => switchMode('stopwatch')}
        >
          ⏱️ Stopwatch
        </button>
      </div>

      <div className="flip-clock">
        {digits.map((digit, i) => (
          <React.Fragment key={i}>
            {(i === 2 || i === 4) && <span className="clock-colon">:</span>}
            <div className="flip-digit-wrap">
              <div className={`flip-digit ${flipping[i] ? 'flipping' : ''}`}>
                <span>{digit}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {mode === 'countdown' && (
        <div className="timer-set-row">
          <label>Hrs</label>
          <input
            type="number" min="0" max="23" value={inputH}
            onChange={e => setInputH(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSet()}
          />
          <label>Min</label>
          <input
            type="number" min="0" max="59" value={inputM}
            onChange={e => setInputM(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSet()}
          />
          <button className="ctrl-btn set-btn" onClick={handleSet}>Set</button>
        </div>
      )}

      <div className="timer-controls">
        <button className="ctrl-btn" onClick={start}>▶ START</button>
        <button className="ctrl-btn" onClick={pause}>⏸ PAUSE</button>
        <button className="ctrl-btn" onClick={reset}>↺ RESET</button>
      </div>
    </div>
  );
}
