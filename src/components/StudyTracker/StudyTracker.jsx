import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { princessMiniQuotes, ryuuMiniQuotes } from '../../utils/quotes';
import './StudyTracker.css';

export default function StudyTracker({ revealed, totalStudy, sessions }) {
  const { theme } = useTheme();
  const [quoteIdx, setQuoteIdx] = useState(0);

  const h = Math.floor(totalStudy / 3600);
  const m = Math.floor((totalStudy % 3600) / 60);
  const s = totalStudy % 60;
  const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  const goal = 8 * 3600;
  const pct = Math.min(100, (totalStudy / goal) * 100);

  const quotes = theme === 'princess' ? princessMiniQuotes : ryuuMiniQuotes;

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % quotes.length);
    }, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [quotes.length]);

  // Reset index when theme changes
  useEffect(() => {
    setQuoteIdx(0);
  }, [theme]);

  return (
    <div className={`tracker-section ${revealed ? 'revealed' : ''}`}>
      <div className="tracker-stats">
        <div className="tracker-stat">
          <h3>Today's Study Time</h3>
          <div className="stat-val">{timeStr}</div>
        </div>
        <div className="tracker-stat">
          <h3>Sessions Completed</h3>
          <div className="stat-val">{sessions}</div>
        </div>
      </div>
      <div className="progress-wrap">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-label">{pct.toFixed(1)}% of 8-hour study goal</div>
      <div className="mini-quote">{quotes[quoteIdx]}</div>
    </div>
  );
}
