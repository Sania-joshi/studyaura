import React, { useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import FlipClockTimer from '../FlipClockTimer/FlipClockTimer';
import TodoList from '../TodoList/TodoList';
import './FlipCard.css';

export default function FlipCard({ revealed, timer }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <div className="flip-btn-wrap">
        <button className="flip-btn" onClick={() => setIsFlipped(!isFlipped)}>
          🔄 Flip Card
        </button>
      </div>
      <div className={`flip-card-container ${revealed ? 'revealed' : ''}`}>
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-face flip-front">
            <FlipClockTimer timer={timer} />
          </div>
          <div className="flip-face flip-back">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}
