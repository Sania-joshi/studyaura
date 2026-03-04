import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './RacingCars.css';

export default function RacingCars() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 80;
    };
    resize();
    window.addEventListener('resize', resize);

    const carColors = ['#00d4ff', '#ff6a00', '#ff2255', '#00ff88', '#ffff00'];
    const cars = carColors.map((color, i) => ({
      x: -100 - Math.random() * 400,
      y: 15 + i * 12,
      w: 36 + Math.random() * 20,
      h: 10,
      speed: 1.5 + Math.random() * 2.5,
      color
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Road
      ctx.fillStyle = 'rgba(30,30,40,0.6)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Dashed center line
      ctx.setLineDash([20, 15]);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(canvas.width, 40); ctx.stroke();
      ctx.setLineDash([]);

      for (const c of cars) {
        c.x += c.speed;
        if (c.x > canvas.width + 100) c.x = -c.w - Math.random() * 200;
        ctx.fillStyle = c.color;
        ctx.shadowColor = c.color; ctx.shadowBlur = 8;
        ctx.fillRect(c.x, c.y, c.w, c.h);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(c.x + c.w * 0.65, c.y + 1, c.w * 0.2, c.h - 2);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#222';
        ctx.beginPath(); ctx.arc(c.x + c.w * 0.2, c.y + c.h, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(c.x + c.w * 0.8, c.y + c.h, 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`racing-cars ${theme === 'ryuu' ? 'visible' : ''}`} />;
}
