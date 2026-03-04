import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle({ visible }) {
  const { theme, switchTheme } = useTheme();

  return (
    <div className={`theme-toggle ${visible ? 'visible' : ''}`}>
      <button
        className={`theme-btn ${theme === 'princess' ? 'active' : ''}`}
        onClick={() => switchTheme('princess')}
      >
        👑 Princess
      </button>
      <button
        className={`theme-btn ${theme === 'ryuu' ? 'active' : ''}`}
        onClick={() => switchTheme('ryuu')}
      >
        ⚡ Ryuu
      </button>
    </div>
  );
}
