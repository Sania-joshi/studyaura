import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getRandomQuote } from '../../utils/quotes';
import './MotivationalPopup.css';

export default function MotivationalPopup({ onDismiss }) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);
  const [quote] = useState(() => getRandomQuote());
  const sparkleRef = useRef(null);
  const isPrincess = theme === 'princess';

  // Sparkle particles on popup canvas
  useEffect(() => {
    if (!visible) return;
    const canvas = sparkleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let animId;

    const sparkles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.8,
      opacity: Math.random(),
      opDir: Math.random() > 0.5 ? 0.01 : -0.01
    }));

    const drawStar = (x, y, r, rot) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((i * 4 * Math.PI / 5) - Math.PI / 2) * r,
          Math.sin((i * 4 * Math.PI / 5) - Math.PI / 2) * r);
        ctx.lineTo(Math.cos(((i * 4 + 2) * Math.PI / 5) - Math.PI / 2) * r * 0.4,
          Math.sin(((i * 4 + 2) * Math.PI / 5) - Math.PI / 2) * r * 0.4);
      }
      ctx.closePath(); ctx.fill(); ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of sparkles) {
        s.y -= s.speed;
        s.opacity += s.opDir;
        if (s.opacity > 1 || s.opacity < 0.1) s.opDir *= -1;
        if (s.y < -10) { s.y = canvas.height + 10; s.x = Math.random() * canvas.width; }
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = isPrincess ? '#f7c8d9' : '#00d4ff';
        drawStar(s.x, s.y, s.size, Date.now() * 0.001);
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [visible, isPrincess]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 800);
  };

  // Speed lines for Ryuu
  const speedLines = !isPrincess ? Array.from({ length: 12 }, (_, i) => (
    <div
      key={i}
      className="speed-line"
      style={{
        top: `${Math.random() * 100}%`,
        width: `${100 + Math.random() * 300}px`,
        animationDelay: `${Math.random() * 0.4}s`
      }}
    />
  )) : null;

  return (
    <div className={`motiv-popup ${!visible ? 'hidden' : ''}`}>
      <div className={`popup-bg ${isPrincess ? 'princess-popup-bg' : 'ryuu-popup-bg'}`} />
      <canvas ref={sparkleRef} className="popup-sparkles" />
      {!isPrincess && <div className="speed-line-burst">{speedLines}</div>}
      <div className="popup-content">
        <div className={`popup-quote ${isPrincess ? 'princess-quote' : 'ryuu-quote'}`}>
          "{quote.text}"
        </div>
        {quote.author && <div className="popup-author">— {quote.author}</div>}
        <button
          className={`popup-dismiss ${isPrincess ? 'princess-dismiss' : 'ryuu-dismiss'}`}
          onClick={handleDismiss}
        >
          {isPrincess ? 'Begin My Session ✨' : 'Initiate Session ⚡'}
        </button>
      </div>
    </div>
  );
}
