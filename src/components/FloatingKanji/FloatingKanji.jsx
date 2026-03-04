import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './FloatingKanji.css';

const kanjiChars = ['集中', '努力', '勝利', '根性', '闘志', '速度', '力', '鬼', '龍', '斬'];

export default function FloatingKanji() {
  const containerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const spawn = () => {
      const container = containerRef.current;
      if (!container || container.children.length > 15) return;
      const el = document.createElement('div');
      el.className = 'kanji';
      el.textContent = kanjiChars[Math.floor(Math.random() * kanjiChars.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDuration = (10 + Math.random() * 8) + 's';
      el.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    };

    spawn();
    const id = setInterval(spawn, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`kanji-container ${theme === 'ryuu' ? 'visible' : ''}`}
    />
  );
}
