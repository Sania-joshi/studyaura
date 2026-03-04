import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import { useTimer } from './hooks/useTimer';
import MotivationalPopup from './components/MotivationalPopup/MotivationalPopup';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Header from './components/Header/Header';
import FlipCard from './components/FlipCard/FlipCard';
import StudyTracker from './components/StudyTracker/StudyTracker';
import CommentsSection from './components/CommentsSection/CommentsSection';
import ParticleCanvas from './components/ParticleCanvas/ParticleCanvas';
import RacingCars from './components/RacingCars/RacingCars';
import FloatingKanji from './components/FloatingKanji/FloatingKanji';
import CelebrationOverlay from './components/CelebrationOverlay/CelebrationOverlay';
import './App.css';

export default function App() {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(true);
  const [appVisible, setAppVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const timer = useTimer();

  const handleDismiss = () => {
    setShowPopup(false);
    setAppVisible(true);
    // Stagger reveal
    setTimeout(() => setRevealed(true), 100);
  };

  return (
    <>
      {/* Background effects */}
      <div className="scanline-overlay" />
      <ParticleCanvas />
      <RacingCars />
      <FloatingKanji />

      {/* Celebration on timer finish */}
      <CelebrationOverlay active={timer.justFinished} />

      {/* Entry popup */}
      {showPopup && <MotivationalPopup onDismiss={handleDismiss} />}

      {/* Theme toggle */}
      <ThemeToggle visible={appVisible} />

      {/* Main App */}
      <div className={`main-app ${appVisible ? 'visible' : ''}`}>
        <Header revealed={revealed} />
        <FlipCard revealed={revealed} timer={timer} />
        <StudyTracker
          revealed={revealed}
          totalStudy={timer.totalStudy}
          sessions={timer.sessions}
        />
        <CommentsSection revealed={revealed} />
      </div>
    </>
  );
}
