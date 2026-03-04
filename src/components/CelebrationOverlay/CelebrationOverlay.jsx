import React from 'react';
import './CelebrationOverlay.css';

export default function CelebrationOverlay({ active }) {
  if (!active) return null;
  return (
    <div className="celebration-overlay active">
      <div className="pulse-ring" />
    </div>
  );
}
