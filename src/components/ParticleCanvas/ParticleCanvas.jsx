import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ParticleCanvas.css';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const particlesRef = useRef([]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawStar = (x, y, r, rot) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((i * 4 * Math.PI / 5) - Math.PI / 2) * r, Math.sin((i * 4 * Math.PI / 5) - Math.PI / 2) * r);
        ctx.lineTo(Math.cos(((i * 4 + 2) * Math.PI / 5) - Math.PI / 2) * r * 0.4, Math.sin(((i * 4 + 2) * Math.PI / 5) - Math.PI / 2) * r * 0.4);
      }
      ctx.closePath(); ctx.fill(); ctx.restore();
    };

    const spawn = () => {
      if (themeRef.current !== 'princess') return;
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: -10,
        size: 1 + Math.random() * 3,
        speedY: 0.3 + Math.random() * 1.2,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: 0.3 + Math.random() * 0.6,
        color: `hsl(${[330,340,45,50,280,290][Math.floor(Math.random() * 6)]},${70 + Math.random() * 20}%,${75 + Math.random() * 15}%)`,
        shape: Math.random() > 0.5 ? 'star' : 'circle',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      if (themeRef.current === 'princess' && particles.length < 120) {
        if (Math.random() < 0.3) spawn();
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speedY; p.x += p.speedX; p.rotation += p.rotSpeed;
        if (p.y > canvas.height + 10 || themeRef.current !== 'princess') {
          particles.splice(i, 1); continue;
        }
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        if (p.shape === 'star') {
          drawStar(p.x, p.y, p.size, p.rotation);
        } else {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Expose burst function via ref on the canvas element
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas._createBurst = (burstTheme) => {
      const ctx = canvas.getContext('2d');
      const cx = canvas.width / 2, cy = canvas.height / 2;
      const bursts = [];
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        bursts.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, decay: 0.01 + Math.random() * 0.02,
          size: 2 + Math.random() * 4,
          color: burstTheme === 'princess'
            ? `hsl(${330 + Math.random() * 40},80%,${70 + Math.random() * 20}%)`
            : `hsl(${190 + Math.random() * 30},100%,${50 + Math.random() * 30}%)`
        });
      }
      const animBurst = () => {
        let alive = false;
        for (const p of bursts) {
          if (p.life <= 0) continue;
          alive = true;
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
          p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= p.decay;
        }
        ctx.globalAlpha = 1;
        if (alive) requestAnimationFrame(animBurst);
      };
      animBurst();
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
