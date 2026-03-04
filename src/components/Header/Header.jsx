import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useDateTime } from '../../hooks/useDateTime';
import './Header.css';

export default function Header({ revealed }) {
  const { theme } = useTheme();
  const { dateStr, timeStr } = useDateTime();
  const isPrincess = theme === 'princess';

  return (
    <>
      <h1 className={`app-heading ${revealed ? 'revealed' : ''}`}>
        {isPrincess
          ? '✨ STUDYAURA — Your Royal Study Hour ✨'
          : '⚡ STUDYAURA — No Pause. No Mercy. ⚡'}
      </h1>
      <div className={`date-time-bar ${revealed ? 'revealed' : ''}`}>
        <div className="live-date">{dateStr}</div>
        <div className="live-clock">{timeStr}</div>
      </div>
    </>
  );
}
